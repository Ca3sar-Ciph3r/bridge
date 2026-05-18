/* global React, Icon, Pill */
// Dock — UX flow map + ecosystem integration map

// ─────────────────────────────────────────────────────────────
// UX flow map — Dock client journey
// ─────────────────────────────────────────────────────────────
function DFlowMap() {
  return (
    <div className="br-frame" style={{ background: "linear-gradient(180deg, #fafaf9 0%, #f5f5f4 100%)", padding: "32px 40px", overflow: "auto" }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 24 }}>
        <div>
          <Pill tone="dark" size="sm">DOCK · UX FLOW MAP · v2.1</Pill>
          <h1 className="br-h1" style={{ fontSize: 30, marginTop: 12, marginBottom: 6 }}>From signed contract to weekly rhythm.</h1>
          <p className="br-body" style={{ maxWidth: 580 }}>
            Dock activates on contract signature, generates workstreams automatically, and surfaces only what needs the client's attention. Three weekly touchpoints replace inbox-based check-ins.
          </p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          {[["Auto-generated", "100%"], ["Manual surfaces", "0"], ["Client ping rate", "~12 min/wk"], ["Avg. SLA · approval", "4h"]].map(([k, v]) => (
            <div key={k} style={{ padding: "10px 14px", background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 10, minWidth: 88 }}>
              <div className="br-eyebrow" style={{ fontSize: 9 }}>{k}</div>
              <div className="br-num" style={{ fontSize: 17, fontWeight: 600, letterSpacing: "-0.02em", marginTop: 2 }}>{v}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{
        flex: 1, background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 16,
        boxShadow: "var(--shadow-2)", padding: 20, position: "relative", overflow: "hidden",
        backgroundImage: "radial-gradient(circle at 1px 1px, var(--line) 1px, transparent 0)",
        backgroundSize: "16px 16px",
      }}>
        <svg viewBox="0 0 1340 700" style={{ width: "100%", height: "100%", display: "block" }}>
          <defs>
            <marker id="dArrowDark" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#0c0a09"/></marker>
            <marker id="dArrowAccent" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#4f46e5"/></marker>
            <marker id="dArrowMuted" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#a8a29e"/></marker>
            <marker id="dArrowAi" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#7c3aed"/></marker>
          </defs>

          {/* Swimlane labels */}
          <g fontSize="9.5" fill="#a8a29e" letterSpacing="1.2">
            <text x="20"  y="32">TRIGGER</text>
            <text x="20"  y="160">GENERATION</text>
            <text x="20"  y="350">CLIENT TOUCHPOINTS</text>
            <text x="20"  y="590">FEEDBACK · LOOP</text>
          </g>
          <line x1="0" y1="100" x2="1340" y2="100" stroke="#efeeec"/>
          <line x1="0" y1="280" x2="1340" y2="280" stroke="#efeeec"/>
          <line x1="0" y1="540" x2="1340" y2="540" stroke="#efeeec"/>

          {/* Trigger */}
          <DNode x={70} y={40} w={180} label="Compass contract signed" sub="Contract object created" kind="input"/>
          <DArrow from={[250, 70]} to={[300, 70]}/>
          <DDiamond x={325} y={70} label="Payment ok?"/>
          <DArrow from={[380, 70]} to={[430, 70]} label="Yes"/>
          <DNode x={430} y={40} w={180} label="Workstream engine fires" sub="Auto · ~1.4s" kind="entry"/>

          {/* Generation row — 3 workstream pipelines fan out */}
          <DArrow from={[520, 100]} to={[520, 145]} vertical/>
          <DBranch x={130}  y={150} title="Web · 5 stages" stages={["Planning","Design","Build","QA","Launch"]} tone="#4f46e5"/>
          <DBranch x={430}  y={150} title="Paid · 5 stages" stages={["Setup","Build","Launch","Optimise","Scale"]} tone="#f59e0b"/>
          <DBranch x={730}  y={150} title="Recall · 4 stages" stages={["Scope","Build","Test","Launch"]} tone="#a78bfa"/>
          <DBranch x={1030} y={150} title="Strategy · ongoing" stages={["Quarterly","Weekly","Monthly review"]} tone="#6b7280"/>

          {/* Lines from "engine fires" splitting */}
          <g stroke="#0c0a09" strokeWidth="1.3" fill="none">
            <path d="M 520 100 C 520 130, 220 130, 220 145" markerEnd="url(#dArrowDark)"/>
            <path d="M 520 100 C 520 125, 520 125, 520 145" markerEnd="url(#dArrowDark)"/>
            <path d="M 520 100 C 520 130, 820 130, 820 145" markerEnd="url(#dArrowDark)"/>
            <path d="M 520 100 C 520 130, 1120 130, 1120 145" markerEnd="url(#dArrowDark)"/>
          </g>

          {/* Client touchpoints row */}
          <g stroke="#4f46e5" strokeWidth="1.3" fill="none" opacity=".7">
            <path d="M 220 265 L 220 305" markerEnd="url(#dArrowAccent)"/>
            <path d="M 520 265 L 520 305" markerEnd="url(#dArrowAccent)"/>
            <path d="M 820 265 L 820 305" markerEnd="url(#dArrowAccent)"/>
            <path d="M 1120 265 L 1120 305" markerEnd="url(#dArrowAccent)"/>
          </g>

          <DNode x={60}   y={310} w={170} label="Overview · Home" sub="Where Sarah lands" idx="01" kind="ui"/>
          <DNode x={250}  y={310} w={170} label="Live Feed" sub="Chronological updates" idx="02" kind="ui"/>
          <DNode x={440}  y={310} w={170} label="Asset Hub" sub="Approve · request" idx="03" kind="ui"/>
          <DNode x={630}  y={310} w={170} label="Project Tracker" sub="Stage-by-stage" idx="04" kind="ui"/>
          <DNode x={820}  y={310} w={170} label="Billing" sub="Allocation transparency" idx="05" kind="ui"/>
          <DNode x={1010} y={310} w={170} label="Weekly Summary" sub="Mon 9am · narrative" idx="06" kind="ui"/>

          {/* Decision: anything for client? */}
          <DDiamond x={510} y={400} label="Action needed?"/>
          <g stroke="#0c0a09" strokeWidth="1.3" fill="none">
            <path d="M 515 370 L 540 400" markerEnd="url(#dArrowDark)"/>
          </g>

          {/* Sub-flows from decision */}
          <DNode x={140} y={430} w={170} label="Approve" sub="One click · live in 6h" kind="success" idx="3a"/>
          <DNode x={340} y={430} w={170} label="Request change" sub="Comment + pin" kind="entry" idx="3b"/>
          <DNode x={560} y={430} w={170} label="Pick option" sub="A / B / C variants" kind="entry" idx="3c"/>
          <DNode x={780} y={430} w={170} label="Unblock task" sub="Forward to team / IT" kind="warn" idx="3d"/>
          <DNode x={1000} y={430} w={170} label="Do nothing" sub="Inbox zero state" kind="success"/>

          <g stroke="#0c0a09" strokeWidth="1.2" fill="none" opacity=".5">
            <path d="M 520 430 L 230 430" markerEnd="url(#dArrowDark)"/>
            <path d="M 530 430 L 425 430" markerEnd="url(#dArrowDark)"/>
            <path d="M 555 430 L 645 430" markerEnd="url(#dArrowDark)"/>
            <path d="M 555 430 L 865 430" markerEnd="url(#dArrowDark)"/>
            <path d="M 560 430 L 1085 430" markerEnd="url(#dArrowDark)"/>
          </g>

          {/* Feedback loop band */}
          <g stroke="#7c3aed" strokeWidth="1.3" fill="none" strokeDasharray="3 3">
            <path d="M 225 470 C 225 510, 600 510, 600 540" markerEnd="url(#dArrowAi)"/>
            <path d="M 425 470 C 425 510, 600 510, 600 540" />
            <path d="M 645 470 C 645 510, 600 510, 600 540" />
            <path d="M 865 470 C 865 510, 600 510, 600 540" />
          </g>

          <DNode x={500} y={560} w={200} h={70} label="Workstream state machine" sub="State updates · re-pings team" kind="engine"/>
          <DArrow from={[600, 560]} to={[600, 280]} kind="ai" dashed/>
          <text x="615" y="430" fontSize="9.5" fill="#7c3aed">Loop back to stage</text>

          {/* Radar feedback arrow */}
          <g>
            <rect x="900" y="570" width="220" height="56" rx="10" fill="#fce7f3" stroke="#fbcfe8"/>
            <text x="912" y="588" fontSize="10.5" fill="#9d174d" fontWeight="600">From Radar · live signals</text>
            <text x="912" y="603" fontSize="9.5" fill="#57534e">"CTR down 14% → spawn ad v3"</text>
            <text x="912" y="617" fontSize="9.5" fill="#57534e">"GBP views +62% → reweight SEO"</text>
            <path d="M 900 596 L 715 596" stroke="#9d174d" strokeWidth="1.3" fill="none" markerEnd="url(#dArrowAi)" strokeDasharray="3 3"/>
          </g>

          {/* Legend */}
          <g transform="translate(20, 670)" fontSize="10.5">
            <Dt x={0}    fill="#0c0a09" label="UI screen"/>
            <Dt x={110}  fill="#4f46e5" label="Auto-generated"/>
            <Dt x={245}  fill="#7c3aed" label="State machine"/>
            <Dt x={375}  fill="#b45309" label="Blocked / waiting"/>
            <Dt x={510}  fill="transparent" stroke="#7c3aed" label="Radar / feedback loop" dashed/>
          </g>
        </svg>
      </div>
    </div>
  );
}

function DNode({ x, y, w = 140, h = 60, label, sub, kind = "linear", idx }) {
  const styles = {
    linear:  { fill: "#fff",  stroke: "#d6d3d1", titleColor: "#0c0a09" },
    entry:   { fill: "#fff",  stroke: "#d6d3d1", titleColor: "#0c0a09" },
    input:   { fill: "#f5f5f4", stroke: "#d6d3d1", titleColor: "#0c0a09" },
    engine:  { fill: "#faf8ff", stroke: "#ddd6fe", titleColor: "#312e81" },
    ui:      { fill: "#fff",  stroke: "#0c0a09", titleColor: "#0c0a09" },
    success: { fill: "#ecfdf5", stroke: "#a7f3d0", titleColor: "#065f46" },
    warn:    { fill: "#fffbeb", stroke: "#fcd34d", titleColor: "#92400e" },
  }[kind];
  return (
    <g transform={`translate(${x}, ${y})`}>
      <rect width={w} height={h} rx="10" fill={styles.fill} stroke={styles.stroke}/>
      {idx && (
        <>
          <rect x="8" y="8" width="22" height="14" rx="3" fill="rgba(0,0,0,.05)"/>
          <text x="19" y="18" fontSize="8.5" fill="#57534e" textAnchor="middle" fontFamily="var(--font-mono)" fontWeight="600">{idx}</text>
        </>
      )}
      <text x={w/2} y={h/2 - 1} fontSize="12" fill={styles.titleColor} textAnchor="middle" fontWeight="600">{label}</text>
      {sub && <text x={w/2} y={h/2 + 15} fontSize="10" fill="#8a8580" textAnchor="middle">{sub}</text>}
    </g>
  );
}

function DDiamond({ x, y, label }) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      <polygon points="0,15 30,0 60,15 30,30" fill="#fff" stroke="#a8a29e" strokeDasharray="3 2"/>
      <text x="30" y="19" fontSize="9.5" fill="#0c0a09" textAnchor="middle">{label}</text>
    </g>
  );
}

