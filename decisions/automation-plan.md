# Automation plan

How close the business is to running itself. Update this whenever something gets automated or a new manual step appears.

**Target:** one weekly autopilot run: Scout and Prospector → judges → Underboss → Boss → Artist → Producer → Seller publishes via Printify → Analyst reads orders and profits → Boss updates the to-do list, the station and a weekly report. Orders print and ship themselves through Printify.

## Automated now

- [x] Market research with judges (Scout, Prospector), run on request
- [x] Quality check and decisions (Underboss, Boss), run on request
- [x] Owner to-do list, kept current by the Boss
- [x] Designs drawn and rendered print-ready (Artist, `art/source/build.js`)
- [x] **Daily cycle (every 24 hours, 9:17 pm Central):** the Analyst (Observatory) decides each day which agents need to run (`decisions/YYYY-MM-DD-dispatch.md`), then the chosen ones run in order, with a phone notification. Replaced the 72-hour cycle on 2026-11-18 at the owner's request.
- [x] **Conveyor:** agents pass hand-offs, problems and lessons to each other through `conveyor/` every run
- [x] **Market Watcher:** daily stock report on market days at 7:45 am Central, plus a Sunday-night week-ahead report. FMP free key working since 2026-11-18, but the free plan covers only about 44 of 240 companies (problem raised with the Problem Solver 2026-11-19). The screen now also saves an overheated list, and since Nov 19 it remembers the free-plan gaps and skips them, so its daily allowance now reaches every company FMP's free plan covers (about 125 of 312, up from 44). Full coverage needs a second data source, which the owner has to choose (`decisions/owner-todo.md`).
- [x] **Problem Solving Division:** the Problem Solver automates one or two manual jobs per cycle, under the owner's standing permission (`rules/working-with-me.md`, rule 6)

## Still manual: next to automate

- [x] **Printify connection** works (Nov 18). Agents can read and update products.
- [x] **Listing fixer:** `tools/printify/fix_listings.py` puts the right design on each color and our titles and tags, then publishes
- [ ] **Seller agent:** create products in Printify from `art/final/` and publish to Etsy, as drafts at first and full auto once trusted. *Half done (Nov 19):* `tools/printify/create_drafts.py` sets up a new product as an unpublished draft, copying blank, colors and prices from a live product, with the right design per color. First use: the cat hoodie. Publishing still waits for the owner's yes.
- [x] **Producer agent** (`.claude/agents/producer.md`, Nov 19): listing text, Pinterest pins, short-video scripts and captions. The owner still posts pins and videos by hand.
- [x] **Listing check** (`tools/printify/check_listings.py`, Nov 19): the Analyst checks every product's title, tags and design-per-color each day, read only. Etsy itself can't be read from the cloud, so this checks what Printify sent to Etsy.
- [ ] **Pinterest posting:** Pinterest has an official API, but it needs an owner-created Pinterest business account and app approval. Until then the owner posts the Producer's pins.
- [ ] **New listing defaults:** `fix_listings.py` has a hand-written plan per product; the Seller agent should read titles and tags straight from `media/final/` listing files for new products.
- [x] **Finance Operator agent** (Observatory): weekly sales report, profit breakdown, budget check and investment pool. It needs Printify access for orders and the owner's Etsy numbers.
- [x] **Change one product at a time (Nov 20):** `fix_listings.py --only ID --text-only --apply` updates just that product's title, tags and description, with no design uploads and no republishing of the live listings. Used to put the Producer's hoodie copy on the cat hoodie draft.
- [ ] **Analyst agent:** read Printify orders and profits each week, compare them with ad spend, and feed the results to the Scout.
- [ ] **Weekly schedule:** one scheduled run that chains every agent, plus a report to the owner (phone notification).
- [ ] **Order fulfillment:** turn on "auto-approve orders" in Printify (an owner setting).
- [ ] **Station map:** update automatically at the end of each run.
- [ ] **Stock data for the big names FMP's free plan leaves out** (GOOG, AVGO, LLY and about 185 more). No other price source is reachable from this cloud yet; it needs the owner to pick one (free or paid) and allow its web address in the cloud's network settings.
- [ ] **Printify shipping prices:** Printify's old shipping lookup now answers empty, so the profit sheet falls back to the newer one, which shows higher sweatshirt shipping ($8.79 vs $7.39). The Profit Analyst should confirm which is right.

## Needs a decision from the owner

- Auto-publish new designs, or save them as drafts for one-click approval?
- Day and time of the weekly run.
- How to get the weekly report: station and phone, and email too?

## Can't be automated (and why)

- **Etsy customer messages and Etsy Ads:** Etsy only gives this access to approved apps, so the owner handles them by email or in the app.
- **Spending money, accounts, investments:** the owner's rules keep these with the owner. Agents recommend.
- **Posting to TikTok and Instagram:** those apps limit posting by outside tools. The Producer makes posts, and the owner uploads them. Pinterest could be automated later.
