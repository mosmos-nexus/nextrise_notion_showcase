/* @ds-bundle: {"format":3,"namespace":"MosmosDesignSystem_53320b","components":[{"name":"Avatar","sourcePath":"components/display/Avatar.jsx"},{"name":"Badge","sourcePath":"components/display/Badge.jsx"},{"name":"Card","sourcePath":"components/display/Card.jsx"},{"name":"Button","sourcePath":"components/forms/Button.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"}],"sourceHashes":{"components/display/Avatar.jsx":"2575dd308526","components/display/Badge.jsx":"bf2ec8e3a3c8","components/display/Card.jsx":"8db214f0d5f3","components/forms/Button.jsx":"3af13e9056da","components/forms/Input.jsx":"d4102e5ffa04","components/forms/Switch.jsx":"156a2066e609","ui_kits/landing/LandingApp.jsx":"8a13cfd90a37","ui_kits/landing/LandingHero.jsx":"515745a5f75a","ui_kits/landing/LandingNav.jsx":"40785e4bcb91","ui_kits/landing/LandingSections.jsx":"a012e4117f95","ui_kits/landing/icon-lucide.jsx":"5be87dd29c9e","ui_kits/waitlist/WaitlistApp.jsx":"8a8e88ade6c9","ui_kits/waitlist/icon-lucide.jsx":"5be87dd29c9e"},"inlinedExternals":[],"unexposedExports":[]} */

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