function DArrow({ from, to, label, kind, vertical, dashed }) {
  const marker = kind === "accent" ? "url(#dArrowAccent)" : kind === "ai" ? "url(#dArrowAi)" : "url(#dArrowDark)";
  const color = kind === "accent" ? "#4f46e5" : kind === "ai" ? "#7c3aed" : "#0c0a09";
  return (
    <>
      <line x1={from[0]} y1={from[1]} x2={to[0]} y2={to[1]} stroke={color} strokeWidth="1.4" strokeDasharray={dashed ? "3 3" : "none"} markerEnd={marker}/>
      {label && <text x={(from[0]+to[0])/2} y={vertical ? (from[1]+to[1])/2 - 4 : from[1] - 6} fontSize="9.5" fill={color} textAnchor="middle">{label}</text>}
    </>
  );
}

function DBranch({ x, y, title, stages, tone }) {
  const h = 110;
  return (
    <g transform={`translate(${x}, ${y})`}>
      <rect width="180" height={h} rx="10" fill="#fff" stroke="#e7e5e4"/>
      <rect x="0" y="0" width="180" height="22" rx="10" fill={tone + "20"}/>
      <circle cx="14" cy="11" r="4" fill={tone}/>
      <text x="24" y="11" fontSize="11" fill="#0c0a09" fontWeight="600" dy="4">{title}</text>
      {stages.map((s, i) => (
        <g key={s} transform={`translate(0, ${30 + i * 14})`}>
          <circle cx="14" cy="6" r="2.5" fill={tone}/>
          <text x="22" y="6" fontSize="10" fill="#292524" dy="3">{s}</text>
        </g>
      ))}
    </g>
  );
}

