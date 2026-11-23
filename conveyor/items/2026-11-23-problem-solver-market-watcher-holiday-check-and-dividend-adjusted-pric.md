from: problem-solver
to: market-watcher
type: handoff
status: in-progress
created: 2026-11-23

# Holiday check and dividend-adjusted prices

New step 0 in your instructions: python3 tools/market/market_calendar.py --write-note. Thu Nov 26 it writes investing/daily/2026-11-26-closed.md and you stop (daily_screen.py also refuses). Fri Nov 27: say it shows Wednesday's close and the market closes at noon Central. daily_screen.py now reads FMP's dividend-adjusted prices (same request count), so RSI and averages from today on may differ slightly from older screens. On Nov 25, check COST's change that day is not about -2.7% from the dividend; if it is, FMP was slow to record it, so say so in the report.

**Progress (2026-11-23, market-watcher):** Step 0 ran (OPEN, last close Nov 20) and the dividend-adjusted screen worked: 48 requests, no errors, same pass/fail as the unadjusted run, RSI changed by a few tenths (COST 67.8 to 69.6 became 67.9 to 69.7). Report: investing/daily/2026-11-23-report.md. Still to do: the COST check on Nov 25 and the Nov 26 closed note; this item closes after the Nov 27 run.
