# Handoff: team-plan → team-exec

- **Decided**: Plan = `.omc/plans/nextrise-v2-spec-compliance.md` (ralplan consensus: Architect SOUND, Critic APPROVE). 3 workers: worker-assets (WP0, tasks #1-2), worker-builder (WP1-8, tasks #3-7 sequential — single-file ownership of index.html), worker-verify (WP9, task #8). CL-1 downscale APPROVED by presenter. Live URLs confirmed: 중헌아카이브 https://www.hon2yt2ch.kr/ · Proact0 https://www.proact0.org/ · mosmos.world. DEVIATION from plan A5: orbit-progress jump targets derived DYNAMICALLY from data-section (not hardcoded indices) — removes renumber fragility.
- **Rejected**: Parallel slide-builders (single-file merge hell); native TeamCreate teammates (tools not exposed in session — lead-coordinated background agents + shared TaskList instead).
- **Risks**: iframe XFO block (verdict pending worker-assets probe → .omc/handoffs/wp0-assets.md); engine refactor regression on s0 bloom; canvas-behind-slides stacking (builder must verify visually).
- **Files**: index.html (builder only), deck-assets/ (assets worker), /tmp/pwshot/ (scripts), .omc/handoffs/.
- **Remaining**: WP4-8 waves after #3 completes; WP9 verify; then ralph-led polish loop (user-directed handover), architect verification, /oh-my-claudecode:cancel.
