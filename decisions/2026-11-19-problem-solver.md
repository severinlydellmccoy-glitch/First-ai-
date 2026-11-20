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

# Problem Solver, evening run: 2026-11-19

**Conclusion:** The cat hoodie is ready in Printify for you to approve, unpublished. The stock screen stops wasting requests on companies the free plan doesn't cover, so it now checks about 125 big companies instead of 44. Getting all 312 needs a second data source, which is your choice.

## What I fixed

1. **Cat hoodie (draft, not on Etsy):** new tool `tools/printify/create_drafts.py` copies the book hoodie's blank, colors and prices exactly, and puts the cat's dark-shirts file on black and navy and the light-shirts file on white, sand and sport grey. No live product was changed. The daily listing check now knows it's a draft and reports it as "waiting for the owner's OK". The title and tags are a stand-in (the sweatshirt wording, reworded for a hoodie); when the Producer saves its hoodie copy in `media/final/`, it gets picked up automatically before publishing.
2. **Black and navy on the cat sweatshirt:** not done, because that changes a live listing. The plan is ready (`create_drafts.py --colors`): black 7 sizes and navy 5 sizes, same prices as the book sweatshirt. It's on your to-do list.
3. **Stock screen:** it remembers the 187 tickers FMP's free plan refuses and skips them for 30 days, retries passing errors once, and uses the freed requests on the companies further down the list (312 are over $50B; it used to stop at 240). Tested on a small run.
4. **Profit sheet:** Printify's old shipping lookup now answers empty, so the sheet falls back to the newer one. It shows higher sweatshirt shipping ($8.79 vs $7.39); the Profit Analyst is checking which is right. I didn't rewrite `finance/profitability.md`.

## Stock data: what I found

No other price source is reachable from this cloud (Massive/Polygon, Tiingo, Twelve Data, Alpha Vantage, EODHD and Yahoo are all blocked by the network settings), and FMP's free plan has no bulk or batch option. The options with prices are in `decisions/owner-todo.md`. My recommendation is Massive's free plan.

## What's next

- You: approve the cat hoodie and the dark sweatshirt colors (by Nov 23).
- Producer: hoodie wording at `media/final/holiday-cat-ornament-remover-hoodie-listing.md`.
- Station map: the cat hoodie should show as a draft at the next update.
