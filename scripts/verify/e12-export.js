// E12 export round-trip gate: edit-mode Ctrl+S export must walk identically,
// second export must show no banner duplication and no @@include markers.
const { chromium } = require('playwright-core');
const os = require('os'); const path = require('path'); const fs = require('fs');
const EXE = path.join(os.homedir(), '.cache/ms-playwright/chromium_headless_shell-1223/chrome-headless-shell-linux64/chrome-headless-shell');
const URL = process.argv[2] || 'http://localhost:8923/index.html';
const TMP = '/tmp/pwshot/e12';
fs.mkdirSync(TMP, { recursive: true });

async function exportVia(page, outPath) {
  const dl = page.waitForEvent('download');
  await page.keyboard.press('Control+s');
  const d = await dl;
  await d.saveAs(outPath);
}

(async () => {
  const browser = await chromium.launch({ executablePath: EXE, headless: true,
    env: { ...process.env, LD_LIBRARY_PATH: '/tmp/pwshot/libs/usr/lib/x86_64-linux-gnu' } });
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 720 }, acceptDownloads: true });
  const page = await ctx.newPage();
  await page.goto(URL, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);

  // export #1 (normal mode Ctrl+S)
  const exp1 = path.join(TMP, 'export1.html');
  await exportVia(page, exp1);
  // toggle edit mode, export #2 (edit-mode Ctrl+S path)
  await page.keyboard.press('e'); await page.waitForTimeout(300);
  const exp2 = path.join(TMP, 'export2.html');
  await exportVia(page, exp2);
  await page.keyboard.press('Escape'); await page.waitForTimeout(200);
  await page.close();

  const t1 = fs.readFileSync(exp1, 'utf8');
  const banners1 = (t1.match(/GENERATED FILE/g) || []).length;
  const markers1 = (t1.match(/@@include/g) || []).length;

  // open export1 via file://, walk a few slides, then export AGAIN (second-generation)
  const p2 = await ctx.newPage();
  const errs = [];
  p2.on('pageerror', e => errs.push(e.message.slice(0, 120)));
  await p2.goto('file://' + exp1, { waitUntil: 'load' });
  await p2.waitForTimeout(1800);
  const slides = await p2.evaluate(() => document.querySelectorAll('.slide').length);
  for (let i = 0; i < 4; i++) { await p2.keyboard.press('ArrowRight'); await p2.waitForTimeout(700); }
  const idx = await p2.evaluate(() => [...document.querySelectorAll('.slide')].findIndex(s => s.classList.contains('active')));
  const exp3 = path.join(TMP, 'export-gen2.html');
  await exportVia(p2, exp3);
  const t3 = fs.readFileSync(exp3, 'utf8');
  const banners2 = (t3.match(/GENERATED FILE/g) || []).length;
  const markers2 = (t3.match(/@@include/g) || []).length;

  // third-party noise filter: file:// run loads no iframes (no network) — errs should be deck-origin only
  console.log(JSON.stringify({
    export1: { banners: banners1, markers: markers1 },
    fileOpen: { slides, idxAfter4Presses_expect3or4: idx, pageErrors: errs },
    secondGenExport: { banners: banners2, markers: markers2 },
    PASS: banners1 === 1 && markers1 === 0 && banners2 === 1 && markers2 === 0 && slides === 20
  }, null, 1));
  await browser.close();
})().catch(e => { console.error('E12 FAIL:', e.message); process.exit(1); });
