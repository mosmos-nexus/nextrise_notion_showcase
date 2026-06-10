# Waitlist Page — UI Kit

Focused sign-up page — one field, one clear CTA. Two-column: brand story +
benefits on the left, capture form on the right, with a success state.

## Files
- `index.html` — entry. Loads `styles.css`, React + Babel, Lucide, `_ds_bundle.js`, then the app.
- `icon-lucide.jsx` — Lucide icon wrapper.
- `WaitlistApp.jsx` — the whole page: email `Input` with validation (Coral Red error,
  Clean Green success), optional role chips, primary CTA, social proof, and the
  post-submit confirmation screen.

## Notes
- Email validation is client-side demo only.
- One CTA per the brand rule; success swaps the form for a confirmation, not a toast.
- Icons are **Lucide** (CDN) — flagged substitution (no brand icon set).
