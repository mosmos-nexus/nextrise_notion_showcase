# Open Questions

## NextRise v2 Spec-Compliance — 2026-06-10

### Remaining (need presenter decision)

- [ ] **Approve Mos PNG downscaling into `deck-assets/` (CL-1) — BLOCKING.** 38MB of ~3000px character art is a real first-paint/jank risk with 20 slides; proportional resize preserves visual integrity (no recolor/rotate/flip) but is a deviation from "원본 그대로" that needs explicit sign-off. Fallback if declined: originals + `decoding="async"` + `loading` hints (accept some first-paint cost).
- [ ] **Confirm decoded QR URLs are the intended live sites** (joongheon_archive, proact0, mosmos). Live site URLs are only encoded in each `qr_code.svg`; the D3 iframe embed depends on decoding them correctly; a wrong/guessed URL embeds the wrong site on stage.
- [ ] **Verify both target sites' framing policy (X-Frame-Options/CSP) against the venue network before 2026-06-18.** Determines whether the live iframe (D3) actually renders or falls back to capture on stage; must be tested online + offline.

### Resolved (iteration 2 — consensus revision)

- [x] **s4b world_notion.png: SHOW WHOLE, no pan (OQ#3, C4).** At 1907×1019 it is near-stage aspect (1.87 vs 1.78), so `contain` fits it essentially whole; the panning controller is NOT invoked here.
- [x] **s2d (n8n) / s3c (MCP) sequential draws: AUTO-PLAY on enter (OQ#5, m3).** Reduced-motion = instant full reveal; not stepped. s6b remains the only stepped slide besides s0 (first-input bloom) and s5a (zoom step).
- [x] **s3b homepage.png fallback legibility (C4).** Premise corrected: `contain` yields ~732×694 (nearly frame-filling, NOT tiny); the real issue is venue legibility of 1910px-wide content at ~36% scale. DECISION: s3b reuses the WP4 shared panning controller — capture pans slowly top→bottom inside the frame (consistent with s2c, cheapest); the live iframe gives real scrolling when network allows, capture-pan is the fallback presentation.
