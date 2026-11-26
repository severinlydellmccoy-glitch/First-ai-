#!/usr/bin/env python3
"""Set up new LiquidLav products in Printify as UNPUBLISHED drafts, copied from a product that is already live.

For each draft in DRAFTS it copies the template product's blank, print provider, enabled colors/sizes and
prices (so no price is invented), puts the dark-shirts design on dark colors and the light-shirts design on
light colors (same position and size as the template), and uses our title, 13 tags and description.
It never publishes and never changes a live product. Publishing is the owner's call:
after the owner says yes, set "draft": False for that product in fix_listings.py and run fix_listings.py --apply.

It skips a draft that already exists (same blank and design in Printify), so it is safe to run again.

Usage:  python3 tools/printify/create_drafts.py            # dry run: prints the plan
        python3 tools/printify/create_drafts.py --apply    # creates the drafts in Printify (unpublished)
        python3 tools/printify/create_drafts.py --colors   # dry run: plan for adding colors to a live product
The Printify key is added by the network proxy.
"""
import base64, os, sys
sys.path.insert(0, os.path.dirname(__file__))
from fix_listings import PLAN, SHOP, ROOT, call, is_light, hoodie_copy, listing

APPLY = "--apply" in sys.argv

# name -> what to copy. "template": live product whose blank, colors and prices we copy.
DRAFTS = {
    "holiday-cat-ornament-remover-hoodie": {"design": "holiday-cat-ornament-remover", "template": "6afe7383e4ef99a85e0e3703",
                                            "copy": hoodie_copy},  # template = book hoodie
    # Dachshund (Boss, 2026-11-21 decisions): copied from the live book sweatshirt and book hoodie.
    "dachshund-extra-long-cheer-sweatshirt": {"design": "dachshund-extra-long-cheer", "template": "6afe7383e2d8ea21e80fa55f",
                                              "copy": lambda: listing("media/final/dachshund-extra-long-cheer-listing.md")},
    "dachshund-extra-long-cheer-hoodie": {"design": "dachshund-extra-long-cheer", "template": "6afe7383e4ef99a85e0e3703",
                                          "copy": lambda: listing("media/final/dachshund-extra-long-cheer-hoodie-listing.md")},
    # Book design 2 (Boss, 2026-11-22 decisions): copied from the live book sweatshirt and book hoodie.
    "book-lover-blanket-cocoa-chapter-sweatshirt": {"design": "book-lover-blanket-cocoa-chapter", "template": "6afe7383e2d8ea21e80fa55f",
                                                    "copy": lambda: listing("media/final/book-lover-blanket-cocoa-chapter-listing.md")},
    "book-lover-blanket-cocoa-chapter-hoodie": {"design": "book-lover-blanket-cocoa-chapter", "template": "6afe7383e4ef99a85e0e3703",
                                                "copy": lambda: listing("media/final/book-lover-blanket-cocoa-chapter-hoodie-listing.md")},
    # Winter cat "filed a complaint about the snow" (Boss, 2026-11-24 decisions): copied from the live book sweatshirt and book hoodie.
    "winter-cat-snow-complaint-sweatshirt": {"design": "winter-cat-snow-complaint", "template": "6afe7383e2d8ea21e80fa55f",
                                             "copy": lambda: listing("media/final/winter-cat-snow-complaint-listing.md")},
    "winter-cat-snow-complaint-hoodie": {"design": "winter-cat-snow-complaint", "template": "6afe7383e4ef99a85e0e3703",
                                         "copy": lambda: listing("media/final/winter-cat-snow-complaint-hoodie-listing.md")},
}
# Colors to add to a live product (owner approval needed; this file only prints the plan).
ADD_COLORS = {"6afe724a0ef5a611d100eb27": {"from": "6afe7383e2d8ea21e80fa55f", "design": "holiday-cat-ornament-remover"}}


def colours(p):
    copt = next(i for i, o in enumerate(p["options"]) if o["type"] == "color")
    vals = {v["id"]: v for v in p["options"][copt]["values"]}
    return {v["id"]: vals[next(o for o in v["options"] if o in vals)] for v in p["variants"]}


