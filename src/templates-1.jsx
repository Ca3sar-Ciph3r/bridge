/* global React, Icon, Button, Field, Input, Textarea, Chip, Pill, Card, SelectCard, Toggle, Slider, ProgressRail, StepFooter, AICallout, ClientBar, SECTIONS, BranchPanel, ICPRow, SliderRow, ReviewSection */
// Bridge — TEMPLATE versions. All client-specific data swapped for {PLACEHOLDER} markers.
// Use <T>NAME</T> to render a highlighted {NAME} placeholder.

// ─────────────────────────────────────────────────────────────
// <T> · placeholder token (visible, highlighted)
// ─────────────────────────────────────────────────────────────
function T({ children }) {
  return (
    <span style={{
      display: "inline-block",
      padding: "0 4px",
      borderRadius: 3,
      background: "rgba(79, 70, 229, 0.10)",
      color: "var(--accent-ink)",
      fontFamily: "var(--font-mono)",
      fontSize: "0.86em",
      fontWeight: 500,
      letterSpacing: "0",
      border: "1px dashed rgba(79, 70, 229, 0.35)",
      lineHeight: 1.3,
    }}>{"{"}{children}{"}"}</span>
  );
}

// Templated SECTIONS (subtitle stays generic in template)
const SECTIONS_T = [
  { id: "snapshot",  title: "Business Snapshot", subtitle: "Industry, location, scale" },
  { id: "services",  title: "Services",          subtitle: "What we're scoping" },
  { id: "strategy",  title: "Strategy Inputs",   subtitle: "ICP, competitors, voice" },
  { id: "assets",    title: "Assets",            subtitle: "Logos, creative, access" },
  { id: "goals",     title: "Goals",             subtitle: "Targets & priorities" },
  { id: "review",    title: "Review",            subtitle: "Confirm & submit" },
];

