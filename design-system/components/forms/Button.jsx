// figma node: derived from Mosmos button spec
export function Button({
  children,
  variant = "primary",
  size = "md",
  disabled = false,
  fullWidth = false,
  pill = false,
  leftIcon,
  rightIcon,
  type = "button",
  onClick,
  style,
  ...rest
}) {
  const sizes = {
    sm: { height: "var(--control-sm)", padding: "0 16px", font: "14px" },
    md: { height: "var(--control-md)", padding: "0 24px", font: "16px" },
    lg: { height: "var(--control-lg)", padding: "0 32px", font: "17px" },
  };
  const variants = {
    primary: {
      background: "var(--color-primary)",
      color: "var(--color-on-primary)",
      border: "1px solid transparent",
      boxShadow: "var(--shadow-e1)",
    },
    secondary: {
      background: "var(--color-secondary)",
      color: "var(--color-on-primary)",
      border: "1px solid transparent",
      boxShadow: "var(--shadow-e1)",
    },
    outline: {
      background: "transparent",
      color: "var(--color-primary)",
      border: "1px solid var(--border-strong)",
    },
    ghost: {
      background: "transparent",
      color: "var(--color-primary)",
      border: "1px solid transparent",
    },
  };
  const s = sizes[size] || sizes.md;
  const v = variants[variant] || variants.primary;

  const [hover, setHover] = React.useState(false);
  const [active, setActive] = React.useState(false);

  let bg = v.background;
  if (!disabled && (variant === "primary" || variant === "secondary")) {
    if (active) bg = variant === "primary" ? "var(--color-primary-active)" : "var(--color-secondary-hover)";
    else if (hover) bg = variant === "primary" ? "var(--color-primary-hover)" : "var(--color-secondary-hover)";
  }
  const subtleBg = (variant === "outline" || variant === "ghost") && hover && !disabled
    ? "rgba(15,111,218,0.07)" : v.background;

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setActive(false); }}
      onMouseDown={() => setActive(true)}
      onMouseUp={() => setActive(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
        width: fullWidth ? "100%" : "auto",
        height: s.height,
        padding: s.padding,
        fontFamily: "var(--font-body)",
        fontSize: s.font,
        fontWeight: 600,
        lineHeight: 1,
        color: v.color,
        background: variant === "primary" || variant === "secondary" ? bg : subtleBg,
        border: v.border,
        borderRadius: pill ? "var(--radius-pill)" : "var(--radius-md)",
        boxShadow: v.boxShadow || "none",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.4 : 1,
        transform: active && !disabled ? "translateY(0.5px)" : "none",
        transition: "background var(--dur-base) var(--ease-out), transform var(--dur-fast) var(--ease-out)",
        whiteSpace: "nowrap",
        ...style,
      }}
      {...rest}
    >
      {leftIcon ? <span style={{ display: "inline-flex" }}>{leftIcon}</span> : null}
      {children}
      {rightIcon ? <span style={{ display: "inline-flex" }}>{rightIcon}</span> : null}
    </button>
  );
}
export default Button;
