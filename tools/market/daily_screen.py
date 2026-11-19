#!/usr/bin/env python3
"""Daily large-cap stock screen for the Market Watcher.

Finds US-listed companies worth over $50 billion (from companiesmarketcap.com), then for each one
reads about a year of daily prices (Financial Modeling Prep, key added by the network proxy as an
`apikey` header) and works out:
  - volume ratio: latest volume / average of the 20 days before
  - RSI(14), Wilder's smoothing, and whether it rose since the day before
  - 50-day and 200-day simple moving averages
It flags stocks that pass all three owner-set tests and writes JSON plus a Markdown table.
This is data, not advice: it never says buy or sell.

Usage:  python3 tools/market/daily_screen.py [--min-cap 50e9] [--out investing/daily] [--limit N]
"""
import argparse, csv, datetime as dt, io, json, os, sys, time, urllib.request, urllib.error

UA = "LiquidLav-Station/1.0"
MIN_VOL_RATIO, RSI_LOW, RSI_HIGH = 1.5, 50.0, 70.0

def get(url, headers=None, tries=3):
    for i in range(tries):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": UA, **(headers or {})})
            with urllib.request.urlopen(req, timeout=40) as r:
                return r.read().decode("utf-8", "replace")
        except urllib.error.HTTPError as e:
            if e.code == 402:
                raise LookupError("not in FMP's free plan")
            if e.code in (401, 403):
                raise SystemExit(f"Data source refused access ({e.code}) for {url.split('?')[0]}. Is the API key saved?")
            if e.code == 429 or i == tries - 1:
                if i == tries - 1: raise
            time.sleep(3 * (i + 1))
        except Exception:
            if i == tries - 1: raise
            time.sleep(3 * (i + 1))

def universe(min_cap):
    text = get("https://companiesmarketcap.com/?download=csv")
    rows = []
    for r in csv.DictReader(io.StringIO(text)):
        try: cap = float(r["marketcap"])
        except (ValueError, KeyError): continue
        sym = (r.get("Symbol") or "").strip()
        # US-listed tickers only: skip foreign listings such as 2222.SR or 0700.HK
        if cap >= min_cap and sym and "." not in sym:
            rows.append({"symbol": sym, "name": r["Name"], "market_cap": cap, "country": r.get("country", "")})
    return rows

def history(symbol, days=420):
    start = (dt.date.today() - dt.timedelta(days=days)).isoformat()
    url = f"https://financialmodelingprep.com/stable/historical-price-eod/full?symbol={symbol}&from={start}"
    data = json.loads(get(url, headers={"apikey": "proxy-injected"}))
    if isinstance(data, dict):
        data = data.get("historical") or []
    bars = [(d["date"], float(d["close"]), float(d.get("volume") or 0)) for d in data if d.get("close") is not None]
    bars.sort()
    return bars

def rsi_series(closes, n=14):
    if len(closes) <= n: return []
    gains = [max(closes[i] - closes[i - 1], 0) for i in range(1, len(closes))]
    losses = [max(closes[i - 1] - closes[i], 0) for i in range(1, len(closes))]
    ag, al = sum(gains[:n]) / n, sum(losses[:n]) / n
    out = [100 - 100 / (1 + ag / al) if al else 100.0]
    for g, l in zip(gains[n:], losses[n:]):
        ag, al = (ag * (n - 1) + g) / n, (al * (n - 1) + l) / n
        out.append(100 - 100 / (1 + ag / al) if al else 100.0)
    return out

def analyse(bars):
    if len(bars) < 205: return None
    closes, vols = [b[1] for b in bars], [b[2] for b in bars]
    rsi = rsi_series(closes)
    sma50, sma200 = sum(closes[-50:]) / 50, sum(closes[-200:]) / 200
    avg20 = sum(vols[-21:-1]) / 20 if sum(vols[-21:-1]) else 0
    m = {
        "date": bars[-1][0], "close": round(closes[-1], 2),
        "change_pct": round((closes[-1] / closes[-2] - 1) * 100, 2),
        "volume": int(vols[-1]), "vol_ratio": round(vols[-1] / avg20, 2) if avg20 else None,
        "rsi": round(rsi[-1], 1), "rsi_prev": round(rsi[-2], 1),
        "sma50": round(sma50, 2), "sma200": round(sma200, 2),
    }
    m["high_volume"] = bool(m["vol_ratio"] and m["vol_ratio"] >= MIN_VOL_RATIO)
    m["rsi_positive"] = m["rsi"] > m["rsi_prev"] and RSI_LOW <= m["rsi"] <= RSI_HIGH
    m["rsi_overheated"] = m["rsi"] > RSI_HIGH
    m["ma_positive"] = closes[-1] > sma50 > sma200
    m["passes_all"] = m["high_volume"] and m["rsi_positive"] and m["ma_positive"]
    return m

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--min-cap", type=float, default=50e9)
    ap.add_argument("--out", default="investing/daily")
    ap.add_argument("--limit", type=int, default=240, help="check only the largest N companies (the free FMP plan allows 250 requests a day)")
    a = ap.parse_args()
    uni = universe(a.min_cap)
    if a.limit: uni = uni[: a.limit]
    results, errors = [], []
    for c in uni:
        try:
            m = analyse(history(c["symbol"]))
            if m: results.append({**c, **m})
            else: errors.append(f"{c['symbol']}: not enough price history")
        except SystemExit: raise
        except LookupError as e:
            errors.append(f"{c['symbol']} ({e})")
        except Exception as e:
            errors.append(f"{c['symbol']}: {type(e).__name__}")
        time.sleep(0.25)
    os.makedirs(a.out, exist_ok=True)
    day = max((r["date"] for r in results), default=dt.date.today().isoformat())
    passing = sorted([r for r in results if r["passes_all"]], key=lambda r: -r["vol_ratio"])
    watch = sorted([r for r in results if r["high_volume"] and not r["passes_all"]], key=lambda r: -r["vol_ratio"])
    with open(os.path.join(a.out, f"{day}-screen.json"), "w") as f:
        json.dump({"data_date": day, "checked": len(results), "universe": len(uni), "errors": errors,
                   "passes_all": passing, "high_volume_other": watch}, f, indent=1)
    def row(r):
        return (f"| {r['symbol']} | {r['name']} | ${r['market_cap']/1e9:,.0f}B | ${r['close']:,} | {r['change_pct']:+}% | "
                f"{r['vol_ratio']}× | {r['rsi_prev']} → {r['rsi']}{' ⚠️' if r['rsi_overheated'] else ''} | "
                f"{'✓' if r['ma_positive'] else '✗'} |")
    head = "| Ticker | Company | Size | Close | Day | Volume vs 20-day | RSI | Price > 50-day > 200-day |\n|---|---|---|---|---|---|---|---|"
    md = [f"Data date: {day}. Checked {len(results)} of {len(uni)} companies over ${a.min_cap/1e9:.0f}B.",
          "", "### Passed all three tests", head, *([row(r) for r in passing] or ["| none today | | | | | | | |"]),
          "", "### High volume only (didn't pass every test)", head, *([row(r) for r in watch[:15]] or ["| none | | | | | | | |"])]
    if errors: md += ["", f"Couldn't check: {', '.join(errors[:20])}{' …' if len(errors) > 20 else ''}"]
    with open(os.path.join(a.out, f"{day}-screen.md"), "w") as f:
        f.write("\n".join(md) + "\n")
    print("\n".join(md))

if __name__ == "__main__":
    main()
