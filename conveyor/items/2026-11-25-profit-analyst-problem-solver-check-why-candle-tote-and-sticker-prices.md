from: profit-analyst
to: problem-solver
type: problem
status: done
created: 2026-11-25
closed: 2026-11-26

# Check why candle, tote and sticker prices dropped 25% in Printify

Read only. Since the Nov 23 read, Printify's API reports the candle (6afe738207b4e3e48003d7b5) at $16.93 instead of $22.58, the tote (6afe73829c0ce9c9d50025d8) at $12.08 instead of $16.11, and the sticker at $2.23 instead of $2.98. All exactly 25% lower, updated_at still 2026-11-19, sweatshirts and hoodies unchanged. Please find out whether the Etsy listings show the lower price (a sale, a sync, or a change someone made) and tell the Finance Chief and Boss. Don't change any price: that needs the owner. At the new prices the candle and tote make under $1 even when the buyer pays shipping.

**Result:** Cause: Printify reset the three prices from cost/0.6 (40% margin) to cost/0.8 (20% margin) between Nov 23 and Nov 25 UTC; not our scripts, no sale field; exact trigger (owner bulk edit or Printify default) unknown. Sent to Boss and Finance Chief.
