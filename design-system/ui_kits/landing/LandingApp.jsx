// Landing page composition + theme state.
function LandingApp() {
  const [dark, setDark] = React.useState(false);
  React.useEffect(() => {
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
  }, [dark]);
  return (
    <div id="landing-scroll">
      <window.LandingNav dark={dark} onToggleTheme={setDark} />
      <window.LandingHero />
      <window.HowItWorks />
      <window.Features />
      <window.StatBand />
      <window.WaitlistCTA />
      <window.LandingFooter dark={dark} />
    </div>
  );
}
ReactDOM.createRoot(document.getElementById("root")).render(<LandingApp />);
