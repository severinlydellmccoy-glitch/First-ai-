#!/usr/bin/env python3
"""US stock market (NYSE/Nasdaq) holidays and early closes, for the Market Watcher. Makes no data requests.

Source: NYSE Group's holiday and early-closings calendar (2026-2028 release, as quoted in search results,
checked 2026-11-23; nyse.com itself can't be opened from this cloud). The list runs to the end of 2027:
after that the script says so, and the Problem Solver adds the next year.

Usage:  python3 tools/market/market_calendar.py               # today (Central time): open, closed or early close
        python3 tools/market/market_calendar.py 2026-11-26    # any date
        python3 tools/market/market_calendar.py --write-note  # on a closed day, also writes investing/daily/<date>-closed.md
Exit code: 0 = market open (full or early close), 2 = closed (holiday or weekend), 3 = date past the end of the list.
"""
import datetime as dt, os, sys
from zoneinfo import ZoneInfo

HOLIDAYS = {
    "2026-01-01": "New Year's Day", "2026-01-19": "Martin Luther King Jr. Day", "2026-02-16": "Washington's Birthday",
    "2026-04-03": "Good Friday", "2026-05-25": "Memorial Day", "2026-06-19": "Juneteenth", "2026-07-03": "Independence Day (observed)",
    "2026-09-07": "Labor Day", "2026-11-26": "Thanksgiving Day", "2026-12-25": "Christmas Day",
    "2027-01-01": "New Year's Day", "2027-01-18": "Martin Luther King Jr. Day", "2027-02-15": "Washington's Birthday",
    "2027-03-26": "Good Friday", "2027-05-31": "Memorial Day", "2027-06-18": "Juneteenth (observed)", "2027-07-05": "Independence Day (observed)",
    "2027-09-06": "Labor Day", "2027-11-25": "Thanksgiving Day", "2027-12-24": "Christmas Day (observed)",
}
# Early closes: 1:00 pm Eastern = 12:00 noon Central.
EARLY_CLOSES = {"2026-11-27": "day after Thanksgiving", "2026-12-24": "Christmas Eve", "2027-11-26": "day after Thanksgiving"}
LIST_ENDS = dt.date(2027, 12, 31)
ROOT = os.path.join(os.path.dirname(__file__), "..", "..")


def today_central():
    return dt.datetime.now(ZoneInfo("America/Chicago")).date()


def is_trading_day(d):
    return d.weekday() < 5 and d.isoformat() not in HOLIDAYS


def prev_trading_day(d):
    d -= dt.timedelta(days=1)
    while not is_trading_day(d): d -= dt.timedelta(days=1)
    return d


def next_trading_day(d):
    d += dt.timedelta(days=1)
    while not is_trading_day(d): d += dt.timedelta(days=1)
    return d


def status(d):
    """('closed', why) | ('early', why) | ('open', '') | ('unknown', why)"""
    if d > LIST_ENDS: return "unknown", f"holiday list ends {LIST_ENDS}; add the next year from the NYSE calendar"
    k = d.isoformat()
    if k in HOLIDAYS: return "closed", HOLIDAYS[k]
    if d.weekday() >= 5: return "closed", "weekend"
    if k in EARLY_CLOSES: return "early", f"{EARLY_CLOSES[k]}: closes early at 12:00 noon Central (1:00 pm Eastern)"
    return "open", ""


def fmt(d):
    return d.strftime("%A, %B ") + str(d.day)


def closed_note(d, why):
    last, nxt = prev_trading_day(d), next_trading_day(d)
    extra = f" ({EARLY_CLOSES[nxt.isoformat()]}: the market closes at 12:00 noon Central that day)" if nxt.isoformat() in EARLY_CLOSES else ""
    return (f"# {fmt(d)}: US stock market closed ({why})\n\n"
            f"Market closed today, so there are no new prices and no screen. The next report is {fmt(nxt)}{extra}, "
            f"showing the close of {fmt(last)}.\n\n"
            "*This is information, not financial advice. You decide what, if anything, to invest in.*\n")


def main():
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    d = dt.date.fromisoformat(args[0]) if args else today_central()
    s, why = status(d)
    if s == "unknown": print(f"{d}: {why}"); sys.exit(3)
    if s == "closed":
        print(f"{d}: CLOSED ({why}). Last close: {prev_trading_day(d)}. Next trading day: {next_trading_day(d)}.")
        if "--write-note" in sys.argv and why != "weekend":
            path = os.path.join(ROOT, "investing", "daily", f"{d}-closed.md")
            open(path, "w").write(closed_note(d, why)); print("wrote", os.path.relpath(path, ROOT))
        sys.exit(2)
    print(f"{d}: OPEN" + (f", EARLY CLOSE ({why})" if s == "early" else "") + f". Last close: {prev_trading_day(d)}.")


if __name__ == "__main__":
    main()
