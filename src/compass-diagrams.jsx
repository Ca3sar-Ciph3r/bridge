/* global React, Icon, Pill, CompassWordmark */
// Compass — UX flow map + ecosystem integration map

// ─────────────────────────────────────────────────────────────
// UX flow map — Compass-internal user journey
// ─────────────────────────────────────────────────────────────
function CFlowMap() {
  return (
    <div className="br-frame" style={{ background: "linear-gradient(180deg, #fafaf9 0%, #f5f5f4 100%)", padding: "32px 40px", overflow: "auto" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 24 }}>
        <div>
          <Pill tone="dark" size="sm">COMPASS · UX FLOW MAP · v3.2</Pill>
          <h1 className="br-h1" style={{ fontSize: 30, marginTop: 12, marginBottom: 6 }}>Strategy → proposal in nine moves.</h1>
          <p className="br-body" style={{ maxWidth: 580 }}>
            Every node is a UI state. The four offshoots from the assembled draft are Compass's parallel outputs — proposal, internal strategy, execution blueprint, sales intelligence.
          </p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          {[
            ["Nodes",        "11"],
            ["Auto-drafted", "8 / 11"],
            ["Manual edit",  "3 nodes"],
            ["Avg. time",    "9m 04s"],
          ].map(([k, v]) => (
            <div key={k} style={{ padding: "10px 14px", background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 10, minWidth: 76 }}>
              <div className="br-eyebrow" style={{ fontSize: 9 }}>{k}</div>
              <div className="br-num" style={{ fontSize: 17, fontWeight: 600, letterSpacing: "-0.02em", marginTop: 2 }}>{v}</div>
            </div>
          ))}
        </div>
      </div>

      {/* SVG diagram */}
      <div style={{
        flex: 1, background: "var(--surface)", border: "1px solid var(--line)",
        borderRadius: 16, boxShadow: "var(--shadow-2)", padding: 20, position: "relative",
        backgroundImage: "radial-gradient(circle at 1px 1px, var(--line) 1px, transparent 0)",
        backgroundSize: "16px 16px", overflow: "hidden",
      }}>
        <svg viewBox="0 0 1340 720" style={{ width: "100%", height: "100%", display: "block" }}>
          <defs>
            <marker id="cArrowDark" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#0c0a09"/></marker>
            <marker id="cArrowAccent" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#4f46e5"/></marker>
            <marker id="cArrowAi" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#7c3aed"/></marker>
            <marker id="cArrowMuted" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#a8a29e"/></marker>
          </defs>

          {/* Swimlane labels */}
          <g fontSize="9.5" fill="#a8a29e" letterSpacing="1.2">
            <text x="20"  y="32">INTAKE</text>
            <text x="20"  y="172">AUTO-DRAFT</text>
            <text x="20"  y="372">REVIEW · EDIT · REGENERATE</text>
            <text x="20"  y="592">DELIVER</text>
          </g>
          <line x1="0" y1="100" x2="1340" y2="100" stroke="#efeeec"/>
          <line x1="0" y1="300" x2="1340" y2="300" stroke="#efeeec"/>
          <line x1="0" y1="540" x2="1340" y2="540" stroke="#efeeec"/>

          {/* Intake row */}
          <CNode x={70}  y={40} w={170} label="Bridge handoff" sub="127 fields · 7 assets" kind="input"/>
          <CArrow from={[240, 70]} to={[290, 70]}/>
          <CNode x={290} y={40} w={150} label="Inbox" sub="Proposal lands" kind="entry" idx="01"/>
          <CArrow from={[440, 70]} to={[490, 70]}/>
          <CDiamond x={520} y={70} label="New / open?"/>
          <CArrow from={[570, 70]} to={[620, 70]} label="Open new"/>
          <CNode x={620} y={40} w={170} label="Auto-draft launch" sub="Engine job queued" kind="entry" idx="02"/>

          {/* Auto-draft band */}
          <CNode x={150} y={150} w={180} h={120} label="Compass engine" sub="Decision engine + AI" kind="engine">
            <text x="0" y="64" fontSize="10" fill="#7c3aed" textAnchor="middle">• Scope assembler</text>
            <text x="0" y="78" fontSize="10" fill="#7c3aed" textAnchor="middle">• Pricing intelligence</text>
            <text x="0" y="92" fontSize="10" fill="#7c3aed" textAnchor="middle">• ROI simulator</text>
            <text x="0" y="106" fontSize="10" fill="#7c3aed" textAnchor="middle">• Narrative generator</text>
          </CNode>
          <CArrow from={[710, 100]} to={[710, 145]} vertical/>
          <CArrow from={[330, 220]} to={[420, 220]} kind="ai"/>

          <CNode x={420} y={150} w={170} h={120} label="Assembled draft v1" sub="All 4 outputs created" kind="draft" idx="03"/>

          {/* 4 parallel outputs */}
          <CArrow from={[590, 180]} to={[640, 160]}/>
          <CArrow from={[590, 200]} to={[640, 200]}/>
          <CArrow from={[590, 220]} to={[640, 240]}/>
          <CArrow from={[590, 240]} to={[640, 280]}/>
          <COutput x={640} y={140} title="Client proposal"         tag="Primary"/>
          <COutput x={640} y={184} title="Internal strategy doc"   tag="Private"/>
          <COutput x={640} y={228} title="Execution blueprint"     tag="Delivery team"/>
          <COutput x={640} y={272} title="Sales intelligence"      tag="Strategist"/>

          {/* Review label */}
          <CArrow from={[850, 230]} to={[915, 230]}/>
          <CNode x={915} y={195} w={170} h={70} label="Review dashboard" sub="Confidence · gaps · summary" kind="entry" idx="04"/>

          {/* Edit branch row */}
          <CArrow from={[1000, 265]} to={[1000, 330]} vertical/>
          <CNode x={70}  y={330} w={170} label="Modular scope" sub="Toggle 14 modules" idx="05" kind="edit"/>
          <CNode x={270} y={330} w={170} label="Pricing tiers" sub="3 tiers · anchored" idx="06" kind="edit"/>
          <CNode x={470} y={330} w={170} label="ROI simulator" sub="Low / Exp / High" idx="07" kind="edit"/>
          <CNode x={670} y={330} w={170} label="Narrative"     sub="AI draft · edit" idx="08" kind="edit" ai/>
          <CNode x={870} y={330} w={170} label="Assumptions"   sub="Known / inferred / unknown" idx="09" kind="edit"/>

          {/* Inter-edit links */}
          <g stroke="#0c0a09" strokeWidth="1.2" fill="none" opacity=".4">
            <path d="M 240 360 L 270 360" markerEnd="url(#cArrowDark)"/>
            <path d="M 440 360 L 470 360" markerEnd="url(#cArrowDark)"/>
            <path d="M 640 360 L 670 360" markerEnd="url(#cArrowDark)"/>
            <path d="M 840 360 L 870 360" markerEnd="url(#cArrowDark)"/>
          </g>

          {/* feed back to engine */}
          <path d="M 155 330 Q 50 280 50 230 Q 50 180 150 180" fill="none" stroke="#7c3aed" strokeWidth="1.3" strokeDasharray="3 3" markerEnd="url(#cArrowAi)"/>
          <text x="35" y="270" fontSize="10" fill="#7c3aed">Regenerate</text>

          {/* version control */}
          <CNode x={1060} y={330} w={170} label="Version compare" sub="Safe / Rec / Aggressive" kind="entry" idx="10"/>
          <path d="M 1040 360 L 1060 360" stroke="#0c0a09" markerEnd="url(#cArrowDark)"/>

          {/* Deliver band */}
          <CArrow from={[1145, 400]} to={[1145, 565]} vertical/>
          <CNode x={1060} y={565} w={170} label="Publish & share" sub="Live link + email" idx="11" kind="success"/>

          {/* Sub-deliverables */}
          <CNode x={760} y={565} w={170} h={50} label="Client preview" sub="Read mode"/>
          <CNode x={580} y={565} w={170} h={50} label="PDF export"     sub="Signed copy"/>
          <CNode x={400} y={565} w={170} h={50} label="Live link"      sub="Tracked URL"/>
          <CNode x={220} y={565} w={170} h={50} label="Email send"     sub="Magic-link auth"/>
          <CNode x={40}  y={565} w={170} h={50} label="CRM log (Dock)" sub="Status synced"/>

          <g stroke="#0c0a09" strokeWidth="1.2" fill="none" opacity=".7">
            <path d="M 1060 590 L 935 590" markerEnd="url(#cArrowDark)"/>
            <path d="M 760 590 L 755 590" />
            <path d="M 580 590 L 570 590"/>
            <path d="M 400 590 L 405 590"/>
            <path d="M 220 590 L 245 590"/>
          </g>

          {/* AI annotations on right side */}
          <g>
            <rect x="1090" y="170" width="220" height="56" rx="10" fill="#f5f3ff" stroke="#ddd6fe"/>
            <circle cx="1106" cy="194" r="4" fill="#7c3aed"/>
            <text x="1116" y="187" fontSize="11" fill="#312e81" fontWeight="600">AI engine details</text>
            <text x="1116" y="201" fontSize="10" fill="#57534e">Scope: rule + AI hybrid</text>
            <text x="1116" y="215" fontSize="10" fill="#57534e">Pricing: anchored · benchmark</text>
            <text x="1116" y="229" fontSize="10" fill="#57534e">ROI: monte-carlo · 1k runs</text>
          </g>

          {/* Legend */}
          <g transform="translate(20, 680)" fontSize="10.5">
            <Dot x={0}    fill="#0c0a09" label="Linear / UI node"/>
            <Dot x={140}  fill="#4f46e5" label="Auto-drafted"/>
            <Dot x={260}  fill="#7c3aed" label="AI moment"/>
            <Dot x={370}  fill="#047857" label="Delivery"/>
            <Dot x={470}  fill="transparent" stroke="#7c3aed" label="Regenerate loop" dashed/>
          </g>
        </svg>
      </div>
    </div>
  );
}

