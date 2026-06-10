// Mosmos avatar — character / user frame. Gradient ring marks a "Mos" companion.
export function Avatar({
  src,
  name = "",
  size = 48,
  shape = "circle", // circle | rounded | pill
  ring = false, // gradient ring (Mos companion frame)
  style,
  ...rest
}) {
  const radius =
    shape === "rounded" ? "var(--radius-md)" :
    shape === "pill" ? "var(--radius-pill)" : "50%";

  const initials = name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  const inner = (
    <div style={{
      width: size, height: size, flex: "none",
      borderRadius: radius,
      overflow: "hidden",
      display: "flex", alignItems: "center", justifyContent: "center",
      background: src ? "var(--surface-subtle)" : "var(--gradient-brand)",
      color: "#fff",
      fontFamily: "var(--font-display)", fontWeight: 700,
      fontSize: Math.round(size * 0.4),
    }}>
      {src ? (
        <img src={src} alt={name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      ) : (initials || "M")}
    </div>
  );

  if (!ring) return React.cloneElement(inner, { style: { ...inner.props.style, ...style }, ...rest });

  return (
    <div style={{
      display: "inline-flex", padding: 2,
      borderRadius: shape === "rounded" ? "calc(var(--radius-md) + 3px)" : radius,
      background: "var(--gradient-brand)",
      ...style,
    }} {...rest}>
      <div style={{ padding: 2, borderRadius: "inherit", background: "var(--surface-card)" }}>
        {inner}
      </div>
    </div>
  );
}
export default Avatar;
