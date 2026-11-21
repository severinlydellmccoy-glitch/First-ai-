// Draws simple flat sweatshirt previews with each design on it.
const fs = require("fs"), path = require("path"), { chromium } = require("playwright");
const SHIRT = (color, cuff) => `<svg viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
  <path d="M 330 110 Q 500 170 670 110 L 860 190 Q 930 230 950 320 L 990 760 Q 990 790 960 795 L 860 800 Q 835 800 832 770 L 800 420 L 800 930 Q 800 960 770 960 L 230 960 Q 200 960 200 930 L 200 420 L 168 770 Q 165 800 140 800 L 40 795 Q 10 790 10 760 L 50 320 Q 70 230 140 190 Z" fill="${color}" stroke="rgba(0,0,0,0.25)" stroke-width="4"/>
  <path d="M 330 110 Q 500 200 670 110 Q 640 175 500 185 Q 360 175 330 110 Z" fill="${cuff}"/>
  <path d="M 210 905 L 790 905 M 40 750 L 165 755 M 960 750 L 835 755" stroke="${cuff}" stroke-width="30"/>
</svg>`;
const shirts = { white: ["#f7f7f5", "#e6e6e2", "White"], light: ["#ece3d3", "#ddd1bd", "Sand"], forest: ["#24412f", "#1b3324", "Forest green"], navy: ["#1f2a44", "#172036", "Navy"] };
const tiles = [
  ["holiday-cat-ornament-remover", "light"], ["holiday-cat-ornament-remover", "forest"], ["holiday-cat-ornament-remover", "white"],
  ["holiday-cat-tree-inspection", "light"], ["holiday-cat-tree-inspection", "forest"],
  ["book-lover-snowed-in", "light"], ["book-lover-snowed-in", "navy"],
  ["book-lover-blanket-cocoa-chapter", "light"], ["book-lover-blanket-cocoa-chapter", "navy"],
];
// Optional 2nd argument: folder holding the design PNGs (default out/ next to this file). Tiles whose design is missing are skipped.
const srcDir = process.argv[3] ? path.resolve(process.argv[3]) : path.join(__dirname, "out");
const img = f => "data:image/png;base64," + fs.readFileSync(path.join(srcDir, f)).toString("base64");
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1000, height: 1000 }, deviceScaleFactor: 1 });
  const outDir = process.argv[2]; fs.mkdirSync(outDir, { recursive: true });
  for (const [name, shirt] of tiles) {
    const way = (shirt === "light" || shirt === "white") ? "light" : "dark";
    if (!fs.existsSync(path.join(srcDir, `${name}-for-${way}-shirts.png`))) continue;
    const [c, cuff] = shirts[shirt];
    const html = `<body style="margin:0;background:#f6f4f0;width:1000px;height:1000px;position:relative;overflow:hidden">
      ${SHIRT(c, cuff)}
      <img src="${img(`${name}-for-${way}-shirts.png`)}" style="position:absolute;left:325px;top:250px;width:350px;height:420px">
    </body>`;
    await p.setContent(html.replace("<svg ", '<svg style="position:absolute;inset:0;width:1000px;height:1000px" '));
    await p.waitForTimeout(100);
    await p.screenshot({ path: path.join(outDir, `${name}-${shirts[shirt][2].toLowerCase().replace(" ", "-")}-sweatshirt-preview.png`) });
  }
  // contact sheet
  const files = fs.readdirSync(outDir).filter(f => f.endsWith("-preview.png")).sort();
  const sheet = `<body style="margin:0;background:#fff;display:grid;grid-template-columns:repeat(4,500px);gap:0">${files.map(f => `<img src="data:image/png;base64,${fs.readFileSync(path.join(outDir, f)).toString("base64")}" style="width:500px;height:500px">`).join("")}</body>`;
  await p.setViewportSize({ width: 2000, height: 1000 });
  await p.setContent(sheet); await p.waitForTimeout(200);
  await p.screenshot({ path: path.join(outDir, "contact-sheet.png") });
  await b.close(); console.log(files.join("\n"));
})();
