# Boss decisions: 2026-11-20

Based on `decisions/2026-11-20-briefing.md`, the Scout's `research/scout/2026-11-20-weekly-merch-report.md`, the Prospector's `research/prospecting/2026-11-20-prospecting-report.md`, `finance/2026-11-20-finance-decisions.md` and the shop rules in `decisions/2026-11-19-decisions.md` (all still in force).

**Conclusion:** Two picks. **(1) The Black Friday push uses what we already have.** That means the cat hoodie, black and navy on the cat sweatshirt, the Pinterest pins, and Etsy Ads at $3 a day on hoodies and sweatshirts only. All of it is built and waits only for the owner's OK. **(2) We make the dachshund Christmas design**, our own drawing, on a sweatshirt and a hoodie. It goes to the owner as unpublished drafts by **Nov 29**, so it can go live by **Dec 1**. The second bookish design waits, so the Artist puts all its time into the dachshund. **Tote:** it stays up only if the buyer pays shipping. If the shop has free shipping and the owner keeps it, the tote and candle both get hidden.

## 1. Make next

### Pick 1: Black Friday push (quick win, nothing new to build)

- **What goes in:**
  1. **Cat hoodie** goes live. The draft `6affbd9c13e72c2c980a0d76` has the Producer's copy, and the listing check found 7 of 7 products correct (Problem Solver, Nov 21). It makes $17.88 a sale, or $9.92 with free shipping.
  2. **Black and navy on the cat sweatshirt**, with the dark-shirts design. Today the cat sweatshirt is white only.
  3. **Pinterest pins**: 10 pins in `media/final/pinterest/`, 1 to 2 a day, posted by hand. The cat pins use the new white mockup (`media/final/mockups/holiday-cat-ornament-remover-white-sweatshirt-preview.png`), not the sand one.
  4. **Etsy Ads at $3 a day from Nov 23**, only on the hoodies and sweatshirts, and only after shipping and Offsite Ads have been checked. Stop rules are from the Finance Chief: $3.49 per sweatshirt sale and $4.96 per hoodie sale. No ads at all if Offsite Ads is on and shipping is free.
  5. **No Black Friday discount.** We have no sales yet, so there's nothing to compare a discount against. Ads tell us more for the money, and a 10% discount takes about $3.80 off a sweatshirt that makes $6.98 with free shipping.
- **Why:** The evidence is medium and getting stronger. The Amazon cat Christmas sweatshirts went from 100+ to 800+ and 600+ bought in the past month. These items give the best profit in the shop, and they're ready now. Black Friday is Nov 27.
- **Who works on it next:** the **owner** approves items 1, 2 and 4 and posts the pins. Then the **Problem Solver** publishes, using `fix_listings.py --only ID` for each product and then `check_listings.py`, and updates the live-listings line in CLAUDE.md. The **Producer** checks that the cat pins point to the white mockup.

### Pick 2: Dachshund Christmas, our own drawing, sweatshirt and hoodie (the bigger bet)

- **Why:** It has the strongest single signal this week: an Amazon dachshund Christmas sweatshirt shows 900+ bought in the past month. All three judges approved it, and its profit matches tonight's table: $14.94 a sweatshirt and $17.88 a hoodie if the buyer pays shipping, or $6.98 and $9.92 with free shipping. It also adds a new kind of buyer (dog owners), where the cat design only reaches cat owners. If it sells, the same layout can be redrawn for other breeds next year. The risks are a crowded Etsy market, evidence from one strong signal only, and a tight timeline.
- **Rules for the art:** it must be our own cartoon dachshund in our own drawing style, for example stretched long under the tree, tangled in lights, or in a scarf that's too long. It must not use song-lyric puns ("Dachshund Through the Snow", "Walking in a Weenie Wonderland") or any brand or character. Use our own short line, or no words at all. Make two files, one for light shirts and one for dark shirts.
- **Who works on it next, with dates:**
  1. **Artist:** final light and dark files in `art/final/`, plus mockups in the colors actually on sale, by **Nov 24**.
  2. **Producer:** sweatshirt and hoodie titles, 13 tags and descriptions in `media/final/`, checked by script, by **Nov 26**.
  3. **Problem Solver:** both products set up in Printify as **unpublished drafts** (`create_drafts.py`, copied from the book sweatshirt and book hoodie, with the right file on each color), with `check_listings.py` passing, by **Nov 29**.
  4. **Owner:** approves by **Dec 1** (the last safe day for Christmas orders).
- **If it slips past Dec 1:** finish the drafts anyway, but don't spend on ads for it. Keep it for next season and for gift buyers who don't need it by Christmas.

### Shop rule on the tote (decided)

- **If the buyer pays shipping:** the tote and candle stay up, with no ads (the tote makes $3.99 a sale, the candle $5.65).
- **If shipping is free and the owner keeps it free:** hide **both** the tote and the candle. Hiding means taking them off sale, not deleting them. With $8.79 shipping, the tote loses $0.49 a sale and the candle $1.86. Claude does this on the owner's word, because it changes a live listing.
- No price rise on the tote until shipping is known and it has a sale.

## 2. On hold

| Idea | Why |
| --- | --- |
| Second cozy bookish Christmas design (the draft "Blanket. Cocoa. chapter twelve." is in `art/drafts/`) | All three judges approved it, but the Artist's time before Dec 1 goes to the dachshund. Its words aren't tied to Christmas, so it can sell through the winter. It's next in line once the dachshund drafts are done. |
| More cat designs (the "Head of Tree Inspection" draft) | We get more from the cat by adding the hoodie and dark colors (Pick 1) than from new cat art this week. |
| Personalized pet-name sweatshirt (Prospector) | **Sent back by the Underboss.** The profit vote has to be redone on tonight's numbers, so it can't be picked. |
| Fiverr and Upwork service ideas (3) | They need a new account. The owner set January for these. |
| Other dog breeds (golden retriever, goldendoodle) | Only once the dachshund shows sales. |
| Mugs, stickers, new low-price products | Under $6 a sale with free shipping (shop rule 2 from Nov 19). |
| Printify Economy shipping (about $1.40 more per sale) | It's slower, so not before Christmas. We look at it again in January (Finance Chief). |

## 3. Needs the owner

1. **Check whether shipping is free** (Etsy Shop Manager > Settings > Delivery settings). *I recommend* the buyer pays shipping on the tote and candle. If you want free shipping, say so, and both get hidden.
2. **Offsite Ads** (Shop Manager > Settings > Offsite Ads). *I recommend* opting out. With free shipping and Offsite Ads together, a sweatshirt makes about $0 a sale.
3. **Publish the cat hoodie and add black and navy to the cat sweatshirt.** *I recommend* yes to both before **Nov 25**, so they're settled before Black Friday. It costs $0.20 in listing fees.
4. **Etsy Ads at $3 a day from Nov 23**, hoodies and sweatshirts only, after items 1 and 2. *I recommend* yes. It's about $21 a week, from your $25 to $50 a week.
5. **Samples (about $40)**, cat and book. *I recommend* yes. Seller blogs say Etsy may now want a real, unedited photo on every listing. That isn't confirmed by Etsy, but if it's true, the dachshund will also need a sample later (about $20).
6. **Approve the dachshund drafts** when they're ready (about Nov 29 to Dec 1). Nothing gets published without your OK.
7. **Investments:** nothing to decide. There are no sales yet, so there's no profit to invest.
