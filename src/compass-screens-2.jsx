/* global React, Icon, Button, Field, Input, Textarea, Chip, Pill, Card, SelectCard, Toggle, Slider, AICallout,
   CompassWordmark, WorkspaceRail, ProposalToolbar, ServiceBlock, Metric, TierCard, ScenarioBar, AssumptionRow, SectionHeader */
// Compass — screens part 2: ROI, Assumptions, Client cover, Client narrative, Publish modal

// ─────────────────────────────────────────────────────────────
// 05 — ROI simulation
// ─────────────────────────────────────────────────────────────
function CROI() {
  return (
    <div className="br-frame" style={{ flexDirection: "row" }}>
      <WorkspaceRail activeId="roi"/>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <ProposalToolbar activeVersion="rec"/>
        <div className="br-scroll" style={{ flex: 1, overflowY: "auto", padding: "28px 36px 32px" }}>
          <SectionHeader
            eyebrow="Build · ROI simulation"
            title="Three scenarios, one honest range."
            subtitle="Compass models a 12-month outcome band from the recommended scope. Hover any number to see its assumptions."
            right={
              <div style={{ display: "flex", gap: 8 }}>
                <Button variant="outline" size="sm" icon="sliders">Tune assumptions</Button>
                <Button variant="ghost" size="sm" icon="info">Methodology</Button>
              </div>
            }
          />

          {/* Scenarios cards */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.1fr 1fr", gap: 12, marginBottom: 24 }}>
            {[
              { name: "Low", tagline: "Williston ramps slowly, paid CPL stays flat.", color: "var(--ink-4)", revenue: "$3.0M", patients: "+92/mo", roas: "2.8×", fill: "64%" },
              { name: "Expected", tagline: "On-pace ramp, recall automation lands, CPL trends down.", color: "var(--accent)", revenue: "$3.6M", patients: "+140/mo", roas: "4.2×", fill: "82%", featured: true },
              { name: "High", tagline: "Williston fills early, Compass content compounds.", color: "var(--ok)", revenue: "$4.2M", patients: "+186/mo", roas: "5.6×", fill: "94%" },
            ].map((s) => (
              <div key={s.name} style={{
                padding: 18, borderRadius: 14,
                background: s.featured ? "var(--surface)" : "var(--surface)",
                border: s.featured ? "1.5px solid var(--accent)" : "1px solid var(--line-strong)",
                boxShadow: s.featured ? "0 0 0 4px rgba(79,70,229,.08), var(--shadow-1)" : "var(--shadow-1)",
              }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ width: 8, height: 8, borderRadius: 999, background: s.color }}/>
                    <span style={{ fontSize: 14, fontWeight: 600, letterSpacing: "-0.005em" }}>{s.name}</span>
                  </div>
                  {s.featured && <Pill tone="accent" size="sm">Expected</Pill>}
                </div>
                <div style={{ fontSize: 12.5, color: "var(--ink-4)", marginBottom: 14, lineHeight: 1.45, minHeight: 36 }}>{s.tagline}</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  {[["Revenue", s.revenue], ["New pts/mo", s.patients], ["ROAS", s.roas], ["Williston fill", s.fill]].map(([k, v]) => (
                    <div key={k}>
                      <div className="br-mono" style={{ fontSize: 10, color: "var(--ink-5)", textTransform: "uppercase", letterSpacing: ".06em" }}>{k}</div>
                      <div className="br-num" style={{ fontSize: 18, fontWeight: 600, letterSpacing: "-0.02em", marginTop: 2 }}>{v}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Range bars */}
          <Card padding={22} style={{ marginBottom: 16 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
              <div>
                <div className="br-eyebrow">12-month outcome bands</div>
                <div style={{ fontSize: 16, fontWeight: 600, marginTop: 4, letterSpacing: "-0.01em" }}>Where the numbers actually land</div>
              </div>
              <Pill tone="ai" size="sm" icon="sparkle">Updated when scope changes</Pill>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 26, paddingTop: 8 }}>
              <ScenarioBar label="New patients / month"     low={92}  expected={140} high={186} baseline={85}  format={(v) => `+${v}`}/>
              <ScenarioBar label="Annual revenue"           low={3.0} expected={3.6} high={4.2} baseline={2.4} format={(v) => `$${v.toFixed(1)}M`}/>
              <ScenarioBar label="Blended ROAS"             low={2.8} expected={4.2} high={5.6} baseline={0}   format={(v) => `${v.toFixed(1)}×`}/>
              <ScenarioBar label="Williston schedule fill"  low={64}  expected={82}  high={94}  baseline={38}  format={(v) => `${v}%`}/>
            </div>
          </Card>

          {/* Payback + assumptions visualized */}
          <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 12 }}>
            <Card padding={20}>
              <div className="br-eyebrow" style={{ marginBottom: 4 }}>Investment vs. return — Recommended tier</div>
              <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 14, letterSpacing: "-0.01em" }}>Payback in month 5</div>
              <PaybackChart/>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginTop: 16, paddingTop: 14, borderTop: "1px solid var(--line)" }}>
                {[["Year 1 investment", "$126K"], ["Year 1 net new revenue", "$612K"], ["Year 1 ROI", "4.9×"], ["Payback period", "5.0 mo"]].map(([k, v]) => (
                  <div key={k}>
                    <div className="br-eyebrow" style={{ fontSize: 9.5 }}>{k}</div>
                    <div className="br-num" style={{ fontSize: 18, fontWeight: 600, marginTop: 4, letterSpacing: "-0.02em" }}>{v}</div>
                  </div>
                ))}
              </div>
            </Card>

            <Card padding={20}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                <div>
                  <div className="br-eyebrow">Sensitivity</div>
                  <div style={{ fontSize: 16, fontWeight: 600, marginTop: 4, letterSpacing: "-0.01em" }}>What moves the dial most</div>
                </div>
                <Icon name="info" size={14} color="var(--ink-4)"/>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {[
                  ["Williston conversion rate",  92, "Per 10% lift → +$340K / yr"],
                  ["Paid CPL",                    74, "Per $20 drop → +$148K / yr"],
                  ["Recall return rate",          58, "Per 5 pts → +$92K / yr"],
                  ["Avg. patient LTV",            42, "Per $300 lift → +$84K / yr"],
                  ["Organic traffic share",       28, "Per 5 pts → +$48K / yr"],
                ].map(([k, w, s]) => (
                  <div key={k}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                      <span style={{ fontSize: 12.5, fontWeight: 500 }}>{k}</span>
                      <span className="br-mono" style={{ fontSize: 10.5, color: "var(--ink-5)" }}>{s}</span>
                    </div>
                    <div style={{ height: 5, borderRadius: 999, background: "var(--surface-3)", overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${w}%`, background: w > 70 ? "var(--accent)" : "var(--ink-3)", borderRadius: 999 }}/>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

function PaybackChart() {
  // 12 monthly bars: investment outflow (negative) vs cumulative net revenue (positive)
  const months = ["M1","M2","M3","M4","M5","M6","M7","M8","M9","M10","M11","M12"];
  const inv = [-25, -10, -10, -9, -9, -9, -9, -9, -9, -9, -9, -9]; // $K
  const cum = [-25, -32, -32, -25, 0, 38, 88, 145, 215, 295, 392, 495]; // cumulative profit $K
  const max = 500;
  const min = -50;
  const range = max - min;
  const h = 160;
  const baselineY = (max / range) * h;
  return (
    <svg viewBox={`0 0 480 ${h + 32}`} style={{ width: "100%", height: "auto", display: "block" }}>
      {/* zero line */}
      <line x1="0" y1={baselineY} x2="480" y2={baselineY} stroke="var(--line-strong)" strokeDasharray="2 3"/>
      <text x="478" y={baselineY - 4} fontSize="9.5" fill="var(--ink-5)" textAnchor="end">$0 — break-even</text>
      {/* payback dashed marker (month 5) */}
      <line x1={(4.5 / 12) * 480} y1="0" x2={(4.5 / 12) * 480} y2={h} stroke="var(--accent)" strokeDasharray="3 3" strokeWidth="1"/>
      <text x={(4.5 / 12) * 480 + 4} y="14" fontSize="9.5" fill="var(--accent)" fontWeight="600">Payback · M5</text>

      {/* cumulative line */}
      <polyline
        fill="none" stroke="var(--accent)" strokeWidth="2"
        points={cum.map((v, i) => `${(i + 0.5) / 12 * 480},${((max - v) / range) * h}`).join(" ")}
      />
      <polygon
        fill="rgba(79,70,229,.1)"
        points={`${(0.5 / 12) * 480},${baselineY} ` + cum.map((v, i) => `${(i + 0.5) / 12 * 480},${((max - v) / range) * h}`).join(" ") + ` ${(11.5 / 12) * 480},${baselineY}`}
      />
      {cum.map((v, i) => (
        <circle key={i} cx={(i + 0.5) / 12 * 480} cy={((max - v) / range) * h} r="2.5" fill={i === 4 ? "var(--accent)" : "#fff"} stroke="var(--accent)" strokeWidth="1.5"/>
      ))}

      {/* monthly investment bars (small) */}
      {inv.map((v, i) => {
        const yTop = baselineY;
        const barH = (-v / range) * h;
        return <rect key={i} x={(i / 12) * 480 + 8} y={yTop} width="18" height={barH} fill="var(--ink-3)" opacity=".5"/>;
      })}

      {/* month labels */}
      {months.map((m, i) => (
        <text key={m} x={(i + 0.5) / 12 * 480} y={h + 14} fontSize="9.5" fill="var(--ink-5)" textAnchor="middle" fontFamily="var(--font-mono)">{m}</text>
      ))}
      {/* legend */}
      <g transform={`translate(0, ${h + 24})`}>
        <rect x="0" y="0" width="10" height="5" fill="var(--ink-3)" opacity=".5"/>
        <text x="14" y="5" fontSize="9.5" fill="var(--ink-4)">Monthly investment</text>
        <line x1="120" y1="2.5" x2="135" y2="2.5" stroke="var(--accent)" strokeWidth="2"/>
        <text x="140" y="5" fontSize="9.5" fill="var(--ink-4)">Cumulative net revenue</text>
      </g>
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────
// 06 — Assumption transparency
// ─────────────────────────────────────────────────────────────
function CAssumptions() {
  return (
    <div className="br-frame" style={{ flexDirection: "row" }}>
      <WorkspaceRail activeId="assumptions"/>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <ProposalToolbar activeVersion="rec"/>
        <div className="br-scroll" style={{ flex: 1, overflowY: "auto", padding: "28px 36px 32px" }}>
          <SectionHeader
            eyebrow="Inputs · Assumptions"
            title="Everything this proposal rests on."
            subtitle="Every number you'll see traces back to one of three categories. We're explicit about what we know, what we inferred, and what we'd like to validate before signing."
            right={
              <div style={{ display: "flex", gap: 8 }}>
                <Pill tone="ok" size="sm">11 known</Pill>
                <Pill tone="ai" size="sm">4 inferred</Pill>
                <Pill tone="warn" size="sm">2 unknown</Pill>
              </div>
            }
          />

          {/* Stats row */}
          <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr 1fr 1fr", gap: 12, marginBottom: 18 }}>
            <Card padding={18}>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{ position: "relative", width: 64, height: 64 }}>
                  <svg viewBox="0 0 36 36" style={{ width: "100%", height: "100%", transform: "rotate(-90deg)" }}>
                    <circle cx="18" cy="18" r="15.9" fill="none" stroke="var(--surface-3)" strokeWidth="3"/>
                    <circle cx="18" cy="18" r="15.9" fill="none" stroke="var(--accent)" strokeWidth="3" strokeDasharray="87 100" strokeLinecap="round"/>
                  </svg>
                  <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", fontSize: 14, fontWeight: 700, fontVariantNumeric: "tabular-nums", letterSpacing: "-0.01em" }}>87</div>
                </div>
                <div>
                  <div className="br-eyebrow" style={{ fontSize: 10 }}>Compass confidence</div>
                  <div style={{ fontSize: 13, fontWeight: 600, marginTop: 2 }}>Strong proposal</div>
                  <div style={{ fontSize: 11.5, color: "var(--ink-4)" }}>Validate 2 unknowns to clear 90+</div>
                </div>
              </div>
            </Card>
            <Card padding={18}>
              <div className="br-eyebrow" style={{ fontSize: 10 }}>From Bridge</div>
              <div className="br-num" style={{ fontSize: 26, fontWeight: 600, letterSpacing: "-0.025em", marginTop: 4 }}>127</div>
              <div style={{ fontSize: 11.5, color: "var(--ink-4)" }}>structured fields ingested</div>
            </Card>
            <Card padding={18}>
              <div className="br-eyebrow" style={{ fontSize: 10 }}>From external benchmarks</div>
              <div className="br-num" style={{ fontSize: 26, fontWeight: 600, letterSpacing: "-0.025em", marginTop: 4 }}>4</div>
              <div style={{ fontSize: 11.5, color: "var(--ink-4)" }}>industry models applied</div>
            </Card>
            <Card padding={18}>
              <div className="br-eyebrow" style={{ fontSize: 10 }}>Flagged for client</div>
              <div className="br-num" style={{ fontSize: 26, fontWeight: 600, letterSpacing: "-0.025em", marginTop: 4 }}>2</div>
              <div style={{ fontSize: 11.5, color: "var(--ink-4)" }}>questions before signing</div>
            </Card>
          </div>

          {/* Assumption tables */}
          <Card padding={0} style={{ overflow: "hidden", marginBottom: 12 }}>
            <div style={{ padding: "12px 18px", borderBottom: "1px solid var(--line)", display: "flex", alignItems: "center", justifyContent: "space-between", background: "var(--ok-soft)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ width: 8, height: 8, borderRadius: 999, background: "var(--ok)" }}/>
                <span style={{ fontSize: 13, fontWeight: 600 }}>Known · stated by client in Bridge</span>
              </div>
              <span className="br-mono" style={{ fontSize: 11, color: "var(--ok)" }}>11 facts</span>
            </div>
            <div>
              <AssumptionRow kind="known" source="Bridge · A.location" label="Locations" value="Burlington, S. Burlington, Williston (3 total)" confidence={100}/>
              <AssumptionRow kind="known" source="Bridge · B.budget"   label="Monthly ad budget" value="$8,500 · Meta + Google" confidence={100}/>
              <AssumptionRow kind="known" source="Bridge · C.growth"   label="Williston schedule utilization" value="38% (stated baseline)" confidence={100}/>
              <AssumptionRow kind="known" source="Bridge · D.access"   label="Account access provisioned" value="GBP, Meta, Google Ads — connected" confidence={100}/>
              <AssumptionRow kind="known" source="Bridge · E.priority" label="Top priority" value="Williston schedule fill" confidence={100}/>
            </div>
          </Card>

          <Card padding={0} style={{ overflow: "hidden", marginBottom: 12 }}>
            <div style={{ padding: "12px 18px", borderBottom: "1px solid var(--line)", display: "flex", alignItems: "center", justifyContent: "space-between", background: "var(--ai-soft)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ width: 8, height: 8, borderRadius: 999, background: "var(--ai)" }}/>
                <span style={{ fontSize: 13, fontWeight: 600 }}>Inferred · Compass benchmark + reasoning</span>
              </div>
              <span className="br-mono" style={{ fontSize: 11, color: "var(--ai)" }}>4 inferences</span>
            </div>
            <div>
              <AssumptionRow kind="inferred" source="Healthcare · NE US, 3-loc · n=148"   label="Avg. new patient LTV" value="$4,200 over 3 years" confidence={84}/>
              <AssumptionRow kind="inferred" source="Meta + Google · dental · Burlington" label="Expected blended CPL" value="$58–$84 · midpoint $71" confidence={78}/>
              <AssumptionRow kind="inferred" source="Compass org-model"                   label="Recall return-rate lift from automation" value="+8–14 pts" confidence={72}/>
              <AssumptionRow kind="inferred" source="Williston census · 5-mi radius"      label="Addressable households" value="~14,200 · ~3,100 unserved" confidence={68}/>
            </div>
          </Card>

          <Card padding={0} style={{ overflow: "hidden" }}>
            <div style={{ padding: "12px 18px", borderBottom: "1px solid var(--line)", display: "flex", alignItems: "center", justifyContent: "space-between", background: "var(--warn-soft)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ width: 8, height: 8, borderRadius: 999, background: "var(--warn)" }}/>
                <span style={{ fontSize: 13, fontWeight: 600 }}>Unknown · we'll ask before signing</span>
              </div>
              <span className="br-mono" style={{ fontSize: 11, color: "var(--warn)" }}>2 questions</span>
            </div>
            <div>
              <AssumptionRow kind="unknown" source="Not captured in Bridge"         label="Insurance mix — what % out-of-network is acceptable?" value="Affects targeting + CPL by ~25%" confidence={0}/>
              <AssumptionRow kind="unknown" source="Conflicting with stated budget" label="Provider capacity at Williston by Q4" value="2 vs 3 dentists materially changes ramp" confidence={0}/>
            </div>
            <div style={{ padding: 14, background: "var(--surface-2)", borderTop: "1px solid var(--line)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontSize: 12.5, color: "var(--ink-3)" }}>These two appear on the client proposal as <strong style={{ color: "var(--ink)" }}>open questions</strong> to surface before signing.</span>
              <Button variant="outline" size="sm" icon="pen">Edit prompts</Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 07 — Client preview · Cover
// ─────────────────────────────────────────────────────────────
function CClientCover() {
  return (
    <div className="br-frame" style={{ flexDirection: "column" }}>
      {/* Client view chrome */}
      <ClientViewChrome page="cover"/>
      <div className="br-scroll" style={{ flex: 1, overflowY: "auto", background: "var(--bg)" }}>
        {/* Hero */}
        <div style={{
          padding: "80px 80px 56px",
          background: "linear-gradient(180deg, #faf8ff 0%, var(--bg) 100%)",
          borderBottom: "1px solid var(--line)",
        }}>
          <div style={{ maxWidth: 880 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 32 }}>
              <CompassWordmark size="lg"/>
              <span style={{ width: 1, height: 18, background: "var(--line-strong)" }}/>
              <span style={{ fontSize: 13, color: "var(--ink-3)" }}>for Lakeside Family Dental</span>
            </div>

            <Pill tone="accent" size="md" icon="sparkle">Strategy & engagement proposal · Q3 2026</Pill>

            <h1 style={{ fontSize: 64, fontWeight: 600, letterSpacing: "-0.035em", lineHeight: 1.02, marginTop: 24, marginBottom: 18 }}>
              Filling the Williston chair, <span style={{ color: "var(--ink-4)" }}>without slowing</span> Burlington.
            </h1>
            <p style={{ fontSize: 19, color: "var(--ink-3)", lineHeight: 1.55, maxWidth: 700, marginTop: 0, marginBottom: 0 }}>
              A 12-month plan to lift Williston utilization from 38% to <strong style={{ color: "var(--ink)" }}>82%</strong>, add <strong style={{ color: "var(--ink)" }}>+140 new patients / month</strong> across the practice, and maintain a <strong style={{ color: "var(--ink)" }}>4.2× blended ROAS</strong> — at a $8.8K/mo retainer that pays back in month five.
            </p>

            <div style={{ display: "flex", gap: 12, marginTop: 36 }}>
              <Button variant="accent" size="lg" iconRight="arrow_right">Read the strategy</Button>
              <Button variant="outline" size="lg" icon="file">Download PDF</Button>
            </div>
          </div>
        </div>

        {/* Highlights */}
        <div style={{ padding: "48px 80px", borderBottom: "1px solid var(--line)" }}>
          <div className="br-eyebrow" style={{ marginBottom: 18 }}>The shape of the bet</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
            {[
              ["+140", "new patients / mo", "from 85 baseline"],
              ["82%", "Williston fill", "from 38% baseline"],
              ["4.2×", "blended ROAS", "industry benchmark 3.5–5×"],
              ["M5", "payback month", "$8.8K/mo · $126K Y1 total"],
            ].map(([n, l, s]) => (
              <div key={l}>
                <div className="br-num" style={{ fontSize: 56, fontWeight: 600, letterSpacing: "-0.035em", lineHeight: 1, color: "var(--ink)" }}>{n}</div>
                <div style={{ fontSize: 14, fontWeight: 500, marginTop: 8, color: "var(--ink-2)" }}>{l}</div>
                <div style={{ fontSize: 12.5, color: "var(--ink-4)", marginTop: 2 }}>{s}</div>
              </div>
            ))}
          </div>
        </div>

        {/* TOC */}
        <div style={{ padding: "40px 80px 60px" }}>
          <div className="br-eyebrow" style={{ marginBottom: 14 }}>What's in here</div>
          <div style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 14, overflow: "hidden", boxShadow: "var(--shadow-1)", maxWidth: 760 }}>
            {[
              ["01", "Situation",   "How we read your practice today",            "3 min"],
              ["02", "Strategy",    "What we recommend doing — and why",          "5 min"],
              ["03", "Scope",       "The eight modules that get us there",        "4 min"],
              ["04", "Investment",  "Three tiers, anchored to outcome",           "3 min"],
              ["05", "Forecast",    "Low / Expected / High over twelve months",   "2 min"],
              ["06", "Open questions", "Two things we'd like to confirm",         "1 min"],
              ["07", "Next steps",  "How we begin",                                "1 min"],
            ].map(([n, t, d, time], i, arr) => (
              <div key={n} style={{
                display: "flex", alignItems: "center", gap: 18, padding: "14px 22px",
                borderTop: i > 0 ? "1px solid var(--line-faint)" : "none",
              }}>
                <span className="br-mono" style={{ fontSize: 11, color: "var(--ink-5)", width: 24 }}>{n}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 15, fontWeight: 600, letterSpacing: "-0.005em" }}>{t}</div>
                  <div style={{ fontSize: 12.5, color: "var(--ink-4)" }}>{d}</div>
                </div>
                <span className="br-mono" style={{ fontSize: 11, color: "var(--ink-5)" }}>{time}</span>
                <Icon name="chevron_right" size={14} color="var(--ink-4)"/>
              </div>
            ))}
          </div>

          {/* Sender */}
          <div style={{ marginTop: 32, display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ width: 44, height: 44, borderRadius: 999, background: "#7c2d12", color: "#fff", display: "grid", placeItems: "center", fontWeight: 600, letterSpacing: "-0.005em" }}>SP</div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600 }}>Sam Patel · Strategy lead</div>
              <div style={{ fontSize: 12, color: "var(--ink-4)" }}>Digital Native · Prepared for Sarah Chen · Valid through Sept 12, 2026</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ClientViewChrome({ page = "cover" }) {
  const nav = [
    ["cover",     "Cover"],
    ["situation", "Situation"],
    ["strategy",  "Strategy"],
    ["scope",     "Scope"],
    ["invest",    "Investment"],
    ["forecast",  "Forecast"],
    ["accept",    "Accept"],
  ];
  return (
    <div style={{
      padding: "14px 36px", borderBottom: "1px solid var(--line)", background: "var(--surface)",
      display: "flex", alignItems: "center", gap: 16, flexShrink: 0,
    }}>
      <Pill tone="neutral" size="sm" icon="globe">Client view · live link</Pill>
      <span className="br-mono" style={{ fontSize: 11, color: "var(--ink-5)" }}>compass.dn-agency.com/p/LSD-7F2A</span>
      <span style={{ width: 1, height: 14, background: "var(--line)" }}/>
      <div style={{ display: "flex", gap: 2 }}>
        {nav.map(([k, l]) => (
          <span key={k} style={{
            padding: "5px 10px", borderRadius: 6, fontSize: 12,
            background: k === page ? "var(--ink)" : "transparent",
            color: k === page ? "#fff" : "var(--ink-3)",
            fontWeight: k === page ? 600 : 500, cursor: "pointer",
          }}>{l}</span>
        ))}
      </div>
      <div style={{ flex: 1 }}/>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ width: 6, height: 6, borderRadius: 999, background: "var(--ok)", animation: "br-pulse-soft 1.5s ease-in-out infinite" }}/>
        <span className="br-mono" style={{ fontSize: 11, color: "var(--ink-4)" }}>Sarah viewing now · 4m 12s</span>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 08 — Client preview · Strategy narrative
// ─────────────────────────────────────────────────────────────
function CClientStrategy() {
  return (
    <div className="br-frame" style={{ flexDirection: "column" }}>
      <ClientViewChrome page="strategy"/>
      <div className="br-scroll" style={{ flex: 1, overflowY: "auto", background: "var(--bg)" }}>
        <div style={{ maxWidth: 920, margin: "0 auto", padding: "48px 64px 64px" }}>
          {/* Section header */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <span className="br-mono" style={{ fontSize: 11, color: "var(--ink-5)", letterSpacing: ".06em" }}>02 — STRATEGY</span>
            <span style={{ flex: 1, height: 1, background: "var(--line)" }}/>
            <span className="br-mono" style={{ fontSize: 11, color: "var(--ink-5)" }}>5 min read</span>
          </div>
          <h1 style={{ fontSize: 48, fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1.05, marginTop: 8, marginBottom: 16 }}>
            We win Williston first.<br/>
            <span style={{ color: "var(--ink-4)" }}>Then we let the system pull the other two with it.</span>
          </h1>
          <p style={{ fontSize: 18, color: "var(--ink-3)", lineHeight: 1.6, maxWidth: 760, marginTop: 0, marginBottom: 28 }}>
            Williston is the bottleneck and the unlock. A dedicated landing page, paid acquisition pointed only at the Williston catchment, and a recall automation across all three locations creates compounding flow without forcing Burlington patients to switch chairs.
          </p>

          {/* Pillar cards */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginTop: 32, marginBottom: 32 }}>
            {[
              { n: "01", t: "Williston-only paid acquisition", d: "Meta + Google geo-fenced to the 5-mile Williston catchment. Distinct creative, distinct landing page. Burlington and S. Burlington remain untouched in paid — they don't need it." },
              { n: "02", t: "Lift the practice average via SEO", d: "Local SEO + reviews program across all three GBPs. Compounding effect: each ★ improvement at Williston also lifts the parent practice's blended rank." },
              { n: "03", t: "Conversion belongs on your site, not in your phones", d: "Online booking integrated with Dentrix, friction-free intake, and a Williston-specific page. We expect 38% of inbound to self-book within ninety days." },
              { n: "04", t: "Recall automation funds the rest", d: "Beacon-powered recall workflows recover roughly $92K in latent revenue across the existing book — which more than covers the retainer from month five." },
            ].map((p) => (
              <div key={p.n} style={{ padding: 24, background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 14, boxShadow: "var(--shadow-1)" }}>
                <span className="br-mono" style={{ fontSize: 11, color: "var(--accent)", letterSpacing: ".06em" }}>{p.n}</span>
                <h3 style={{ fontSize: 18, fontWeight: 600, letterSpacing: "-0.015em", marginTop: 8, marginBottom: 8, lineHeight: 1.25 }}>{p.t}</h3>
                <p style={{ fontSize: 14, color: "var(--ink-3)", margin: 0, lineHeight: 1.55 }}>{p.d}</p>
              </div>
            ))}
          </div>

          {/* What we're not doing */}
          <div style={{
            background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 14,
            padding: 24, boxShadow: "var(--shadow-1)", marginBottom: 32,
          }}>
            <div className="br-eyebrow" style={{ marginBottom: 8 }}>And just as importantly</div>
            <h3 style={{ fontSize: 22, fontWeight: 600, letterSpacing: "-0.02em", marginTop: 0, marginBottom: 16 }}>What we're <em style={{ color: "var(--ink-4)", fontStyle: "italic" }}>not</em> doing yet</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              {[
                ["Brand refresh",       "Your identity is fine. Money is better spent on Williston flow."],
                ["Content marketing",   "We'll add this in month four, once paid is dialed in."],
                ["TikTok / YouTube",    "Out of scope for a family-dental ICP — wrong attention."],
                ["A 4th location push", "Premature. Revisit at month nine if forecast holds."],
              ].map(([t, d]) => (
                <div key={t} style={{ display: "flex", gap: 10 }}>
                  <Icon name="x" size={16} color="var(--ink-4)" strokeWidth={2.2}/>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 500 }}>{t}</div>
                    <div style={{ fontSize: 13, color: "var(--ink-4)", marginTop: 2 }}>{d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Open questions footer */}
          <div style={{ padding: 22, background: "var(--warn-soft)", border: "1px solid #fcd34d", borderRadius: 12, display: "flex", gap: 14, alignItems: "flex-start" }}>
            <Icon name="alert" size={18} color="var(--warn)" strokeWidth={2}/>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "var(--warn)", marginBottom: 4 }}>Two open questions before signing</div>
              <div style={{ fontSize: 13.5, color: "var(--ink-2)", lineHeight: 1.55 }}>
                We've assumed a <strong>2-dentist capacity at Williston through Q4</strong> and that <strong>out-of-network insurance mix is acceptable</strong>. Both materially change ramp — happy to discuss live before you decide.
              </div>
            </div>
          </div>

          {/* Pagination */}
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 48, paddingTop: 24, borderTop: "1px solid var(--line)" }}>
            <Button variant="ghost" size="md" icon="arrow_left">01 — Situation</Button>
            <Button variant="accent" size="md" iconRight="arrow_right">03 — Scope</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 09 — Publish & Share (modal overlay)
// ─────────────────────────────────────────────────────────────
function CPublishModal() {
  return (
    <div className="br-frame" style={{ flexDirection: "row" }}>
      <WorkspaceRail activeId="publish"/>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, position: "relative" }}>
        <ProposalToolbar activeVersion="rec"/>

        {/* Dimmed background view */}
        <div className="br-scroll" style={{ flex: 1, overflowY: "auto", padding: "28px 36px 32px", filter: "blur(1.5px)", opacity: .5, pointerEvents: "none" }}>
          <SectionHeader eyebrow="Deliver · Publish" title="Publish the proposal." subtitle="Generate a live link, send by email, log to Dock, and provision the client portal — in one step."/>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
            <Card padding={16}><div style={{ height: 80, background: "var(--surface-2)" }}/></Card>
            <Card padding={16}><div style={{ height: 80, background: "var(--surface-2)" }}/></Card>
            <Card padding={16}><div style={{ height: 80, background: "var(--surface-2)" }}/></Card>
          </div>
        </div>

        {/* Modal */}
        <div style={{ position: "absolute", inset: 60, display: "grid", placeItems: "center", padding: 16 }}>
          <div style={{
            width: 720, background: "var(--surface)", border: "1px solid var(--line)",
            borderRadius: 16, boxShadow: "0 30px 80px -20px rgba(0,0,0,.25), var(--shadow-3)",
            overflow: "hidden",
          }}>
            {/* Header */}
            <div style={{ padding: "20px 24px", borderBottom: "1px solid var(--line)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 36, height: 36, borderRadius: 9, background: "var(--accent-soft)", border: "1px solid var(--accent-soft-2)", display: "grid", placeItems: "center", color: "var(--accent)" }}>
                  <Icon name="upload" size={17}/>
                </div>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 600, letterSpacing: "-0.01em" }}>Publish proposal</div>
                  <div style={{ fontSize: 12, color: "var(--ink-4)" }}>Lakeside Dental — Q3 Growth · Recommended · v2</div>
                </div>
              </div>
              <Icon name="x" size={16} color="var(--ink-4)"/>
            </div>

            <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 18 }}>
              {/* Live link */}
              <div>
                <div className="br-eyebrow" style={{ marginBottom: 6 }}>Live link</div>
                <div style={{ display: "flex", gap: 8, alignItems: "center", padding: "10px 12px", background: "var(--surface-2)", border: "1px solid var(--line)", borderRadius: 8 }}>
                  <Icon name="globe" size={14} color="var(--ink-4)"/>
                  <span className="br-mono" style={{ fontSize: 12.5, color: "var(--ink-2)", flex: 1 }}>compass.dn-agency.com/p/LSD-7F2A</span>
                  <Pill tone="ok" size="sm" icon="check">Password protected</Pill>
                  <Button variant="outline" size="sm">Copy</Button>
                </div>
              </div>

              {/* Recipients */}
              <Field label="Email to" hint="Cc'd to your team automatically">
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, padding: "6px 8px", background: "var(--surface)", border: "1px solid var(--line-strong)", borderRadius: 8, minHeight: 40, alignItems: "center" }}>
                  {["sarah.chen@lakesidedental.com", "dr.lin@lakesidedental.com"].map((e) => (
                    <span key={e} style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "3px 7px", background: "var(--accent-soft)", color: "var(--accent-ink)", border: "1px solid var(--accent-soft-2)", borderRadius: 6, fontSize: 12 }}>
                      {e} <Icon name="x" size={11} color="var(--accent-ink)"/>
                    </span>
                  ))}
                  <input placeholder="Add recipient…" style={{ flex: 1, border: "none", outline: "none", background: "transparent", minWidth: 120, fontFamily: "var(--font-sans)", fontSize: 13 }}/>
                </div>
              </Field>

              {/* Settings */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <PublishOption icon="lock"   title="Require sign-in"        sub="Magic link to recipient inbox"       on/>
                <PublishOption icon="alert"  title="Expire link in"         sub="14 days from today"                  on/>
                <PublishOption icon="sparkle" title="Read tracking"          sub="Notify when Sarah opens & scrolls"  on/>
                <PublishOption icon="file"   title="Attach signed PDF copy" sub="Sent alongside the live link"        on={false}/>
              </div>

              {/* Downstream */}
              <div style={{ padding: 14, background: "var(--surface-2)", border: "1px dashed var(--line-strong)", borderRadius: 10 }}>
                <div className="br-eyebrow" style={{ marginBottom: 8 }}>Compass will also</div>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {[
                    ["Dock",    "Update CRM record"],
                    ["Deck",    "Provision client portal"],
                    ["Radar",   "Queue baseline analytics"],
                    ["Beacon",  "Stage recall workflow (off)"],
                  ].map(([app, action]) => (
                    <span key={app} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 10px", background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 7, fontSize: 12 }}>
                      <span style={{ width: 6, height: 6, borderRadius: 999, background: "var(--accent)" }}/>
                      <strong style={{ fontWeight: 600 }}>{app}</strong>
                      <span style={{ color: "var(--ink-4)" }}>· {action}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div style={{ padding: "16px 24px", background: "var(--surface-2)", borderTop: "1px solid var(--line)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontSize: 12, color: "var(--ink-4)" }}>You can change any of this after sending.</span>
              <div style={{ display: "flex", gap: 8 }}>
                <Button variant="ghost" size="md">Cancel</Button>
                <Button variant="accent" size="md" iconRight="arrow_right">Publish & email</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PublishOption({ icon, title, sub, on }) {
  return (
    <div style={{ padding: 12, border: "1px solid var(--line)", borderRadius: 10, display: "flex", alignItems: "center", gap: 12, background: on ? "var(--surface)" : "var(--surface-2)" }}>
      <div style={{ width: 28, height: 28, borderRadius: 7, background: on ? "var(--accent-soft)" : "var(--surface-2)", color: on ? "var(--accent)" : "var(--ink-4)", border: `1px solid ${on ? "var(--accent-soft-2)" : "var(--line)"}`, display: "grid", placeItems: "center", flexShrink: 0 }}>
        <Icon name={icon} size={13}/>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 500 }}>{title}</div>
        <div style={{ fontSize: 11.5, color: "var(--ink-4)" }}>{sub}</div>
      </div>
      <Toggle on={on}/>
    </div>
  );
}

Object.assign(window, { CROI, CAssumptions, CClientCover, CClientStrategy, CPublishModal, ClientViewChrome, PaybackChart, PublishOption });
