# Automation plan

How close the business is to running itself. Update this whenever something gets automated or a new manual step appears.

**Target:** one weekly autopilot run: Scout and Prospector → judges → Underboss → Boss → Artist → Producer → Seller publishes via Printify → Analyst reads orders and profits → Boss updates the to-do list, the station and a weekly report. Orders print and ship themselves through Printify.

## Automated now

- [x] Market research with judges (Scout, Prospector), run on request
- [x] Quality check and decisions (Underboss, Boss), run on request
- [x] Owner to-do list, kept current by the Boss
- [x] Designs drawn and rendered print-ready (Artist, `art/source/build.js`)
- [x] **72-hour cycle:** a scheduled run every 3 days (Scout and Prospector with TikTok and Instagram trends → judges → Underboss → Boss → Problem Solver), with a phone notification
- [x] **Conveyor:** agents pass hand-offs, problems and lessons to each other through `conveyor/` every run
- [x] **Market Watcher:** daily stock report on market days at 7:45 am Central, plus a Sunday-night week-ahead report. **Needs the free FMP key.**
- [x] **Problem Solving Division:** the Problem Solver automates one or two manual jobs per cycle, under the owner's standing permission (`rules/working-with-me.md`, rule 6)

## Still manual: next to automate

- [ ] **Printify connection.** The key is saved; waiting for it to work. This unlocks everything below.
- [ ] **Seller agent:** create products in Printify from `art/final/` and publish to Etsy, as drafts at first and full auto once trusted.
- [ ] **Producer agent:** listing text (done by hand so far), Pinterest pins, short-video scripts and captions.
- [x] **Finance Operator agent** (Observatory): weekly sales report, profit breakdown, budget check and investment pool. It needs Printify access for orders and the owner's Etsy numbers.
- [ ] **Analyst agent:** read Printify orders and profits each week, compare them with ad spend, and feed the results to the Scout.
- [ ] **Weekly schedule:** one scheduled run that chains every agent, plus a report to the owner (phone notification).
- [ ] **Order fulfillment:** turn on "auto-approve orders" in Printify (an owner setting).
- [ ] **Station map:** update automatically at the end of each run.

## Needs a decision from the owner

- Auto-publish new designs, or save them as drafts for one-click approval?
- Day and time of the weekly run.
- How to get the weekly report: station and phone, and email too?

## Can't be automated (and why)

- **Etsy customer messages and Etsy Ads:** Etsy only gives this access to approved apps, so the owner handles them by email or in the app.
- **Spending money, accounts, investments:** the owner's rules keep these with the owner. Agents recommend.
- **Posting to TikTok and Instagram:** those apps limit posting by outside tools. The Producer makes posts, and the owner uploads them. Pinterest could be automated later.
