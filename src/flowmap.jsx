/* global React, Icon, Pill */
// Bridge — UX flow map (single dense artboard)

function FlowMap() {
  return (
    <div className="br-frame" style={{
      background: "linear-gradient(180deg, #fafaf9 0%, #f5f5f4 100%)",
      padding: "32px 40px", overflow: "auto",
    }} >
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 28, flexShrink: 0 }}>
        <div>
          <Pill tone="dark" size="sm">UX FLOW MAP · v1.4</Pill>
          <h1 className="br-h1" style={{ fontSize: 32, marginTop: 12, marginBottom: 6 }}>The Bridge journey</h1>
          <p className="br-body" style={{ maxWidth: 560 }}>
            Every node is a screen state. Adaptive branches reveal based on service selection. Auto-save fires on every node transition.
          </p>
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          {[
            ["Linear nodes", "11"],
            ["Branches", "6"],
            ["Decision points", "9"],
            ["Avg. time", "11m 42s"],
          ].map(([k, v]) => (
            <div key={k} style={{ padding: "10px 14px", background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 10, minWidth: 80 }}>
              <div className="br-eyebrow" style={{ fontSize: 9 }}>{k}</div>
              <div className="br-num" style={{ fontSize: 18, fontWeight: 600, letterSpacing: "-0.02em", marginTop: 2 }}>{v}</div>
            </div>
          ))}
        </div>
      </div>

      {/* SVG diagram */}
      <div style={{
        flex: 1, background: "var(--surface)", border: "1px solid var(--line)",
        borderRadius: 16, boxShadow: "var(--shadow-2)", padding: 20, position: "relative",
        backgroundImage: "radial-gradient(circle at 1px 1px, var(--line) 1px, transparent 0)",
        backgroundSize: "16px 16px",
        backgroundPosition: "0 0",
        overflow: "hidden",
      }}>
        <svg viewBox="0 0 1340 720" style={{ width: "100%", height: "100%", display: "block" }} fontFamily="var(--font-sans)">
          <defs>
            <marker id="arrowDark" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M0,0 L10,5 L0,10 z" fill="#0c0a09"/>
            </marker>
            <marker id="arrowAccent" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M0,0 L10,5 L0,10 z" fill="#4f46e5"/>
            </marker>
            <marker id="arrowMuted" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M0,0 L10,5 L0,10 z" fill="#a8a29e"/>
            </marker>
            <marker id="arrowAi" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M0,0 L10,5 L0,10 z" fill="#7c3aed"/>
            </marker>
          </defs>

          {/* Swimlane labels */}
          <g fontSize="9.5" fill="#a8a29e" letterSpacing="1.2">
            <text x="20"  y="32">ENTRY</text>
            <text x="20"  y="160">LINEAR FLOW</text>
            <text x="20"  y="380">CONDITIONAL BRANCHES</text>
            <text x="20"  y="580">SYSTEM</text>
          </g>

          {/* Swimlane dividers */}
          <line x1="0" y1="100" x2="1340" y2="100" stroke="#efeeec" strokeWidth="1"/>
          <line x1="0" y1="320" x2="1340" y2="320" stroke="#efeeec" strokeWidth="1"/>
          <line x1="0" y1="540" x2="1340" y2="540" stroke="#efeeec" strokeWidth="1"/>

          {/* Entry nodes */}
          <FNode x={100} y={50} w={140} label="01" title="Secure link" sub="Email invitation" kind="entry"/>
          <FArrow from={[240, 70]} to={[290, 70]} kind="dark"/>
          <FNode x={290} y={50} w={140} label="02" title="Landing" sub="Welcome · ~10 min" kind="entry"/>
          <FArrow from={[430, 70]} to={[480, 70]} kind="dark"/>
          <FDiamond x={510} y={70} label="Signed in?"/>
          <FArrow from={[567, 70]} to={[615, 70]} kind="dark" label="No"/>
          <FNode x={615} y={50} w={140} label="03" title="Magic link" sub="Email confirm" kind="entry"/>
          <FArrow from={[755, 70]} to={[855, 70]} kind="accent" label="Confirmed"/>
          <text x="805" y="62" fontSize="10" fill="#7c3aed">2-factor</text>

          {/* re-entry loop */}
          <path d="M 540 95 Q 540 200 340 200 Q 140 200 140 95" fill="none" stroke="#a8a29e" strokeWidth="1.2" strokeDasharray="3 3"/>
          <text x="330" y="218" fontSize="10" fill="#8a8580">Resume token (any device)</text>

          {/* Linear flow */}
          <FNode x={855} y={130} w={160} title="A · Snapshot" sub="6 fields" label="04" kind="linear"/>
          <FArrow from={[1015, 150]} to={[1065, 150]} kind="dark"/>
          <FNode x={1065} y={130} w={160} title="B · Services" sub="6 picks → branches" label="05" kind="linear" emph/>
          <path d="M 1145 195 L 1145 240" stroke="#0c0a09" strokeWidth="1.5" fill="none" markerEnd="url(#arrowDark)"/>

          <FNode x={290} y={240} w={160} title="C · Strategy" sub="ICP · competitors" label="07" kind="linear" ai/>
          <FNode x={490} y={240} w={160} title="D · Assets" sub="Drop + validate" label="08" kind="linear"/>
          <FNode x={690} y={240} w={160} title="E · Goals" sub="Sliders + rank" label="09" kind="linear"/>
          <FNode x={890} y={240} w={160} title="F · Review" sub="AI summary" label="10" kind="linear" ai emph/>
          <FNode x={1090} y={240} w={160} title="Handoff" sub="5 systems" label="11" kind="success"/>

          {/* Linear arrows */}
          <FArrow from={[450, 260]} to={[490, 260]} kind="dark"/>
          <FArrow from={[650, 260]} to={[690, 260]} kind="dark"/>
          <FArrow from={[850, 260]} to={[890, 260]} kind="dark"/>
          <FArrow from={[1050, 260]} to={[1090, 260]} kind="dark"/>

          {/* B → branching panel decision */}
          <FDiamond x={1145} y={265} label="Per-service rules" wide/>

          {/* connect snapshot → strategy */}
          <path d="M 935 195 L 935 220 L 370 220 L 370 240" fill="none" stroke="#0c0a09" strokeWidth="1.5" markerEnd="url(#arrowDark)"/>

          {/* connect decision → B branches below */}
          <path d="M 1145 295 L 1145 340" fill="none" stroke="#4f46e5" strokeWidth="1.5" markerEnd="url(#arrowAccent)"/>

          {/* Branch row */}
          <FBranch x={100}  y={360} title="Website" qs={["Has site?", "URL / platform", "Pain points", "Pages needed"]}/>
          <FBranch x={300}  y={360} title="Paid Ads" qs={["Platforms", "Budget", "Tracking", "Current ROAS", "Pixel status"]}/>
          <FBranch x={500}  y={360} title="SEO" qs={["Current rank", "Competitor URLs", "Target locations", "Content velocity"]}/>
          <FBranch x={700}  y={360} title="Branding" qs={["Identity stage", "Voice", "Guidelines"]}/>
          <FBranch x={900}  y={360} title="Content" qs={["Channels", "Cadence", "Topic pillars"]}/>
          <FBranch x={1100} y={360} title="Automation" qs={["Current CRM", "Workflows needed", "Data sources", "Integrations"]}/>

          {/* Branch outputs converge into Strategy */}
          <g stroke="#a8a29e" strokeWidth="1.2" strokeDasharray="2 3" fill="none">
            <path d="M 180 480 Q 180 510 370 510 L 370 470" markerEnd="url(#arrowMuted)"/>
            <path d="M 380 480 Q 380 505 370 505" />
            <path d="M 580 480 Q 580 505 380 505 L 380 470" markerEnd="url(#arrowMuted)"/>
            <path d="M 780 480 Q 780 505 390 505" />
            <path d="M 980 480 Q 980 505 390 505 L 390 470" markerEnd="url(#arrowMuted)"/>
            <path d="M 1180 480 Q 1180 505 400 505 L 400 470" markerEnd="url(#arrowMuted)"/>
          </g>

          {/* Side: AI overlays */}
          <g>
            <rect x="290" y="195" width="160" height="24" rx="6" fill="#f5f3ff" stroke="#ddd6fe"/>
            <circle cx="305" cy="207" r="3" fill="#7c3aed"/>
            <text x="314" y="211" fontSize="10.5" fill="#7c3aed" fontWeight="500">AI extracts 11 fields</text>

            <rect x="890" y="195" width="160" height="24" rx="6" fill="#f5f3ff" stroke="#ddd6fe"/>
            <circle cx="905" cy="207" r="3" fill="#7c3aed"/>
            <text x="914" y="211" fontSize="10.5" fill="#7c3aed" fontWeight="500">AI summary · gap audit</text>
          </g>

          {/* System swimlane (bottom) — autosave + downstream */}
          <g>
            <rect x="80" y="570" width="1180" height="60" rx="12" fill="#fafaf9" stroke="#e7e5e4"/>
            <text x="100" y="595" fontSize="11" fill="#0c0a09" fontWeight="600">Autosave engine</text>
            <text x="100" y="610" fontSize="10" fill="#57534e">debounced 600ms · per-field · session-bound JWT · resumable from any node</text>

            <circle cx="280" cy="600" r="3" fill="#047857"/>
            <text x="290" y="604" fontSize="10" fill="#0c0a09">save</text>
            <circle cx="340" cy="600" r="3" fill="#047857"/>
            <text x="350" y="604" fontSize="10" fill="#0c0a09">save</text>
            <circle cx="400" cy="600" r="3" fill="#047857"/>
            <text x="410" y="604" fontSize="10" fill="#0c0a09">save…</text>

            {/* Downstream icons */}
            <g transform="translate(720, 580)">
              {["Dock","Compass","Deck","Radar","Beacon"].map((n, i) => (
                <g key={n} transform={`translate(${i*100}, 0)`}>
                  <rect x="0" y="6" width="80" height="36" rx="8" fill="#fff" stroke="#e7e5e4"/>
                  <circle cx="14" cy="24" r="5" fill="#4f46e5" opacity={0.85 - i*0.12}/>
                  <text x="26" y="28" fontSize="10.5" fill="#0c0a09" fontWeight="600">{n}</text>
                </g>
              ))}
            </g>
            <path d="M 1170 270 L 1170 540 L 970 540 L 970 580" stroke="#0c0a09" strokeWidth="1.2" fill="none" strokeDasharray="3 3"/>
          </g>

          {/* Legend */}
          <g transform="translate(20, 670)">
            <LegendDot x={0} fill="#0c0a09" label="Linear node"/>
            <LegendDot x={120} fill="#4f46e5" label="Branched node"/>
            <LegendDot x={250} fill="#7c3aed" label="AI moment"/>
            <LegendDot x={360} fill="#047857" label="Auto-save"/>
            <LegendDot x={470} fill="transparent" stroke="#a8a29e" label="Resume path" dashed/>
          </g>
        </svg>
      </div>
    </div>
  );
}

