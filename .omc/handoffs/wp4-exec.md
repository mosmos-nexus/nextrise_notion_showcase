# Handoff: WP4 (S2) → WP5 (S3)

- **Decided**: s2a~s2e live (15 slides total). iframe manager = capture-base always rendered + overlay iframe; src set by manager (lazy attr REMOVED — see risk); boot-preload via setTimeout 4.5s; LOAD_TIMEOUT 8s; liveness decided by no-cors fetch reachability probe on iframe onload (spec's "네트워크 실패" semantics); F pins capture (userForced), R re-arms. Pan controller transforms `#s2c .pan-inner` (translateY + scale holds), registered at deck.pan; P key non-nav. s2d auto-play chips via registerHook.
- **Lead fixes applied post-worker** (worker hit token limit before verify, 3 defects found+fixed by lead): (1) `loading="lazy"` on display:none iframe → onload never fires → ALWAYS fell back to capture; removed. (2) timeout 3.5s too tight for the heavy Oopy site; raised 8s + late-onload upgrade. (3) aborted navs fire load too → false-live in blocked network; replaced contentDocument heuristic with no-cors fetch probe. All three verified: preloadedLive=true on cover, blockedFallsBackToCapture=true.
- **Risks/Notes for WP5**: deck.iframe.reload/forceCapture currently hard-bound to s2b — WP5 MUST refactor to a factory (per-slide managers, R/F dispatch to ACTIVE slide's manager). Do NOT add loading="lazy" to s3b iframe. Stagger s3b boot-preload ~10s so the two embeds don't compete. Embedded sites throw their own pageerrors (React hydration #418/#423/#425 from hon2yt2ch) — console assertions must filter third-party frame errors.
- **Polish backlog (ralph loop)** — severity re-assessed via 1920 QA crops (s2c-1920.png, s2e-1920-bottom.png):
  - (cosmetic) s2c kicker vs progress pill: NO overlap at 1920 fullscreen (venue mode); only proximity at small windows because chrome is viewport-fixed. Optional: scale chrome down below ~1100px width.
  - (cosmetic) s2e QR badge overlays takeaway band top-right corner; reads as intentional layering, text unaffected. Optional: band right-padding.
  - (minor) s2d bottom whitespace — center the flow card vertically.
  - (check) s2e takeaway badge tracking shows "TA KEAWAY" at 1280 thumbnail; confirm at 1920.
- **Files**: index.html (s2 sections + managers), deck-assets/capture-joongheon-top.png in use.
