#!/usr/bin/env python3
"""Read-only health check of every LiquidLav product in Printify. Changes nothing.

For each product it checks:
  - the title, tags and description match our plan in fix_listings.py (not Printify's own wording)
  - it has 13 tags
  - every enabled color uses the right design file (light-shirts file on light colors, dark-shirts file on dark)
  - it is published to Etsy (has an Etsy listing id), isn't stuck publishing, and is shown or hidden as planned
  - products that aren't in the plan, or that still have a Printify-style title, are flagged

Etsy blocks automated reading, so this checks what Printify last sent to Etsy. Etsy web addresses keep the
words of the very first title (for example .../unisex-heavy-blend-crewneck-sweatshirt); that is normal and harmless.

Usage:  python3 tools/printify/check_listings.py          # prints a report; exit code 1 if anything is wrong
The Printify key is added by the network proxy.
"""
import os, sys
sys.path.insert(0, os.path.dirname(__file__))
from fix_listings import PLAN, SHOP, call, is_light

PRINTIFY_WORDS = ("unisex heavy blend", "powered in witch", "kiss-cut", "heavy blend", "softstyle", "cotton canvas tote bag",
                  "scented soy candle, 9oz", "garment-dyed")

def check(p):
    problems, notes = [], []
    cfg = PLAN.get(p["id"])
    title = p["title"]
    if any(w in title.lower() for w in PRINTIFY_WORDS) and not (cfg and title == cfg["title"]):
        problems.append(f"title looks like Printify's own wording: {title[:70]}")
    if cfg is None:
        problems.append("not in our plan (tools/printify/fix_listings.py): needs our title, tags and design check")
    else:
        if title != cfg["title"]: problems.append(f"title differs from plan: {title[:70]}")
        if sorted(p["tags"]) != sorted(cfg["tags"]): problems.append("tags differ from plan")
        if p["description"].strip() != cfg["desc"].strip(): notes.append("description differs from plan (Printify may reformat it; check if titles/tags also differ)")
        if bool(p["visible"]) == bool(cfg.get("hide")):
            problems.append("is " + ("shown on Etsy but planned hidden" if p["visible"] else "hidden but planned shown"))
    if len(p["tags"]) != 13: problems.append(f"{len(p['tags'])} tags (Etsy allows 13; use all 13)")
    if p.get("is_locked"): problems.append("stuck publishing (locked); check Printify > My products")
    ext = p.get("external") or {}
    if p["visible"] and not ext.get("id"): problems.append("not published to Etsy yet (no Etsy listing id)")

    # Right design per color
    copt = next((i for i, o in enumerate(p["options"]) if o["type"] == "color"), None)
    vals = {v["id"]: v for v in p["options"][copt]["values"]} if copt is not None else {}
    file_of = {}
    for a in p["print_areas"]:
        front = next((ph for ph in a["placeholders"] if ph["position"] == "front"), None)
        name = (front["images"][0].get("name", "") if front and front["images"] else "")
        for vid in a["variant_ids"]: file_of[vid] = name
    wrong = set()
    for v in p["variants"]:
        if not v["is_enabled"]: continue
        name = file_of.get(v["id"], "")
        if vals:
            cid = next(o for o in v["options"] if o in vals)
            want = "light" if is_light(vals[cid].get("colors")) else "dark"
            color = vals[cid]["title"]
        else:
            want, color = "light", "(single color)"
        if f"-for-{want}-shirts" not in name:
            wrong.add(f"{color} uses '{name or 'no design'}' (should be the {want}-shirts file)")
    problems += sorted(wrong)
    return problems, notes, ext.get("id")

def main():
    products = call("GET", f"/shops/{SHOP}/products.json?limit=50").get("data", [])
    bad = 0
    print(f"Printify listing check, shop {SHOP}: {len(products)} products\n")
    for summary in products:
        p = call("GET", f"/shops/{SHOP}/products/{summary['id']}.json")
        problems, notes, etsy_id = check(p)
        state = "hidden" if not p["visible"] else f"on Etsy #{etsy_id}" if etsy_id else "not on Etsy"
        print(("OK   " if not problems else "FIX  ") + f"{p['title'][:70]}  [{state}]")
        for x in problems: print("       - " + x)
        for x in notes: print("       note: " + x)
        bad += bool(problems)
    print(f"\n{len(products) - bad} OK, {bad} need fixing." + (" Run: python3 tools/printify/fix_listings.py (dry run first)." if bad else ""))
    print("Etsy web addresses keep the words of the first title; that is normal and not a problem.")
    return 1 if bad else 0

if __name__ == "__main__":
    sys.exit(main())