function FNode({ x, y, w = 140, h = 64, label, title, sub, kind = "linear", emph, ai }) {
  const stroke = kind === "entry" ? "#d6d3d1" : kind === "success" ? "#a7f3d0" : emph ? "#0c0a09" : "#d6d3d1";
  const fill = kind === "success" ? "#ecfdf5" : "#ffffff";
  const titleColor = kind === "success" ? "#065f46" : "#0c0a09";
  return (
    <g transform={`translate(${x}, ${y})`}>
      <rect width={w} height={h} rx="10" fill={fill} stroke={stroke} strokeWidth={emph ? 1.5 : 1}/>
      {label && (
        <>
          <rect x="8" y="8" width="20" height="14" rx="3" fill="#f5f5f4" stroke="#e7e5e4"/>
          <text x="18" y="18" fontSize="8.5" fill="#57534e" textAnchor="middle" fontFamily="var(--font-mono)" fontWeight="600">{label}</text>
        </>
      )}
      {ai && <circle cx={w - 12} cy={12} r="3.5" fill="#7c3aed"/>}
      <text x={w/2} y={h/2 - 1} fontSize="12.5" fill={titleColor} textAnchor="middle" fontWeight="600" letterSpacing="-0.005em">{title}</text>
      <text x={w/2} y={h/2 + 16} fontSize="10" fill="#8a8580" textAnchor="middle">{sub}</text>
    </g>
  );
}

