/* global React, Icon, Button, Field, Input, Textarea, Chip, Pill, Card, SelectCard, Toggle, Slider, AICallout,
   CompassWordmark, WorkspaceRail, ProposalToolbar, ServiceBlock, Metric, TierCard, ScenarioBar, AssumptionRow, SectionHeader */
// Compass — screens part 1: Inbox, Generating, Modular Scope, Pricing

// ─────────────────────────────────────────────────────────────
// 01 — Inbox (proposals across all clients)
// ─────────────────────────────────────────────────────────────
function CInbox() {
  const proposals = [
    { client: "Lakeside Dental",       industry: "Healthcare · 3 loc.",      value: "$11.4K/mo · $137K yr", status: "Draft",     statusTone: "accent", conf: 87, version: "Recommended", from: "Bridge · 4m ago", initials: "LD", bg: "#0c4a6e", priority: true },
    { client: "Northwind Optics",      industry: "DTC · eyewear",            value: "$8.6K/mo · $103K yr", status: "Sent",      statusTone: "neutral", conf: 92, version: "Recommended", from: "Sent yesterday", initials: "NO", bg: "#1c1917" },
    { client: "Maple & Hide",          industry: "Hospitality · 2 hotels",   value: "$24K/mo · $288K yr",   status: "Viewing now", statusTone: "ok", conf: 78, version: "Aggressive",    from: "Open 6m",        initials: "M&H", bg: "#3f3f46", live: true },
    { client: "Hartwell Law",          industry: "Local services · law",     value: "$5.4K/mo · $65K yr",   status: "Accepted",  statusTone: "ok", conf: 96, version: "Conservative",  from: "Signed Tue",     initials: "HL", bg: "#065f46" },
    { client: "Cedarpoint SaaS",       industry: "B2B SaaS",                  value: "$18K/mo · $216K yr",  status: "Revision",  statusTone: "warn", conf: 71, version: "Recommended", from: "Feedback rec.",  initials: "CP", bg: "#7c2d12" },
    { client: "Glasswing Studios",     industry: "B2B · creative",            value: "$6.2K/mo · $74K yr",  status: "Expired",   statusTone: "neutral", conf: 64, version: "Recommended", from: "Expired Mon",  initials: "GS", bg: "#374151" },
  ];

  return (
    <div className="br-frame" style={{ flexDirection: "row" }}>
      {/* simple left nav */}
      <aside style={{ width: 240, flexShrink: 0, borderRight: "1px solid var(--line)", padding: "20px 18px 18px 22px", display: "flex", flexDirection: "column", gap: 18 }}>
        <CompassWordmark/>
        <div style={{ display: "flex", flexDirection: "column", gap: 1, marginTop: 8 }}>
          {[
            ["All proposals", "folder",  47, true],
            ["Draft",         "pen",     8],
            ["Sent",          "upload",  12],
            ["Accepted",      "check",   18],
            ["Revisions",     "alert",   3],
            ["Archive",       "layers",  6],
          ].map(([t, i, n, active]) => (
            <div key={t} style={{
              display: "flex", alignItems: "center", gap: 10, padding: "7px 10px", borderRadius: 7,
              background: active ? "var(--surface)" : "transparent",
              border: active ? "1px solid var(--line)" : "1px solid transparent",
              boxShadow: active ? "var(--shadow-1)" : "none",
              cursor: "pointer",
            }}>
              <Icon name={i} size={13} color={active ? "var(--accent)" : "var(--ink-4)"}/>
              <span style={{ flex: 1, fontSize: 13, fontWeight: active ? 600 : 500, color: active ? "var(--ink)" : "var(--ink-2)" }}>{t}</span>
              <span className="br-mono br-num" style={{ fontSize: 11, color: "var(--ink-5)" }}>{n}</span>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 12 }}>
          <div className="br-eyebrow" style={{ marginBottom: 8, paddingLeft: 10, fontSize: 10 }}>Teammates</div>
          {[["Sam Patel", "SP", "#7c2d12"], ["Jess Kwon", "JK", "#0c4a6e"], ["Mike Diaz", "MD", "#065f46"]].map(([n, ini, bg]) => (
            <div key={n} style={{ display: "flex", alignItems: "center", gap: 10, padding: "6px 10px", borderRadius: 7 }}>
              <div style={{ width: 22, height: 22, borderRadius: 999, background: bg, color: "#fff", display: "grid", placeItems: "center", fontSize: 10.5, fontWeight: 600 }}>{ini}</div>
              <span style={{ fontSize: 12.5, color: "var(--ink-2)" }}>{n}</span>
            </div>
          ))}
        </div>
        <div style={{ marginTop: "auto", fontSize: 10.5, color: "var(--ink-5)", paddingLeft: 4 }}>
          Compass · Digital Native
        </div>
      </aside>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        {/* top bar */}
        <div style={{ padding: "20px 36px", borderBottom: "1px solid var(--line)", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
          <div>
            <Pill tone="neutral" size="sm">All proposals</Pill>
            <h1 className="br-h1" style={{ fontSize: 26, marginTop: 8, marginBottom: 0, letterSpacing: "-0.02em" }}>47 proposals in flight</h1>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ display: "flex", alignItems: "center", background: "var(--surface)", border: "1px solid var(--line-strong)", borderRadius: 8, height: 36, padding: "0 12px", boxShadow: "var(--shadow-1)" }}>
              <Icon name="search" size={14} color="var(--ink-4)"/>
              <input placeholder="Search clients, proposals…" style={{ marginLeft: 8, border: "none", outline: "none", background: "transparent", fontFamily: "var(--font-sans)", fontSize: 13, width: 220 }}/>
              <span className="br-mono" style={{ marginLeft: 8, fontSize: 10.5, color: "var(--ink-5)", padding: "1px 5px", border: "1px solid var(--line)", borderRadius: 4 }}>⌘K</span>
            </div>
            <Button variant="outline" size="md" icon="sliders">Filter</Button>
            <Button variant="accent" size="md" icon="plus">New proposal</Button>
          </div>
        </div>

        {/* KPI strip */}
        <div style={{ padding: "20px 36px 12px", display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 12, flexShrink: 0 }}>
          {[
            ["Open value",      "$1.42M",   "+18% wk", "ok"],
            ["Avg. close rate", "62%",      "+4 pts",  "ok"],
            ["Avg. value",      "$11.8K/mo","steady",  "neutral"],
            ["Avg. time to close", "9.3d",  "-2.1d",   "ok"],
            ["Compass confidence", "84/100","stable",  "neutral"],
          ].map(([k, v, d, t]) => (
            <div key={k} style={{ padding: 14, background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 10 }}>
              <div className="br-eyebrow" style={{ fontSize: 9.5 }}>{k}</div>
              <div className="br-num" style={{ fontSize: 20, fontWeight: 600, letterSpacing: "-0.02em", marginTop: 4 }}>{v}</div>
              <div style={{ fontSize: 11, color: t === "ok" ? "var(--ok)" : "var(--ink-4)", marginTop: 2, fontWeight: 500 }}>{d}</div>
            </div>
          ))}
        </div>

        {/* table */}
        <div className="br-scroll" style={{ flex: 1, overflowY: "auto", padding: "12px 36px 28px" }}>
          {/* header */}
          <div style={{
            display: "grid", gridTemplateColumns: "1.3fr 1fr 0.9fr 0.7fr 0.8fr 60px",
            padding: "8px 16px", gap: 12,
            fontSize: 10.5, color: "var(--ink-5)", fontFamily: "var(--font-mono)",
            textTransform: "uppercase", letterSpacing: ".06em", fontWeight: 600,
          }}>
            <span>Client</span><span>Value</span><span>Status</span><span>Confidence</span><span>Source</span><span/>
          </div>

          <div style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 12, overflow: "hidden", boxShadow: "var(--shadow-1)" }}>
            {proposals.map((p, i) => (
              <div key={p.client} style={{
                display: "grid", gridTemplateColumns: "1.3fr 1fr 0.9fr 0.7fr 0.8fr 60px",
                padding: "14px 16px", gap: 12, alignItems: "center",
                borderTop: i > 0 ? "1px solid var(--line-faint)" : "none",
                background: p.priority ? "linear-gradient(90deg, rgba(79,70,229,.04) 0%, transparent 60%)" : "transparent",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: p.bg, color: "#fff", display: "grid", placeItems: "center", fontWeight: 600, fontSize: 11.5, letterSpacing: "-0.01em", flexShrink: 0 }}>{p.initials}</div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <span style={{ fontSize: 13.5, fontWeight: 600, letterSpacing: "-0.005em" }}>{p.client}</span>
                      {p.priority && <Pill tone="accent" size="sm" icon="sparkle">Just drafted</Pill>}
                    </div>
                    <div style={{ fontSize: 11.5, color: "var(--ink-4)" }}>{p.industry}</div>
                  </div>
                </div>
                <div>
                  <div className="br-num" style={{ fontSize: 13.5, fontWeight: 600 }}>{p.value.split("·")[0].trim()}</div>
                  <div className="br-mono" style={{ fontSize: 10.5, color: "var(--ink-5)" }}>{p.value.split("·")[1]?.trim()}</div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <Pill tone={p.statusTone} size="sm">
                    {p.live && <span style={{ width: 5, height: 5, borderRadius: 999, background: "var(--ok)", animation: "br-pulse-soft 1.4s ease-in-out infinite", display: "inline-block", marginRight: 2 }}/>}
                    {p.status}
                  </Pill>
                  <span className="br-mono" style={{ fontSize: 10.5, color: "var(--ink-5)" }}>{p.version}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <div style={{ width: 50, height: 4, borderRadius: 999, background: "var(--surface-3)", overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${p.conf}%`, background: p.conf >= 85 ? "var(--ok)" : p.conf >= 70 ? "var(--accent)" : "var(--warn)" }}/>
                  </div>
                  <span className="br-mono br-num" style={{ fontSize: 11.5, color: "var(--ink-3)", width: 24 }}>{p.conf}</span>
                </div>
                <div className="br-mono" style={{ fontSize: 11, color: "var(--ink-4)" }}>{p.from}</div>
                <div style={{ textAlign: "right" }}>
                  <Icon name="chevron_right" size={14} color="var(--ink-4)"/>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 02 — Auto-draft generating (post-Bridge handoff)
// ─────────────────────────────────────────────────────────────
function CGenerating() {
  const steps = [
    { label: "Ingesting Bridge data",      sub: "127 fields · 7 assets · 4 access tokens",       state: "done", time: "0:02" },
    { label: "Resolving industry baselines", sub: "Healthcare · multi-loc · Burlington MSA",     state: "done", time: "0:04" },
    { label: "Detecting constraints",       sub: "Williston fill = primary lever",                state: "done", time: "0:06" },
    { label: "Assembling modular scope",    sub: "8 modules selected from 14",                    state: "doing", time: "0:09" },
    { label: "Pricing 3 tiers",             sub: "Anchored to budget + industry benchmarks",     state: "queued" },
    { label: "Running ROI simulation",      sub: "Low / Expected / High across 12 mo",            state: "queued" },
    { label: "Drafting strategy narrative", sub: "AI · Compass voice · review required",          state: "queued" },
    { label: "Building client preview",     sub: "Cover · scope · pricing · accept flow",         state: "queued" },
  ];

  return (
    <div className="br-frame" style={{ background: "linear-gradient(180deg, #faf8ff 0%, var(--bg) 50%, var(--bg) 100%)" }}>
      <div style={{ padding: "24px 56px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
        <CompassWordmark/>
        <Pill tone="ai" size="sm" icon="sparkle">Drafting from Bridge · LSD-7F2A</Pill>
      </div>

      <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: 0, padding: "16px 0", alignItems: "center" }}>
        {/* Left — hero */}
        <div style={{ padding: "0 56px" }}>
          {/* compass needle animation */}
          <div style={{ position: "relative", width: 120, height: 120, marginBottom: 24 }}>
            <div style={{
              position: "absolute", inset: 0, borderRadius: 999,
              background: "radial-gradient(circle, rgba(124,58,237,.18) 0%, transparent 60%)",
              animation: "br-pulse-soft 2s ease-in-out infinite",
            }}/>
            <div style={{
              width: 100, height: 100, borderRadius: 999, position: "absolute", top: 10, left: 10,
              background: "radial-gradient(circle at 30% 30%, #fff, #f5f5f4)",
              border: "1px solid var(--line-strong)", boxShadow: "var(--shadow-2)",
              display: "grid", placeItems: "center",
            }}>
              <svg width="50" height="50" viewBox="0 0 20 20" style={{ animation: "spin 4s linear infinite" }}>
                <polygon points="10,2 12,10 10,18 8,10" fill="var(--accent)"/>
                <polygon points="10,2 12,10 10,10" fill="#7c3aed"/>
                <circle cx="10" cy="10" r="1.4" fill="#0c0a09"/>
              </svg>
            </div>
            <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
          </div>

          <Pill tone="ai" size="sm" icon="sparkle">Compass engine · v3.2</Pill>
          <h1 className="br-h1" style={{ fontSize: 38, marginTop: 14, marginBottom: 14, letterSpacing: "-0.025em" }}>
            Drafting Lakeside Dental's<br/>
            <span style={{ color: "var(--ink-4)" }}>strategy and proposal.</span>
          </h1>
          <p className="br-bodyLg" style={{ marginTop: 0, marginBottom: 28, maxWidth: 460 }}>
            We're translating 127 Bridge fields into a modular offer, three-tier pricing, an ROI simulation, and a client-ready narrative. You'll be able to edit everything.
          </p>

          <div style={{ display: "flex", gap: 16, alignItems: "baseline" }}>
            <div>
              <div className="br-eyebrow" style={{ fontSize: 10 }}>Est. completion</div>
              <div className="br-num" style={{ fontSize: 28, fontWeight: 600, letterSpacing: "-0.02em" }}>3 min 12 s</div>
            </div>
            <div style={{ width: 1, height: 32, background: "var(--line)" }}/>
            <div>
              <div className="br-eyebrow" style={{ fontSize: 10 }}>Modules</div>
              <div className="br-num" style={{ fontSize: 28, fontWeight: 600, letterSpacing: "-0.02em" }}>8 / 14</div>
            </div>
            <div style={{ width: 1, height: 32, background: "var(--line)" }}/>
            <div>
              <div className="br-eyebrow" style={{ fontSize: 10 }}>Confidence</div>
              <div className="br-num" style={{ fontSize: 28, fontWeight: 600, letterSpacing: "-0.02em" }}>87</div>
            </div>
          </div>
        </div>

        {/* Right — engine log */}
        <div style={{ padding: "0 56px 0 16px" }}>
          <Card padding={0} style={{ overflow: "hidden" }}>
            <div style={{ padding: "14px 18px", borderBottom: "1px solid var(--line)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 6, height: 6, borderRadius: 999, background: "var(--accent)", animation: "br-pulse-soft 1.2s ease-in-out infinite" }}/>
                <span style={{ fontSize: 13, fontWeight: 600 }}>Engine</span>
                <span className="br-mono" style={{ fontSize: 11, color: "var(--ink-5)" }}>job/lsd-7f2a-draft-v2</span>
              </div>
              <span className="br-mono" style={{ fontSize: 11, color: "var(--ink-4)" }}>00:09 elapsed</span>
            </div>
            <div style={{ padding: "10px 18px 16px" }}>
              {steps.map((s, i) => (
                <div key={s.label} style={{ display: "flex", gap: 12, padding: "10px 0", position: "relative" }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <div style={{
                      width: 18, height: 18, borderRadius: 999, marginTop: 2, flexShrink: 0,
                      display: "grid", placeItems: "center",
                      background: s.state === "done" ? "var(--ink)" : s.state === "doing" ? "var(--accent-soft)" : "var(--surface-2)",
                      border: s.state === "doing" ? "1.5px solid var(--accent)" : s.state === "done" ? "1px solid var(--ink)" : "1.5px solid var(--line-strong)",
                      color: "#fff",
                    }}>
                      {s.state === "done"  && <Icon name="check" size={10} strokeWidth={3}/>}
                      {s.state === "doing" && <div style={{ width: 6, height: 6, borderRadius: 999, background: "var(--accent)" }}/>}
                    </div>
                    {i < steps.length - 1 && <div style={{ flex: 1, width: 1.5, background: "var(--line)", minHeight: 8 }}/>}
                  </div>
                  <div style={{ flex: 1, paddingBottom: i < steps.length - 1 ? 4 : 0 }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <span style={{ fontSize: 13, fontWeight: s.state === "doing" ? 600 : 500, color: s.state === "queued" ? "var(--ink-4)" : "var(--ink)" }}>{s.label}</span>
                      {s.time && <span className="br-mono" style={{ fontSize: 10.5, color: "var(--ink-5)" }}>{s.time}</span>}
                    </div>
                    <div style={{ fontSize: 11.5, color: "var(--ink-4)" }}>{s.sub}</div>
                    {s.state === "doing" && (
                      <div style={{ marginTop: 6, height: 3, borderRadius: 999, background: "var(--surface-3)", overflow: "hidden" }}>
                        <div style={{ height: "100%", width: "62%", background: "linear-gradient(90deg, var(--accent) 0%, #a78bfa 100%)", borderRadius: 999 }}/>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <div style={{ marginTop: 12, fontSize: 11.5, color: "var(--ink-5)", textAlign: "center" }}>
            You'll be notified when the draft is ready. Feel free to close this tab.
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 03 — Modular Scope (the primary workspace view)
// ─────────────────────────────────────────────────────────────
function CModularScope() {
  return (
    <div className="br-frame" style={{ flexDirection: "row" }}>
      <WorkspaceRail activeId="scope"/>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <ProposalToolbar activeVersion="rec"/>
        <div className="br-scroll" style={{ flex: 1, overflowY: "auto", padding: "28px 36px 32px" }}>
          <SectionHeader
            eyebrow="Build · Modular scope"
            title="Assemble the offer."
            subtitle="Each module has effort, impact, time, and cost. Toggle on/off — Compass keeps the tiers, ROI and narrative in sync."
            right={
              <div style={{ display: "flex", gap: 8 }}>
                <Button variant="outline" size="sm" icon="sparkle">Re-suggest</Button>
                <Button variant="outline" size="sm" icon="plus">Add module</Button>
              </div>
            }
          />

          {/* category groups */}
          {[
            { cat: "Foundation", desc: "Brand, web, baseline assets — done once, used everywhere.", modules: [
                { icon: "monitor", title: "Website refresh + 3 location pages", category: "Foundation · Build", cost: "$14,800", effort: 7, impact: 8, time: "6 wks", active: true, recommended: true },
                { icon: "brush",   title: "Brand refresh (light)",              category: "Foundation · Identity", cost: "—",       effort: 4, impact: 4, time: "3 wks", active: false },
            ]},
            { cat: "Acquisition", desc: "Where the new patients actually come from.", modules: [
                { icon: "megaphone", title: "Meta + Google paid acquisition", category: "Acquisition · Paid",  cost: "$3,200/mo",    effort: 6, impact: 9, time: "ongoing", active: true, recommended: true },
                { icon: "search",    title: "Local SEO + Reviews program",    category: "Acquisition · Organic", cost: "$1,800/mo",  effort: 5, impact: 8, time: "ongoing", active: true, recommended: true },
                { icon: "pen",       title: "Content marketing — weekly",     category: "Acquisition · Organic", cost: "$2,400/mo",  effort: 6, impact: 6, time: "ongoing", active: false },
            ]},
            { cat: "Conversion", desc: "Turning visits and calls into booked first visits.", modules: [
                { icon: "target",  title: "Williston dedicated landing page", category: "Conversion · Build",   cost: "$2,200",      effort: 3, impact: 9, time: "2 wks", active: true, recommended: true },
                { icon: "bolt",    title: "Online booking — Dentrix integration", category: "Conversion · Build", cost: "$3,600",   effort: 6, impact: 8, time: "3 wks", active: true },
            ]},
            { cat: "Retention", desc: "Cheaper than acquisition — and what funds the rest.", modules: [
                { icon: "users",   title: "Recall automation (Beacon workflow)",    category: "Retention · Automation", cost: "$1,200/mo", effort: 4, impact: 7, time: "2 wks", active: true, recommended: true },
                { icon: "mail",    title: "Patient newsletter — monthly",          category: "Retention · Content",     cost: "$900/mo",   effort: 3, impact: 4, time: "ongoing", active: false },
                { icon: "star",    title: "Review acquisition program",            category: "Retention · Ops",         cost: "$600/mo",   effort: 2, impact: 6, time: "ongoing", active: true, recommended: true },
            ]},
          ].map((grp) => (
            <div key={grp.cat} style={{ marginBottom: 24 }}>
              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 10 }}>
                <div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
                    <h3 className="br-h3" style={{ fontSize: 15, margin: 0 }}>{grp.cat}</h3>
                    <span className="br-mono" style={{ fontSize: 11, color: "var(--ink-5)" }}>{grp.modules.filter(m => m.active).length} of {grp.modules.length} active</span>
                  </div>
                  <div style={{ fontSize: 12.5, color: "var(--ink-4)", marginTop: 1 }}>{grp.desc}</div>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {grp.modules.map((m) => <ServiceBlock key={m.title} {...m}/>)}
              </div>
            </div>
          ))}

          {/* Auto-scope intelligence callout */}
          <AICallout title="Auto-scope intelligence · 2 calls">
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                <Pill tone="warn" size="sm" icon="alert">Conflict</Pill>
                <span style={{ fontSize: 13, color: "var(--ink-2)" }}>
                  <strong style={{ color: "var(--ink)" }}>Content marketing</strong> would compete for attention with the Williston ramp-up. We've left it off Recommended — consider adding in month 4.
                </span>
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                <Pill tone="ai" size="sm" icon="sparkle">Reframe</Pill>
                <span style={{ fontSize: 13, color: "var(--ink-2)" }}>
                  Brand refresh is overscoped for the goal. Replaced with a <strong style={{ color: "var(--ink)" }}>light Williston-specific extension</strong> bundled into the landing page module — saves $4.8K and 3 weeks.
                </span>
              </div>
            </div>
          </AICallout>
        </div>

        {/* sticky totals footer */}
        <footer style={{ borderTop: "1px solid var(--line)", padding: "12px 36px", background: "var(--surface)", display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr auto", gap: 24, alignItems: "center", flexShrink: 0 }}>
          <div>
            <div className="br-eyebrow" style={{ fontSize: 9.5 }}>One-time</div>
            <div className="br-num" style={{ fontSize: 18, fontWeight: 600, letterSpacing: "-0.02em" }}>$20,600</div>
          </div>
          <div>
            <div className="br-eyebrow" style={{ fontSize: 9.5 }}>Monthly retainer</div>
            <div className="br-num" style={{ fontSize: 18, fontWeight: 600, letterSpacing: "-0.02em" }}>$8,800<span style={{ fontSize: 12, color: "var(--ink-4)", fontWeight: 400, marginLeft: 4 }}>/ mo</span></div>
          </div>
          <div>
            <div className="br-eyebrow" style={{ fontSize: 9.5 }}>12-mo total</div>
            <div className="br-num" style={{ fontSize: 18, fontWeight: 600, letterSpacing: "-0.02em" }}>$126,200</div>
          </div>
          <div>
            <div className="br-eyebrow" style={{ fontSize: 9.5 }}>vs. budget</div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 2 }}>
              <span className="br-num" style={{ fontSize: 18, fontWeight: 600, color: "var(--ok)", letterSpacing: "-0.02em" }}>−6%</span>
              <Pill tone="ok" size="sm">On budget</Pill>
            </div>
          </div>
          <Button variant="accent" size="md" iconRight="arrow_right">Tiers & pricing</Button>
        </footer>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 04 — Pricing tiers (Starter / Growth / Scale)
// ─────────────────────────────────────────────────────────────
function CPricing() {
  return (
    <div className="br-frame" style={{ flexDirection: "row" }}>
      <WorkspaceRail activeId="pricing"/>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <ProposalToolbar activeVersion="rec"/>
        <div className="br-scroll" style={{ flex: 1, overflowY: "auto", padding: "28px 36px 32px" }}>
          <SectionHeader
            eyebrow="Build · Pricing tiers"
            title="Three offers, anchored to value."
            subtitle="Compass anchors high, leads with the recommended tier, and frames Starter as the safe alternative. Edit any cell — recalculation is instant."
            right={
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span className="br-mono" style={{ fontSize: 11, color: "var(--ink-5)" }}>BENCHMARK</span>
                <Pill tone="neutral" size="sm">Healthcare · 3-loc · Northeast US</Pill>
              </div>
            }
          />

          {/* anchor band */}
          <div style={{
            background: "linear-gradient(180deg, #faf8ff 0%, #fff 100%)",
            border: "1px solid #e9e3ff", borderRadius: 12, padding: 16,
            display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 16, marginBottom: 24,
          }}>
            {[
              ["Industry baseline · monthly",  "$12.4K"],
              ["Top-quartile spend (similar size)", "$18.6K"],
              ["Client stated budget",         "$9.5K"],
              ["Compass anchor (rec.)",        "$10.4K", "accent"],
            ].map(([k, v, tone], i) => (
              <div key={k} style={{ borderRight: i < 3 ? "1px solid var(--line)" : "none", paddingRight: 12 }}>
                <div className="br-eyebrow" style={{ fontSize: 9.5 }}>{k}</div>
                <div className="br-num" style={{ fontSize: 22, fontWeight: 600, letterSpacing: "-0.025em", marginTop: 4, color: tone === "accent" ? "var(--accent)" : "var(--ink)" }}>{v}</div>
              </div>
            ))}
          </div>

          {/* Three tiers */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.05fr 1fr", gap: 16, alignItems: "stretch", marginBottom: 24 }}>
            <TierCard
              name="Starter"
              tagline="Williston-first, low risk. Fill the new chair before scaling the rest."
              price="$5,400"
              anchor="$7.2K"
              savings="−25%"
              items={[
                ["Williston landing page",                true,  "Single dedicated page"],
                ["Meta paid (Williston only)",            true,  "$1.5K/mo media + management"],
                ["Local SEO — Williston GBP",             true,  null],
                ["Online booking — Dentrix",              true,  null],
                ["Review acquisition program",            true,  null],
                ["Site refresh (3 locations)",            false, null],
                ["Multi-channel paid acquisition",        false, null],
                ["Recall automation",                     false, null],
              ]}
            />
            <TierCard
              name="Growth"
              tagline="The Compass recommendation. Williston + system-wide acquisition + retention."
              price="$8,800"
              anchor="$10.4K"
              savings="−15%"
              featured
              badge="Recommended"
              items={[
                ["Everything in Starter",                 true,  null],
                ["Site refresh + 3 location pages",       true,  "Web + on-page SEO"],
                ["Meta + Google + Maps (all locations)",  true,  "$3.2K/mo media + mgmt"],
                ["Local SEO — full Chittenden Cty",       true,  null],
                ["Recall automation (Beacon)",            true,  "Saves ~5 hr/wk admin"],
                ["Quarterly strategy reviews",            true,  null],
                ["Content marketing — weekly",            false, null],
                ["Dedicated strategist",                  false, null],
              ]}
            />
            <TierCard
              name="Scale"
              tagline="Aggressive growth bet. Built to fund a 4th location within 12 months."
              price="$14,200"
              items={[
                ["Everything in Growth",                  true,  null],
                ["Content marketing — weekly",            true,  "Editorial + social + video"],
                ["TikTok + YouTube paid",                 true,  null],
                ["Patient newsletter — monthly",          true,  null],
                ["Multi-location attribution (Radar)",    true,  null],
                ["Dedicated strategist",                  true,  "Sam Patel"],
                ["Monthly executive reporting",           true,  null],
                ["Quarterly brand audits",                true,  null],
              ]}
            />
          </div>

          {/* Value justification */}
          <Card padding={20}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
              <div>
                <div className="br-eyebrow">Value justification</div>
                <div style={{ fontSize: 16, fontWeight: 600, marginTop: 4, letterSpacing: "-0.01em" }}>Why Growth pays for itself in month 5</div>
              </div>
              <Pill tone="ai" size="sm" icon="sparkle">AI-generated · edit</Pill>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
              {[
                ["Avg. new patient LTV",       "$4,200", "Dental · 3-yr"],
                ["Recommended monthly spend",  "$8,800", "Growth tier"],
                ["Breakeven new patients",     "13 / mo", "Math: spend ÷ LTV"],
                ["Compass forecast (expected)", "44 / mo", "From ROI model"],
              ].map(([k, v, s]) => (
                <div key={k} style={{ padding: 14, background: "var(--surface-2)", border: "1px solid var(--line)", borderRadius: 10 }}>
                  <div className="br-eyebrow" style={{ fontSize: 9.5 }}>{k}</div>
                  <div className="br-num" style={{ fontSize: 22, fontWeight: 600, letterSpacing: "-0.025em", marginTop: 4 }}>{v}</div>
                  <div className="br-mono" style={{ fontSize: 10.5, color: "var(--ink-5)", marginTop: 2 }}>{s}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { CInbox, CGenerating, CModularScope, CPricing });
