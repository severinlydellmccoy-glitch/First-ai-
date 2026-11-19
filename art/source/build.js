// Builds the print designs as SVG, then renders print-ready transparent PNGs (4500 x 5400 px, 15 x 18 in at 300 DPI).
const fs = require("fs");
const path = require("path");
const { chromium } = require("playwright");

const FONT_DIR = path.join(__dirname, "..", "fonts");
const font = (pkg, file) => fs.readFileSync(path.join(FONT_DIR, pkg, "package", "files", file)).toString("base64");
const FONTS = `
@font-face { font-family: "Fredoka"; font-weight: 700; src: url(data:font/woff2;base64,${font("fontsource-fredoka-5.0.13", "fredoka-latin-700-normal.woff2")}) format("woff2"); }
@font-face { font-family: "DM Serif Display"; font-weight: 400; src: url(data:font/woff2;base64,${font("fontsource-dm-serif-display-5.0.13", "dm-serif-display-latin-400-normal.woff2")}) format("woff2"); }
@font-face { font-family: "Caveat"; font-weight: 700; src: url(data:font/woff2;base64,${font("fontsource-caveat-5.0.13", "caveat-latin-700-normal.woff2")}) format("woff2"); }`;

const INK = "#2b1d14";
const P = {
  orange: "#f08a3c", orangeDark: "#c9622a", cream: "#fbe8cf", pink: "#f4a3a8", eye: "#8cc63f",
  tree: "#2f7d4f", treeDark: "#1f5c39", red: "#d7323c", gold: "#f2c230", teal: "#2f8f8a",
  mustard: "#e3a72f", burgundy: "#9c2f3f", brown: "#7a4a2a", cocoa: "#5a3320", navy: "#1d3557", snow: "#8fb8de",
};
// Text colors per garment: light shirts get dark ink, dark shirts get light ink.
const WAYS = {
  light: { main: P.red, accent: P.treeDark, book: P.navy, bookAccent: P.burgundy, snow: P.snow, stroke: INK },
  dark: { main: "#ffffff", accent: P.gold, book: P.cream, bookAccent: P.mustard, snow: "#ffffff", stroke: INK },
};

