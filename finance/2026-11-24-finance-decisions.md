# Finance decisions: 2026-11-24

Finance Chief, short run. Based on `finance/profitability.md` (Printify read 2026-11-25 UTC), the Profit Analyst's Nov 24 hand-off, and a direct Printify API check tonight. Decisions from `2026-11-22-finance-decisions.md` stand unless changed below. Still 0 orders and $0 spent; `ledger.csv` empty.

## Conclusion

**The tote and candle no longer make money, and we don't know why their prices dropped.** Printify now shows the tote at **$12.08** (was $16.11) and the candle at **$16.93** (was $22.58), exactly 25% lower. Both products were last changed in Printify on 2026-11-19 at about 04:44 to 04:48 UTC, right around our Nov 19 listing fix, but `tools/printify/fix_listings.py` has no price code, so the cause is unknown. What Etsy shows buyers has not been checked.

**Recommendation for the owner:** check the Etsy price of both, then **restore the old prices** ($16.11 tote, $22.58 candle). If you'd rather not, **hide both** until it's sorted. **No ads on either one** in any case. Hoodies and sweatshirts are unchanged and stay strong.

## 1. Keep and grow

- Hoodies and sweatshirts, live and the 5 drafts: $17.88 / $14.94 a sale if the buyer pays shipping, $9.92 / $6.98 with free shipping. No change. Publishing the drafts stays the top job.

## 2. Fix: tote and candle prices

| Product | Price now | Profit now (buyer pays / free shipping) | At the old price (buyer pays / free shipping) |
|---|---|---|---|
| Candle | $16.93 | $0.53 / -$6.97 | $22.58: $5.65 / -$1.86 |
| Tote | $12.08 | $0.34 / -$4.14 | $16.11: $3.99 / -$0.49 |

Even at the old prices both are thin and only work if the buyer pays shipping. At today's prices, every sale is about break-even at best.

What to do (owner, about 3 minutes):
1. Open etsy.com/shop/LiquidLav and click the tote, then the candle. Note the price shown.
2. Tell Claude what you see, and say either **"restore the tote and candle prices"** or **"hide the tote and candle"**.
   - If Etsy still shows $16.11 and $22.58: only Printify's copy changed. Restore it anyway, so a later sync from Printify can't push the lower price to Etsy.
   - If Etsy shows $12.08 and $16.93: buyers see the lower price now. Restore (recommended) or hide.
3. Either way, keep the buyer paying shipping on both (Shop Manager > Settings > Delivery settings).

The Problem Solver is looking for the cause (read only). Nobody changes a price without the owner.

## 3. Drop or pause

- If the owner doesn't restore the prices, **hide the tote and candle** (nothing gets deleted). Sticker stays hidden (now -$0.65 a sale).

## 4. Budget and ad stop limits (re-checked)

- **This week's plan is unchanged:** Etsy Ads at $3 a day on hoodies and sweatshirts only, about $22 with listing fees, once the owner confirms shipping and Offsite Ads. Sample in the week of Nov 30.
- **Not on ads:** tote, candle, sticker (safe ad spend $0).
- **Ad stop limits, re-checked:** the table's safe spend per sale is $3.49 (sweatshirt) and $4.96 (hoodie). If the unconfirmed $0.40 Printify holiday surcharge is real, those become $3.29 and $4.76. **Use the lower figures for the Nov 30 check ($3.29 sweatshirt, $4.76 hoodie)**, because being 20 cents too careful costs nothing and the surcharge period (to Jan 17) covers all our ads. Everything else stays: never over $3 a day, no ads if free shipping and Offsite Ads are both on, stop if no ad sales by Dec 6.
- **Christmas ad stop stays Dec 1.** Our printer is Printify Choice; its Dec 9 date comes only from third-party sites, so it doesn't move the stop. If the owner reads the Printify Choice Standard date on Printify's Holiday Hub, the stop moves to about a week before it.

## 5. Investment pool

**Not set yet.** No profit yet, so the pool is $0.

## 6. What needs doing

**Owner (via the Boss, `decisions/owner-todo.md`):**
1. Check the tote and candle prices on Etsy; say "restore" (recommended) or "hide". No ads on them.
2. The Nov 30 ad check uses $3.29 / $4.76 per sale (was $3.49 / $4.96).

**Boss (conveyor):** add the two lines above to the owner list. The weekly budget total doesn't change.
