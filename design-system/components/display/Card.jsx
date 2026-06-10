// Mosmos card — soft, cozy container. Feature-card and plain surface variants.
export function Card({
  children,
  icon,
  title,
  description,
  accent = "blue", // blue | purple | cyan | none
  elevation = "e1", // e1 | e2 | e3 | flat
  interactive = false,
  padding = "var(--space-lg)",
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);

  const accents = {
    blue: { fg: "var(--blue-core)", bg: "rgba(15,111,218,0.10)" },
    purple: { fg: "var(--purple-pop)", bg: "rgba(155,110,239,0.12)" },
    cyan: { fg: "var(--cyan-bright)", bg: "rgba(0,160,163,0.12)" },
    none: null,
  };
  const a = accents[accent];
  const shadows = {
    e1: "var(--shadow-e1)", e2: "var(--shadow-e2)", e3: "var(--shadow-e3)", flat: "none",
  };

  const isFeature = icon || title || description;

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: "var(--surface-card)",
        border: "1px solid var(--border-subtle)",
        borderRadius: "var(--radius-lg)",
        boxShadow: interactive && hover ? "var(--shadow-e2)" : shadows[elevation],
        padding,
        transform: interactive && hover ? "translateY(-2px)" : "none",
        transition: "box-shadow var(--dur-base) var(--ease-out), transform var(--dur-base) var(--ease-out)",
        cursor: interactive ? "pointer" : "default",
        ...style,
      }}
      {...rest}
    >
      {isFeature ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {icon && a ? (
            <div style={{
              width: 48, height: 48, flex: "none",
              display: "flex", alignItems: "center", justifyContent: "center",
              borderRadius: "var(--radius-md)",
              background: a.bg, color: a.fg,
            }}>{icon}</div>
          ) : icon ? (
            <div style={{ display: "flex", color: "var(--text-strong)" }}>{icon}</div>
          ) : null}
          {title ? (
            <h3 style={{
              fontFamily: "var(--font-display)", fontWeight: 700,
              fontSize: "var(--fs-h3)", lineHeight: "var(--lh-h3)",
              color: "var(--text-strong)", margin: 0,
            }}>{title}</h3>
          ) : null}
          {description ? (
            <p style={{
              fontFamily: "var(--font-body)", fontSize: "var(--fs-body)",
              lineHeight: "var(--lh-body)", color: "var(--text-muted)", margin: 0,
            }}>{description}</p>
          ) : null}
          {children}
        </div>
      ) : children}
    </div>
  );
}
export default Card;