/* ---------- Cat character (our own) ---------- */
function catHead() {
  return `
  <polygon points="-170,-620 -150,-795 -55,-690" fill="${P.orange}" stroke="${INK}" stroke-width="10" stroke-linejoin="round"/>
  <polygon points="40,-695 130,-795 155,-620" fill="${P.orange}" stroke="${INK}" stroke-width="10" stroke-linejoin="round"/>
  <polygon points="-148,-650 -138,-750 -82,-690" fill="${P.pink}"/>
  <polygon points="62,-690 120,-750 132,-650" fill="${P.pink}"/>
  <circle cx="-10" cy="-540" r="175" fill="${P.orange}" stroke="${INK}" stroke-width="10"/>
  <g stroke="${P.orangeDark}" stroke-width="16" stroke-linecap="round">
    <path d="M -55 -705 l 8 50"/><path d="M -10 -712 l 0 55"/><path d="M 35 -705 l -8 50"/>
    <path d="M -180 -560 l 40 8"/><path d="M -178 -520 l 38 0"/><path d="M 160 -560 l -40 8"/><path d="M 158 -520 l -38 0"/>
  </g>
  <ellipse cx="-10" cy="-478" rx="88" ry="62" fill="${P.cream}"/>
  ${[-75, 55].map(x => `
    <ellipse cx="${x}" cy="-560" rx="44" ry="31" fill="#fff" stroke="${INK}" stroke-width="7"/>
    <circle cx="${x + 10}" cy="-556" r="22" fill="${P.eye}"/>
    <ellipse cx="${x + 12}" cy="-556" rx="7" ry="16" fill="${INK}"/>
    <path d="M ${x - 50} -566 Q ${x} -606 ${x + 50} -566 L ${x + 50} -600 L ${x - 50} -600 Z" fill="${P.orange}"/>
    <path d="M ${x - 48} -563 Q ${x} -584 ${x + 48} -563" fill="none" stroke="${INK}" stroke-width="9" stroke-linecap="round"/>`).join("")}
  <path d="M -32 -506 L 12 -506 L -10 -482 Z" fill="${P.pink}" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>
  <path d="M -10 -482 q -18 26 -42 8 M -10 -482 q 20 24 44 4" fill="none" stroke="${INK}" stroke-width="7" stroke-linecap="round"/>
  <g stroke="${INK}" stroke-width="5" stroke-linecap="round">
    <path d="M -95 -478 L -225 -500"/><path d="M -95 -462 L -225 -455"/><path d="M 75 -478 L 205 -500"/><path d="M 75 -462 L 205 -455"/>
  </g>`;
}
function catBody(raisedPaw) {
  return `
  <path d="M -150 -70 C -330 -60 -340 -265 -235 -335" fill="none" stroke="${INK}" stroke-width="78" stroke-linecap="round"/>
  <path d="M -150 -70 C -330 -60 -340 -265 -235 -335" fill="none" stroke="${P.orange}" stroke-width="58" stroke-linecap="round"/>
  <path d="M -300 -200 l 52 6 M -305 -150 l 50 -8" stroke="${P.orangeDark}" stroke-width="14" stroke-linecap="round"/>
  <ellipse cx="0" cy="-235" rx="200" ry="240" fill="${P.orange}" stroke="${INK}" stroke-width="10"/>
  <ellipse cx="12" cy="-205" rx="112" ry="170" fill="${P.cream}"/>
  <g stroke="${P.orangeDark}" stroke-width="20" stroke-linecap="round">
    <path d="M -196 -310 q 46 6 66 36"/><path d="M -200 -230 q 46 6 64 34"/><path d="M -188 -150 q 40 6 56 30"/>
  </g>
  <ellipse cx="-120" cy="-18" rx="78" ry="36" fill="${P.orange}" stroke="${INK}" stroke-width="9"/>
  <ellipse cx="-40" cy="-14" rx="52" ry="32" fill="${P.cream}" stroke="${INK}" stroke-width="9"/>
  <ellipse cx="70" cy="-14" rx="52" ry="32" fill="${P.cream}" stroke="${INK}" stroke-width="9"/>
  <path d="M -48 -14 l 0 -14 M -32 -14 l 0 -14 M 62 -14 l 0 -14 M 78 -14 l 0 -14" stroke="${INK}" stroke-width="5" stroke-linecap="round"/>
  ${raisedPaw ? `
  <path d="M 110 -360 Q 230 -470 300 -600" fill="none" stroke="${INK}" stroke-width="98" stroke-linecap="round"/>
  <path d="M 110 -360 Q 230 -470 300 -600" fill="none" stroke="${P.orange}" stroke-width="78" stroke-linecap="round"/>
  <path d="M 190 -470 l 40 20 M 230 -530 l 38 18" stroke="${P.orangeDark}" stroke-width="14" stroke-linecap="round"/>
  <circle cx="305" cy="-622" r="54" fill="${P.cream}" stroke="${INK}" stroke-width="9"/>
  <ellipse cx="305" cy="-610" rx="20" ry="16" fill="${P.pink}"/>
  <circle cx="280" cy="-645" r="9" fill="${P.pink}"/><circle cx="305" cy="-655" r="9" fill="${P.pink}"/><circle cx="330" cy="-645" r="9" fill="${P.pink}"/>` : ""}`;
}
const ornament = (x, y, r, color, rot = 0) => `
  <g transform="translate(${x} ${y}) rotate(${rot})">
    <path d="M 0 ${-r - 38} q 18 -30 0 -48" fill="none" stroke="${INK}" stroke-width="6"/>
    <rect x="-${r * 0.32}" y="${-r - 30}" width="${r * 0.64}" height="34" rx="6" fill="${P.gold}" stroke="${INK}" stroke-width="7"/>
    <circle r="${r}" fill="${color}" stroke="${INK}" stroke-width="9"/>
    <path d="M ${-r * 0.85} ${-r * 0.2} Q 0 ${r * 0.15} ${r * 0.85} ${-r * 0.2}" fill="none" stroke="${P.gold}" stroke-width="${r * 0.16}"/>
    <ellipse cx="${-r * 0.38}" cy="${-r * 0.42}" rx="${r * 0.16}" ry="${r * 0.26}" fill="#fff" opacity="0.55" transform="rotate(30 ${-r * 0.38} ${-r * 0.42})"/>
  </g>`;
