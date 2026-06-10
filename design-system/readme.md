# Mosmos · Web & Brand Design System

> 내 AI가 자라는 세계 — *A world where my AI grows up.*

This system powers Mosmos's PPT-style web pages, landing page, and waitlist page.
It is the single source of truth for brand color, type, spacing, logo assets,
reusable UI primitives, and full-screen UI kits.

---

## What Mosmos is

Mosmos is a **personal AI platform**. You tell your own AI avatar a goal, it gets
the result for you, and the more you use it the more it grows to feel like you.
It is positioned as a warm, living **"world"** — not a tech tool or a chatbot.

- **Tagline:** 내 AI가 자라는 세계. / *A world where my AI grows up.*
- **Slogan:** 말만 하세요. 움직이는 건 Mos. / *Just say it. Mos does the moving.*
- **Persona:** 기억을 쌓아(**Mos**) 함께 성장하고, 흩어진 가능성(**Monad**)을 연결해(**Mosaic**) 하나의 세계(**Cosmos**)를 만들어가는 다정한 조력자.

**Brand personality:** a caring guide who grows alongside you — "doesn't pretend to
be clever, but you can trust it to get things done." Friendly but dependable; leads
with the result and reassurance, never tech specs or hype. Gender-neutral and
welcoming. Calm, cozy, pastel worldview; sincere and gentle, never boastful.

**Audience:** AI-savvy individual knowledge workers, creators, developers, PMs,
students (late-20s to early-30s) tired of choosing tools, prompting, verifying, and
repeating work. They live in Notion / GitHub / Discord / Instagram / YouTube — so the
design should feel modern, clean, and creator-friendly.

---

## Sources

These materials informed the system. Stored here for provenance — the reader may not
have access.

- **Figma:** "Mosmos Brand.fig" (mounted, read-only). Scoped frames:
  `/Brand-Design` (logos), `/Brand-Design/section` (logo components),
  `/Brand-Design/section2` (브랜드 컬러 — the full color system),
  `/Brand-Design/Typeface` (type). Logo node ids: Full Color Horizontal `2107:957`,
  Symbol `2107:958`, Vertical `2107:955`; mono variants under `/Brand-Design/components`.
- **Uploaded fonts:** `uploads/pretendardvariable_font.css`, `uploads/nanumsquareB_font.css`
  (CSS only — the binaries were not included; see Caveats).
- **Spec brief:** layout/grid, radius, elevation, type scale, buttons, components,
  motion and accessibility rules — all encoded into the token files.

---

## Content fundamentals — how Mosmos writes

**Language.** Primary copy is **Korean**, warm and conversational (해요체 — gentle
polite, never stiff 합니다체 for marketing). English tagline/slogan appear as a
secondary layer.

**Voice.** Lead with the **result and reassurance**, never the technology.
- ✅ "목표만 말하면, 당신의 AI 아바타가 결과를 가져옵니다."
- ✅ "검토하고 다듬을 필요 없이, 바로 쓸 수 있는 결과가 도착해요."
- ✅ "똑똑한 척하지 않아도, 끝까지 해내는 다정한 조력자."

**Person.** Speaks **to "당신/you"**; refers to the AI as **"Mos"** (the companion),
and to the user's instance as **"나의 Mos"**. Inclusive, never gendered.

**Tone words:** 다정한 (caring), 함께 (together), 자라는 (growing), 가볍게 (lightly),
안심 (reassurance). Calm and cozy, gently optimistic.

**Casing.** The wordmark is always lowercase **mosmos**. Korean headlines use no
terminal punctuation; sentences in body copy do. English is sentence case.

**Avoid:** "업계 최고 성능 AI", "그냥 믿고 쓰세요", competitor names, model-performance
bragging, hype, exclamation overload. No emoji in product/marketing surfaces — warmth
comes from words and the pastel palette, not emoji.

---

## Visual foundations

