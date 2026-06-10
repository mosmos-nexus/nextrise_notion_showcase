// Landing content sections: How-it-works, Features, Stat band, Waitlist CTA, Footer.

function HowItWorks() {
  const Icon = window.Icon;
  const steps = [
    { n: "01", icon: "message-circle", t: "말하세요", d: "이루고 싶은 목표를 평소 말하듯 알려주세요. 프롬프트 기술은 필요 없어요." },
    { n: "02", icon: "wand-sparkles", t: "Mos가 움직여요", d: "흩어진 도구와 가능성을 Mos가 알아서 연결하고 실행합니다." },
    { n: "03", icon: "gift", t: "결과를 받으세요", d: "검토하고 다듬을 필요 없이, 바로 쓸 수 있는 결과가 도착해요." },
  ];
  return (
    <section style={{ padding: "96px 0" }}>
      <div className="wrap">
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 32, color: "var(--text-strong)", margin: "0 0 12px" }}>
            말만 하세요. 움직이는 건 Mos.
          </h2>
          <p style={{ fontSize: 18, color: "var(--text-muted)", margin: 0 }}>
            고르고, 시키고, 확인하는 일은 이제 그만. 세 단계면 충분해요.
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {steps.map((s) => (
            <div key={s.n} style={{ textAlign: "left" }}>
              <div style={{
                width: 56, height: 56, borderRadius: "var(--radius-lg)",
                background: "var(--gradient-brand)", color: "#fff",
                display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20,
              }}><Icon name={s.icon} size={26} /></div>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 14, color: "var(--blue-classic)", marginBottom: 8 }}>{s.n}</div>
              <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 22, color: "var(--text-strong)", margin: "0 0 8px" }}>{s.t}</h3>
              <p style={{ fontSize: 15.5, lineHeight: 1.6, color: "var(--text-muted)", margin: 0 }}>{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Features() {
  const { Card } = window.MosmosDesignSystem_53320b;
  const Icon = window.Icon;
  const feats = [
    { accent: "blue", icon: "sparkles", t: "결과부터 가져와요", d: "도구 선택도, 검증도 Mos의 몫. 당신은 결과만 확인하면 됩니다." },
    { accent: "purple", icon: "sprout", t: "쓸수록 자라요", d: "기억을 쌓아(Mos) 당신의 취향과 맥락을 익히며 점점 더 당신을 닮아갑니다." },
    { accent: "cyan", icon: "share-2", t: "흩어진 걸 연결해요", d: "Notion, GitHub, Discord… 흩어진 가능성(Monad)을 하나의 세계(Cosmos)로." },
    { accent: "blue", icon: "shield-check", t: "믿고 맡겨요", d: "똑똑한 척하지 않아도, 끝까지 해내는 다정한 조력자. 안심하고 맡기세요." },
    { accent: "purple", icon: "feather", t: "가볍게 시작해요", d: "무겁지 않게, 부담 없이. 필요한 만큼만 가볍게 함께합니다." },
    { accent: "cyan", icon: "users", t: "누구에게나 다정해요", d: "창작자도, 개발자도, 학생도. 모두에게 열려 있는 따뜻한 세계." },
  ];
  return (
    <section style={{ padding: "96px 0", background: "var(--surface-subtle)" }}>
      <div className="wrap">
        <div style={{ marginBottom: 48, maxWidth: 560 }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 32, color: "var(--text-strong)", margin: "0 0 12px" }}>
            기술이 아니라, 결과와 안심을 드려요
          </h2>
          <p style={{ fontSize: 18, color: "var(--text-muted)", margin: 0 }}>
            Mosmos는 도구가 아니라, 당신과 함께 자라는 하나의 세계예요.
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {feats.map((f) => (
            <Card key={f.t} accent={f.accent} interactive
              icon={<Icon name={f.icon} size={24} />}
              title={f.t} description={f.d} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatBand() {
  const stats = [
    { n: "2,400+", l: "사전신청한 사람들" },
    { n: "12초", l: "평균 첫 결과 도착" },
    { n: "30+", l: "연결되는 도구와 서비스" },
    { n: "98%", l: "다시 맡기고 싶어요" },
  ];
  return (
    <section style={{ padding: "80px 0", background: "var(--blue-black)" }}>
      <div className="wrap" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }}>
        {stats.map((s) => (
          <div key={s.l} style={{ textAlign: "center" }}>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 48, lineHeight: 1, color: "var(--clear-white)", marginBottom: 10 }}>{s.n}</div>
            <div style={{ fontSize: 15, color: "var(--blue-gray-light)" }}>{s.l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function WaitlistCTA() {
  const { Button, Input } = window.MosmosDesignSystem_53320b;
  const Icon = window.Icon;
  const [email, setEmail] = React.useState("");
  const [done, setDone] = React.useState(false);
  const [error, setError] = React.useState(false);
  function submit() {
    const ok = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
    if (!ok) { setError(true); return; }
    setError(false); setDone(true);
  }
  return (
    <section style={{ padding: "96px 0" }}>
      <div className="wrap">
        <div style={{
          background: "var(--gradient-sky)", borderRadius: "var(--radius-xl)",
          border: "1px solid var(--border-subtle)", padding: "64px 48px", textAlign: "center",
          position: "relative", overflow: "hidden",
        }}>
          <img src="../../assets/logos/mosmos-symbol-gradient.svg" alt="" aria-hidden="true"
            style={{ position: "absolute", top: -30, left: -20, width: 120, opacity: 0.16 }} />
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 36, color: "var(--text-strong)", margin: "0 0 14px" }}>
            나의 Mos, 가장 먼저 만나보세요
          </h2>
          <p style={{ fontSize: 18, color: "var(--text-muted)", margin: "0 0 32px" }}>
            베타 오픈 소식을 가장 먼저 전해 드릴게요.
          </p>
          {done ? (
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              padding: "14px 24px", borderRadius: "var(--radius-pill)",
              background: "color-mix(in srgb, var(--status-success) 14%, transparent)",
              color: "var(--status-success)", fontWeight: 600, fontSize: 16,
            }}>
              <Icon name="check-check" size={20} /> 신청이 완료됐어요! 곧 소식 전해 드릴게요.
            </div>
          ) : (
            <div style={{ display: "flex", gap: 12, maxWidth: 480, margin: "0 auto", alignItems: "flex-start" }}>
              <div style={{ flex: 1 }}>
                <Input type="email" placeholder="you@example.com"
                  value={email} onChange={(e) => { setEmail(e.target.value); setError(false); }}
                  status={error ? "error" : "default"}
                  helper={error ? "올바른 이메일 주소를 입력해 주세요." : undefined}
                  leftIcon={<Icon name="mail" size={18} />} />
              </div>
              <Button size="md" onClick={submit}>사전신청</Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function LandingFooter({ dark }) {
  const logo = dark ? "../../assets/logos/mosmos-symbol-white.svg" : "../../assets/logos/mosmos-symbol-black.svg";
  const cols = [
    { h: "제품", items: ["기능", "작동 방식", "사전신청", "요금"] },
    { h: "회사", items: ["소개", "블로그", "채용", "문의"] },
    { h: "정책", items: ["이용약관", "개인정보처리방침"] },
  ];
  return (
    <footer style={{ padding: "64px 0 48px", borderTop: "1px solid var(--border-subtle)", background: "var(--surface-page)" }}>
      <div className="wrap" style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1fr", gap: 32 }}>
        <div>
          <img src={logo} alt="mosmos" style={{ height: 32, marginBottom: 14 }} />
          <p style={{ fontSize: 13.5, lineHeight: 1.6, color: "var(--text-muted)", margin: 0, maxWidth: 240 }}>
            기억을 쌓아 함께 성장하고, 흩어진 가능성을 연결해 하나의 세계를 만들어가는 다정한 조력자.
          </p>
        </div>
        {cols.map((c) => (
          <div key={c.h}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-strong)", marginBottom: 14 }}>{c.h}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {c.items.map((it) => (
                <a key={it} href="#" style={{ fontSize: 13, color: "var(--text-muted)", textDecoration: "none" }}>{it}</a>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="wrap" style={{ marginTop: 40, paddingTop: 24, borderTop: "1px solid var(--border-subtle)", fontSize: 13, color: "var(--text-faint)" }}>
        © 2026 Mosmos. 내 AI가 자라는 세계.
      </div>
    </footer>
  );
}

window.HowItWorks = HowItWorks;
window.Features = Features;
window.StatBand = StatBand;
window.WaitlistCTA = WaitlistCTA;
window.LandingFooter = LandingFooter;
