/* global React, Icon, Button, Field, Input, Textarea, Chip, Pill, Card, SelectCard, Toggle, Slider, AICallout */
// Bridge — mobile preview (iPhone 14 width: 390)

function MobileFrame({ title, children, step, total, foot }) {
  return (
    <div className="br-frame" style={{ background: "#e9e9e6", padding: 16, alignItems: "center" }}>
      {/* device bezel */}
      <div style={{
        width: 360, flex: 1, maxHeight: 720,
        borderRadius: 44, background: "#0c0a09",
        padding: 8, boxShadow: "0 10px 40px -10px rgba(0,0,0,.28), 0 1px 3px rgba(0,0,0,.1)",
        display: "flex", flexDirection: "column",
      }}>
        <div style={{
          flex: 1, background: "var(--bg)", borderRadius: 36, overflow: "hidden",
          display: "flex", flexDirection: "column", position: "relative",
        }}>
          {/* status bar */}
          <div style={{ padding: "12px 24px 4px", display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 12, fontWeight: 600 }}>
            <span>9:41</span>
            <div style={{
              position: "absolute", left: "50%", top: 6, transform: "translateX(-50%)",
              width: 84, height: 22, borderRadius: 999, background: "#0c0a09",
            }}/>
            <div style={{ display: "flex", gap: 4 }}>
              <span>􀛨</span><span>􀙇</span>
            </div>
          </div>

          {/* top bar */}
          <div style={{ padding: "8px 16px 0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div className="br-wordmark" style={{ fontSize: 15 }}><span className="br-mark" style={{ width: 18, height: 18 }}></span>Bridge</div>
            <span className="br-mono" style={{ fontSize: 10, color: "var(--ink-5)" }}>{step}/{total}</span>
          </div>

          {/* progress */}
          <div style={{ padding: "10px 16px 0" }}>
            <div style={{ height: 3, background: "var(--surface-3)", borderRadius: 999, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${(step / total) * 100}%`, background: "var(--ink)", borderRadius: 999 }}/>
            </div>
          </div>

          {/* heading */}
          <div style={{ padding: "16px 20px 8px" }}>
            <Pill tone="neutral" size="sm">{title.tag}</Pill>
            <div style={{ fontSize: 22, fontWeight: 600, letterSpacing: "-0.025em", marginTop: 8, lineHeight: 1.2 }}>{title.main}</div>
            {title.sub && <div style={{ fontSize: 13, color: "var(--ink-4)", marginTop: 4 }}>{title.sub}</div>}
          </div>

          {/* body */}
          <div className="br-scroll" style={{ flex: 1, overflowY: "auto", padding: "8px 20px 16px" }}>
            {children}
          </div>

          {/* bottom bar */}
          {foot && (
            <div style={{ padding: "12px 16px 18px", borderTop: "1px solid var(--line)", background: "var(--surface)" }}>
              {foot}
            </div>
          )}
          {!foot && (
            <div style={{ padding: "12px 16px 18px", borderTop: "1px solid var(--line)", background: "var(--surface)", display: "flex", gap: 8, alignItems: "center" }}>
              <Button variant="ghost" size="sm" icon="arrow_left"/>
              <Button variant="accent" full size="md" iconRight="arrow_right">Continue</Button>
            </div>
          )}

          {/* home indicator */}
          <div style={{ position: "absolute", bottom: 6, left: "50%", transform: "translateX(-50%)", width: 110, height: 4, borderRadius: 999, background: "#0c0a09", opacity: .35 }}/>
        </div>
      </div>
    </div>
  );
}

function MobileServicesScreen() {
  return (
    <MobileFrame
      step={2}
      total={6}
      title={{ tag: "B · Scope", main: "What are we building?", sub: "Pick anything in play. Each one adapts the rest." }}
      foot={
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span className="br-mono" style={{ fontSize: 11, color: "var(--ink-5)", flex: 1 }}>4 selected · 16 q's</span>
          <Button variant="accent" size="md" iconRight="arrow_right">Continue</Button>
        </div>
      }
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {[
          { icon: "monitor", title: "Website design", desc: "Site, landing, conversion", on: true, q: 4 },
          { icon: "megaphone", title: "Paid ads", desc: "Meta · Google · TikTok", on: true, q: 5 },
          { icon: "search", title: "SEO", desc: "Local, on-page, content", on: true, q: 4 },
          { icon: "brush", title: "Branding", desc: "Identity, voice, guides", on: false, q: 3 },
          { icon: "pen", title: "Content marketing", desc: "Editorial, social, video", on: false, q: 3 },
          { icon: "bolt", title: "Automation / CRM", desc: "Workflows, attribution", on: true, q: 4 },
        ].map((s) => (
          <div key={s.title} style={{
            display: "flex", alignItems: "center", gap: 12, padding: "12px 14px",
            background: "var(--surface)",
            border: s.on ? "1.5px solid var(--accent)" : "1px solid var(--line-strong)",
            borderRadius: 12,
            boxShadow: s.on ? "0 0 0 3px rgba(79, 70, 229, .1), var(--shadow-1)" : "var(--shadow-1)",
          }}>
            <div style={{
              width: 32, height: 32, borderRadius: 8,
              background: s.on ? "var(--accent-soft)" : "var(--surface-2)",
              color: s.on ? "var(--accent)" : "var(--ink-3)",
              border: `1px solid ${s.on ? "var(--accent-soft-2)" : "var(--line)"}`,
              display: "grid", placeItems: "center", flexShrink: 0,
            }}>
              <Icon name={s.icon} size={15}/>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 14, fontWeight: 600, letterSpacing: "-0.005em" }}>{s.title}</div>
              <div style={{ fontSize: 12, color: "var(--ink-4)" }}>{s.desc} · {s.q} q's</div>
            </div>
            <div style={{
              width: 22, height: 22, borderRadius: 999, flexShrink: 0,
              display: "grid", placeItems: "center",
              background: s.on ? "var(--accent)" : "transparent",
              border: s.on ? "1.5px solid var(--accent)" : "1.5px solid var(--line-strong)",
              color: "#fff",
            }}>{s.on && <Icon name="check" size={12} strokeWidth={2.8}/>}</div>
          </div>
        ))}

        <div style={{ marginTop: 8 }}>
          <AICallout title="Heads up">
            Based on your goal + locale, consider <strong style={{ color: "var(--ink)" }}>Local SEO + Reviews</strong>. We can flag for your proposal.
          </AICallout>
        </div>
      </div>
    </MobileFrame>
  );
}

function MobileReviewScreen() {
  return (
    <MobileFrame
      step={6}
      total={6}
      title={{ tag: "F · Confirmation", main: "Here's how we get it.", sub: "Read it back. Edit anything off." }}
      foot={
        <Button variant="accent" full size="md" iconRight="arrow_right">Submit & generate</Button>
      }
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <AICallout title="Bridge summary">
          Multi-location dental practice in Burlington, VT. Williston schedule is the pressure point (38% full). Scoping Website + Paid + SEO + Automation against $8.5K/mo, no CRM.
        </AICallout>

        <Card padding={14}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 8 }}>
            <span className="br-num" style={{ fontSize: 28, fontWeight: 600, letterSpacing: "-0.03em" }}>94</span>
            <span style={{ fontSize: 12, color: "var(--ink-4)" }}>/ 100 readiness</span>
            <Pill tone="ok" size="sm" icon="check" style={{ marginLeft: "auto" }}>Proposal-ready</Pill>
          </div>
          <div style={{ height: 5, borderRadius: 999, background: "var(--surface-3)", overflow: "hidden" }}>
            <div style={{ height: "100%", width: "94%", background: "linear-gradient(90deg, var(--accent), var(--ok))" }}/>
          </div>
        </Card>

        {[
          ["A", "Snapshot", "3 offices · Burlington VT · 16–50 ppl", "ok"],
          ["B", "Services", "Website · Paid · SEO · Automation", "ok"],
          ["C", "Strategy", "ICP: Families w/ kids 3–14", "warn"],
          ["D", "Assets", "7 files · 3 gaps", "warn"],
          ["E", "Goals", "Williston fill = #1 priority", "ok"],
        ].map(([s, t, d, tone]) => (
          <div key={t} style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 13px", background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 10 }}>
            <span className="br-mono" style={{ fontSize: 10, color: "var(--ink-5)" }}>{s}</span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 600 }}>{t}</div>
              <div style={{ fontSize: 11.5, color: "var(--ink-4)" }}>{d}</div>
            </div>
            {tone === "ok" ? <Icon name="check" size={14} color="var(--ok)" strokeWidth={2.4}/> : <Icon name="alert" size={14} color="var(--warn)"/>}
          </div>
        ))}
      </div>
    </MobileFrame>
  );
}

Object.assign(window, { MobileFrame, MobileServicesScreen, MobileReviewScreen });
