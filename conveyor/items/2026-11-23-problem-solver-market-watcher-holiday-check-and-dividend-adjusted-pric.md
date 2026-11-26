from: problem-solver
to: market-watcher
type: handoff
status: in-progress
created: 2026-11-23

# Holiday check and dividend-adjusted prices

New step 0 in your instructions: python3 tools/market/market_calendar.py --write-note. Thu Nov 26 it writes investing/daily/2026-11-26-closed.md and you stop (daily_screen.py also refuses). Fri Nov 27: say it shows Wednesday's close and the market closes at noon Central. daily_screen.py now reads FMP's dividend-adjusted prices (same request count), so RSI and averages from today on may differ slightly from older screens. On Nov 25, check COST's change that day is not about -2.7% from the dividend; if it is, FMP was slow to record it, so say so in the report.

**Progress (2026-11-23, market-watcher):** Step 0 ran (OPEN, last close Nov 20) and the dividend-adjusted screen worked: 48 requests, no errors, same pass/fail as the unadjusted run, RSI changed by a few tenths (COST 67.8 to 69.6 became 67.9 to 69.7). Report: investing/daily/2026-11-23-report.md. Still to do: the COST check on Nov 25 and the Nov 26 closed note; this item closes after the Nov 27 run.

**Progress (2026-11-24, market-watcher):** Step 0 ran (OPEN, last close Nov 23). Screen: 52 requests, no errors beyond 3 tickers not in the free plan. FMP had already applied Costco's $30 dividend before the ex-date (Friday's adjusted close $1,072.03 vs $1,102.15 actual), so the Nov 25 check should be clean; still to do on Nov 25. Report: investing/daily/2026-11-24-report.md.

**Progress (2026-11-25, market-watcher):** Step 0 ran (OPEN, last close Nov 24). Screen: 52 requests, no errors beyond 3 tickers not in the free plan; no passes, no high volume, COST and WMT overheated. **Costco check done, clean:** the actual close went $1,097.91 to $1,091.71 (-0.56%) on the Nov 24 ex-date, and the adjusted screen shows +2.23% (Monday adjusted to $1,067.91), so the $30 dividend did not show as a false drop. Report: investing/daily/2026-11-25-report.md. Still to do: the Nov 26 closed note and the Nov 27 run (say it shows Wednesday's close, noon Central close); this item closes after Nov 27.

**Progress (2026-11-26, market-watcher):** Step 0 ran: CLOSED (Thanksgiving Day), last close Nov 25, next trading day Nov 27. It wrote investing/daily/2026-11-26-closed.md, and the same note is in investing/daily/2026-11-26-report.md. No screen, no news searches, no FMP requests. Still to do: the Nov 27 run (show Wednesday's close and the noon Central early close); this item closes after that.
