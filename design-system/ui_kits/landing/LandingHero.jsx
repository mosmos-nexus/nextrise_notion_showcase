// Landing hero — display tagline, slogan, CTAs, and a "goal → Mos → result" visual.
function LandingHero() {
  const { Button, Badge, Avatar } = window.MosmosDesignSystem_53320b;
  const Icon = window.Icon;
  return (
    <section style={{ paddingTop: 56, paddingBottom: 96, background: "var(--gradient-sky)", overflow: "hidden" }}>
      {/* soft glow */}
      <div style={{
        position: "absolute", top: -120, right: -80, width: 520, height: 520,
        background: "radial-gradient(circle, rgba(15,111,218,0.18), transparent 62%)",
        filter: "blur(8px)", pointerEvents: "none",
      }} />
      <div className="wrap" style={{
        position: "relative", display: "grid",
        gridTemplateColumns: "1.05fr 0.95fr", gap: 56, alignItems: "center",
      }}>
        {/* Left: copy */}
        <div>
          <Badge tone="primary" variant="soft" dot style={{ marginBottom: 24 }}>사전신청 진행중 · 베타</Badge>
          <h1 style={{
            fontFamily: "var(--font-display)", fontWeight: 700,
            fontSize: 60, lineHeight: 1.1, letterSpacing: "-0.02em",
            color: "var(--text-strong)", margin: "0 0 20px",
          }}>
            내 AI가<br />자라는 세계
          </h1>
          <p style={{
            fontSize: 20, lineHeight: 1.5, color: "var(--text-muted)", margin: "0 0 36px", maxWidth: 460,
          }}>
            목표만 말하면, 당신의 AI 아바타가 결과를 가져옵니다.
            쓸수록 당신을 닮아가며 함께 자라는 다정한 조력자.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Button size="lg" rightIcon={<Icon name="arrow-right" size={18} />}>사전신청하기</Button>
            <Button size="lg" variant="outline" leftIcon={<Icon name="play" size={18} />}>작동 방식 보기</Button>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 32 }}>
            <div style={{ display: "flex" }}>
              {["민", "지", "다", "온"].map((n, i) => (
                <span key={i} style={{ marginLeft: i ? -10 : 0, border: "2px solid var(--surface-page)", borderRadius: "50%" }}>
                  <Avatar name={n} size={32} />
                </span>
              ))}
            </div>
            <span style={{ fontSize: 14, color: "var(--text-muted)" }}>
              이미 <b style={{ color: "var(--text-strong)" }}>2,400+</b> 명이 자신의 Mos를 기다리고 있어요
            </span>
          </div>
        </div>

        {/* Right: companion visual */}
        <div style={{ position: "relative", minHeight: 420 }}>
          <div style={{
            position: "absolute", inset: "8% 4%", borderRadius: "var(--radius-xl)",
            background: "var(--gradient-brand)", opacity: 0.12, filter: "blur(2px)",
          }} />
          <img src="../../assets/logos/mosmos-symbol-gradient.svg" alt="Mos"
            style={{ position: "absolute", top: 0, right: 24, width: 132, filter: "drop-shadow(0 12px 28px rgba(15,111,218,0.28))" }} />

          {/* goal bubble */}
          <div style={{
            position: "absolute", top: 40, left: 0, width: 300,
            background: "var(--surface-card)", borderRadius: "var(--radius-lg)",
            boxShadow: "var(--shadow-e3)", padding: 18, border: "1px solid var(--border-subtle)",
          }}>
            <div style={{ fontSize: 12, color: "var(--text-faint)", marginBottom: 6 }}>나의 목표</div>
            <div style={{ fontSize: 16, color: "var(--text-strong)", fontWeight: 500 }}>
              "다음 주 팀 워크숍 자료 만들어 줘"
            </div>
          </div>

          {/* working step */}
          <div style={{
            position: "absolute", top: 188, left: 40, width: 320,
            background: "var(--surface-card)", borderRadius: "var(--radius-lg)",
            boxShadow: "var(--shadow-e2)", padding: 18, border: "1px solid var(--border-subtle)",
            display: "flex", alignItems: "center", gap: 12,
          }}>
            <Avatar name="Mos" size={40} ring />
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text-strong)" }}>Mos가 움직이는 중…</div>
              <div style={{ fontSize: 13, color: "var(--text-muted)" }}>자료 조사 · 초안 작성 · 슬라이드 구성</div>
            </div>
          </div>

          {/* result chip */}
          <div style={{
            position: "absolute", bottom: 8, right: 0, width: 250,
            background: "var(--blue-black)", color: "var(--clear-white)", borderRadius: "var(--radius-lg)",
            boxShadow: "var(--shadow-e3)", padding: "16px 18px",
            display: "flex", alignItems: "center", gap: 12,
          }}>
            <span style={{
              width: 36, height: 36, borderRadius: "50%", flex: "none",
              background: "var(--status-success)", color: "#fff",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}><Icon name="check" size={20} /></span>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600 }}>완료됐어요</div>
              <div style={{ fontSize: 12.5, color: "var(--blue-gray-light)" }}>워크숍_자료.pptx · 14 slides</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
window.LandingHero = LandingHero;
