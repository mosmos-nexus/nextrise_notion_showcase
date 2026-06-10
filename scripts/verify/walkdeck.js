// Generic full-deck walker: presses ArrowRight through ALL slides+steps,
// screenshots every distinct state, asserts console/request cleanliness.
// Usage: node walkdeck.js <outdir> [--width=1280] [--height=720] [--reduced] [--block=pattern,pattern] [--maxpress=80]
const { chromium } = require('playwright-core');
const os = require('os'); const path = require('path'); const fs = require('fs');
const EXE = path.join(os.homedir(), '.cache/ms-playwright/chromium_headless_shell-1223/chrome-headless-shell-linux64/chrome-headless-shell');
const URL = 'http://localhost:8923/index.html';

const args = process.argv.slice(2);
const OUT = args[0] || '/tmp/pwshot/walk';
const opt = (n, d) => { const a = args.find(x => x.startsWith(`--${n}=`)); return a ? a.split('=')[1] : d; };
const W = +opt('width', 1280), H = +opt('height', 720);
const REDUCED = args.includes('--reduced');
const BLOCK = (opt('block', '') || '').split(',').filter(Boolean);
const MAXPRESS = +opt('maxpress', 80);
fs.mkdirSync(OUT, { recursive: true });

(async () => {
  const browser = await chromium.launch({ executablePath: EXE, headless: true,
    env: { ...process.env, LD_LIBRARY_PATH: '/tmp/pwshot/libs/usr/lib/x86_64-linux-gnu' } });
  const ctx = await browser.newContext({ viewport: { width: W, height: H },
    reducedMotion: REDUCED ? 'reduce' : 'no-preference' });
  for (const b of BLOCK) await ctx.route(b, r => r.abort());
  const page = await ctx.newPage();
  const errors = [];
  page.on('console', m => { if (['error','warning'].includes(m.type())) errors.push(`[${m.type()}] ${m.text().slice(0,200)}`); });
  page.on('pageerror', e => errors.push(`[pageerror] ${e.message.slice(0,200)}`));
  page.on('requestfailed', r => { if (!BLOCK.length) errors.push(`[reqfail] ${r.url().slice(0,160)}`); });

  await page.goto(URL + '#1', { waitUntil: 'networkidle', timeout: 60000 });
  await page.evaluate(() => { try { localStorage.removeItem('nextrise2026-deck-pos'); } catch(e){} return document.fonts.ready; });
  await page.waitForTimeout(1500);

  const sig = () => page.evaluate(() => {
    const slides = [...document.querySelectorAll('.slide')];
    const i = slides.findIndex(s => s.classList.contains('active'));
    const s = slides[i] || {};
    const step = s.dataset?.step || (s.classList?.contains('played') ? 'played' : '0');
    const extra = ['zooming','played'].filter(c => s.classList?.contains(c)).join('+');
    return { i, id: s.id || '?', state: `${step}|${extra}`, n: slides.length };
  });

  let prev = await sig(); let shot = 0; let stable = 0;
  const states = [];
  const snap = async (s) => {
    const name = `${String(++shot).padStart(2,'0')}-${s.id}-${s.state.replace(/[|+]/g,'_')}.png`;
    await page.screenshot({ path: path.join(OUT, name) });
    states.push(`${name} (idx ${s.i})`);
  };
  await snap(prev);
  for (let k = 0; k < MAXPRESS && stable < 3; k++) {
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(REDUCED ? 500 : 1600);
    const cur = await sig();
    if (cur.i !== prev.i || cur.state !== prev.state) { stable = 0; await snap(cur); }
    else stable++;
    prev = cur;
  }
  // settle animations on final slide then last shot
  await page.waitForTimeout(2500); await snap(await sig());

  console.log(JSON.stringify({ out: OUT, viewport: `${W}x${H}`, reduced: REDUCED,
    blocked: BLOCK, slides: prev.n, distinctStates: states.length, states,
    errorCount: errors.length, errors: errors.slice(0, 12) }, null, 1));
  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
