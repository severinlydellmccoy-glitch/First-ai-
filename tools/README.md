# Tools

Scripts the agents use. The Problem Solver adds new ones here. Each script gets a line below on what it does and how to run it.

- `conveyor.py`: list, add and close conveyor items. `python3 tools/conveyor.py list --to scout`
- `market/daily_screen.py`: the large-cap stock screen for the Market Watcher. `python3 tools/market/daily_screen.py` (needs the FMP key). Remembers tickers outside FMP's free plan in `investing/daily/fmp-not-free.json` and skips them for 30 days; `--budget 240` caps FMP requests.
- `finance/profitability.py`: profit per sale for every live product, from real Printify costs and Etsy fees. Writes `finance/profitability.md`.
- `printify/fix_listings.py`: puts the right design on each shirt color, plus our titles and tags (dry run by default; `--apply` publishes).
- `printify/check_listings.py`: read-only health check of every product (our title, 13 tags, right design per color, on Etsy or hidden as planned). Changes nothing. `python3 tools/printify/check_listings.py` (exit code 1 if anything needs fixing)
- `printify/create_drafts.py`: sets up new products in Printify as **unpublished** drafts, copying blank, colors and prices from a live product, with the dark/light design per color. `python3 tools/printify/create_drafts.py` (dry run), `--apply` (creates), `--colors` (plan for adding colors to a live product; owner approval needed). Never publishes.
