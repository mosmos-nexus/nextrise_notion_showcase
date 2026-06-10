---
name: mosmos-design
description: Use this skill to generate well-branded interfaces and assets for Mosmos, either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files.

Mosmos is a personal AI platform — "내 AI가 자라는 세계 / A world where my AI grows up."
The brand is calm, cozy, pastel-blue, and dependable; copy leads with the result and
reassurance (in warm Korean 해요체), never with tech specs or hype.

Key files:
- `styles.css` — the single global stylesheet; link it and use its CSS custom properties.
- `tokens/` — colors, typography, spacing/radius/elevation/motion, fonts, base reset.
- `components/` — React primitives (Button, Input, Switch, Card, Badge, Avatar) with
  `.d.ts` contracts and `.prompt.md` usage notes.
- `ui_kits/landing` and `ui_kits/waitlist` — full-screen reference layouts.
- `assets/logos/` — brand logo SVGs (gradient + mono black/white, symbol + horizontal).
- `guidelines/` — foundation specimen cards.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets
out and create static HTML files for the user to view. If working on production code,
copy assets and read the rules here to become an expert in designing with this brand.

Icons: use Lucide (https://lucide.dev) with stroke-width 2 — Mosmos ships no icon set.
Fonts: NanumSquare Bold for display/headings, Pretendard Variable for body/UI.

If the user invokes this skill without any other guidance, ask them what they want to
build or design, ask some questions, and act as an expert designer who outputs HTML
artifacts _or_ production code, depending on the need.
