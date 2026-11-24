#!/usr/bin/env python3
"""Fix LiquidLav's Printify products: right design file per shirt color, our titles/tags/descriptions.

Dark-colored variants get the *-for-dark-shirts.png design, light-colored variants get *-for-light-shirts.png.
Products marked "draft": True are updated but never published (they wait for the owner's OK).
Usage:  python3 tools/printify/fix_listings.py            # dry run: prints the plan
        python3 tools/printify/fix_listings.py --apply    # uploads designs, updates products, publishes to Etsy
        --only ID       work on that one product only (repeatable); every other product is left alone
        --text-only     change only title, tags and description (no design uploads, design files untouched)
  Example: python3 tools/printify/fix_listings.py --only 6affbd9c13e72c2c980a0d76 --text-only --apply
The Printify key is added by the network proxy. Prices are never changed by this script.
"""
import base64, json, os, sys, urllib.request, urllib.error

API = "https://api.printify.com/v1"
SHOP = 29819127
ROOT = os.path.join(os.path.dirname(__file__), "..", "..")
APPLY = "--apply" in sys.argv
TEXT_ONLY = "--text-only" in sys.argv
ONLY = [sys.argv[i + 1] for i, a in enumerate(sys.argv) if a == "--only" and i + 1 < len(sys.argv)]

def call(method, path, body=None):
    req = urllib.request.Request(API + path, method=method, data=json.dumps(body).encode() if body is not None else None,
                                 headers={"User-Agent": "LiquidLav-Station/1.0", "Content-Type": "application/json"})
    try:
        with urllib.request.urlopen(req, timeout=120) as r:
            t = r.read().decode()
            return json.loads(t) if t.strip() else {}
    except urllib.error.HTTPError as e:
        raise SystemExit(f"Printify said {e.code} on {method} {path}: {e.read().decode()[:800]}")

def is_light(hexes):
    h = (hexes or ["#000000"])[0].lstrip("#")
    r, g, b = (int(h[i:i + 2], 16) / 255 for i in (0, 2, 4))
    return 0.2126 * r + 0.7152 * g + 0.0722 * b > 0.55

def listing(path):
    s = open(os.path.join(ROOT, path)).read()
    title = s.split("**Title**")[1].split("\n\n")[1].strip()
    tags = [t.strip() for t in s.split("**Tags**")[1].split("\n\n")[1].split("·")]
    desc = s.split("**Description:**")[1].split("**Etsy settings")[0].strip()
    return title, tags, desc

CAT = listing("media/final/holiday-cat-ornament-remover-listing.md")
CAT_HOODIE_FILE = "media/final/holiday-cat-ornament-remover-hoodie-listing.md"

def hoodie_copy():
    """The Producer's cat hoodie copy once it's in media/final/; until then, the sweatshirt copy reworded for a hoodie."""
    if os.path.exists(os.path.join(ROOT, CAT_HOODIE_FILE)): return listing(CAT_HOODIE_FILE)
    tags = ["cat christmas hoodie", "funny cat hoodie", "cat lover gift", "christmas cat", "orange cat hoodie", "cat mom christmas", "cat dad gift",
            "ugly sweater cat", "christmas tree cat", "christmas hoodie", "funny xmas hoodie", "cat owner gift", "ornament cat"]
    desc = CAT[2].replace("this cozy crewneck sweatshirt", "this cozy hoodie").replace(
        "Soft, warm unisex crewneck with a classic relaxed fit", "Soft, warm unisex hoodie with a roomy front pocket")
    return ("Funny Christmas Cat Hoodie, Professional Ornament Remover, Orange Cat Holiday Hooded Sweatshirt, Cat Lover Gift, Cat Mom Christmas", tags, desc)
BOOK = listing("media/final/book-lover-snowed-in-listing.md")
book_desc = BOOK[2]

HOODIE = hoodie_copy()
DOX = listing("media/final/dachshund-extra-long-cheer-listing.md")
DOX_HOODIE = listing("media/final/dachshund-extra-long-cheer-hoodie-listing.md")
COCOA = listing("media/final/book-lover-blanket-cocoa-chapter-listing.md")
COCOA_HOODIE = listing("media/final/book-lover-blanket-cocoa-chapter-hoodie-listing.md")

