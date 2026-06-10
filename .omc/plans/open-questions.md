# Open Questions

## NextRise v3 Polish + Maintainability — 2026-06-11

### Remaining (presenter / executor decision)

- [ ] **Confirm the s5a demo-transition bubble copy (D6 / CL-1) — DEFAULTED.** Presenter-flagged copy choice but **DEFAULTS to** `그럼, 실제 워크스페이스에서 보여드릴게요 — Mon들이 먼저 준비하고 있어요` (applied unless the presenter says otherwise). Presenter-authorized copy change overriding the spec example line; presenter may refine wording (해요체, no invented claims, no emoji). Surfaced in changelog CL-1.
- [ ] **Confirm s2d dark-backdrop acceptability at 1920 — DEFAULTED.** Presenter-flagged but **DEFAULTS to the dark backdrop** (SD-C1, #1D2026); fall back to per-region HTML callouts (SD-C2) only if it reads as a broken/tonally-clashing slide at WP-B verification. The asset's two diagram groups are intentionally unified by the single dark stage (resolves the prior "two-panel intentional?" QA item). Surfaced in changelog CL-3.
- [ ] **Decide which WP-E enhancements to keep.** Default: E1 (triaged backlog nits) only; drop E2 (hover), E3 (s3c arc), E4 (Q&A appendix) under clock pressure. E4 only if the presenter wants Q&A backup material.

### Resolved (iteration 2 — ralplan consensus revision)

- [x] **s2c chip↔waypoint mapping (D2, was OQ#3) — DROP-EMPTY RULE.** The annotation labels are raster pixels in a pattern-filled SVG with ZERO `<text>` nodes — they CANNOT be grepped. Resolution: the executor renders `homepage_with_yellow_annotation.svg` (1474×1218) full-res via the capture script, visually READS each label + its source-y, maps each to the NEAREST waypoint of `[146,381,547,762,1002,1184]`, and **DROPS any waypoint with no nearby annotation from the zoom path** (never zoom to an empty region). The "5 strings vs 6 waypoints" count resolves AT RENDER TIME; the plan no longer assumes a count.
- [x] **WP-R abandon trigger (was OQ#5) — now CLOCK-BOUND (binary).** WP-R runs first but is HARD time-boxed to **1 working day**. If `build.mjs` + the first-build equivalence walk + the E12 export round-trip are not ALL green by end of WP-R day 1 → freeze `src/` (leave on the branch), `git checkout index.html`, land D1–D8 directly in the monolith, revisit the split post-2026-06-18 (DD1 > DD3). No open-ended budget; the clock loses at most 1 day to the split.

## NextRise v2 Spec-Compliance — 2026-06-10

### Remaining (need presenter decision)

- [ ] **Approve Mos PNG downscaling into `deck-assets/` (CL-1) — BLOCKING.** 38MB of ~3000px character art is a real first-paint/jank risk with 20 slides; proportional resize preserves visual integrity (no recolor/rotate/flip) but is a deviation from "원본 그대로" that needs explicit sign-off. Fallback if declined: originals + `decoding="async"` + `loading` hints (accept some first-paint cost).
- [ ] **Confirm decoded QR URLs are the intended live sites** (joongheon_archive, proact0, mosmos). Live site URLs are only encoded in each `qr_code.svg`; the D3 iframe embed depends on decoding them correctly; a wrong/guessed URL embeds the wrong site on stage.
- [ ] **Verify both target sites' framing policy (X-Frame-Options/CSP) against the venue network before 2026-06-18.** Determines whether the live iframe (D3) actually renders or falls back to capture on stage; must be tested online + offline.

### Resolved (iteration 2 — consensus revision)

- [x] **s4b world_notion.png: SHOW WHOLE, no pan (OQ#3, C4).** At 1907×1019 it is near-stage aspect (1.87 vs 1.78), so `contain` fits it essentially whole; the panning controller is NOT invoked here.
- [x] **s2d (n8n) / s3c (MCP) sequential draws: AUTO-PLAY on enter (OQ#5, m3).** Reduced-motion = instant full reveal; not stepped. s6b remains the only stepped slide besides s0 (first-input bloom) and s5a (zoom step).
- [x] **s3b homepage.png fallback legibility (C4).** Premise corrected: `contain` yields ~732×694 (nearly frame-filling, NOT tiny); the real issue is venue legibility of 1910px-wide content at ~36% scale. DECISION: s3b reuses the WP4 shared panning controller — capture pans slowly top→bottom inside the frame (consistent with s2c, cheapest); the live iframe gives real scrolling when network allows, capture-pan is the fallback presentation.