// ui_kits/landing/LandingApp.jsx
try { (() => {
// Landing page composition + theme state.
function LandingApp() {
  const [dark, setDark] = React.useState(false);
  React.useEffect(() => {
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
  }, [dark]);
  return /*#__PURE__*/React.createElement("div", {
    id: "landing-scroll"
  }, /*#__PURE__*/React.createElement(window.LandingNav, {
    dark: dark,
    onToggleTheme: setDark
  }), /*#__PURE__*/React.createElement(window.LandingHero, null), /*#__PURE__*/React.createElement(window.HowItWorks, null), /*#__PURE__*/React.createElement(window.Features, null), /*#__PURE__*/React.createElement(window.StatBand, null), /*#__PURE__*/React.createElement(window.WaitlistCTA, null), /*#__PURE__*/React.createElement(window.LandingFooter, {
    dark: dark
  }));
}
ReactDOM.createRoot(document.getElementById("root")).render(/*#__PURE__*/React.createElement(LandingApp, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/landing/LandingApp.jsx", error: String((e && e.message) || e) }); }

// ui_kits/landing/LandingHero.jsx
try { (() => {
// Landing hero — display tagline, slogan, CTAs, and a "goal → Mos → result" visual.
function LandingHero() {
  const {
    Button,
    Badge,
    Avatar
  } = window.MosmosDesignSystem_53320b;
  const Icon = window.Icon;
  return /*#__PURE__*/React.createElement("section", {
    style: {
      paddingTop: 56,
      paddingBottom: 96,
      background: "var(--gradient-sky)",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: -120,
      right: -80,
      width: 520,
      height: 520,
      background: "radial-gradient(circle, rgba(15,111,218,0.18), transparent 62%)",
      filter: "blur(8px)",
      pointerEvents: "none"
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "wrap",
    style: {
      position: "relative",
      display: "grid",
      gridTemplateColumns: "1.05fr 0.95fr",
      gap: 56,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Badge, {
    tone: "primary",
    variant: "soft",
    dot: true,
    style: {
      marginBottom: 24
    }
  }, "\uC0AC\uC804\uC2E0\uCCAD \uC9C4\uD589\uC911 \xB7 \uBCA0\uD0C0"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 700,
      fontSize: 60,
      lineHeight: 1.1,
      letterSpacing: "-0.02em",
      color: "var(--text-strong)",
      margin: "0 0 20px"
    }
  }, "\uB0B4 AI\uAC00", /*#__PURE__*/React.createElement("br", null), "\uC790\uB77C\uB294 \uC138\uACC4"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 20,
      lineHeight: 1.5,
      color: "var(--text-muted)",
      margin: "0 0 36px",
      maxWidth: 460
    }
  }, "\uBAA9\uD45C\uB9CC \uB9D0\uD558\uBA74, \uB2F9\uC2E0\uC758 AI \uC544\uBC14\uD0C0\uAC00 \uACB0\uACFC\uB97C \uAC00\uC838\uC635\uB2C8\uB2E4. \uC4F8\uC218\uB85D \uB2F9\uC2E0\uC744 \uB2EE\uC544\uAC00\uBA70 \uD568\uAED8 \uC790\uB77C\uB294 \uB2E4\uC815\uD55C \uC870\uB825\uC790."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 12,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    rightIcon: /*#__PURE__*/React.createElement(Icon, {
      name: "arrow-right",
      size: 18
    })
  }, "\uC0AC\uC804\uC2E0\uCCAD\uD558\uAE30"), /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    variant: "outline",
    leftIcon: /*#__PURE__*/React.createElement(Icon, {
      name: "play",
      size: 18
    })
  }, "\uC791\uB3D9 \uBC29\uC2DD \uBCF4\uAE30")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      marginTop: 32
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex"
    }
  }, ["민", "지", "다", "온"].map((n, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      marginLeft: i ? -10 : 0,
      border: "2px solid var(--surface-page)",
      borderRadius: "50%"
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: n,
    size: 32
  })))), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      color: "var(--text-muted)"
    }
  }, "\uC774\uBBF8 ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: "var(--text-strong)"
    }
  }, "2,400+"), " \uBA85\uC774 \uC790\uC2E0\uC758 Mos\uB97C \uAE30\uB2E4\uB9AC\uACE0 \uC788\uC5B4\uC694"))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      minHeight: 420
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: "8% 4%",
      borderRadius: "var(--radius-xl)",
      background: "var(--gradient-brand)",
      opacity: 0.12,
      filter: "blur(2px)"
    }
  }), /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logos/mosmos-symbol-gradient.svg",
    alt: "Mos",
    style: {
      position: "absolute",
      top: 0,
      right: 24,
      width: 132,
      filter: "drop-shadow(0 12px 28px rgba(15,111,218,0.28))"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: 40,
      left: 0,
      width: 300,
      background: "var(--surface-card)",
      borderRadius: "var(--radius-lg)",
      boxShadow: "var(--shadow-e3)",
      padding: 18,
      border: "1px solid var(--border-subtle)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: "var(--text-faint)",
      marginBottom: 6
    }
  }, "\uB098\uC758 \uBAA9\uD45C"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      color: "var(--text-strong)",
      fontWeight: 500
    }
  }, "\"\uB2E4\uC74C \uC8FC \uD300 \uC6CC\uD06C\uC20D \uC790\uB8CC \uB9CC\uB4E4\uC5B4 \uC918\"")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: 188,
      left: 40,
      width: 320,
      background: "var(--surface-card)",
      borderRadius: "var(--radius-lg)",
      boxShadow: "var(--shadow-e2)",
      padding: 18,
      border: "1px solid var(--border-subtle)",
      display: "flex",
      alignItems: "center",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: "Mos",
    size: 40,
    ring: true
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 600,
      color: "var(--text-strong)"
    }
  }, "Mos\uAC00 \uC6C0\uC9C1\uC774\uB294 \uC911\u2026"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: "var(--text-muted)"
    }
  }, "\uC790\uB8CC \uC870\uC0AC \xB7 \uCD08\uC548 \uC791\uC131 \xB7 \uC2AC\uB77C\uC774\uB4DC \uAD6C\uC131"))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      bottom: 8,
      right: 0,
      width: 250,
      background: "var(--blue-black)",
      color: "var(--clear-white)",
      borderRadius: "var(--radius-lg)",
      boxShadow: "var(--shadow-e3)",
      padding: "16px 18px",
      display: "flex",
      alignItems: "center",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 36,
      height: 36,
      borderRadius: "50%",
      flex: "none",
      background: "var(--status-success)",
      color: "#fff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 20
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 600
    }
  }, "\uC644\uB8CC\uB410\uC5B4\uC694"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      color: "var(--blue-gray-light)"
    }
  }, "\uC6CC\uD06C\uC20D_\uC790\uB8CC.pptx \xB7 14 slides"))))));
}
window.LandingHero = LandingHero;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/landing/LandingHero.jsx", error: String((e && e.message) || e) }); }

