/* @ds-bundle: {"format":3,"namespace":"MosmosDesignSystem_53320b","components":[{"name":"Avatar","sourcePath":"components/display/Avatar.jsx"},{"name":"Badge","sourcePath":"components/display/Badge.jsx"},{"name":"Card","sourcePath":"components/display/Card.jsx"},{"name":"Button","sourcePath":"components/forms/Button.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"}],"sourceHashes":{"components/display/Avatar.jsx":"2575dd308526","components/display/Badge.jsx":"bf2ec8e3a3c8","components/display/Card.jsx":"8db214f0d5f3","components/forms/Button.jsx":"3af13e9056da","components/forms/Input.jsx":"d4102e5ffa04","components/forms/Switch.jsx":"156a2066e609"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.MosmosDesignSystem_53320b = window.MosmosDesignSystem_53320b || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/display/Avatar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// Mosmos avatar — character / user frame. Gradient ring marks a "Mos" companion.
function Avatar({
  src,
  name = "",
  size = 48,
  shape = "circle",
  // circle | rounded | pill
  ring = false,
  // gradient ring (Mos companion frame)
  style,
  ...rest
}) {
  const radius = shape === "rounded" ? "var(--radius-md)" : shape === "pill" ? "var(--radius-pill)" : "50%";
  const initials = name.trim().split(/\s+/).slice(0, 2).map(w => w[0]).join("").toUpperCase();
  const inner = /*#__PURE__*/React.createElement("div", {
    style: {
      width: size,
      height: size,
      flex: "none",
      borderRadius: radius,
      overflow: "hidden",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: src ? "var(--surface-subtle)" : "var(--gradient-brand)",
      color: "#fff",
      fontFamily: "var(--font-display)",
      fontWeight: 700,
      fontSize: Math.round(size * 0.4)
    }
  }, src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: name,
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover"
    }
  }) : initials || "M");
  if (!ring) return React.cloneElement(inner, {
    style: {
      ...inner.props.style,
      ...style
    },
    ...rest
  });
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: "inline-flex",
      padding: 2,
      borderRadius: shape === "rounded" ? "calc(var(--radius-md) + 3px)" : radius,
      background: "var(--gradient-brand)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 2,
      borderRadius: "inherit",
      background: "var(--surface-card)"
    }
  }, inner));
}
Object.assign(__ds_scope, { Avatar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/display/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// Mosmos badge — small pill label. Solid or soft, status-aware.
function Badge({
  children,
  tone = "neutral",
  // neutral | primary | secondary | accent | success | warning | error | info
  variant = "soft",
  // soft | solid | outline
  size = "md",
  // sm | md
  dot = false,
  style,
  ...rest
}) {
  const tones = {
    neutral: {
      c: "var(--text-muted)",
      s: "var(--blue-gray-medium)"
    },
    primary: {
      c: "var(--blue-core)",
      s: "var(--blue-core)"
    },
    secondary: {
      c: "var(--purple-pop)",
      s: "var(--purple-pop)"
    },
    accent: {
      c: "var(--cyan-bright)",
      s: "var(--cyan-bright)"
    },
    success: {
      c: "var(--status-success)",
      s: "var(--status-success)"
    },
    warning: {
      c: "var(--status-warning)",
      s: "var(--status-warning)"
    },
    error: {
      c: "var(--status-error)",
      s: "var(--status-error)"
    },
    info: {
      c: "var(--status-info)",
      s: "var(--status-info)"
    }
  };
  const t = tones[tone] || tones.neutral;
  let bg, color, border;
  if (variant === "solid") {
    bg = t.s;
    color = "#fff";
    border = "1px solid transparent";
    if (tone === "neutral") {
      bg = "var(--blue-black)";
    }
  } else if (variant === "outline") {
    bg = "transparent";
    color = t.c;
    border = `1px solid ${t.c}`;
  } else {
    // soft
    bg = `color-mix(in srgb, ${t.s} 14%, transparent)`;
    color = t.c;
    border = "1px solid transparent";
  }
  const dims = size === "sm" ? {
    padding: "2px 8px",
    font: "11px",
    gap: "5px",
    ds: 5
  } : {
    padding: "4px 12px",
    font: "13px",
    gap: "6px",
    ds: 6
  };
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: dims.gap,
      padding: dims.padding,
      fontFamily: "var(--font-body)",
      fontSize: dims.font,
      fontWeight: 600,
      lineHeight: 1.2,
      color,
      background: bg,
      border,
      borderRadius: "var(--radius-pill)",
      whiteSpace: "nowrap",
      ...style
    }
  }, rest), dot ? /*#__PURE__*/React.createElement("span", {
    style: {
      width: dims.ds,
      height: dims.ds,
      borderRadius: "50%",
      background: t.s,
      flex: "none"
    }
  }) : null, children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/Badge.jsx", error: String((e && e.message) || e) }); }

