# NextRise 2026 Web-PPT — v2 Spec-Compliance Upgrade Plan

**Target file:** `/home/honeybee/workspace/mosmos/nextrise_notion_showcase/index.html` (v1: 1382 lines, ~84KB, working, Playwright-verified)
**Event:** NextRise 2026 "Notion Startup Showcase" — 2026-06-18 (7-min talk + 8-min live demo + closing)
**Mode:** RALPLAN consensus, **DELIBERATE** (high-risk: live venue demo, network-dependent iframes, deck rewrite scope). Planning only — no implementation until user approval.
**Spec authority:** The updated Notion spec is the single source of truth. Screen counts are 참고치 (reference); structure + devices (D1–D15) are REQUIRED.

> **STATUS: PENDING APPROVAL** — Consensus reached 2026-06-11 (iteration 2): Architect SOUND · Critic APPROVE. No implementation until the user approves execution.
>
> **Binding executor notes (from consensus review — implement with WP1):**
> - **EN1:** New keydown bindings (P pan-pause, R iframe-reload, F force-capture) and the position-resume write must respect the edit-mode early-return (v1 `index.html:1299-1303`); new keys are inert while editing.
> - **EN2:** Remove the stray inert `data-steps="1"` attrs from v1 s0 (`:689`) and s5 (`:1090`) when building the step engine (s0-cover and s5a-zoom are registered hooks, not generic steps), and assert: s0 first input plays bloom with no phantom step; s5a forward zooms once and lands on s5b with no intermediate no-op step.

---

## 1. RALPLAN-DR Summary

### Principles (P)
- **P1 — Spec devices are mandatory, screen counts are advisory.** Implement every D1–D15 *mechanism*; the ~20-slide count is a target, not a contract. Never drop a required device to hit a count.
- **P2 — Content readability is the top visual invariant.** Background immersion (D1 cosmos/starfield/parallax) and asset choreography (D2/D4) must never reduce foreground legibility at 1920×1080. When in doubt, immersion yields.
- **P3 — Asset integrity over fit.** Every hero asset shown at original aspect ratio, fully perceivable, exactly one per screen (D2). No cover-crops. Collisions resolve via split screens or staged reveal, never cropping.
- **P4 — Graceful degradation by default.** Every network-dependent or motion-dependent feature has a deterministic fallback that survives venue conditions: iframe→capture, panning→static top/bottom, parallax/starfield→off under reduced-motion, QR-decode→presenter-supplied URL.
- **P5 — One reviewable file, minimal blast radius.** Single self-contained HTML, clear section comments, fixed 1920×1080 stage (skill invariant). Refactor the engine in place; do not rebuild the shell unless a device makes it unavoidable.

### Decision Drivers (top 3)
- **DD1 — Venue robustness for the live talk (highest weight).** 2026-06-18 is a one-shot live presentation including an 8-minute demo handoff. Anything that can fail on stage (iframe XFO block, network drop, panning desync, demo-return fragility) must have a tested fallback and a manual override key.
- **DD2 — Strict, complete spec coverage.** The prompt demands "하나도 빠짐없이" (omit nothing). Every D-item must be traceable to a work package and an acceptance criterion. Coverage completeness outranks polish.
- **DD3 — Preserve the verified v1 substrate.** v1 is built and Playwright-verified. The existing engine primitives (bloom var, path-draw, count-up, typewriter, hash nav, edit mode, orbit progress, Mon/Mos system) are assets to extend, not replace. Reuse maximizes reliability and minimizes review surface.

### Mode: DELIBERATE
Justified by DD1 (irreversible live event) and the breadth of the change (13→~20 slides, new subsystems: starfield, parallax, panning controller, iframe manager, steps engine, localStorage resume). Pre-mortem + expanded test plan included (§6).

---

### Viable Options — Overall Approach

**Option A (CHOSEN) — Incremental in-place v1→v2 refactor + slide insertion.**
Keep the existing `<section class="slide">` shell, `show()/next()/prevSlide()` engine, bloom system, and all primitives. **Add a NET-NEW data-driven step engine** (there is no step engine in v1 — `next()` at :1282 hard-codes exactly two cases: the s0 first-input bloom at :1286 and the s5 zoom-handoff at :1288; no JS reads any `data-steps` attr, so a v1 `data-steps` attr would be inert). The s0-bloom and s5-zoom special-cases become the new engine's **first two registered step/enter hooks**, keyed by slide id. Insert new slides (S2 +2, S3 +1, S5 hold, S6 +3) and renumber the section map. Layer new subsystems (starfield, parallax, panning, iframe manager) as additive modules behind the existing `reduced` guard.
- Pros: Lowest risk to verified behavior (DD3); smallest review diff. **The reuse claim applies to the proven SUBSTRATE — the slide shell, `show()/prevSlide()`, `clearTimers`, per-slide enter/leave reset, edit mode, print CSS, hash nav, and `fit()` scaling — NOT to a step engine (that is built fresh).** Every working feature (edit/print/hash/reduced-motion/fit) is preserved by construction; the existing per-slide reset block (:1259-1264) and enter hooks (:1265-1268) are exactly the seams the new step engine plugs into.
- Cons: Engine accretes a genuinely new responsibility (step state machine — see WP1 sub-task list); must keep section comments disciplined; slide renumber touches the `data-go` DOM-index map + hash semantics — requires a careful one-pass remap; a new HOLD/input-mode and crossfade-suppression mechanism must be added (no v1 equivalent — see WP1/WP7).

**Option B (REJECTED) — Rebuild slide shell, port components.**
New minimal slide framework with a formal scene/step state machine; port v1 components into it.
- Pros: Cleaner step/panning/iframe lifecycle as first-class concepts; easier to reason about ~20 slides.
- Cons: Throws away DD3 (re-verifies everything from zero); high regression risk on edit-mode `contentEditable` persistence, print CSS, fit-scale, and reduced-motion paths that are already proven; far larger review surface; no spec device *requires* it. **Rejected:** violates P5 + DD1/DD3; the v1 engine already exposes the per-slide enter/leave seams a step engine bolts onto, so a rebuild buys nothing the additive approach lacks.

**Why A over B:** v1's `show()` already does per-slide enter/leave reset with `clearTimers()` and the `next()` branch structure is the natural attach point for a step state machine. Adding the step engine as a contained new module that plugs into those seams is far cheaper than a rebuild that re-litigates solved problems (edit/print/hash/fit/reduced-motion) on a one-shot-deadline deliverable. (Note: Architect steelman accepted — Option A stands; CL-1 downscale remains a BLOCKING presenter decision, see §7.)

---

### Contested Sub-Decisions

