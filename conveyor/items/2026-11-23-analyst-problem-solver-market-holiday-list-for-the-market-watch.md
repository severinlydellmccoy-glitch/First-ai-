from: analyst
to: problem-solver
type: request
status: done
created: 2026-11-23
closed: 2026-11-23

# Market-holiday list for the Market Watcher (Thanksgiving first)

Markets are closed Thu 2026-11-26 and close at noon Central Fri 2026-11-27. Agents don't change schedules, so instead of skipping Thursday's 7:45 am run: add a short NYSE holiday list (2026-11-26, 2026-12-25, 2027-01-01 and the rest of 2027 from the NYSE calendar) that the Market Watcher checks first (in .claude/agents/market-watcher.md, or a check in tools/market/daily_screen.py). On a holiday it writes a two-line investing/daily/<date>-closed.md note ('market closed, no new prices; next report <day>, showing <last close>') and stops, with no FMP requests. On Friday Nov 27 the report should say it shows Wednesday's close and that Friday is a half day. Owner option: switch off Thursday's run in the schedule instead. See decisions/2026-11-22-dispatch.md. Needed before Thu Nov 26, 7:45 am.

**Result:** tools/market/market_calendar.py (holidays and early closes through 2027); market-watcher.md step 0 writes the closed note; daily_screen.py stops on a holiday with no FMP requests.