def image_ids(design):
    """Find the design files already uploaded to Printify (reuse them), else upload from art/final/."""
    found = {}
    for s in call("GET", f"/shops/{SHOP}/products.json?limit=50").get("data", []):
        for a in s["print_areas"]:
            for ph in a["placeholders"]:
                for im in ph["images"]:
                    if im.get("name", "").startswith(design + "-for-"): found.setdefault(im["name"], im["id"])
    for which in ("dark", "light"):
        name = f"{design}-for-{which}-shirts.png"
        if name not in found:
            if not APPLY: found[name] = f"<upload {name}>"; continue
            data = base64.b64encode(open(os.path.join(ROOT, "art", "final", name), "rb").read()).decode()
            found[name] = call("POST", "/uploads/images.json", {"file_name": name, "contents": data})["id"]
    return found


def front_names(p):
    return {im.get("name", "") for a in p["print_areas"] for ph in a["placeholders"] if ph["position"] == "front" for im in ph["images"]}


def make_drafts():
    existing = [call("GET", f"/shops/{SHOP}/products/{s['id']}.json") for s in call("GET", f"/shops/{SHOP}/products.json?limit=50")["data"]]
    for key, cfg in DRAFTS.items():
        t = next(p for p in existing if p["id"] == cfg["template"])
        dup = [p for p in existing if p["blueprint_id"] == t["blueprint_id"] and any(n.startswith(cfg["design"]) for n in front_names(p))]
        if dup:
            print(f"{key}: already in Printify as {dup[0]['id']} ({'published' if (dup[0].get('external') or {}).get('id') else 'unpublished'}), skipped"); continue
        title, tags, desc = cfg["copy"]()
        col = colours(t)
        en = [v for v in t["variants"] if v["is_enabled"]]
        light = [v["id"] for v in en if is_light(col[v["id"]].get("colors"))]
        dark = [v["id"] for v in en if v["id"] not in light]
        tmpl = next(ph for ph in t["print_areas"][0]["placeholders"] if ph["position"] == "front")["images"][0]
        ids = image_ids(cfg["design"])
        def area(vids, which):
            return {"variant_ids": vids, "placeholders": [{"position": "front", "images": [
                {"id": ids[f"{cfg['design']}-for-{which}-shirts.png"], "x": tmpl["x"], "y": tmpl["y"], "scale": tmpl["scale"], "angle": tmpl["angle"]}]}]}
        body = {"title": title, "description": desc, "tags": tags, "blueprint_id": t["blueprint_id"], "print_provider_id": t["print_provider_id"],
                "variants": [{"id": v["id"], "price": v["price"], "is_enabled": True} for v in en],
                "print_areas": [a for a in (area(dark, "dark") if dark else None, area(light, "light") if light else None) if a]}
        print(f"{key}: copy of '{t['title'][:50]}' (blank {t['blueprint_id']}, provider {t['print_provider_id']})")
        print(f"  title ({len(title)} chars): {title}\n  tags ({len(tags)}): {', '.join(tags)}")
        print("  dark file on:", sorted({col[i]['title'] for i in dark}), "| light file on:", sorted({col[i]['title'] for i in light}))
        print("  prices copied:", sorted({f"${v['price']/100:.2f}" for v in en}), f"| {len(en)} sizes/colors")
        if APPLY:
            r = call("POST", f"/shops/{SHOP}/products.json", body)
            print(f"  CREATED unpublished: {r['id']}. Add it to PLAN in fix_listings.py with \"draft\": True.")


def colour_plan():
    for pid, cfg in ADD_COLORS.items():
        p, src = call("GET", f"/shops/{SHOP}/products/{pid}.json"), call("GET", f"/shops/{SHOP}/products/{cfg['from']}.json")
        col, have = colours(p), {v["id"] for v in p["variants"] if v["is_enabled"]}
        add = [v for v in src["variants"] if v["is_enabled"] and v["id"] not in have and not is_light(colours(src)[v["id"]].get("colors"))]
        print(f"Add to '{p['title'][:50]}' (LIVE, needs the owner's OK):")
        for name in sorted({col[v['id']]['title'] for v in add}):
            vs = [v for v in add if col[v["id"]]["title"] == name]
            print(f"  {name}: {len(vs)} sizes at {sorted({f'${v['price']/100:.2f}' for v in vs})} with the dark-shirts file (prices copied from '{src['title'][:30]}')")
        print("  The cat sweatshirt already has the dark-shirts file set for dark colors, so this only switches the colors on.")


if __name__ == "__main__":
    colour_plan() if "--colors" in sys.argv else make_drafts()