const sparkle = (x, y, s, c) => `<path transform="translate(${x} ${y}) scale(${s})" d="M0 -40 L 10 -10 L 40 0 L 10 10 L 0 40 L -10 10 L -40 0 L -10 -10 Z" fill="${c}" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>`;
const star = (x, y, r) => {
  const pts = Array.from({ length: 10 }, (_, i) => { const a = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? r * 0.45 : r; return `${(x + Math.cos(a) * rr).toFixed(1)},${(y + Math.sin(a) * rr).toFixed(1)}`; }).join(" ");
  return `<polygon points="${pts}" fill="${P.gold}" stroke="${INK}" stroke-width="9" stroke-linejoin="round"/>`;
};
function tree(cx, top, bottom, half) {
  const h = bottom - top, t1 = top + h * 0.3, t2 = top + h * 0.6, t3 = bottom;
  const tier = (yTop, yBot, w) => `<path d="M ${cx} ${yTop} L ${cx - w} ${yBot} Q ${cx} ${yBot + 40} ${cx + w} ${yBot} Z" fill="${P.tree}" stroke="${INK}" stroke-width="10" stroke-linejoin="round"/>
    <path d="M ${cx} ${yTop + 30} L ${cx + w * 0.75} ${yBot - 10} Q ${cx + w * 0.4} ${yBot + 10} ${cx + w * 0.15} ${yBot}" fill="${P.treeDark}" opacity="0.55"/>`;
  return `<rect x="${cx - 45}" y="${t3 - 10}" width="90" height="110" rx="10" fill="${P.brown}" stroke="${INK}" stroke-width="10"/>
    ${tier(t2 - h * 0.12, t3, half)}${tier(t1 - h * 0.12, t2, half * 0.78)}${tier(top, t1, half * 0.55)}`;
}

/* ---------- Book-lover pieces ---------- */
const snowflake = (x, y, s, c) => `<g transform="translate(${x} ${y}) scale(${s})" stroke="${c}" stroke-width="7" stroke-linecap="round" fill="none">
  ${[0, 60, 120].map(a => `<g transform="rotate(${a})"><path d="M 0 -40 L 0 40"/><path d="M 0 -26 l -10 -10 M 0 -26 l 10 -10 M 0 26 l -10 10 M 0 26 l 10 10"/></g>`).join("")}</g>`;
function book(x, y, w, h, color, rot) {
  return `<g transform="translate(${x} ${y}) rotate(${rot})">
    <rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="12" fill="${color}" stroke="${INK}" stroke-width="10"/>
    <rect x="${w / 2 - 40}" y="${-h / 2 + 12}" width="28" height="${h - 24}" fill="${P.cream}" stroke="${INK}" stroke-width="6"/>
    <path d="M ${w / 2 - 34} ${-h / 2 + 24} l 16 0 M ${w / 2 - 34} ${-h / 2 + 40} l 16 0 M ${w / 2 - 34} ${-h / 2 + 56} l 16 0" stroke="${INK}" stroke-width="3"/>
    <rect x="${-w / 2 + 40}" y="${-h / 2 + 18}" width="${w * 0.45}" height="${h - 36}" rx="6" fill="none" stroke="${P.gold}" stroke-width="6"/>
  </g>`;
}
function mug(x, y, s, color) {
  return `<g transform="translate(${x} ${y}) scale(${s})">
    <path d="M -60 -380 q -40 -50 0 -100 q 40 -50 0 -100" fill="none" stroke="${INK}" stroke-width="12" stroke-linecap="round" opacity="0.8"/>
    <path d="M 40 -370 q -40 -50 0 -100 q 40 -50 0 -100" fill="none" stroke="${INK}" stroke-width="12" stroke-linecap="round" opacity="0.8"/>
    <path d="M 160 -200 q 110 0 110 90 q 0 90 -110 90" fill="none" stroke="${INK}" stroke-width="58"/>
    <path d="M 160 -200 q 110 0 110 90 q 0 90 -110 90" fill="none" stroke="${color}" stroke-width="40"/>
    <path d="M -180 -260 L 180 -260 L 160 0 Q 155 30 120 30 L -120 30 Q -155 30 -160 0 Z" fill="${color}" stroke="${INK}" stroke-width="12" stroke-linejoin="round"/>
    <ellipse cx="0" cy="-260" rx="180" ry="40" fill="${P.cocoa}" stroke="${INK}" stroke-width="12"/>
    <rect x="-90" y="-292" width="60" height="50" rx="12" fill="#fff" stroke="${INK}" stroke-width="7" transform="rotate(-12 -60 -267)"/>
    <rect x="10" y="-300" width="60" height="50" rx="12" fill="#fff" stroke="${INK}" stroke-width="7" transform="rotate(10 40 -275)"/>
    <path d="M -110 -120 q 40 -30 80 0 q 40 30 80 0" fill="none" stroke="${P.cream}" stroke-width="16" stroke-linecap="round"/>
  </g>`;
}
function blanket(x, y) {
  return `<g transform="translate(${x} ${y})">
    <rect x="-150" y="-60" width="300" height="80" rx="30" fill="${P.burgundy}" stroke="${INK}" stroke-width="10"/>
    <rect x="-150" y="-150" width="300" height="80" rx="30" fill="${P.mustard}" stroke="${INK}" stroke-width="10"/>
    <path d="M -90 -150 l 0 80 M -30 -150 l 0 80 M 30 -150 l 0 80 M 90 -150 l 0 80" stroke="${P.burgundy}" stroke-width="8" opacity="0.6"/>
    <path d="M -150 -110 l 300 0" stroke="${P.burgundy}" stroke-width="8" opacity="0.6"/>
    <path d="M -100 -60 l 0 80 M 0 -60 l 0 80 M 100 -60 l 0 80" stroke="${P.cream}" stroke-width="8" opacity="0.6"/>
  </g>`;
}
function openBook(x, y) {
  return `<g transform="translate(${x} ${y})">
    <path d="M 0 -120 Q -90 -170 -190 -140 L -190 30 Q -90 0 0 50 Z" fill="${P.cream}" stroke="${INK}" stroke-width="10" stroke-linejoin="round"/>
    <path d="M 0 -120 Q 90 -170 190 -140 L 190 30 Q 90 0 0 50 Z" fill="#fff" stroke="${INK}" stroke-width="10" stroke-linejoin="round"/>
    <path d="M -160 -100 q 70 -20 130 10 M -160 -60 q 70 -20 130 10 M -160 -20 q 70 -20 130 10 M 30 -90 q 60 -30 130 -10 M 30 -50 q 60 -30 130 -10 M 30 -10 q 60 -30 130 -10" fill="none" stroke="${INK}" stroke-width="5" opacity="0.5"/>
    <path d="M 0 50 L 0 -120" stroke="${INK}" stroke-width="8"/>
    <path d="M -200 40 Q -90 15 0 70 Q 90 15 200 40" fill="none" stroke="${P.teal}" stroke-width="20" stroke-linecap="round"/>
  </g>`;
}

