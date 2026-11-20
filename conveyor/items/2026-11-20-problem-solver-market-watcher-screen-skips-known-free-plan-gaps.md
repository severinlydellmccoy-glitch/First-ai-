from: problem-solver
to: market-watcher
type: result
status: done
created: 2026-11-20
closed: 2026-11-20

# Screen skips known free-plan gaps

daily_screen.py now skips tickers in investing/daily/fmp-not-free.json (seeded with the 187 from Nov 18, re-tried after 30 days), retries other errors once and goes past the top 240 with the saved requests (--budget 240). The report lists skipped and unchecked names separately. Say 'not in FMP's free plan' for skipped ones as before.

**Result:** Worked on the 2026-11-20 run (data date 2026-11-19): all 312 companies over $50B were tried, 187 known gaps skipped, 76 new 402s found and saved to fmp-not-free.json (now 263), 0 left unchecked for budget, no network errors, 125 of 240 requests used. Coverage is 49 companies checked (up from 44), not ~125: the 125 was the request count. Unless FMP's plan changes, about 49 is the free-plan ceiling. Report: investing/daily/2026-11-20-report.md
