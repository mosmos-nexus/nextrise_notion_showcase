# Mosmos · Web & Brand Design System

> 내 AI가 자라는 세계 — *A world where my AI grows up.*

This system powers Mosmos's product and web surfaces. Single source of truth for brand color, type, spacing, logo assets, and UI primitives.

---

## What Mosmos is

Mosmos는 **개인 AI 실행 플랫폼** — *내 AI가 자라는 세계*. A **Patron** sets a goal; their **Mos** (Super-Generalist companion agent) handles conversation directly and delegates deep work to specialized **Mon** agents, returning one result. **Authors** build Mon and Mon's Skill in the **Studio**, trade them on the **Hub**, and Patrons keep them in their **Inventory**. The same person moves between Patron and Author — the **Prosumer** cycle, a.k.a. **Grow Loop** / **B2A2P(Business to Agent to Prosumer)**.

**Message house** (단일 기준: 브랜드 포지셔닝 §5)

| 레이어 | 세계관 (인앱·온보딩) | 범용 (콜드·landing) |
| --- | --- | --- |
| **Tagline** | 디지털 세상 속, 또 하나의 나. / *Another me, in the digital world.* | 쓸수록 손발 맞는 내 AI 조력자 |
| **Slogan** | 중요한 것에 집중하라. / Focus on what matters. We handle the rest. | 자잘한 일은 맡기고, 중요한 것에 집중하세요. |
| **가치 제안** | 말하면 이뤄지고, 쓸수록 내 것이 되며, 나눌수록 자라는 순환 생태계 | 내 노하우로 나만의 전문가와 스킬을 만들고, 공유하여 수익화까지 |

**Name layer** (worldview meaning, not product components): **Mos** (관습·성품) grows with you; scattered possibilities (**Monad**) connect (**Mosaic**) into one world (**Cosmos**).

---

## Worldview & terminology

`용어집` in Mosmos World is the single source of truth — reference, never redefine. Propose additions to the glossary rather than defining locally.

**Agents**

- **Mos** (모스) — Super-Generalist orchestrator; holds memory/preference, handles conversation directly, delegates complex tasks to Mon.
- **Mon** (몬) — Deep-Specialist sub-agent Mos delegates to; runs in isolated context, returns only the final result.
- **Monito** (모니또) — Studio copilot for Authors; onboarding guide for new Patrons.

**Roles**

- **Patron** (후원·사용자) — end user who owns a Mos; sets goals, spends Mana.
- **Author** (공급·제작자) — creates and publishes Mon and Skill.
- **Prosumer** — one person moving between Patron (use) and Author (make).

**Assets**

- **Skill** (스킬) — procedural assets. **Mos' Skill** = auto-generated, personal, non-tradeable. **Mon's Skill** = attached to a Mon by the Author, tradeable on the Hub. Attaching a Skill costs no Mana; Mana is spent only on execution.

**Surfaces**

- **Monitor** — home dashboard: Mos status, recent activity, Inventory & Mana summary, entry to Studio/Hub.
- **Chat** — main Patron↔Mos conversation surface.
- **Hub** — marketplace to rent Mon and buy Skill.
- **Studio** — authoring workspace for Mon and Skill (Monito assists).
- **Inventory** — personal store of owned/favorited Mon and Skill.
- **Pricing** — plan selection + Mana top-up.

**Economy & model**

- **Mana** (마나) — single credit for execution, trade, and settlement.
- **Grow Loop** (성장 루프) — use → make → share → value returns. Same loop seen as **Prosumer** cycle (UX) and **B2A2P** (Business→Author→Patron, business view).

---

## Sources

- **Figma:** "Mosmos Brand.fig". Frames: `/Brand-Design` (logos), `/Brand-Design/section2` (컬러), `/Brand-Design/Typeface` (type). Logo node IDs: Horizontal `2107:957`, Symbol `2107:958`, Vertical `2107:955`.
- **Fonts:** `uploads/pretendardvariable_font.css`, `uploads/nanumsquareB_font.css` (CSS only — binaries not included; see Caveats).
- **Spec brief:** layout/grid, radius, elevation, type scale, buttons, components, motion and accessibility — encoded into token files.
- **Mosmos World (Notion):** `용어집` (canonical terms), `브랜드 포지셔닝` (message house), `브랜드 페르소나` (voice/tone), `언어 전략` (register guide). This readme derives from these.

