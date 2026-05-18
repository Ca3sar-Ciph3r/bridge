/* global React, Icon, Button, Field, Input, Textarea, Chip, Pill, Card, SelectCard, Toggle, Slider, AICallout, MobileFrame, MobileBare, T */
// Bridge — TEMPLATE mobile screens. Same iPhone frame as live Bridge mobile, with {PLACEHOLDER} markers.

// ─────────────────────────────────────────────────────────────
// Mobile · 01 Landing (template)
// ─────────────────────────────────────────────────────────────
function MobileLandingT() {
  return (
    <MobileBare>
      <div style={{ padding: "12px 20px 6px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div className="br-wordmark" style={{ fontSize: 15 }}><span className="br-mark" style={{ width: 18, height: 18 }}></span>Bridge</div>
        <span className="br-mono" style={{ fontSize: 10, color: "var(--ink-5)" }}>POWERED BY DN</span>
      </div>

      <div className="br-scroll" style={{ flex: 1, overflowY: "auto", padding: "12px 20px 8px" }}>
        <Pill tone="accent" size="sm" icon="sparkle"><T>HERO_EYEBROW</T></Pill>
        <h1 style={{ fontSize: 26, fontWeight: 600, letterSpacing: "-0.025em", lineHeight: 1.1, marginTop: 14, marginBottom: 10 }}>
          Welcome, <T>CLIENT_FIRST_NAME</T>.<br/>
          <span style={{ color: "var(--ink-4)" }}>Let's understand <T>CLIENT_COMPANY</T>.</span>
        </h1>
        <p style={{ fontSize: 13.5, color: "var(--ink-3)", margin: 0, marginBottom: 14, lineHeight: 1.55 }}>
          Six quick sections. We'll build a system that fits precisely.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 16 }}>
          {[
            ["target", "BENEFIT_1_TITLE"],
            ["save",   "BENEFIT_2_TITLE"],
            ["lock",   "BENEFIT_3_TITLE"],
          ].map(([i, t]) => (
            <div key={t} style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <div style={{ width: 26, height: 26, borderRadius: 6, background: "var(--surface)", border: "1px solid var(--line)", display: "grid", placeItems: "center", color: "var(--ink-3)", flexShrink: 0 }}>
                <Icon name={i} size={13}/>
              </div>
              <span style={{ fontSize: 13.5, color: "var(--ink-2)", fontWeight: 500 }}><T>{t}</T></span>
            </div>
          ))}
        </div>

        <Card padding={16} style={{ boxShadow: "var(--shadow-2)" }}>
          <Pill tone="ok" size="sm" icon="check">Invitation verified</Pill>
          <div style={{ fontSize: 16, fontWeight: 600, marginTop: 8, marginBottom: 4 }}>Sign in to continue</div>
          <p style={{ fontSize: 12.5, color: "var(--ink-4)", margin: "0 0 12px 0", lineHeight: 1.5 }}>
            We'll send a secure link to your inbox.
          </p>
          <Field label="Work email">
            <Input value="{CLIENT_EMAIL}" prefix={<Icon name="mail" size={14}/>}/>
          </Field>
        </Card>

        <div style={{ display: "flex", gap: 14, padding: "14px 4px 0", fontSize: 12, color: "var(--ink-4)" }}>
          <div>
            <div className="br-eyebrow" style={{ fontSize: 9 }}>Time</div>
            <div style={{ fontSize: 16, fontWeight: 600, marginTop: 2 }}><T>EST_MIN_LOW</T>–<T>EST_MIN_HIGH</T> min</div>
          </div>
          <div style={{ width: 1, background: "var(--line)" }}/>
          <div>
            <div className="br-eyebrow" style={{ fontSize: 9 }}>Sections</div>
            <div style={{ fontSize: 16, fontWeight: 600, marginTop: 2 }}>6</div>
          </div>
          <div style={{ width: 1, background: "var(--line)" }}/>
          <div>
            <div className="br-eyebrow" style={{ fontSize: 9 }}>Autosave</div>
            <div style={{ fontSize: 13, fontWeight: 500, marginTop: 4, display: "flex", alignItems: "center", gap: 4 }}>
              <Icon name="check" size={12} color="var(--ok)" strokeWidth={2.4}/> Always
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: "12px 16px 18px", borderTop: "1px solid var(--line)", background: "var(--surface)" }}>
        <Button variant="accent" full size="lg" iconRight="arrow_right">Send magic link</Button>
        <div style={{ marginTop: 8, fontSize: 11, color: "var(--ink-5)", textAlign: "center", display: "flex", alignItems: "center", gap: 5, justifyContent: "center" }}>
          <Icon name="lock" size={11}/> 256-bit TLS · 7-day session
        </div>
      </div>
    </MobileBare>
  );
}