/* ---------- The four designs ---------- */
const text = (str, x, y, size, family, color, opts = {}) =>
  `<text x="${x}" y="${y}" text-anchor="middle" font-family="${family}" font-weight="${opts.weight || 700}" font-size="${size}" letter-spacing="${opts.ls || 0}" fill="${color}" ${opts.stroke ? `stroke="${opts.stroke}" stroke-width="${opts.sw || 10}" paint-order="stroke" stroke-linejoin="round"` : ""}>${str}</text>`;

const DESIGNS = {
  "holiday-cat-ornament-remover": (c) => `
    ${tree(1110, 400, 1250, 270)}
    ${star(1110, 395, 62)}
    ${ornament(1010, 900, 34, P.teal)}${ornament(1220, 1120, 36, P.gold)}${ornament(1160, 700, 30, P.red)}
    <g fill="none" stroke="${INK}" stroke-width="10" stroke-linecap="round" stroke-dasharray="4 26" opacity="0.85">
      <path d="M 870 640 Q 700 420 520 470"/><path d="M 900 700 Q 740 520 560 560"/>
    </g>
    ${ornament(450, 520, 72, P.red, -24)}
    ${sparkle(330, 420, 0.9, P.gold)}${sparkle(560, 380, 0.6, "#fff")}${sparkle(370, 640, 0.55, P.gold)}
    <g transform="translate(620 1330)">${catBody(true)}${catHead()}</g>
    ${text("PROFESSIONAL", 750, 250, 118, "Fredoka", c.accent, { ls: 16, stroke: c.stroke, sw: 8 })}
    ${text("ORNAMENT", 750, 1545, 232, "Fredoka", c.main, { stroke: c.stroke, sw: 12 })}
    ${text("REMOVER", 750, 1765, 232, "Fredoka", c.main, { stroke: c.stroke, sw: 12 })}`,

  "holiday-cat-tree-inspection": (c) => `
    ${tree(750, 330, 1260, 470)}
    ${star(750, 325, 70)}
    <path d="M 470 620 Q 600 700 760 640 Q 920 590 1020 660 M 380 960 Q 560 1060 760 1000 Q 960 940 1120 1020 M 330 1210 Q 560 1290 760 1240 Q 980 1190 1170 1250" fill="none" stroke="${INK}" stroke-width="7"/>
    ${[[520, 650, P.red], [640, 680, P.gold], [880, 610, P.teal], [990, 650, P.red], [420, 990, P.gold], [1080, 1010, P.teal], [380, 1230, P.teal], [520, 1265, P.red], [1000, 1220, P.gold], [1130, 1250, P.red]].map(([x, y, col]) => `<ellipse cx="${x}" cy="${y + 18}" rx="16" ry="24" fill="${col}" stroke="${INK}" stroke-width="5"/>`).join("")}
    ${ornament(560, 820, 42, P.red)}${ornament(1000, 1120, 46, P.gold)}${ornament(470, 1120, 38, P.teal)}
    <g transform="translate(760 1460) scale(0.92)">${catHead()}</g>
    <ellipse cx="640" cy="1065" rx="58" ry="36" fill="${P.cream}" stroke="${INK}" stroke-width="9"/>
    <ellipse cx="880" cy="1065" rx="58" ry="36" fill="${P.cream}" stroke="${INK}" stroke-width="9"/>
    <path d="M 625 1065 l 0 -16 M 655 1065 l 0 -16 M 865 1065 l 0 -16 M 895 1065 l 0 -16" stroke="${INK}" stroke-width="5" stroke-linecap="round"/>
    ${ornament(690, 760, 26, P.gold, 18)}
    ${text("HEAD OF TREE", 750, 200, 128, "Fredoka", c.accent, { ls: 10, stroke: c.stroke, sw: 8 })}
    ${text("INSPECTION", 750, 1640, 236, "Fredoka", c.main, { stroke: c.stroke, sw: 12 })}`,

  "book-lover-snowed-in": (c) => `
    ${[[230, 520, 1.3], [1260, 470, 1.5], [180, 1020, 1.1], [1320, 960, 1.2], [300, 1350, 0.9], [1220, 1330, 1], [430, 640, 0.8], [1080, 660, 0.9]].map(([x, y, s]) => snowflake(x, y, s, c.snow)).join("")}
    ${book(750, 1310, 720, 120, P.teal, -2)}
    ${book(730, 1190, 660, 116, P.mustard, 3)}
    ${book(760, 1074, 600, 112, P.burgundy, -2)}
    ${mug(740, 1005, 1.15, P.red)}
    ${text("snowed in with", 750, 270, 180, "Caveat", c.bookAccent)}
    ${text("A GOOD BOOK", 750, 1620, 196, "DM Serif Display", c.book, { weight: 400, ls: 6 })}
    <path d="M 330 1690 L 1170 1690" stroke="${c.bookAccent}" stroke-width="10" stroke-linecap="round"/>`,

  "book-lover-blanket-cocoa-chapter": (c) => `
    ${blanket(330, 760)}
    ${mug(750, 820, 0.85, P.teal)}
    ${openBook(1170, 750)}
    ${[[240, 420, 0.9], [1270, 430, 1.1], [760, 340, 0.7]].map(([x, y, s]) => snowflake(x, y, s, c.snow)).join("")}
    ${text("Blanket.", 750, 1150, 210, "DM Serif Display", c.book, { weight: 400 })}
    ${text("Cocoa.", 750, 1370, 210, "DM Serif Display", c.book, { weight: 400 })}
    ${text("chapter twelve.", 750, 1590, 200, "Caveat", c.bookAccent)}`,
};

const svg = (name, way) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1500 1800" width="1500" height="1800">
<defs><style>${FONTS}</style></defs>
${DESIGNS[name](WAYS[way])}
</svg>`;

(async () => {
  const out = process.argv[2];
  fs.mkdirSync(out, { recursive: true });
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1500, height: 1800 }, deviceScaleFactor: 3 });
  for (const name of Object.keys(DESIGNS)) for (const way of Object.keys(WAYS)) {
    const s = svg(name, way);
    const base = `${name}-for-${way}-shirts`;
    fs.writeFileSync(path.join(out, base + ".svg"), s);
    await page.setContent(`<html><body style="margin:0;background:transparent">${s}</body></html>`);
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(150);
    await page.screenshot({ path: path.join(out, base + ".png"), omitBackground: true, clip: { x: 0, y: 0, width: 1500, height: 1800 } });
    console.log("rendered", base);
  }
  await browser.close();
})();
