// Icon — renders a Lucide icon imperatively (no React reconciliation conflict).
// Lucide is a CDN substitute: Mosmos ships no icon set. Stroke-based, rounded —
// matches the cozy, friendly brand mood. Flagged in README → ICONOGRAPHY.
function Icon({ name, size = 24, stroke = 2, className, style }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const el = ref.current;
    if (!el || !window.lucide) return;
    el.innerHTML = "";
    const i = document.createElement("i");
    i.setAttribute("data-lucide", name);
    el.appendChild(i);
    try {
      window.lucide.createIcons({
        attrs: { "stroke-width": stroke, width: "100%", height: "100%" },
        nameAttr: "data-lucide",
      });
    } catch (e) {}
  }, [name, size, stroke]);
  return (
    <span
      ref={ref}
      className={className}
      style={{ display: "inline-flex", width: size, height: size, flex: "none", ...style }}
    />
  );
}
window.Icon = Icon;