function CNode({ x, y, w = 140, h = 60, label, sub, kind = "linear", idx, ai, children }) {
  const styles = {
    linear:  { fill: "#fff",  stroke: "#d6d3d1", titleColor: "#0c0a09" },
    entry:   { fill: "#fff",  stroke: "#d6d3d1", titleColor: "#0c0a09" },
    input:   { fill: "#f5f5f4", stroke: "#d6d3d1", titleColor: "#0c0a09" },
    engine:  { fill: "#faf8ff", stroke: "#ddd6fe", titleColor: "#312e81" },
    draft:   { fill: "#eef0ff", stroke: "#c7d2fe", titleColor: "#312e81" },
    edit:    { fill: "#fff",  stroke: "#0c0a09", titleColor: "#0c0a09" },
    success: { fill: "#ecfdf5", stroke: "#a7f3d0", titleColor: "#065f46" },
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
      {ai && <circle cx={w - 12} cy={12} r="3.5" fill="#7c3aed"/>}
      <text x={w/2} y={h/2 - 1} fontSize="12" fill={styles.titleColor} textAnchor="middle" fontWeight="600">{label}</text>
      {sub && <text x={w/2} y={h/2 + 15} fontSize="10" fill="#8a8580" textAnchor="middle">{sub}</text>}
      <g transform={`translate(${w/2}, 0)`}>{children}</g>
    </g>
  );
}

