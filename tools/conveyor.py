#!/usr/bin/env python3
"""The conveyor: list, add and close items passed between agents.

  python3 tools/conveyor.py list [--to NAME] [--all]
  python3 tools/conveyor.py add --from NAME --to NAME --type handoff|problem|request|idea|result --title "..." --body "..."
  python3 tools/conveyor.py close FILE --result "one line"
  python3 tools/conveyor.py stats            # counts by status, for the station map
"""
import argparse, datetime as dt, os, re, sys, glob
DIR = os.path.join(os.path.dirname(__file__), "..", "conveyor", "items")

def read(path):
    head, body = {}, []
    with open(path) as f:
        lines = f.read().splitlines()
    i = 0
    while i < len(lines) and re.match(r"^\w+:\s", lines[i]):
        k, v = lines[i].split(":", 1); head[k.strip()] = v.strip(); i += 1
    return head, "\n".join(lines[i:]).strip()

def write(path, head, body):
    with open(path, "w") as f:
        f.write("\n".join(f"{k}: {v}" for k, v in head.items()) + "\n\n" + body.strip() + "\n")

def items():
    return [(p, *read(p)) for p in sorted(glob.glob(os.path.join(DIR, "*.md")))]

def main():
    ap = argparse.ArgumentParser(); sub = ap.add_subparsers(dest="cmd", required=True)
    l = sub.add_parser("list"); l.add_argument("--to"); l.add_argument("--all", action="store_true")
    a = sub.add_parser("add")
    for k in ("from", "to", "type", "title", "body"): a.add_argument("--" + k, required=True)
    c = sub.add_parser("close"); c.add_argument("file"); c.add_argument("--result", required=True)
    sub.add_parser("stats")
    x = ap.parse_args()
    os.makedirs(DIR, exist_ok=True)
    if x.cmd == "list":
        for p, h, b in items():
            if not x.all and h.get("status") == "done": continue
            if x.to and h.get("to") not in (x.to, "anyone"): continue
            print(f"{os.path.basename(p)}  [{h.get('type')}/{h.get('status')}]  {h.get('from')} → {h.get('to')}\n    {b.splitlines()[0] if b else ''}")
    elif x.cmd == "add":
        today = dt.date.today().isoformat()
        slug = re.sub(r"[^a-z0-9]+", "-", x.title.lower()).strip("-")[:40]
        p = os.path.join(DIR, f"{today}-{x.__dict__['from']}-{x.to}-{slug}.md")
        write(p, {"from": x.__dict__["from"], "to": x.to, "type": x.type, "status": "open", "created": today}, f"# {x.title}\n\n{x.body}")
        print("added", os.path.relpath(p))
    elif x.cmd == "close":
        if not os.path.exists(x.file):  # accept the bare name that `list` prints
            x.file = os.path.join(DIR, os.path.basename(x.file))
        h, b = read(x.file); h["status"] = "done"; h["closed"] = dt.date.today().isoformat()
        write(x.file, h, b + f"\n\n**Result:** {x.result}"); print("closed", x.file)
    elif x.cmd == "stats":
        from collections import Counter
        print(dict(Counter(h.get("status") for _, h, _ in items())))

if __name__ == "__main__":
    main()
