# Problem Solver: 2026-11-19

**Conclusion:** All 5 live Etsy listings are confirmed correct, and there is now a daily check so a wrong title or wrong design on a shirt color gets caught automatically. The Producer robot is set up, so Pinterest pins no longer wait on a Claude session.

## What I fixed

1. **Listing check (new):** `tools/printify/check_listings.py` reads every product from Printify (it changes nothing) and checks: our title, all 13 tags, the right design file on each color (light-shirts file on white, sand and grey; dark-shirts file on black and navy), and that it's on Etsy or hidden as planned. It also flags any new product still carrying Printify's own title. Today: 6 of 6 OK. The Analyst now runs it every day and sends any problem to me. Etsy's web addresses keep the old words of the first title; that is normal and harmless.
2. **Producer robot (new):** `.claude/agents/producer.md` writes listing text, Pinterest pins and short-video scripts, with the same no-copying, no-false-claims rules. It never publishes or spends. The Analyst now runs it when it has work. Its first job, the Boss's Pinterest pins, is on the conveyor.
3. Small fix: the conveyor tool now accepts item names exactly as `list` prints them.

## Closed

- "Check the Etsy titles really updated": done (all correct).
- "Printify API answers again": confirmed; the old "key rejected" item was already closed.

## What's next

- The Producer writes the Pinterest pins (next run). You post them by hand until Pinterest is connected, which would need a Pinterest business account (your call, later).
- Seller robot: create new products from `art/final/` straight from the Producer's listing files.
- Station map: Producer now shown as ready in `station/index.html`; the published page needs republishing.
