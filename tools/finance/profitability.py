#!/usr/bin/env python3
"""Per-product profit for every live LiquidLav product, from real Printify costs.

For each product it reads the price and Printify cost of every enabled variant, plus Printify's US shipping
Standard cost for that product type (v2 shipping endpoints, Economy shown alongside), then works out profit per sale after Etsy fees in two cases:
  - buyer pays shipping (Etsy charges the buyer what Printify charges us)
  - free shipping (we pay Printify's shipping out of the price)
Etsy fees used (check them against the Etsy dashboard): listing $0.20, transaction 6.5% of the order
(price + shipping charged), payment processing 3% + $0.25. Offsite Ads (15% of the order total when it applies) is shown as profit after the fee, for both shipping cases.
It also shows the most you can spend on ads per sale before it stops paying.

Usage:  python3 tools/finance/profitability.py [--out finance/profitability.md]
The Printify key is added by the network proxy. Read only.
"""
import argparse, json, statistics, urllib.request, datetime as dt

SHOP = 29819127
API = "https://api.printify.com/v1"

def get(path):
    req = urllib.request.Request(API + path, headers={"User-Agent": "LiquidLav-Station/1.0"})
    with urllib.request.urlopen(req, timeout=60) as r:
        return json.loads(r.read().decode())

def get2(path):
    req = urllib.request.Request("https://api.printify.com/v2" + path, headers={"User-Agent": "LiquidLav-Station/1.0"})
    with urllib.request.urlopen(req, timeout=60) as r:
        return json.loads(r.read().decode())

def us_rate(bp, pp, method, variant_ids):
    """US first-item cost (dollars) for one shipping method, median over the product's enabled variants.
    v2 splits rates by method (standard, economy); v1 mixes both into one list with no label, so taking the
    lowest US v1 rate silently picks Economy. Standard is what an order ships with unless Economy is turned on."""
    try:
        d = get2(f"/catalog/blueprints/{bp}/print_providers/{pp}/shipping/{method}.json")
    except Exception:
        return None
    us = [x["attributes"] for x in d.get("data", []) if x["attributes"].get("country", {}).get("code") == "US"]
    mine = [a for a in us if a.get("variantId") in variant_ids] or us
    costs = [a["shippingCost"]["firstItem"]["amount"] for a in mine]
    return statistics.median(costs) / 100 if costs else None

def us_shipping(bp, pp, variant_ids):
    std = us_rate(bp, pp, "standard", variant_ids)
    eco = us_rate(bp, pp, "economy", variant_ids)
    if std is None:  # v2 down: fall back to v1 and take the highest US rate (Standard is never the cheaper one)
        try:
            d = get(f"/catalog/blueprints/{bp}/print_providers/{pp}/shipping.json")
            firsts = [p["first_item"]["cost"] for p in d.get("profiles", []) if "US" in p.get("countries", [])]
            std = max(firsts) / 100 if firsts else None
        except Exception:
            std = None
    return std, eco

def fees(order_total):
    return 0.20 + 0.065 * order_total + 0.03 * order_total + 0.25

def main():
    ap = argparse.ArgumentParser(); ap.add_argument("--out", default="finance/profitability.md"); a = ap.parse_args()
    prods = get(f"/shops/{SHOP}/products.json?limit=50")["data"]
    rows = []
    for p in prods:
        en = [v for v in p["variants"] if v.get("is_enabled")]
        if not en: continue
        price = statistics.median(v["price"] for v in en) / 100
        cost = statistics.median(v["cost"] for v in en) / 100
        ship, eco = us_shipping(p["blueprint_id"], p["print_provider_id"], {v["id"] for v in en})
        s = ship or 0
        buyer_pays = price - cost - fees(price + s)
        free_ship = price - cost - s - fees(price)
        offsite = 0.15 * (price + s)          # buyer pays shipping: 15% of price + shipping charged
        offsite_free = 0.15 * price            # free shipping: 15% of the price alone
        rows.append({"title": p["title"].split(",")[0], "visible": p["visible"], "draft": not (p.get("external") or {}).get("id"), "price": price, "cost": cost, "ship": ship, "eco": eco,
                     "buyer_pays": buyer_pays, "free_ship": free_ship, "offsite": offsite,
                     "ads_buyer": buyer_pays - offsite, "ads_free": free_ship - offsite_free,
                     "margin": buyer_pays / price if price else 0})
    rows.sort(key=lambda r: -r["buyer_pays"])
    def verdict(r):
        b = r["buyer_pays"]
        tier = "❌ losing" if b <= 0 else "✅ strong" if b >= 12 else "🟡 OK" if b >= 6 else "⚠️ thin"
        if r["free_ship"] < 1 and b > 0: tier += "; only works if the buyer pays shipping"
        return tier
    def safe_ads(r):
        # Ad cost per sale: at most half the profit in the worse of the two shipping cases, never below $0.
        return max(0.0, min(r["buyer_pays"], r["free_ship"]) / 2)
    today = dt.date.today().isoformat()
    out = [f"# Profit per product", "", f"Real Printify costs, read {today}. Typical size and color (median). Etsy fees: listing $0.20, 6.5% transaction, 3% + $0.25 payment processing.", "",
           "| Product | Live | Price | Printify cost | Printify US shipping (Standard) | Profit if buyer pays shipping | Profit with free shipping | Profit with Offsite Ads (buyer pays shipping) | Profit with Offsite Ads (free shipping) | Safe ad spend per sale | Verdict |",
           "|---|---|---|---|---|---|---|---|---|---|---|"]
    for r in rows:
        sh = f"${r['ship']:.2f}" if r["ship"] is not None else "unknown"
        if r.get("eco") is not None: sh += f" (Economy ${r['eco']:.2f})"
        out.append(f"| {r['title']} | {'draft (not on Etsy)' if r['draft'] else 'yes' if r['visible'] else 'hidden'} | ${r['price']:.2f} | ${r['cost']:.2f} | {sh} | **${r['buyer_pays']:.2f}** ({r['margin']:.0%}) | ${r['free_ship']:.2f} | ${r['ads_buyer']:.2f} | ${r['ads_free']:.2f} | ${safe_ads(r):.2f} | {verdict(r)} |")
    out += ["", "**Verdict tiers** (profit if buyer pays shipping): strong $12+, OK $6 to $12, thin under $6, losing $0 or less.", "",
            "**Safe ad spend per sale** = half the profit in the worse shipping case, so a sale from an ad still clears profit even if the shop offers free shipping. The break-even ceiling is the full profit. $0 means no ads.",
            "", "**Offsite Ads** (Etsy's 15% fee on sales that come from its ads on other sites) is 15% of the order total: price plus shipping when the buyer pays shipping, the price alone with free shipping. The two Offsite Ads columns already subtract it, so don't subtract it again.",
            "", "**Shipping** is Printify's US Standard first-item rate, the one orders ship with by default. Economy (cheaper, slower) only applies if it is turned on in Printify's store settings; it adds back the difference per sale. Profit figures assume Standard.",
            "", "Check the Etsy shipping settings: if the shop offers free shipping, use the free-shipping column. Etsy's US free-shipping guarantee usually applies to orders of $35 or more, so check it for the sweatshirts and hoodie too."]
    open(a.out, "w").write("\n".join(out) + "\n")
    print("\n".join(out))

if __name__ == "__main__":
    main()
