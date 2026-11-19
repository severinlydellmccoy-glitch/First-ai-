# Lessons learned

Short, practical lessons from real work. Newest first. Format: `- YYYY-MM-DD (agent): lesson`.

- 2026-11-18 (Claude): Printify API: one product can use different design files for different colors (one `print_areas` entry per color group). Leave out empty placeholders and the neck text layer when updating, or Printify rejects the change. Variants list their options in a different order from the product, so match colors by ID.
- 2026-11-18 (Claude): Printify's own prices came out above our plan, at about $16 to $23 profit per sweatshirt after Etsy fees. Check the real cost in the API instead of guessing.

- 2026-11-18 (owner + Claude): Put the **light-shirts** design file on white and sand shirts, and the **dark-shirts** file on dark shirts. The wrong one makes the words unreadable.
- 2026-11-18 (owner + Claude): Printify writes its own listing titles ("Unisex Heavy Blend…", "Powered In Witch…"). Always replace them with the Producer's title and tags.
- 2026-11-18 (owner + Claude): Check profit before listing a new product type. A $2.36 sticker loses money after Etsy's fees.
- 2026-11-18 (Scout, Prospector, Underboss): In this cloud setup, the web-page reader couldn't open Amazon, Etsy, Fiverr or YouTube, so research fell back to search snippets. Say so in the report and mark the evidence as weaker.
- 2026-11-18 (Claude): Stooq blocks cloud computers. Use Financial Modeling Prep for stock prices.
