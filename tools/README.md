# Tools

Scripts the agents use. The Problem Solver adds new ones here. Each script gets a line below on what it does and how to run it.

- `conveyor.py`: list, add and close conveyor items. `python3 tools/conveyor.py list --to scout`
- `market/daily_screen.py`: the large-cap stock screen for the Market Watcher. `python3 tools/market/daily_screen.py` (needs the FMP key)
- `finance/profitability.py`: profit per sale for every live product, from real Printify costs and Etsy fees. Writes `finance/profitability.md`.
- `printify/fix_listings.py`: puts the right design on each shirt color, plus our titles and tags (dry run by default; `--apply` publishes).