function FDiamond({ x, y, label, wide }) {
  const w = wide ? 96 : 50;
  return (
    <g transform={`translate(${x}, ${y})`}>
      <polygon points={`0,15 ${w/2},0 ${w},15 ${w/2},30`} fill="#fff" stroke="#a8a29e" strokeDasharray="3 2"/>
      <text x={w/2} y="19" fontSize="9.5" fill="#0c0a09" textAnchor="middle">{label}</text>
    </g>
  );
}

function FArrow({ from, to, kind = "dark", label }) {
  const marker = kind === "accent" ? "url(#arrowAccent)" : kind === "muted" ? "url(#arrowMuted)" : kind === "ai" ? "url(#arrowAi)" : "url(#arrowDark)";
  const color = kind === "accent" ? "#4f46e5" : kind === "muted" ? "#a8a29e" : kind === "ai" ? "#7c3aed" : "#0c0a09";
  return (
    <g>
      <line x1={from[0]} y1={from[1]} x2={to[0] - 4} y2={to[1]} stroke={color} strokeWidth="1.5" markerEnd={marker}/>
      {label && <text x={(from[0]+to[0])/2} y={from[1] - 6} fontSize="9.5" fill={color} textAnchor="middle">{label}</text>}
    </g>
  );
}

function FBranch({ x, y, title, qs }) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      <rect width="180" height="110" rx="10" fill="#fff" stroke="#e7e5e4"/>
      <rect x="0" y="0" width="180" height="22" rx="10" fill="#eef0ff" stroke="#e0e3ff"/>
      <text x="12" y="15" fontSize="11.5" fill="#312e81" fontWeight="600">{title}</text>
      <text x="170" y="15" fontSize="9.5" fill="#4f46e5" textAnchor="end" fontFamily="var(--font-mono)">{qs.length} q</text>
      {qs.map((q, i) => (
        <g key={q}>
          <circle cx="14" cy={36 + i * 14} r="2" fill="#4f46e5"/>
          <text x="22" y={39 + i * 14} fontSize="10" fill="#292524">{q}</text>
        </g>
      ))}
    </g>
  );
}

function LegendDot({ x, fill, stroke, label, dashed }) {
  return (
    <g transform={`translate(${x}, 0)`}>
      {dashed ? <line x1="0" y1="6" x2="14" y2="6" stroke={stroke || fill} strokeDasharray="2 2"/> :
        <circle cx="6" cy="6" r="5" fill={fill} stroke={stroke || "none"}/>}
      <text x="20" y="10" fontSize="10.5" fill="#57534e">{label}</text>
    </g>
  );
}

Object.assign(window, { FlowMap });
