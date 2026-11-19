# Design source

The designs are drawn in code, so they can be changed and re-rendered at any size.

- `build.js` draws every design as an SVG and renders print-ready PNGs: 4500 × 5400 px (15 × 18 in at 300 DPI), with a see-through background. Each design comes in two colorways: one for light shirts and one for dark shirts.
- `mockup.js` puts the designs on simple flat sweatshirt previews.

Fonts: Fredoka, DM Serif Display and Caveat, all under the SIL Open Font License, which allows commercial use, including on products. They come from the npm packages `@fontsource/fredoka`, `@fontsource/dm-serif-display` and `@fontsource/caveat` (version 5.0.13), unpacked into a `fonts/` folder next to `art/`.

To re-render (needs Node and Playwright), run from a working folder that holds `build.js`, `mockup.js` and the `fonts/` folder one level up:

    node build.js out          # designs go to out/
    node mockup.js mockups     # previews of the designs in out/
