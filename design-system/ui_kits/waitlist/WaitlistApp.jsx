// Mosmos waitlist — focused two-column sign-up. One field, one clear CTA.
function WaitlistApp() {
  const { Button, Input, Badge, Avatar } = window.MosmosDesignSystem_53320b;
  const Icon = window.Icon;
  const [email, setEmail] = React.useState("");
  const [role, setRole] = React.useState("");
  const [status, setStatus] = React.useState("idle"); // idle | error | done

  const roles = ["창작자", "개발자", "PM", "학생", "기타"];

  function submit(e) {
    e && e.preventDefault();
    const ok = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
    if (!ok) { setStatus("error"); return; }
    setStatus("done");
  }

  const benefits = [
    { icon: "rocket", t: "베타 우선 초대", d: "오픈 즉시, 가장 먼저 나의 Mos를 만나보세요." },
    { icon: "gift", t: "얼리버드 혜택", d: "사전신청자에게만 드리는 첫 달 무료 크레딧." },
    { icon: "bell", t: "성장 소식 알림", d: "Mos가 자라는 과정을 가장 먼저 전해 드려요." },
  ];

  return (
    <div style={{ minHeight: "100vh", display: "grid", gridTemplateColumns: "1fr 1fr" }}>
      {/* Left — story */}
      <div style={{
        position: "relative", overflow: "hidden",
        background: "var(--gradient-sky)", padding: "56px 64px",
        display: "flex", flexDirection: "column",
      }}>
        <div style={{
          position: "absolute", bottom: -80, left: -60, width: 360, height: 360,
          background: "radial-gradient(circle, rgba(15,111,218,0.16), transparent 64%)", filter: "blur(6px)",
        }} />
        <img src="../../assets/logos/mosmos-horizontal-color.svg" alt="mosmos" style={{ height: 28, alignSelf: "flex-start" }} />

        <div style={{ marginTop: "auto", position: "relative" }}>
          <Badge tone="primary" variant="soft" dot style={{ marginBottom: 20 }}>사전신청 진행중</Badge>
          <h1 style={{
            fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 44, lineHeight: 1.15,
            letterSpacing: "-0.02em", color: "var(--text-strong)", margin: "0 0 16px",
          }}>
            나의 Mos를<br />가장 먼저 만나보세요
          </h1>
          <p style={{ fontSize: 17, lineHeight: 1.6, color: "var(--text-muted)", margin: "0 0 32px", maxWidth: 380 }}>
            말만 하세요. 움직이는 건 Mos. 쓸수록 당신을 닮아가며 함께 자라는 다정한 AI의 세계로 초대합니다.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 380 }}>
            {benefits.map((b) => (
              <div key={b.t} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                <span style={{
                  width: 40, height: 40, flex: "none", borderRadius: "var(--radius-md)",
                  background: "var(--surface-card)", boxShadow: "var(--shadow-e1)",
                  color: "var(--blue-core)", display: "flex", alignItems: "center", justifyContent: "center",
                }}><Icon name={b.icon} size={20} /></span>
                <div>
                  <div style={{ fontSize: 15.5, fontWeight: 600, color: "var(--text-strong)" }}>{b.t}</div>
                  <div style={{ fontSize: 14, color: "var(--text-muted)" }}>{b.d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right — form */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "56px 64px" }}>
        <div style={{ width: "100%", maxWidth: 420 }}>
          {status === "done" ? (
            <div style={{ textAlign: "center" }}>
              <div style={{
                width: 72, height: 72, margin: "0 auto 24px", borderRadius: "50%",
                background: "color-mix(in srgb, var(--status-success) 14%, transparent)",
                color: "var(--status-success)", display: "flex", alignItems: "center", justifyContent: "center",
              }}><Icon name="check-check" size={36} /></div>
              <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 26, color: "var(--text-strong)", margin: "0 0 10px" }}>
                신청이 완료됐어요!
              </h2>
              <p style={{ fontSize: 16, lineHeight: 1.6, color: "var(--text-muted)", margin: "0 0 28px" }}>
                베타가 열리면 <b style={{ color: "var(--text-strong)" }}>{email}</b> 으로<br />가장 먼저 소식을 전해 드릴게요.
              </p>
              <Button variant="outline" onClick={() => { setStatus("idle"); setEmail(""); setRole(""); }}>
                다른 이메일로 신청
              </Button>
            </div>
          ) : (
            <form onSubmit={submit}>
              <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 28, color: "var(--text-strong)", margin: "0 0 8px" }}>
                사전신청하기
              </h2>
              <p style={{ fontSize: 15.5, color: "var(--text-muted)", margin: "0 0 28px" }}>
                30초면 충분해요. 스팸은 보내지 않아요.
              </p>

              <div style={{ marginBottom: 20 }}>
                <Input label="이메일" type="email" placeholder="you@example.com"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); if (status === "error") setStatus("idle"); }}
                  status={status === "error" ? "error" : "default"}
                  helper={status === "error" ? "올바른 이메일 주소를 입력해 주세요." : "베타 오픈 소식만 보내 드릴게요."}
                  leftIcon={<Icon name="mail" size={18} />} />
              </div>

              <div style={{ marginBottom: 28 }}>
                <div style={{ fontSize: 14, fontWeight: 500, color: "var(--text-strong)", marginBottom: 10 }}>
                  어떤 일을 하시나요? <span style={{ color: "var(--text-faint)", fontWeight: 400 }}>(선택)</span>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {roles.map((r) => {
                    const on = role === r;
                    return (
                      <button type="button" key={r} onClick={() => setRole(on ? "" : r)} style={{
                        padding: "8px 16px", borderRadius: "var(--radius-pill)", cursor: "pointer",
                        fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 500,
                        border: `1px solid ${on ? "var(--color-primary)" : "var(--border-default)"}`,
                        background: on ? "color-mix(in srgb, var(--color-primary) 10%, transparent)" : "var(--surface-card)",
                        color: on ? "var(--color-primary)" : "var(--text-body)",
                        transition: "all var(--dur-base) var(--ease-out)",
                      }}>{r}</button>
                    );
                  })}
                </div>
              </div>

              <Button type="submit" size="lg" fullWidth onClick={submit}
                rightIcon={<Icon name="arrow-right" size={18} />}>
                사전신청 완료하기
              </Button>

              <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 24 }}>
                <div style={{ display: "flex" }}>
                  {["민", "지", "다"].map((n, i) => (
                    <span key={i} style={{ marginLeft: i ? -10 : 0, border: "2px solid var(--surface-page)", borderRadius: "50%" }}>
                      <Avatar name={n} size={30} />
                    </span>
                  ))}
                </div>
                <span style={{ fontSize: 13.5, color: "var(--text-muted)" }}>
                  지금까지 <b style={{ color: "var(--text-strong)" }}>2,400+</b> 명이 함께해요
                </span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
ReactDOM.createRoot(document.getElementById("root")).render(<WaitlistApp />);
