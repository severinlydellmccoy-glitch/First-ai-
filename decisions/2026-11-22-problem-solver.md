# Problem Solver, 2026-11-22

## What I fixed

- **Dachshund drafts are ready, two days early.** The sweatshirt (`6b03b109f84ecfe9f804563a`) and hoodie (`6b03b10b27b0f205c40d07ab`) are in Printify as **unpublished** drafts, copied from the live book sweatshirt and book hoodie: same blank, print provider, colors and prices ($37.67 to $51.52 sweatshirt, $45.02 to $53.20 hoodie). The light-shirts design is on white, sand and sport grey (sport grey counts as light, checked in the dry run); the dark-shirts design is on black and navy. Title, 13 tags and description are the Producer's. No live product was changed and nothing was published.
- **Market holidays.** New `tools/market/market_calendar.py` lists the US market holidays and early closes through 2027. On Thanksgiving (Thu Nov 26), Christmas (Fri Dec 25) and New Year's Day (Fri Jan 1), the Market Watcher writes a two-line "market closed" note and stops, with no data requests. On Fri Nov 27 and Thu Dec 24 the market closes at noon Central, and the report says so.
- **Costco dividend.** FMP's usual prices are not adjusted for dividends. Its dividend-adjusted prices are in the free plan, so the stock screen now uses those, with the same number of requests. Costco's $30 dividend won't look like a price drop.

## How it works now

- `python3 tools/printify/check_listings.py`: 9 products, all OK (5 live, sticker hidden, 3 drafts: cat hoodie and the two dachshund products).
- The Market Watcher's first step is `python3 tools/market/market_calendar.py --write-note`. `daily_screen.py` also refuses to run on a holiday.

## What's next

- The owner's OK by Nov 25. Then set `"draft": False` for each approved product in `fix_listings.py` and run `--only ID --apply` for each one.
- The second book design's drafts by Nov 29, made the same way once the Artist's files and the Producer's copy are in `final/`.
- The pet-name test draft (no money) after that.
- Add the 2028 holidays to the calendar in December 2027.
- One caveat: if FMP is slow to record Costco's dividend, Tuesday's screen could still show the drop. The Market Watcher will check Costco's numbers on Nov 25.

Source for the holiday dates: NYSE Group's 2026-2028 holiday calendar, read in search results ([ICE investor relations](https://ir.theice.com/press/news-details/2025/NYSE-Group-Announces-2026-2027-and-2028-Holiday-and-Early-Closings-Calendar/default.aspx), [Business Wire](https://businesswire.com/news/home/20241108580933/en/NYSE-Group-Announces-2025-2026-and-2027-Holiday-and-Early-Closings-Calendar)), checked 2026-11-23. nyse.com itself can't be opened from this cloud.
