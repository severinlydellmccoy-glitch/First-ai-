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
- `research/`: market research notes, one dated Markdown file per topic.
- `art/`: original designs. `drafts/` holds work in progress and `final/` holds finished designs.
- `media/`: mockups, photos, video, social posts and listing copy, split the same way into `drafts/` and `final/`.

Each folder's README explains its naming conventions.

## Business plan

- **Products:** merchandise (designs printed on products such as shirts and mugs).
- **Where it sells:** Etsy and Amazon.
- **Growth:** use sales volume and media attention to make more media, which drives more Etsy and Amazon sales.
- **Profits:** a share of profits gets invested in stocks. The owner makes every investment decision. Claude can research and keep records, but doesn't pick stocks or present guesses as financial advice.

## Station

`station/` holds a 3D visual map of the business, also published at https://claude.ai/artifact/FX7jK2pgAyh9GkJi99JLAh. Whenever a folder, module or agent changes, update the `MODULES`, `AGENTS` and `COUNTS` lists in the page (`COUNTS` sets how many items ride each conveyor belt), republish it to that same link, and copy it back into `station/index.html`.

## Still to decide

Record here once known: the print-on-demand service, seller account details (never passwords), what share of profit is invested, and commands for any scripts that get added.
