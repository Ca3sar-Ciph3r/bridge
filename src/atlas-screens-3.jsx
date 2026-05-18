/* global React, Icon, Button, Pill, Card, Toggle, Field, Input,
   AtlasShell, AtlasTopBar, HealthDot, ClientAvatar, ClientChip, PersonAvatar, OpsKpi, AppPill, CLIENTS, TEAM, APPS */
// Atlas — screens part 3: Ecosystem Map, Onboarding/Empty, Command bar

// ─────────────────────────────────────────────────────────────
// 07 — Ecosystem Connection Map
// Atlas is shown as the orchestration spine — not a passive node
// ─────────────────────────────────────────────────────────────
function AEcosystem() {
  return (
    <AtlasShell
      active="ecosystem"
      topBar={<AtlasTopBar
        section="COORDINATE · ECOSYSTEM"
        title="The connected system"
        sub="Atlas orchestrates 5 products + ClickUp · 24 typed event contracts · 1.4s p50"
        right={
          <div style={{ display: "flex", gap: 8 }}>
            <Button variant="ghost" size="sm" icon="info">Architecture</Button>
            <Button variant="outline" size="sm" icon="bolt">Live event stream</Button>
          </div>
        }/>}
    >
      <div className="br-scroll" style={{ flex: 1, overflowY: "auto", padding: "20px 28px 32px" }}>

        {/* Stat strip */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 10, marginBottom: 18 }}>
          <OpsKpi label="Products in ecosystem" value="5"      sub="Bridge → Beacon"   icon="layers"/>
          <OpsKpi label="Event contracts"       value="24"     sub="typed · versioned" icon="bolt"   tone="neutral"/>
          <OpsKpi label="Events · last 24h"     value="2,840"  sub="across all apps"   icon="layers"/>
          <OpsKpi label="Cross-app latency p50" value="1.4s"   sub="end-to-end"         icon="target" tone="ok"/>
          <OpsKpi label="Failed events · 24h"   value="1 / 2,840" sub="auto-retry · 1 client-side" tone="warn" icon="alert"/>
        </div>

        {/* The map */}
        <Card padding={20} style={{ marginBottom: 14, position: "relative", overflow: "hidden" }}>
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: "radial-gradient(circle at 1px 1px, var(--line) 1px, transparent 0)",
            backgroundSize: "18px 18px", opacity: .55, pointerEvents: "none",
          }}/>
          <div style={{ position: "relative" }}>
            <svg viewBox="0 0 1280 480" style={{ width: "100%", height: "auto", display: "block" }}>
              <defs>
                <marker id="atArrowDark" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#0c0a09"/></marker>
                <marker id="atArrowAccent" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#4f46e5"/></marker>
                <linearGradient id="atlasRibbon" x1="0" x2="1">
                  <stop offset="0" stopColor="#4f46e5" stopOpacity="0"/>
                  <stop offset=".5" stopColor="#4f46e5" stopOpacity=".5"/>
                  <stop offset="1" stopColor="#4f46e5" stopOpacity="0"/>
                </linearGradient>
              </defs>

              {/* Client-facing arc (top) */}
              <text x="20" y="32" fontSize="10" fill="#a8a29e" letterSpacing="1.4">CLIENT-FACING · ARC</text>
              <text x="20" y="270" fontSize="10" fill="#a8a29e" letterSpacing="1.4">ATLAS · ORCHESTRATION SPINE</text>
              <text x="20" y="420" fontSize="10" fill="#a8a29e" letterSpacing="1.4">EXECUTION · BACKBONE</text>

              {/* Top row: Bridge, Compass, Dock, Radar */}
              <EcoBox x={80}   y={50} w={210} h={130} kind="bridge"  pos="01" subs={["Onboarding intake", "Asset capture", "Goals & ICP"]}/>
              <EcoBox x={340}  y={50} w={210} h={130} kind="compass" pos="02" subs={["Strategy + proposal", "Pricing tiers", "Contract object"]}/>
              <EcoBox x={730}  y={50} w={210} h={130} kind="dock"    pos="04" subs={["Client portal", "Approvals UI", "Live execution feed"]}/>
              <EcoBox x={990}  y={50} w={210} h={130} kind="radar"   pos="05" subs={["Unified analytics", "Anomaly detection", "Weekly reports"]}/>

              {/* Atlas (center) — hero, spans wide */}
              <EcoBox x={310}  y={250} w={660} h={120} kind="atlas"  pos="03" hero
                subs={["Workflow orchestration", "Cross-app contracts", "Workload + approvals", "Notification routing"]}/>

              {/* Bottom row: ClickUp + Beacon */}
              <EcoBox x={180}  y={420} w={300} h={70} kind="clickup" pos="ext" external
                subs={["Tasks · time · comments"]}/>
              <EcoBox x={800}  y={420} w={300} h={70} kind="beacon"  pos="06" external
                subs={["Recall workflows · triggers"]}/>

              {/* Connections from each top app down to Atlas */}
              <EcoLink from={[185, 180]} to={[420, 250]} label="bridge.complete" />
              <EcoLink from={[445, 180]} to={[520, 250]} label="compass.contract.signed" emph/>
              <EcoLink from={[835, 180]} to={[760, 250]} label="dock.approval.requested" rev/>
              <EcoLink from={[1095, 180]} to={[860, 250]} label="radar.anomaly.fired" rev/>

              {/* Atlas → ClickUp / Beacon */}
              <EcoLink from={[470, 370]} to={[340, 420]} label="atlas.task.create"/>
              <EcoLink from={[810, 370]} to={[900, 420]} label="atlas.workflow.stage"/>

              {/* Outbound from Atlas back to client-facing apps */}
              <path d="M 580 250 C 580 220, 640 220, 640 195" stroke="#4f46e5" strokeWidth="1.4" fill="none" markerEnd="url(#atArrowAccent)" opacity=".5"/>
              <path d="M 700 250 C 700 220, 800 220, 800 195" stroke="#4f46e5" strokeWidth="1.4" fill="none" markerEnd="url(#atArrowAccent)" opacity=".5"/>

              {/* Spine emphasis */}
              <path d="M 200 310 L 1080 310" stroke="url(#atlasRibbon)" strokeWidth="40" fill="none" opacity=".3"/>

              {/* Floating annotations */}
              <g transform="translate(700, 220)">
                <rect width="160" height="22" rx="6" fill="#fff" stroke="#c7d2fe"/>
                <circle cx="11" cy="11" r="3" fill="#4f46e5"/>
                <text x="22" y="11" fontSize="10.5" fill="#312e81" fontWeight="600" dy="3">routes &amp; orchestrates</text>
              </g>
            </svg>
          </div>
        </Card>

        {/* Event contracts + governance */}
        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 14 }}>
          <Card padding={0} style={{ overflow: "hidden" }}>
            <div style={{ padding: "14px 18px", borderBottom: "1px solid var(--line)" }}>
              <div className="br-eyebrow">Live event stream · last 60s</div>
              <div style={{ fontSize: 15, fontWeight: 600, marginTop: 4 }}>What's flowing through Atlas right now</div>
            </div>
            <div className="br-scroll" style={{ maxHeight: 280, overflowY: "auto", fontFamily: "var(--font-mono)" }}>
              {[
                { t: "09:42:18", from: "compass", to: "atlas",   ev: "compass.contract.signed",     ref: "hartwell · v2", lat: "1.4s" },
                { t: "09:42:18", from: "atlas",   to: "clickup", ev: "atlas.list.create",            ref: "hartwell-law",  lat: "212ms" },
                { t: "09:42:19", from: "atlas",   to: "dock",    ev: "atlas.portal.provision",       ref: "hartwell",      lat: "184ms" },
                { t: "09:42:20", from: "atlas",   to: "radar",   ev: "atlas.baseline.import",        ref: "hartwell",      lat: "queued" },
                { t: "09:38:04", from: "clickup", to: "atlas",   ev: "clickup.task.timetracked",    ref: "northwind · 1.5h", lat: "—" },
                { t: "09:32:11", from: "atlas",   to: "clickup", ev: "atlas.task.reassign",          ref: "northwind",     lat: "198ms" },
                { t: "09:21:48", from: "clickup", to: "atlas",   ev: "clickup.task.completed",      ref: "lakeside · CU-1083", lat: "—" },
                { t: "09:21:48", from: "atlas",   to: "dock",    ev: "atlas.stage.transition",       ref: "lakeside · web",lat: "168ms" },
              ].map((row, i) => (
                <div key={i} style={{ display: "grid", gridTemplateColumns: "70px auto 14px auto 1fr 60px", padding: "8px 18px", gap: 8, alignItems: "center", borderTop: i > 0 ? "1px solid var(--line-faint)" : "none", fontSize: 10.5 }}>
                  <span style={{ color: "var(--ink-5)" }}>{row.t}</span>
                  <AppPill kind={row.from} size="sm"/>
                  <Icon name="arrow_right" size={11} color="var(--ink-4)"/>
                  <AppPill kind={row.to} size="sm"/>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ color: "var(--accent)", fontWeight: 600 }}>{row.ev}</span>
                    <span style={{ color: "var(--ink-3)", fontFamily: "var(--font-sans)" }}>· {row.ref}</span>
                  </div>
                  <span style={{ color: "var(--ok)", textAlign: "right" }}>{row.lat}</span>
                </div>
              ))}
            </div>
          </Card>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <Card padding={18}>
              <div className="br-eyebrow" style={{ marginBottom: 10 }}>Per-app health</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {[
                  ["bridge",  "ok",   "All sessions live"],
                  ["compass", "ok",   "8 in flight"],
                  ["dock",    "ok",   "23 active client sessions"],
                  ["radar",   "ok",   "8 platforms syncing"],
                  ["beacon",  "warn", "1 client API issue"],
                  ["clickup", "ok",   "Sub-200ms p50"],
                ].map(([k, state, sub]) => (
                  <div key={k} style={{ display: "grid", gridTemplateColumns: "auto 1fr auto", gap: 8, alignItems: "center", padding: "6px 0", borderTop: "1px solid var(--line-faint)" }}>
                    <AppPill kind={k} size="sm"/>
                    <span style={{ fontSize: 11.5, color: "var(--ink-4)" }}>{sub}</span>
                    <HealthDot state={state} pulse={state === "warn"}/>
                  </div>
                ))}
              </div>
            </Card>

            <Card padding={18}>
              <div className="br-eyebrow" style={{ marginBottom: 6 }}>Contract governance</div>
              <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 10, letterSpacing: "-0.005em" }}>24 typed event contracts</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {[
                  ["Stable",       "v2.x", 18, "var(--ok)"],
                  ["Beta",         "v1.x", 4,  "var(--accent)"],
                  ["Deprecated",   "v0.x", 2,  "var(--warn)"],
                ].map(([l, v, n, c]) => (
                  <div key={l} style={{ display: "flex", alignItems: "center", gap: 8, padding: "5px 0", borderTop: "1px solid var(--line-faint)" }}>
                    <span style={{ width: 7, height: 7, borderRadius: 999, background: c }}/>
                    <span style={{ fontSize: 12, flex: 1 }}>{l}</span>
                    <span className="br-mono" style={{ fontSize: 10.5, color: "var(--ink-5)" }}>{v}</span>
                    <span className="br-mono br-num" style={{ fontSize: 11, fontWeight: 600 }}>{n}</span>
                  </div>
                ))}
              </div>
            </Card>

            <div style={{ padding: 12, background: "var(--surface-2)", border: "1px dashed var(--line-strong)", borderRadius: 8, fontSize: 11, color: "var(--ink-3)", lineHeight: 1.55 }}>
              <Icon name="info" size={11}/> Every cross-app contract is versioned. Atlas refuses to dispatch unrecognized event versions — failures surface as a notification, not silent data loss.
            </div>
          </div>
        </div>
      </div>
    </AtlasShell>
  );
}