PLAN = {
    # Cat hoodie, created unpublished by create_drafts.py on 2026-11-20. Set "draft": False once the owner approves.
    "6affbd9c13e72c2c980a0d76": {"design": "holiday-cat-ornament-remover", "draft": True, "title": HOODIE[0], "tags": HOODIE[1], "desc": HOODIE[2]},
    # Dachshund sweatshirt and hoodie, created unpublished by create_drafts.py on 2026-11-22 (copied from the book sweatshirt/hoodie).
    "6b03b109f84ecfe9f804563a": {"design": "dachshund-extra-long-cheer", "draft": True, "title": DOX[0], "tags": DOX[1], "desc": DOX[2]},
    "6b03b10b27b0f205c40d07ab": {"design": "dachshund-extra-long-cheer", "draft": True, "title": DOX_HOODIE[0], "tags": DOX_HOODIE[1], "desc": DOX_HOODIE[2]},
    # Book design 2 sweatshirt and hoodie, created unpublished by create_drafts.py on 2026-11-23 (copied from the book sweatshirt/hoodie).
    "6b050281dd767dcca50b4e2e": {"design": "book-lover-blanket-cocoa-chapter", "draft": True, "title": COCOA[0], "tags": COCOA[1], "desc": COCOA[2]},
    "6b050284f05114a8960af366": {"design": "book-lover-blanket-cocoa-chapter", "draft": True, "title": COCOA_HOODIE[0], "tags": COCOA_HOODIE[1], "desc": COCOA_HOODIE[2]},
    "6afe724a0ef5a611d100eb27": {"design": "holiday-cat-ornament-remover", "title": CAT[0], "tags": CAT[1], "desc": CAT[2]},
    "6afe7383e2d8ea21e80fa55f": {"design": "book-lover-snowed-in", "title": BOOK[0], "tags": BOOK[1], "desc": BOOK[2]},
    "6afe7383e4ef99a85e0e3703": {"design": "book-lover-snowed-in",
        "title": "Snowed In With A Good Book Hoodie, Cozy Reading Hooded Sweatshirt, Book Lover Gift, Bookish Winter Hoodie, Gift for Reader",
        "tags": ["book lover gift", "reading hoodie", "bookish hoodie", "winter hoodie", "cozy reading shirt", "librarian gift", "book club gift",
                 "hot cocoa hoodie", "snow day hoodie", "gift for reader", "bookworm gift", "teacher gift", "cozy hoodie"],
        "desc": book_desc.replace("This cozy crewneck", "This cozy hoodie").replace("Soft, warm unisex crewneck with a classic relaxed fit", "Soft, warm unisex hoodie with a roomy front pocket")},
    "6afe73829c0ce9c9d50025d8": {"design": "book-lover-snowed-in",
        "title": "Snowed In With A Good Book Tote Bag, Cozy Reading Canvas Tote, Book Lover Gift, Library Book Bag, Bookish Gift for Reader",
        "tags": ["book lover gift", "library tote bag", "bookish tote", "book bag", "reading gift", "librarian gift", "book club gift",
                 "hot cocoa gift", "canvas tote bag", "gift for reader", "bookworm gift", "teacher gift", "winter reading"],
        "desc": "Snow outside, cocoa in hand, and a stack of books to carry home. This canvas tote is made for library trips, book swaps and bookstore runs.\n\nOur original illustration shows a steaming mug of cocoa resting on a stack of well-loved books, with snowflakes falling around it. A thoughtful gift for book lovers, book club friends, teachers and librarians.\n\n• Original design by our shop, printed on demand just for you\n• Sturdy cotton canvas with comfortable handles\n• Made to order, so please allow production time before shipping"},
    "6afe738207b4e3e48003d7b5": {"design": "book-lover-snowed-in",
        "title": "Snowed In With A Good Book Scented Soy Candle, Cozy Reading Candle, Book Lover Gift, Bookish Winter Candle, Gift for Reader",
        "tags": ["book lover gift", "bookish candle", "reading candle", "soy candle", "winter candle", "cozy gift", "book club gift",
                 "hot cocoa candle", "librarian gift", "gift for reader", "bookworm gift", "teacher gift", "snow day gift"],
        "desc": "Light it, pour the cocoa, open the book. This scented soy candle is made for snow days and long reading nights.\n\nOur original illustration shows a steaming mug of cocoa resting on a stack of well-loved books, with snowflakes falling around it. A cozy gift for book lovers, book club friends, teachers and librarians.\n\n• Original design by our shop, printed on demand just for you\n• Natural soy wax\n• Made to order, so please allow production time before shipping"},
    "6afe738272cda2c20604a86d": {"design": "book-lover-snowed-in", "hide": True,
        "title": "Snowed In With A Good Book Sticker, Cozy Reading Sticker, Book Lover Sticker, Kindle Sticker, Bookish Gift",
        "tags": ["book lover sticker", "bookish sticker", "reading sticker", "kindle sticker", "laptop sticker", "book club gift", "hot cocoa sticker",
                 "winter sticker", "librarian gift", "gift for reader", "bookworm sticker", "teacher gift", "cozy sticker"],
        "desc": "Snowed in with a good book: our original cocoa-and-books illustration as a kiss-cut sticker.\n\n• Original design by our shop, printed on demand"},
}

