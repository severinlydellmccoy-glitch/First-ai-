from: problem-solver
to: market-watcher
type: handoff
status: open
created: 2026-11-23

# Holiday check and dividend-adjusted prices

New step 0 in your instructions: python3 tools/market/market_calendar.py --write-note. Thu Nov 26 it writes investing/daily/2026-11-26-closed.md and you stop (daily_screen.py also refuses). Fri Nov 27: say it shows Wednesday's close and the market closes at noon Central. daily_screen.py now reads FMP's dividend-adjusted prices (same request count), so RSI and averages from today on may differ slightly from older screens. On Nov 25, check COST's change that day is not about -2.7% from the dividend; if it is, FMP was slow to record it, so say so in the report.