function CDiamond({ x, y, label }) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      <polygon points="0,15 25,0 50,15 25,30" fill="#fff" stroke="#a8a29e" strokeDasharray="3 2"/>
      <text x="25" y="19" fontSize="9.5" fill="#0c0a09" textAnchor="middle">{label}</text>
    </g>
  );
}

function CArrow({ from, to, label, kind, vertical }) {
  const marker = kind === "accent" ? "url(#cArrowAccent)" : kind === "ai" ? "url(#cArrowAi)" : kind === "muted" ? "url(#cArrowMuted)" : "url(#cArrowDark)";
  const color = kind === "accent" ? "#4f46e5" : kind === "ai" ? "#7c3aed" : kind === "muted" ? "#a8a29e" : "#0c0a09";
  return (
    <>
      <line x1={from[0]} y1={from[1]} x2={to[0]} y2={to[1]} stroke={color} strokeWidth="1.4" markerEnd={marker}/>
      {label && (
        <text x={(from[0]+to[0])/2} y={vertical ? (from[1]+to[1])/2 - 4 : from[1] - 6} fontSize="9.5" fill={color} textAnchor="middle">{label}</text>
      )}
    </>
  );
}

function COutput({ x, y, title, tag }) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      <rect width="200" height="36" rx="8" fill="#fff" stroke="#d6d3d1"/>
      <circle cx="12" cy="18" r="3" fill="#4f46e5"/>
      <text x="22" y="16" fontSize="11.5" fill="#0c0a09" fontWeight="600">{title}</text>
      <text x="22" y="29" fontSize="9.5" fill="#8a8580">{tag}</text>
    </g>
  );
}