// Templated ProgressRail (replaces autosave bit)
function ProgressRailT({ current }) {
  return (
    <aside style={{
      width: 280, padding: "32px 28px 28px 32px", borderRight: "1px solid var(--line)",
      background: "var(--bg)", display: "flex", flexDirection: "column", gap: 28, flexShrink: 0,
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div className="br-wordmark"><span className="br-mark"></span>Bridge</div>
        <span className="br-mono" style={{ color: "var(--ink-5)", fontSize: 11 }}>v<T>VERSION</T></span>
      </div>

      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }}>
          <span className="br-eyebrow">Progress</span>
          <span className="br-mono br-num" style={{ fontSize: 12, color: "var(--ink-3)" }}>{Math.round((current / SECTIONS_T.length) * 100)}%</span>
        </div>
        <div style={{ height: 3, background: "var(--surface-3)", borderRadius: 999, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${(current / SECTIONS_T.length) * 100}%`, background: "var(--ink)", borderRadius: 999 }}/>
        </div>
      </div>

      <nav style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {SECTIONS_T.map((s, i) => {
          const state = i < current ? "done" : i === current ? "active" : "todo";
          return (
            <div key={s.id} style={{
              display: "flex", alignItems: "flex-start", gap: 12, padding: "10px 8px",
              borderRadius: 8, background: state === "active" ? "var(--surface)" : "transparent",
              border: state === "active" ? "1px solid var(--line)" : "1px solid transparent",
              boxShadow: state === "active" ? "var(--shadow-1)" : "none",
            }}>
              <div style={{
                width: 22, height: 22, borderRadius: 999, marginTop: 1,
                display: "grid", placeItems: "center", flexShrink: 0,
                background: state === "done" ? "var(--ink)" : state === "active" ? "var(--surface)" : "transparent",
                border: state === "done" ? "1px solid var(--ink)" : state === "active" ? "1.5px solid var(--ink)" : "1.5px solid var(--line-strong)",
                color: state === "done" ? "#fff" : "var(--ink)",
                fontSize: 10.5, fontWeight: 600,
              }}>
                {state === "done" ? <Icon name="check" size={11} strokeWidth={2.4}/> : (i + 1)}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: state === "active" ? 600 : 500, color: state === "todo" ? "var(--ink-4)" : "var(--ink)" }}>{s.title}</div>
                <div style={{ fontSize: 11.5, color: "var(--ink-4)", marginTop: 1 }}>{s.subtitle}</div>
              </div>
            </div>
          );
        })}
      </nav>

      <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: 12 }}>
        <div style={{ padding: "10px 12px", borderRadius: 10, border: "1px solid var(--line)", background: "var(--surface)", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 8, height: 8, borderRadius: 999, background: "var(--ok)" }}/>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 12, fontWeight: 500 }}>Autosaved</div>
            <div style={{ fontSize: 11, color: "var(--ink-4)" }}><T>SECONDS</T>s ago · resume on any device</div>
          </div>
        </div>
        <div style={{ fontSize: 11, color: "var(--ink-5)", lineHeight: 1.5, paddingLeft: 4 }}>
          Powered by <span style={{ color: "var(--ink-3)", fontWeight: 500 }}><T>AGENCY_NAME</T></span>
        </div>
      </div>
    </aside>
  );
}

// Templated ClientBar
function ClientBarT({ section, total, sectionName }) {
  return (
    <div style={{
      padding: "20px 56px", borderBottom: "1px solid var(--line)",
      background: "var(--bg)", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <Pill icon="lock" size="sm">Secure session · <T>CLIENT_EMAIL</T></Pill>
        <span className="br-mono" style={{ fontSize: 11, color: "var(--ink-5)" }}>STEP {section}/{total} — {sectionName}</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <Button variant="ghost" size="sm" icon="save">Save & exit</Button>
        <div style={{ width: 1, height: 16, background: "var(--line-strong)" }}/>
        <div style={{ width: 28, height: 28, borderRadius: 999, background: "var(--ink-3)", color: "#fff", display: "grid", placeItems: "center", fontSize: 12, fontWeight: 600 }}>
          <T>CI</T>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 01 — Landing (template)
// ─────────────────────────────────────────────────────────────
function ScreenLandingT() {
  return (
    <div className="br-frame" style={{ background: "var(--bg)" }}>
      <div style={{ padding: "24px 56px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
        <div className="br-wordmark"><span className="br-mark"></span>Bridge</div>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <span className="br-mono" style={{ fontSize: 11, color: "var(--ink-5)" }}>POWERED BY</span>
          <span style={{ fontSize: 13, fontWeight: 500 }}><T>AGENCY_NAME</T></span>
        </div>
      </div>

      <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 0 }}>
        <div style={{ padding: "40px 56px 56px", display: "flex", flexDirection: "column", justifyContent: "center", maxWidth: 600 }}>
          <Pill tone="accent" size="md" icon="sparkle"><T>HERO_EYEBROW</T></Pill>
          <h1 className="br-h1" style={{ marginTop: 20, marginBottom: 16, fontSize: 44, fontWeight: 600, letterSpacing: "-0.03em" }}>
            Welcome, <T>CLIENT_FIRST_NAME</T>.<br/>
            <span style={{ color: "var(--ink-4)" }}>Let's understand <T>CLIENT_COMPANY</T> — <T>HERO_SUBTITLE</T>.</span>
          </h1>

          <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 20 }}>
            {[
              ["target", "BENEFIT_1_TITLE",     "BENEFIT_1_BODY"],
              ["save",   "BENEFIT_2_TITLE",     "BENEFIT_2_BODY"],
              ["lock",   "BENEFIT_3_TITLE",     "BENEFIT_3_BODY"],
            ].map(([icon, title, desc]) => (
              <div key={title} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <div style={{ width: 28, height: 28, borderRadius: 7, flexShrink: 0, background: "var(--surface)", border: "1px solid var(--line)", display: "grid", placeItems: "center", color: "var(--ink-3)" }}>
                  <Icon name={icon} size={14}/>
                </div>
                <div style={{ paddingTop: 4 }}>
                  <div style={{ fontSize: 14, fontWeight: 500, color: "var(--ink)" }}><T>{title}</T></div>
                  <div style={{ fontSize: 13, color: "var(--ink-4)", marginTop: 1 }}><T>{desc}</T></div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 20, marginTop: 32, paddingTop: 20, borderTop: "1px solid var(--line)" }}>
            <div>
              <div className="br-eyebrow" style={{ fontSize: 10 }}>Estimated time</div>
              <div className="br-num" style={{ fontSize: 22, fontWeight: 600, marginTop: 2 }}><T>EST_MIN_LOW</T>–<T>EST_MIN_HIGH</T> min</div>
            </div>
            <div style={{ width: 1, height: 36, background: "var(--line)" }}/>
            <div>
              <div className="br-eyebrow" style={{ fontSize: 10 }}>Sections</div>
              <div className="br-num" style={{ fontSize: 22, fontWeight: 600, marginTop: 2 }}>6</div>
            </div>
            <div style={{ width: 1, height: 36, background: "var(--line)" }}/>
            <div>
              <div className="br-eyebrow" style={{ fontSize: 10 }}>Saved</div>
              <div style={{ fontSize: 14, fontWeight: 500, marginTop: 4, display: "flex", alignItems: "center", gap: 6 }}>
                <Icon name="check" size={13} color="var(--ok)" strokeWidth={2.4}/> Automatically
              </div>
            </div>
          </div>
        </div>

        <div style={{ padding: "32px 56px 32px 0", display: "flex", alignItems: "center" }}>
          <Card padding={28} style={{ width: "100%", boxShadow: "var(--shadow-3)", borderRadius: 16 }}>
            <div style={{ marginBottom: 20 }}>
              <Pill tone="ok" size="sm" icon="check">Invitation verified</Pill>
              <h2 className="br-h2" style={{ marginTop: 12, fontSize: 22 }}>Sign in to continue</h2>
              <p className="br-body" style={{ marginTop: 6, marginBottom: 0 }}>
                We'll send a secure link to your work inbox. Click it, and you're in — no password required.
              </p>
            </div>
            <Field label="Work email">
              <Input value="{CLIENT_EMAIL}" prefix={<Icon name="mail" size={15}/>} />
            </Field>
            <div style={{ marginTop: 16 }}>
              <Button variant="accent" full size="lg" iconRight="arrow_right">Send magic link</Button>
            </div>
            <div style={{ marginTop: 14, fontSize: 11.5, color: "var(--ink-4)", display: "flex", alignItems: "center", gap: 6, justifyContent: "center" }}>
              <Icon name="lock" size={12}/> 256-bit TLS · session expires in 7 days
            </div>

            <div style={{ marginTop: 24, paddingTop: 18, borderTop: "1px dashed var(--line)" }}>
              <div className="br-eyebrow" style={{ fontSize: 10 }}>What we'll cover</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 10 }}>
                {[
                  ["Snapshot", "Industry & scale"],
                  ["Services", "What we're scoping"],
                  ["Strategy", "ICP & competitors"],
                  ["Assets", "Logos, ad creative"],
                  ["Goals", "Targets & ranks"],
                  ["Review", "Confirm & submit"],
                ].map(([title, sub], i) => (
                  <div key={title} style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                    <span className="br-mono br-num" style={{ fontSize: 10, color: "var(--ink-5)" }}>{String(i+1).padStart(2,"0")}</span>
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 500, color: "var(--ink-2)" }}>{title}</div>
                      <div style={{ fontSize: 11, color: "var(--ink-4)" }}>{sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>

      <div style={{ padding: "16px 56px", borderTop: "1px solid var(--line)", display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 12, color: "var(--ink-5)", flexShrink: 0 }}>
        <div style={{ display: "flex", gap: 18 }}>
          <span>Privacy</span><span>Terms</span><span>Support</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span>One link feeds:</span>
          <span style={{ color: "var(--ink-3)" }}>Dock</span>·<span style={{ color: "var(--ink-3)" }}>Compass</span>·<span style={{ color: "var(--ink-3)" }}>Deck</span>·<span style={{ color: "var(--ink-3)" }}>Radar</span>·<span style={{ color: "var(--ink-3)" }}>Beacon</span>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 02 — Magic Link (template)
// ─────────────────────────────────────────────────────────────
function ScreenMagicLinkT() {
  return (
    <div className="br-frame" style={{ background: "var(--bg)" }}>
      <div style={{ padding: "24px 56px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
        <div className="br-wordmark"><span className="br-mark"></span>Bridge</div>
        <span className="br-mono" style={{ fontSize: 11, color: "var(--ink-5)" }}>SESSION · <T>SESSION_ID</T></span>
      </div>

      <div style={{ flex: 1, display: "grid", placeItems: "center", padding: 32 }}>
        <div style={{ width: 440, textAlign: "center" }}>
          <div style={{ position: "relative", width: 120, height: 120, margin: "0 auto 24px", display: "grid", placeItems: "center" }}>
            <div style={{ position: "absolute", inset: 0, borderRadius: 999, background: "radial-gradient(circle, rgba(79,70,229,.14) 0%, transparent 60%)" }}/>
            <div style={{ width: 72, height: 72, borderRadius: 18, background: "linear-gradient(135deg, #fff 0%, #f5f5f4 100%)", border: "1px solid var(--line)", display: "grid", placeItems: "center", boxShadow: "var(--shadow-2)", position: "relative" }}>
              <Icon name="mail" size={32} color="var(--accent)" strokeWidth={1.4}/>
              <div style={{ position: "absolute", top: -6, right: -6, width: 22, height: 22, borderRadius: 999, background: "var(--ok)", display: "grid", placeItems: "center", color: "#fff" }}>
                <Icon name="check" size={12} strokeWidth={3}/>
              </div>
            </div>
          </div>

          <h1 className="br-h1" style={{ fontSize: 30, marginBottom: 10 }}>Check your inbox</h1>
          <p className="br-bodyLg" style={{ margin: 0 }}>
            A secure link is on its way to <span style={{ color: "var(--ink)", fontWeight: 500 }}><T>CLIENT_EMAIL</T></span>.
            Click it and we'll pick up right where you left off.
          </p>

          <div style={{ marginTop: 28, padding: 16, background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 12, textAlign: "left" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <div style={{ width: 8, height: 8, borderRadius: 999, background: "var(--accent)" }}/>
              <span style={{ fontSize: 12.5, fontWeight: 500 }}>Waiting for confirmation</span>
              <span className="br-mono br-num" style={{ fontSize: 11, color: "var(--ink-5)", marginLeft: "auto" }}><T>MM:SS</T></span>
            </div>
            <div style={{ fontSize: 12, color: "var(--ink-4)", lineHeight: 1.55 }}>
              The link expires in 15 minutes. Didn't get it? Check spam or <span style={{ color: "var(--accent)", fontWeight: 500 }}>resend it</span>.
            </div>
          </div>

          <div style={{ marginTop: 24, fontSize: 12, color: "var(--ink-5)" }}>
            Wrong email? <span style={{ color: "var(--ink-3)", fontWeight: 500, textDecoration: "underline", textUnderlineOffset: 3 }}>Use a different one</span>
          </div>
        </div>
      </div>

      <div style={{ padding: "16px 56px", borderTop: "1px solid var(--line)", fontSize: 11, color: "var(--ink-5)", textAlign: "center", flexShrink: 0 }}>
        We'll never share your data. Bridge is SOC 2 Type II and GDPR-aligned.
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 02b — Resume (template)
// ─────────────────────────────────────────────────────────────
function ScreenResumeT() {
  return (
    <div className="br-frame" style={{ background: "var(--bg)" }}>
      <div style={{ padding: "24px 56px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
        <div className="br-wordmark"><span className="br-mark"></span>Bridge</div>
        <span className="br-mono" style={{ fontSize: 11, color: "var(--ink-5)" }}>SESSION · <T>SESSION_ID</T> · RESUMED</span>
      </div>

      <div style={{ flex: 1, display: "grid", placeItems: "center", padding: "16px 32px" }}>
        <div style={{ width: 640, maxWidth: "100%" }}>
          <Pill tone="accent" size="md" icon="sparkle">Welcome back, <T>CLIENT_FIRST_NAME</T></Pill>
          <h1 className="br-h1" style={{ fontSize: 36, marginTop: 14, marginBottom: 8, letterSpacing: "-0.025em" }}>
            We left off mid-<T>LAST_SECTION_NAME</T>.<br/>
            <span style={{ color: "var(--ink-4)" }}>Pick up where you were — about <T>MIN_LEFT</T> minutes.</span>
          </h1>
          <p className="br-bodyLg" style={{ margin: 0, marginBottom: 28 }}>
            Everything you've shared is saved. We auto-resumed your session from any device with the same magic link.
          </p>

          <Card padding={22} style={{ marginBottom: 18, boxShadow: "var(--shadow-2)" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
              <div>
                <div className="br-eyebrow">Your progress so far</div>
                <div style={{ fontSize: 16, fontWeight: 600, marginTop: 4 }}><T>DONE_COUNT</T> of 6 sections complete</div>
              </div>
              <Pill tone="ok" size="sm" icon="check">Autosaved · <T>DAYS</T>d ago</Pill>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 4, marginBottom: 14 }}>
              {SECTIONS_T.map((s, i) => {
                const state = i < 2 ? "done" : i === 2 ? "active" : "todo";
                return (
                  <div key={s.id} style={{
                    display: "grid", gridTemplateColumns: "auto 1fr auto", gap: 12, alignItems: "center",
                    padding: "10px 12px", borderRadius: 8,
                    background: state === "active" ? "var(--surface)" : "transparent",
                    border: state === "active" ? "1.5px solid var(--accent)" : "1px solid transparent",
                    boxShadow: state === "active" ? "0 0 0 3px rgba(79,70,229,.08)" : "none",
                  }}>
                    <div style={{
                      width: 22, height: 22, borderRadius: 999,
                      background: state === "done" ? "var(--ink)" : state === "active" ? "var(--accent-soft)" : "var(--surface-2)",
                      border: state === "done" ? "1px solid var(--ink)" : state === "active" ? "1.5px solid var(--accent)" : "1.5px solid var(--line-strong)",
                      display: "grid", placeItems: "center", color: "#fff", flexShrink: 0,
                    }}>
                      {state === "done" && <Icon name="check" size={11} strokeWidth={3}/>}
                      {state === "active" && <div style={{ width: 6, height: 6, borderRadius: 999, background: "var(--accent)" }}/>}
                      {state === "todo" && <span className="br-mono" style={{ fontSize: 10, color: "var(--ink-5)" }}>{i + 1}</span>}
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{ fontSize: 13.5, fontWeight: state === "active" ? 600 : 500, color: state === "todo" ? "var(--ink-4)" : "var(--ink)" }}>{s.title}</span>
                        {state === "active" && <Pill tone="accent" size="sm">Resume here</Pill>}
                      </div>
                      <div style={{ fontSize: 12, color: "var(--ink-4)", marginTop: 1 }}>
                        {state === "done" && <T>{`SECTION_${String.fromCharCode(65 + i)}_SUMMARY`}</T>}
                        {state === "active" && <T>CURRENT_FIELD_LABEL</T>}
                        {state === "todo" && "Not started"}
                      </div>
                    </div>
                    <span className="br-mono" style={{ fontSize: 10.5, color: "var(--ink-5)" }}>
                      {state === "done" ? <T>{`T_${String.fromCharCode(65 + i)}`}</T> : state === "active" ? "In progress" : "—"}
                    </span>
                  </div>
                );
              })}
            </div>

            <div style={{ padding: 14, background: "var(--surface-2)", borderRadius: 10, borderLeft: "3px solid var(--accent)" }}>
              <div className="br-eyebrow" style={{ fontSize: 9.5, marginBottom: 4 }}>You stopped at</div>
              <div style={{ fontSize: 13.5, fontWeight: 600, marginBottom: 4 }}>Section <T>LAST_SECTION_LETTER</T> · <T>LAST_SECTION_NAME</T> · <T>LAST_FIELD_LABEL</T></div>
              <div style={{ fontSize: 12.5, color: "var(--ink-3)" }}><T>LAST_FIELD_PROGRESS_NOTE</T></div>
            </div>
          </Card>

          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <Button variant="accent" size="lg" iconRight="arrow_right">Continue from Section <T>LAST_SECTION_LETTER</T></Button>
            <Button variant="outline" size="md" icon="info">Review what I've shared</Button>
            <div style={{ flex: 1 }}/>
            <span className="br-mono" style={{ fontSize: 11, color: "var(--ink-5)" }}>~<T>MIN_LEFT</T> MIN REMAINING</span>
          </div>
        </div>
      </div>

      <div style={{ padding: "16px 56px", borderTop: "1px solid var(--line)", fontSize: 11, color: "var(--ink-5)", display: "flex", justifyContent: "space-between", flexShrink: 0 }}>
        <span>Session expires <T>EXPIRY_DATE</T> · <T>DAYS_LEFT</T> days remaining</span>
        <span>Not <T>CLIENT_FIRST_NAME</T>? <span style={{ color: "var(--ink-3)", fontWeight: 500, textDecoration: "underline", textUnderlineOffset: 3 }}>Sign out</span></span>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 03 — Snapshot (template)
// ─────────────────────────────────────────────────────────────
function ScreenSnapshotT() {
  return (
    <div className="br-frame" style={{ flexDirection: "row" }}>
      <ProgressRailT current={0}/>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <ClientBarT section={1} total={6} sectionName="Business Snapshot"/>
        <div className="br-scroll" style={{ flex: 1, overflowY: "auto", padding: "32px 56px 32px" }}>
          <div style={{ maxWidth: 720 }}>
            <Pill tone="neutral" size="sm">A · Foundations</Pill>
            <h1 className="br-h1" style={{ marginTop: 12, marginBottom: 8, fontSize: 32 }}>The basics, first.</h1>
            <p className="br-bodyLg" style={{ marginTop: 0, marginBottom: 28 }}>
              Six quick fields so we know who we're building for. The rest of the flow adapts from here.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              <Field label={<>What kind of business is <T>CLIENT_COMPANY</T>?</>} hint="Pick the closest fit">
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {[
                    ["Single location",  "building"],
                    ["Multi-location",   "layers"],
                    ["Franchise",        "globe"],
                    ["Mobile / on-site", "map"],
                    ["Online-first",     "monitor"],
                  ].map(([l, i]) => (
                    <Chip key={l} icon={i}>{l}</Chip>
                  ))}
                </div>
                <div className="br-cap" style={{ marginTop: 6 }}>Selected: <T>BUSINESS_TYPE</T></div>
              </Field>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                <Field label="Industry">
                  <Input value="{INDUSTRY}" prefix={<Icon name="search" size={14}/>}/>
                  <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
                    <Pill tone="accent" size="sm"><T>INDUSTRY_TAXONOMY</T></Pill>
                  </div>
                </Field>

                <Field label="Headquarters">
                  <Input value="{HQ_CITY_STATE}" prefix={<Icon name="map" size={14}/>}/>
                  <div className="br-cap" style={{ marginTop: 6 }}>Locations: <T>LOCATIONS_LIST</T></div>
                </Field>
              </div>

              <Field label="Company size" hint="Including all roles">
                <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 8 }}>
                  {["1–5", "6–15", "16–50", "51–150", "150+"].map((r) => (
                    <button key={r} className="br-focus" style={{
                      padding: "12px 8px", borderRadius: 10, cursor: "pointer", fontFamily: "var(--font-sans)",
                      background: "var(--surface)", color: "var(--ink-2)",
                      border: "1px solid var(--line-strong)", boxShadow: "var(--shadow-1)",
                      fontSize: 13, fontWeight: 500,
                    }}>
                      <div style={{ fontFamily: "var(--font-mono)", fontSize: 15, fontWeight: 600 }}>{r}</div>
                      <div style={{ fontSize: 10.5, opacity: .7, marginTop: 2 }}>people</div>
                    </button>
                  ))}
                </div>
                <div className="br-cap" style={{ marginTop: 6 }}>Selected: <T>SIZE_RANGE</T></div>
              </Field>

              <Field label="Current revenue stage" hint="Annual">
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
                  {[
                    ["Pre-revenue", "$0"],
                    ["Early", "<$500K"],
                    ["Established", "$500K–$5M"],
                    ["Scaling", "$5M+"],
                  ].map(([l, s]) => (
                    <SelectCard key={l} title={l} subtitle={s}/>
                  ))}
                </div>
                <div className="br-cap" style={{ marginTop: 6 }}>Selected: <T>REVENUE_STAGE</T></div>
              </Field>

              <Field label="What's the main marketing goal right now?" ai>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  {[
                    ["users",     "PRIMARY_GOAL_1_TITLE",     "PRIMARY_GOAL_1_SUB"],
                    ["target",    "PRIMARY_GOAL_2_TITLE",     "PRIMARY_GOAL_2_SUB"],
                    ["megaphone", "PRIMARY_GOAL_3_TITLE",     "PRIMARY_GOAL_3_SUB"],
                    ["bolt",      "PRIMARY_GOAL_4_TITLE",     "PRIMARY_GOAL_4_SUB"],
                  ].map(([i, t, s]) => (
                    <SelectCard key={t} icon={i} title={<T>{t}</T>} subtitle={<T>{s}</T>}/>
                  ))}
                </div>
              </Field>
            </div>
          </div>
        </div>
        <StepFooter note="Autosaved · 2s ago" continueLabel="Continue to Services"/>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 04 — Services (template)
// ─────────────────────────────────────────────────────────────
function ScreenServicesT() {
  const services = [
    { id: "web",     icon: "monitor",   title: "Website design",    desc: "Site, landing pages, conversion",   count: 4 },
    { id: "ads",     icon: "megaphone", title: "Paid ads",          desc: "Meta, Google, TikTok, LinkedIn",    count: 5 },
    { id: "seo",     icon: "search",    title: "SEO",               desc: "Local, on-page, content velocity",  count: 4 },
    { id: "brand",   icon: "brush",     title: "Branding",          desc: "Identity, voice, guidelines",       count: 3 },
    { id: "content", icon: "pen",       title: "Content marketing", desc: "Editorial, social, video",          count: 3 },
    { id: "auto",    icon: "bolt",      title: "Automation / CRM",  desc: "Workflows, lifecycle, attribution", count: 4 },
  ];

  return (
    <div className="br-frame" style={{ flexDirection: "row" }}>
      <ProgressRailT current={1}/>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <ClientBarT section={2} total={6} sectionName="Services"/>
        <div className="br-scroll" style={{ flex: 1, overflowY: "auto", padding: "32px 56px 32px" }}>
          <div style={{ maxWidth: 980 }}>
            <Pill tone="neutral" size="sm">B · Scope</Pill>
            <h1 className="br-h1" style={{ marginTop: 12, marginBottom: 8, fontSize: 32 }}>What are we building together?</h1>
            <p className="br-bodyLg" style={{ marginTop: 0, marginBottom: 28 }}>
              Pick anything that's in play. Each one reveals the right follow-ups — nothing extra.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 32 }}>
              {services.map((s) => (
                <SelectCard
                  key={s.id}
                  icon={s.icon}
                  title={s.title}
                  subtitle={s.desc}
                  badge={<Pill tone="accent" size="sm">{s.count} q's</Pill>}
                />
              ))}
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <div className="br-eyebrow">Branching follow-ups</div>
              <div style={{ flex: 1, height: 1, background: "var(--line)" }}/>
              <span className="br-mono" style={{ fontSize: 11, color: "var(--ink-5)" }}><T>SELECTED_COUNT</T> SELECTED · <T>QUESTION_COUNT</T> QUESTIONS</span>
            </div>

            {/* Expanded service example */}
            <BranchPanel
              icon="monitor"
              title="Website design"
              progress={["Have a site?", "URL", "Platform", "Performance"]}
              active={2}
            >
              <Field label="Do you currently have a website?">
                <div style={{ display: "flex", gap: 8 }}>
                  <Chip>Yes</Chip>
                  <Chip>No</Chip>
                  <Chip>In progress</Chip>
                </div>
              </Field>
              <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 16, marginTop: 14 }}>
                <Field label="Current URL">
                  <Input value="{CLIENT_DOMAIN}" prefix={<Icon name="globe" size={14}/>}/>
                </Field>
                <Field label="Platform">
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    {["Webflow", "WordPress", "Squarespace", "Wix", "Custom"].map((p) => (
                      <Chip key={p} size="sm">{p}</Chip>
                    ))}
                  </div>
                </Field>
              </div>
              <Field label="What's broken on it today?" hint="Pick all that apply" style={{ marginTop: 14 }}>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {["Looks dated", "Slow on mobile", "Bad conversion flow", "Hard to update", "Poor SEO", "No analytics"].map((l) => (
                    <Chip key={l} size="sm">{l}</Chip>
                  ))}
                </div>
              </Field>
            </BranchPanel>

            {/* Collapsed examples */}
            <BranchPanel icon="megaphone" title="Paid ads" collapsed summary={<><T>PLATFORMS</T> · <T>AD_BUDGET</T>/mo · <T>TRACKING_STATUS</T></>}>
              <div/>
            </BranchPanel>
            <BranchPanel icon="search" title="SEO" collapsed summary={<><T>SEO_FOCUS</T> · <T>COMPETITOR_COUNT</T> competitors · <T>TARGET_LOCATIONS</T></>}>
              <div/>
            </BranchPanel>
            <BranchPanel icon="bolt" title="Automation / CRM" collapsed summary={<><T>CURRENT_CRM</T> · <T>AUTOMATION_FOCUS</T></>}>
              <div/>
            </BranchPanel>

            <div style={{ marginTop: 24 }}>
              <AICallout title="Heads up from Bridge">
                Based on your goal (<T>PRIMARY_GOAL</T>) and locale (<T>LOCALE</T>), you might also consider <strong style={{ color: "var(--ink)" }}><T>AI_SUGGESTED_SERVICE</T></strong>. We can flag it for your proposal without adding it to scope.
              </AICallout>
            </div>
          </div>
        </div>
        <StepFooter note={<><T>SELECTED_COUNT</T> selected · <T>QUESTION_COUNT</T> questions ahead</>} continueLabel="Continue to Strategy"/>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 05 — Strategy (template)
// ─────────────────────────────────────────────────────────────
function ScreenStrategyT() {
  return (
    <div className="br-frame" style={{ flexDirection: "row" }}>
      <ProgressRailT current={2}/>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <ClientBarT section={3} total={6} sectionName="Strategy Inputs"/>
        <div className="br-scroll" style={{ flex: 1, overflowY: "auto", padding: "32px 56px 32px" }}>
          <div style={{ maxWidth: 1000 }}>
            <Pill tone="neutral" size="sm">C · Intelligence</Pill>
            <h1 className="br-h1" style={{ marginTop: 12, marginBottom: 8, fontSize: 32 }}>Tell us how you see your business.</h1>
            <p className="br-bodyLg" style={{ marginTop: 0, marginBottom: 24 }}>
              Talk to us like you'd talk to a strategist. We'll structure it for you.
            </p>

            <Card padding={20} style={{ marginBottom: 16, borderColor: "#ddd6fe", background: "linear-gradient(180deg, #faf8ff 0%, #fff 100%)" }}>
              <Field label={<>Describe <T>CLIENT_COMPANY</T> in your own words</>} ai hint="2–4 sentences is plenty">
                <Textarea rows={4} value="{FREE_TEXT_DESCRIPTION}" shimmer/>
              </Field>
              <div style={{ marginTop: 14, fontSize: 12, color: "var(--ai)", display: "flex", alignItems: "center", gap: 6 }}>
                <Icon name="sparkle" size={12}/> Bridge extracted <T>EXTRACTED_FIELD_COUNT</T> structured fields from this — review below.
              </div>
            </Card>

            <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 16, marginBottom: 24 }}>
              <Card padding={20}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                  <div>
                    <div className="br-eyebrow">Ideal customer (ICP)</div>
                    <div style={{ fontSize: 16, fontWeight: 600, marginTop: 4 }}>Who you serve best</div>
                  </div>
                  <Pill tone="ai" size="sm" icon="sparkle">Drafted by AI · edit freely</Pill>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <ICPRow label="Demographics" pills={[<T key="d1">DEMO_1</T>, <T key="d2">DEMO_2</T>, <T key="d3">DEMO_3</T>]}/>
                  <ICPRow label="Geography"    pills={[<T key="g1">GEO_1</T>, <T key="g2">GEO_2</T>]}/>
                  <ICPRow label="Mindset"      pills={[<T key="m1">MINDSET_1</T>, <T key="m2">MINDSET_2</T>, <T key="m3">MINDSET_3</T>]}/>
                  <ICPRow label="Trigger events" pills={[<T key="t1">TRIGGER_1</T>, <T key="t2">TRIGGER_2</T>, <T key="t3">TRIGGER_3</T>, <T key="t4">TRIGGER_4</T>]}/>
                </div>

                <button style={{ marginTop: 14, padding: "8px 12px", borderRadius: 8, background: "transparent", border: "1px dashed var(--line-strong)", color: "var(--ink-3)", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, fontFamily: "var(--font-sans)" }}>
                  <Icon name="plus" size={13}/> Add a second persona
                </button>
              </Card>

              <Card padding={20}>
                <div className="br-eyebrow" style={{ marginBottom: 6 }}>Competitors</div>
                <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 12 }}>Who you're up against</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {[1, 2, 3].map((n) => (
                    <div key={n} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", border: "1px solid var(--line)", borderRadius: 10, background: "var(--surface-2)" }}>
                      <div style={{ width: 22, height: 22, borderRadius: 5, background: "#fff", border: "1px solid var(--line)", display: "grid", placeItems: "center", fontSize: 11, fontWeight: 600, color: "var(--ink-3)" }}>
                        <T>{`C${n}`}</T>
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 13, fontWeight: 500 }}><T>{`COMPETITOR_${n}_NAME`}</T></div>
                        <div className="br-mono" style={{ fontSize: 11, color: "var(--ink-4)" }}><T>{`COMPETITOR_${n}_URL`}</T></div>
                      </div>
                      <Pill tone="neutral" size="sm"><T>{`COMP_${n}_CTX`}</T></Pill>
                    </div>
                  ))}
                  <button style={{ padding: "10px 12px", borderRadius: 10, background: "transparent", border: "1px dashed var(--line-strong)", color: "var(--ink-3)", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, fontFamily: "var(--font-sans)" }}>
                    <Icon name="plus" size={13}/> Add competitor URL
                  </button>
                </div>
              </Card>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <Card padding={20}>
                <div className="br-eyebrow" style={{ marginBottom: 6 }}>Growth constraints</div>
                <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 12 }}>What's actually in the way?</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {[1, 2, 3, 4, 5].map((n) => {
                    const on = n <= 3;
                    return (
                      <label key={n} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 10px", borderRadius: 8, background: on ? "var(--warn-soft)" : "var(--surface-2)", border: `1px solid ${on ? "#fcd34d" : "var(--line)"}` }}>
                        <div style={{ width: 16, height: 16, borderRadius: 4, flexShrink: 0, background: on ? "var(--ink)" : "var(--surface)", border: on ? "1px solid var(--ink)" : "1.5px solid var(--line-strong)", display: "grid", placeItems: "center", color: "#fff" }}>
                          {on && <Icon name="check" size={10} strokeWidth={3}/>}
                        </div>
                        <span style={{ fontSize: 13, color: "var(--ink-2)" }}><T>{`CONSTRAINT_${n}`}</T></span>
                      </label>
                    );
                  })}
                </div>
              </Card>

              <Card padding={20}>
                <div className="br-eyebrow" style={{ marginBottom: 6 }}>Sales / customer journey</div>
                <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>How does a stranger become a customer today?</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                  {["Awareness", "Inquiry", "Booking", "First touch", "Retention"].map((stage, i, arr) => (
                    <div key={stage} style={{ display: "flex", gap: 12, position: "relative" }}>
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 4 }}>
                        <div style={{ width: 10, height: 10, borderRadius: 999, background: "var(--ink)" }}/>
                        {i < arr.length - 1 && <div style={{ flex: 1, width: 1.5, background: "var(--line-strong)", minHeight: 24 }}/>}
                      </div>
                      <div style={{ flex: 1, paddingBottom: i < arr.length - 1 ? 14 : 0 }}>
                        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
                          <span style={{ fontSize: 13, fontWeight: 500 }}>{stage}</span>
                          <span className="br-mono" style={{ fontSize: 11, color: "var(--ink-5)" }}><T>{`STAGE_${i+1}_KPI`}</T></span>
                        </div>
                        <div style={{ fontSize: 12, color: "var(--ink-4)" }}><T>{`STAGE_${i+1}_DETAIL`}</T></div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
        <StepFooter note={<><T>FIELDS_FILLED</T> fields filled · <T>AI_SUGGESTED_COUNT</T> AI-suggested</>} continueLabel="Continue to Assets"/>
      </div>
    </div>
  );
}

Object.assign(window, {
  T, SECTIONS_T, ProgressRailT, ClientBarT,
  ScreenLandingT, ScreenMagicLinkT, ScreenResumeT, ScreenSnapshotT, ScreenServicesT, ScreenStrategyT,
});