function Dt({ x, fill, stroke, label, dashed }) {
  return (
    <g transform={`translate(${x}, 0)`}>
      {dashed ? <line x1="0" y1="6" x2="14" y2="6" stroke={stroke || fill} strokeDasharray="2 2"/> :
        <circle cx="6" cy="6" r="5" fill={fill} stroke={stroke || "none"}/>}
      <text x="20" y="10" fill="#57534e">{label}</text>
    </g>
  );
}

// ─────────────────────────────────────────────────────────────
// Integration map — full ecosystem (Bridge → Compass → Dock → Radar → Beacon)
// ─────────────────────────────────────────────────────────────
function DIntegrationMap() {
  return (
    <div className="br-frame" style={{ background: "linear-gradient(180deg, #fafaf9 0%, #f5f5f4 100%)", padding: "32px 40px", overflow: "auto" }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 24 }}>
        <div>
          <Pill tone="dark" size="sm">FULL ECOSYSTEM · DOCK AS THE EXECUTION LAYER</Pill>
          <h1 className="br-h1" style={{ fontSize: 30, marginTop: 12, marginBottom: 6 }}>Bridge → Compass → Dock → Radar → Beacon.</h1>
          <p className="br-body" style={{ maxWidth: 640 }}>
            Dock sits between contract and execution. It receives the signed Compass object, generates workstreams, surfaces them to the client, and feeds state changes back into Radar's analytics and Beacon's triggers in real time.
          </p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          {[["Inputs", "Compass (1)"], ["Outputs", "Radar · Beacon"], ["Read-only refs", "Bridge"], ["Contracts", "9 typed events"]].map(([k, v]) => (
            <div key={k} style={{ padding: "10px 14px", background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 10, minWidth: 90 }}>
              <div className="br-eyebrow" style={{ fontSize: 9 }}>{k}</div>
              <div className="br-num" style={{ fontSize: 14, fontWeight: 600, letterSpacing: "-0.02em", marginTop: 2 }}>{v}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{
        flex: 1, background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 16,
        boxShadow: "var(--shadow-2)", padding: 24, position: "relative", overflow: "hidden",
        backgroundImage: "radial-gradient(circle at 1px 1px, var(--line) 1px, transparent 0)",
        backgroundSize: "20px 20px",
      }}>
        <svg viewBox="0 0 1340 620" style={{ width: "100%", height: "100%", display: "block" }}>
          <defs>
            <marker id="iiArrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#0c0a09"/></marker>
            <marker id="iiArrowAcc" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#4f46e5"/></marker>
            <marker id="iiArrowAi" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#7c3aed"/></marker>
            <linearGradient id="ribbon" x1="0" x2="1">
              <stop offset="0" stopColor="#4f46e5" stopOpacity="0"/>
              <stop offset=".5" stopColor="#4f46e5" stopOpacity=".55"/>
              <stop offset="1" stopColor="#4f46e5" stopOpacity="0"/>
            </linearGradient>
          </defs>

          {/* 5 system columns, horizontal flow */}
          <SysBox x={20}   y={210} w={210} h={180} name="Bridge"  tag="Onboarding"   tone="bridge" pos="01" subs={["client.intent", "services[]", "goals[]", "assets[]"]}/>
          <SysBox x={290}  y={210} w={210} h={180} name="Compass" tag="Proposal"     tone="compass" pos="02" subs={["contract.scope", "pricing.tiers", "assumptions[]"]}/>
          <SysBox x={560}  y={170} w={250} h={260} name="Dock"    tag="Execution layer · YOU ARE HERE" tone="dock" pos="03" subs={["workstreams[]", "deliverables[]", "approvals[]", "stage.state", "billing.ledger", "version.log"]} hero/>
          <SysBox x={870}  y={210} w={210} h={180} name="Radar"   tag="Analytics"    tone="radar" pos="04" subs={["baseline.metrics", "live.kpis", "anomaly.flags"]}/>
          <SysBox x={1140} y={210} w={170} h={180} name="Beacon"  tag="Automation"   tone="beacon" pos="05" subs={["trigger.rules", "workflow.queue"]}/>

          {/* Ribbon backbone */}
          <path d="M 50 285 L 1280 285" stroke="url(#ribbon)" strokeWidth="20" fill="none" opacity=".4"/>

          {/* Forward arrows */}
          <ContractA from={[230, 270]} to={[290, 270]}    label="bridge.read"        sub="ref only · read-only" muted/>
          <ContractA from={[500, 270]} to={[560, 270]}    label="compass.contract.signed" sub="primary input · 1.4s"/>
          <ContractA from={[810, 270]} to={[870, 270]}    label="dock.state.change"  sub="every stage transition"/>
          <ContractA from={[1080, 270]} to={[1140, 270]}  label="radar.signal.fire"  sub="triggers automation"/>

          {/* Backflows */}
          <path d="M 950 390 C 850 460, 750 460, 685 430" stroke="#7c3aed" strokeWidth="1.4" strokeDasharray="3 3" fill="none" markerEnd="url(#iiArrowAi)"/>
          <text x="780" y="470" fontSize="10" fill="#7c3aed" textAnchor="middle" fontWeight="600">radar.signal.feedback</text>
          <text x="780" y="484" fontSize="9.5" fill="#8a8580" textAnchor="middle">"CTR ↓ 14% → spawn ad v3"</text>

          <path d="M 1220 390 C 1100 480, 900 480, 685 440" stroke="#7c3aed" strokeWidth="1.4" strokeDasharray="3 3" fill="none" markerEnd="url(#iiArrowAi)"/>
          <text x="980" y="510" fontSize="10" fill="#7c3aed" textAnchor="middle" fontWeight="600">beacon.trigger.fire</text>
          <text x="980" y="524" fontSize="9.5" fill="#8a8580" textAnchor="middle">"Recall ran · 28 patients notified"</text>

          {/* Critical system rules box */}
          <g>
            <rect x="20" y="490" width="640" height="110" rx="12" fill="#0c0a09"/>
            <text x="40" y="514" fontSize="11" fill="#a8a29e" fontFamily="var(--font-mono)" letterSpacing="1.2">CRITICAL · DOCK NEVER</text>
            <g fontSize="11.5" fill="#f5f5f4">
              <text x="40" y="540">• stores raw client inputs (those live in Bridge)</text>
              <text x="40" y="558">• duplicates Compass data manually (read from contract only)</text>
              <text x="40" y="576">• allows scope edits outside the contract envelope</text>
              <text x="340" y="540">• shows admin / operational data to clients</text>
              <text x="340" y="558">• re-keys anything humans already entered</text>
              <text x="340" y="576">• breaks the flow on incomplete data — degrades clearly</text>
            </g>
          </g>

          {/* Contract envelope visualisation */}
          <g transform="translate(680, 490)">
            <rect width="640" height="110" rx="12" fill="#fff" stroke="#d6d3d1"/>
            <text x="20" y="24" fontSize="11" fill="#57534e" fontFamily="var(--font-mono)" letterSpacing="1.2">CONTRACT OBJECT · SHARED TYPE · IMMUTABLE AT SIGNATURE</text>
            <g fontFamily="var(--font-mono)" fontSize="10.5" fill="#0c0a09">
              <text x="20"  y="48">{`{`}</text>
              <text x="34"  y="64">{`"clientId": "LSD-7F2A",`}</text>
              <text x="34"  y="80">{`"scope": [ web, paid, recall, strategy ],`}</text>
              <text x="34"  y="96">{`"pricing": { tier: "Growth", $: 8800/mo, oneTime: 20600 },`}</text>
            </g>
            <g fontFamily="var(--font-mono)" fontSize="10.5" fill="#0c0a09">
              <text x="320" y="48">{`"timeline": { startISO, milestones[], }`}</text>
              <text x="320" y="64">{`"assumptions": [ ... 11 ],`}</text>
              <text x="320" y="80">{`"goals": { newPatientsMo, ROAS, fill% },`}</text>
              <text x="320" y="96">{`"version": 2,  "signedAtISO": "..."`}</text>
            </g>
            <text x="620" y="48" fontSize="11" fill="#4f46e5" fontFamily="var(--font-mono)" textAnchor="end" fontWeight="600">→ Dock workstreams</text>
          </g>
        </svg>
      </div>
    </div>
  );
}

function SysBox({ x, y, w, h, name, tag, tone, pos, subs, hero }) {
  const tones = {
    bridge:  { mark: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",      chip: "#eef0ff", chipFg: "#312e81" },
    compass: { mark: "#fff", markStroke: "#d6d3d1", chip: "#faf8ff",            chipFg: "#312e81" },
    dock:    { mark: "linear-gradient(180deg, #0c0a09 0%, #292524 100%)",       chip: "#f5f5f4", chipFg: "#0c0a09" },
    radar:   { mark: "#7c2d12",                                                 chip: "#fce7f3", chipFg: "#9d174d" },
    beacon:  { mark: "#b45309",                                                 chip: "#fee2e2", chipFg: "#991b1b" },
  }[tone];
  return (
    <g transform={`translate(${x}, ${y})`}>
      <rect width={w} height={h} rx="14" fill="#fff" stroke={hero ? "#0c0a09" : "#d6d3d1"} strokeWidth={hero ? 2 : 1}
        style={{ filter: hero ? "drop-shadow(0 6px 16px rgba(0,0,0,.18))" : undefined }}/>
      <text x="16" y="20" fontSize="9.5" fill="#a8a29e" fontFamily="var(--font-mono)" letterSpacing="1.2" dy="4">{pos}</text>
      <g transform="translate(16, 32)">
        {tone === "compass" ? (
          <>
            <rect width="26" height="26" rx="999" fill="#fff" stroke="#d6d3d1"/>
            <polygon points="13,5 16,13 13,21 10,13" fill="#4f46e5"/>
            <circle cx="13" cy="13" r="1.4" fill="#0c0a09"/>
          </>
        ) : (
          <rect width="26" height="26" rx="6" fill={tones.mark}/>
        )}
        <text x="36" y="11" fontSize="14" fontWeight="700" fill="#0c0a09" letterSpacing="-0.01em" dy="3">{name}</text>
        <text x="36" y="26" fontSize="10" fill="#8a8580">{tag}</text>
      </g>
      <g transform={`translate(16, 86)`}>
        {subs.map((s, i) => (
          <g key={s} transform={`translate(0, ${i * 18})`}>
            <rect width={w - 32} height="14" rx="4" fill={tones.chip} opacity=".8"/>
            <text x="8" y="7" fontSize="10" fill={tones.chipFg} fontFamily="var(--font-mono)" dy="3" fontWeight="500">{s}</text>
          </g>
        ))}
      </g>
      {hero && (
        <g>
          <rect x={w - 56} y={12} width="44" height="16" rx="4" fill="#0c0a09"/>
          <text x={w - 34} y="20" fontSize="9.5" fill="#fff" textAnchor="middle" fontFamily="var(--font-mono)" fontWeight="600" dy="3">YOU HERE</text>
        </g>
      )}
    </g>
  );
}

function ContractA({ from, to, label, sub, muted }) {
  const mid = [(from[0] + to[0]) / 2, from[1] - 28];
  const color = muted ? "#a8a29e" : "#4f46e5";
  return (
    <>
      <path d={`M ${from[0]} ${from[1]} L ${to[0]} ${to[1]}`} stroke={color} strokeWidth="1.5" fill="none" markerEnd={muted ? "url(#iiArrow)" : "url(#iiArrowAcc)"} strokeDasharray={muted ? "3 3" : "none"}/>
      <g transform={`translate(${mid[0] - 70}, ${mid[1] - 14})`}>
        <rect width="140" height="28" rx="6" fill="#fff" stroke={color}/>
        <text x="70" y="11" fontSize="10" fill={color} textAnchor="middle" fontWeight="600" fontFamily="var(--font-mono)" dy="3">{label}</text>
        <text x="70" y="22" fontSize="9" fill="#8a8580" textAnchor="middle" dy="3">{sub}</text>
      </g>
    </>
  );
}

Object.assign(window, { DFlowMap, DIntegrationMap });