**Color.** A calm, pastel-blue worldview. **Core Blue `#0F6FDA`** is the primary
action color; **Classic `#568BD8`** and **Light `#9CBDE9`** blues form the signature
**brand gradient** (135°, Core → Light) used on the symbol, hero glows, and accent
tiles. **Pop Purple `#9B6EEF`** is secondary, **Bright Cyan `#00A0A3`** is accent.
Neutrals are **Clear White `#F7F8F9`** and **Blue Black `#1D2026`**. Text rides a
blue-gray ramp (`#1D2026` → `#4F555F` → `#666E7A` → `#AAB4C2`). Status: Clean Green
success, Coral Red error, Dark Orange warning, Pure Blue info. Full light + dark
themes via `[data-theme="dark"]`. See `tokens/colors.css`.

**Type.** Display & headings = **NanumSquare Bold** (rounded, friendly, confident).
Body & UI = **Pretendard Variable** (clean, highly legible Korean/Latin). Mono is
system-only. Display 64 / H1 40 / H2 32 / H3 24 / Subtitle 20 / Body 16 / Caption 13,
with tight tracking on display. Mobile scales display/H1 down ~20%. See
`tokens/typography.css`.

**Spacing & layout.** 4px base unit; scale xs 4 → 5xl 128. 12-column grid, 24px
gutter (16 mobile). Max content 1200, wide/hero 1440, reading column 720. Section
vertical padding 96–128 desktop / 64 tablet / 48 mobile. See `tokens/spacing.css`.

**Radius.** Generous, cozy rounding — sm 8 (inputs/chips), md 12 (buttons/small
cards), lg 16 (cards/panels/modals), xl 24 (hero/feature blocks), pill 999
(buttons/badges/avatars). Sharp 0–2px corners are avoided everywhere.

**Elevation.** Soft, low-contrast shadows: e1 card, e2 raised, e3 modal. Dark mode
lowers shadow opacity and leans on Dark Border tokens for separation.

**Cards** look like: white surface, `radius-lg` (16), `border-subtle` 1px hairline,
`e1` shadow; feature cards add a tinted accent tile behind the icon and lift to `e2`
on hover.

**Backgrounds.** Mostly clean white/Clear-White surfaces. Heroes and CTAs use the
soft **Sky gradient** (`#EAF2FC → #F7F8F9`) plus a blurred radial Core-Blue **glow**
and a translucent brand **blob symbol** as quiet decoration. No photographic
backgrounds, no noisy textures, no heavy full-bleed imagery by default.

**Imagery vibe.** Cool, soft, pastel-blue; rounded organic shapes (the "Mos" blob).
Companion/character art should be non-gendered and friendly.

**Character.** The official **Mos** character art lives in `assets/character/` —
six transparent PNG poses: `mos-greeting`, `mos-happy`, `mos-curious`,
`mos-working`, `mos-resting`, `mos-sleeping`. Match the pose to the moment
(greeting → onboarding/welcome, happy → success, curious → questions/empty
states, working → loading/progress, resting → idle, sleeping → inactive/night).
Use on light surfaces (Clear White, Sky gradient) at original proportions; one
Mos per screen, min 48px, hero 160–280px. Never recolor, rotate, flip, outline,
or place on dark backgrounds. See the Brand guideline cards for specimens.

**Motion.** Subtle only — 150–250ms ease-out (`cubic-bezier(.22,1,.36,1)`) for
hover/focus; gentle fade / slide-up on scroll reveal. No heavy 3D, parallax overload,
or flashy transitions. Respects `prefers-reduced-motion`.

**Interaction states.** Hover: primary/secondary buttons **darken ~8%**; outline/ghost
get a faint Core-Blue 7% wash; cards lift 2px to `e2`. Press: a 0.5px nudge down.
Focus: a 2px Core-Blue ring (`--shadow-focus`). Disabled: 40% opacity, no shadow.

**Borders & transparency.** Hairline borders use the Light/Dark Border tokens
(subtle → default → strong). Blur (`backdrop-filter`) is used sparingly — the navbar
gains a saturated 12px blur only after scroll. Min tap target 44×44; body text meets
WCAG AA.

---

## Iconography