function EcoBox({ x, y, w, h, kind, pos, subs, hero, external }) {
  const palette = {
    bridge:  { mark: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)", chipBg: "#eef0ff",  chipFg: "#312e81" },
    compass: { mark: "#fff",                                              chipBg: "#faf8ff",  chipFg: "#312e81", markStroke: "#d6d3d1" },
    dock:    { mark: "linear-gradient(180deg, #0c0a09 0%, #292524 100%)", chipBg: "#f5f5f4",  chipFg: "#0c0a09" },
    radar:   { mark: "#0891b2",                                           chipBg: "#cffafe",  chipFg: "#155e75" },
    atlas:   { mark: "linear-gradient(135deg, #0c0a09 0%, #4f46e5 100%)", chipBg: "#eef0ff",  chipFg: "#312e81" },
    clickup: { mark: "#7b68ee",                                           chipBg: "#ede9fe",  chipFg: "#5b21b6" },
    beacon:  { mark: "#b45309",                                           chipBg: "#fee2e2",  chipFg: "#991b1b" },
  }[kind];
  const stroke = hero ? "#4f46e5" : external ? "#a8a29e" : "#d6d3d1";
  return (
    <g transform={`translate(${x}, ${y})`}>
      <rect width={w} height={h} rx="14" fill="#fff" stroke={stroke} strokeWidth={hero ? 2 : 1}
        strokeDasharray={external ? "4 4" : "none"}
        style={{ filter: hero ? "drop-shadow(0 6px 20px rgba(79,70,229,.22))" : undefined }}/>
      {pos && (
        <text x="16" y="14" fontSize="9.5" fill="#a8a29e" fontFamily="var(--font-mono)" letterSpacing="1.2" dy="4">{pos}</text>
      )}
      <g transform={`translate(16, ${pos ? 30 : 16})`}>
        {kind === "compass" ? (
          <>
            <rect width="24" height="24" rx="999" fill="#fff" stroke="#d6d3d1"/>
            <polygon points="12,5 14,12 12,19 10,12" fill="#4f46e5"/>
            <circle cx="12" cy="12" r="1.2" fill="#0c0a09"/>
          </>
        ) : (
          <rect width="24" height="24" rx="6" fill={palette.mark} stroke={palette.markStroke || "none"}/>
        )}
        <text x={34} y="10" fontSize={hero ? 16 : 14} fontWeight="700" fill="#0c0a09" letterSpacing="-0.01em" dy="4">{APPS[kind]?.name || kind}</text>
        <text x={34} y={hero ? 28 : 26} fontSize="10" fill="#8a8580" dy="2">{APPS[kind]?.desc}</text>
      </g>
      {hero && (
        <g>
          <rect x={w - 64} y={12} width="50" height="16" rx="4" fill="#0c0a09"/>
          <text x={w - 39} y="20" fontSize="9.5" fill="#fff" textAnchor="middle" fontFamily="var(--font-mono)" fontWeight="700" dy="3">SPINE</text>
        </g>
      )}
      {subs && (
        <g transform={`translate(16, ${pos ? 64 : 50})`}>
          {hero ? (
            <g>
              {subs.map((s, i) => (
                <g key={s} transform={`translate(${i * 158}, 0)`}>
                  <rect width="148" height="22" rx="5" fill={palette.chipBg} opacity=".8"/>
                  <text x="10" y="11" fontSize="10.5" fill={palette.chipFg} fontFamily="var(--font-mono)" fontWeight="500" dy="3">{s}</text>
                </g>
              ))}
            </g>
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

function EcoLink({ from, to, label, rev, emph }) {
  const color = emph ? "#4f46e5" : "#0c0a09";
  const marker = emph ? "url(#atArrowAccent)" : "url(#atArrowDark)";
  // simple curved path
  const mx = (from[0] + to[0]) / 2;
  const my = from[1] + (to[1] - from[1]) / 2;
  return (
    <g>
      <path d={`M ${from[0]} ${from[1]} C ${from[0]} ${my}, ${to[0]} ${my}, ${to[0]} ${to[1]}`}
        stroke={color} strokeWidth={emph ? 1.8 : 1.3} fill="none" markerEnd={marker} opacity={emph ? 1 : .7}/>
      {label && (
        <g transform={`translate(${mx - 70}, ${my - 10})`}>
          <rect width="140" height="20" rx="5" fill="#fff" stroke={color} strokeOpacity={emph ? 1 : .5}/>
          <text x="70" y="10" fontSize="10" fill={color} textAnchor="middle" fontWeight="600" fontFamily="var(--font-mono)" dy="3">{label}</text>
        </g>
      )}
    </g>
  );
}

// ─────────────────────────────────────────────────────────────
// 08 — Onboarding / Empty State (first run)
// ─────────────────────────────────────────────────────────────
function AOnboarding() {
  return (
    <AtlasShell
      active="onboarding"
      topBar={<AtlasTopBar
        section="SETUP · ONBOARDING"
        title="Welcome to Atlas"
        sub="3 of 5 steps complete · most of this is automatic"
        right={<Pill tone="accent" size="sm" icon="sparkle">Setup in progress · 62%</Pill>}/>}
    >
      <div className="br-scroll" style={{ flex: 1, overflowY: "auto", padding: "32px 28px 36px" }}>
        <div style={{ maxWidth: 920 }}>
          <Pill tone="neutral" size="sm">First-run setup</Pill>
          <h1 className="br-h1" style={{ fontSize: 30, marginTop: 12, marginBottom: 8, letterSpacing: "-0.025em" }}>
            Let's wire Digital Native into Atlas.<br/>
            <span style={{ color: "var(--ink-4)" }}>This usually takes about 4 minutes.</span>
          </h1>
          <p className="br-bodyLg" style={{ marginTop: 0, marginBottom: 28, maxWidth: 720 }}>
            Atlas inherits everything from your other tools — Bridge, Compass, ClickUp. You won't be re-keying client lists or rebuilding workflows. Just confirm and we're off.
          </p>

          {/* Progress overview */}
          <Card padding={20} style={{ marginBottom: 18 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14 }}>
              <div style={{ position: "relative", width: 64, height: 64, flexShrink: 0 }}>
                <svg viewBox="0 0 36 36" style={{ width: "100%", height: "100%", transform: "rotate(-90deg)" }}>
                  <circle cx="18" cy="18" r="15.9" fill="none" stroke="var(--surface-3)" strokeWidth="3"/>
                  <circle cx="18" cy="18" r="15.9" fill="none" stroke="var(--accent)" strokeWidth="3" strokeDasharray="62 100" strokeLinecap="round"/>
                </svg>
                <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", fontSize: 14, fontWeight: 700, fontVariantNumeric: "tabular-nums" }}>3/5</div>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>You're nearly there</div>
                <div style={{ fontSize: 12.5, color: "var(--ink-4)" }}>2 steps remain · approval routing and notification preferences. Both take under a minute each.</div>
              </div>
              <Button variant="primary" size="md" iconRight="arrow_right">Continue setup</Button>
            </div>
          </Card>

          {/* Step list */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <SetupStep
              num="01"
              done
              icon="folder"
              title="Sync from Bridge & Compass"
              detail="6 clients imported · 11 active projects · 14 stored deliverables · automatic"
              meta={[
                ["lakeside",  "Engagement · M4"],
                ["northwind", "Engagement · M2"],
                ["maple",     "Engagement · M5"],
                ["hartwell",  "Engagement · onboarding"],
                ["cedarpoint","Proposal · v2"],
                ["glasswing", "Kickoff"],
              ]}
              metaKind="clients"
            />

            <SetupStep
              num="02"
              done
              icon="globe"
              title="Connect ClickUp workspace"
              detail="6 workspaces detected and linked · 142 tasks synced · webhook live"
              meta={[
                ["lakeside-dental",  "4 lists · 142 tasks"],
                ["northwind-optics", "2 lists · 68 tasks"],
                ["maple-hide",       "3 lists · 184 tasks"],
                ["hartwell-law",     "1 list · 22 tasks"],
              ]}
              metaKind="clickup"
            />

            <SetupStep
              num="03"
              done
              icon="users"
              title="Invite your team"
              detail="5 teammates joined · roles auto-assigned from ClickUp groups"
              meta={[
                ["sam",  "Strategy lead"],
                ["jess", "Designer"],
                ["mike", "Implementation"],
                ["tom",  "Developer"],
                ["lin",  "Founder · you"],
              ]}
              metaKind="team"
            />

            <SetupStep
              num="04"
              active
              icon="check"
              title="Configure approval routing"
              detail="Tell Atlas who reviews what kind of work. Smart defaults are pre-filled — edit only the ones that need it."
              actionPanel
            />

            <SetupStep
              num="05"
              icon="bolt"
              title="Set up notification preferences"
              detail="Where critical alerts go (Slack? Email? Mobile?) and who's on-call after hours."
            />
          </div>

          {/* Skip / what is */}
          <div style={{ marginTop: 24, padding: 18, background: "var(--surface-2)", border: "1px dashed var(--line-strong)", borderRadius: 12, display: "flex", alignItems: "center", gap: 16 }}>
            <Icon name="info" size={18} color="var(--ink-4)"/>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 2 }}>You can skip the rest and configure later</div>
              <div style={{ fontSize: 12.5, color: "var(--ink-4)" }}>Atlas works with sensible defaults — but the dashboard gets sharper once routing and notifications are tuned.</div>
            </div>
            <Button variant="ghost" size="md">Skip for now</Button>
          </div>
        </div>
      </div>
    </AtlasShell>
  );
}

function SetupStep({ num, done, active, icon, title, detail, meta, metaKind, actionPanel }) {
  return (
    <div style={{
      padding: 18,
      background: active ? "var(--surface)" : done ? "var(--surface-2)" : "var(--surface)",
      border: active ? "1.5px solid var(--accent)" : "1px solid var(--line)",
      borderRadius: 12,
      boxShadow: active ? "0 0 0 4px rgba(79,70,229,.08), var(--shadow-1)" : "var(--shadow-1)",
      display: "grid", gridTemplateColumns: "48px 1fr auto", gap: 16, alignItems: "flex-start",
    }}>
      <div style={{
        width: 36, height: 36, borderRadius: 999,
        background: done ? "var(--ink)" : active ? "var(--accent)" : "var(--surface-2)",
        color: done || active ? "#fff" : "var(--ink-4)",
        border: done ? "1px solid var(--ink)" : active ? "1px solid var(--accent)" : "1.5px solid var(--line-strong)",
        display: "grid", placeItems: "center", flexShrink: 0,
      }}>
        {done ? <Icon name="check" size={16} strokeWidth={2.6}/> : <Icon name={icon} size={15}/>}
      </div>

      <div style={{ minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
          <span className="br-mono" style={{ fontSize: 10.5, color: "var(--ink-5)", letterSpacing: ".06em" }}>STEP {num}</span>
          {done && <Pill tone="ok" size="sm" icon="check">Done</Pill>}
          {active && <Pill tone="accent" size="sm">Active</Pill>}
        </div>
        <div style={{ fontSize: 15, fontWeight: 600, letterSpacing: "-0.01em" }}>{title}</div>
        <div style={{ fontSize: 12.5, color: "var(--ink-3)", marginTop: 3, lineHeight: 1.55 }}>{detail}</div>

        {meta && metaKind === "clients" && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 12 }}>
            {meta.map(([id, sub]) => (
              <div key={id} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 8px 4px 4px", background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 999, fontSize: 11 }}>
                <ClientAvatar id={id} size={18}/>
                <span style={{ fontWeight: 500 }}>{CLIENTS[id].name}</span>
                <span className="br-mono" style={{ fontSize: 9.5, color: "var(--ink-5)" }}>{sub}</span>
              </div>
            ))}
          </div>
        )}

        {meta && metaKind === "clickup" && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 12 }}>
            {meta.map(([w, sub]) => (
              <div key={w} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 10px", background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 6, fontSize: 11, fontFamily: "var(--font-mono)" }}>
                <span style={{ width: 14, height: 14, borderRadius: 4, background: "#7b68ee", color: "#fff", display: "grid", placeItems: "center", fontSize: 8, fontWeight: 700 }}>cu</span>
                <span>{w}</span>
                <span style={{ color: "var(--ink-5)" }}>· {sub}</span>
              </div>
            ))}
          </div>
        )}

        {meta && metaKind === "team" && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 12 }}>
            {meta.map(([id, role]) => (
              <div key={id} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 10px 4px 4px", background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 999, fontSize: 11 }}>
                <PersonAvatar id={id} size={18}/>
                <span style={{ fontWeight: 500 }}>{TEAM[id].name}</span>
                <span style={{ color: "var(--ink-5)" }}>· {role}</span>
              </div>
            ))}
          </div>
        )}

        {actionPanel && (
          <div style={{ marginTop: 14, padding: 14, background: "var(--bg)", border: "1px solid var(--line)", borderRadius: 10 }}>
            <div className="br-eyebrow" style={{ fontSize: 9.5, marginBottom: 8 }}>Smart defaults · review and edit</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {[
                ["Strategy work · proposals, briefs",   "Sam (strategist) → Lin (founder)",  true],
                ["Design work · creative, layouts",     "Jess (designer) → Sam (strategist)", true],
                ["Implementation · code, automations",  "Tom + Mike → Lin (founder)",          true],
                ["Client-facing deliverables",          "Internal review → Client (via Dock)", true],
              ].map(([what, chain, on]) => (
                <div key={what} style={{ display: "flex", alignItems: "center", gap: 12, padding: "8px 10px", border: "1px solid var(--line)", borderRadius: 8, background: "var(--surface)" }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 12, fontWeight: 500 }}>{what}</div>
                    <div className="br-mono" style={{ fontSize: 10.5, color: "var(--ink-5)" }}>{chain}</div>
                  </div>
                  <Pill tone="ok" size="sm">On</Pill>
                  <Toggle on={on}/>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
              <Button variant="primary" size="sm" icon="check">Save & continue</Button>
              <Button variant="ghost" size="sm">Customize each</Button>
            </div>
          </div>
        )}
      </div>

      {!active && !meta && !actionPanel && <Button variant="ghost" size="sm" iconRight="chevron_right">Configure</Button>}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 09 — Command bar (⌘K overlay)
// ─────────────────────────────────────────────────────────────
function ACommandBar() {
  return (
    <AtlasShell
      active="dashboard"
      topBar={<AtlasTopBar section="OPERATE · DASHBOARD" title="How the business is running" sub="Thursday · May 16 · 9:42 AM"/>}
    >
      {/* Dimmed background */}
      <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, padding: "20px 28px 32px", filter: "blur(2px)", opacity: 0.45, pointerEvents: "none" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 10 }}>
            {Array(7).fill(0).map((_, i) => (
              <div key={i} style={{ padding: 14, background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 10, height: 90 }}>
                <div style={{ width: "60%", height: 6, background: "var(--surface-3)", borderRadius: 999 }}/>
                <div style={{ width: "40%", height: 20, background: "var(--ink-4)", borderRadius: 4, marginTop: 10 }}/>
              </div>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 14, marginTop: 18 }}>
            <div style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 12, height: 320 }}/>
            <div style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 12, height: 320 }}/>
          </div>
        </div>

        {/* Backdrop scrim */}
        <div style={{ position: "absolute", inset: 0, background: "rgba(28, 25, 23, 0.18)", backdropFilter: "blur(2px)" }}/>

        {/* Command palette */}
        <div style={{ position: "absolute", top: 80, left: "50%", transform: "translateX(-50%)", width: 680 }}>
          <div style={{
            background: "var(--surface)", borderRadius: 14, overflow: "hidden",
            boxShadow: "0 30px 80px -20px rgba(0,0,0,.32), 0 8px 24px -8px rgba(0,0,0,.18)",
            border: "1px solid var(--line)",
          }}>
            {/* Search */}
            <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--line)", display: "flex", alignItems: "center", gap: 12 }}>
              <Icon name="search" size={16} color="var(--ink-4)"/>
              <input
                placeholder="Search anything · type / for commands"
                defaultValue="lake"
                style={{ flex: 1, border: "none", outline: "none", background: "transparent", fontFamily: "var(--font-sans)", fontSize: 16, color: "var(--ink)", letterSpacing: "-0.005em" }}
              />
              <span className="br-mono" style={{ fontSize: 10.5, padding: "2px 7px", border: "1px solid var(--line-strong)", borderRadius: 5, color: "var(--ink-5)" }}>ESC</span>
            </div>

            {/* Results */}
            <div className="br-scroll" style={{ maxHeight: 480, overflowY: "auto" }}>
              <CmdGroup label="Clients · 1 match"/>
              <CmdItem icon={<ClientAvatar id="lakeside" size={20}/>} title="Lakeside Family Dental" sub="6 active workstreams · MRR $8.8K · 4 team members" hot/>

              <CmdGroup label="Projects · 3 matches"/>
              <CmdItem icon={<div style={{ width: 20, height: 20, borderRadius: 5, background: "#eef0ff", color: "#312e81", display: "grid", placeItems: "center" }}><Icon name="monitor" size={11}/></div>} title="Lakeside · Williston landing page" sub="In design · 38% · Jess + Tom" />
              <CmdItem icon={<div style={{ width: 20, height: 20, borderRadius: 5, background: "#fef3c7", color: "#92400e", display: "grid", placeItems: "center" }}><Icon name="megaphone" size={11}/></div>} title="Lakeside · paid acquisition · Q2" sub="Optimising · CPL $55 · Sam" />
              <CmdItem icon={<div style={{ width: 20, height: 20, borderRadius: 5, background: "#ede9fe", color: "#5b21b6", display: "grid", placeItems: "center" }}><Icon name="bolt" size={11}/></div>} title="Lakeside · recall automation · Beacon" sub="Live · 87 recovered patients · Mike" />

              <CmdGroup label="People"/>
              <CmdItem icon={<PersonAvatar id="sam" size={20}/>} title="Sam Patel" sub="Strategy lead · 92% · 5 clients"/>
              <CmdItem icon={<PersonAvatar id="jess" size={20}/>} title="Jess Kwon" sub="Designer · 105% · over capacity"/>

              <CmdGroup label="Actions · type /"/>
              <CmdItem
                icon={<div style={{ width: 20, height: 20, borderRadius: 5, background: "var(--accent-soft)", color: "var(--accent)", display: "grid", placeItems: "center" }}><Icon name="plus" size={12}/></div>}
                title="Create new project"
                sub="/ new project"
                shortcut="⌘N"
              />
              <CmdItem
                icon={<div style={{ width: 20, height: 20, borderRadius: 5, background: "var(--accent-soft)", color: "var(--accent)", display: "grid", placeItems: "center" }}><Icon name="users" size={12}/></div>}
                title="Reassign Jess's work to free up capacity"
                sub="/ rebalance · suggested by Atlas"
                shortcut="⌘R"
              />
              <CmdItem
                icon={<div style={{ width: 20, height: 20, borderRadius: 5, background: "var(--accent-soft)", color: "var(--accent)", display: "grid", placeItems: "center" }}><Icon name="bolt" size={12}/></div>}
                title="Retry failed Beacon automation"
                sub="/ retry · lakeside · 1 affected"
                shortcut="⌘⇧R"
              />
              <CmdItem
                icon={<div style={{ width: 20, height: 20, borderRadius: 5, background: "var(--accent-soft)", color: "var(--accent)", display: "grid", placeItems: "center" }}><Icon name="mail" size={12}/></div>}
                title="Nudge Maple & Hide on pending approval"
                sub="/ nudge · 18h overdue"
              />
            </div>

            {/* Footer */}
            <div style={{ padding: "10px 16px", background: "var(--surface-2)", borderTop: "1px solid var(--line)", display: "flex", alignItems: "center", gap: 12, fontSize: 11, color: "var(--ink-4)" }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                <span className="br-mono" style={{ padding: "1px 5px", border: "1px solid var(--line-strong)", borderRadius: 4, background: "var(--surface)" }}>↑↓</span> navigate
              </span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                <span className="br-mono" style={{ padding: "1px 5px", border: "1px solid var(--line-strong)", borderRadius: 4, background: "var(--surface)" }}>↵</span> open
              </span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                <span className="br-mono" style={{ padding: "1px 5px", border: "1px solid var(--line-strong)", borderRadius: 4, background: "var(--surface)" }}>/</span> commands
              </span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                <span className="br-mono" style={{ padding: "1px 5px", border: "1px solid var(--line-strong)", borderRadius: 4, background: "var(--surface)" }}>@</span> people
              </span>
              <div style={{ flex: 1 }}/>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
                <Icon name="sparkle" size={11} color="var(--ai)"/>Atlas command bar
              </span>
            </div>
          </div>
        </div>
      </div>
    </AtlasShell>
  );
}

