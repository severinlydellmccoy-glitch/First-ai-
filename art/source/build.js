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
  light: { main: P.red, accent: P.treeDark, book: P.navy, bookAccent: P.burgundy, snow: P.snow, stroke: INK, steam: INK, snowDeep: "#5f8fc4", winter: "#1d3557", winterAccent: "#23706c" },
  dark: { main: "#ffffff", accent: P.gold, book: P.cream, bookAccent: P.mustard, snow: "#ffffff", stroke: INK, steam: "#ffffff", snowDeep: "#ffffff", winter: "#ffffff", winterAccent: P.gold },
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
function mug(x, y, s, color, steam = INK) {
  return `<g transform="translate(${x} ${y}) scale(${s})">
    <path d="M -60 -380 q -40 -50 0 -100 q 40 -50 0 -100" fill="none" stroke="${steam}" stroke-width="14" stroke-linecap="round" opacity="0.85"/>
    <path d="M 40 -370 q -40 -50 0 -100 q 40 -50 0 -100" fill="none" stroke="${steam}" stroke-width="14" stroke-linecap="round" opacity="0.85"/>
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
// A folded, plaid blanket with a tassel fringe, so it reads as a blanket and not a book.
function foldedBlanket(x, y, s) {
  const layer = (yy, fill, line) => `
    <rect x="-170" y="${yy}" width="340" height="95" rx="34" fill="${fill}" stroke="${INK}" stroke-width="10"/>
    <path d="M -100 ${yy} l 0 95 M -30 ${yy} l 0 95 M 40 ${yy} l 0 95 M 110 ${yy} l 0 95 M -170 ${yy + 47} l 340 0" stroke="${line}" stroke-width="9" opacity="0.65"/>
    <rect x="-170" y="${yy}" width="340" height="95" rx="34" fill="none" stroke="${INK}" stroke-width="10"/>`;
  const fringe = (yy) => [12, 32, 52, 72].map(d => `<path d="M 168 ${yy + d} l 34 ${d % 40 ? 6 : -4}" stroke="${INK}" stroke-width="16" stroke-linecap="round"/><path d="M 168 ${yy + d} l 34 ${d % 40 ? 6 : -4}" stroke="${P.cream}" stroke-width="7" stroke-linecap="round"/>`).join("");
  return `<g transform="translate(${x} ${y}) scale(${s})">
    ${fringe(-95)}${fringe(-190)}${fringe(-285)}
    ${layer(-95, P.burgundy, P.cream)}${layer(-190, P.mustard, P.burgundy)}${layer(-285, P.teal, P.cream)}
  </g>`;
}
function openBook(x, y, s = 1) {
  return `<g transform="translate(${x} ${y}) scale(${s})">
    <path d="M 0 -120 Q -90 -170 -190 -140 L -190 30 Q -90 0 0 50 Z" fill="${P.cream}" stroke="${INK}" stroke-width="10" stroke-linejoin="round"/>
    <path d="M 0 -120 Q 90 -170 190 -140 L 190 30 Q 90 0 0 50 Z" fill="#fff" stroke="${INK}" stroke-width="10" stroke-linejoin="round"/>
    <path d="M -160 -100 q 70 -20 130 10 M -160 -60 q 70 -20 130 10 M -160 -20 q 70 -20 130 10 M 30 -90 q 60 -30 130 -10 M 30 -50 q 60 -30 130 -10 M 30 -10 q 60 -30 130 -10" fill="none" stroke="${INK}" stroke-width="5" opacity="0.5"/>
    <path d="M 0 50 L 0 -120" stroke="${INK}" stroke-width="8"/>
    <path d="M -200 40 Q -90 15 0 70 Q 90 15 200 40" fill="none" stroke="${P.teal}" stroke-width="20" stroke-linecap="round"/>
  </g>`;
}


/* ---------- Dachshund character (our own) ---------- */
// Side view facing right, ground at y = 0, body from about x = -460 to x = 720.
const DOG = { coat: "#b5602f", coatDark: "#7e3c1b", belly: "#d98b52", nose: INK };
function dogSilhouette(fill, grow) {
  const g = grow || 0;
  return `
  <rect x="${-400 - g}" y="${-170 - g}" width="${80 + 2 * g}" height="${170 + 2 * g}" rx="${36 + g}" fill="${fill}"/>
  <rect x="${-290 - g}" y="${-170 - g}" width="${80 + 2 * g}" height="${170 + 2 * g}" rx="${36 + g}" fill="${fill}"/>
  <rect x="${200 - g}" y="${-170 - g}" width="${80 + 2 * g}" height="${170 + 2 * g}" rx="${36 + g}" fill="${fill}"/>
  <rect x="${310 - g}" y="${-170 - g}" width="${80 + 2 * g}" height="${170 + 2 * g}" rx="${36 + g}" fill="${fill}"/>
  <rect x="${-460 - g}" y="${-360 - g}" width="${880 + 2 * g}" height="${240 + 2 * g}" rx="${120 + g}" fill="${fill}"/>
  <ellipse cx="350" cy="-270" rx="${125 + g}" ry="${140 + g}" fill="${fill}"/>
  <path d="M 300 -330 Q 330 -470 430 -500 L 520 -380 Q 470 -300 420 -250 Z" fill="${fill}" stroke="${fill}" stroke-width="${2 * g}" stroke-linejoin="round"/>
  <ellipse cx="480" cy="-470" rx="${125 + g}" ry="${110 + g}" fill="${fill}"/>
  <path d="M 500 -540 Q 640 -520 700 -470 Q 735 -435 700 -405 Q 640 -380 520 -390 Z" fill="${fill}" stroke="${fill}" stroke-width="${2 * g}" stroke-linejoin="round"/>`;
}
function dachshund(opts = {}) {
  const tail = "M -440 -300 Q -540 -360 -575 -470";
  return `
  <path d="${tail}" fill="none" stroke="${INK}" stroke-width="74" stroke-linecap="round"/>
  <path d="${tail}" fill="none" stroke="${DOG.coat}" stroke-width="54" stroke-linecap="round"/>
  ${dogSilhouette(INK, 10)}
  ${dogSilhouette(DOG.coat, 0)}
  <path d="M -380 -150 Q 0 -105 330 -160" fill="none" stroke="${DOG.belly}" stroke-width="34" stroke-linecap="round" opacity="0.8"/>
  <path d="M -250 -350 q 40 30 90 10 M 0 -355 q 40 30 90 10" fill="none" stroke="${DOG.coatDark}" stroke-width="12" stroke-linecap="round" opacity="0.5"/>
  ${[-360, -250, 240, 350].map(x => `<path d="M ${x - 18} -8 l 0 -22 M ${x + 2} -6 l 0 -24 M ${x + 22} -8 l 0 -22" stroke="${INK}" stroke-width="6" stroke-linecap="round"/>`).join("")}
  <path d="M 520 -395 Q 610 -392 690 -408" fill="none" stroke="${INK}" stroke-width="8" stroke-linecap="round"/>
  <path d="M 600 -398 q 22 30 50 6" fill="none" stroke="${INK}" stroke-width="7" stroke-linecap="round"/>
  <ellipse cx="710" cy="-462" rx="34" ry="28" fill="${DOG.nose}"/>
  <ellipse cx="700" cy="-472" rx="10" ry="7" fill="#fff" opacity="0.6"/>
  <ellipse cx="545" cy="-505" rx="24" ry="28" fill="${INK}"/>
  <circle cx="553" cy="-515" r="8" fill="#fff"/>
  <path d="M 515 -548 q 30 -18 60 -4" fill="none" stroke="${INK}" stroke-width="8" stroke-linecap="round"/>
  <ellipse cx="575" cy="-440" rx="30" ry="16" fill="${P.pink}" opacity="0.7"/>
  <path d="M 450 -545 Q 360 -560 350 -470 Q 340 -360 380 -320 Q 420 -300 445 -340 Q 470 -420 480 -500 Z" fill="${DOG.coatDark}" stroke="${INK}" stroke-width="10" stroke-linejoin="round"/>
  ${opts.hat ? `
  <path d="M 395 -555 Q 470 -610 600 -570 Q 560 -700 470 -740 Q 380 -770 300 -700" fill="${P.red}" stroke="${INK}" stroke-width="10" stroke-linejoin="round"/>
  <path d="M 380 -560 Q 480 -640 615 -575" fill="none" stroke="${INK}" stroke-width="66" stroke-linecap="round"/>
  <path d="M 380 -560 Q 480 -640 615 -575" fill="none" stroke="#fff" stroke-width="48" stroke-linecap="round"/>
  <circle cx="295" cy="-690" r="48" fill="#fff" stroke="${INK}" stroke-width="9"/>` : ""}`;
}
// A scarf around the neck that is far too long: it trails along the back and piles up on the ground behind the dog.
function longScarf(c1, c2) {
  const trail = "M 330 -380 Q 100 -420 -150 -395 Q -420 -370 -560 -250 Q -660 -150 -640 -40 Q -620 20 -760 10";
  return `
  <path d="${trail}" fill="none" stroke="${INK}" stroke-width="86" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="${trail}" fill="none" stroke="${c1}" stroke-width="66" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="${trail}" fill="none" stroke="${c2}" stroke-width="66" stroke-dasharray="44 56" stroke-linejoin="round"/>
  <g stroke="${c1}" stroke-width="12" stroke-linecap="round"><path d="M -770 -15 l -45 -20 M -775 5 l -50 0 M -770 25 l -45 20"/></g>
  <path d="M 300 -440 Q 410 -500 500 -380 Q 430 -300 320 -320 Z" fill="${c1}" stroke="${INK}" stroke-width="10" stroke-linejoin="round"/>
  <path d="M 335 -455 L 395 -330 M 420 -470 L 460 -350" stroke="${c2}" stroke-width="30"/>
  <path d="M 300 -440 Q 410 -500 500 -380 Q 430 -300 320 -320 Z" fill="none" stroke="${INK}" stroke-width="10" stroke-linejoin="round"/>`;
}
// A string of colored lights through a list of points, with a bulb at each listed index.
function lightString(pts, bulbAt) {
  const d = pts.map((p, i) => {
    if (i === 0) return `M ${p[0]} ${p[1]}`;
    const a = pts[i - 1], b = p, pa = pts[i - 2] || a, nb = pts[i + 1] || b;
    const c1 = [a[0] + (b[0] - pa[0]) / 6, a[1] + (b[1] - pa[1]) / 6], c2 = [b[0] - (nb[0] - a[0]) / 6, b[1] - (nb[1] - a[1]) / 6];
    return `C ${c1[0].toFixed(1)} ${c1[1].toFixed(1)} ${c2[0].toFixed(1)} ${c2[1].toFixed(1)} ${b[0]} ${b[1]}`;
  }).join(" ");
  const cols = [P.red, P.gold, P.teal, "#4f9de0", P.pink];
  return `<path d="${d}" fill="none" stroke="${INK}" stroke-width="12" stroke-linecap="round"/>
  ${bulbAt.map((i, k) => { const [x, y] = pts[i]; const rot = (k % 2 ? 25 : -25); return `<g transform="translate(${x} ${y}) rotate(${rot})">
    <rect x="-13" y="-6" width="26" height="24" rx="5" fill="#6b6b6b" stroke="${INK}" stroke-width="6"/>
    <path d="M 0 16 C 30 22 34 70 0 92 C -34 70 -30 22 0 16 Z" fill="${cols[k % cols.length]}" stroke="${INK}" stroke-width="7" stroke-linejoin="round"/>
    <ellipse cx="-8" cy="45" rx="6" ry="12" fill="#fff" opacity="0.55"/></g>`; }).join("")}`;
}
function present(x, y, w, h, color, ribbon) {
  return `<g transform="translate(${x} ${y})">
    <rect x="${-w / 2}" y="${-h}" width="${w}" height="${h}" rx="8" fill="${color}" stroke="${INK}" stroke-width="10"/>
    <rect x="-14" y="${-h}" width="28" height="${h}" fill="${ribbon}" stroke="${INK}" stroke-width="6"/>
    <path d="M 0 ${-h} q -60 -60 -70 -10 q 10 30 70 10 q 60 -60 70 -10 q -10 30 -70 10" fill="${ribbon}" stroke="${INK}" stroke-width="7" stroke-linejoin="round"/>
  </g>`;
}


/* ---------- Everyday winter pieces (no Christmas symbols) ---------- */
// A knit hat that sits between the cat's ears (cat head coordinates), with a pompom.
function knitHat(color, band, pom) {
  return `
  <path d="M -118 -672 Q -122 -800 -10 -808 Q 102 -800 98 -672 Z" fill="${color}" stroke="${INK}" stroke-width="10" stroke-linejoin="round"/>
  <path d="M -70 -790 l 0 110 M -10 -805 l 0 125 M 50 -790 l 0 110" stroke="${INK}" stroke-width="5" opacity="0.35"/>
  <rect x="-132" y="-702" width="244" height="58" rx="26" fill="${band}" stroke="${INK}" stroke-width="10"/>
  <path d="M -95 -698 l 0 50 M -55 -698 l 0 50 M -15 -698 l 0 50 M 25 -698 l 0 50 M 65 -698 l 0 50" stroke="${INK}" stroke-width="5" opacity="0.35"/>
  <circle cx="-10" cy="-838" r="44" fill="${pom}" stroke="${INK}" stroke-width="10"/>
  <path d="M -30 -858 q 10 -8 22 -4" fill="none" stroke="${INK}" stroke-width="5" opacity="0.4" stroke-linecap="round"/>`;
}
// A striped scarf around the cat's neck (cat body coordinates), with one end hanging down the front.
function catScarf(c1, c2) {
  const wrap = "M -175 -395 Q -10 -320 160 -395";
  return `
  <path d="M 70 -375 Q 95 -290 85 -175" fill="none" stroke="${INK}" stroke-width="96" stroke-linecap="round"/>
  <path d="M 70 -375 Q 95 -290 85 -175" fill="none" stroke="${c1}" stroke-width="76" stroke-linecap="round"/>
  <path d="M 52 -300 l 76 0 M 50 -240 l 76 0" stroke="${c2}" stroke-width="22"/>
  <g stroke="${INK}" stroke-width="16" stroke-linecap="round"><path d="M 60 -140 l -4 30 M 85 -138 l 0 32 M 110 -140 l 4 30"/></g>
  <g stroke="${c1}" stroke-width="7" stroke-linecap="round"><path d="M 60 -140 l -4 30 M 85 -138 l 0 32 M 110 -140 l 4 30"/></g>
  <path d="${wrap}" fill="none" stroke="${INK}" stroke-width="100" stroke-linecap="round"/>
  <path d="${wrap}" fill="none" stroke="${c1}" stroke-width="80" stroke-linecap="round"/>
  <path d="${wrap}" fill="none" stroke="${c2}" stroke-width="80" stroke-dasharray="26 74" stroke-dashoffset="-30"/>`;
}
// Grumpy eyebrows for the cat head.
const grumpyBrows = () => `<path d="M -128 -632 L -40 -610 M 20 -610 L 108 -632" stroke="${INK}" stroke-width="14" stroke-linecap="round"/>`;
// A snow drift the cat sits in (ground at y = 0, cat body coordinates).
const snowDrift = () => `<path d="M -400 20 Q -360 -40 -270 -30 Q -200 -75 -110 -38 Q -20 -70 60 -36 Q 160 -80 250 -34 Q 350 -50 400 20 Q 0 50 -400 20 Z" fill="#ffffff" stroke="${INK}" stroke-width="10" stroke-linejoin="round"/>
  <path d="M -250 -5 q 40 -12 80 0 M 120 0 q 40 -12 80 0" fill="none" stroke="#8fb8de" stroke-width="8" stroke-linecap="round"/>`;
// A plaid blanket pattern for SVG fills.
const plaidDefs = (id) => `<defs><pattern id="${id}" patternUnits="userSpaceOnUse" width="140" height="140">
  <rect width="140" height="140" fill="${P.mustard}"/>
  <rect x="0" width="48" height="140" fill="${P.burgundy}" opacity="0.55"/><rect y="0" width="140" height="48" fill="${P.burgundy}" opacity="0.55"/>
  <path d="M 96 0 l 0 140 M 0 96 l 140 0" stroke="${P.cream}" stroke-width="8" opacity="0.8"/></pattern></defs>`;
// The cat wrapped in a blanket hood with only its face showing (cat head coordinates, ground at y = 0).
function blanketHood(fillId) {
  const outer = "M -440 0 C -455 -380 -330 -770 -10 -790 C 310 -770 435 -380 420 0 Q -10 40 -440 0 Z";
  const hole = "M -212 -525 a 202 186 0 1 0 404 0 a 202 186 0 1 0 -404 0 Z";
  return `
  <path d="M -10 -330 C -200 -300 -330 -200 -350 0" fill="none" stroke="${INK}" stroke-width="10"/>
  <path d="${outer} ${hole}" fill="url(#${fillId})" fill-rule="evenodd" stroke="${INK}" stroke-width="12" stroke-linejoin="round"/>
  <path d="M -10 -340 C -190 -300 -300 -200 -320 6" fill="none" stroke="${INK}" stroke-width="10" stroke-linecap="round"/>
  <ellipse cx="-10" cy="-525" rx="190" ry="174" fill="none" stroke="${INK}" stroke-width="50"/>
  <ellipse cx="-10" cy="-525" rx="190" ry="174" fill="none" stroke="${P.cream}" stroke-width="30"/>`;
}
// A small handheld microphone with no markings (x, y = top of the mic head).
function microphone(x, y, rot, s = 1) {
  return `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})">
    <path d="M -22 70 L -14 230 Q 0 246 14 230 L 22 70 Z" fill="#3b3b40" stroke="${INK}" stroke-width="9" stroke-linejoin="round"/>
    <rect x="-34" y="58" width="68" height="26" rx="8" fill="#6b6b72" stroke="${INK}" stroke-width="8"/>
    <circle cx="0" cy="20" r="52" fill="#b9bec4" stroke="${INK}" stroke-width="10"/>
    <path d="M -40 0 L 40 0 M -48 20 L 48 20 M -40 40 L 40 40 M -20 -26 L -20 66 M 0 -32 L 0 72 M 20 -26 L 20 66" stroke="${INK}" stroke-width="4" opacity="0.45"/>
    <ellipse cx="-20" cy="0" rx="10" ry="16" fill="#fff" opacity="0.6"/>
  </g>`;
}

/* ---------- The designs ---------- */
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

  // Option A (not picked): the three icons larger, in one row sitting right on top of the words.
  "book-lover-blanket-cocoa-chapter-a": (c) => `
    ${[[230, 470, 1.3], [1270, 450, 1.5], [470, 300, 0.8], [1000, 300, 0.9]].map(([x, y, s]) => snowflake(x, y, s, c.snowDeep)).join("")}
    ${foldedBlanket(258, 960, 1.08)}
    ${mug(680, 960, 1.2, P.red, c.steam)}
    ${openBook(1255, 900, 1.05)}
    ${text("Blanket.", 750, 1260, 245, "DM Serif Display", c.book, { weight: 400 })}
    ${text("Cocoa.", 750, 1505, 245, "DM Serif Display", c.book, { weight: 400 })}
    ${text("chapter twelve.", 750, 1720, 215, "Caveat", c.bookAccent)}`,

  // Picked option (was option B, 2026-11-22): a big mug in the middle, the blanket and the open book tucked in low on each side.
  "book-lover-blanket-cocoa-chapter": (c) => `
    ${[[200, 380, 1.2], [1300, 360, 1.4], [330, 620, 0.8], [1180, 600, 0.9]].map(([x, y, s]) => snowflake(x, y, s, c.snowDeep)).join("")}
    ${mug(720, 930, 1.45, P.teal, c.steam)}
    ${foldedBlanket(268, 990, 0.95)}
    ${openBook(1215, 990, 1.0)}
    ${text("Blanket.", 750, 1270, 245, "DM Serif Display", c.book, { weight: 400 })}
    ${text("Cocoa.", 750, 1510, 245, "DM Serif Display", c.book, { weight: 400 })}
    ${text("chapter twelve.", 750, 1720, 215, "Caveat", c.bookAccent)}`,

  "dachshund-extra-long-cheer": (c) => `
    ${[[200, 560, 1.1], [1300, 520, 1.3], [330, 760, 0.7], [1180, 760, 0.8], [760, 520, 0.6]].map(([x, y, s]) => snowflake(x, y, s, c.snow)).join("")}
    ${sparkle(560, 610, 0.7, P.gold)}${sparkle(910, 560, 0.55, P.gold)}
    <g transform="translate(790 1230) scale(0.86)">
      ${dachshund({ hat: true })}
      ${longScarf(P.red, P.cream)}
    </g>
    ${present(1240, 1238, 150, 120, P.teal, P.gold)}
    <path d="M 170 1250 L 1330 1250" stroke="${c.snow}" stroke-width="14" stroke-linecap="round"/>
    ${text("EXTRA LONG", 750, 430, 190, "Fredoka", c.accent, { ls: 10, stroke: c.stroke, sw: 10 })}
    ${text("CHRISTMAS", 750, 1500, 230, "Fredoka", c.main, { stroke: c.stroke, sw: 12 })}
    ${text("CHEER", 750, 1720, 230, "Fredoka", c.main, { stroke: c.stroke, sw: 12 })}`,

  "dachshund-in-charge-of-lights": (c) => `
    ${tree(290, 420, 1080, 230)}
    ${star(290, 415, 58)}
    ${ornament(230, 760, 30, P.red)}${ornament(350, 980, 32, P.teal)}
    <g transform="translate(900 1200) scale(0.72)">
      ${dachshund({ hat: true })}
      ${lightString([[-860, -560], [-700, -420], [-560, -380], [-380, -420], [-330, -250], [-260, -110], [-160, -230], [-60, -390], [60, -330], [120, -160], [200, -110], [300, -260], [420, -330], [560, -320], [640, -400]], [1, 3, 5, 7, 9, 11, 13])}
    </g>
    ${[[1300, 560, 1.0], [700, 520, 0.7], [1080, 640, 0.6]].map(([x, y, s]) => snowflake(x, y, s, c.snow)).join("")}
    ${text("IN CHARGE OF", 750, 330, 150, "Fredoka", c.accent, { ls: 12, stroke: c.stroke, sw: 9 })}
    ${text("THE LIGHTS", 750, 1530, 220, "Fredoka", c.main, { stroke: c.stroke, sw: 12 })}`,

  // Everyday winter cat, option A (2026-11-23): our cat in a knit hat and scarf, sitting grumpily in the snow. No Christmas words or symbols.
  "winter-cat-snow-complaint": (c) => `
    ${[[200, 470, 1.2], [1300, 450, 1.4], [330, 760, 0.8], [1180, 760, 0.9], [230, 1080, 1.0], [1290, 1080, 1.1], [520, 560, 0.6], [990, 540, 0.65]].map(([x, y, s]) => snowflake(x, y, s, c.snowDeep)).join("")}
    <g transform="translate(750 1330) scale(0.95)">
      ${catBody(false)}${catHead()}${grumpyBrows()}
      ${knitHat(P.teal, P.cream, P.cream)}
      ${catScarf(P.mustard, P.burgundy)}
      ${snowDrift()}
    </g>
    ${text("I HAVE FILED A", 750, 300, 140, "Fredoka", c.winterAccent, { ls: 12, stroke: c.stroke, sw: 8 })}
    ${text("COMPLAINT", 750, 1575, 236, "Fredoka", c.winter, { stroke: c.stroke, sw: 12 })}
    ${text("about the snow", 750, 1755, 200, "Caveat", c.winterAccent)}`,

  // Everyday winter cat, option B (2026-11-23): our cat wrapped in a plaid blanket hood, holding a microphone, cocoa beside it.
  "winter-cat-under-the-blanket": (c) => `
    ${plaidDefs("plaid")}
    ${[[200, 520, 1.2], [1300, 500, 1.4], [300, 800, 0.8], [1220, 790, 0.9], [170, 1080, 0.9], [1340, 1040, 0.8]].map(([x, y, s]) => snowflake(x, y, s, c.snowDeep)).join("")}
    <g transform="translate(740 1300)">
      ${catHead()}
      ${blanketHood("plaid")}
      ${microphone(-150, -390, -18, 0.95)}
      <circle cx="-200" cy="-180" r="50" fill="${P.cream}" stroke="${INK}" stroke-width="9"/>
      <path d="M -225 -205 l 18 -6 M -232 -178 l 18 -2" stroke="${INK}" stroke-width="5" stroke-linecap="round"/>
      <ellipse cx="-60" cy="-8" rx="56" ry="32" fill="${P.cream}" stroke="${INK}" stroke-width="9"/>
      <ellipse cx="70" cy="-8" rx="56" ry="32" fill="${P.cream}" stroke="${INK}" stroke-width="9"/>
      <path d="M -68 -8 l 0 -14 M -52 -8 l 0 -14 M 62 -8 l 0 -14 M 78 -8 l 0 -14" stroke="${INK}" stroke-width="5" stroke-linecap="round"/>
    </g>
    ${mug(1265, 1300, 0.6, P.teal, c.steam)}
    ${text("reporting live", 750, 330, 210, "Caveat", c.winterAccent)}
    ${text("FROM UNDER", 750, 1545, 210, "Fredoka", c.winter, { stroke: c.stroke, sw: 12 })}
    ${text("THE BLANKET", 750, 1755, 210, "Fredoka", c.winter, { stroke: c.stroke, sw: 12 })}`,
};



const svg = (name, way) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1500 1800" width="1500" height="1800">
<defs><style>${FONTS}</style></defs>
${DESIGNS[name](WAYS[way])}
</svg>`;

(async () => {
  const out = process.argv[2]; // optional 3rd argument: only render designs whose name starts with it
  fs.mkdirSync(out, { recursive: true });
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1500, height: 1800 }, deviceScaleFactor: 3 });
  const only = process.argv[3];
  for (const name of Object.keys(DESIGNS).filter(n => !only || n.startsWith(only))) for (const way of Object.keys(WAYS)) {
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
