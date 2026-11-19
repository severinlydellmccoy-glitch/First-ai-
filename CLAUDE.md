# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Purpose

This workspace supports an online business with four connected areas of work:

1. **Market research**: finding niches, trends, competitors, pricing and demand for products sold online.
2. **Art**: original artwork and designs meant to become products.
3. **Media creation**: product images, mockups, video, social posts, and listing copy.
4. **Marketplace sales**: listing, pricing and tracking products on online marketplaces.

Work usually moves in that order: research picks what to make, the art and media get made, and sales data feeds the next round of research.

## Layout

- `rules/`: rules that apply to all work. Read every file in it before starting a task, and follow them.
- `research/`: market research notes, one dated Markdown file per topic. `research/scout/` holds the Scout's weekly merchandise reports, and `research/prospecting/` holds the Prospector's service-business ideas.
- `.claude/agents/`: the AI agents. The Scout and Prospector send every idea past three judges (Demand, Safety, Profit), who decide for themselves. The Underboss checks their reports and briefs the Boss, and the Boss makes the final call on what to make next. The Boss can't overturn a Safety deny, and money, accounts and investments stay with the owner.
- `decisions/`: the Underboss's briefings and the Boss's decisions.
- `conveyor/`: how the agents talk to each other: hand-offs, problems and requests in `items/`, plus the shared `lessons.md`. Every agent reads its items at the start of a run and adds new ones at the end (`tools/conveyor.py`).
- `investing/`: the Market Watcher's daily stock reports (market days, 7:45 am Central) and Sunday week-ahead reports. Information only, never buy or sell calls.
- `tools/`: scripts the agents use, each with a line on how to run it.
- `finance/`: the Finance Operator's ledger and weekly sales reports. It covers sales, costs, fees, ad spend, profit and the investment pool, but never stock picks.
- `art/`: original designs. `drafts/` holds work in progress and `final/` holds finished designs.
- `media/`: mockups, photos, video, social posts and listing copy, split the same way into `drafts/` and `final/`.

Each folder's README explains its naming conventions.

## Goal: autopilot

The owner wants the agents to run the business on their own once it's set up (`rules/working-with-me.md`, rule 5). Whenever a task is done by hand, also automate it for next time, and keep `decisions/automation-plan.md` up to date.

## Business plan

- **Products:** merchandise (designs printed on products such as shirts and mugs).
- **Where it sells:** Etsy and Amazon.
- **Growth:** use sales volume and media attention to make more media, which drives more Etsy and Amazon sales.
- **Profits:** a share of profits gets invested in stocks. The owner makes every investment decision. Claude can research and keep records, but doesn't pick stocks or present guesses as financial advice.

## Station

`station/index.html` is a top-down map of the business, drawn on a canvas with no libraries, and published at https://claude.ai/artifact/FX7jK2pgAyh9GkJi99JLAh. Whenever a folder, room or agent changes, update the data near the top of the page and republish to that same link, then save it back to `station/index.html` (the published page has no `<!doctype>`/`<head>` wrapper; the repository copy does).

- `MODULES`: one entry per room, with its place on the map (`x`, `y`, `w`, `h` in floor tiles) and status (`active`, `empty`, `planned`).
- `CORRIDORS`: the links between rooms.
- `AGENTS`: each robot's status (`ready`, `running`, `planned`).
- `CREW`: the crew roster (every robot, including the three judges), with its role and room.
- `TODO`: the top three items from the Boss's `decisions/owner-todo.md`, shown at the top of the panel.
- `COUNTS.conveyor` and `COUNTS.lessons`: open conveyor items and lessons; the gold boxes moving through the corridors are the open items.
- `COUNTS`: real numbers from the repository; they set the items on the belts, the bins and the idea board.

## Still to decide

Record here once known: the print-on-demand service, seller account details (never passwords), what share of profit is invested, and commands for any scripts that get added.

- **Stock data:** Financial Modeling Prep (free plan, 250 requests a day) for prices, with the key saved as a network secret (`apikey` header); companiesmarketcap.com for company sizes. Stooq blocks cloud computers.
- **Budget:** $25 to $50 a week, set by the owner on 2026-11-18. Plan: about $40 on 2 sample sweatshirts once the designs are fixed; then Etsy Ads at $3 to $5 a day, only on fixed listings that convert; plus listing fees ($0.20 each). Check ad spend against sales weekly, and stop ads on listings with no sales after about 2 weeks. The owner approves every purchase.
- **Shop name:** LiquidLav (chosen 2026-11-18). A web search found no shop, brand or trademark with this name.
- **Etsy:** account created by the owner on 2026-11-18. Shop setup (payments, billing) not confirmed yet.
- **Print-on-demand:** Printify, free plan. Account created and connected to the Etsy shop on 2026-11-18.
- **Etsy shop:** live at etsy.com/shop/LiquidLav since 2026-11-18.
- **Printify API:** connected 2026-11-18 (key saved as a network secret; Etsy store id 29819127). `tools/printify/fix_listings.py` sets the right design file per shirt color and our titles, tags and descriptions (dry run by default; `--apply` publishes).
- **Live listings (5, fixed 2026-11-18):** cat sweatshirt (white, $37.67 to $46.15), book sweatshirt and book hoodie (black, navy, white, sand, sport grey), tote (black, natural, $16.11), soy candle ($22.58). Each one uses the dark-shirts design on dark colors and the light-shirts design on light colors, with our titles and 13 tags. The sticker is hidden (it made about $0.25 to $0.70 after Etsy fees). Prices: the owner chose (2026-11-18) to keep Printify's prices ($37.67 and up for sweatshirts, about $16 to $23 profit after Etsy fees) instead of the $34.99 plan.
