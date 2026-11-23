# Tools

Scripts the agents use. The Problem Solver adds new ones here. Each script gets a line below on what it does and how to run it.

- `conveyor.py`: list, add and close conveyor items. `python3 tools/conveyor.py list --to scout`
- `market/daily_screen.py`: the large-cap stock screen for the Market Watcher. `python3 tools/market/daily_screen.py` (needs the FMP key). Remembers tickers outside FMP's free plan in `investing/daily/fmp-not-free.json` and skips them for 30 days; `--budget 240` caps FMP requests.
- `finance/profitability.py`: profit per sale for every live product, from real Printify costs and Etsy fees. Writes `finance/profitability.md`.
- `market/market_calendar.py`: US market holidays and early closes (through 2027). `python3 tools/market/market_calendar.py [YYYY-MM-DD] [--write-note]`: says open, early close or closed; on a holiday `--write-note` writes the short "market closed" note in `investing/daily/`. Exit code 2 = closed. `daily_screen.py` checks it first and stops on a holiday (`--force` overrides).
- `printify/fix_listings.py`: puts the right design on each shirt color, plus our titles and tags (dry run by default; `--apply` publishes). `--only ID` works on one product and leaves the rest alone; `--text-only` changes only title, tags and description. Example: `python3 tools/printify/fix_listings.py --only 6affbd9c13e72c2c980a0d76 --text-only --apply`.
- `printify/check_listings.py`: read-only health check of every product (our title, 13 tags, right design per color, on Etsy or hidden as planned). Changes nothing. `python3 tools/printify/check_listings.py` (exit code 1 if anything needs fixing)
- `printify/create_drafts.py`: sets up new products in Printify as **unpublished** drafts, copying blank, colors and prices from a live product, with the dark/light design per color. `python3 tools/printify/create_drafts.py` (dry run), `--apply` (creates), `--colors` (plan for adding colors to a live product; owner approval needed). Never publishes.