// ─────────────────────────────────────────────────────────────
// Mobile · 02 Magic Link (template)
// ─────────────────────────────────────────────────────────────
function MobileMagicLinkT() {
  return (
    <MobileBare>
      <div style={{ padding: "12px 20px 0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div className="br-wordmark" style={{ fontSize: 15 }}><span className="br-mark" style={{ width: 18, height: 18 }}></span>Bridge</div>
        <span className="br-mono" style={{ fontSize: 10, color: "var(--ink-5)" }}><T>SESSION_ID</T></span>
      </div>

      <div style={{ flex: 1, display: "grid", placeItems: "center", padding: "16px 20px" }}>
        <div style={{ textAlign: "center", width: "100%" }}>
          <div style={{ position: "relative", width: 96, height: 96, margin: "0 auto 18px" }}>
            <div style={{ position: "absolute", inset: 0, borderRadius: 999, background: "radial-gradient(circle, rgba(79,70,229,.14) 0%, transparent 60%)" }}/>
            <div style={{ width: 60, height: 60, borderRadius: 16, background: "linear-gradient(135deg, #fff 0%, #f5f5f4 100%)", border: "1px solid var(--line)", display: "grid", placeItems: "center", boxShadow: "var(--shadow-2)", position: "absolute", top: 18, left: 18 }}>
              <Icon name="mail" size={26} color="var(--accent)" strokeWidth={1.4}/>
              <div style={{ position: "absolute", top: -5, right: -5, width: 20, height: 20, borderRadius: 999, background: "var(--ok)", display: "grid", placeItems: "center", color: "#fff", boxShadow: "0 2px 6px rgba(4,120,87,.4)" }}>
                <Icon name="check" size={11} strokeWidth={3}/>
              </div>
            </div>
          </div>

          <h1 style={{ fontSize: 22, fontWeight: 600, letterSpacing: "-0.02em", marginBottom: 8, marginTop: 0 }}>Check your inbox</h1>
          <p style={{ fontSize: 13.5, color: "var(--ink-3)", margin: 0, lineHeight: 1.55 }}>
            A link is on its way to <strong style={{ color: "var(--ink)" }}><T>CLIENT_EMAIL</T></strong>.
          </p>

          <div style={{ marginTop: 20, padding: 14, background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 12, textAlign: "left" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
              <div style={{ width: 7, height: 7, borderRadius: 999, background: "var(--accent)" }}/>
              <span style={{ fontSize: 12, fontWeight: 500 }}>Waiting for confirmation</span>
              <span className="br-mono br-num" style={{ fontSize: 10.5, color: "var(--ink-5)", marginLeft: "auto" }}><T>MM:SS</T></span>
            </div>
            <div style={{ fontSize: 11.5, color: "var(--ink-4)", lineHeight: 1.5 }}>
              Link expires in 15 min · Didn't get it? <span style={{ color: "var(--accent)", fontWeight: 500 }}>resend</span>.
            </div>
          </div>

          <div style={{ marginTop: 16, fontSize: 11.5, color: "var(--ink-5)" }}>
            Wrong email? <span style={{ color: "var(--ink-3)", fontWeight: 500, textDecoration: "underline" }}>Use a different one</span>
          </div>
        </div>
      </div>

      <div style={{ padding: "10px 16px 18px", borderTop: "1px solid var(--line)", fontSize: 10.5, color: "var(--ink-5)", textAlign: "center" }}>
        SOC 2 Type II · GDPR-aligned
      </div>
    </MobileBare>
  );
}

// ─────────────────────────────────────────────────────────────
// Mobile · 02b Resume (template)
// ─────────────────────────────────────────────────────────────
function MobileResumeT() {
  return (
    <MobileBare>
      <div style={{ padding: "12px 20px 0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div className="br-wordmark" style={{ fontSize: 15 }}><span className="br-mark" style={{ width: 18, height: 18 }}></span>Bridge</div>
        <span className="br-mono" style={{ fontSize: 10, color: "var(--ink-5)" }}>RESUMED</span>
      </div>

      <div className="br-scroll" style={{ flex: 1, overflowY: "auto", padding: "16px 20px 12px" }}>
        <Pill tone="accent" size="sm" icon="sparkle">Welcome back, <T>CLIENT_FIRST_NAME</T></Pill>
        <h1 style={{ fontSize: 24, fontWeight: 600, letterSpacing: "-0.025em", lineHeight: 1.15, marginTop: 12, marginBottom: 8 }}>
          We left off mid-<T>LAST_SECTION_NAME</T>.<br/>
          <span style={{ color: "var(--ink-4)" }}>~<T>MIN_LEFT</T> min remaining.</span>
        </h1>
        <p style={{ fontSize: 13, color: "var(--ink-3)", margin: 0, marginBottom: 16, lineHeight: 1.55 }}>
          Everything saved · <T>DONE_COUNT</T> of 6 sections complete.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 4, marginBottom: 14 }}>
          {[
            { letter: "A", title: "Snapshot",  state: "done"   },
            { letter: "B", title: "Services",  state: "done"   },
            { letter: "C", title: "Strategy",  state: "active" },
            { letter: "D", title: "Assets",    state: "todo"   },
            { letter: "E", title: "Goals",     state: "todo"   },
            { letter: "F", title: "Review",    state: "todo"   },
          ].map((s, idx) => (
            <div key={s.letter} style={{
              display: "grid", gridTemplateColumns: "auto 1fr auto", gap: 10, alignItems: "center",
              padding: "10px 12px", borderRadius: 10,
              background: s.state === "active" ? "var(--surface)" : "transparent",
              border: s.state === "active" ? "1.5px solid var(--accent)" : "1px solid transparent",
              boxShadow: s.state === "active" ? "0 0 0 3px rgba(79,70,229,.08)" : "none",
            }}>
              <div style={{
                width: 20, height: 20, borderRadius: 999,
                background: s.state === "done" ? "var(--ink)" : s.state === "active" ? "var(--accent-soft)" : "var(--surface-2)",
                border: s.state === "done" ? "1px solid var(--ink)" : s.state === "active" ? "1.5px solid var(--accent)" : "1.5px solid var(--line-strong)",
                display: "grid", placeItems: "center", color: "#fff", flexShrink: 0,
              }}>
                {s.state === "done" && <Icon name="check" size={10} strokeWidth={3}/>}
                {s.state === "active" && <div style={{ width: 5, height: 5, borderRadius: 999, background: "var(--accent)" }}/>}
                {s.state === "todo" && <span className="br-mono" style={{ fontSize: 9.5, color: "var(--ink-5)" }}>{s.letter}</span>}
              </div>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: s.state === "active" ? 600 : 500, color: s.state === "todo" ? "var(--ink-4)" : "var(--ink)" }}>{s.title}</div>
                <div style={{ fontSize: 11, color: "var(--ink-4)" }}>
                  {s.state === "done" && <T>{`SECTION_${s.letter}_SUMMARY`}</T>}
                  {s.state === "active" && <T>CURRENT_FIELD_LABEL</T>}
                  {s.state === "todo" && "Not started"}
                </div>
              </div>
              <span className="br-mono" style={{ fontSize: 10, color: "var(--ink-5)" }}>
                {s.state === "done" ? <T>{`T_${s.letter}`}</T> : s.state === "active" ? "Now" : "—"}
              </span>
            </div>
          ))}
        </div>

        <div style={{ padding: 12, background: "var(--surface-2)", borderRadius: 10, borderLeft: "3px solid var(--accent)" }}>
          <div className="br-eyebrow" style={{ fontSize: 9.5, marginBottom: 3 }}>You stopped at</div>
          <div style={{ fontSize: 13, fontWeight: 600 }}>Section <T>LAST_SECTION_LETTER</T> · <T>LAST_FIELD_LABEL</T></div>
          <div style={{ fontSize: 11.5, color: "var(--ink-4)", marginTop: 2 }}><T>LAST_FIELD_PROGRESS_NOTE</T></div>
        </div>

        <div style={{ marginTop: 12, padding: 10, background: "var(--surface-2)", border: "1px dashed var(--line-strong)", borderRadius: 8, fontSize: 11, color: "var(--ink-4)", display: "flex", alignItems: "center", gap: 8 }}>
          <Icon name="info" size={12}/>
          Last device: <T>LAST_DEVICE</T>. Now on iPhone — no action needed.
        </div>
      </div>

      <div style={{ padding: "12px 16px 18px", borderTop: "1px solid var(--line)", background: "var(--surface)" }}>
        <Button variant="accent" full size="lg" iconRight="arrow_right">Continue Section <T>LAST_SECTION_LETTER</T></Button>
      </div>
    </MobileBare>
  );
}

// ─────────────────────────────────────────────────────────────
// Mobile · 03 Snapshot (template)
// ─────────────────────────────────────────────────────────────
function MobileSnapshotT() {
  return (
    <MobileFrame
      step={1}
      total={6}
      title={{ tag: "A · Foundations", main: "The basics, first.", sub: "Six quick fields." }}
      foot={
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span className="br-mono" style={{ fontSize: 11, color: "var(--ink-5)", flex: 1 }}>Autosaved · 2s</span>
          <Button variant="accent" size="md" iconRight="arrow_right">Continue</Button>
        </div>
      }
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <Field label="What kind of business?">
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {[["Single loc.", "building"], ["Multi-loc.", "layers"], ["Franchise", "globe"], ["Mobile", "map"]].map(([l, i]) => (
              <Chip key={l} icon={i} size="sm">{l}</Chip>
            ))}
          </div>
          <div className="br-cap" style={{ marginTop: 4 }}>Selected: <T>BUSINESS_TYPE</T></div>
        </Field>

        <Field label="Industry">
          <Input value="{INDUSTRY}" prefix={<Icon name="search" size={14}/>}/>
          <div style={{ display: "flex", gap: 6, marginTop: 6 }}>
            <Pill tone="accent" size="sm"><T>INDUSTRY_TAXONOMY</T></Pill>
          </div>
        </Field>

        <Field label="HQ">
          <Input value="{HQ_CITY_STATE}" prefix={<Icon name="map" size={14}/>}/>
          <div className="br-cap" style={{ marginTop: 4 }}>Locations: <T>LOCATIONS_LIST</T></div>
        </Field>

        <Field label="Company size">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 4 }}>
            {["1–5", "6–15", "16–50", "51–150", "150+"].map((r) => (
              <button key={r} className="br-focus" style={{
                padding: "8px 4px", borderRadius: 8, cursor: "pointer", fontFamily: "var(--font-sans)",
                background: "var(--surface)", color: "var(--ink-2)",
                border: "1px solid var(--line-strong)", fontSize: 11, fontWeight: 500,
              }}>
                <div className="br-mono br-num" style={{ fontSize: 12, fontWeight: 600 }}>{r}</div>
              </button>
            ))}
          </div>
          <div className="br-cap" style={{ marginTop: 4 }}>Selected: <T>SIZE_RANGE</T></div>
        </Field>

        <Field label="Revenue stage">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {[["Pre-rev", "$0"], ["Early", "<$500K"], ["Established", "$500K–$5M"], ["Scaling", "$5M+"]].map(([l, s]) => (
              <SelectCard key={l} title={l} subtitle={s}/>
            ))}
          </div>
          <div className="br-cap" style={{ marginTop: 4 }}>Selected: <T>REVENUE_STAGE</T></div>
        </Field>

        <Field label="Main marketing goal?" ai>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              ["users", "PRIMARY_GOAL_1_TITLE"],
              ["target", "PRIMARY_GOAL_2_TITLE"],
              ["megaphone", "PRIMARY_GOAL_3_TITLE"],
            ].map(([i, t]) => (
              <SelectCard key={t} icon={i} title={<T>{t}</T>}/>
            ))}
          </div>
        </Field>
      </div>
    </MobileFrame>
  );
}

