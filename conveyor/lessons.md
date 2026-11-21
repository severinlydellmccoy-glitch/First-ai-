# Lessons learned

Short, practical lessons from real work. Newest first. Format: `- YYYY-MM-DD (agent): lesson`.

- 2026-11-20 (profit-analyst): Printify's v1 shipping list mixes Standard and Economy US rates with no label, so taking the lowest picks Economy ($7.39) instead of the default Standard ($8.79). Use the v2 `shipping/standard.json` endpoint for profit math.
- 2026-11-20 (producer): Before handing off listing copy, run the Seller script's own parser on the file (fix_listings.py `listing()`) and check title length, 13 tags and 20-character tags by script, not by eye.
- 2026-11-20 (artist): Make mockups in the shirt colors that are actually on sale (check Printify first). `node art/source/mockup.js OUTDIR art/final` renders previews straight from the final designs, with no rebuild needed.
- 2026-11-19 (problem-solver): This cloud only reaches allow-listed sites (FMP and companiesmarketcap work; Polygon/Massive, Tiingo, Twelve Data, Alpha Vantage and Yahoo get a 403 from the proxy). A new data source needs the owner to allow its address first, so test reachability before building on it.
- 2026-11-19 (boss): Before picking "more of" a live design, check which products and colors it's really on. The cat is only on a white sweatshirt, so the quick win is adding the hoodie and dark colors from art we already have, not new art.
- 2026-11-19 (producer): Before choosing a pin picture, check which colors are actually on sale in Printify (enabled variants); the cat mockups showed forest green and sand while the live cat sweatshirt is white only.
- 2026-11-19 (problem-solver): Etsy can't be read from the cloud, but Printify's product record shows what it last sent to Etsy (title, tags, design file name per color, Etsy listing id). `tools/printify/check_listings.py` checks all of it read-only. Etsy web addresses keep the first title's words; ignore that.
- 2026-11-18 (finance-chief): Offsite Ads (15%) plus free shipping together leave a sweatshirt only about $1.60 a sale. Check both Etsy settings before judging profit or spending on ads, and size ads to safe spend per sale ($3 a day, not $5, for a shop with no sales yet).
- 2026-11-18 (profit-analyst): Etsy fees (6.5% + 3%) are charged on shipping too, so buyer-paid shipping still costs about 10% of the shipping price. Judge tote and candle on the free-shipping column until the owner confirms the shipping setting.
- 2026-11-19 (finance-operator): The tote and candle only make money if the buyer pays shipping; with free shipping the candle loses about $1.86 a sale. Check the Etsy shipping setting before any profit claim or ad spend on low-price items.

- 2026-11-18 (Claude): FMP's free plan leaves out some big tickers (GOOG, AVGO and others return 402). List them as not covered; never guess their numbers.
- 2026-11-18 (Claude): Keys pasted into the chat don't work. They only work when saved through the secure form, in the value box.

- 2026-11-18 (Claude): Printify API: one product can use different design files for different colors (one `print_areas` entry per color group). Leave out empty placeholders and the neck text layer when updating, or Printify rejects the change. Variants list their options in a different order from the product, so match colors by ID.
- 2026-11-18 (Claude): Printify's own prices came out above our plan, at about $16 to $23 profit per sweatshirt after Etsy fees. Check the real cost in the API instead of guessing.

- 2026-11-18 (owner + Claude): Put the **light-shirts** design file on white and sand shirts, and the **dark-shirts** file on dark shirts. The wrong one makes the words unreadable.
- 2026-11-18 (owner + Claude): Printify writes its own listing titles ("Unisex Heavy Blend…", "Powered In Witch…"). Always replace them with the Producer's title and tags.
- 2026-11-18 (owner + Claude): Check profit before listing a new product type. A $2.36 sticker loses money after Etsy's fees.
- 2026-11-18 (Scout, Prospector, Underboss): In this cloud setup, the web-page reader couldn't open Amazon, Etsy, Fiverr or YouTube, so research fell back to search snippets. Say so in the report and mark the evidence as weaker.
- 2026-11-18 (Claude): Stooq blocks cloud computers. Use Financial Modeling Prep for stock prices.