---

## Content fundamentals

**Language.** Primary copy is **Korean** (해요체 — warm polite). English tagline/slogan appear as secondary layer.

**Voice.** Lead with the result and reassurance. Mos is an orchestrator — it talks directly but delegates execution. Tone: 차분 · 실용 · 절제 · 정직, 살짝 친근. Speak in verifiable results and concrete processes, not adjectives. One worldview term per screen at first appearance.

**Person.** Speaks to **당신/you**; the AI is **Mos**; user's instance is **나의 Mos**. Gender-neutral throughout.

**Tone words.** 다정한 · 함께 · 자라는 · 가볍게 · 안심. Calm, cozy, gently optimistic.

**Register** (단일 기준: 언어 전략). Cold/landing/PR → general language, gloss worldview terms on first use (e.g. "알아서 맡겨주는 내 AI, **Mos**"). In-app → worldview language. Internal/engineering/due-diligence → technical language. Technical terms (SubAgent, MCP, Tool Runtime, model/provider names) are internal-only.

**Casing.** Wordmark always lowercase **mosmos**. Korean headlines carry no terminal punctuation; body copy sentences do. English is sentence case. Emoji are not used in product or marketing copy.

---

## Visual foundations

**Color.** Core Blue `#0F6FDA` is the primary action color. Classic `#568BD8` and Light `#9CBDE9` blues form the **brand gradient** (135°, Core→Light) — used on the symbol, hero glows, and accent tiles. Pop Purple `#9B6EEF` secondary; Bright Cyan `#00A0A3` accent. Neutrals: Clear White `#F7F8F9`, Blue Black `#1D2026`. Text ramp: `#1D2026 → #4F555F → #666E7A → #AAB4C2`. Status: `--status-success` Clean Green · `--status-error` Coral Red · `--status-warning` Dark Orange · `--status-info` Pure Blue. Light + dark themes via `[data-theme="dark"]`. See `tokens/colors.css`.

**Type.** Display/headings = **NanumSquare Bold**. Body/UI = **Pretendard Variable**. Mono = system only. Scale: Display 64 / H1 40 / H2 32 / H3 24 / Subtitle 20 / Body 16 / Caption 13. Mobile scales display/H1 down \~20%. See `tokens/typography.css`.

**Spacing & layout.** 4px base unit; xs 4 → 5xl 128. 12-column grid, 24px gutter (16 mobile). Max content 1200, wide/hero 1440, reading 720. Section vertical padding 96–128 desktop / 64 tablet / 48 mobile. See `tokens/spacing.css`.

**Radius.** sm 8 (inputs/chips) · md 12 (buttons/small cards) · lg 16 (cards/panels/modals) · xl 24 (hero/feature blocks) · pill 999 (buttons/badges/avatars).

**Elevation.** e1 card · e2 raised · e3 modal. Dark mode lowers shadow opacity, leans on Dark Border tokens.

**Cards.** White surface, `radius-lg` (16), `border-subtle` 1px, `e1` shadow. Feature cards add a tinted accent tile behind the icon and lift to `e2` on hover.

**Backgrounds.** Sky gradient (`#EAF2FC → #F7F8F9`) + blurred radial Core-Blue glow + translucent blob symbol. Used on heroes and CTAs.

**Character · Mos.** Art for **Mos** — the Patron's Super-Generalist companion agent. Six transparent PNGs in `assets/character/`: `mos-greeting`, `mos-happy`, `mos-curious`, `mos-working`, `mos-resting`, `mos-sleeping`. Match pose to moment: greeting → onboarding/welcome, happy → success, curious → questions/empty states, working → loading/progress, resting → idle, sleeping → inactive/night. Use on light surfaces (Clear White, Sky gradient), original proportions, min 48px, hero 160–280px.