def main():
    uploaded = {}
    def upload(name):
        if name in uploaded: return uploaded[name]
        path = os.path.join(ROOT, "art", "final", name)
        if not APPLY:
            uploaded[name] = {"id": f"<upload {name}>"}; return uploaded[name]
        r = call("POST", "/uploads/images.json", {"file_name": name, "contents": base64.b64encode(open(path, "rb").read()).decode()})
        uploaded[name] = r; print("  uploaded", name, r.get("id")); return r

    unknown = [i for i in ONLY if i not in PLAN]
    if unknown: raise SystemExit(f"--only: not in the plan: {unknown}")
    for pid, cfg in PLAN.items():
        if ONLY and pid not in ONLY: continue
        p = call("GET", f"/shops/{SHOP}/products/{pid}.json")
        color_opt = next((i for i, o in enumerate(p["options"]) if o["type"] == "color"), None)
        light_ids = set()
        if color_opt is not None:
            light_vals = {v["id"] for v in p["options"][color_opt]["values"] if is_light(v.get("colors"))}
            names = {v["id"]: v["title"] for v in p["options"][color_opt]["values"]}
            colour_of = lambda v: next(o for o in v["options"] if o in names)  # variant option order varies
            for v in p["variants"]:
                if colour_of(v) in light_vals: light_ids.add(v["id"])
        else:
            light_ids = {v["id"] for v in p["variants"]}  # no color choice: white/clear product, use the light design
        all_ids = [v["id"] for v in p["variants"]]
        dark_ids = [i for i in all_ids if i not in light_ids]
        en = {v["id"] for v in p["variants"] if v["is_enabled"]}
        print(f"\n{p['title'][:60]}  →  {cfg['title'][:60]}...")
        print(f"  enabled variants: {len(en & light_ids)} light-color, {len(en - light_ids)} dark-color | tags {len(cfg['tags'])} | {'DRAFT, not published' if cfg.get('draft') else 'HIDE from Etsy' if cfg.get('hide') else 'publish'}")
        if color_opt is not None:
            lc = sorted({names[colour_of(v)] for v in p['variants'] if v['is_enabled'] and v['id'] in light_ids})
            dc = sorted({names[colour_of(v)] for v in p['variants'] if v['is_enabled'] and v['id'] not in light_ids})
            print("  light colors:", lc); print("  dark colors:", dc)
        old = p["print_areas"][0]
        front = next(ph for ph in old["placeholders"] if ph["position"] == "front")
        tmpl = front["images"][0]
        others = [ph for ph in old["placeholders"] if ph["position"] != "front" and any(im.get("type", "").startswith("image/") for im in ph.get("images", []))]
        def area(ids, which):
            img = upload(f"{cfg['design']}-for-{which}-shirts.png")
            return {"variant_ids": ids, "placeholders": [{"position": "front", "images": [{"id": img["id"], "x": tmpl["x"], "y": tmpl["y"], "scale": tmpl["scale"], "angle": tmpl["angle"]}]}]
                    + [{"position": ph["position"], "images": [{k: im[k] for k in ("id", "x", "y", "scale", "angle")} for im in ph["images"]]} for ph in others]}
        areas = []
        if TEXT_ONLY: dark_ids, light_ids = [], set()
        if dark_ids: areas.append(area(dark_ids, "dark"))
        if light_ids: areas.append(area(sorted(light_ids), "light"))
        body = {"title": cfg["title"], "description": cfg["desc"], "tags": cfg["tags"]}
        if TEXT_ONLY: print("  text only: design files left as they are")
        else: body["print_areas"] = areas
        if not APPLY: continue
        call("PUT", f"/shops/{SHOP}/products/{pid}.json", body)
        print("  updated")
        if cfg.get("draft"):
            print("  draft: NOT published (waiting for the owner's OK)"); continue
        if cfg.get("hide"):
            call("PUT", f"/shops/{SHOP}/products/{pid}.json", {"visible": False})
        call("POST", f"/shops/{SHOP}/products/{pid}/publish.json",
             {"title": True, "description": True, "images": True, "variants": True, "tags": True, "keyFeatures": True, "shipping_template": True})
        print("  sent to Etsy")

if __name__ == "__main__":
    main()