// components/display/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// Mosmos card — soft, cozy container. Feature-card and plain surface variants.
function Card({
  children,
  icon,
  title,
  description,
  accent = "blue",
  // blue | purple | cyan | none
  elevation = "e1",
  // e1 | e2 | e3 | flat
  interactive = false,
  padding = "var(--space-lg)",
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const accents = {
    blue: {
      fg: "var(--blue-core)",
      bg: "rgba(15,111,218,0.10)"
    },
    purple: {
      fg: "var(--purple-pop)",
      bg: "rgba(155,110,239,0.12)"
    },
    cyan: {
      fg: "var(--cyan-bright)",
      bg: "rgba(0,160,163,0.12)"
    },
    none: null
  };
  const a = accents[accent];
  const shadows = {
    e1: "var(--shadow-e1)",
    e2: "var(--shadow-e2)",
    e3: "var(--shadow-e3)",
    flat: "none"
  };
  const isFeature = icon || title || description;
  return /*#__PURE__*/React.createElement("div", _extends({
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      background: "var(--surface-card)",
      border: "1px solid var(--border-subtle)",
      borderRadius: "var(--radius-lg)",
      boxShadow: interactive && hover ? "var(--shadow-e2)" : shadows[elevation],
      padding,
      transform: interactive && hover ? "translateY(-2px)" : "none",
      transition: "box-shadow var(--dur-base) var(--ease-out), transform var(--dur-base) var(--ease-out)",
      cursor: interactive ? "pointer" : "default",
      ...style
    }
  }, rest), isFeature ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "12px"
    }
  }, icon && a ? /*#__PURE__*/React.createElement("div", {
    style: {
      width: 48,
      height: 48,
      flex: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "var(--radius-md)",
      background: a.bg,
      color: a.fg
    }
  }, icon) : icon ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      color: "var(--text-strong)"
    }
  }, icon) : null, title ? /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 700,
      fontSize: "var(--fs-h3)",
      lineHeight: "var(--lh-h3)",
      color: "var(--text-strong)",
      margin: 0
    }
  }, title) : null, description ? /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-body)",
      fontSize: "var(--fs-body)",
      lineHeight: "var(--lh-body)",
      color: "var(--text-muted)",
      margin: 0
    }
  }, description) : null, children) : children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/Card.jsx", error: String((e && e.message) || e) }); }

// components/forms/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// figma node: derived from Mosmos button spec
function Button({
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
    sm: {
      height: "var(--control-sm)",
      padding: "0 16px",
      font: "14px"
    },
    md: {
      height: "var(--control-md)",
      padding: "0 24px",
      font: "16px"
    },
    lg: {
      height: "var(--control-lg)",
      padding: "0 32px",
      font: "17px"
    }
  };
  const variants = {
    primary: {
      background: "var(--color-primary)",
      color: "var(--color-on-primary)",
      border: "1px solid transparent",
      boxShadow: "var(--shadow-e1)"
    },
    secondary: {
      background: "var(--color-secondary)",
      color: "var(--color-on-primary)",
      border: "1px solid transparent",
      boxShadow: "var(--shadow-e1)"
    },
    outline: {
      background: "transparent",
      color: "var(--color-primary)",
      border: "1px solid var(--border-strong)"
    },
    ghost: {
      background: "transparent",
      color: "var(--color-primary)",
      border: "1px solid transparent"
    }
  };
  const s = sizes[size] || sizes.md;
  const v = variants[variant] || variants.primary;
  const [hover, setHover] = React.useState(false);
  const [active, setActive] = React.useState(false);
  let bg = v.background;
  if (!disabled && (variant === "primary" || variant === "secondary")) {
    if (active) bg = variant === "primary" ? "var(--color-primary-active)" : "var(--color-secondary-hover)";else if (hover) bg = variant === "primary" ? "var(--color-primary-hover)" : "var(--color-secondary-hover)";
  }
  const subtleBg = (variant === "outline" || variant === "ghost") && hover && !disabled ? "rgba(15,111,218,0.07)" : v.background;
  return /*#__PURE__*/React.createElement("button", _extends({
    type: type,
    disabled: disabled,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setActive(false);
    },
    onMouseDown: () => setActive(true),
    onMouseUp: () => setActive(false),
    style: {
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
      ...style
    }
  }, rest), leftIcon ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex"
    }
  }, leftIcon) : null, children, rightIcon ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex"
    }
  }, rightIcon) : null);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Button.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// Mosmos text input — label + field + helper, with status states
