# Problem Solver, 2026-11-23

## What I did

- **Book design 2 drafts are up, two days early (due Nov 25).** "Blanket. Cocoa. chapter twelve." now exists in Printify as an unpublished sweatshirt (`6b050281dd767dcca50b4e2e`) and hoodie (`6b050284f05114a8960af366`), copied from the live book sweatshirt and hoodie: same blank, printer, colors and prices. The light-shirts file is on White, Sand and Sport Grey; the dark-shirts file on Black and Navy. Titles, 13 tags and descriptions are the Producer's copy, read straight from `media/final/`.
- Both are in `fix_listings.py` PLAN with `draft: True`, so a full run can never publish them. No live product was changed.
- `check_listings.py`: 11 OK, 0 need fixing (6 live or hidden, 5 drafts).

## How it works now

`create_drafts.py` has both new entries and skips them on later runs, since they already exist. Publishing waits for the owner: "By Nov 29: publish the blanket cocoa book sweatshirt and hoodie" is in `owner-todo.md` under Shop setup.

## Next

1. On the owner's OK (Nov 25 message): publish the cat hoodie, black and navy on the cat sweatshirt, and the dachshund drafts, one at a time with `--only ID`, then check.
2. On the owner's separate OK (by Nov 29): publish the book design 2 drafts the same way.
3. When free: one unpublished pet-name test draft (no money), to see whether Printify charges more for a text layer.
4. Still by hand: adding each new draft id to PLAN after `create_drafts.py --apply` (automation plan, "New listing defaults").
