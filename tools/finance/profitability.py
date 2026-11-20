#!/usr/bin/env python3
"""Per-product profit for every live LiquidLav product, from real Printify costs.

For each product it reads the price and Printify cost of every enabled variant, plus Printify's US shipping
cost for that product type, then works out profit per sale after Etsy fees in two cases:
  - buyer pays shipping (Etsy charges the buyer what Printify charges us)
  - free shipping (we pay Printify's shipping out of the price)
Etsy fees used (check them against the Etsy dashboard): listing $0.20, transaction 6.5% of the order
(price + shipping charged), payment processing 3% + $0.25. Offsite Ads (12 to 15% when it applies) is shown separately.
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

def us_shipping(bp, pp):
    try:
        d = get(f"/catalog/blueprints/{bp}/print_providers/{pp}/shipping.json")
        firsts = [p["first_item"]["cost"] for p in d.get("profiles", []) if "US" in p.get("countries", [])]
        if not firsts:  # v1 sometimes answers with no profiles; v2 has per-variant US standard rates
            req = urllib.request.Request(f"https://api.printify.com/v2/catalog/blueprints/{bp}/print_providers/{pp}/shipping/standard.json",
                                         headers={"User-Agent": "LiquidLav-Station/1.0"})
            with urllib.request.urlopen(req, timeout=60) as r: d2 = json.loads(r.read().decode())
            firsts = [x["attributes"]["shippingCost"]["firstItem"]["amount"] for x in d2.get("data", [])
                      if x["attributes"].get("country", {}).get("code") == "US"]
        return min(firsts) / 100 if firsts else None
    except Exception:
        return None

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
        ship = us_shipping(p["blueprint_id"], p["print_provider_id"])
        s = ship or 0
        buyer_pays = price - cost - fees(price + s)
        free_ship = price - cost - s - fees(price)
        offsite = 0.15 * (price + s)
        rows.append({"title": p["title"].split(",")[0], "visible": p["visible"], "draft": not (p.get("external") or {}).get("id"), "price": price, "cost": cost, "ship": ship,
                     "buyer_pays": buyer_pays, "free_ship": free_ship, "offsite": offsite,
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
           "| Product | Live | Price | Printify cost | Printify US shipping | Profit if buyer pays shipping | Profit with free shipping | Offsite Ads fee if it applies | Safe ad spend per sale | Verdict |",
           "|---|---|---|---|---|---|---|---|---|---|"]
    for r in rows:
        sh = f"${r['ship']:.2f}" if r["ship"] is not None else "unknown"
        out.append(f"| {r['title']} | {'draft (not on Etsy)' if r['draft'] else 'yes' if r['visible'] else 'hidden'} | ${r['price']:.2f} | ${r['cost']:.2f} | {sh} | **${r['buyer_pays']:.2f}** ({r['margin']:.0%}) | ${r['free_ship']:.2f} | −${r['offsite']:.2f} | ${safe_ads(r):.2f} | {verdict(r)} |")
    out += ["", "**Verdict tiers** (profit if buyer pays shipping): strong $12+, OK $6 to $12, thin under $6, losing $0 or less.", "",
            "**Safe ad spend per sale** = half the profit in the worse shipping case, so a sale from an ad still clears profit even if the shop offers free shipping. The break-even ceiling is the full profit. $0 means no ads.",
            "", "Check the Etsy shipping settings: if the shop offers free shipping, use the free-shipping column. Etsy's US free-shipping guarantee usually applies to orders of $35 or more, so check it for the sweatshirts and hoodie too."]
    open(a.out, "w").write("\n".join(out) + "\n")
    print("\n".join(out))

if __name__ == "__main__":
    main()
