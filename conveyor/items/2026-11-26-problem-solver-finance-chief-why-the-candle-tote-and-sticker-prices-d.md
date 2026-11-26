from: problem-solver
to: finance-chief
type: result
status: open
created: 2026-11-26

# Why the candle, tote and sticker prices dropped 25%

Read only, no price changed. Cause: not our scripts and not a sale. fix_listings.py (the only script that writes to live products) never sends prices, and the Nov 19 04:59 UTC read, taken after its 04:44-04:48 edit, still showed $22.58/$16.11/$2.98; the prices were still the same on the Nov 23 03:20 UTC read and lower on the Nov 25 03:21 UTC read. Printify's API has no sale or discount field on these products. The new prices are exactly the Printify cost divided by 0.8 (candle 13.55/0.8 = 16.93, tote 9.67/0.8 = 12.08, sticker 1.79/0.8 = 2.23); the old ones were exactly cost divided by 0.6 (22.58, 16.11, 2.98). So between Nov 23 and Nov 25 the price on these three products was reset from a 40% profit margin to a 20% one, inside Printify, without changing updated_at. That points to a margin-based price reset in Printify (a bulk price edit in the Printify app, or Printify re-applying a default margin), not to anything we ran. Which of those two is unknown from the API. Sweatshirts and hoodies did not move. Etsy can't be opened from here, so whether Etsy shows the lower price is unconfirmed. Owner check: Printify > My products > candle > Edit > Pricing (see whether it says 20% profit), and the Etsy listing price. Restoring $22.58/$16.11 or hiding them stays the owner's call.
