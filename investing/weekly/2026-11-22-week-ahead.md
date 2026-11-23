# Week ahead: Monday 2026-11-23 to Friday 2026-11-27 (Thanksgiving week)

**No business money to invest yet.** The owner hasn't set a share of profit to invest, and there's no profit yet (finance/2026-11-20-finance-decisions.md says the pool is $0; the ledger has no sales).

Written Sunday 2026-11-22 at about 7:45 pm Central. Prices are closing prices up to **Friday 2026-11-20**, from Financial Modeling Prep. Company sizes come from companiesmarketcap.com. News was checked on 2026-11-22.

**Coverage warning:** Friday's screen checked **48 of the 309** US-listed companies worth over $50 billion. The other 261 aren't in FMP's free plan (for example GOOG, AVGO, BRK-B, LLY, MA, ORCL, HD, PG, and Anthropic's new stock, ANT). If a big name is missing below, it may simply not have been checked.

## In short

- **Nothing passed the tests twice.** Four companies passed all three tests once each this week: Target and Disney (Wed), Sony (Thu) and Costco (Fri). None of them passed on two days.
- **A very bad week for the market.** Chip and AI stocks led the fall. Reports say the S&P 500 dropped 8.6% for the week and is now in a "correction", meaning 10% or more below its high.
- **Short week ahead.** Markets are closed Thursday Nov 26 for Thanksgiving and close early, at noon Central, on Friday Nov 27.
- **Costco's $30 dividend.** Costco pays a $30-a-share special dividend, and Tuesday Nov 24 is the expected cut-off date. On that day its price should drop by about $30 for that reason alone (see below).

## Which stocks kept passing the tests

Only three days were screened this week (the screens started Wednesday). To cover the whole week, I re-ran the same tests on the same 48 companies for Monday and Tuesday too. On Wednesday to Friday, the re-run matched the saved screens exactly. The numbers are in `investing/weekly/2026-11-22-week-data.json`.

"P" means it passed all three tests. "V" means high volume only. A dot means it didn't have high volume.

| Ticker | Company | Size | Mon 16 | Tue 17 | Wed 18 | Thu 19 | Fri 20 | Where it stood at Friday's close |
|---|---|---|---|---|---|---|---|---|
| TGT | Target | $75B | . | V | **P** | . | V | Volume 1.56×, but RSI fell (61.8 → 59.1). Close $165.83, above both averages. |
| DIS | Walt Disney | $202B | V | V | **P** | V | . | Volume 1.29×, RSI fell (62.8 → 56.4). Close $117.98, above both averages. |
| SONY | Sony (Japan, US-listed shares) | $159B | . | . | . | **P** | . | Missed only on volume (1.42×, just under 1.5×). RSI rising (64.1 → 64.9). Close $27.29, above both averages. |
| COST | Costco | $488B | . | . | . | . | **P** | Passed. Volume 1.67×, RSI 67.8 → 69.6 (just under the "overheated" line of 70). Close $1,102.15. |

Notes on these four:
- **Costco** was "overheated" on Monday and Tuesday (RSI 77.1, then 75.3). Its 50-day average only moved above its 200-day average on Wednesday, and the two are still close together ($986.73 against $979.00).
- **Sony, Target and Disney** stayed above their 50-day and 200-day averages all week. What changed from day to day was the volume and the direction of RSI.

**Above both averages on all five days, but never with high volume and a rising RSI on the same day:** Apple, Visa, AbbVie, Coca-Cola and HCA Healthcare, plus Disney, Sony and Target. Apple fell 1.9% on Friday and its price is now only just above its 50-day average ($342.56 against $341.81).

**Overheated (RSI above 70) at Friday's close:** none of the 48. Earlier in the week, Costco (Mon, Tue) and Coca-Cola (Mon) were above 70.

**Big volume on Friday, all on falling prices:** NVIDIA (-14.0%, 2.44×), AMD (-13.3%), TSMC (-9.4%), Goldman Sachs (-6.7%), Shopify (-6.3%), Citigroup, JPMorgan, Microsoft and Netflix. The checked names that rose on high volume were Walmart (+1.5%), Johnson & Johnson (+1.3%), AbbVie (+0.9%), Costco (+0.8%) and UnitedHealth (+2.9%, after falling about 20% earlier in the week).

## Events next week for this week's passers

