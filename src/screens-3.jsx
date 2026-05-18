/* global React, Icon, Button, Field, Input, Textarea, Chip, Pill, Card, SelectCard, Toggle, Slider, ProgressRail, StepFooter, AICallout, ClientBar, SECTIONS */
// Bridge — extras: resume state, edge states, data schema, integration map

// ─────────────────────────────────────────────────────────────
// 10 — Resume state (returning user picks up where they left off)
// ─────────────────────────────────────────────────────────────
function ScreenResume() {
  return (
    <div className="br-frame" style={{ background: "var(--bg)" }}>
      <div style={{ padding: "24px 56px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
        <div className="br-wordmark"><span className="br-mark"></span>Bridge</div>
        <span className="br-mono" style={{ fontSize: 11, color: "var(--ink-5)" }}>SESSION · LSD-7F2A-9E · RESUMED</span>
      </div>

      <div style={{ flex: 1, display: "grid", placeItems: "center", padding: "16px 32px" }}>
        <div style={{ width: 640, maxWidth: "100%" }}>
          {/* Greeting */}
          <Pill tone="accent" size="md" icon="sparkle">Welcome back, Sarah</Pill>
          <h1 className="br-h1" style={{ fontSize: 36, marginTop: 14, marginBottom: 8, letterSpacing: "-0.025em" }}>
            We left off mid-Strategy.<br/>
            <span style={{ color: "var(--ink-4)" }}>Pick up where you were — it'll only take 6 more minutes.</span>
          </h1>
          <p className="br-bodyLg" style={{ margin: 0, marginBottom: 28 }}>
            Everything you've shared is saved. We auto-resumed your session from any device with the same magic link.
          </p>

          {/* Session card */}
          <Card padding={22} style={{ marginBottom: 18, boxShadow: "var(--shadow-2)" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
              <div>
                <div className="br-eyebrow">Your progress so far</div>
                <div style={{ fontSize: 16, fontWeight: 600, marginTop: 4, letterSpacing: "-0.005em" }}>2 of 6 sections complete</div>
              </div>
              <Pill tone="ok" size="sm" icon="check">Autosaved · 2d ago</Pill>
            </div>

            {/* Mini section progress */}
            <div style={{ display: "flex", flexDirection: "column", gap: 4, marginBottom: 14 }}>
              {[
                { ...SECTIONS[0], state: "done",   summary: "Multi-loc · dental · Burlington VT · 16–50 people",        time: "Mon · 1m 42s" },
                { ...SECTIONS[1], state: "done",   summary: "4 services selected · Website, Paid, SEO, Automation",     time: "Mon · 3m 18s" },
                { ...SECTIONS[2], state: "active", summary: "ICP draft from AI · 1 competitor remaining",                time: "In progress" },
                { ...SECTIONS[3], state: "todo",   summary: "Not started",                                                time: "—" },
                { ...SECTIONS[4], state: "todo",   summary: "Not started",                                                time: "—" },
                { ...SECTIONS[5], state: "todo",   summary: "Not started",                                                time: "—" },
              ].map((s, i) => (
                <div key={s.id} style={{
                  display: "grid", gridTemplateColumns: "auto 1fr auto", gap: 12, alignItems: "center",
                  padding: "10px 12px", borderRadius: 8,
                  background: s.state === "active" ? "var(--surface)" : "transparent",
                  border: s.state === "active" ? "1.5px solid var(--accent)" : "1px solid transparent",
                  boxShadow: s.state === "active" ? "0 0 0 3px rgba(79,70,229,.08)" : "none",
                }}>
                  <div style={{
                    width: 22, height: 22, borderRadius: 999,
                    background: s.state === "done" ? "var(--ink)" : s.state === "active" ? "var(--accent-soft)" : "var(--surface-2)",
                    border: s.state === "done" ? "1px solid var(--ink)" : s.state === "active" ? "1.5px solid var(--accent)" : "1.5px solid var(--line-strong)",
                    display: "grid", placeItems: "center", color: "#fff", flexShrink: 0,
                  }}>
                    {s.state === "done" && <Icon name="check" size={11} strokeWidth={3}/>}
                    {s.state === "active" && <div style={{ width: 6, height: 6, borderRadius: 999, background: "var(--accent)" }}/>}
                    {s.state === "todo" && <span className="br-mono" style={{ fontSize: 10, color: "var(--ink-5)" }}>{i + 1}</span>}
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ fontSize: 13.5, fontWeight: s.state === "active" ? 600 : 500, color: s.state === "todo" ? "var(--ink-4)" : "var(--ink)" }}>{s.title}</span>
                      {s.state === "active" && <Pill tone="accent" size="sm">Resume here</Pill>}
                    </div>
                    <div style={{ fontSize: 12, color: "var(--ink-4)", marginTop: 1 }}>{s.summary}</div>
                  </div>
                  <span className="br-mono" style={{ fontSize: 10.5, color: "var(--ink-5)" }}>{s.time}</span>
                </div>
              ))}
            </div>

            {/* Field-level resume detail */}
            <div style={{ padding: 14, background: "var(--surface-2)", borderRadius: 10, borderLeft: "3px solid var(--accent)" }}>
              <div className="br-eyebrow" style={{ fontSize: 9.5, marginBottom: 4 }}>You stopped at</div>
              <div style={{ fontSize: 13.5, fontWeight: 600, marginBottom: 4 }}>Section C · Strategy Inputs · Competitor list</div>
              <div style={{ fontSize: 12.5, color: "var(--ink-3)" }}>2 of 3 competitor URLs entered · drafted ICP looks right (you can edit any field).</div>
            </div>
          </Card>

          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <Button variant="accent" size="lg" iconRight="arrow_right">Continue from Section C</Button>
            <Button variant="outline" size="md" icon="info">Review what I've shared</Button>
            <div style={{ flex: 1 }}/>
            <span className="br-mono" style={{ fontSize: 11, color: "var(--ink-5)" }}>~6 MIN REMAINING</span>
          </div>

          <div style={{ marginTop: 22, padding: 14, background: "var(--surface-2)", border: "1px dashed var(--line-strong)", borderRadius: 10, display: "flex", gap: 12, alignItems: "center" }}>
            <Icon name="info" size={15} color="var(--ink-4)"/>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12.5, fontWeight: 500 }}>This is a different device than last time.</div>
              <div style={{ fontSize: 11.5, color: "var(--ink-4)", marginTop: 2 }}>Last opened from a Mac (Burlington, VT) on Monday — now on iPhone. No action needed; we keep your session keyed to the magic link.</div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: "16px 56px", borderTop: "1px solid var(--line)", fontSize: 11, color: "var(--ink-5)", display: "flex", justifyContent: "space-between", flexShrink: 0 }}>
        <span>Session expires Sept 9 · 7 days remaining</span>
        <span>Not Sarah? <span style={{ color: "var(--ink-3)", fontWeight: 500, textDecoration: "underline", textUnderlineOffset: 3 }}>Sign out</span></span>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 11 — Edge states (one canvas, 4 representative states)