Mosmos ships **no proprietary icon set** — the Figma file contains only logo assets.
The system uses **[Lucide](https://lucide.dev)** (via CDN) as the icon library: its
clean, rounded, consistent **stroke** style matches the cozy, friendly brand mood.

- Loaded from CDN in UI kits: `https://unpkg.com/lucide@0.453.0/dist/umd/lucide.min.js`.
- Rendered through a small `icon-lucide.jsx` wrapper that paints with `currentColor`
  (so icons inherit accent tile colors).
- **Default stroke-width 2**, rounded line caps/joins.
- **Emoji are not used** as icons anywhere. No unicode-glyph icons.
- ⚠️ **Substitution flagged:** if Mosmos has (or commissions) a bespoke icon set, drop
  the SVGs into `assets/icons/` and swap the wrapper.

**Logos** are real brand assets, in `assets/logos/` (see Index). The symbol is an
organic **blue "blob" mark with a small dot** (Mos + Monad); the wordmark is lowercase
**mosmos**. Four lockups, each in three color treatments — full-color (brand gradient),
mono black (`#1D2026`), mono white (`#F7F8F9`):
- **Horizontal Signature** (`mosmos-horizontal-*`) — primary lockup for navbars/footers
  and other wide, horizontal spaces.
- **Vertical Signature** (`mosmos-vertical-*`) — center-aligned lockup for posters,
  covers, and thumbnails; keep the symbol-to-wordmark ratio intact.
- **Symbol** (`mosmos-symbol-*`) — the mark alone, for compact spaces/avatars.
- **Wordmark / Text** (`mosmos-text-*`) — the lowercase logotype, a **secondary** asset.
  Pair it with the symbol by default; standalone use only in exceptional editorial
  contexts. Never alter its case or letter-spacing.

**Logo don'ts.** No backgrounds that hurt legibility; don't use the wordmark alone as a
rule; never change ratio, color, or case; don't insert text inside the logo; no effects,
outlining, rotation, anthropomorphizing, or image frames; don't pair the symbol with a
different typeface or use prohibited color combinations.

---

## Index — what's in this system

**Global entry**
- `styles.css` — the one file consumers link. `@import`s the token + base layer.

**Tokens** (`tokens/`)
- `fonts.css` — `@font-face` for Pretendard Variable + NanumSquare (CDN — see Caveats).
- `colors.css` — base palette, semantic aliases, light + dark themes.
- `typography.css` — families, weights, type scale, helper classes.
- `spacing.css` — spacing, radius, elevation, layout, control heights, motion.
- `base.css` — element resets / global defaults.

**Components** (`components/`) — reusable React primitives (bundled to
`window.MosmosDesignSystem_53320b`):
- `forms/` — **Button** (primary/secondary/outline/ghost · sm/md/lg · pill · icons),
  **Input** (label/helper/error/success), **Switch**.
- `display/` — **Card** (feature + plain), **Badge** (tones · soft/solid/outline),
  **Avatar** (gradient-initials, brand ring).
  Each has `<Name>.d.ts`, `<Name>.prompt.md`, and a `*.card.html` specimen.

**UI kits** (`ui_kits/`) — full-screen recreations composing the primitives:
- `landing/` — marketing home (nav, hero, how-it-works, features, stat band, waitlist CTA, footer; light/dark toggle).
- `waitlist/` — focused two-column sign-up with validation + success state.

**Guidelines** (`guidelines/`) — foundation specimen cards shown in the Design System
tab (Colors, Type, Spacing, Brand).

**Assets**
- `assets/logos/` — brand logo SVGs (see below).
- `assets/character/` — Mos character art, 6 transparent PNG poses (greeting,
  happy, curious, working, resting, sleeping).

**Starting points:** Button, Card, the Landing page, and the Waitlist page.

---

## Caveats & how to make this perfect

- ⚠️ **Fonts are CDN-served, not self-hosted.** The uploaded font CSS referenced local
  binaries that weren't included, so `tokens/fonts.css` points Pretendard Variable and
  NanumSquare at jsDelivr CDNs. **Please upload the `.woff2` files** so we can
  self-host for production reliability and offline use.
- ⚠️ **Icons are Lucide (substitution).** If a bespoke Mosmos icon set exists, share it.
- See `SKILL.md` to use this system inside Claude Code.