function Dot({ x, fill, stroke, label, dashed }) {
  return (
    <g transform={`translate(${x}, 0)`}>
      {dashed ? <line x1="0" y1="6" x2="14" y2="6" stroke={stroke || fill} strokeDasharray="2 2"/> :
        <circle cx="6" cy="6" r="5" fill={fill} stroke={stroke || "none"}/>}
      <text x="20" y="10" fill="#57534e">{label}</text>
    </g>
  );
}

// ─────────────────────────────────────────────────────────────
// Integration map — Bridge → Compass → Dock / Deck / Radar / Beacon
// ─────────────────────────────────────────────────────────────
function CIntegrationMap() {
  return (
    <div className="br-frame" style={{ background: "linear-gradient(180deg, #fafaf9 0%, #f5f5f4 100%)", padding: "32px 40px", overflow: "auto" }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 24 }}>
        <div>
          <Pill tone="dark" size="sm">ECOSYSTEM INTEGRATION MAP</Pill>
          <h1 className="br-h1" style={{ fontSize: 30, marginTop: 12, marginBottom: 6 }}>Compass is the spine.</h1>
          <p className="br-body" style={{ maxWidth: 620 }}>
            One client record flows from Bridge into Compass, then out to the four operating systems. Every arrow is a real schema contract — typed payloads, idempotent writes, no human re-keying.
          </p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          {[
            ["Inbound entities", "1 (Bridge)"],
            ["Outbound systems", "4"],
            ["Contracts", "12 typed events"],
            ["Latency p50", "1.4s"],
          ].map(([k, v]) => (
            <div key={k} style={{ padding: "10px 14px", background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 10, minWidth: 88 }}>
              <div className="br-eyebrow" style={{ fontSize: 9 }}>{k}</div>
              <div className="br-num" style={{ fontSize: 16, fontWeight: 600, letterSpacing: "-0.02em", marginTop: 2 }}>{v}</div>
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
        <svg viewBox="0 0 1280 580" style={{ width: "100%", height: "100%", display: "block" }}>
          <defs>
            <marker id="iArrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#0c0a09"/></marker>
            <marker id="iArrowAccent" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#4f46e5"/></marker>
            <linearGradient id="dataFlow" x1="0" x2="1">
              <stop offset="0" stopColor="#4f46e5" stopOpacity=".0"/>
              <stop offset=".5" stopColor="#4f46e5" stopOpacity=".6"/>
              <stop offset="1" stopColor="#4f46e5" stopOpacity=".0"/>
            </linearGradient>
          </defs>

          {/* Bridge (left) */}
          <SystemBox x={40} y={210} w={180} h={140} name="Bridge" tagline="Client onboarding" tone="bridge" icon="onboarding">
            <Sub label="A · Snapshot"/>
            <Sub label="B · Services"/>
            <Sub label="C · Strategy"/>
            <Sub label="D · Assets"/>
            <Sub label="E · Goals"/>
            <Sub label="F · Review"/>
          </SystemBox>

          {/* Compass (center, hero) */}
          <SystemBox x={420} y={170} w={260} h={220} name="Compass" tagline="Proposal intelligence" tone="compass" icon="compass" hero>
            <Sub label="Scope assembler"/>
            <Sub label="Pricing engine"/>
            <Sub label="ROI simulator"/>
            <Sub label="Narrative · AI"/>
            <Sub label="Assumptions ledger"/>
            <Sub label="Version control"/>
            <Sub label="Publish + tracking"/>
          </SystemBox>

          {/* Right column — 4 systems */}
          <SystemBox x={920} y={60} w={250} h={108} name="Dock" tagline="CRM · system of record" tone="dock">
            <Sub label="client.update"/>
            <Sub label="opportunity.create"/>
          </SystemBox>
          <SystemBox x={920} y={200} w={250} h={108} name="Deck" tagline="Client portal" tone="deck">
            <Sub label="portal.provision"/>
            <Sub label="document.share"/>
          </SystemBox>
          <SystemBox x={920} y={340} w={250} h={108} name="Radar" tagline="Analytics dashboard" tone="radar">
            <Sub label="baseline.import"/>
            <Sub label="goal.create"/>
          </SystemBox>
          <SystemBox x={920} y={480} w={250} h={70} name="Beacon" tagline="Automation engine" tone="beacon">
            <Sub label="workflow.stage"/>
          </SystemBox>

          {/* Bridge → Compass main arrow */}
          <path d="M 220 280 C 300 280, 340 280, 420 280" stroke="url(#dataFlow)" strokeWidth="14" fill="none" opacity=".55"/>
          <path d="M 220 280 L 415 280" stroke="#4f46e5" strokeWidth="2" fill="none" markerEnd="url(#iArrowAccent)"/>
          <g transform="translate(280, 256)">
            <rect width="120" height="22" rx="6" fill="#fff" stroke="#c7d2fe"/>
            <text x="60" y="11" fontSize="10.5" fill="#312e81" textAnchor="middle" fontWeight="600" dy="3">bridge.complete</text>
            <text x="60" y="38" fontSize="9.5" fill="#7c3aed" textAnchor="middle" fontFamily="var(--font-mono)">127 fields · 7 assets</text>
          </g>

          {/* Compass → 4 systems */}
          <ContractArrow from={[680, 200]} to={[920, 114]} label="dock.client.upsert" sub="instant"/>
          <ContractArrow from={[680, 250]} to={[920, 254]} label="deck.portal.provision" sub="ETA 30s"/>
          <ContractArrow from={[680, 310]} to={[920, 394]} label="radar.baseline.import" sub="async · 6m"/>
          <ContractArrow from={[680, 360]} to={[920, 515]} label="beacon.workflow.stage" sub="staged · off"/>

          {/* Backflow ribbons (analytics back to Compass) */}
          <path d="M 1045 168 C 880 200, 880 200, 690 215" stroke="#a8a29e" strokeWidth="1.2" fill="none" strokeDasharray="3 3"/>
          <text x="800" y="180" fontSize="9.5" fill="#8a8580">contract.signed (Dock)</text>

          <path d="M 1045 448 C 800 460, 800 410, 690 380" stroke="#a8a29e" strokeWidth="1.2" fill="none" strokeDasharray="3 3"/>
          <text x="800" y="448" fontSize="9.5" fill="#8a8580">live.metric.update (Radar)</text>

          {/* Legend */}
          <g transform="translate(40, 540)" fontSize="10.5">
            <Dot x={0}    fill="#4f46e5" label="Forward contract"/>
            <Dot x={150}  fill="transparent" stroke="#a8a29e" dashed label="Backflow (analytics + signals)"/>
          </g>
        </svg>
      </div>
    </div>
  );
}

function SystemBox({ x, y, w, h, name, tagline, tone, icon, hero, children }) {
  const tones = {
    bridge:  { bg: "#fff", bd: "#d6d3d1",  fg: "#0c0a09", chip: "#f5f5f4", chipFg: "#57534e", mark: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)" },
    compass: { bg: "#fff", bd: "#4f46e5",  fg: "#0c0a09", chip: "#eef0ff", chipFg: "#312e81", mark: "linear-gradient(135deg, #4f46e5 0%, #a78bfa 100%)" },
    dock:    { bg: "#fff", bd: "#d6d3d1",  fg: "#0c0a09", chip: "#fef3c7", chipFg: "#92400e", mark: "#0c4a6e" },
    deck:    { bg: "#fff", bd: "#d6d3d1",  fg: "#0c0a09", chip: "#dcfce7", chipFg: "#166534", mark: "#065f46" },
    radar:   { bg: "#fff", bd: "#d6d3d1",  fg: "#0c0a09", chip: "#fce7f3", chipFg: "#9d174d", mark: "#7c2d12" },
    beacon:  { bg: "#fff", bd: "#d6d3d1",  fg: "#0c0a09", chip: "#fee2e2", chipFg: "#991b1b", mark: "#b45309" },
  }[tone];
  return (
    <g transform={`translate(${x}, ${y})`}>
      <rect width={w} height={h} rx="14" fill={tones.bg} stroke={tones.bd} strokeWidth={hero ? 2 : 1}
        style={{ filter: hero ? "drop-shadow(0 4px 12px rgba(79,70,229,.2))" : undefined }}/>
      <g transform="translate(16, 16)">
        {/* mark */}
        <rect width="22" height="22" rx="6" fill={tones.mark}/>
        <text x={32} y="11" fontSize="13" fontWeight="700" fill={tones.fg} letterSpacing="-0.01em" dy="4">{name}</text>
        <text x={32} y="30" fontSize="10" fill="#8a8580">{tagline}</text>
      </g>
      <g transform={`translate(16, 56)`}>
        {React.Children.map(children, (c, i) => React.cloneElement(c, { y: i * 18, chip: tones.chip, chipFg: tones.chipFg }))}
      </g>
    </g>
  );
}

function Sub({ label, y, chip, chipFg }) {
  return (
    <g transform={`translate(0, ${y || 0})`}>
      <rect width="100" height="14" rx="4" fill={chip || "#f5f5f4"} opacity=".8"/>
      <text x="8" y="7" fontSize="10" fill={chipFg || "#57534e"} dy="3" fontFamily="var(--font-mono)" fontWeight="500">{label}</text>
    </g>
  );
}

function ContractArrow({ from, to, label, sub }) {
  const mid = [(from[0] + to[0]) / 2, (from[1] + to[1]) / 2 - 14];
  return (
    <>
      <path d={`M ${from[0]} ${from[1]} C ${from[0] + 80} ${from[1]}, ${to[0] - 80} ${to[1]}, ${to[0]} ${to[1]}`}
        stroke="#0c0a09" strokeWidth="1.4" fill="none" markerEnd="url(#iArrow)"/>
      <g transform={`translate(${mid[0] - 65}, ${mid[1] - 11})`}>
        <rect width="130" height="22" rx="6" fill="#fff" stroke="#d6d3d1"/>
        <text x="65" y="11" fontSize="10" fill="#0c0a09" textAnchor="middle" fontWeight="600" fontFamily="var(--font-mono)" dy="3">{label}</text>
        <text x="65" y="32" fontSize="9.5" fill="#8a8580" textAnchor="middle">{sub}</text>
      </g>
    </>
  );
}

Object.assign(window, { CFlowMap, CIntegrationMap });
