// Mosmos badge — small pill label. Solid or soft, status-aware.
export function Badge({
  children,
  tone = "neutral", // neutral | primary | secondary | accent | success | warning | error | info
  variant = "soft", // soft | solid | outline
  size = "md", // sm | md
  dot = false,
  style,
  ...rest
}) {
  const tones = {
    neutral:   { c: "var(--text-muted)",      s: "var(--blue-gray-medium)" },
    primary:   { c: "var(--blue-core)",       s: "var(--blue-core)" },
    secondary: { c: "var(--purple-pop)",      s: "var(--purple-pop)" },
    accent:    { c: "var(--cyan-bright)",     s: "var(--cyan-bright)" },
    success:   { c: "var(--status-success)",  s: "var(--status-success)" },
    warning:   { c: "var(--status-warning)",  s: "var(--status-warning)" },
    error:     { c: "var(--status-error)",    s: "var(--status-error)" },
    info:      { c: "var(--status-info)",     s: "var(--status-info)" },
  };
  const t = tones[tone] || tones.neutral;

  let bg, color, border;
  if (variant === "solid") {
    bg = t.s; color = "#fff"; border = "1px solid transparent";
    if (tone === "neutral") { bg = "var(--blue-black)"; }
  } else if (variant === "outline") {
    bg = "transparent"; color = t.c; border = `1px solid ${t.c}`;
  } else { // soft
    bg = `color-mix(in srgb, ${t.s} 14%, transparent)`;
    color = t.c; border = "1px solid transparent";
  }

  const dims = size === "sm"
    ? { padding: "2px 8px", font: "11px", gap: "5px", ds: 5 }
    : { padding: "4px 12px", font: "13px", gap: "6px", ds: 6 };

  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: dims.gap,
      padding: dims.padding,
      fontFamily: "var(--font-body)", fontSize: dims.font, fontWeight: 600,
      lineHeight: 1.2, color,
      background: bg, border,
      borderRadius: "var(--radius-pill)",
      whiteSpace: "nowrap",
      ...style,
    }} {...rest}>
      {dot ? <span style={{ width: dims.ds, height: dims.ds, borderRadius: "50%", background: t.s, flex: "none" }} /> : null}
      {children}
    </span>
  );
}
export default Badge;