// ─────────────────────────────────────────────────────────────
// Mobile · 04 Services (template)
// ─────────────────────────────────────────────────────────────
function MobileServicesT() {
  return (
    <MobileFrame
      step={2}
      total={6}
      title={{ tag: "B · Scope", main: "What are we building?", sub: "Each one adapts the rest." }}
      foot={
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span className="br-mono" style={{ fontSize: 11, color: "var(--ink-5)", flex: 1 }}><T>SELECTED_COUNT</T> selected · <T>QUESTION_COUNT</T> q's</span>
          <Button variant="accent" size="md" iconRight="arrow_right">Continue</Button>
        </div>
      }
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {[
          { icon: "monitor", title: "Website design", desc: "Site, landing, conversion",  q: 4 },
          { icon: "megaphone", title: "Paid ads",     desc: "Meta · Google · TikTok",    q: 5 },
          { icon: "search", title: "SEO",             desc: "Local, on-page, content",   q: 4 },
          { icon: "brush", title: "Branding",         desc: "Identity, voice, guides",   q: 3 },
          { icon: "pen", title: "Content marketing",  desc: "Editorial, social, video",  q: 3 },
          { icon: "bolt", title: "Automation / CRM",  desc: "Workflows, attribution",    q: 4 },
        ].map((s) => (
          <div key={s.title} style={{
            display: "flex", alignItems: "center", gap: 12, padding: "12px 14px",
            background: "var(--surface)", border: "1px solid var(--line-strong)",
            borderRadius: 12, boxShadow: "var(--shadow-1)",
          }}>
            <div style={{
              width: 32, height: 32, borderRadius: 8,
              background: "var(--surface-2)", color: "var(--ink-3)",
              border: "1px solid var(--line)", display: "grid", placeItems: "center", flexShrink: 0,
            }}>
              <Icon name={s.icon} size={15}/>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 14, fontWeight: 600 }}>{s.title}</div>
              <div style={{ fontSize: 12, color: "var(--ink-4)" }}>{s.desc} · {s.q} q's</div>
            </div>
            <div style={{
              width: 22, height: 22, borderRadius: 999, flexShrink: 0,
              border: "1.5px solid var(--line-strong)",
            }}/>
          </div>
        ))}

        <div style={{ marginTop: 8 }}>
          <AICallout title="Heads up">
            Based on <T>PRIMARY_GOAL</T> + <T>LOCALE</T>, consider <strong style={{ color: "var(--ink)" }}><T>AI_SUGGESTED_SERVICE</T></strong>. We can flag for your proposal.
          </AICallout>
        </div>
      </div>
    </MobileFrame>
  );
}

