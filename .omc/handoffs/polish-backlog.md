# Ralph polish backlog (post team-verify)

Consolidated cosmetic/minor items from wave handoffs — none block acceptance; address in the ralph polish loop AFTER WP9 verdict (plus anything WP9 adds).

1. (chrome) Orbit-progress pill is viewport-fixed → at narrow windows (<~1300px) it visually crowds/overlaps slide kickers (s2c/s3c) and s6 tops pre-fix. 1920 fullscreen = fine. Option: scale chrome via media query, or shift kickers down a notch globally.
2. (s2e) QR badge overlays takeaway band top-right corner — add band right-padding or nudge badge.
3. (s2d) bottom whitespace — center flow card vertically.
4. (s3a) mid-band gap between copy and banner.
5. (s3c) left half airy — pills could fan in an arc around the hub (cosmetic; current straight column is readable).
6. (s6b) bottom ~300px empty after layout fix — could enlarge cards or add a soft caption line.
7. (check) s2e takeaway badge letter-spacing at 1280 reads "TA KEAWAY" — verify at 1920, adjust tracking if real.
8. (idea, optional) s5b hold screen: add tiny clock or progress-dot pulse so an 8-min hold doesn't look frozen to the audience (spec says calm — keep subtle if added).

Verification after each polish edit: targeted screenshot + the affected slide's probes; full walkdeck before architect sign-off.

## v3 WP-D disposition (2026-06-11)
- #1 chrome scale: DONE (v2 media query). #2 s2e QR/takeaway: DONE (right:332px). #3 s2d whitespace: DONE (D3 redesign). #4 s3a: DONE (D4). #6 s6b: DONE (D7). #7 takeaway tracking: FIXED (.14em→.08em).
- #5 s3c pill arc-fan: DEFERRED — current straight column is readable and the slide passed review twice; re-layout risk > cosmetic gain 7 days before the event.
- #8 s5b idle pulse: DROPPED — spec mandates a calm hold screen; any pulse risks reading as "frozen app vs animation" confusion on stage.

## v3 changelog notes (post-architect-gate)
- CL-1: s5a bubble copy changed to "그럼, 실제 워크스페이스에서 보여드릴게요 — Mon들이 먼저 준비하고 있어요" (presenter-requested demo-transition phrasing; overrides spec example line).
- CL-6: s2c reduced-motion shows the full asset on a dark frame (baked annotations legible); DOM chips hidden to avoid double-rendering the same text. Architect-accepted deviation from the literal "chips visible statically" wording.
- Post-event follow-ups: mask baked s2c side-labels at crop edge (cosmetic fragment); s3c pill arc-fan.
