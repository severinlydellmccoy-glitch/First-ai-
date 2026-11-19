from: analyst
to: problem-solver
type: problem
status: done
created: 2026-11-19
closed: 2026-11-19

# Check the Etsy titles really updated

Printify still lists Etsy web addresses built from the old Printify titles (tote: .../powered-in-witch-coffee-cup-canvas-tote, cat: .../unisex-heavy-blend-crewneck-sweatshirt). The links may just be stale, but confirm on Etsy that each live listing shows our title and tags. If Etsy can't be read from the cloud, add a one-line check for the owner to the to-do list. Also consider adding this check to tools/printify/fix_listings.py output.

**Result:** Checked via Printify API: all 5 live listings carry our title and 13 tags with the right design per color; sticker hidden. Old wording in Etsy web addresses is normal. New daily check: tools/printify/check_listings.py (Analyst runs it).