// ─────────────────────────────────────────────────────────────
// Mobile · 05 Strategy (template)
// ─────────────────────────────────────────────────────────────
function MobileStrategyT() {
  return (
    <MobileFrame
      step={3}
      total={6}
      title={{ tag: "C · Intelligence", main: "How you see your business.", sub: "Talk to us. We'll structure it." }}
      foot={
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span className="br-mono" style={{ fontSize: 11, color: "var(--ink-5)", flex: 1 }}><T>FIELDS_FILLED</T> fields · <T>AI_SUGGESTED_COUNT</T> AI</span>
          <Button variant="accent" size="md" iconRight="arrow_right">Continue</Button>
        </div>
      }
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <Card padding={14} style={{ borderColor: "#ddd6fe", background: "linear-gradient(180deg, #faf8ff 0%, #fff 100%)" }}>
          <Field label={<>Describe <T>CLIENT_COMPANY</T> in your words</>} ai>
            <Textarea rows={4} value="{FREE_TEXT_DESCRIPTION}" shimmer/>
          </Field>
          <div style={{ marginTop: 10, fontSize: 11, color: "var(--ai)", display: "flex", alignItems: "center", gap: 5 }}>
            <Icon name="sparkle" size={11}/> Bridge extracted <T>EXTRACTED_FIELD_COUNT</T> fields.
          </div>
        </Card>

        <Card padding={14}>
          <div className="br-eyebrow" style={{ fontSize: 9.5, marginBottom: 4 }}>Ideal customer (ICP)</div>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 10 }}>Who you serve best</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              ["Demographics", ["DEMO_1", "DEMO_2"]],
              ["Geography",    ["GEO_1", "GEO_2"]],
              ["Mindset",      ["MINDSET_1", "MINDSET_2"]],
            ].map(([k, keys]) => (
              <div key={k}>
                <div className="br-mono" style={{ fontSize: 9.5, color: "var(--ink-5)", textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 4 }}>{k}</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                  {keys.map((p, i) => <Pill key={i} size="sm" tone="neutral"><T>{p}</T></Pill>)}
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card padding={14}>
          <div className="br-eyebrow" style={{ fontSize: 9.5, marginBottom: 4 }}>Competitors</div>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 10 }}>Who you're up against</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {[1, 2].map((n) => (
              <div key={n} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 10px", background: "var(--surface-2)", border: "1px solid var(--line)", borderRadius: 8 }}>
                <div style={{ width: 20, height: 20, borderRadius: 5, background: "#fff", border: "1px solid var(--line)", display: "grid", placeItems: "center", fontSize: 10, fontWeight: 600, color: "var(--ink-3)" }}>
                  <T>{`C${n}`}</T>
                </div>
                <span style={{ flex: 1, fontSize: 12, fontWeight: 500 }}><T>{`COMPETITOR_${n}_NAME`}</T></span>
                <span className="br-mono" style={{ fontSize: 9.5, color: "var(--ink-5)" }}><T>{`COMP_${n}_CTX`}</T></span>
              </div>
            ))}
            <button style={{ padding: "8px", borderRadius: 8, background: "transparent", border: "1px dashed var(--line-strong)", color: "var(--ink-4)", cursor: "pointer", fontSize: 12, fontFamily: "var(--font-sans)", display: "flex", alignItems: "center", gap: 5, justifyContent: "center" }}>
              <Icon name="plus" size={12}/> Add competitor URL
            </button>
          </div>
        </Card>
      </div>
    </MobileFrame>
  );
}

