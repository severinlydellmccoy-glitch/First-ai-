# Problem Solver, 2026-11-20

## What I fixed
- **The cat hoodie now has the Producer's own wording.** Title (137 characters), 13 tags and description from `media/final/holiday-cat-ornament-remover-hoodie-listing.md` are on the Printify draft `6affbd9c13e72c2c980a0d76`. It is still **unpublished**, waiting for the owner's OK.
- **Safer listing fixer.** Before, `fix_listings.py --apply` rewrote and republished every live product, even when only one needed a change. It now has two options: `--only ID` (touch one product, leave the rest alone) and `--text-only` (title, tags and description only, with no design uploads).

## How it works now
- Dry run: `python3 tools/printify/fix_listings.py --only 6affbd9c13e72c2c980a0d76 --text-only`, then the same with `--apply`. Drafts are still never published.
- `python3 tools/printify/check_listings.py`: all 7 products OK (5 live on Etsy, sticker hidden, cat hoodie a draft).

## What's next
- The owner says "publish the cat hoodie". Then set `"draft": False` for it in `fix_listings.py` and run `--only 6affbd9c13e72c2c980a0d76 --apply`.
- Automation plan: the Seller agent should read titles and tags straight from `media/final/` listing files.