// ui_kits/landing/LandingNav.jsx
try { (() => {
// Landing navbar — transparent over hero, solid surface on scroll.
function LandingNav({
  dark,
  onToggleTheme
}) {
  const {
    Button,
    Switch
  } = window.MosmosDesignSystem_53320b;
  const Icon = window.Icon;
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const sc = document.getElementById("landing-scroll") || window;
    const onScroll = () => {
      const y = sc === window ? window.scrollY : sc.scrollTop;
      setScrolled(y > 24);
    };
    sc.addEventListener("scroll", onScroll);
    return () => sc.removeEventListener("scroll", onScroll);
  }, []);
  const logo = dark ? "../../assets/logos/mosmos-horizontal-white.svg" : "../../assets/logos/mosmos-horizontal-color.svg";
  const links = ["기능", "작동 방식", "이야기"];
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: "sticky",
      top: 0,
      zIndex: 50,
      background: scrolled ? "color-mix(in srgb, var(--surface-page) 88%, transparent)" : "transparent",
      backdropFilter: scrolled ? "saturate(180%) blur(12px)" : "none",
      WebkitBackdropFilter: scrolled ? "saturate(180%) blur(12px)" : "none",
      borderBottom: scrolled ? "1px solid var(--border-subtle)" : "1px solid transparent",
      boxShadow: scrolled ? "var(--shadow-e1)" : "none",
      transition: "all var(--dur-slow) var(--ease-out)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap",
    style: {
      display: "flex",
      alignItems: "center",
      gap: 24,
      height: 72
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: logo,
    alt: "mosmos",
    style: {
      height: 26
    }
  }), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: "flex",
      gap: 28,
      marginLeft: 16
    }
  }, links.map(l => /*#__PURE__*/React.createElement("a", {
    key: l,
    href: "#",
    style: {
      fontSize: 15,
      fontWeight: 500,
      color: "var(--text-body)",
      textDecoration: "none"
    }
  }, l))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: "auto",
      display: "flex",
      alignItems: "center",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Switch, {
    size: "sm",
    checked: dark,
    onChange: onToggleTheme
  }), /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      fontSize: 15,
      fontWeight: 500,
      color: "var(--text-body)"
    }
  }, "\uB85C\uADF8\uC778"), /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    pill: true
  }, "\uC0AC\uC804\uC2E0\uCCAD"))));
}
window.LandingNav = LandingNav;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/landing/LandingNav.jsx", error: String((e && e.message) || e) }); }

