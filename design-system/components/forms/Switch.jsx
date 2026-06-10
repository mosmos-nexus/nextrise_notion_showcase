// Mosmos toggle switch — gentle, pill-shaped (e.g. theme / setting toggle)
export function Switch({
  checked,
  defaultChecked = false,
  onChange,
  disabled = false,
  size = "md",
  label,
  id,
  style,
  ...rest
}) {
  const isControlled = checked !== undefined;
  const [internal, setInternal] = React.useState(defaultChecked);
  const on = isControlled ? checked : internal;
  const autoId = React.useId();
  const fieldId = id || autoId;

  const dims = size === "sm"
    ? { w: 36, h: 20, k: 14 }
    : { w: 46, h: 26, k: 20 };

  function toggle() {
    if (disabled) return;
    if (!isControlled) setInternal(!on);
    onChange && onChange(!on);
  }

  const control = (
    <button
      type="button"
      role="switch"
      id={fieldId}
      aria-checked={on}
      disabled={disabled}
      onClick={toggle}
      style={{
        position: "relative",
        width: dims.w,
        height: dims.h,
        flex: "none",
        border: "none",
        padding: 0,
        borderRadius: "var(--radius-pill)",
        background: on ? "var(--color-primary)" : "var(--border-strong)",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.4 : 1,
        transition: "background var(--dur-base) var(--ease-out)",
      }}
      {...rest}
    >
      <span style={{
        position: "absolute",
        top: (dims.h - dims.k) / 2,
        left: on ? dims.w - dims.k - (dims.h - dims.k) / 2 : (dims.h - dims.k) / 2,
        width: dims.k,
        height: dims.k,
        borderRadius: "var(--radius-pill)",
        background: "#fff",
        boxShadow: "var(--shadow-e1)",
        transition: "left var(--dur-base) var(--ease-out)",
      }} />
    </button>
  );

  if (!label) return <span style={style}>{control}</span>;
  return (
    <label htmlFor={fieldId} style={{
      display: "inline-flex", alignItems: "center", gap: "10px",
      cursor: disabled ? "not-allowed" : "pointer", ...style,
    }}>
      {control}
      <span style={{ fontFamily: "var(--font-body)", fontSize: "15px", color: "var(--text-body)" }}>{label}</span>
    </label>
  );
}
export default Switch;