// ─────────────────────────────────────────────────────────────
function ScreenEdgeStates() {
  return (
    <div className="br-frame" style={{ background: "linear-gradient(180deg, #fafaf9 0%, #f5f5f4 100%)", padding: "28px 32px 36px", overflow: "auto" }}>
      <div style={{ marginBottom: 22 }}>
        <Pill tone="dark" size="sm">Edge & error states</Pill>
        <h1 className="br-h1" style={{ fontSize: 26, marginTop: 10, marginBottom: 4 }}>The unhappy paths, designed.</h1>
        <p className="br-body" style={{ margin: 0, maxWidth: 720 }}>
          Bridge degrades visibly, never silently. Every error preserves state — the user can correct and continue without losing what they've shared.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>

        {/* A · Expired link */}
        <Card padding={0} style={{ overflow: "hidden" }}>
          <EdgeHeader letter="A" name="Expired magic link" note="Clicked an old email"/>
          <div style={{ padding: 28, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 12, minHeight: 280 }}>
            <div style={{
              width: 56, height: 56, borderRadius: 14,
              background: "var(--warn-soft)", color: "var(--warn)",
              border: "1px solid #fcd34d", display: "grid", placeItems: "center",
            }}>
              <Icon name="alert" size={24}/>
            </div>
            <h3 className="br-h3" style={{ fontSize: 18, marginTop: 4, marginBottom: 0 }}>Your sign-in link expired</h3>
            <p style={{ margin: 0, fontSize: 13.5, color: "var(--ink-3)", lineHeight: 1.55, maxWidth: 360 }}>
              Magic links expire after 15 minutes for security. Your session and everything you've shared is safe — just request a fresh link.
            </p>
            <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
              <Button variant="accent" size="md" icon="mail">Send a new link</Button>
              <Button variant="ghost" size="md">Use a different email</Button>
            </div>
            <div style={{ marginTop: 6 }}>
              <Pill tone="ok" size="sm" icon="check">Session preserved · LSD-7F2A · Section C of 6</Pill>
            </div>
          </div>
        </Card>

        {/* B · Network loss / autosave fail */}
        <Card padding={0} style={{ overflow: "hidden" }}>
          <EdgeHeader letter="B" name="Connection lost · mid-flow" note="Autosave retrying"/>
          <div style={{ padding: 22, display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, padding: 14, background: "var(--err-soft)", border: "1px solid #fecaca", borderRadius: 10 }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: "#fff", border: "1px solid #fecaca", color: "var(--err)", display: "grid", placeItems: "center", flexShrink: 0 }}>
                <Icon name="alert" size={15}/>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: "var(--err)" }}>You're offline</div>
                <div style={{ fontSize: 12, color: "var(--ink-3)", marginTop: 2 }}>Bridge is buffering your last 3 edits locally · auto-sync when you reconnect.</div>
              </div>
              <Button variant="outline" size="sm">Retry now</Button>
            </div>

            <div style={{ padding: 14, background: "var(--surface-2)", borderRadius: 10 }}>
              <div className="br-eyebrow" style={{ fontSize: 9.5, marginBottom: 8 }}>Buffered edits · waiting to sync</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {[
                  ["Strategy · ICP geography", "Added 'Chittenden County · <20 min commute'", "2m ago"],
                  ["Strategy · competitor #2", "smile-burlington.com", "1m ago"],
                  ["Strategy · constraints",   "Toggled 'Reviews stuck at 4.4★'",            "32s ago"],
                ].map(([f, v, t]) => (
                  <div key={f} style={{ display: "grid", gridTemplateColumns: "auto 1fr auto auto", gap: 8, alignItems: "center", padding: "4px 0" }}>
                    <span style={{ width: 6, height: 6, borderRadius: 999, background: "var(--warn)" }}/>
                    <div style={{ minWidth: 0 }}>
                      <div className="br-mono" style={{ fontSize: 10, color: "var(--ink-5)" }}>{f}</div>
                      <div style={{ fontSize: 12, color: "var(--ink-2)" }}>{v}</div>
                    </div>
                    <span className="br-mono" style={{ fontSize: 10, color: "var(--ink-5)" }}>{t}</span>
                    <Pill tone="warn" size="sm">Queued</Pill>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ fontSize: 11.5, color: "var(--ink-4)", display: "flex", alignItems: "center", gap: 6 }}>
              <Icon name="info" size={11}/> Bridge keeps the last 24h of edits in your browser. Refreshing the page won't lose work.
            </div>
          </div>
        </Card>

        {/* C · Invalid input / conflicting answer */}
        <Card padding={0} style={{ overflow: "hidden" }}>
          <EdgeHeader letter="C" name="Conflicting input detected" note="Inline correction"/>
          <div style={{ padding: 22, display: "flex", flexDirection: "column", gap: 14 }}>
            <Field label="Current URL" hint="Section B · Website">
              <div style={{
                display: "flex", alignItems: "center",
                background: "var(--surface)", border: "1.5px solid var(--err)",
                borderRadius: 8, padding: "0 12px", height: 40,
                boxShadow: "0 0 0 3px rgba(185, 28, 28, .08)",
              }}>
                <Icon name="globe" size={15} color="var(--err)"/>
                <input
                  value="ttp://lakesidedental"
                  style={{ flex: 1, marginLeft: 8, height: "100%", border: "none", outline: "none", background: "transparent", fontFamily: "var(--font-sans)", fontSize: 14, color: "var(--ink)" }}
                  readOnly
                />
                <Icon name="alert" size={15} color="var(--err)"/>
              </div>
              <div style={{ marginTop: 6, fontSize: 12, color: "var(--err)", display: "flex", alignItems: "center", gap: 4 }}>
                <Icon name="alert" size={11}/> That doesn't look like a valid URL. Did you mean <strong>lakesidedental.com</strong>?
              </div>
            </Field>

            <div style={{ padding: 14, background: "var(--ai-soft)", border: "1px solid #ddd6fe", borderRadius: 10, display: "flex", gap: 10, alignItems: "flex-start" }}>
              <Icon name="sparkle" size={14} color="var(--ai)"/>
              <div style={{ flex: 1, fontSize: 12.5, color: "var(--ink-2)" }}>
                <div style={{ fontWeight: 600, color: "var(--ai)", marginBottom: 2 }}>Two answers don't quite line up</div>
                You said "No website" in question 1, but entered a URL in question 2. Pick whichever is right — Bridge will adjust the follow-ups automatically.
              </div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <Button variant="outline" size="sm">I have a site · keep URL</Button>
              <Button variant="outline" size="sm">No site · clear URL</Button>
            </div>
          </div>
        </Card>

        {/* D · Upload validation */}
        <Card padding={0} style={{ overflow: "hidden" }}>
          <EdgeHeader letter="D" name="File validation warnings" note="Section D · Assets"/>
          <div style={{ padding: 22, display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              {
                name: "lakeside-logo.heic", size: "HEIC · 4.2 MB", state: "err",
                msg: "HEIC isn't supported. Convert to PNG, SVG, or JPG.",
                action: "Re-upload",
              },
              {
                name: "office-burlington-01.jpg", size: "JPG · 3.4 MB · 1200×800",
                state: "warn",
                msg: "Below recommended 2000px. We'll use it, but quality may suffer on the landing page.",
                action: "Replace",
              },
              {
                name: "patient-form.docx", size: "DOCX · 28 KB",
                state: "warn",
                msg: "Not a Brand asset — looks like an operational doc. Tag it correctly so the AI doesn't miscategorize.",
                action: "Re-tag",
              },
              {
                name: "brand-guide-2024.pdf", size: "PDF · 6.2 MB · 32 pages",
                state: "ok",
                msg: "All good. Auto-tagged Brand · Guide.",
              },
            ].map((f) => {
              const t = f.state === "err" ? { bg: "var(--err-soft)", bd: "#fecaca", fg: "var(--err)", icon: "alert" }
                       : f.state === "warn" ? { bg: "var(--warn-soft)", bd: "#fcd34d", fg: "var(--warn)", icon: "alert" }
                       : { bg: "var(--ok-soft)", bd: "#a7f3d0", fg: "var(--ok)", icon: "check" };
              return (
                <div key={f.name} style={{ display: "grid", gridTemplateColumns: "auto 1fr auto", gap: 10, padding: "10px 12px", background: t.bg, border: `1px solid ${t.bd}`, borderRadius: 8, alignItems: "center" }}>
                  <div style={{ width: 28, height: 28, borderRadius: 6, background: "#fff", border: `1px solid ${t.bd}`, color: t.fg, display: "grid", placeItems: "center", flexShrink: 0 }}>
                    <Icon name={t.icon} size={13}/>
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <span style={{ fontSize: 12.5, fontWeight: 500 }}>{f.name}</span>
                      <span className="br-mono" style={{ fontSize: 10, color: "var(--ink-5)" }}>{f.size}</span>
                    </div>
                    <div style={{ fontSize: 11.5, color: t.fg, marginTop: 2 }}>{f.msg}</div>
                  </div>
                  {f.action && <Button variant="outline" size="sm">{f.action}</Button>}
                </div>
              );
            })}

            <div style={{ marginTop: 6, padding: 10, background: "var(--surface-2)", borderRadius: 8, fontSize: 11.5, color: "var(--ink-4)", display: "flex", alignItems: "center", gap: 6 }}>
              <Icon name="info" size={12}/> Bridge never blocks the flow on bad assets. You can keep going and replace them from Dock later.
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

function EdgeHeader({ letter, name, note }) {
  return (
    <div style={{ padding: "12px 16px", background: "var(--surface-2)", borderBottom: "1px solid var(--line)", display: "flex", alignItems: "center", gap: 10 }}>
      <span className="br-mono" style={{ fontSize: 10.5, color: "var(--ink-5)", fontWeight: 600, letterSpacing: ".06em" }}>STATE · {letter}</span>
      <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: "-0.005em" }}>{name}</span>
      <span style={{ flex: 1 }}/>
      <span className="br-mono" style={{ fontSize: 10.5, color: "var(--ink-5)" }}>{note}</span>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 12 — Data schema (the JSON output downstream systems receive)
// ─────────────────────────────────────────────────────────────
function ScreenSchema() {
  return (
    <div className="br-frame" style={{ background: "linear-gradient(180deg, #fafaf9 0%, #f5f5f4 100%)", padding: "28px 32px 36px", overflow: "auto" }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 22 }}>
        <div>
          <Pill tone="dark" size="sm">Data schema · v2.4</Pill>
          <h1 className="br-h1" style={{ fontSize: 28, marginTop: 12, marginBottom: 4 }}>What Bridge actually outputs.</h1>
          <p className="br-body" style={{ margin: 0, maxWidth: 620 }}>
            One structured, typed object generated on submit. Routed to Dock, Compass, Deck, Radar and Beacon as immutable contract data.
          </p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <Pill tone="ok" size="sm" icon="check">Validated</Pill>
          <Pill tone="accent" size="sm">127 fields · 6 sections</Pill>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 14, marginBottom: 14 }}>
        {/* JSON sample */}
        <Card padding={0} style={{ overflow: "hidden" }}>
          <div style={{ padding: "12px 18px", background: "var(--ink)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ width: 8, height: 8, borderRadius: 999, background: "#ef4444" }}/>
              <span style={{ width: 8, height: 8, borderRadius: 999, background: "#f59e0b" }}/>
              <span style={{ width: 8, height: 8, borderRadius: 999, background: "#22c55e" }}/>
              <span className="br-mono" style={{ fontSize: 11, opacity: .65, marginLeft: 8 }}>bridge.submission.lsd-7f2a.json</span>
            </div>
            <span className="br-mono" style={{ fontSize: 10.5, opacity: .55 }}>5.4 KB · type-safe</span>
          </div>
          <pre className="br-mono" style={{
            margin: 0, padding: 20, background: "#0c0a09", color: "#e7e5e4",
            fontSize: 11.5, lineHeight: 1.65, overflow: "auto",
            maxHeight: 560,
          }}>
{`{
  `}<span style={{ color: "#fbbf24" }}>{`"sessionId"`}</span>{`: `}<span style={{ color: "#a5f3fc" }}>{`"LSD-7F2A-9E"`}</span>{`,
  `}<span style={{ color: "#fbbf24" }}>{`"submittedAt"`}</span>{`: `}<span style={{ color: "#a5f3fc" }}>{`"2026-09-02T14:14:00-04:00"`}</span>{`,
  `}<span style={{ color: "#fbbf24" }}>{`"qualityScore"`}</span>{`: `}<span style={{ color: "#86efac" }}>{`94`}</span>{`,
  `}<span style={{ color: "#fbbf24" }}>{`"sections"`}</span>{`: {
    `}<span style={{ color: "#fbbf24" }}>{`"A_snapshot"`}</span>{`: {
      `}<span style={{ color: "#a78bfa" }}>{`"businessType"`}</span>{`: `}<span style={{ color: "#a5f3fc" }}>{`"multi_location"`}</span>{`,
      `}<span style={{ color: "#a78bfa" }}>{`"industry"`}</span>{`: { `}<span style={{ color: "#a5f3fc" }}>{`"primary"`}</span>{`: `}<span style={{ color: "#a5f3fc" }}>{`"dental"`}</span>{`, `}<span style={{ color: "#a5f3fc" }}>{`"taxonomy"`}</span>{`: `}<span style={{ color: "#a5f3fc" }}>{`"healthcare.local_services"`}</span>{` },
      `}<span style={{ color: "#a78bfa" }}>{`"locations"`}</span>{`: [`}<span style={{ color: "#a5f3fc" }}>{`"burlington_vt"`}</span>{`, `}<span style={{ color: "#a5f3fc" }}>{`"s_burlington_vt"`}</span>{`, `}<span style={{ color: "#a5f3fc" }}>{`"williston_vt"`}</span>{`],
      `}<span style={{ color: "#a78bfa" }}>{`"size"`}</span>{`: `}<span style={{ color: "#a5f3fc" }}>{`"16_50"`}</span>{`,
      `}<span style={{ color: "#a78bfa" }}>{`"revenueStage"`}</span>{`: `}<span style={{ color: "#a5f3fc" }}>{`"established_500k_5m"`}</span>{`,
      `}<span style={{ color: "#a78bfa" }}>{`"primaryGoal"`}</span>{`: `}<span style={{ color: "#a5f3fc" }}>{`"acquire_new_patients"`}</span>{`
    },
    `}<span style={{ color: "#fbbf24" }}>{`"B_services"`}</span>{`: {
      `}<span style={{ color: "#a78bfa" }}>{`"selected"`}</span>{`: [`}<span style={{ color: "#a5f3fc" }}>{`"website"`}</span>{`, `}<span style={{ color: "#a5f3fc" }}>{`"paid_ads"`}</span>{`, `}<span style={{ color: "#a5f3fc" }}>{`"seo"`}</span>{`, `}<span style={{ color: "#a5f3fc" }}>{`"automation"`}</span>{`],
      `}<span style={{ color: "#a78bfa" }}>{`"paid"`}</span>{`: {
        `}<span style={{ color: "#a78bfa" }}>{`"platforms"`}</span>{`: [`}<span style={{ color: "#a5f3fc" }}>{`"meta"`}</span>{`, `}<span style={{ color: "#a5f3fc" }}>{`"google"`}</span>{`],
        `}<span style={{ color: "#a78bfa" }}>{`"monthlyBudgetUSD"`}</span>{`: `}<span style={{ color: "#86efac" }}>{`8500`}</span>{`,
        `}<span style={{ color: "#a78bfa" }}>{`"tracking"`}</span>{`: { `}<span style={{ color: "#a5f3fc" }}>{`"ga4"`}</span>{`: `}<span style={{ color: "#86efac" }}>{`true`}</span>{`, `}<span style={{ color: "#a5f3fc" }}>{`"gtm"`}</span>{`: `}<span style={{ color: "#86efac" }}>{`false`}</span>{`, `}<span style={{ color: "#a5f3fc" }}>{`"pixel"`}</span>{`: `}<span style={{ color: "#86efac" }}>{`false`}</span>{` }
      },
      `}<span style={{ color: "#a78bfa" }}>{`"web"`}</span>{`: { `}<span style={{ color: "#a5f3fc" }}>{`"hasExisting"`}</span>{`: `}<span style={{ color: "#86efac" }}>{`true`}</span>{`, `}<span style={{ color: "#a5f3fc" }}>{`"url"`}</span>{`: `}<span style={{ color: "#a5f3fc" }}>{`"lakesidedental.com"`}</span>{`, `}<span style={{ color: "#a5f3fc" }}>{`"platform"`}</span>{`: `}<span style={{ color: "#a5f3fc" }}>{`"wordpress"`}</span>{` }
    },
    `}<span style={{ color: "#fbbf24" }}>{`"C_strategy"`}</span>{`: {
      `}<span style={{ color: "#a78bfa" }}>{`"icp"`}</span>{`: { `}<span style={{ color: "#a5f3fc" }}>{`"primaryPersona"`}</span>{`: `}<span style={{ color: "#a5f3fc" }}>{`"families_kids_3_14"`}</span>{`, `}<span style={{ color: "#a5f3fc" }}>{`"aiExtractedFields"`}</span>{`: `}<span style={{ color: "#86efac" }}>{`11`}</span>{` },
      `}<span style={{ color: "#a78bfa" }}>{`"competitors"`}</span>{`: [
        { `}<span style={{ color: "#a5f3fc" }}>{`"name"`}</span>{`: `}<span style={{ color: "#a5f3fc" }}>{`"Smile Burlington"`}</span>{`, `}<span style={{ color: "#a5f3fc" }}>{`"url"`}</span>{`: `}<span style={{ color: "#a5f3fc" }}>{`"smile-burlington.com"`}</span>{`, `}<span style={{ color: "#a5f3fc" }}>{`"type"`}</span>{`: `}<span style={{ color: "#a5f3fc" }}>{`"direct"`}</span>{` }
      ],
      `}<span style={{ color: "#a78bfa" }}>{`"constraints"`}</span>{`: [`}<span style={{ color: "#a5f3fc" }}>{`"williston_38pct_full"`}</span>{`, `}<span style={{ color: "#a5f3fc" }}>{`"no_crm"`}</span>{`, `}<span style={{ color: "#a5f3fc" }}>{`"reviews_stuck_4_4"`}</span>{`]
    },
    `}<span style={{ color: "#fbbf24" }}>{`"D_assets"`}</span>{`: { `}<span style={{ color: "#a5f3fc" }}>{`"uploaded"`}</span>{`: `}<span style={{ color: "#86efac" }}>{`7`}</span>{`, `}<span style={{ color: "#a5f3fc" }}>{`"missing"`}</span>{`: `}<span style={{ color: "#86efac" }}>{`3`}</span>{` },
    `}<span style={{ color: "#fbbf24" }}>{`"E_goals"`}</span>{`: {
      `}<span style={{ color: "#a78bfa" }}>{`"targets12mo"`}</span>{`: {
        `}<span style={{ color: "#a78bfa" }}>{`"newPatientsPerMonth"`}</span>{`: `}<span style={{ color: "#86efac" }}>{`140`}</span>{`,
        `}<span style={{ color: "#a78bfa" }}>{`"annualRevenueUSD"`}</span>{`: `}<span style={{ color: "#86efac" }}>{`3600000`}</span>{`,
        `}<span style={{ color: "#a78bfa" }}>{`"blendedROAS"`}</span>{`: `}<span style={{ color: "#86efac" }}>{`4.2`}</span>{`,
        `}<span style={{ color: "#a78bfa" }}>{`"willistonFillPct"`}</span>{`: `}<span style={{ color: "#86efac" }}>{`82`}</span>{`
      },
      `}<span style={{ color: "#a78bfa" }}>{`"priorityOrder"`}</span>{`: [`}<span style={{ color: "#a5f3fc" }}>{`"williston_fill"`}</span>{`, `}<span style={{ color: "#a5f3fc" }}>{`"new_patients"`}</span>{`, `}<span style={{ color: "#a5f3fc" }}>{`"roas"`}</span>{`, `}<span style={{ color: "#a5f3fc" }}>{`"revenue"`}</span>{`]
    }
  },
  `}<span style={{ color: "#fbbf24" }}>{`"routing"`}</span>{`: {
    `}<span style={{ color: "#a78bfa" }}>{`"dock"`}</span>{`: { `}<span style={{ color: "#a5f3fc" }}>{`"event"`}</span>{`: `}<span style={{ color: "#a5f3fc" }}>{`"client.upsert"`}</span>{`, `}<span style={{ color: "#a5f3fc" }}>{`"status"`}</span>{`: `}<span style={{ color: "#a5f3fc" }}>{`"queued"`}</span>{` },
    `}<span style={{ color: "#a78bfa" }}>{`"compass"`}</span>{`: { `}<span style={{ color: "#a5f3fc" }}>{`"event"`}</span>{`: `}<span style={{ color: "#a5f3fc" }}>{`"proposal.draft"`}</span>{`, `}<span style={{ color: "#a5f3fc" }}>{`"status"`}</span>{`: `}<span style={{ color: "#a5f3fc" }}>{`"running"`}</span>{` },
    `}<span style={{ color: "#a78bfa" }}>{`"radar"`}</span>{`: { `}<span style={{ color: "#a5f3fc" }}>{`"event"`}</span>{`: `}<span style={{ color: "#a5f3fc" }}>{`"baseline.import"`}</span>{`, `}<span style={{ color: "#a5f3fc" }}>{`"status"`}</span>{`: `}<span style={{ color: "#a5f3fc" }}>{`"queued"`}</span>{` },
    `}<span style={{ color: "#a78bfa" }}>{`"beacon"`}</span>{`: { `}<span style={{ color: "#a5f3fc" }}>{`"event"`}</span>{`: `}<span style={{ color: "#a5f3fc" }}>{`"workflow.stage"`}</span>{`, `}<span style={{ color: "#a5f3fc" }}>{`"status"`}</span>{`: `}<span style={{ color: "#a5f3fc" }}>{`"staged"`}</span>{` }
  }
}`}
          </pre>
        </Card>

        {/* Right — schema overview */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <Card padding={18}>
            <div className="br-eyebrow" style={{ marginBottom: 8 }}>Top-level shape</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {[
                ["sessionId",    "string",  "Magic-link session"],
                ["submittedAt",  "ISO8601", "TZ-aware"],
                ["qualityScore", "0–100",   "Bridge completion grade"],
                ["sections",    "object",  "A through F"],
                ["routing",     "object",  "Per-app event dispatch"],
              ].map(([k, t, d]) => (
                <div key={k} style={{ display: "grid", gridTemplateColumns: "auto auto 1fr", gap: 8, padding: "6px 0", borderTop: "1px solid var(--line-faint)", alignItems: "center" }}>
                  <span className="br-mono" style={{ fontSize: 11.5, color: "var(--ink)", fontWeight: 600 }}>{k}</span>
                  <span className="br-mono" style={{ fontSize: 10, color: "var(--accent)", padding: "1px 5px", background: "var(--accent-soft)", borderRadius: 3 }}>{t}</span>
                  <span style={{ fontSize: 11.5, color: "var(--ink-4)" }}>{d}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card padding={18}>
            <div className="br-eyebrow" style={{ marginBottom: 8 }}>Per-section field counts</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {[
                ["A", "Snapshot",  6,  "Foundation · always present"],
                ["B", "Services",  22, "Dynamic · branches by selection"],
                ["C", "Strategy",  38, "11 AI-extracted"],
                ["D", "Assets",    21, "Includes file metadata + tags"],
                ["E", "Goals",     14, "Numeric targets + priority list"],
                ["F", "Review",     8, "Confirmations + open questions"],
              ].map(([letter, name, n, sub]) => (
                <div key={letter} style={{ display: "grid", gridTemplateColumns: "auto 1fr auto", gap: 8, padding: "6px 0", borderTop: "1px solid var(--line-faint)", alignItems: "center" }}>
                  <span className="br-mono" style={{ fontSize: 10.5, color: "var(--ink-5)", fontWeight: 600, width: 12 }}>{letter}</span>
                  <div>
                    <div style={{ fontSize: 12.5, fontWeight: 500 }}>{name}</div>
                    <div style={{ fontSize: 10.5, color: "var(--ink-5)" }}>{sub}</div>
                  </div>
                  <span className="br-num" style={{ fontSize: 14, fontWeight: 600 }}>{n}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card padding={18}>
            <div className="br-eyebrow" style={{ marginBottom: 8 }}>Routing contracts</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {[
                ["dock",    "client.upsert",     "Instant"],
                ["compass", "proposal.draft",    "Running"],
                ["deck",    "portal.provision",  "ETA 30s"],
                ["radar",   "baseline.import",   "Async · 6m"],
                ["beacon",  "workflow.stage",    "Staged · off"],
              ].map(([app, ev, status]) => (
                <div key={app} style={{ display: "grid", gridTemplateColumns: "auto 1fr auto", gap: 8, padding: "6px 0", borderTop: "1px solid var(--line-faint)", alignItems: "center" }}>
                  <span style={{ padding: "1px 6px", borderRadius: 4, fontSize: 10, fontWeight: 700, background: "var(--ink)", color: "#fff", letterSpacing: ".04em", textTransform: "uppercase" }}>{app}</span>
                  <span className="br-mono" style={{ fontSize: 11, color: "var(--accent)" }}>{ev}</span>
                  <span className="br-mono" style={{ fontSize: 10.5, color: "var(--ink-5)" }}>{status}</span>
                </div>
              ))}
            </div>
          </Card>

          <div style={{ padding: 12, background: "var(--surface-2)", border: "1px dashed var(--line-strong)", borderRadius: 8, fontSize: 11, color: "var(--ink-4)", lineHeight: 1.55 }}>
            <Icon name="info" size={11}/> Schema is versioned (v2.4). Downstream apps refuse unrecognized versions — failures surface as notifications in Atlas, never silent data loss.
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 13 — Integration map (Bridge → Compass · Dock · Deck · Radar · Beacon)
// ─────────────────────────────────────────────────────────────
function ScreenIntegration() {
  return (
    <div className="br-frame" style={{ background: "linear-gradient(180deg, #fafaf9 0%, #f5f5f4 100%)", padding: "28px 32px 36px", overflow: "auto" }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 22 }}>
        <div>
          <Pill tone="dark" size="sm">Integration map · Bridge outbound</Pill>
          <h1 className="br-h1" style={{ fontSize: 28, marginTop: 12, marginBottom: 4 }}>Where Bridge's data goes.</h1>
          <p className="br-body" style={{ margin: 0, maxWidth: 640 }}>
            One submission, five typed contracts. Bridge is read-only after handoff — downstream apps own their state from here.
          </p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          {[["Outbound contracts", "5"], ["Avg. handoff", "1.4s"], ["Read-only refs", "Bridge"]].map(([k, v]) => (
            <div key={k} style={{ padding: "10px 14px", background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 10 }}>
              <div className="br-eyebrow" style={{ fontSize: 9 }}>{k}</div>
              <div className="br-num" style={{ fontSize: 16, fontWeight: 600, marginTop: 2 }}>{v}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ flex: 1, background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 16, padding: 24, boxShadow: "var(--shadow-2)", position: "relative", overflow: "hidden",
        backgroundImage: "radial-gradient(circle at 1px 1px, var(--line) 1px, transparent 0)", backgroundSize: "18px 18px" }}>
        <svg viewBox="0 0 1280 540" style={{ width: "100%", height: "100%", display: "block", position: "relative" }}>
          <defs>
            <marker id="brArrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#0c0a09"/></marker>
            <marker id="brArrowAccent" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#4f46e5"/></marker>
            <linearGradient id="brRibbon" x1="0" x2="1">
              <stop offset="0" stopColor="#4f46e5" stopOpacity="0"/>
              <stop offset=".5" stopColor="#4f46e5" stopOpacity=".55"/>
              <stop offset="1" stopColor="#4f46e5" stopOpacity="0"/>
            </linearGradient>
          </defs>

          {/* Bridge on the left, hero */}
          <BrEcoBox x={40} y={170} w={240} h={200} kind="bridge" hero pos="01"
            subs={["A · Snapshot", "B · Services", "C · Strategy", "D · Assets", "E · Goals", "F · Review"]}/>

          {/* Five downstream apps */}
          <BrEcoBox x={460}  y={40}   w={230} h={88} kind="dock"    pos="02" subs={["client.record", "portal.url"]}/>
          <BrEcoBox x={460}  y={158}  w={230} h={88} kind="compass" pos="03" subs={["proposal.scope", "pricing.tiers"]}/>
          <BrEcoBox x={460}  y={276}  w={230} h={88} kind="deck"    pos="04" subs={["workspace.provision"]}/>
          <BrEcoBox x={460}  y={394}  w={230} h={88} kind="radar"   pos="05" subs={["baseline.import"]}/>

          <BrEcoBox x={870}  y={158}  w={240} h={150} kind="beacon" pos="06" external
            subs={["workflow.stage", "trigger.rules", "recall.cohort"]}/>

          {/* Ribbon backbone */}
          <path d="M 280 270 L 870 270" stroke="url(#brRibbon)" strokeWidth="22" fill="none" opacity=".35"/>

          {/* Contract arrows */}
          <BrContractArrow from={[280, 240]} to={[460, 80]}  label="bridge.client.upsert"       sub="instant · idempotent"/>
          <BrContractArrow from={[280, 260]} to={[460, 200]} label="bridge.compass.draft"       sub="primary handoff · 1.4s" emph/>
          <BrContractArrow from={[280, 280]} to={[460, 318]} label="bridge.deck.provision"      sub="ETA 30s · async"/>
          <BrContractArrow from={[280, 300]} to={[460, 436]} label="bridge.radar.baseline"      sub="async · 6m"/>

          {/* Compass to Beacon (downstream secondary) */}
          <path d="M 690 200 C 760 200, 760 230, 870 230" stroke="#0c0a09" strokeWidth="1.4" fill="none" markerEnd="url(#brArrow)" opacity=".7"/>
          <g transform="translate(710, 200)">
            <rect width="140" height="18" rx="5" fill="#fff" stroke="#d6d3d1"/>
            <text x="70" y="9" fontSize="9.5" fill="#0c0a09" textAnchor="middle" fontWeight="600" fontFamily="var(--font-mono)" dy="3">compass.beacon.stage</text>
          </g>

          {/* Bridge → Beacon direct */}
          <path d="M 280 320 C 500 460, 750 460, 870 280" stroke="#0c0a09" strokeWidth="1.4" fill="none" markerEnd="url(#brArrow)" opacity=".6" strokeDasharray="3 3"/>
          <text x="580" y="500" fontSize="10" fill="#8a8580" textAnchor="middle">bridge.beacon.recall_cohort (deferred)</text>

          {/* Critical rules note */}
          <g transform="translate(870, 360)">
            <rect width="240" height="140" rx="12" fill="#0c0a09"/>
            <text x="20" y="24" fontSize="11" fill="#a8a29e" fontFamily="var(--font-mono)" letterSpacing="1.2">BRIDGE · RULES</text>
            <g fontSize="11" fill="#f5f5f4">
              <text x="20" y="46">• Bridge is the source of truth</text>
              <text x="20" y="64">  for client intent.</text>
              <text x="20" y="88">• After submit, Bridge is read-only.</text>
              <text x="20" y="106">  Edits happen in Dock / Compass /</text>
              <text x="20" y="124">  Radar with provenance.</text>
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
}

function BrEcoBox({ x, y, w, h, kind, pos, subs, hero, external }) {
  const palette = {
    bridge:  { mark: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)", chipBg: "#eef0ff", chipFg: "#312e81", name: "Bridge",  tag: "Onboarding intent" },
    compass: { mark: "#fff",                                              chipBg: "#faf8ff", chipFg: "#312e81", markStroke: "#d6d3d1", name: "Compass", tag: "Strategy + proposal" },
    dock:    { mark: "linear-gradient(180deg, #0c0a09 0%, #292524 100%)", chipBg: "#f5f5f4", chipFg: "#0c0a09", name: "Dock",    tag: "Client portal" },
    deck:    { mark: "#065f46",                                           chipBg: "#dcfce7", chipFg: "#166534", name: "Deck",    tag: "Document workspace" },
    radar:   { mark: "#0891b2",                                           chipBg: "#cffafe", chipFg: "#155e75", name: "Radar",   tag: "Analytics" },
    beacon:  { mark: "#b45309",                                           chipBg: "#fee2e2", chipFg: "#991b1b", name: "Beacon",  tag: "Automation" },
  }[kind];
  return (
    <g transform={`translate(${x}, ${y})`}>
      <rect width={w} height={h} rx="14" fill="#fff" stroke={hero ? "#4f46e5" : external ? "#a8a29e" : "#d6d3d1"} strokeWidth={hero ? 2 : 1}
        strokeDasharray={external ? "4 4" : "none"}
        style={{ filter: hero ? "drop-shadow(0 6px 20px rgba(79,70,229,.22))" : undefined }}/>
      <text x="16" y="14" fontSize="9.5" fill="#a8a29e" fontFamily="var(--font-mono)" letterSpacing="1.2" dy="4">{pos}</text>
      <g transform={`translate(16, 30)`}>
        {kind === "compass" ? (
          <>
            <rect width="24" height="24" rx="999" fill="#fff" stroke="#d6d3d1"/>
            <polygon points="12,5 14,12 12,19 10,12" fill="#4f46e5"/>
          </>
        ) : (
          <rect width="24" height="24" rx="6" fill={palette.mark} stroke={palette.markStroke || "none"}/>
        )}
        <text x={34} y="11" fontSize={hero ? 17 : 14} fontWeight="700" fill="#0c0a09" letterSpacing="-0.01em" dy="4">{palette.name}</text>
        <text x={34} y="26" fontSize="10" fill="#8a8580" dy="2">{palette.tag}</text>
      </g>
      {hero && (
        <g>
          <rect x={w - 64} y={12} width="50" height="16" rx="4" fill="#4f46e5"/>
          <text x={w - 39} y="20" fontSize="9.5" fill="#fff" textAnchor="middle" fontFamily="var(--font-mono)" fontWeight="700" dy="3">SOURCE</text>
        </g>
      )}
      {subs && (
        <g transform="translate(16, 70)">
          {hero ? (
            // grid layout for hero
            subs.map((s, i) => (
              <g key={s} transform={`translate(${(i % 2) * 108}, ${Math.floor(i / 2) * 18})`}>
                <rect width="100" height="13" rx="3" fill={palette.chipBg} opacity=".8"/>
                <text x="8" y="6.5" fontSize="9.5" fill={palette.chipFg} fontFamily="var(--font-mono)" fontWeight="500" dy="3">{s}</text>
              </g>
            ))
          ) : (
            subs.map((s, i) => (
              <g key={s} transform={`translate(0, ${i * 16})`}>
                <rect width={w - 32} height="13" rx="3" fill={palette.chipBg} opacity=".7"/>
                <text x="8" y="6.5" fontSize="9.5" fill={palette.chipFg} fontFamily="var(--font-mono)" fontWeight="500" dy="3">{s}</text>
              </g>
            ))
          )}
        </g>
      )}
    </g>
  );
}

function BrContractArrow({ from, to, label, sub, emph }) {
  const color = emph ? "#4f46e5" : "#0c0a09";
  return (
    <g>
      <path d={`M ${from[0]} ${from[1]} C ${from[0] + 80} ${from[1]}, ${to[0] - 80} ${to[1]}, ${to[0]} ${to[1]}`}
        stroke={color} strokeWidth={emph ? 1.8 : 1.3} fill="none" markerEnd={emph ? "url(#brArrowAccent)" : "url(#brArrow)"} opacity={emph ? 1 : .75}/>
      <g transform={`translate(${(from[0] + to[0]) / 2 - 75}, ${(from[1] + to[1]) / 2 - 14})`}>
        <rect width="150" height="28" rx="6" fill="#fff" stroke={color} strokeOpacity={emph ? 1 : .55}/>
        <text x="75" y="11" fontSize="10" fill={color} textAnchor="middle" fontWeight="600" fontFamily="var(--font-mono)" dy="3">{label}</text>
        <text x="75" y="22" fontSize="9.5" fill="#8a8580" textAnchor="middle" dy="3">{sub}</text>
      </g>
    </g>
  );
}

Object.assign(window, { ScreenResume, ScreenEdgeStates, ScreenSchema, ScreenIntegration, EdgeHeader, BrEcoBox, BrContractArrow });
