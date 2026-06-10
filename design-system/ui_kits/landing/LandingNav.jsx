// Landing navbar — transparent over hero, solid surface on scroll.
function LandingNav({ dark, onToggleTheme }) {
  const { Button, Switch } = window.MosmosDesignSystem_53320b;
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

  const logo = dark ? "../../assets/logos/mosmos-horizontal-white.svg"
                    : "../../assets/logos/mosmos-horizontal-color.svg";

  const links = ["기능", "작동 방식", "이야기"];
  return (
    <header style={{
      position: "sticky", top: 0, zIndex: 50,
      background: scrolled ? "color-mix(in srgb, var(--surface-page) 88%, transparent)" : "transparent",
      backdropFilter: scrolled ? "saturate(180%) blur(12px)" : "none",
      WebkitBackdropFilter: scrolled ? "saturate(180%) blur(12px)" : "none",
      borderBottom: scrolled ? "1px solid var(--border-subtle)" : "1px solid transparent",
      boxShadow: scrolled ? "var(--shadow-e1)" : "none",
      transition: "all var(--dur-slow) var(--ease-out)",
    }}>
      <div className="wrap" style={{ display: "flex", alignItems: "center", gap: 24, height: 72 }}>
        <img src={logo} alt="mosmos" style={{ height: 26 }} />
        <nav style={{ display: "flex", gap: 28, marginLeft: 16 }}>
          {links.map((l) => (
            <a key={l} href="#" style={{
              fontSize: 15, fontWeight: 500, color: "var(--text-body)", textDecoration: "none",
            }}>{l}</a>
          ))}
        </nav>
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 16 }}>
          <Switch size="sm" checked={dark} onChange={onToggleTheme} />
          <a href="#" style={{ fontSize: 15, fontWeight: 500, color: "var(--text-body)" }}>로그인</a>
          <Button size="sm" pill>사전신청</Button>
        </div>
      </div>
    </header>
  );
}
window.LandingNav = LandingNav;