**SD1 — n8n→Notion flow draw technique (D5, dedicated screen, asset = static `n8n_flow.svg` 1673×472).**
- **Option A (CHOSEN) — Asset-intact staged reveal: place the SVG at native aspect, overlay a sequential left-to-right wipe/spotlight + sequentially-revealed label callouts and a drawn connector path on a transparent overlay layer.** Pros: honors P3 (asset untouched); reuses existing `.draw` pathLength engine + `.rv` stagger; readable labels added as foreground chips, not edits to the asset; low effort. Cons: connector "draw" is a choreographed overlay aligned to the static image, not the image's own edges — alignment must be tuned to the SVG's node coordinates.
- Option B (REJECTED) — Rebuild the flow as a native DOM/SVG diagram (own nodes + edges) so each edge truly path-draws. Pros: pixel-perfect sequential draw. Cons: duplicates/replaces the asset (tension with D2 "asset shown at original aspect, fully perceivable"); high effort; risk of drifting from the real n8n flow's truth. **Rejected:** D2 wants the real asset perceivable; a rebuilt diagram is a second source of truth.
- Both viable; A wins on P3 + effort. **Executor note:** measure node anchor coords from the rendered SVG (via the capture script) and pin overlay callouts to them.
- **Draw-mode decision (resolves open question #5, m3):** s2d (n8n) and s3c (MCP) **AUTO-PLAY the sequential reveal on slide enter** (no per-key stepping); under `prefers-reduced-motion` they render the **instant full reveal** (all chips/connectors shown, no animation). Rationale: these are illustrative diagrams, not interactive checklists; auto-play keeps the presenter's hands free and avoids a stray key consuming a draw step. Consequence: **s6b remains the only stepped slide besides s0 (first-input bloom) and s5a (zoom step).**

**SD2 — iframe live-embed fallback detection (D3).**
- **Option A (CHOSEN) — Layered detection: (1) preload capture shown immediately as the frame's base layer; (2) attempt iframe load with an `onload` success flag + a timeout (e.g. 3.5s) "did-not-load" guard; (3) probe for X-Frame-Options/CSP framing block via load-failure heuristics (blank/0-height/`onerror`/timeout) → keep the capture layer visible and hide the iframe.** Pros: capture is always the floor (never a blank frame on stage — DD1); no dependency on cross-origin introspection (which XFO/CSP blocks anyway). Cons: cannot 100% distinguish "slow but will load" from "blocked"; timeout tuning needed; a site that loads after the timeout would still show capture (acceptable: capture is faithful).
- Option B (REJECTED) — Rely on `iframe.onerror` / cross-origin try-catch only. Cons: XFO/CSP framing denials frequently do **not** fire `onerror` and cross-origin reads throw — unreliable signal. **Rejected:** fails DD1 robustness; the failure mode is exactly the one we must survive.
- Decision: A. Capture-first, iframe-best-effort. A "reload embed" key and a "force capture" key give the presenter manual control on stage.

**SD3 — starfield / cosmos midground technique (D1).**
- **Option A (CHOSEN) — Canvas 2D particle field, one shared full-stage `<canvas>` in the midground layer, density/opacity driven by current slide `--bloom`, slow drift via single rAF loop, paused when tab hidden and disabled under reduced-motion.** Pros: smooth at the particle counts needed; one draw loop (perf-controllable, DD-perf); easy to gate on bloom and reduced-motion; integrates with mouse parallax by offsetting draw origin. Cons: canvas adds ~one module; must cap particle count + devicePixelRatio for the 1920×1080 stage to avoid jank with ~20 slides in DOM.
- Option B (REJECTED) — Pure CSS (many absolutely-positioned animated dots / box-shadow starfields / SVG). Pros: no canvas, declarative. Cons: hundreds of animated DOM nodes across ~20 always-in-DOM slides risks compositor jank (the very risk the prompt flags); harder to tie continuously to `--bloom`. **Rejected:** perf risk + weak bloom coupling.
- Decision: A. Single canvas, bloom-coupled, rAF-throttled, reduced-motion-off. **Executor note:** starfield lives in ONE fixed midground layer behind all slides (not per-slide), so it does not multiply with slide count.

**SD4 — character PNG downscale (perf vs. "원본 그대로").**
- **Option A (CHOSEN) — Generate proportionally downscaled deck copies into a new `deck-assets/` folder (e.g. longest edge ~900–1100px, PNG, alpha preserved), originals in `design-system/assets/character/` untouched; reference deck copies from index.html.** Rationale: the "원본 그대로" rule governs *visual integrity* — no recolor/rotate/flip/outline. Proportional resize preserves all of those. 6×~6.5MB = ~38MB of character art for on-screen sizes ≤ ~520px is pure waste and a real jank/first-paint risk with ~20 slides. Pros: large perf win (DD-perf), originals preserved (auditable), no visual-integrity violation. Cons: introduces a build artifact + a deviation that MUST be surfaced to the presenter (changelog §7) for explicit sign-off; adds a pre-step to the pipeline.
- Option B (kept viable, fallback) — Use originals as-is; rely on `loading="lazy"`/decoding + only the on-screen Mos per slide. **SD4-B fallback detail (A7):** on every large `<img>` set `decoding="async"` plus `loading` hints (`loading="eager"` on the next 1–2 climax/upcoming slides' heroes so they pre-decode, `loading="lazy"` on far-offscreen assets). Pros: zero deviation, zero build step. Cons: ~38MB asset weight; lazy-load helps network but decode of a 3000px PNG to a 500px box still costs; climax slides (S4b, S6) want instant paint.
- Decision: **A, but flagged as a presenter decision** (P3 tension is real). If the presenter rejects downscaling, fall back to B with aggressive lazy/decoding. This is the single most contestable call — see §7 CL-1 and §5 WP0.

---

## 2. Implementation Plan — Ordered Work Packages

> **Slide id convention.** v2 keeps the `id="sNx"` scheme. New ids are introduced where slides split. Final ordered slide list (target ~20; the engine derives count from DOM, so adding/removing one slide is safe):
>
> `s0` cover → `s1` journey → **S2 (5):** `s2a` kicker → `s2b` Oopy live iframe → `s2c` 구조해부 panning → `s2d` n8n flow → `s2e` metrics+takeaway+QR → **S3 (4):** `s3a` Lead by Design → `s3b` Proact0 iframe+chips → `s3c` MCP 연결도 → `s3d` metrics+takeaway+QR → **S4 (3):** `s4a` pillars → `s4b` one-pager+world_notion+6-orbit climax → `s4c` demo teaser → **S5 (2):** `s5a` bridge → `s5b` Live-Demo HOLD → **S6 (4):** `s6a` 진입 → `s6b` 3축 (step) → `s6c` CTA+QR → `s6d` 마침 tagline.
>
> That is **20 slides**. (v1 had 13; net +7: S2 +2, S3 +1, S5 +1, S6 +3.)

### WP0 — Asset prep + decode (foundation; no index.html behavior change yet)
- **Files:** new `deck-assets/` folder (downscaled Mos PNGs, if SD4-A approved); a throwaway `/tmp/` decode script (NOT committed).
- **Work:**
  1. **QR URL decode (D3 prerequisite).** The three `qr_code.svg` files are Batik vector QR (circles/rects, ~357px) — not raster, so decode by rendering each SVG to a canvas at high res in the headless capture browser, then run `jsQR` on the pixel data. Output the decoded URLs for `joongheon_archive`, `proact0`, `mosmos`. **Fallback:** if any decode fails, surface a single open question to the presenter ("confirm the live URL for X"). Record decoded URLs in the plan handoff / open-questions, NOT hard-magic'd silently.
  2. **(SD4-A, if approved) Downscale 6 Mos PNGs** proportionally into `deck-assets/` (longest edge ~1000px, preserve alpha). Leave originals untouched.
- **Verify:** decoded URLs printed + manually eyeballed as plausible Oopy/mosmos URLs; `deck-assets/` files open and look identical (just smaller); originals unchanged (byte-compare paths).
- **Covers:** D3 (URL source), perf foundation (SD4).

### WP1 — NET-NEW step engine + input-mode/HOLD + crossfade-suppress + reset-hook remap + localStorage resume + data-go remap
> **Scope honesty (A1/C1):** v1 has NO step engine. `next()` (:1282) hard-codes exactly two cases — s0 first-input bloom (:1286) and s5 zoom-handoff (:1288) — and no JS reads any `data-steps` attr. This WP BUILDS a step state machine fresh; the two existing special-cases become its first two registered hooks. The "contained change" claim is honest precisely because the step engine plugs into v1's existing per-slide enter/leave seams (`show()` reset block :1259-1264, enter hooks :1265-1268) rather than replacing the shell. Re-scope effort accordingly: this is the largest single WP.

- **Files:** `index.html` JS block (~1251–1382: `show()`, `next()`, `prevSlide()`, keydown :1298, wheel :1314, touch :1322, boot :1372) + `<nav class="orbit-progress">` (:669–676) + `.slide` crossfade CSS (:172-176) + per-slide `data-section`/`data-steps`/`data-hold` attrs.

- **Sub-tasks (C1 — explicit list so the "contained change" claim stays honest):**
  1. **Step state machine (net-new).** Each slide may declare `data-steps="N"`; the engine holds a per-slide `stepIndex`. `next()` advances `stepIndex` (revealing step `k` via `slide.dataset.step=k` / a `.step-k.shown` class CSS keys off) until exhausted, THEN advances the slide. `prevSlide()` decrements `stepIndex` before retreating to the previous slide. s6b uses `data-steps="3"`; s0/s5a behaviors register as hooks (below).
  2. **Register s0-bloom + s5a-zoom as the engine's first two hooks.** s0: first `next()` → `playCover()` (was :1286). s5a: forward step → zoom-in (scale+blur) that LANDS onto s5b via a registered step hook (NOT the v1 timed `busy=true; setTimeout(...show(cur+1))` at :1289-1290). See WP7.
  3. **Input key map (C2 — see table below).** Wire nav keys (existing :1305-1311, extended), the dedicated non-nav keys (pan pause/resume, iframe reload, force-capture; edit `E` already at :1310), and HOLD-mode gating. Every non-nav key must NEVER consume a step or advance a slide.
  4. **HOLD / input-mode mechanism (net-new — A3, C6).** HOLD state derives from the active slide's `data-hold` attr **on enter** (re-entrant by construction — re-armed identically whether reached by nav, hash, or localStorage resume). While `data-hold` is set: the wheel handler (:1314) and touch handler (:1322) **early-return** (ignored entirely); only ArrowRight/Space (and the explicitly listed return keys) advance from the hold slide. s5b carries `data-hold`.
  5. **Crossfade-suppression hook (net-new — A4).** The freeze landing onto s5b must DISABLE the class-driven `.slide` crossfade (:172-176) — `show(n,true)` does NOT suppress it (it only skips the s0 cover-wait and reduced-motion bloom). Add a CSS hook: a `no-fade` class on the incoming slide (or `body`) that zeroes the `.slide` opacity/transform transition for that transition only, then is cleared.
  6. **Reset-hook remap (C3).** Remap ALL hardcoded slide-id reset hooks in `show()`/`next()`:
     - :1260 `prev.id==='s0'` → `resetCover()` stays keyed to **s0**.
     - :1261 `prev.id==='s5'` zooming removal → now keyed to **s5a** AND **s5b** (clear zoom + HOLD + `no-fade` state on leave).
     - :1262 `prev.id==='s6'` `.type2` reset → now keyed to **s6d** (the typewriter slide).
     - :1268 enter `sl.id==='s6'` `playClosing()` → now keyed to **s6d**.
     - Clear zoom/HOLD state on BOTH enter and leave of s5a/s5b, **including back-nav**: `s5b→s5a` must RESTORE s5a to its pre-zoom state (re-armable bridge), NOT a frozen blurred end-state.
  7. **localStorage resume (D12 — C6 re-arm).** On boot (:1375-1376): if `location.hash` present → honor it (unchanged). If NO hash → read last position from a new key `nextrise2026-deck-pos` and `show()` it. On every `show()`, write `{slide:n}`. Because HOLD derives from `data-hold` on enter (sub-task 4), **resuming via localStorage OR hash directly onto s5b re-arms the hold input-mode flag by construction** — no separate resume-path code needed. Edit key (`nextrise2026-deck-edits`, :1336) stays independent.
  8. **`data-go` DOM-index remap (A5 — DO NOT re-derive; these are computed against the FINAL 20-slide DOM order).** `data-go` holds DOM **indices** (v1: `0,1,2,5,8,11,12` at :670-676), consumed as `slides[target]` (:1274) and `show(+p.dataset.go)` (:1328) — NOT ids. Final 20-slide DOM order: s0=0, s1=1, s2a=2, s2b=3, s2c=4, s2d=5, s2e=6, s3a=7, s3b=8, s3c=9, s3d=10, s4a=11, s4b=12, s4c=13, s5a=14, s5b=15, s6a=16, s6b=17, s6c=18, s6d=19. **New 7 `data-go` values = `0,1,2,7,11,14,16`** (커버=s0/0, 여정=s1/1, 중헌=s2a/2, Proact0=s3a/7, mosmos=s4a/11, 라이브데모=s5a/14, 함께=s6a/16). Also update `data-section` on all 20 slides to the 7 talk sections (0 cover, 1 journey, 2 중헌, 3 Proact0, 4 mosmos, 5 demo, 6 closing); progress `done/cur` derives from `data-section` (:1271-1277) so only attrs + these 7 jump targets change.

#### Input Key Map (C2)
| Key(s) | Role | Consumes step/nav? | Notes |
|---|---|---|---|
| → / Space / PageDown | Advance (step, else slide) | YES (nav) | Existing :1306; now step-aware. On s5b (hold): → and Space ONLY return to s6a. |
| ← / PageUp | Retreat (step, else slide) | YES (nav) | Existing :1307; now step-aware (back-step before back-slide). |
| Home / End | Jump first / last slide | YES (nav) | Existing :1308-1309. |
| `P` | Panning pause/resume (s2c) | **NO** (non-nav) | New. Toggles auto-pan only; never advances. No v1 collision. |
| `R` | iframe reload embed (s2b/s3b) | **NO** (non-nav) | New. Re-attempts live embed; never advances. |
| `F` | force-capture (s2b/s3b) | **NO** (non-nav) | New. Pins capture layer, hides iframe; never advances. |
| `E` | Toggle edit mode | **NO** (non-nav) | Existing :1310 (guarded by `!isContentEditable`). **Taken** — do not reuse for anything else. |
| Wheel / Touch-swipe | Advance/retreat | YES (nav) | Existing :1314/:1322. **Early-return (ignored) while active slide has `data-hold`** (A3). |

> **Verify the new letters `P`/`R`/`F` against :1305-1311 before wiring** — only `e/E` is currently bound; `P/R/F` are free. If any future binding collides, pick another letter but keep one key per role and keep all three as non-nav.

- **Verify (capture script):** `#1..#20` deep-links each land on the right slide; orbit progress highlights correct section node per slide (data-go `0,1,2,7,11,14,16`); s6b advances exactly one fragment per → (3 steps) and back-step hides last; **dedicated keys `P`/`R`/`F` do NOT advance nav** (assert slide index unchanged after pressing each); refresh with no hash resumes last slide; refresh with `#7` honors hash; **resume/hash directly onto s5b (#16) re-arms HOLD** (wheel/touch ignored, only →/Space returns); s5b→s5a back-nav restores s5a pre-zoom (not frozen-blurred); reduced-motion path still boots to bloom on s0.
- **Covers:** D7/D8/D11 structure scaffolding, D10 (HOLD/freeze mechanism), D12, D14, progress-map update.

### WP2 — Background immersion: 3-depth + starfield + parallax (D1)
- **Files:** `index.html` — extend `.bg` block (CSS ~178–214) into three explicit layers; add ONE midground `<canvas>` to the persistent background DOM (near `.bg`, lines ~666+); add JS module (starfield rAF + mouse parallax).
- **Work (D1, SD3-A):**
  1. **Background layer:** keep existing grid-lines + gradient (the Notion block grid) — this is layer 1.
  2. **Midground layer:** keep glows + floating `.blk` blocks; ADD the shared starfield canvas. Particle density/opacity scales with the *current slide's* `--bloom` (read on each `show()`), realizing "Cosmos fills as bloom rises." Slow infinite drift via a single rAF loop; pause on `document.hidden`; **disable entirely under `prefers-reduced-motion`** and in print.
  3. **Foreground:** slide content — unchanged stacking, always on top.
  4. **Mouse micro-parallax:** small translate offsets (a few px) applied to midground glows/blocks/starfield origin based on pointer position; clamp magnitude so text never visibly shifts; off under reduced-motion.
- **Verify:** screenshots at low-bloom slide (s1, faint stars) vs. climax (s4b/s6a, dense colored cosmos) show the gradient fill; text crisp/legible at 1920×1080 AND 1280×720 (P2); console clean; reduced-motion screenshot shows static background, no canvas animation; print shows no starfield. Performance: rAF stays smooth across a full s0→s6d walk (visual: no stutter in capture sequence; spot-check via console timing if needed).
- **Covers:** D1.

### WP3 — Asset choreography baseline + browser frame fix (D2)
- **Files:** `index.html` `.browser .shot img` CSS (:263, currently `object-fit:cover` — the D2 violation) + each `.browser`-based hero-asset slide's markup.
- **Scope note (A2):** the :263 `object-fit:cover→contain` flip affects ONLY slides whose hero is inside a `.browser .shot img`. It does **NOT** touch s2b — v1 s2b is a full-bleed kenburns hero, not a `.browser` card (`#s2b .hero img{object-fit:cover;animation:kenburns}` at :413, `kenburns` keyframes :414, scrim :415). s2b is STRUCTURALLY REPLACED in WP4 (its dead CSS is removed there), so do not expect the WP3 flip to fix it.
- **Work (D2):**
  1. **Kill cover-crop.** Change `.browser .shot img` (:263) from `object-fit:cover` to `contain` (or letterbox the frame to the asset's aspect) so every captured asset is fully perceivable at native aspect. Where a capture is tall (homepage.png 1910×1811, annotation svg 1474×1218), the frame either scrolls/pans (D4) or the slide is sized to show it whole.
  2. **One hero per screen audit.** Verify each of the 20 slides features exactly ONE hero asset; if two assets collide (e.g. lead_by_design banner + Proact0 capture), they are already split across s3a/s3b — confirm no residual doubling. Resolve any collision by split or staged reveal, never crop.
  3. **Aspect-ratio sizing tokens.** For each hero asset, set the frame/container `aspect-ratio` from the known native dimensions so layout reserves correct space (prevents reflow + lets WP2 background show around it).
- **Verify:** per-asset screenshot shows full asset, no crop, native proportions; side-by-side with the source file confirms integrity (no recolor/stretch). Capture at the phone viewport shows letterboxed, not cropped.
- **Covers:** D2 (and underpins D3/D4/D9).

### WP4 — S2 restructure: 5 screens incl. iframe, panning, dedicated flow (D7, D3, D4, D5, D6)
- **Files:** `index.html` — replace v1 `s2a/s2b/s2c` (lines ~765–854) with `s2a..s2e`; add panning controller JS + iframe manager JS (shared with WP5); QR badge component.
- **Work:**
  - **s2a** — kicker + main copy (keep v1 confirmed copy; `.kicker`+`.headline`+`.sub`). **Mon density ADDITIVE (A6):** v1 s2a has only **1** Mon (under the 2–3 floor) — ADD 1–2 Mon here, roles/colors consistent with the S2 중헌 section theme (조사/정리 Mons: `m-research`/`m-organize`).
  - **s2b** — **Oopy 중헌아카이브 live iframe** in `.browser` frame (SD2-A iframe manager). **STRUCTURAL REPLACEMENT (A2):** v1 s2b is a full-bleed kenburns hero (`#s2b .hero img` :413 + `kenburns` keyframes :414 + `.scrim` :415); REPLACE it with a `.browser` card layout. Capture base layer (use a faithful capture of the Oopy site; if none exists, the annotation/homepage svg is NOT the live site — generate a capture via the headless script against the decoded URL during build, store under `deck-assets/`) + iframe overlay using the WP0-decoded URL; auto-fallback to capture; light scroll demo possible. Keys: `R` reload embed, `F` force capture (non-nav, WP1). **Move the dead-CSS removal to WP4 (A2):** delete the now-unused `#s2b .hero img` rule (:413), the `@keyframes kenburns` (:414), and the `#s2b .scrim` rule (:415) — they become orphaned once s2b is a `.browser` card. (Mon density 2–3.)
  - **s2c** — **구조 해부 slow auto-pan** of `homepage_with_yellow_annotation.svg` (1474×1218, tall) inside `.browser` frame (D4): start frame shows top fully → slow top→bottom auto-pan → **pause + zoom/highlight at each yellow-annotation zone** → end frame shows bottom fully. The `P` key toggles pause/resume (non-nav, never consumes a step — WP1). Panning controller reads zone stops from configured y-offsets (executor measures annotation y-positions from the rendered SVG via capture script). This is the shared **panning controller** reused by s3b (C4) and optionally s4b. (Mon density 2–3.)
  - **s2d** — **n8n→Notion flow DEDICATED screen** (D5, SD1-A): `n8n_flow.svg` at native aspect, intact; overlay sequential reveal — left-to-right wipe/spotlight + sequentially-revealed readable label chips + a drawn connector path (reuse `.draw` pathLength engine) advancing node-by-node. **AUTO-PLAY on enter (m3, resolves OQ#5)**; reduced-motion = instant full reveal. Not stepped (does not use `data-steps`). (Mon density 2–3, 조사/정리 theme.)
  - **s2e** — metrics **count-up** (reuse `runCounters`) with 조사·정리 Mon + **Takeaway** band + **QR 고정 배지** "지금 들어가보세요" (D6) corner-fixed, separated from any hero asset (this is S2's LAST screen). (Mon density 2–3.)
- **Verify:** s2b shows live site when network up, capture when blocked (test both: normal + offline/blocked), `R`/`F` keys work and do NOT advance nav; **no `kenburns`/`#s2b .hero`/`#s2b .scrim` rules remain** (grep clean); s2c capture sequence shows top→pan→pause-at-annotation→bottom + `P` pause key works + nav unaffected; s2d flow AUTO-PLAYS on enter, builds sequentially with readable labels, asset uncropped, reduced-motion = instant full; s2e count-up runs, QR badge fixed in corner and visually separated from content; **s2a now 2–3 Mon (was 1), all S2 screens 2–3 Mon**.
- **Covers:** D7, D3 (중헌), D4, D5 (n8n), D6 (S2 QR badge), D13 (incl. additive Mon on s2a).

### WP5 — S3 restructure: 4 screens incl. iframe + dedicated MCP diagram (D8, D3, D5, D6)
- **Files:** `index.html` — replace v1 `s3a/s3b/s3c` (lines ~855–975) with `s3a..s3d`; reuse iframe manager (WP4) + QR badge + path-draw.
- **Work:**
  - **s3a** — **Lead by Design**: `lead_by_design.svg` (1669×344) shown WHOLE at native aspect (D2) + copy stagger (`.rv` with `--d`). **Mon density ADDITIVE (A6):** v1 s3a has **0** Mon — ADD 2–3 Mon, roles/colors consistent with the S3 Proact0 section theme (분석/실행 Mons: `m-analysis`/`m-execute`).
  - **s3b** — **Proact0 live iframe** (SD2-A) in `.browser`; **fallback `homepage.png`** (1910×1811) as capture base; + 3 point chips. `R`/`F` keys (non-nav). **Mon density ADDITIVE (A6):** v1 s3b has **0** Mon — ADD 2–3 Mon (분석/실행 theme).
    - **Legibility decision (C4 — premise corrected, decision written):** `contain` on homepage.png (1910×1811) in the ~880×694 frame yields ~732×694 — **nearly frame-filling, NOT tiny**. The real issue is **venue legibility** of 1910px-wide content shown at ~36% scale. **DECISION:** s3b REUSES the WP4 shared panning controller — the capture pans slowly top→bottom inside the frame (consistent with s2c, cheapest path, no new mechanism). When the network allows, the LIVE iframe gives real scrolling; **capture-pan is the fallback presentation**. (Mirrored to open-questions.md as resolved.)
  - **s3c** — **MCP 연결도 DEDICATED screen** (D5/D8③): Notion hub (center) → tool logos (slack, discord, github, claude, claudecode, openai, perplexity, mcp) with **sequential path-draw** from hub to each tool (reuse `.draw`), **AUTO-PLAY on enter (m3), reduced-motion = instant full reveal** (not stepped). Currently this diagram shares s3c with metrics in v1 — split it out. Logos at original colors + clearspace. (Mon density 2–3.)
  - **s3d** — 지표 count-up (분석·실행 Mon) + Takeaway + **QR 고정 배지** (D6, S3's LAST screen). (Mon density 2–3.)
- **Verify:** s3a banner fully visible uncropped + **now 2–3 Mon (was 0)**; s3b live iframe scrolls / capture-pans top→bottom on fallback (both tested), `R`/`F` non-nav, **now 2–3 Mon (was 0)**; s3c connections AUTO-PLAY sequentially from Notion hub to each tool with readable logos (reduced-motion = instant full); s3d count-up + QR badge present + separated; all S3 screens 2–3 Mon.
- **Covers:** D8, D3 (Proact0), D5 (MCP), D6 (S3 QR badge), D13 (incl. additive Mon on s3a/s3b).

### WP6 — S4 (3 screens) audit + optional world_notion panning (D9, D13, D2)
- **Files:** `index.html` `s4a/s4b/s4c` (lines ~976–1089).
- **Work:**
  - **s4a** — positioning + pillars (keep v1). **Mon density ADDITIVE (A6):** v1 s4a has **0** Mon — ADD 2–3 Mon, roles/colors consistent with the S4 mosmos section theme (생성/소통 Mons: `m-create`/`m-comm`).
  - **s4b** — company one-pager with **`world_notion.png` (1907×1019) in `.browser` frame**: **DECISION (C4, resolves OQ#3): SHOW WHOLE, NO PAN** — at 1907×1019 it is near-stage aspect (1.87 vs 1.78), so `contain` fits it essentially whole; do NOT invoke the panning controller here. + **bloom climax** (existing 6-Mon orbit, `--bloom:1`) — climax slide is Mon-density-EXEMPT (D13). Apply WP3 `contain` fix so the capture isn't cropped.
  - **s4c** — demo teaser 4 cards → leads into S5 bridge. **Mon density ADDITIVE (A6):** v1 s4c has **0** Mon — ADD 2–3 Mon (생성/소통 theme).
- **Verify:** s4b orbit climax intact (regression check vs v1), world_notion shown WHOLE uncropped (no pan), bloom=1 full color; **s4a now 2–3 Mon (was 0), s4c now 2–3 Mon (was 0)**, s4b exempt (climax).
- **Covers:** D9, D2 (world_notion=whole), D13 (incl. additive Mon on s4a/s4c).

### WP7 — S5 demo handoff + HOLD screen (D10)
- **Files:** `index.html` — keep v1 `s5` as `s5a` (bridge) + ADD new `s5b` (HOLD with `data-hold`); rework the v1 s5 zoom logic in `next()` (:1288-1292 currently zooms s5→s6 via a timed `busy=true; setTimeout(...show(cur+1),980)`).
- **Work (D10):**
  1. **s5a bridge** — keep v1 bridge (keyword chips, agent screenshots collage, Mon fly-in). Its forward step triggers **zoom-in (scale+blur)** that **LANDS onto s5b via a registered step hook (A3), NOT the v1 timed busy-clear** (:1289-1290). The step hook performs the transition, then `show(s5b, ...)`.
  2. **Crossfade suppression on landing (A4).** The freeze onto s5b must disable the class-driven `.slide` crossfade (:172-176) — `show(n,true)` does NOT suppress it. Apply the WP1 `no-fade` CSS hook (class on the incoming s5b or `body`) for this one transition so the zoom freezes cleanly without an opacity crossfade fighting it; clear `no-fade` after.
  3. **s5b Live-Demo HOLD** — a calm hold screen with `data-hold`: **Mos working floating + "Live Demo" label**. The `data-hold` attr arms HOLD input-mode on enter (WP1 sub-task 4) — wheel/touch early-return, only →/Space returns. Presenter manually switches to the workspace browser tab for the 8-min demo. On return, **ONE →/Space → s6a** (closing entry). Visually stable/non-distracting; survives ~8 min on screen (no runaway animation; starfield gentle, bloom-gated, rAF-capped).
  4. **Back-nav state (C3).** Leaving s5a/s5b clears zoom + `no-fade` + HOLD state (WP1 sub-task 6). **`s5b→s5a` (back) must RESTORE s5a to its pre-zoom state** (re-armable bridge that can zoom again), NOT a frozen blurred end-state.
- **Verify:** s5a forward → zoom/blur → lands frozen on s5b "Live Demo" + Mos working (no crossfade flicker — `no-fade` applied); HOLD armed (wheel/touch ignored, assert slide index unchanged after wheel/swipe on s5b); leaving it idle shows no jank/no auto-advance; →/Space from s5b → s6a; **s5b→s5a back-nav restores s5a pre-zoom (not frozen-blurred), and s5a can zoom again**.
- **Covers:** D10.

### WP8 — S6 restructure: 4 screens with per-axis step reveal (D11, D14, D6, D15)
- **Files:** `index.html` — replace v1 `s6` (lines ~1126–1172) with `s6a..s6d`; use the WP1 steps engine for s6b.
- **Work (D11):**
  - **s6a 진입** — full-color bloom + headline **"함께 성장할 사람을 찾습니다"** + **Mos happy 중앙** (climax — Mon-density exempt).
  - **s6b 3축 (STEP, D14)** — `data-steps="3"`: ONE axis card revealed PER key input; a returning Mon **lands** per axis. Axes: 팀원 / 생태계 참여자(Author) / 엑셀러레이터·투자자. Each key reveals the next card + lands its Mon; 3 keys total, then next → s6c.
  - **s6c CTA** — **mosmos.world + QR center** (QR as central CTA, D6 — reuse mosmos qr_code.svg) + copy **"적용 방법이 궁금하시면 네트워킹(16:30)에서 워크스페이스를 직접 열어 보여드릴게요"**.
  - **s6d 마침** — **Mos greeting + ALL Mons gathered** + **tagline typewriter** (reuse `typeInto`/`playClosing`) + finale copy **"감사합니다 — 내 AI가 자라는 세계, mosmos"** (D11④/D15; lowercase mosmos wordmark). **m1:** the typewriter reads its content from the `.type2 data-text="…"` ATTRIBUTE (:1163, v1 currently `"내 AI가 자라는 세계 — A world where my AI grows up."`) — changing the finale copy means EDITING THAT ATTRIBUTE, not just visible text. Reset hook for `.type2` now keys off s6d (WP1 sub-task 6, was s6 :1262).
- **Verify:** s6b reveals exactly one axis per key (3 steps), Mons land per axis, back-step hides last axis; s6c QR centered + venue copy present; s6d typewriter runs to the finale tagline, all Mons gathered; reduced-motion shows full content instantly.
- **Covers:** D11, D14, D6 (S6 central QR), D15.

### WP9 — Global regression + cross-cutting compliance pass
- **Files:** `index.html` (edit mode, print CSS, reduced-motion, hash — verify untouched-by-construction); MEMORY.md deviation re-log (separate, post-approval).
- **Work:**
  1. **Re-log existing deviations** (고응집·저결합, Lucide-not-emoji, fixed-stage) + new ones (SD4 downscale if approved, SD1 overlay-draw, SD2 capture-first iframe) — surfaced in §7 for presenter.
  2. **Edit mode** still toggles `contentEditable` on all 20 slides + Ctrl+S export; localStorage edit key independent of new position key.
  3. **Print CSS** reveals all `.rv`/`.rv-pop`; starfield/iframe suppressed in print. **m2 — print pagination is UNMEASURED with 20 slides + captures** (v1 was 13): add a **print smoke-check** — render to print/PDF and confirm pages paginate legibly, no clipped/blank pages, captures render at print resolution.
  4. **prefers-reduced-motion** disables starfield, parallax, panning auto-motion (show top→bottom statically or full asset), typewriter (instant), all `.draw`/`.float`; s2d/s3c auto-play → instant full reveal.
  5. **WP9.5 — FINAL GLOBAL Mon-density CHECK only (A6/C5).** The ADDITIVE Mon work is distributed into the per-slide WP tasks (WP4: s2a +1–2; WP5: s3a/s3b +2–3 each; WP6: s4a/s4c +2–3 each), NOT done here. This step is the final pass that CONFIRMS all 20 slides land at 2–3 Mon (climax exempt: s4b, s6a; plus s0 cover), catching any slide the per-slide tasks missed.
- **Verify:** full §4 acceptance run incl. print smoke-check.
- **Covers:** D13 (final check; additive work lives in WP4/5/6), D15, all "must keep working" constraints.

---

## 3. Risks & Mitigations (top 5)

| # | Risk | Likelihood/Impact | Mitigation |
|---|------|------------------|------------|
| R1 | **iframe XFO/CSP blocks live embed** (Oopy/Notion-hosted sites often deny framing) → blank frame on stage. | High / High (DD1) | SD2-A capture-first: faithful capture is the always-visible floor; iframe is best-effort overlay with timeout fallback. "Force capture" key. Test against the *actual* decoded URLs offline AND online in WP4/WP5. If a site cannot be framed at all, the slide still looks complete via capture. |
| R2 | **Performance jank** — ~20 slides in DOM + 38MB of Mos PNGs + starfield + parallax. | Medium / High | SD4-A downscale (≤~1MB each) into `deck-assets/`; ONE shared starfield canvas (not per-slide), rAF-throttled, dpr-capped, paused when hidden, off under reduced-motion; `loading`/`decoding` hints on large captures. Verify smoothness across a full walk in WP2/WP9. |
| R3 | **Panning timing desync** — auto-pan pause-at-annotation zones drift from the SVG's real annotation positions; pause key collides with nav. | Medium / Medium | Executor measures annotation y-offsets from the rendered SVG via capture script (don't guess); pause/resume on the dedicated **`P`** key, documented in the WP1 key map as **non-nav (never consumes a step)** and handled before nav dispatch; reduced-motion path shows static top/bottom (no timing dependency). |
| R4 | **Demo-handoff fragility at venue** — presenter tab-switches for 8 min; deck left on HOLD; wrong key returns to wrong place / animation runs away. | Medium / High (DD1) | s5b carries `data-hold` → HOLD input-mode armed on enter (wheel/touch early-return; only →/Space → s6a), re-entrant by construction so localStorage/hash resume onto s5b RE-ARMS it (C6); no auto-advance; gentle bloom-gated starfield; D12 resume survives accidental refresh; s5b→s5a back-nav restores s5a pre-zoom. Rehearse handoff incl. mid-demo refresh AND multi-minute idle-on-HOLD in verification (WP7, §6). |
| R5 | **Slide renumber breaks deep-links / progress map / edit persistence** (13→20, new ids). | Medium / Medium | One-pass remap in WP1 (sub-task 8) with the explicit DOM-index table; **`data-go` holds DOM INDICES not ids** (v1 `0,1,2,5,8,11,12` → v2 `0,1,2,7,11,14,16`, pre-computed in WP1 so the executor does not re-derive); progress `done/cur` derives from `data-section` so only attrs + the 7 `data-go` targets change; edit-mode persistence keys by slide `id` (renamed ids = fresh edit slots, acceptable — re-enter any copy edits post-rename, or migrate keys); verify all `#1..#20` after remap. |

---

## 4. Acceptance Criteria

### Global
- [ ] Single self-contained `index.html` (inline CSS/JS; CDN fonts/icons + spec-mandated iframes only); clear section comments per WP.
- [ ] Fixed 1920×1080 stage preserved; `fit()` letterboxes correctly at 1920×1080, 1280×720, and one phone viewport (letterbox, never crop/distort).
- [ ] **Console clean** (no errors/warnings) on a full s0→s6d walk, captured at 1280×720 + 1920×1080 + phone.
- [ ] **All assets load** (every hero asset, all logos, all Mon variants, Mos poses) — no broken refs; captures used as iframe fallbacks present.
- [ ] **prefers-reduced-motion:** starfield/parallax/panning-motion/typewriter/path-draw/float all disabled or instant; content fully readable and complete.
- [ ] **Print:** all reveals forced visible; starfield/iframe suppressed; deck paginates legibly.
- [ ] **Edit mode** (E key / hotzone) toggles contentEditable on all 20 slides; Ctrl+S exports; edits persist via localStorage; edit key independent of position key.
- [ ] **Hash + resume (D12):** `#1..#20` deep-link correctly; refresh with hash honors it; refresh without hash resumes last position; **resume/hash onto s5b (#16) re-arms HOLD** (wheel/touch ignored).
- [ ] **Mon density (D13):** 2–3 Mon per slide (additive work landed on the v1 under-floor slides s2a/s3a/s3b/s4a/s4c — see WP4/5/6); only s4b + s6a (and s0 cover) exempt as climax.
- [ ] No emoji on any slide; mosmos wordmark lowercase; 국문 헤드라인 마침표 없음; logos original colors + clearspace; Mos light-surface only, 1 per screen, no recolor/rotate/flip.

### Screen-by-screen
- [ ] **s0** cover bloom on first input + typewriter (regression-intact).
- [ ] **s1** journey timeline path-draw + nodes (regression-intact).
- [ ] **s2a** kicker + main copy; 2–3 Mon.
- [ ] **s2b** Oopy 중헌 live iframe shows site (network up) / capture (blocked); light scroll works; reload + force-capture keys work.
- [ ] **s2c** annotation svg auto-pans top→bottom, pauses+highlights at each yellow zone, start/end show top/bottom whole; `P` pause key toggles WITHOUT consuming nav.
- [ ] **s2b dead CSS removed:** no `@keyframes kenburns`, `#s2b .hero`, or `#s2b .scrim` remain.
- [ ] **s2d** n8n flow on its OWN screen, asset intact + native aspect, labels readable, connections AUTO-PLAY sequentially on enter (reduced-motion = instant full).
- [ ] **s2e** count-up runs; Takeaway present; QR badge "지금 들어가보세요" corner-fixed + separated from hero.
- [ ] **s3a** lead_by_design.svg whole + native aspect + copy stagger.
- [ ] **s3b** Proact0 live iframe scrolls / homepage.png fallback CAPTURE-PANS top→bottom (C4 — reuses WP4 pan controller); 3 point chips; `R`/`F` non-nav; now 2–3 Mon.
- [ ] **s3c** MCP 연결도 OWN screen; Notion hub → tools AUTO-PLAY sequential draw on enter (reduced-motion = instant full); logos original-color.
- [ ] **s3d** count-up + Takeaway + QR badge (separated).
- [ ] **s4a** pillars (now 2–3 Mon); **s4b** one-pager + world_notion shown WHOLE/uncropped (no pan) + 6-Mon orbit climax + bloom=1 (regression-intact); **s4c** demo teaser 4 cards (now 2–3 Mon).
- [ ] **s5a** bridge → zoom/blur freeze onto **s5b** HOLD ("Live Demo" + Mos working) via registered step hook + `no-fade` (no crossfade flicker); HOLD armed (wheel/touch ignored); idle-stable; →/Space → s6a; **s5b→s5a back-nav restores s5a pre-zoom (not frozen-blurred), s5a can re-zoom**.
- [ ] **Dedicated keys** `P`/`R`/`F` never advance nav (slide index unchanged after each).
- [ ] **s6a** full bloom + "함께 성장할 사람을 찾습니다" + Mos happy center.
- [ ] **s6b** ONE axis card per key (3 steps), Mon lands per axis; back-step hides last.
- [ ] **s6c** mosmos.world + central QR + 네트워킹(16:30) copy.
- [ ] **s6d** Mos greeting + all Mons gathered + tagline typewriter → "감사합니다 — 내 AI가 자라는 세계, mosmos" (finale copy set via `.type2 data-text` attr, :1163).

### Verification method
Per-WP: Playwright capture script (`/tmp/pwshot/capture.js` + chromium headless-shell) at **1280×720 + 1920×1080 + one phone viewport**; iframe behavior tested with live network up AND blocked/offline; console captured each run.

---

## 5. Pre-mortem (DELIBERATE) — 3 failure scenarios

- **PM1 — "On stage, the Oopy/Proact0 embeds were blank and the talk stalled."** Cause: XFO/CSP framing denial not caught, or venue network down. Prevention: SD2-A capture-first floor (frame is never blank); "force capture" key; offline test in WP4/WP5 against decoded URLs; if both sites deny framing, accept capture-only and label the frame so it reads as intentional, not broken.
- **PM2 — "After the 8-min live demo, returning to the deck jumped to the wrong slide / re-ran the whole bloom / a stray wheel-tick advanced it."** Cause: HOLD screen advanced on stray input (wheel/touch/non-nav key), or refresh lost position, or back-nav left a frozen blurred state. Prevention (C3-extended): s5b `data-hold` arms HOLD input-mode on enter (wheel/touch early-return; dedicated `P`/`R`/`F` keys never advance; only →/Space → s6a); re-armed identically on localStorage/hash resume (C6); no auto-advance; D12 resume survives accidental refresh; **s5b→s5a back-nav restores s5a pre-zoom (not frozen-blurred)**; rehearse handoff (WP7) including back-nav and "dedicated keys do not advance" checks.
- **PM3 — "The deck stuttered/lagged during the cosmos climax."** Cause: 38MB PNGs + per-slide DOM particles + uncapped canvas dpr. Prevention: SD4-A downscale; single shared starfield canvas with capped particle count + dpr + hidden-tab pause + reduced-motion off; verify a full walk is smooth in WP2/WP9 before sign-off.

---

## 6. Expanded Test Plan (DELIBERATE)

- **Unit-ish (mechanism):** step engine advances/retreats correctly per `data-steps` (s6b: 3 fwd → next slide; 3 back → prev slide); HOLD flag derives from `data-hold` on every enter (re-entrant); `no-fade` crossfade-suppress applies then clears on the s5a→s5b landing; reset hooks fire for the REMAPPED ids (s0 resetCover, s5a/s5b zoom+HOLD clear, s6d `.type2`/`playClosing`); `runCounters` resets on leave; `typeInto` completes + reduced-motion instant; starfield density tracks `--bloom`; panning zone-stop math hits configured y-offsets; localStorage write on every `show()`.
- **Integration (per-screen):** the 20-screen acceptance list (§4) via capture script at 3 viewports.
- **e2e (presentation flow):** full s0→s6d walk via keyboard only (the venue input mode); full reverse walk; deep-link to each section node via orbit progress (data-go `0,1,2,7,11,14,16`); the S5→demo→S6 handoff dry-run including a mid-demo refresh. **C3 assertions:** (a) **s5b→s5a back-nav** restores s5a pre-zoom (not frozen-blurred) and s5a can re-zoom; (b) **dedicated keys `P`/`R`/`F` do NOT advance nav** (slide index unchanged after each); (c) on s5b, wheel + touch-swipe are ignored (index unchanged).
- **Resilience/observability:** iframe with network up vs. blocked/offline (both sites); console-error capture asserted clean each run; reduced-motion full pass; print pass + pagination smoke-check (m2); phone-viewport letterbox pass. **C6 idle-on-HOLD test:** leave the deck on s5b with the **tab/window VISIBLE (`document.hidden===false`)** for several minutes, then assert **no drift/leak and smooth resume** — the starfield rAF is bloom-gated and particle/dpr-capped (does NOT pause on a visible tab, so verify it stays smooth, not just that it pauses when hidden).

---

## 7. Change Log entries to surface to the presenter (deviations + judgment calls)

- **CL-1 (DECISION NEEDED) — Mos character PNG downscaling.** Plan proposes proportionally downscaled deck copies in `deck-assets/` (originals untouched) for performance (38MB→~6MB total). Visual integrity rule (no recolor/rotate/flip/outline) is preserved; only resolution changes. **Needs presenter sign-off.** If declined, fall back to originals + aggressive lazy/decoding (accept some first-paint cost).
- **CL-2 — n8n & MCP "draw" technique.** Static SVGs are kept intact (D2) with a choreographed overlay (wipe/spotlight + drawn connector + label chips) rather than rebuilding the diagrams as native DOM. The "drawing" is an aligned overlay, not the asset's own edges.
- **CL-3 — iframe is capture-first.** Live embeds are best-effort; a faithful capture is always the visible base and auto-stays on framing denial/timeout. On stage the frame is never blank. "Force capture" key available.
- **CL-4 — QR-derived URLs.** Live site URLs are decoded from each project's `qr_code.svg` (vector QR → render → jsQR). Decoded URLs will be reported for presenter confirmation; any decode failure becomes an open question rather than a guess.
- **CL-5 — Pre-existing deviations re-logged (unchanged):** 고응집·저결합 (Hanja tofu-risk), Lucide icons instead of emoji (zip README forbids emoji), fixed 1920×1080 stage instead of scroll-snap (frontend-slides skill invariant). All accepted in v1, carried into v2.
- **CL-6 — s2b structural replacement.** v1 s2b is a full-bleed kenburns hero; v2 replaces it with a `.browser` live-iframe card and DELETES the now-dead `@keyframes kenburns` + `#s2b .hero`/`#s2b .scrim` CSS (:413-415). Visual change is intentional (D3 requires a live embed, not a static cover-crop hero).

### Revision history — iteration 2 (consensus revision pass)
Folded Architect (A1–A7, verdict SOUND-WITH-CHANGES) + Critic (C1–C6 + m1–m3, verdict ITERATE):
- **A1/C1** WP1 restated as NET-NEW step engine (v1 has none; reuse = shell/show/edit/print/hash/fit substrate only) with an explicit 8-item sub-task list.
- **A2/CL-6** s2b structurally replaced (kenburns hero → `.browser` card); dead kenburns/hero/scrim CSS removal added to WP4; WP3 `:263` flip scoped (does NOT touch s2b).
- **A3/C2** HOLD/input-mode via `data-hold` (wheel/touch early-return); zoom lands via registered step hook (not timed busy-clear); INPUT KEY MAP table added (P/R/F non-nav).
- **A4** crossfade-suppression `no-fade` hook added (show(n,true) does not suppress the class crossfade).
- **A5** `data-go` = DOM INDICES; pre-computed v2 values `0,1,2,7,11,14,16` written in.
- **A6/C5** Mon-density made ADDITIVE on v1 under-floor slides s2a/s3a/s3b/s4a/s4c, distributed into WP4/5/6; WP9.5 reframed as final global CHECK.
- **A7** Option A reaffirmed; SD4-B fallback detail (`decoding="async"` + `loading` hints) added.
- **C3** reset-hook remap (s0/s5a/s5b/s6d) + s5b→s5a back-nav restore + PM2/e2e assertions.
- **C4** s3b legibility decision written (premise corrected: ~732×694 not tiny; venue-legibility is the issue → reuse pan controller); world_notion=whole noted.
- **C6** localStorage/hash resume onto s5b re-arms HOLD by construction; idle-on-HOLD (document.hidden=false) resilience test added.
- **m1** s6d finale edits `.type2 data-text` attr (:1163). **m2** print pagination smoke-check added to WP9. **m3** s2d/s3c auto-play decision (resolves OQ#5).

---

## ADR — v2 Spec-Compliance Upgrade

- **Decision:** Upgrade v1 in place (Option A) to full D1–D15 compliance by generalizing the existing engine and inserting 7 slides (13→20), layering starfield/parallax/panning/iframe subsystems additively behind the existing reduced-motion guard.
- **Drivers:** DD1 venue robustness (one-shot live event) · DD2 complete spec coverage ("하나도 빠짐없이") · DD3 preserve the verified v1 substrate.
- **Alternatives considered:** Option B full shell rebuild (rejected — re-litigates solved edit/print/hash/fit/reduced-motion behavior, larger review surface, no device requires it). Sub-decision alternatives: rebuilt DOM flow diagrams (SD1-B, rejected — D2 asset-integrity), onerror-only iframe detection (SD2-B, rejected — XFO denials don't fire onerror), CSS starfield (SD3-B, rejected — DOM-node jank), originals-as-is PNGs (SD4-B, kept as fallback pending CL-1 sign-off).
- **Why chosen:** v1's `next()`/`show()` already expose the exact step + per-slide enter/leave hooks v2 needs; incremental refactor maximizes reliability on a deadline-bound, irreversible live deliverable while still implementing every required device.
- **Consequences:** Engine gains a NET-NEW step state machine + HOLD/input-mode + crossfade-suppression hook (not present in v1; mitigated by disciplined section comments + the WP1 sub-task list); slide renumber requires a careful one-pass remap of `data-section` + `data-go` DOM-INDICES (`0,1,2,7,11,14,16`) + hash; one new `deck-assets/` build artifact (pending CL-1); three new deviations to log (CL-1/2/3); s2b dead kenburns/hero/scrim CSS removed; s6d finale copy edits the `.type2 data-text` attribute.
- **Follow-ups / open questions:** **RESOLVED this iteration:** world_notion (s4b) shows WHOLE, no pan (OQ#3); s2d/s3c sequential draws AUTO-PLAY on enter, reduced-motion = instant full (OQ#5); s3b homepage.png fallback uses the WP4 capture-pan controller (C4). **REMAINING (presenter):** (1) CL-1 Mos-PNG downscale sign-off (BLOCKING). (2) Confirm decoded QR URLs are the intended live sites. (3) Verify both target sites' framing policy (XFO/CSP) against the venue network before 2026-06-18.
