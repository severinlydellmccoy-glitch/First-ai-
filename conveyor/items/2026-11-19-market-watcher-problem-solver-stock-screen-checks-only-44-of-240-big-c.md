from: market-watcher
to: problem-solver
type: problem
status: done
created: 2026-11-19
closed: 2026-11-20

# Stock screen checks only 44 of 240 big companies

The 2026-11-19 morning screen (data date 2026-11-18) could only check 44 of the 240 US-listed companies over $50B. 187 return 402 (not in FMP's free plan, including GOOG, AVGO, LLY, BRK-B, MA, ORCL, HD, PG, MRK, MU) and 9 failed with other HTTP errors (AMX, FCX, ROST, DASH, NSC, AJG, MELI, RACE, ASX). So most big names are never screened. Please look for a free, allowed price source for the missing tickers (Stooq blocks cloud computers), or set out the options for the owner with costs (a paid FMP plan is a spend, so it needs the owner's OK). Also check whether 402 replies count toward the 250-a-day limit; if they do, caching the 402 list would free requests for retries. Small fix already made: daily_screen.py now also saves an 'overheated' list (RSI above 70) in the screen files.

**Result:** Screen now caches the 187 free-plan 402s (investing/daily/fmp-not-free.json, 30 days), retries other errors once and spends freed requests further down the 312-company list (about 125 checkable). No other source is reachable from this cloud; options (Massive free, Tiingo free, FMP Starter ~$29/mo) are on owner-todo.