| Date | Company | What |
|---|---|---|
| Tue Nov 24 | **Costco** | **Expected ex-dividend date for the $30 special dividend.** Only people who own the shares before that day get it. The dividend is about $13.3 billion in total, is paid Dec 4, and is separate from the regular $1.47 dividend. Costco also renewed a $4 billion buyback. [Costco 8-K (SEC)](https://www.sec.gov/Archives/edgar/data/0000909832/000090983226000134/costex9918-k111026.htm), [investingLive](https://investinglive.com/stocks/costco-declares-30-special-dividend-worth-13-3-billion-renews-4-billion-buyback/), declared 2026-11-10. The Nov 24 date is the record date. Reports expect it to be the ex-date too, but I didn't find the exchange's own notice. |
| Wed Nov 25 | **Disney** | Its animated film *Hexed* opens in US theaters. Early tracking points to a $35 to $45 million three-day opening, which would be Disney Animation's biggest original debut since *Moana*. These are forecasts, not results. [Koimoi](https://www.koimoi.com/box-office/hexed-north-america-box-office-can-it-crash-into-the-top-5-domestic-debuts-of-2026/). |
| Fri Nov 27 to Mon Nov 30 | **Target, Costco** | Black Friday (Nov 27) and Cyber Monday (Nov 30). I couldn't confirm the 2026 Black Friday sale dates for either company: the sources disagree or only give predictions. [IBTimes](https://www.ibtimes.co.uk/costco-target-walmart-black-friday-sale-schedules-1829400), [Digital Citizen](https://www.digitalcitizen.life/black-friday-2026-sale-dates-walmart-best-buy-target-amazon-costco/). |
| None found | **Sony** | No scheduled Sony event next week was found. This week's story was *Grand Theft Auto VI*: about three-quarters of its roughly 17 million first sales were reported to be on PlayStation (see the Nov 20 daily report). |

**Earnings:** none of the four report next week. Target (Nov 18) and Disney (Nov 17) reported this week. Costco's next report is expected around **Thursday Dec 10**, after the close, but that date is estimated by calendar sites, not announced by Costco. [Wall Street Horizon](https://www.wallstreethorizon.com/costco-earnings-calendar).

**How the Costco dividend affects the tests:** on the ex-dividend date, a stock normally opens lower by about the dividend amount. That's bookkeeping, not news. For Costco, $30 is about 2.7% of Friday's close. The prices the screen uses don't appear to be adjusted for dividends, so a drop of about $30 on Tuesday Nov 24 could make Costco's RSI fall and weaken its moving-average test for reasons that have nothing to do with the business. The Tuesday and Wednesday reports should point this out.

## Market calendar for the week

| Day | Market | Data and events |
|---|---|---|
| Mon Nov 23 | Normal hours | |
| Tue Nov 24 | Normal hours | Costco's expected ex-dividend date |
| Wed Nov 25 | Normal hours | Usually a busy data morning before the holiday. One calendar lists third-quarter GDP and weekly jobless claims at 8:30 am Eastern (7:30 am Central). October PCE inflation (the Federal Reserve's preferred inflation measure) is listed for the same week, but the calendar itself is unclear, so treat the exact date as unconfirmed. [FinanceCalendar](https://www.financecalendar.com/events/category/economic-indicators/day/2026-11-25/) |
| **Thu Nov 26** | **Closed (Thanksgiving)** | |
| **Fri Nov 27** | **Closes early at 1:00 pm Eastern (noon Central)** | Black Friday |
| Mon Nov 30 | Normal hours | Cyber Monday |

Holiday hours are from the [NYSE holiday calendar](https://www.nyse.com/markets/hours-calendars), [FINRA's Thanksgiving 2026 notice](https://www.finra.org/filing-reporting/technical-notices/trf-holiday-reminder-thanksgiving-2026) and [NYSE's 2026 to 2028 calendar announcement](https://www.businesswire.com/news/home/20251223981478/en/NYSE-Group-Announces-2026-2027-and-2028-Holiday-and-Early-Closings-Calendar).

**Daily reports:** there's no market-day report on Thursday. Friday morning's report will use **Wednesday's** close, because there's no Thursday trading.

## Market-wide news themes

1. **Chip and AI stocks fell hard, led by NVIDIA.** Timeline:
   - **Nov 12:** CEO Jensen Huang resigned, and CFO Colette Kress became interim CEO. Reports link the resignation to personal conduct, and NVIDIA gave no reason. [NVIDIA 8-K (SEC)](https://www.sec.gov/Archives/edgar/data/0001045810/000104581026000082/nvidiaannouncesceotransiti.htm), [CNN](https://www.cnn.com/2026/11/12/tech/jensen-huang-nvidia-resigns), [NPR](https://www.npr.org/2026/11/13/nx-s1-6038889/colette-kress-becomes-nvidias-interim-ceo-after-jensen-huang-resigns), 2026-11-12/13.
   - **Nov 17:** NVIDIA reported quarterly revenue of $115.8 billion, up 103% from a year earlier. [NVIDIA](https://investor.nvidia.com/news/press-release-details/2026/NVIDIA-Announces-Financial-Results-for-Third-Quarter-Fiscal-2027/), 2026-11-17.
   - **Same week:** The Wall Street Journal reported that the SEC (the US stock market regulator) has opened a civil investigation, partly into whether NVIDIA's disclosures misled investors. Neither the SEC nor NVIDIA has confirmed it. [InvestmentNews](https://www.investmentnews.com/equities/embattled-nvidia-faces-sec-probe-as-california-attorney-general-mulls-action/269054), [Crypto Briefing](https://cryptobriefing.com/sec-investigates-nvidia-investor-disclosures/).
   - **Friday:** NVIDIA fell 14.0% to $125.53. Market summaries tie the fall to a report that SEC enforcement staff are looking at possible accounting issues. I could only see that report through search summaries, not the original article, so treat it as reported, not confirmed. On the same day the chip-stock index fell about 10.7%, AMD fell 13.3% (it also faced a short seller's report on Nov 19) and TSMC fell 9.4%. [Stock Titan](https://www.stocktitan.net/articles/stock-market-today-live-november-20-2026), [StockInvest.us](https://stockinvest.us/digest/digest-us-market-close-2026-11-20), [Motley Fool](https://www.fool.com/coverage/stock-market-today/2026/11/20/stock-market-today-nov-20-stocks-plunge-as-ai-trade-unwinds/), 2026-11-20.
2. **The worst week in years for the main indexes.** On Friday, the S&P 500 fell 3.7% to about 6,910, and reports say it is now in correction territory. The Nasdaq fell 5.3%. The Dow fell about 950 points (1.9%) to about 48,147, and sources give slightly different Dow figures. For the week, reports put the S&P 500 down 8.6%, the Nasdaq down 10.0%, and the Dow at its worst week since March 2020. Same sources as above, plus [The Glass Desk](https://theglassdesk.substack.com/p/weekly-market-review-nov-20-2026).
3. **The Federal Reserve is expected to raise rates, not cut them.** The Fed raised rates in September and held them at 3.75% to 4.00% on Oct 28 (two officials voted for a raise). The minutes released Nov 18 show that almost all officials expect more increases, and Governor Waller has floated a half-point raise. Futures prices fully expect a quarter-point raise on **Dec 9**. Higher rates usually weigh most on fast-growing tech stocks. [Stock Analysis](https://stockanalysis.com/news/fed-minutes-october-2026/), [OPB](https://www.opb.org/article/2026/10/28/fed-holds-interest-rates-steady-despite-stubborn-inflation/).
4. **Money moved into "defensive" companies,** meaning companies people keep buying from in bad times, such as groceries, household goods and healthcare. In Friday's screen, Walmart, Costco, Johnson & Johnson, AbbVie and Coca-Cola rose while the market fell. [Finviz](https://finviz.com/news/423688/5-consumer-staples-stocks-reaching-new-highs-as-markets-retreat) described the same pattern on Nov 16.
5. **Health insurers are under pressure from a proposed Medicare audit rule.** UnitedHealth fell about 20% from Monday to Thursday after Medicare's agency (CMS) proposed the rule on Nov 16. It bounced 2.9% on Friday. The rule is a proposal, open for public comment until Jan 19, 2027 (see the Nov 19 and Nov 20 daily reports).
6. **Anthropic's stock market debut.** Anthropic (ANT) listed on Nov 19, and reports say it gave back much of its first-day gain on Friday. It's outside FMP's free plan, so it isn't screened. This report is written by Claude, an Anthropic AI, so read that mention with that in mind.

**Checked on Monday Nov 23** (see `investing/daily/2026-11-23-report.md`). Confirmed: the S&P 500's weekly fall (FMP's SPY prices show -8.56%, and SPY is 11.5% below its Oct 6 high, which counts as a correction) and Huang's resignation (reported by many separate outlets). The Friday NVIDIA report turned out to be from Reuters, and the SEC and NVIDIA still haven't confirmed it. Still unconfirmed: the chip index's -10.7% on Friday, the Nasdaq's -10.0% week, and the Dow's "worst week since March 2020".

## What the terms mean

- **Volume** is how many shares changed hands; "1.5×" means half again as much as a normal day, which usually means news. **RSI** (0 to 100) measures how strongly the price has risen or fallen over 14 days; 50 to 70 is a steady rise, and above 70 is a very fast one ("overheated").
- **Moving averages** are the average closing price over the last 50 or 200 days. A price above the 50-day average, with the 50-day above the 200-day, means the price has been trending up for months. An **ex-dividend date** is the first day a buyer no longer gets the next dividend.

*This is information, not financial advice. You decide what, if anything, to invest in.*