> 위 포즈들은 대표 샘플 — Mos는 표정·상황에 따라 추가 포즈가 존재할 수 있습니다.

**Character · Mon.** Art for **Mon** — Deep-Specialist agents Mos delegates to, shown by domain. Three transparent PNGs in `assets/character/`:

- `mon-design.png` — Pink Mon. Creation, design, content contexts.
- `mon-organize.png` — Green Mon. Organization, scheduling, categorization.
- `mon-research.png` — Purple Mon. Research, analysis, learning. Same placement rules as Mos: light surfaces, original proportions, min 48px. One Mon per screen.

> 위 3종은 대표 샘플 — Mon도 역할·감정에 따라 추가 포즈가 존재할 수 있습니다.

**Imagery.** Cool, soft, pastel-blue. Rounded organic shapes (the Mos blob). Character art is gender-neutral and friendly.

**Motion.** 150–250ms `cubic-bezier(.22,1,.36,1)` for hover/focus; gentle fade/slide-up on scroll reveal. Respects `prefers-reduced-motion`.

**Interaction states.** Hover: primary/secondary darken \~8%; outline/ghost get a Core-Blue 7% wash; cards lift to `e2`. Press: 0.5px nudge down. Focus: 2px Core-Blue ring (`--shadow-focus`). Disabled: 40% opacity, no shadow.

**Borders.** Hairline borders use Light/Dark Border tokens (subtle → default → strong). Navbar gains saturated 12px blur after scroll. Min tap target 44×44; body text meets WCAG AA.

---

## Iconography

Uses **Lucide** (CDN: `https://unpkg.com/lucide@0.453.0/dist/umd/lucide.min.js`) via `icon-lucide.jsx`. Default stroke-width 2, rounded caps/joins. Renders with `currentColor`. If a bespoke Mosmos icon set is commissioned, drop SVGs into `assets/icons/` and swap the wrapper.

---

## Logos

Four lockups in three color treatments — full-color (brand gradient), mono black (`#1D2026`), mono white (`#F7F8F9`):

- **Horizontal Signature** (`mosmos-horizontal-*`) — primary lockup; navbars, footers, wide horizontal spaces.
- **Vertical Signature** (`mosmos-vertical-*`) — center-aligned; posters, covers, thumbnails.
- **Symbol** (`mosmos-symbol-*`) — mark alone; compact spaces, avatars.
- **Wordmark / Text** (`mosmos-text-*`) — logotype only; pair with symbol by default; standalone only in exceptional editorial contexts. Always lowercase.

---

## Index

**Global entry**

- `styles.css` — the one file consumers link. `@import`s token + base layer.

**Tokens** (`tokens/`)

- `fonts.css` — `@font-face` for Pretendard Variable + NanumSquare (CDN).
- `colors.css` — base palette, semantic aliases, light + dark themes.
- `typography.css` — families, weights, type scale, helper classes.
- `spacing.css` — spacing, radius, elevation, layout, control heights, motion.
- `base.css` — element resets / global defaults.

**Components** (`components/`) — React primitives bundled to `window.MosmosDesignSystem_53320b`:

- `forms/` — **Button** (primary/secondary/outline/ghost · sm/md/lg · pill · icons), **Input** (label/helper/error/success), **Switch**.
- `display/` — **Card** (feature + plain), **Badge** (tones · soft/solid/outline), **Avatar** (gradient-initials, brand ring).

**Guidelines** (`guidelines/`) — foundation specimen cards in the Design System tab (Colors, Type, Spacing, Brand).

**Assets**

- `assets/logos/` — brand logo SVGs.
- `assets/character/` — character art, transparent PNGs:
  - **Mos** — 6 expression poses. Sample set.
  - **Mon** — 3 role variants (design/pink, organize/green, research/purple). Sample set.

Starting points: **Button, Card, Avatar, Badge.**

---

## Caveats

- ⚠️ **Fonts are CDN-served.** `tokens/fonts.css` points Pretendard Variable and NanumSquare at jsDelivr. Upload `.woff2` files to self-host for production.
- See `SKILL.md` to use this system inside Claude Code.