// ─────────────────────────────────────────────────────────────
// Mobile · 06 Assets (template)
// ─────────────────────────────────────────────────────────────
function MobileAssetsT() {
  return (
    <MobileFrame
      step={4}
      total={6}
      title={{ tag: "D · Materials", main: "Drop in what you have.", sub: "We auto-tag and flag missing." }}
      foot={
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span className="br-mono" style={{ fontSize: 11, color: "var(--ink-5)", flex: 1 }}><T>UPLOADED_COUNT</T>/<T>TOTAL_COUNT</T> · <T>MISSING_COUNT</T> needed</span>
          <Button variant="accent" size="md" iconRight="arrow_right">Continue</Button>
        </div>
      }
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <div style={{
          border: "1.5px dashed var(--accent)", borderRadius: 12,
          background: "linear-gradient(180deg, #faf8ff 0%, #fff 100%)",
          padding: "20px 14px", textAlign: "center",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
        }}>
          <div style={{ width: 40, height: 40, borderRadius: 10, background: "var(--surface)", border: "1px solid var(--accent-soft-2)", display: "grid", placeItems: "center", color: "var(--accent)", boxShadow: "var(--shadow-1)" }}>
            <Icon name="upload" size={18}/>
          </div>
          <div style={{ fontSize: 13, fontWeight: 600, marginTop: 2 }}>Tap to upload</div>
          <div className="br-cap">SVG, PNG, JPG, PDF · or photo library</div>
        </div>

        <div className="br-eyebrow" style={{ fontSize: 9.5, marginTop: 2 }}>Uploaded · <T>UPLOADED_COUNT</T> files</div>

        {[1, 2, 3, 4, 5].map((n) => {
          const warn = n === 4;
          return (
            <div key={n} style={{
              display: "flex", alignItems: "center", gap: 10, padding: "10px 12px",
              border: "1px solid var(--line)", borderRadius: 10, background: "var(--surface)",
            }}>
              <div style={{ width: 28, height: 28, borderRadius: 6, background: "var(--surface-2)", border: "1px solid var(--line)", display: "grid", placeItems: "center", color: "var(--ink-3)", flexShrink: 0 }}>
                <Icon name={n % 2 === 0 ? "file" : "image"} size={13}/>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 12, fontWeight: 500 }}><T>{`FILE_${n}_NAME`}</T></div>
                <div style={{ display: "flex", gap: 4, marginTop: 2, alignItems: "center" }}>
                  <Pill size="sm" tone="neutral"><T>{`FILE_${n}_TAG`}</T></Pill>
                  <span className="br-mono" style={{ fontSize: 9.5, color: "var(--ink-5)" }}><T>{`FILE_${n}_SIZE`}</T></span>
                </div>
              </div>
              {warn ? <Icon name="alert" size={13} color="var(--warn)"/> : <Icon name="check" size={13} color="var(--ok)" strokeWidth={2.4}/>}
            </div>
          );
        })}

        <Card padding={14} style={{ marginTop: 4 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
            <div className="br-eyebrow" style={{ fontSize: 9.5 }}>Still needed</div>
            <Pill tone="warn" size="sm"><T>MISSING_COUNT</T> missing</Pill>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {[1, 2, 3].map((n) => (
              <div key={n} style={{ display: "flex", alignItems: "center", gap: 8, padding: "4px 0" }}>
                <div style={{ width: 14, height: 14, borderRadius: 4, background: "var(--surface)", border: "1.5px solid var(--line-strong)", flexShrink: 0 }}/>
                <span style={{ fontSize: 12.5, color: "var(--ink)" }}><T>{`MISSING_${n}`}</T></span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </MobileFrame>
  );
}

// ─────────────────────────────────────────────────────────────
// Mobile · 07 Goals (template)
// ─────────────────────────────────────────────────────────────
function MobileGoalsT() {
  return (
    <MobileFrame
      step={5}
      total={6}
      title={{ tag: "E · Targets", main: "What does success look like?", sub: "Set numbers we'll report against." }}
      foot={
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span className="br-mono" style={{ fontSize: 11, color: "var(--ink-5)", flex: 1 }}><T>GOAL_COUNT</T> goals · <T>TARGET_COUNT</T> targets</span>
          <Button variant="accent" size="md" iconRight="arrow_right">Continue</Button>
        </div>
      }
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <div className="br-eyebrow" style={{ fontSize: 9.5 }}>Goals you care about</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          {[
            ["users", "GOAL_1_TITLE"],
            ["target", "GOAL_2_TITLE"],
            ["bolt", "GOAL_3_TITLE"],
            ["building", "GOAL_4_TITLE"],
            ["star", "GOAL_5_TITLE"],
            ["search", "GOAL_6_TITLE"],
          ].map(([i, t]) => (
            <SelectCard key={t} icon={i} title={<T>{t}</T>}/>
          ))}
        </div>

        <Card padding={14} style={{ marginTop: 4 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
            <div>
              <div className="br-eyebrow" style={{ fontSize: 9.5 }}>12-month targets</div>
              <div style={{ fontSize: 14, fontWeight: 600, marginTop: 2 }}>Numbers to hit</div>
            </div>
            <Pill tone="ai" size="sm" icon="sparkle">AI</Pill>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {[1, 2, 3, 4].map((n) => (
              <div key={n}>
                <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 4 }}>
                  <span style={{ fontSize: 12.5, fontWeight: 500 }}><T>{`TARGET_${n}_LABEL`}</T></span>
                  <span className="br-mono" style={{ fontSize: 10, color: "var(--ink-5)" }}><T>{`TARGET_${n}_NOTE`}</T></span>
                </div>
                <Slider value={50 + n * 8} min={0} max={100} format={(v) => `${v}`}/>
              </div>
            ))}
          </div>
        </Card>

        <Card padding={14}>
          <div className="br-eyebrow" style={{ fontSize: 9.5, marginBottom: 4 }}>Priority order</div>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>Drag to rank</div>
          <div className="br-cap" style={{ marginBottom: 10 }}>#1 is what we win at first.</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {[1, 2, 3, 4].map((n, i) => (
              <div key={n} style={{
                display: "flex", alignItems: "center", gap: 8, padding: "8px 10px",
                border: "1px solid var(--line)", borderRadius: 8, background: "var(--surface)",
              }}>
                <Icon name="drag" size={14} color="var(--ink-5)"/>
                <div style={{
                  width: 22, height: 22, borderRadius: 6, flexShrink: 0,
                  background: i === 0 ? "var(--ink)" : "var(--surface-2)",
                  color: i === 0 ? "#fff" : "var(--ink-3)",
                  display: "grid", placeItems: "center", fontWeight: 600, fontSize: 11,
                }}>{i + 1}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12.5, fontWeight: 500 }}><T>{`PRIORITY_${n}_TITLE`}</T></div>
                  <div style={{ fontSize: 10.5, color: "var(--ink-4)" }}><T>{`PRIORITY_${n}_NOTE`}</T></div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </MobileFrame>
  );
}

// ─────────────────────────────────────────────────────────────
// Mobile · 08 Review (template)
// ─────────────────────────────────────────────────────────────
function MobileReviewT() {
  return (
    <MobileFrame
      step={6}
      total={6}
      title={{ tag: "F · Confirmation", main: "Here's how we understand it.", sub: "Read back. Edit anything off." }}
      foot={<Button variant="accent" full size="md" iconRight="arrow_right">Submit & generate</Button>}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <AICallout title="Bridge summary">
          <T>CLIENT_COMPANY</T> is a <T>BUSINESS_TYPE_DESCRIPTION</T> in <T>HQ_CITY_STATE</T>. Primary pressure: <T>PRIMARY_PRESSURE</T>. Scoping <T>SERVICES_SELECTED</T>.
        </AICallout>

        <Card padding={14}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 8 }}>
            <span className="br-num" style={{ fontSize: 28, fontWeight: 600 }}><T>QUALITY_SCORE</T></span>
            <span style={{ fontSize: 12, color: "var(--ink-4)" }}>/ 100 readiness</span>
            <Pill tone="ok" size="sm" icon="check" style={{ marginLeft: "auto" }}>Proposal-ready</Pill>
          </div>
          <div style={{ height: 5, borderRadius: 999, background: "var(--surface-3)", overflow: "hidden" }}>
            <div style={{ height: "100%", width: "94%", background: "linear-gradient(90deg, var(--accent), var(--ok))" }}/>
          </div>
        </Card>

        {[
          ["A", "Snapshot", "SECTION_A_REVIEW_SUMMARY", "ok"],
          ["B", "Services", "SECTION_B_REVIEW_SUMMARY", "ok"],
          ["C", "Strategy", "SECTION_C_REVIEW_SUMMARY", "warn"],
          ["D", "Assets",   "SECTION_D_REVIEW_SUMMARY", "warn"],
          ["E", "Goals",    "SECTION_E_REVIEW_SUMMARY", "ok"],
        ].map(([s, t, k, tone]) => (
          <div key={t} style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 13px", background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 10 }}>
            <span className="br-mono" style={{ fontSize: 10, color: "var(--ink-5)" }}>{s}</span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 600 }}>{t}</div>
              <div style={{ fontSize: 11.5, color: "var(--ink-4)" }}><T>{k}</T></div>
            </div>
            {tone === "ok" ? <Icon name="check" size={14} color="var(--ok)" strokeWidth={2.4}/> : <Icon name="alert" size={14} color="var(--warn)"/>}
          </div>
        ))}
      </div>
    </MobileFrame>
  );
}