function CmdGroup({ label }) {
  return (
    <div className="br-mono" style={{ fontSize: 9.5, color: "var(--ink-5)", textTransform: "uppercase", letterSpacing: ".08em", fontWeight: 600, padding: "10px 20px 6px" }}>{label}</div>
  );
}

function CmdItem({ icon, title, sub, hot, shortcut }) {
  return (
    <div style={{
      display: "grid", gridTemplateColumns: "auto 1fr auto", gap: 12, alignItems: "center",
      padding: "9px 20px", cursor: "pointer",
      background: hot ? "var(--surface-2)" : "transparent",
      borderLeft: hot ? "2px solid var(--accent)" : "2px solid transparent",
    }}>
      <div style={{ flexShrink: 0 }}>{icon}</div>
      <div style={{ minWidth: 0 }}>
        <div style={{ fontSize: 13.5, fontWeight: hot ? 600 : 500, letterSpacing: "-0.005em" }}>{title}</div>
        <div className="br-mono" style={{ fontSize: 10.5, color: "var(--ink-5)" }}>{sub}</div>
      </div>
      {shortcut && (
        <span className="br-mono" style={{ fontSize: 10.5, padding: "1px 6px", border: "1px solid var(--line-strong)", borderRadius: 5, color: "var(--ink-5)", background: "var(--surface)" }}>{shortcut}</span>
      )}
      {hot && !shortcut && (
        <span className="br-mono" style={{ fontSize: 10.5, padding: "1px 6px", border: "1px solid var(--line-strong)", borderRadius: 5, color: "var(--ink-5)", background: "var(--surface)" }}>↵</span>
      )}
    </div>
  );
}

Object.assign(window, { AEcosystem, EcoBox, EcoLink, AOnboarding, SetupStep, ACommandBar, CmdGroup, CmdItem });