function Input({
  label,
  type = "text",
  placeholder,
  value,
  defaultValue,
  onChange,
  helper,
  status = "default",
  // default | error | success
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
  const heights = {
    sm: "var(--control-sm)",
    md: "var(--control-md)",
    lg: "var(--control-lg)"
  };
  const statusColor = status === "error" ? "var(--status-error)" : status === "success" ? "var(--status-success)" : null;
  const borderColor = statusColor ? statusColor : focus ? "var(--color-primary)" : "var(--border-default)";
  const helperColor = statusColor || "var(--text-muted)";
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "6px",
      width: "100%",
      ...style
    }
  }, label ? /*#__PURE__*/React.createElement("label", {
    htmlFor: fieldId,
    style: {
      fontFamily: "var(--font-body)",
      fontSize: "14px",
      fontWeight: 500,
      color: "var(--text-strong)"
    }
  }, label) : null, /*#__PURE__*/React.createElement("div", {
    style: {
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
      opacity: disabled ? 0.5 : 1
    }
  }, leftIcon ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      color: "var(--text-faint)"
    }
  }, leftIcon) : null, /*#__PURE__*/React.createElement("input", _extends({
    id: fieldId,
    type: type,
    placeholder: placeholder,
    value: value,
    defaultValue: defaultValue,
    onChange: onChange,
    disabled: disabled,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      flex: 1,
      minWidth: 0,
      border: "none",
      outline: "none",
      background: "transparent",
      fontFamily: "var(--font-body)",
      fontSize: "16px",
      color: "var(--text-body)"
    }
  }, rest))), helper ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-body)",
      fontSize: "13px",
      lineHeight: 1.5,
      color: helperColor
    }
  }, helper) : null);
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// Mosmos toggle switch — gentle, pill-shaped (e.g. theme / setting toggle)
function Switch({
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
  const dims = size === "sm" ? {
    w: 36,
    h: 20,
    k: 14
  } : {
    w: 46,
    h: 26,
    k: 20
  };
  function toggle() {
    if (disabled) return;
    if (!isControlled) setInternal(!on);
    onChange && onChange(!on);
  }
  const control = /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    role: "switch",
    id: fieldId,
    "aria-checked": on,
    disabled: disabled,
    onClick: toggle,
    style: {
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
      transition: "background var(--dur-base) var(--ease-out)"
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      top: (dims.h - dims.k) / 2,
      left: on ? dims.w - dims.k - (dims.h - dims.k) / 2 : (dims.h - dims.k) / 2,
      width: dims.k,
      height: dims.k,
      borderRadius: "var(--radius-pill)",
      background: "#fff",
      boxShadow: "var(--shadow-e1)",
      transition: "left var(--dur-base) var(--ease-out)"
    }
  }));
  if (!label) return /*#__PURE__*/React.createElement("span", {
    style: style
  }, control);
  return /*#__PURE__*/React.createElement("label", {
    htmlFor: fieldId,
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "10px",
      cursor: disabled ? "not-allowed" : "pointer",
      ...style
    }
  }, control, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-body)",
      fontSize: "15px",
      color: "var(--text-body)"
    }
  }, label));
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Switch = __ds_scope.Switch;

})();