// ─────────────────────────────────────────────────────────────
// Mobile · 09 Complete (template)
// ─────────────────────────────────────────────────────────────
function MobileCompleteT() {
  return (
    <MobileBare>
      <div style={{ padding: "12px 20px 0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div className="br-wordmark" style={{ fontSize: 15 }}><span className="br-mark" style={{ width: 18, height: 18 }}></span>Bridge</div>
        <span className="br-mono" style={{ fontSize: 10, color: "var(--ink-5)" }}>SUBMITTED · <T>SUBMIT_TIME</T></span>
      </div>

      <div className="br-scroll" style={{ flex: 1, overflowY: "auto", padding: "20px 20px 12px" }}>
        <div style={{
          width: 48, height: 48, borderRadius: 12,
          background: "linear-gradient(135deg, var(--ok) 0%, #059669 100%)",
          display: "grid", placeItems: "center", color: "#fff",
          boxShadow: "0 8px 20px -4px rgba(4,120,87,.4)", marginBottom: 16,
        }}>
          <Icon name="check" size={24} strokeWidth={2.6}/>
        </div>
        <h1 style={{ fontSize: 24, fontWeight: 600, letterSpacing: "-0.025em", lineHeight: 1.15, marginTop: 0, marginBottom: 8 }}>
          You're handed off,<br/><T>CLIENT_FIRST_NAME</T>.
        </h1>
        <p style={{ fontSize: 13.5, color: "var(--ink-3)", margin: 0, marginBottom: 16, lineHeight: 1.55 }}>
          Bridge routed everything you shared to the five systems that run your account.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 16 }}>
          {[
            ["Time", "TIME_SPENT"],
            ["Fields", "FIELD_COUNT"],
            ["Files", "FILE_COUNT"],
            ["Quality", "QUALITY_SCORE_OUT_OF"],
          ].map(([k, v]) => (
            <div key={k} style={{ padding: 10, background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 8 }}>
              <div className="br-eyebrow" style={{ fontSize: 9 }}>{k}</div>
              <div className="br-num" style={{ fontSize: 16, fontWeight: 600, marginTop: 2 }}><T>{v}</T></div>
            </div>
          ))}
        </div>

        <div className="br-eyebrow" style={{ fontSize: 9.5, marginBottom: 8 }}>Where your data went</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {[
            { name: "Dock",    desc: "Client record created", status: "done",   icon: "folder" },
            { name: "Compass", desc: "Drafting proposal",     status: "doing",  icon: "file"   },
            { name: "Deck",    desc: "Provisioning portal",   status: "queued", icon: "layers" },
            { name: "Radar",   desc: "Baseline import",       status: "queued", icon: "target" },
            { name: "Beacon",  desc: "Workflows staged",      status: "queued", icon: "bolt"   },
          ].map((app) => (
            <div key={app.name} style={{
              display: "flex", alignItems: "center", gap: 10, padding: "10px 12px",
              background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 10,
            }}>
              <div style={{
                width: 28, height: 28, borderRadius: 7, flexShrink: 0,
                background: app.status === "done" ? "var(--ok-soft)" : app.status === "doing" ? "var(--accent-soft)" : "var(--surface-2)",
                color: app.status === "done" ? "var(--ok)" : app.status === "doing" ? "var(--accent)" : "var(--ink-4)",
                border: `1px solid ${app.status === "done" ? "#a7f3d0" : app.status === "doing" ? "var(--accent-soft-2)" : "var(--line)"}`,
                display: "grid", placeItems: "center",
              }}>
                <Icon name={app.icon} size={13}/>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{app.name}</div>
                <div style={{ fontSize: 11, color: "var(--ink-4)" }}>{app.desc}</div>
              </div>
              {app.status === "done" && <Pill tone="ok" size="sm" icon="check">Synced</Pill>}
              {app.status === "doing" && <Pill tone="accent" size="sm">Running</Pill>}
              {app.status === "queued" && <span className="br-mono" style={{ fontSize: 9.5, color: "var(--ink-5)" }}>queued</span>}
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: "12px 16px 18px", borderTop: "1px solid var(--line)", background: "var(--surface)", display: "flex", flexDirection: "column", gap: 6 }}>
        <Button variant="primary" size="md" full iconRight="arrow_right">Open client portal</Button>
        <div style={{ fontSize: 10.5, color: "var(--ink-5)", textAlign: "center" }}>
          Proposal arrives by email in ~<T>ETA_MIN</T> min
        </div>
      </div>
    </MobileBare>
  );
}

Object.assign(window, {
  MobileLandingT, MobileMagicLinkT, MobileResumeT, MobileSnapshotT, MobileServicesT,
  MobileStrategyT, MobileAssetsT, MobileGoalsT, MobileReviewT, MobileCompleteT,
});
