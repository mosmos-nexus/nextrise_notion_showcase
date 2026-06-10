// Mosmos text input — label + field + helper, with status states
export function Input({
  label,
  type = "text",
  placeholder,
  value,
  defaultValue,
  onChange,
  helper,
  status = "default", // default | error | success
  size = "md",
  disabled = false,
  id,
  leftIcon,
  style,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const autoId = React.useId();
  const fieldId = id || autoId;

  const heights = { sm: "var(--control-sm)", md: "var(--control-md)", lg: "var(--control-lg)" };

  const statusColor =
    status === "error" ? "var(--status-error)" :
    status === "success" ? "var(--status-success)" : null;

  const borderColor = statusColor
    ? statusColor
    : focus ? "var(--color-primary)" : "var(--border-default)";

  const helperColor = statusColor || "var(--text-muted)";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px", width: "100%", ...style }}>
      {label ? (
        <label htmlFor={fieldId} style={{
          fontFamily: "var(--font-body)",
          fontSize: "14px",
          fontWeight: 500,
          color: "var(--text-strong)",
        }}>{label}</label>
      ) : null}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        height: heights[size] || heights.md,
        padding: "0 14px",
        background: disabled ? "var(--surface-subtle)" : "var(--surface-card)",
        border: `1px solid ${borderColor}`,
        borderRadius: "var(--radius-sm)",
        boxShadow: focus && !statusColor ? "var(--shadow-focus)" : "none",
        transition: "border-color var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out)",
        opacity: disabled ? 0.5 : 1,
      }}>
        {leftIcon ? <span style={{ display: "inline-flex", color: "var(--text-faint)" }}>{leftIcon}</span> : null}
        <input
          id={fieldId}
          type={type}
          placeholder={placeholder}
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          disabled={disabled}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          style={{
            flex: 1,
            minWidth: 0,
            border: "none",
            outline: "none",
            background: "transparent",
            fontFamily: "var(--font-body)",
            fontSize: "16px",
            color: "var(--text-body)",
          }}
          {...rest}
        />
      </div>
      {helper ? (
        <span style={{ fontFamily: "var(--font-body)", fontSize: "13px", lineHeight: 1.5, color: helperColor }}>{helper}</span>
      ) : null}
    </div>
  );
}
export default Input;