// ui_kits/landing/LandingSections.jsx
try { (() => {
// Landing content sections: How-it-works, Features, Stat band, Waitlist CTA, Footer.

function HowItWorks() {
  const Icon = window.Icon;
  const steps = [{
    n: "01",
    icon: "message-circle",
    t: "말하세요",
    d: "이루고 싶은 목표를 평소 말하듯 알려주세요. 프롬프트 기술은 필요 없어요."
  }, {
    n: "02",
    icon: "wand-sparkles",
    t: "Mos가 움직여요",
    d: "흩어진 도구와 가능성을 Mos가 알아서 연결하고 실행합니다."
  }, {
    n: "03",
    icon: "gift",
    t: "결과를 받으세요",
    d: "검토하고 다듬을 필요 없이, 바로 쓸 수 있는 결과가 도착해요."
  }];
  return /*#__PURE__*/React.createElement("section", {
    style: {
      padding: "96px 0"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      marginBottom: 56
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 700,
      fontSize: 32,
      color: "var(--text-strong)",
      margin: "0 0 12px"
    }
  }, "\uB9D0\uB9CC \uD558\uC138\uC694. \uC6C0\uC9C1\uC774\uB294 \uAC74 Mos."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 18,
      color: "var(--text-muted)",
      margin: 0
    }
  }, "\uACE0\uB974\uACE0, \uC2DC\uD0A4\uACE0, \uD655\uC778\uD558\uB294 \uC77C\uC740 \uC774\uC81C \uADF8\uB9CC. \uC138 \uB2E8\uACC4\uBA74 \uCDA9\uBD84\uD574\uC694.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: 24
    }
  }, steps.map(s => /*#__PURE__*/React.createElement("div", {
    key: s.n,
    style: {
      textAlign: "left"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 56,
      height: 56,
      borderRadius: "var(--radius-lg)",
      background: "var(--gradient-brand)",
      color: "#fff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 20
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: s.icon,
    size: 26
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 700,
      fontSize: 14,
      color: "var(--blue-classic)",
      marginBottom: 8
    }
  }, s.n), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 700,
      fontSize: 22,
      color: "var(--text-strong)",
      margin: "0 0 8px"
    }
  }, s.t), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 15.5,
      lineHeight: 1.6,
      color: "var(--text-muted)",
      margin: 0
    }
  }, s.d))))));
}
function Features() {
  const {
    Card
  } = window.MosmosDesignSystem_53320b;
  const Icon = window.Icon;
  const feats = [{
    accent: "blue",
    icon: "sparkles",
    t: "결과부터 가져와요",
    d: "도구 선택도, 검증도 Mos의 몫. 당신은 결과만 확인하면 됩니다."
  }, {
    accent: "purple",
    icon: "sprout",
    t: "쓸수록 자라요",
    d: "기억을 쌓아(Mos) 당신의 취향과 맥락을 익히며 점점 더 당신을 닮아갑니다."
  }, {
    accent: "cyan",
    icon: "share-2",
    t: "흩어진 걸 연결해요",
    d: "Notion, GitHub, Discord… 흩어진 가능성(Monad)을 하나의 세계(Cosmos)로."
  }, {
    accent: "blue",
    icon: "shield-check",
    t: "믿고 맡겨요",
    d: "똑똑한 척하지 않아도, 끝까지 해내는 다정한 조력자. 안심하고 맡기세요."
  }, {
    accent: "purple",
    icon: "feather",
    t: "가볍게 시작해요",
    d: "무겁지 않게, 부담 없이. 필요한 만큼만 가볍게 함께합니다."
  }, {
    accent: "cyan",
    icon: "users",
    t: "누구에게나 다정해요",
    d: "창작자도, 개발자도, 학생도. 모두에게 열려 있는 따뜻한 세계."
  }];
  return /*#__PURE__*/React.createElement("section", {
    style: {
      padding: "96px 0",
      background: "var(--surface-subtle)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 48,
      maxWidth: 560
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 700,
      fontSize: 32,
      color: "var(--text-strong)",
      margin: "0 0 12px"
    }
  }, "\uAE30\uC220\uC774 \uC544\uB2C8\uB77C, \uACB0\uACFC\uC640 \uC548\uC2EC\uC744 \uB4DC\uB824\uC694"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 18,
      color: "var(--text-muted)",
      margin: 0
    }
  }, "Mosmos\uB294 \uB3C4\uAD6C\uAC00 \uC544\uB2C8\uB77C, \uB2F9\uC2E0\uACFC \uD568\uAED8 \uC790\uB77C\uB294 \uD558\uB098\uC758 \uC138\uACC4\uC608\uC694.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: 20
    }
  }, feats.map(f => /*#__PURE__*/React.createElement(Card, {
    key: f.t,
    accent: f.accent,
    interactive: true,
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: f.icon,
      size: 24
    }),
    title: f.t,
    description: f.d
  })))));
}
function StatBand() {
  const stats = [{
    n: "2,400+",
    l: "사전신청한 사람들"
  }, {
    n: "12초",
    l: "평균 첫 결과 도착"
  }, {
    n: "30+",
    l: "연결되는 도구와 서비스"
  }, {
    n: "98%",
    l: "다시 맡기고 싶어요"
  }];
  return /*#__PURE__*/React.createElement("section", {
    style: {
      padding: "80px 0",
      background: "var(--blue-black)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap",
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: 24
    }
  }, stats.map(s => /*#__PURE__*/React.createElement("div", {
    key: s.l,
    style: {
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 700,
      fontSize: 48,
      lineHeight: 1,
      color: "var(--clear-white)",
      marginBottom: 10
    }
  }, s.n), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      color: "var(--blue-gray-light)"
    }
  }, s.l)))));
}
function WaitlistCTA() {
  const {
    Button,
    Input
  } = window.MosmosDesignSystem_53320b;
  const Icon = window.Icon;
  const [email, setEmail] = React.useState("");
  const [done, setDone] = React.useState(false);
  const [error, setError] = React.useState(false);
  function submit() {
    const ok = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
    if (!ok) {
      setError(true);
      return;
    }
    setError(false);
    setDone(true);
  }
  return /*#__PURE__*/React.createElement("section", {
    style: {
      padding: "96px 0"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--gradient-sky)",
      borderRadius: "var(--radius-xl)",
      border: "1px solid var(--border-subtle)",
      padding: "64px 48px",
      textAlign: "center",
      position: "relative",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logos/mosmos-symbol-gradient.svg",
    alt: "",
    "aria-hidden": "true",
    style: {
      position: "absolute",
      top: -30,
      left: -20,
      width: 120,
      opacity: 0.16
    }
  }), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 700,
      fontSize: 36,
      color: "var(--text-strong)",
      margin: "0 0 14px"
    }
  }, "\uB098\uC758 Mos, \uAC00\uC7A5 \uBA3C\uC800 \uB9CC\uB098\uBCF4\uC138\uC694"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 18,
      color: "var(--text-muted)",
      margin: "0 0 32px"
    }
  }, "\uBCA0\uD0C0 \uC624\uD508 \uC18C\uC2DD\uC744 \uAC00\uC7A5 \uBA3C\uC800 \uC804\uD574 \uB4DC\uB9B4\uAC8C\uC694."), done ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 10,
      padding: "14px 24px",
      borderRadius: "var(--radius-pill)",
      background: "color-mix(in srgb, var(--status-success) 14%, transparent)",
      color: "var(--status-success)",
      fontWeight: 600,
      fontSize: 16
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check-check",
    size: 20
  }), " \uC2E0\uCCAD\uC774 \uC644\uB8CC\uB410\uC5B4\uC694! \uACE7 \uC18C\uC2DD \uC804\uD574 \uB4DC\uB9B4\uAC8C\uC694.") : /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 12,
      maxWidth: 480,
      margin: "0 auto",
      alignItems: "flex-start"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement(Input, {
    type: "email",
    placeholder: "you@example.com",
    value: email,
    onChange: e => {
      setEmail(e.target.value);
      setError(false);
    },
    status: error ? "error" : "default",
    helper: error ? "올바른 이메일 주소를 입력해 주세요." : undefined,
    leftIcon: /*#__PURE__*/React.createElement(Icon, {
      name: "mail",
      size: 18
    })
  })), /*#__PURE__*/React.createElement(Button, {
    size: "md",
    onClick: submit
  }, "\uC0AC\uC804\uC2E0\uCCAD")))));
}
function LandingFooter({
  dark
}) {
  const logo = dark ? "../../assets/logos/mosmos-symbol-white.svg" : "../../assets/logos/mosmos-symbol-black.svg";
  const cols = [{
    h: "제품",
    items: ["기능", "작동 방식", "사전신청", "요금"]
  }, {
    h: "회사",
    items: ["소개", "블로그", "채용", "문의"]
  }, {
    h: "정책",
    items: ["이용약관", "개인정보처리방침"]
  }];
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      padding: "64px 0 48px",
      borderTop: "1px solid var(--border-subtle)",
      background: "var(--surface-page)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap",
    style: {
      display: "grid",
      gridTemplateColumns: "1.5fr 1fr 1fr 1fr",
      gap: 32
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("img", {
    src: logo,
    alt: "mosmos",
    style: {
      height: 32,
      marginBottom: 14
    }
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 13.5,
      lineHeight: 1.6,
      color: "var(--text-muted)",
      margin: 0,
      maxWidth: 240
    }
  }, "\uAE30\uC5B5\uC744 \uC313\uC544 \uD568\uAED8 \uC131\uC7A5\uD558\uACE0, \uD769\uC5B4\uC9C4 \uAC00\uB2A5\uC131\uC744 \uC5F0\uACB0\uD574 \uD558\uB098\uC758 \uC138\uACC4\uB97C \uB9CC\uB4E4\uC5B4\uAC00\uB294 \uB2E4\uC815\uD55C \uC870\uB825\uC790.")), cols.map(c => /*#__PURE__*/React.createElement("div", {
    key: c.h
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: "var(--text-strong)",
      marginBottom: 14
    }
  }, c.h), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 10
    }
  }, c.items.map(it => /*#__PURE__*/React.createElement("a", {
    key: it,
    href: "#",
    style: {
      fontSize: 13,
      color: "var(--text-muted)",
      textDecoration: "none"
    }
  }, it)))))), /*#__PURE__*/React.createElement("div", {
    className: "wrap",
    style: {
      marginTop: 40,
      paddingTop: 24,
      borderTop: "1px solid var(--border-subtle)",
      fontSize: 13,
      color: "var(--text-faint)"
    }
  }, "\xA9 2026 Mosmos. \uB0B4 AI\uAC00 \uC790\uB77C\uB294 \uC138\uACC4."));
}
window.HowItWorks = HowItWorks;
window.Features = Features;
window.StatBand = StatBand;
window.WaitlistCTA = WaitlistCTA;
window.LandingFooter = LandingFooter;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/landing/LandingSections.jsx", error: String((e && e.message) || e) }); }

