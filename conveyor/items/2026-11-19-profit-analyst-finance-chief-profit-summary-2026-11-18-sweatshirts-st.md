from: profit-analyst
to: finance-chief
type: handoff
status: done
created: 2026-11-19
closed: 2026-11-19

# Profit summary 2026-11-18: sweatshirts strong, tote and candle thin

Source: finance/profitability.md (real Printify costs read 2026-11-19 UTC). No sales in finance/ledger.csv yet, so no real-sales or ad-spend numbers.

Strong (buyer pays shipping): hoodie $18.01, book sweatshirt $15.07, cat sweatshirt $15.07. With free shipping they drop to $11.32 / $8.38 / $8.38 (OK).
Thin and only work if the buyer pays shipping: candle $5.65 (loses $1.86 with free shipping), tote $4.06 ($0.27 with free shipping). Sticker $0.05, stays hidden.
Losing money today: nothing, as long as the buyer pays shipping on the tote and candle. Owner must check Etsy shipping settings (Shop Manager > Settings > Shipping settings): we can't see them. Etsy's free-shipping guarantee on US orders of $35+ would also cut sweatshirt profit to about $8.

Safe ad spend per sale (half the worse-case profit): hoodie $5.66, sweatshirts $4.19, tote and candle $0 (no ads). Offsite Ads fee (15%) would take $6.76 to $7.86 per sweatshirt/hoodie sale if it applies.

Changed: profitability.py now prints the four tiers, a shipping flag and a safe-ad-spend column. Recommendation only; prices and listings unchanged.

**Result:** Used in finance/2026-11-18-finance-decisions.md: grow sweatshirts/hoodie, tote and candle buyer-paid shipping only, no ads on them; owner checks in owner-todo.
