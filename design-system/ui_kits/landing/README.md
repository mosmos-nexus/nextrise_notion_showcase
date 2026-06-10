# Landing Page — UI Kit

Mosmos marketing home. A full click-through recreation that composes the
design-system primitives (`Button`, `Input`, `Switch`, `Card`, `Badge`, `Avatar`)
from the compiled bundle.

## Files
- `index.html` — entry. Loads `styles.css`, React + Babel, Lucide (CDN icons),
  the `_ds_bundle.js`, then the screen partials below.
- `icon-lucide.jsx` — Lucide icon wrapper (renders imperatively to avoid React/Lucide DOM conflicts).
- `LandingNav.jsx` — sticky nav, transparent over hero → solid + blur on scroll. Theme toggle.
- `LandingHero.jsx` — display tagline, slogan, CTAs, "goal → Mos → result" companion visual.
- `LandingSections.jsx` — How-it-works (3 steps), Features grid, dark Stat band, Waitlist CTA, Footer.
- `LandingApp.jsx` — composition + light/dark theme state (`data-theme` on `<html>`).

## Notes
- Sections are plain functions exposed on `window` so each `<script type="text/babel">`
  partial can reach them (Babel gives every script its own scope).
- Icons are **Lucide** (CDN) — Mosmos ships no icon set; this is a flagged substitution.
- Dark mode is wired via the navbar Switch for demonstration.
