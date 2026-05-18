/* global React, Icon, Button, Field, Input, Textarea, Chip, Pill, Card, SelectCard, Toggle, Slider, ProgressRail, StepFooter, AICallout, ClientBar */
// Bridge — onboarding screens part 1: landing, magic-link, snapshot, services

const SECTIONS = [
  { id: "snapshot",  title: "Business Snapshot", subtitle: "Industry, location, scale" },
  { id: "services",  title: "Services",          subtitle: "What we're scoping" },
  { id: "strategy",  title: "Strategy Inputs",   subtitle: "ICP, competitors, voice" },
  { id: "assets",    title: "Assets",            subtitle: "Logos, creative, access" },
  { id: "goals",     title: "Goals",             subtitle: "Targets & priorities" },
  { id: "review",    title: "Review",            subtitle: "Confirm & submit" },
];

// ─────────────────────────────────────────────────────────────
// 01 — Landing / Welcome
// ─────────────────────────────────────────────────────────────
function ScreenLanding() {
  return (
    <div className="br-frame" style={{ background: "var(--bg)" }}>
      {/* Top nav */}
      <div style={{ padding: "24px 56px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
        <div className="br-wordmark"><span className="br-mark"></span>Bridge</div>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <span className="br-mono" style={{ fontSize: 11, color: "var(--ink-5)" }}>POWERED BY</span>
          <span style={{ fontSize: 13, fontWeight: 500, letterSpacing: "-0.01em" }}>Digital Native</span>
        </div>
      </div>

      {/* Hero */}
      <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 0 }}>
        {/* Left — content */}
        <div style={{ padding: "40px 56px 56px", display: "flex", flexDirection: "column", justifyContent: "center", maxWidth: 600 }}>
          <Pill tone="accent" size="md" icon="sparkle">A guided strategy session, not a form</Pill>
          <h1 className="br-h1" style={{ marginTop: 20, marginBottom: 16, fontSize: 44, fontWeight: 600, letterSpacing: "-0.03em" }}>
            Welcome, Sarah.<br/>
            <span style={{ color: "var(--ink-4)" }}>Let's understand Lakeside Dental — so we build a system that fits it precisely.</span>
          </h1>

          <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 20 }}>
            {[
              ["target", "Built around your specific services", "Questions adapt to what you've selected — nothing extraneous."],
              ["save",   "Save anywhere, resume anywhere",     "Auto-saves after every change. Switch devices freely."],
              ["lock",   "Yours alone, end-to-end encrypted",  "A secure magic-link session. No password to manage."],
            ].map(([icon, title, desc]) => (
              <div key={title} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <div style={{
                  width: 28, height: 28, borderRadius: 7, flexShrink: 0,
                  background: "var(--surface)", border: "1px solid var(--line)",
                  display: "grid", placeItems: "center", color: "var(--ink-3)",
                }}>
                  <Icon name={icon} size={14}/>
                </div>
                <div style={{ paddingTop: 4 }}>
                  <div style={{ fontSize: 14, fontWeight: 500, color: "var(--ink)" }}>{title}</div>
                  <div style={{ fontSize: 13, color: "var(--ink-4)", marginTop: 1 }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 20, marginTop: 32, paddingTop: 20, borderTop: "1px solid var(--line)" }}>
            <div>
              <div className="br-eyebrow" style={{ fontSize: 10 }}>Estimated time</div>
              <div className="br-num" style={{ fontSize: 22, fontWeight: 600, letterSpacing: "-0.02em", marginTop: 2 }}>10–12 min</div>
            </div>
            <div style={{ width: 1, height: 36, background: "var(--line)" }}/>
            <div>
              <div className="br-eyebrow" style={{ fontSize: 10 }}>Sections</div>
              <div className="br-num" style={{ fontSize: 22, fontWeight: 600, letterSpacing: "-0.02em", marginTop: 2 }}>6</div>
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

        {/* Right — auth card */}
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
              <Input value="sarah.chen@lakesidedental.com" prefix={<Icon name="mail" size={15}/>} />
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
                ].map(([t, d], i) => (
                  <div key={t} style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                    <span className="br-mono br-num" style={{ fontSize: 10, color: "var(--ink-5)" }}>{String(i+1).padStart(2,"0")}</span>
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 500, color: "var(--ink-2)" }}>{t}</div>
                      <div style={{ fontSize: 11, color: "var(--ink-4)" }}>{d}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Bottom strip */}
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
// 02 — Magic link sent
// ─────────────────────────────────────────────────────────────
function ScreenMagicLink() {
  return (
    <div className="br-frame" style={{ background: "var(--bg)" }}>
      <div style={{ padding: "24px 56px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
        <div className="br-wordmark"><span className="br-mark"></span>Bridge</div>
        <span className="br-mono" style={{ fontSize: 11, color: "var(--ink-5)" }}>SESSION · LSD-7F2A-9E</span>
      </div>

      <div style={{ flex: 1, display: "grid", placeItems: "center", padding: 32 }}>
        <div style={{ width: 440, textAlign: "center" }}>
          {/* envelope */}
          <div style={{ position: "relative", width: 120, height: 120, margin: "0 auto 24px", display: "grid", placeItems: "center" }}>
            <div style={{
              position: "absolute", inset: 0, borderRadius: 999,
              background: "radial-gradient(circle, rgba(79,70,229,.14) 0%, transparent 60%)",
              animation: "br-pulse-soft 2.4s ease-in-out infinite",
            }}/>
            <div style={{
              width: 72, height: 72, borderRadius: 18,
              background: "linear-gradient(135deg, #fff 0%, #f5f5f4 100%)",
              border: "1px solid var(--line)",
              display: "grid", placeItems: "center", boxShadow: "var(--shadow-2)",
              position: "relative",
            }}>
              <Icon name="mail" size={32} color="var(--accent)" strokeWidth={1.4}/>
              <div style={{
                position: "absolute", top: -6, right: -6,
                width: 22, height: 22, borderRadius: 999, background: "var(--ok)",
                display: "grid", placeItems: "center", color: "#fff",
                boxShadow: "0 2px 6px rgba(4,120,87,.4)",
              }}>
                <Icon name="check" size={12} strokeWidth={3}/>
              </div>
            </div>
          </div>

          <h1 className="br-h1" style={{ fontSize: 30, marginBottom: 10 }}>Check your inbox</h1>
          <p className="br-bodyLg" style={{ margin: 0 }}>
            A secure link is on its way to <span style={{ color: "var(--ink)", fontWeight: 500 }}>sarah.chen@lakesidedental.com</span>.
            Click it and we'll pick up right where you left off.
          </p>

          <div style={{ marginTop: 28, padding: 16, background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 12, textAlign: "left" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <div style={{ width: 8, height: 8, borderRadius: 999, background: "var(--accent)", animation: "br-pulse-soft 1.5s ease-in-out infinite" }}/>
              <span style={{ fontSize: 12.5, fontWeight: 500 }}>Waiting for confirmation</span>
              <span className="br-mono br-num" style={{ fontSize: 11, color: "var(--ink-5)", marginLeft: "auto" }}>00:27</span>
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
// 03 — Business Snapshot
// ─────────────────────────────────────────────────────────────
function ScreenSnapshot() {
  return (
    <div className="br-frame" style={{ flexDirection: "row" }}>
      <ProgressRail current={0} sections={SECTIONS}/>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <ClientBar section={1} total={6} sectionName="Business Snapshot"/>
        <div className="br-scroll" style={{ flex: 1, overflowY: "auto", padding: "32px 56px 32px" }}>
          <div style={{ maxWidth: 720 }}>
            <Pill tone="neutral" size="sm">A · Foundations</Pill>
            <h1 className="br-h1" style={{ marginTop: 12, marginBottom: 8, fontSize: 32 }}>The basics, first.</h1>
            <p className="br-bodyLg" style={{ marginTop: 0, marginBottom: 28 }}>
              Six quick fields so we know who we're building for. The rest of the flow adapts from here.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              <Field label="What kind of business is Lakeside Dental?" hint="Pick the closest fit">
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {[
                    ["Single location",  "building"],
                    ["Multi-location",   "layers"],
                    ["Franchise",        "globe"],
                    ["Mobile / on-site", "map"],
                    ["Online-first",     "monitor"],
                  ].map(([l, i], idx) => (
                    <Chip key={l} icon={i} active={idx === 1}>{l}</Chip>
                  ))}
                </div>
              </Field>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                <Field label="Industry">
                  <Input value="Dental & orthodontics" prefix={<Icon name="search" size={14}/>}/>
                  <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
                    <Pill tone="accent" size="sm">Healthcare · Local services</Pill>
                  </div>
                </Field>

                <Field label="Headquarters">
                  <Input value="Burlington, Vermont" prefix={<Icon name="map" size={14}/>}/>
                  <div className="br-cap" style={{ marginTop: 6 }}>Locations: Burlington, S. Burlington, Williston</div>
                </Field>
              </div>

              <Field label="Company size" hint="Including providers and admin">
                <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 8 }}>
                  {["1–5", "6–15", "16–50", "51–150", "150+"].map((r, idx) => (
                    <button key={r} className="br-focus" style={{
                      padding: "12px 8px", borderRadius: 10, cursor: "pointer", fontFamily: "var(--font-sans)",
                      background: idx === 2 ? "var(--ink)" : "var(--surface)",
                      color: idx === 2 ? "#fff" : "var(--ink-2)",
                      border: idx === 2 ? "1px solid var(--ink)" : "1px solid var(--line-strong)",
                      boxShadow: idx === 2 ? "0 1px 2px rgba(0,0,0,.08)" : "var(--shadow-1)",
                      fontSize: 13, fontWeight: 500,
                    }}>
                      <div style={{ fontFamily: "var(--font-mono)", fontSize: 15, fontWeight: 600, fontVariantNumeric: "tabular-nums" }}>{r}</div>
                      <div style={{ fontSize: 10.5, opacity: .7, marginTop: 2 }}>people</div>
                    </button>
                  ))}
                </div>
              </Field>

              <Field label="Current revenue stage" hint="Annual">
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
                  {[
                    ["Pre-revenue", "$0"],
                    ["Early", "<$500K"],
                    ["Established", "$500K–$5M"],
                    ["Scaling", "$5M+"],
                  ].map(([l, s], idx) => (
                    <SelectCard key={l} active={idx === 2} title={l} subtitle={s}/>
                  ))}
                </div>
              </Field>

              <Field label="What's the main marketing goal right now?" ai>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  {[
                    ["users",     "Acquire new patients",      "Inbound leads, bookings"],
                    ["target",    "Retain existing patients",  "Recall, treatment plan acceptance"],
                    ["megaphone", "Launch a new location",     "Awareness, ramp-up"],
                    ["bolt",      "Operational efficiency",    "Automate intake, fewer no-shows"],
                  ].map(([i, t, s], idx) => (
                    <SelectCard key={t} active={idx === 0} icon={i} title={t} subtitle={s}/>
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
// 04 — Service Selection + branching reveals
// ─────────────────────────────────────────────────────────────
function ScreenServices() {
  const services = [
    { id: "web",   icon: "monitor",   title: "Website design",    desc: "Site, landing pages, conversion",   count: 4 },
    { id: "ads",   icon: "megaphone", title: "Paid ads",          desc: "Meta, Google, TikTok, LinkedIn",    count: 5 },
    { id: "seo",   icon: "search",    title: "SEO",               desc: "Local, on-page, content velocity",  count: 4 },
    { id: "brand", icon: "brush",     title: "Branding",          desc: "Identity, voice, guidelines",       count: 3 },
    { id: "content", icon: "pen",     title: "Content marketing", desc: "Editorial, social, video",           count: 3 },
    { id: "auto",  icon: "bolt",      title: "Automation / CRM",  desc: "Workflows, lifecycle, attribution", count: 4 },
  ];

  return (
    <div className="br-frame" style={{ flexDirection: "row" }}>
      <ProgressRail current={1} sections={SECTIONS}/>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <ClientBar section={2} total={6} sectionName="Services"/>
        <div className="br-scroll" style={{ flex: 1, overflowY: "auto", padding: "32px 56px 32px" }}>
          <div style={{ maxWidth: 980 }}>
            <Pill tone="neutral" size="sm">B · Scope</Pill>
            <h1 className="br-h1" style={{ marginTop: 12, marginBottom: 8, fontSize: 32 }}>What are we building together?</h1>
            <p className="br-bodyLg" style={{ marginTop: 0, marginBottom: 28 }}>
              Pick anything that's in play. Each one reveals the right follow-ups — nothing extra.
            </p>

            {/* Service grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 32 }}>
              {services.map((s, idx) => (
                <SelectCard
                  key={s.id}
                  active={idx < 3 || idx === 5}
                  icon={s.icon}
                  title={s.title}
                  subtitle={s.desc}
                  badge={idx < 3 || idx === 5 ? <Pill tone="accent" size="sm">{s.count} q's</Pill> : null}
                />
              ))}
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <div className="br-eyebrow">Branching follow-ups</div>
              <div style={{ flex: 1, height: 1, background: "var(--line)" }}/>
              <span className="br-mono" style={{ fontSize: 11, color: "var(--ink-5)" }}>4 SELECTED · 16 QUESTIONS</span>
            </div>

            {/* Website branch — expanded */}
            <BranchPanel
              icon="monitor"
              title="Website design"
              progress={["Have a site?", "URL", "Platform", "Performance"]}
              active={2}
            >
              <Field label="Do you currently have a website?">
                <div style={{ display: "flex", gap: 8 }}>
                  <Chip active>Yes</Chip>
                  <Chip>No</Chip>
                  <Chip>In progress</Chip>
                </div>
              </Field>
              <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 16, marginTop: 14 }}>
                <Field label="Current URL">
                  <Input value="lakesidedental.com" prefix={<Icon name="globe" size={14}/>}/>
                </Field>
                <Field label="Platform">
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    {["Webflow", "WordPress", "Squarespace", "Wix", "Custom"].map((p, i) => (
                      <Chip key={p} active={i === 1} size="sm">{p}</Chip>
                    ))}
                  </div>
                </Field>
              </div>
              <Field label="What's broken on it today?" hint="Pick all that apply" style={{ marginTop: 14 }}>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {[
                    ["Looks dated", true], ["Slow on mobile", true], ["Bad booking flow", true],
                    ["Hard to update", false], ["Poor SEO", false], ["No analytics", false],
                  ].map(([l, a]) => <Chip key={l} active={a} size="sm">{a ? "✓ " : ""}{l}</Chip>)}
                </div>
              </Field>
            </BranchPanel>

            {/* Paid ads — collapsed */}
            <BranchPanel icon="megaphone" title="Paid ads" collapsed summary="Meta + Google · $8.5K/mo · GTM not installed">
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
                <Field label="Platforms"><div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>{["Meta","Google","TikTok","LinkedIn"].map((p,i)=><Chip key={p} size="sm" active={i<2}>{p}</Chip>)}</div></Field>
                <Field label="Monthly budget"><Input value="8,500" prefix="$" suffix="/ mo"/></Field>
                <Field label="Tracking"><div style={{ display: "flex", gap: 6 }}><Chip size="sm" active>GA4</Chip><Chip size="sm">GTM</Chip><Chip size="sm">Pixel</Chip></div></Field>
              </div>
            </BranchPanel>

            {/* SEO — collapsed */}
            <BranchPanel icon="search" title="SEO" collapsed summary="Local · 3 competitor domains · Burlington + 4 nearby">
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <Field label="Top 3 competitor URLs">
                  <Input value="smile-burlington.com"/>
                </Field>
                <Field label="Target locations">
                  <Input value="Burlington · Williston · S. Burlington · Essex"/>
                </Field>
              </div>
            </BranchPanel>

            {/* Automation — collapsed */}
            <BranchPanel icon="bolt" title="Automation / CRM" collapsed summary="No CRM today · Wants intake + recall automations">
              <div/>
            </BranchPanel>

            {/* AI nudge */}
            <div style={{ marginTop: 24 }}>
              <AICallout title="Heads up from Bridge">
                Based on your goal (acquire new patients) and Vermont locale, you might also consider <strong style={{ color: "var(--ink)" }}>Local SEO + Reviews management</strong>. We can flag it for your proposal without adding it to scope.
              </AICallout>
            </div>
          </div>
        </div>
        <StepFooter note="4 selected · 16 questions ahead" continueLabel="Continue to Strategy"/>
      </div>
    </div>
  );
}

function BranchPanel({ icon, title, progress, active, collapsed, summary, children }) {
  return (
    <div style={{
      background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 14,
      boxShadow: "var(--shadow-1)", marginBottom: 12, overflow: "hidden",
    }}>
      <div style={{
        padding: "14px 18px", display: "flex", alignItems: "center", gap: 14,
        borderBottom: collapsed ? "none" : "1px solid var(--line)",
        background: collapsed ? "transparent" : "linear-gradient(180deg, #fafafa 0%, transparent 100%)",
      }}>
        <div style={{
          width: 32, height: 32, borderRadius: 8, display: "grid", placeItems: "center",
          background: "var(--accent-soft)", color: "var(--accent)", border: "1px solid var(--accent-soft-2)",
        }}>
          <Icon name={icon} size={16}/>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, fontWeight: 600, letterSpacing: "-0.005em" }}>{title}</div>
          {summary && <div style={{ fontSize: 12, color: "var(--ink-4)", marginTop: 1 }}>{summary}</div>}
        </div>
        {progress && (
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            {progress.map((p, i) => (
              <div key={p} style={{
                fontSize: 11, padding: "3px 8px", borderRadius: 999,
                background: i < active ? "var(--ink)" : i === active ? "var(--accent-soft)" : "var(--surface-2)",
                color: i < active ? "#fff" : i === active ? "var(--accent-ink)" : "var(--ink-4)",
                fontWeight: 500, border: i === active ? "1px solid var(--accent-soft-2)" : "1px solid var(--line)",
              }}>{p}</div>
            ))}
          </div>
        )}
        {collapsed && (
          <Pill tone="ok" size="sm" icon="check">Complete</Pill>
        )}
        {!progress && !collapsed && <Icon name="chevron_down" size={16} color="var(--ink-4)"/>}
        {collapsed && <Icon name="chevron_right" size={16} color="var(--ink-4)"/>}
      </div>
      {!collapsed && (
        <div style={{ padding: 18 }}>{children}</div>
      )}
    </div>
  );
}

Object.assign(window, { SECTIONS, ScreenLanding, ScreenMagicLink, ScreenSnapshot, ScreenServices, BranchPanel });
