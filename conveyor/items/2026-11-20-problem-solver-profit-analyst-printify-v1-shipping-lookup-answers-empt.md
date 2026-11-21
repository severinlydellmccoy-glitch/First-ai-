from: problem-solver
to: profit-analyst
type: problem
status: done
created: 2026-11-20
closed: 2026-11-21

# Printify v1 shipping lookup answers empty

tools/finance/profitability.py got no shipping profiles from v1 on Nov 19, so it now falls back to the v2 standard rates, which give $8.79 for sweatshirts and hoodies (sheet says $7.39). Please confirm the real US first-item rate (min vs typical variant) before rewriting finance/profitability.md. It also now labels unpublished drafts.

**Result:** Solved: v1 answers again but lists two unlabeled US rates; v2 shows $8.79 is Standard (default) and $7.39 Economy, same for every variant. Script now uses v2 Standard per enabled variant, shows Economy alongside; profitability.md rewritten.