// ui_kits/landing/icon-lucide.jsx
try { (() => {
// Icon — renders a Lucide icon imperatively (no React reconciliation conflict).
// Lucide is a CDN substitute: Mosmos ships no icon set. Stroke-based, rounded —
// matches the cozy, friendly brand mood. Flagged in README → ICONOGRAPHY.
function Icon({
  name,
  size = 24,
  stroke = 2,
  className,
  style
}) {
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
        attrs: {
          "stroke-width": stroke,
          width: "100%",
          height: "100%"
        },
        nameAttr: "data-lucide"
      });
    } catch (e) {}
  }, [name, size, stroke]);
  return /*#__PURE__*/React.createElement("span", {
    ref: ref,
    className: className,
    style: {
      display: "inline-flex",
      width: size,
      height: size,
      flex: "none",
      ...style
    }
  });
}
window.Icon = Icon;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/landing/icon-lucide.jsx", error: String((e && e.message) || e) }); }

// ui_kits/waitlist/WaitlistApp.jsx
try { (() => {
// Mosmos waitlist — focused two-column sign-up. One field, one clear CTA.
function WaitlistApp() {
  const {
    Button,
    Input,
    Badge,
    Avatar
  } = window.MosmosDesignSystem_53320b;
  const Icon = window.Icon;
  const [email, setEmail] = React.useState("");
  const [role, setRole] = React.useState("");
  const [status, setStatus] = React.useState("idle"); // idle | error | done

  const roles = ["창작자", "개발자", "PM", "학생", "기타"];
  function submit(e) {
    e && e.preventDefault();
    const ok = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
    if (!ok) {
      setStatus("error");
      return;
    }
    setStatus("done");
  }
  const benefits = [{
    icon: "rocket",
    t: "베타 우선 초대",
    d: "오픈 즉시, 가장 먼저 나의 Mos를 만나보세요."
  }, {
    icon: "gift",
    t: "얼리버드 혜택",
    d: "사전신청자에게만 드리는 첫 달 무료 크레딧."
  }, {
    icon: "bell",
    t: "성장 소식 알림",
    d: "Mos가 자라는 과정을 가장 먼저 전해 드려요."
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: "100vh",
      display: "grid",
      gridTemplateColumns: "1fr 1fr"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      overflow: "hidden",
      background: "var(--gradient-sky)",
      padding: "56px 64px",
      display: "flex",
      flexDirection: "column"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      bottom: -80,
      left: -60,
      width: 360,
      height: 360,
      background: "radial-gradient(circle, rgba(15,111,218,0.16), transparent 64%)",
      filter: "blur(6px)"
    }
  }), /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logos/mosmos-horizontal-color.svg",
    alt: "mosmos",
    style: {
      height: 28,
      alignSelf: "flex-start"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "auto",
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: "primary",
    variant: "soft",
    dot: true,
    style: {
      marginBottom: 20
    }
  }, "\uC0AC\uC804\uC2E0\uCCAD \uC9C4\uD589\uC911"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 700,
      fontSize: 44,
      lineHeight: 1.15,
      letterSpacing: "-0.02em",
      color: "var(--text-strong)",
      margin: "0 0 16px"
    }
  }, "\uB098\uC758 Mos\uB97C", /*#__PURE__*/React.createElement("br", null), "\uAC00\uC7A5 \uBA3C\uC800 \uB9CC\uB098\uBCF4\uC138\uC694"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 17,
      lineHeight: 1.6,
      color: "var(--text-muted)",
      margin: "0 0 32px",
      maxWidth: 380
    }
  }, "\uB9D0\uB9CC \uD558\uC138\uC694. \uC6C0\uC9C1\uC774\uB294 \uAC74 Mos. \uC4F8\uC218\uB85D \uB2F9\uC2E0\uC744 \uB2EE\uC544\uAC00\uBA70 \uD568\uAED8 \uC790\uB77C\uB294 \uB2E4\uC815\uD55C AI\uC758 \uC138\uACC4\uB85C \uCD08\uB300\uD569\uB2C8\uB2E4."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 16,
      maxWidth: 380
    }
  }, benefits.map(b => /*#__PURE__*/React.createElement("div", {
    key: b.t,
    style: {
      display: "flex",
      gap: 14,
      alignItems: "flex-start"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 40,
      height: 40,
      flex: "none",
      borderRadius: "var(--radius-md)",
      background: "var(--surface-card)",
      boxShadow: "var(--shadow-e1)",
      color: "var(--blue-core)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: b.icon,
    size: 20
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15.5,
      fontWeight: 600,
      color: "var(--text-strong)"
    }
  }, b.t), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      color: "var(--text-muted)"
    }
  }, b.d))))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "56px 64px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      maxWidth: 420
    }
  }, status === "done" ? /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 72,
      height: 72,
      margin: "0 auto 24px",
      borderRadius: "50%",
      background: "color-mix(in srgb, var(--status-success) 14%, transparent)",
      color: "var(--status-success)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check-check",
    size: 36
  })), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 700,
      fontSize: 26,
      color: "var(--text-strong)",
      margin: "0 0 10px"
    }
  }, "\uC2E0\uCCAD\uC774 \uC644\uB8CC\uB410\uC5B4\uC694!"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 16,
      lineHeight: 1.6,
      color: "var(--text-muted)",
      margin: "0 0 28px"
    }
  }, "\uBCA0\uD0C0\uAC00 \uC5F4\uB9AC\uBA74 ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: "var(--text-strong)"
    }
  }, email), " \uC73C\uB85C", /*#__PURE__*/React.createElement("br", null), "\uAC00\uC7A5 \uBA3C\uC800 \uC18C\uC2DD\uC744 \uC804\uD574 \uB4DC\uB9B4\uAC8C\uC694."), /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    onClick: () => {
      setStatus("idle");
      setEmail("");
      setRole("");
    }
  }, "\uB2E4\uB978 \uC774\uBA54\uC77C\uB85C \uC2E0\uCCAD")) : /*#__PURE__*/React.createElement("form", {
    onSubmit: submit
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 700,
      fontSize: 28,
      color: "var(--text-strong)",
      margin: "0 0 8px"
    }
  }, "\uC0AC\uC804\uC2E0\uCCAD\uD558\uAE30"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 15.5,
      color: "var(--text-muted)",
      margin: "0 0 28px"
    }
  }, "30\uCD08\uBA74 \uCDA9\uBD84\uD574\uC694. \uC2A4\uD338\uC740 \uBCF4\uB0B4\uC9C0 \uC54A\uC544\uC694."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 20
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "\uC774\uBA54\uC77C",
    type: "email",
    placeholder: "you@example.com",
    value: email,
    onChange: e => {
      setEmail(e.target.value);
      if (status === "error") setStatus("idle");
    },
    status: status === "error" ? "error" : "default",
    helper: status === "error" ? "올바른 이메일 주소를 입력해 주세요." : "베타 오픈 소식만 보내 드릴게요.",
    leftIcon: /*#__PURE__*/React.createElement(Icon, {
      name: "mail",
      size: 18
    })
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 28
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 500,
      color: "var(--text-strong)",
      marginBottom: 10
    }
  }, "\uC5B4\uB5A4 \uC77C\uC744 \uD558\uC2DC\uB098\uC694? ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-faint)",
      fontWeight: 400
    }
  }, "(\uC120\uD0DD)")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: 8
    }
  }, roles.map(r => {
    const on = role === r;
    return /*#__PURE__*/React.createElement("button", {
      type: "button",
      key: r,
      onClick: () => setRole(on ? "" : r),
      style: {
        padding: "8px 16px",
        borderRadius: "var(--radius-pill)",
        cursor: "pointer",
        fontFamily: "var(--font-body)",
        fontSize: 14,
        fontWeight: 500,
        border: `1px solid ${on ? "var(--color-primary)" : "var(--border-default)"}`,
        background: on ? "color-mix(in srgb, var(--color-primary) 10%, transparent)" : "var(--surface-card)",
        color: on ? "var(--color-primary)" : "var(--text-body)",
        transition: "all var(--dur-base) var(--ease-out)"
      }
    }, r);
  }))), /*#__PURE__*/React.createElement(Button, {
    type: "submit",
    size: "lg",
    fullWidth: true,
    onClick: submit,
    rightIcon: /*#__PURE__*/React.createElement(Icon, {
      name: "arrow-right",
      size: 18
    })
  }, "\uC0AC\uC804\uC2E0\uCCAD \uC644\uB8CC\uD558\uAE30"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      marginTop: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex"
    }
  }, ["민", "지", "다"].map((n, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      marginLeft: i ? -10 : 0,
      border: "2px solid var(--surface-page)",
      borderRadius: "50%"
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: n,
    size: 30
  })))), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13.5,
      color: "var(--text-muted)"
    }
  }, "\uC9C0\uAE08\uAE4C\uC9C0 ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: "var(--text-strong)"
    }
  }, "2,400+"), " \uBA85\uC774 \uD568\uAED8\uD574\uC694"))))));
}
ReactDOM.createRoot(document.getElementById("root")).render(/*#__PURE__*/React.createElement(WaitlistApp, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/waitlist/WaitlistApp.jsx", error: String((e && e.message) || e) }); }

// ui_kits/waitlist/icon-lucide.jsx
try { (() => {
// Icon — renders a Lucide icon imperatively (no React reconciliation conflict).
// Lucide is a CDN substitute: Mosmos ships no icon set. Stroke-based, rounded —
// matches the cozy, friendly brand mood. Flagged in README → ICONOGRAPHY.
function Icon({
  name,
  size = 24,
  stroke = 2,
  className,
  style
}) {
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
        attrs: {
          "stroke-width": stroke,
          width: "100%",
          height: "100%"
        },
        nameAttr: "data-lucide"
      });
    } catch (e) {}
  }, [name, size, stroke]);
  return /*#__PURE__*/React.createElement("span", {
    ref: ref,
    className: className,
    style: {
      display: "inline-flex",
      width: size,
      height: size,
      flex: "none",
      ...style
    }
  });
}
window.Icon = Icon;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/waitlist/icon-lucide.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Switch = __ds_scope.Switch;

})();
