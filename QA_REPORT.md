# QA Report — NextRise v2 Deck (nextrise-v2 team-verify)

**Verifier:** worker-verify (a72fc34ae9d16b188)  
**Date:** 2026-06-11  
**Verdict:** PASS (10 pass / 1 partial / 0 fail / 0 blockers)  
**Full report:** `.omc/handoffs/wp9-verify.md`

---

## Summary

All 11 functional evidence items verified with fresh Playwright output against a live server at http://localhost:8923. Zero deck-origin console errors. The 20-slide deck meets all acceptance criteria from §4 of the spec-compliance plan.

| Evidence Item | Result |
|---|---|
| E1 — s0 bloom on first input (regression) | PASS |
| E2 — s6b 3-step reveal + back-step | PASS |
| E3 — P/R/F keys do NOT advance nav | PASS |
| E4 — s5b HOLD (wheel/touch blocked; →→s6a) | PASS |
| E5 — s5b→s5a back-nav restores pre-zoom | PASS |
| E6 — localStorage resume + hash #16 re-arms HOLD | PASS |
| E7 — Orbit 7-node section navigation | PASS |
| E8 — s2b dead CSS removed (kenburns/hero/scrim) | PASS |
| E9 — Reduced-motion: s2d/s3c instant full reveal | PASS |
| E10 — s4b orbit climax + world_notion present | PASS |
| E11 — Visual walk: all key screens reviewed | PASS |
| Mon density (WP additive targets) | PARTIAL — s5b/s6c have 0 Mon; not in any WP targets |

## Console Verdict

**Deck-origin errors: 0.** All console noise (React #418/#423/#425, Highcharts accessibility, 500 from hon2yt2ch.kr) originates from third-party iframe content — pre-approved known-backlog per WP4/WP5 handoffs.

## Remaining Items for Presenter Decision

1. **s5b/s6c Mon density** — 0 Mon on HOLD and CTA screens. Not assigned in any WP. Add 2 mon-deco SVGs each if strict global 2-3 floor is required. Risk: low.
2. **s2d two-panel layout** — Confirm at 1920×1080 the dual n8n flow display is intentional.
3. **Venue network test** — Test iframe embeds on venue network before 2026-06-18 (per R1/pre-mortem PM1).
