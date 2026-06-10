# WP0 Asset Handoff — worker-assets

Generated: 2026-06-11

---

## Task #1 — Mos PNG Downscale (SD4-A)

**Status: COMPLETE**

### Output files — `/home/honeybee/workspace/mosmos/nextrise_notion_showcase/deck-assets/`

| File | Orig Dims | New Dims | Orig Size | New Size |
|---|---|---|---|---|
| mos-curious.png  | 3016×2984 | 1000×989 | 6.19 MB | 718 KB |
| mos-greeting.png | 3408×3216 | 1000×944 | 6.88 MB | 684 KB |
| mos-happy.png    | 3464×3256 | 1000×940 | 6.94 MB | 667 KB |
| mos-resting.png  | 3224×2632 | 1000×816 | 5.66 MB | 605 KB |
| mos-sleeping.png | 3128×2776 | 1000×887 | 5.44 MB | 616 KB |
| mos-working.png  | 3096×3000 | 1000×969 | 6.01 MB | 688 KB |

**Total: 6 files, ~3.98 MB (was ~37.1 MB — 90% reduction)**

### Originals — verified untouched (SHA256 before = SHA256 after)

```
545edef1a6544246175055d628f956395fae5d123ab24f5c9b1a7f127a977c5f  mos-curious.png
468ecec5606ca5a5cf1386478b3c8c1b2872b01fcf872bda770f0457b66c6037  mos-greeting.png
42f777cb4594485fee584404c65d9bfbeb8f8a8020b41512a458946847e6cb7c  mos-happy.png
f43a9f6d0d33473e2aaf41b1048bb504aada42592ecacef44ef2b6fea00a7ef0  mos-resting.png
9e6ea5bcf8ddda28922f95f02aee627673da20344b3ea1ea7719771f8926e54c  mos-sleeping.png
fa3adc5a4c5bba24be6c64e239b727c78431f38f41c7d36b7da0a428dfb68727  mos-working.png
```

### Transparency verification

Visual check: `mos-happy.png` composited over magenta (#FF00FF) background — clean anti-aliased transparent edges confirmed (screenshot: `/tmp/pwshot/alpha-check-magenta.png`). Character body opaque, corners/edges show magenta. **Alpha preserved.**

### Method

Canvas downscale via Playwright headless-shell: loaded each source PNG through `http://localhost:8923/design-system/assets/character/<name>.png` (same-origin on the localhost server), drew onto a `<canvas>` at `longest_edge=1000px` maintaining aspect ratio, exported `canvas.toDataURL('image/png')`, decoded base64 to file. No recolor, rotate, flip, or outline applied.

---

## Task #2 — iframe Framability Probes

**Status: COMPLETE**

### Header probe (curl -sIL, following redirects)

| Site | HTTP status | x-frame-options | content-security-policy |
|---|---|---|---|
| https://www.hon2yt2ch.kr/ | 200 | **not present** | **not present** |
| https://www.proact0.org/  | 200 | **not present** | **not present** |

Neither site sets `X-Frame-Options` or `Content-Security-Policy` framing restrictions.

### iframe render probe

Probe page `/tmp/pwshot/frameprobe.html` — both iframes (width=700 height=500) loaded via `file://` URL with `sandbox="allow-scripts allow-same-origin allow-forms allow-popups"`. Waited 6 seconds. Screenshot: `/tmp/pwshot/frameprobe-result.png`.

**JavaScript load events:** `{"f1":"load-fired","f2":"load-fired"}` — both iframes fired `load` within 6s.

**Visual content verdict (screenshot reviewed):**

| Site | iframe ID | Renders real content? | Notes |
|---|---|---|---|
| hon2yt2ch.kr | f1 | **YES — FRAMABLE** | Shows full Oopy-hosted site: header "중헌 아카이브(Important Archive)", hero image with starfield, character logo, call-to-action button "Proact0 구경가기". Full site content visible. |
| proact0.org  | f2 | **YES — FRAMABLE** | Shows full Proact0 site: logo, headline "Proact0", descriptive Korean text, call-to-action button "커뮤니티 바로가기". Full site content visible. |

**Framability verdict: BOTH SITES ARE FRAMABLE.** No XFO/CSP block detected, no blank/error frames. Live iframe embedding should work without fallback-only mode. SD2-A capture-first design still recommended as defensive floor for venue network conditions, but live embed is viable.

**Console notes from probe:** React hydration errors (#418, #423, #425) in one or both frames — these are client-side rendering artifacts from the sandboxed environment and do not affect the iframe visual output. A `500` response for a sub-resource was logged (likely a analytics/tracking endpoint failing under `sandbox`). Not framing-related.

### Site screenshots

Viewport (1440×900) and full-page captures stored in `deck-assets/`:

| File | Size |
|---|---|
| `deck-assets/hon2yt2ch-viewport.png` | 472 KB |
| `deck-assets/hon2yt2ch-fullpage.png` | 1892 KB |
| `deck-assets/proact0-viewport.png`   | 136 KB |
| `deck-assets/proact0-fullpage.png`   | 175 KB |

---

## Summary for WP1+ implementors

- **deck-assets/ Mos PNGs**: reference these (not the originals) from `index.html`. Path: `deck-assets/mos-<pose>.png`. All 6 poses available at ~1000px longest edge, alpha intact.
- **hon2yt2ch.kr**: framable (no XFO/CSP). Use decoded URL for s2b iframe src. Capture fallback still recommended per SD2-A.
- **proact0.org**: framable (no XFO/CSP). Use for s3b iframe src. Capture fallback still recommended per SD2-A.
- **QR URL decode**: not completed in this task (requires jsQR + SVG render — out of scope for WP0 asset prep stage; to be done separately or treated as presenter confirmation item per CL-4).
