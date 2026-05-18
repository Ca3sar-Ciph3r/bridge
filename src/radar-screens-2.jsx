/* global React, Icon, Button, Pill, Card, Field, Input, Toggle, AICallout,
   RadarWordmark, RadarTopBar, PlatformBadge, PLATFORMS, KpiCard, Sparkline, LineChart, HBar, Delta, MetricRow, Widget, ObsCard,
   CampaignRow, KeywordRow */
// Radar — screens part 2: Drill-down ladder, Insights inbox, Weekly report, Empty state

// ─────────────────────────────────────────────────────────────
// 04 — Drill-down ladder (Channel → Campaign → Ad → Creative)
// Shows a stacked breadcrumb + side-by-side panels at each level
// (user asked drilldown_depth = 2 — so we show 2 main levels but
// also peek the next, with disabled chevrons after that)
// ─────────────────────────────────────────────────────────────
function RDrilldown() {
  return (
    <div className="br-frame">
      <RadarTopBar active="channels"/>
      <div className="br-scroll" style={{ flex: 1, overflowY: "auto", padding: "20px 28px 28px" }}>
        {/* breadcrumb ladder */}
        <div style={{ marginBottom: 14 }}>
          <span className="br-mono" style={{ fontSize: 11, color: "var(--ink-5)" }}>DRILL-DOWN · CHANNEL → CAMPAIGN</span>
          <div style={{
            marginTop: 10, padding: 4, background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 10,
            display: "inline-flex", alignItems: "center", gap: 4, boxShadow: "var(--shadow-1)",
          }}>
            <DrillCrumb level="L0" label="All channels" active={false}/>
            <Icon name="chevron_right" size={12} color="var(--ink-5)"/>
            <DrillCrumb level="L1" label="Meta" active={false} platform="meta"/>
            <Icon name="chevron_right" size={12} color="var(--ink-5)"/>
            <DrillCrumb level="L2" label="Williston launch · Q2" active={true}/>
            <Icon name="chevron_right" size={12} color="var(--line-strong)"/>
            <DrillCrumb level="L3" label="Ad sets · 4" muted/>
            <Icon name="chevron_right" size={12} color="var(--line-strong)"/>
            <DrillCrumb level="L4" label="Creatives · 12" muted/>
          </div>
        </div>

        {/* Side-by-side: campaign summary + ad-set breakdown */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 14, marginBottom: 18 }}>
          {/* Left — campaign summary */}
          <Card padding={20}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <PlatformBadge kind="meta" size="md"/>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 16, fontWeight: 600, letterSpacing: "-0.01em" }}>Williston launch · Q2</div>
                <div className="br-mono" style={{ fontSize: 10.5, color: "var(--ink-5)" }}>CAMPAIGN · 1083471 · ACTIVE · LAUNCHED MAR 03</div>
              </div>
              <Pill tone="accent" size="sm">Top campaign</Pill>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
              {[
                ["Spend",         "$1,840", "−12%", "ok"],
                ["Impressions",   "152K",   "+18%", "ok"],
                ["Clicks",        "5,200",  "+24%", "ok"],
                ["CTR",           "3.42%",  "+5%",  "ok"],
                ["Conversions",   "34",     "+19%", "ok"],
                ["CPL",           "$54",    "−12%", "ok"],
              ].map(([k, v, d, t]) => (
                <div key={k} style={{ padding: 10, background: "var(--surface-2)", borderRadius: 7 }}>
                  <div className="br-eyebrow" style={{ fontSize: 9 }}>{k}</div>
                  <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginTop: 2 }}>
                    <span className="br-num" style={{ fontSize: 17, fontWeight: 600, letterSpacing: "-0.015em" }}>{v}</span>
                    <Delta value={d} tone={t}/>
                  </div>
                </div>
              ))}
            </div>

            {/* Spend pacing */}
            <div className="br-eyebrow" style={{ fontSize: 9.5, marginBottom: 6 }}>Daily pacing · last 14 days</div>
            <Sparkline data={[112,118,122,124,126,130,132,128,130,132,134,136,140,138]} stroke="#1877f2" height={48}/>

            {/* Targeting */}
            <div style={{ paddingTop: 12, marginTop: 12, borderTop: "1px solid var(--line)" }}>
              <div className="br-eyebrow" style={{ fontSize: 9.5, marginBottom: 6 }}>Targeting</div>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                <Pill tone="neutral" size="sm" icon="map">Williston · 5mi</Pill>
                <Pill tone="neutral" size="sm" icon="users">Age 28–54</Pill>
                <Pill tone="neutral" size="sm">Families</Pill>
                <Pill tone="neutral" size="sm">Interests · 12</Pill>
              </div>
            </div>

            <div style={{ paddingTop: 12, marginTop: 12, borderTop: "1px solid var(--line)", display: "flex", gap: 8 }}>
              <Button variant="outline" size="sm" iconRight="arrow_right">Open in Meta</Button>
              <Button variant="ghost" size="sm" icon="info">Why this campaign?</Button>
            </div>
          </Card>

          {/* Right — ad-set breakdown (L3 peek) */}
          <Card padding={0} style={{ overflow: "hidden" }}>
            <div style={{ padding: "14px 18px", borderBottom: "1px solid var(--line)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <span className="br-mono" style={{ fontSize: 10.5, color: "var(--ink-5)" }}>L3 · AD SETS · 4 ACTIVE</span>
                <div style={{ fontSize: 15, fontWeight: 600, marginTop: 4 }}>What's inside this campaign</div>
              </div>
              <Button variant="ghost" size="sm" iconRight="arrow_right">View all 4</Button>
            </div>
            {[
              { name: "Audience · Williston families",   spend: "$840", conv: 18, cpl: "$47", delta: "-14%", featured: true },
              { name: "Audience · Williston commuters",  spend: "$520", conv: 9,  cpl: "$58", delta: "-6%" },
              { name: "Lookalike · existing patients",   spend: "$320", conv: 5,  cpl: "$64", delta: "+2%" },
              { name: "Retargeting · website visitors",  spend: "$160", conv: 2,  cpl: "$80", delta: "+10%" },
            ].map((r, i) => (
              <div key={r.name} style={{
                padding: "14px 18px", borderTop: i > 0 ? "1px solid var(--line-faint)" : "none",
                display: "grid", gridTemplateColumns: "1.6fr 0.5fr 0.4fr 0.4fr 0.4fr auto",
                gap: 10, alignItems: "center",
                background: r.featured ? "linear-gradient(90deg, rgba(79,70,229,.04) 0%, transparent 100%)" : "transparent",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 0 }}>
                  <div style={{ width: 8, height: 8, borderRadius: 999, background: "var(--ok)", flexShrink: 0 }}/>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 500, letterSpacing: "-0.005em" }}>{r.name}</div>
                    <div className="br-mono" style={{ fontSize: 10, color: "var(--ink-5)", marginTop: 1 }}>3 creatives · ROAS 4.6×</div>
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div className="br-mono" style={{ fontSize: 9.5, color: "var(--ink-5)" }}>SPEND</div>
                  <div className="br-num" style={{ fontSize: 13, fontWeight: 600 }}>{r.spend}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div className="br-mono" style={{ fontSize: 9.5, color: "var(--ink-5)" }}>CONV.</div>
                  <div className="br-num" style={{ fontSize: 13, fontWeight: 600 }}>{r.conv}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div className="br-mono" style={{ fontSize: 9.5, color: "var(--ink-5)" }}>CPL</div>
                  <div className="br-num" style={{ fontSize: 13, fontWeight: 600 }}>{r.cpl}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <Delta value={r.delta}/>
                </div>
                <Icon name="chevron_right" size={14} color="var(--ink-4)"/>
              </div>
            ))}

            <div style={{ padding: "10px 18px", background: "var(--surface-2)", borderTop: "1px solid var(--line)", fontSize: 11.5, color: "var(--ink-4)", display: "flex", alignItems: "center", gap: 8 }}>
              <Icon name="info" size={12}/> Each ad set opens to its individual creatives, audiences, and placement-level performance — 6 metrics each. Click any row.
            </div>
          </Card>
        </div>

        {/* L4 preview: creatives (read-only carousel) */}
        <Card padding={20}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
            <div>
              <span className="br-mono" style={{ fontSize: 10.5, color: "var(--ink-5)" }}>L4 · CREATIVES · INSIDE AUDIENCE · WILLISTON FAMILIES</span>
              <div style={{ fontSize: 15, fontWeight: 600, marginTop: 4 }}>How each ad performed</div>
            </div>
            <Button variant="outline" size="sm" iconRight="arrow_right">View all 3</Button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
            {[
              { color: "#0c4a6e", label: "Gentle care · sq.", spend: "$420", conv: 11, ctr: "3.91%", cpl: "$38", best: true,
                title: "Gentle dentistry — now in Williston.", cta: "Book a visit →" },
              { color: "#fce7f3", inkColor: "#0c0a09", label: "Kids · vert.",  spend: "$280", conv: 5, ctr: "2.84%", cpl: "$56",
                title: "Kids who don't dread the dentist.", cta: "Book at Williston" },
              { color: "#d6d3d1", inkColor: "#0c0a09", label: "New location · sq.", spend: "$140", conv: 2, ctr: "1.92%", cpl: "$70",
                title: "Now open at Williston.", cta: "See the office →" },
            ].map((c) => (
              <div key={c.label} style={{
                padding: 12, border: c.best ? "1.5px solid var(--accent)" : "1px solid var(--line)",
                borderRadius: 12, background: "var(--surface)",
                boxShadow: c.best ? "0 0 0 3px rgba(79,70,229,.08), var(--shadow-1)" : "var(--shadow-1)",
                display: "flex", flexDirection: "column", gap: 10,
              }}>
                {/* mini ad preview */}
                <div style={{
                  aspectRatio: "1/1", borderRadius: 8, background: c.color, color: c.inkColor || "#fff",
                  padding: 14, display: "flex", flexDirection: "column", justifyContent: "space-between",
                }}>
                  <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: ".06em", opacity: .7 }}>SPONSORED</div>
                  <div>
                    <div style={{ fontSize: 18, fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.02em" }}>{c.title}</div>
                    <div style={{ marginTop: 10, padding: "5px 10px", background: c.inkColor === "#0c0a09" ? "#0c0a09" : "#fff", color: c.inkColor === "#0c0a09" ? "#fff" : c.color, borderRadius: 4, fontSize: 10.5, fontWeight: 600, display: "inline-block" }}>{c.cta}</div>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "4px 2px" }}>
                  <span style={{ fontSize: 12.5, fontWeight: 600 }}>{c.label}</span>
                  {c.best && <Pill tone="accent" size="sm">Best</Pill>}
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 4 }}>
                  {[
                    ["SPEND", c.spend],
                    ["CONV.", c.conv],
                    ["CTR",   c.ctr],
                    ["CPL",   c.cpl],
                  ].map(([k, v]) => (
                    <div key={k}>
                      <div className="br-mono" style={{ fontSize: 9, color: "var(--ink-5)" }}>{k}</div>
                      <div className="br-num" style={{ fontSize: 12, fontWeight: 600 }}>{v}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

function DrillCrumb({ level, label, active, muted, platform }) {
  return (
    <span style={{
      padding: "6px 10px", borderRadius: 6, fontSize: 12, display: "inline-flex", alignItems: "center", gap: 6,
      background: active ? "var(--ink)" : "transparent",
      color: muted ? "var(--ink-5)" : active ? "#fff" : "var(--ink-2)",
      fontWeight: active ? 600 : 500,
    }}>
      <span className="br-mono" style={{ fontSize: 9, opacity: .6 }}>{level}</span>
      {platform && <PlatformBadge kind={platform} size="sm"/>}
      <span>{label}</span>
    </span>
  );
}

// ─────────────────────────────────────────────────────────────
// 05 — Anomaly + Insights inbox
// ─────────────────────────────────────────────────────────────
function RInsights() {
  return (
    <div className="br-frame">
      <RadarTopBar active="insights"/>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 0, flex: 1, minHeight: 0 }}>
        <div className="br-scroll" style={{ overflowY: "auto", padding: "20px 24px 28px 28px" }}>
          <div style={{ marginBottom: 16, display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
            <div>
              <Pill tone="warn" size="sm" icon="alert">2 active anomalies · 8 observations</Pill>
              <h1 className="br-h1" style={{ fontSize: 24, marginTop: 8, marginBottom: 4 }}>What changed, in plain words.</h1>
              <p className="br-body" style={{ margin: 0 }}>Descriptive only. Radar flags what's moved — your strategist decides what to do about it.</p>
            </div>
            <div style={{ display: "flex", gap: 6 }}>
              <Button variant="outline" size="sm" icon="sliders">Filter</Button>
              <Button variant="ghost" size="sm" icon="info">How this works</Button>
            </div>
          </div>

          {/* Active anomalies — emphasized */}
          <div style={{ marginBottom: 22 }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 10 }}>
              <span className="br-mono" style={{ fontSize: 10.5, color: "var(--err)", letterSpacing: ".06em", fontWeight: 600 }}>ACTIVE ANOMALIES · 2</span>
              <div style={{ flex: 1, height: 1, background: "var(--line)" }}/>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <AnomalyCard
                tone="err"
                platform="google"
                title="Google CPL has climbed three days in a row."
                window="May 12 → May 15 · 3 days"
                metric={{ label: "Google CPL", was: "$74", now: "$89", delta: "+20%", spark: [74,78,82,85,87,89] }}
                contributing={[
                  ["CPC moved up across all keyword groups (+18%)", "google"],
                  ["Conversion volume held flat at ~1.2 / day",     "google"],
                  ["No copy or audience changes were made",          "ga4"],
                ]}
                time="5h ago"
              />
              <AnomalyCard
                tone="warn"
                platform="tiktok"
                title="TikTok CTR fell below 2% for the first time."
                window="May 13 → May 15"
                metric={{ label: "TikTok CTR", was: "2.42%", now: "1.58%", delta: "-9%", spark: [2.42,2.30,2.18,1.92,1.74,1.58] }}
                contributing={[
                  ["Single creative running for 19 days — fatigue suggested by the curve", "tiktok"],
                  ["Engagement rate held steady at 4.2%",                                   "tiktok"],
                ]}
                time="3d ago"
              />
            </div>
          </div>

          {/* Observations — calm */}
          <div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 10 }}>
              <span className="br-mono" style={{ fontSize: 10.5, color: "var(--ink-5)", letterSpacing: ".06em", fontWeight: 600 }}>OBSERVATIONS · LAST 14 DAYS</span>
              <div style={{ flex: 1, height: 1, background: "var(--line)" }}/>
              <span className="br-mono" style={{ fontSize: 10.5, color: "var(--ink-5)" }}>6 ITEMS</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <ObsCard tone="ok" icon="users"
                headline="You got 18% more visitors this week than last."
                detail="9,420 sessions vs. 7,980 in the previous 7 days. Most of the lift came from organic search."
                metric={{ label: "Sessions", value: "9,420", delta: "+18%" }}
                time="2h ago"/>
              <ObsCard tone="ok" icon="star"
                headline="Conversions peaked on Tuesday."
                detail="May 13 brought in 15 booked leads — your best day in the engagement so far. Williston-zone Meta traffic carried it."
                metric={{ label: "Leads · Tue", value: "15", delta: "+88%" }}
                time="2d ago"/>
              <ObsCard tone="ok" icon="map"
                headline="Williston GBP direction requests crossed 300 for the first time."
                detail="312 direction requests in the last 30 days. Williston specifically grew +28% since last month."
                metric={{ label: "Direction req.", value: "312", delta: "+42%" }}
                time="2d ago"/>
              <ObsCard tone="ok" icon="mail"
                headline="The recall workflow re-booked 87 patients."
                detail="87 patients responded to the May recall sequence — captures roughly $243K in latent revenue from your existing book."
                metric={{ label: "Re-booked", value: "87" }}
                time="3d ago"/>
              <ObsCard tone="neutral" icon="bolt"
                headline="Ad spend exceeded budget by 5% this month."
                detail="$8,960 spent vs. $8,500 budgeted across Meta + Google. Driven by Google CPC inflation, not added campaigns."
                metric={{ label: "Spend", value: "$8.96K", delta: "+5%" }}
                time="1w ago"/>
              <ObsCard tone="ok" icon="search"
                headline="Burlington rank held; Williston jumped 4 spots."
                detail="In the local pack for 'family dentist Williston', you moved from position 7 to position 3. Burlington and S. Burlington were unchanged."
                metric={{ label: "GBP rank · Williston", value: "#3", delta: "+4" }}
                time="1w ago"/>
            </div>
          </div>
        </div>

        {/* Right rail — filters + how it works */}
        <aside style={{ borderLeft: "1px solid var(--line)", background: "var(--bg)", padding: "20px 22px 22px", display: "flex", flexDirection: "column", gap: 18 }}>
          <div>
            <div className="br-eyebrow" style={{ marginBottom: 10 }}>By platform</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {["meta","google","tiktok","ga4","gbp","email"].map((k) => (
                <PlatformBadge key={k} kind={k} size="sm"/>
              ))}
            </div>
          </div>

          <div>
            <div className="br-eyebrow" style={{ marginBottom: 10 }}>By severity</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {[
                ["Anomaly · large move", "var(--err)", 2],
                ["Anomaly · early signal", "var(--warn)", 0],
                ["Observation",            "var(--ok)",  6],
                ["Informational",          "var(--ink-4)", 4],
              ].map(([l, c, n]) => (
                <div key={l} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 8px", border: "1px solid var(--line)", borderRadius: 7, background: "var(--surface)" }}>
                  <span style={{ width: 8, height: 8, borderRadius: 999, background: c }}/>
                  <span style={{ fontSize: 12.5, flex: 1 }}>{l}</span>
                  <span className="br-mono br-num" style={{ fontSize: 10.5, color: "var(--ink-5)" }}>{n}</span>
                </div>
              ))}
            </div>
          </div>

          <Card padding={14} style={{ background: "var(--bg)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
              <Icon name="info" size={13} color="var(--ink-3)"/>
              <span style={{ fontSize: 12.5, fontWeight: 600 }}>How Radar detects anomalies</span>
            </div>
            <div style={{ fontSize: 11.5, color: "var(--ink-3)", lineHeight: 1.55 }}>
              Each metric is compared against a 30-day rolling baseline. A change is flagged if it moves more than 2σ from baseline for at least 2 consecutive observation windows. Detection is descriptive — Radar never recommends what to do.
            </div>
          </Card>

          <div style={{ marginTop: "auto", fontSize: 10.5, color: "var(--ink-5)" }}>
            Strategic suggestions for any anomaly live in <span style={{ color: "var(--ink-3)", fontWeight: 500 }}>Compass</span>, not Radar.
          </div>
        </aside>
      </div>
    </div>
  );
}

function AnomalyCard({ tone = "err", platform, title, window: win, metric, contributing, time }) {
  const tones = {
    err:  { bd: "#fecaca", bg: "var(--err-soft)", fg: "var(--err)" },
    warn: { bd: "#fcd34d", bg: "var(--warn-soft)", fg: "var(--warn)" },
  };
  const t = tones[tone];
  return (
    <div style={{ padding: 18, borderRadius: 12, border: `1px solid ${t.bd}`, background: t.bg, display: "grid", gridTemplateColumns: "1fr auto", gap: 16 }}>
      <div style={{ minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
          <PlatformBadge kind={platform} size="sm"/>
          <Pill tone={tone === "err" ? "err" : "warn"} size="sm" icon="alert">Anomaly</Pill>
          <span className="br-mono" style={{ fontSize: 10.5, color: "var(--ink-5)" }}>{win}</span>
          <div style={{ flex: 1 }}/>
          <span className="br-mono" style={{ fontSize: 10.5, color: "var(--ink-5)" }}>{time}</span>
        </div>
        <div style={{ fontSize: 16, fontWeight: 600, letterSpacing: "-0.01em", marginBottom: 4 }}>{title}</div>
        <div style={{ fontSize: 12.5, color: "var(--ink-4)", marginBottom: 12 }}>
          Detection: change exceeded the 30-day rolling baseline by 2σ for 3 consecutive 24-hour windows.
        </div>

        {/* Contributing factors */}
        <div className="br-eyebrow" style={{ fontSize: 9.5, marginBottom: 6 }}>Directly observable contributing factors</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {contributing.map(([fact, plat]) => (
            <div key={fact} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 10px", background: "#fff", border: "1px solid var(--line)", borderRadius: 7 }}>
              <PlatformBadge kind={plat} size="sm"/>
              <span style={{ fontSize: 12.5, color: "var(--ink-2)" }}>{fact}</span>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
          <Button variant="outline" size="sm" iconRight="arrow_right">Drill into {PLATFORMS[platform].label}</Button>
          <Button variant="ghost" size="sm" icon="check">Mark seen</Button>
        </div>
      </div>

      {/* Right — metric */}
      <div style={{ minWidth: 200, padding: 14, background: "#fff", border: `1px solid ${t.bd}`, borderRadius: 10 }}>
        <div className="br-eyebrow" style={{ fontSize: 9.5 }}>{metric.label}</div>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginTop: 4 }}>
          <div>
            <span style={{ fontSize: 12, color: "var(--ink-5)", textDecoration: "line-through" }}>{metric.was}</span>
            <div className="br-num" style={{ fontSize: 26, fontWeight: 600, letterSpacing: "-0.025em", lineHeight: 1.05, color: t.fg }}>{metric.now}</div>
          </div>
          <Delta value={metric.delta} tone={tone}/>
        </div>
        <div style={{ marginTop: 8 }}>
          <Sparkline data={metric.spark} stroke={t.fg} height={36}/>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 06 — Reporting module (weekly snapshot)
// ─────────────────────────────────────────────────────────────
function RReport() {
  return (
    <div className="br-frame">
      <RadarTopBar active="report"/>
      <div className="br-scroll" style={{ flex: 1, overflowY: "auto" }}>
        {/* Header band */}
        <div style={{ padding: "32px 32px 24px", background: "linear-gradient(180deg, var(--surface-2) 0%, var(--bg) 100%)", borderBottom: "1px solid var(--line)" }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 20 }}>
            <div>
              <Pill tone="accent" size="sm" icon="file">Auto-generated · weekly snapshot</Pill>
              <h1 className="br-h1" style={{ fontSize: 30, marginTop: 12, marginBottom: 6, letterSpacing: "-0.025em" }}>
                Lakeside · Week 18 report.<br/>
                <span style={{ color: "var(--ink-4)" }}>May 09 → May 15, 2026.</span>
              </h1>
              <p className="br-bodyLg" style={{ margin: 0, maxWidth: 720 }}>
                Descriptive performance read. No recommendations — strategic next steps live in Compass.
              </p>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <Button variant="outline" size="sm" icon="mail">Email to team</Button>
              <Button variant="ghost" size="sm" icon="file">Download PDF</Button>
            </div>
          </div>
        </div>

        <div style={{ padding: "28px 32px 36px", maxWidth: 1080 }}>
          {/* KPI summary */}
          <SectionRule label="01 · KPI summary"/>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 24 }}>
            <KpiCard label="New patient leads"   value="42"     sub="vs. 36 last wk"   delta="+17%" tone="ok"  spark={[5,6,4,5,7,6,9]}/>
            <KpiCard label="Ad spend · week"      value="$2,140" sub="vs. $2,020"       delta="+6%"  tone="warn" spark={[300,290,310,300,320,310,310]}/>
            <KpiCard label="Blended ROAS"        value="3.9×"   sub="target 4.2×"      delta="-3%"  tone="warn" spark={[4.0,4.1,3.9,3.8,3.9,3.9]}/>
            <KpiCard label="Website sessions"    value="2,180"  sub="vs. 1,850"        delta="+18%" tone="ok"  spark={[260,270,310,290,340,320,350]}/>
          </div>

          {/* Top channel + worst */}
          <SectionRule label="02 · Best & worst channel"/>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 24 }}>
            <Card padding={20} style={{ borderColor: "#a7f3d0", background: "linear-gradient(180deg, var(--ok-soft) 0%, var(--surface) 70%)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                <PlatformBadge kind="meta" size="md"/>
                <Pill tone="ok" size="sm" icon="star">Top performer · this week</Pill>
              </div>
              <h3 className="br-h3" style={{ fontSize: 18, marginTop: 6, marginBottom: 6, letterSpacing: "-0.015em" }}>Meta drove 62% of paid leads at $55 CPL.</h3>
              <p style={{ margin: 0, fontSize: 13, color: "var(--ink-3)", lineHeight: 1.55 }}>
                The "gentle care · square" creative did the heavy lifting — 11 leads at $38 CPL, your most efficient ad of the engagement.
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginTop: 14, paddingTop: 14, borderTop: "1px solid var(--line)" }}>
                {[["Leads", "26"], ["CPL", "$55"], ["CTR", "3.42%"]].map(([k, v]) => (
                  <div key={k}>
                    <div className="br-eyebrow" style={{ fontSize: 9.5 }}>{k}</div>
                    <div className="br-num" style={{ fontSize: 18, fontWeight: 600 }}>{v}</div>
                  </div>
                ))}
              </div>
            </Card>

            <Card padding={20} style={{ borderColor: "#fcd34d", background: "linear-gradient(180deg, var(--warn-soft) 0%, var(--surface) 70%)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                <PlatformBadge kind="tiktok" size="md"/>
                <Pill tone="warn" size="sm" icon="alert">Underperforming · this week</Pill>
              </div>
              <h3 className="br-h3" style={{ fontSize: 18, marginTop: 6, marginBottom: 6, letterSpacing: "-0.015em" }}>TikTok CTR dropped below 2% for the first time.</h3>
              <p style={{ margin: 0, fontSize: 13, color: "var(--ink-3)", lineHeight: 1.55 }}>
                One creative ran for 19 days. Engagement held but click-through softened — typical creative fatigue pattern.
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginTop: 14, paddingTop: 14, borderTop: "1px solid var(--line)" }}>
                {[["Leads", "1"], ["CPL", "$152"], ["CTR", "1.58%"]].map(([k, v]) => (
                  <div key={k}>
                    <div className="br-eyebrow" style={{ fontSize: 9.5 }}>{k}</div>
                    <div className="br-num" style={{ fontSize: 18, fontWeight: 600 }}>{v}</div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Key anomalies */}
          <SectionRule label="03 · Key anomalies"/>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 24 }}>
            <AnomalyMini platform="google" delta="+20%" tone="err"
              title="Google CPL climbed for 3 days in a row"
              detail="$74 → $89. CPC inflation, not volume loss."/>
            <AnomalyMini platform="tiktok" delta="-9%" tone="warn"
              title="TikTok CTR moved below 2% for the first time"
              detail="Single creative running 19 days · fatigue signature."/>
            <AnomalyMini platform="ga4" delta="+18%" tone="ok"
              title="Website sessions up sharply"
              detail="Organic search lift, no campaign changes."/>
            <AnomalyMini platform="gbp" delta="+42%" tone="ok"
              title="Williston direction requests crossed 300"
              detail="Burlington and S. Burlington unchanged."/>
          </div>

          {/* Channel grid */}
          <SectionRule label="04 · Channel grid"/>
          <Card padding={0} style={{ overflow: "hidden", marginBottom: 24 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.5fr 0.5fr 0.5fr 0.5fr 0.5fr 0.5fr", padding: "10px 18px", background: "var(--surface-2)", fontSize: 10, color: "var(--ink-5)", fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: ".06em", fontWeight: 600, gap: 8 }}>
              <span>Channel</span><span style={{ textAlign: "right" }}>Spend</span><span style={{ textAlign: "right" }}>Impr.</span><span style={{ textAlign: "right" }}>CTR</span><span style={{ textAlign: "right" }}>Conv.</span><span style={{ textAlign: "right" }}>CPL</span><span style={{ textAlign: "right" }}>WoW</span>
            </div>
            {[
              ["meta",    "$840",  "62K", "3.42%", "26", "$55",  "+12%", "ok"],
              ["google",  "$680",  "28K", "4.41%", "12", "$89",  "+20%", "err"],
              ["tiktok",  "$200",  "42K", "1.58%", "1",  "$152", "-9%",  "warn"],
              ["ga4",     "—",     "2,180","2.84%", "8",  "—",    "+18%", "ok"],
              ["gbp",     "—",     "320 calls","12.9%","4","—",  "+42%", "ok"],
              ["email",   "—",     "420 sent","23.3%","2", "—",   "live", "ok"],
            ].map((r, i) => (
              <div key={r[0]} style={{ display: "grid", gridTemplateColumns: "1.2fr 0.5fr 0.5fr 0.5fr 0.5fr 0.5fr 0.5fr", padding: "12px 18px", gap: 8, alignItems: "center", borderTop: i > 0 ? "1px solid var(--line-faint)" : "none" }}>
                <PlatformBadge kind={r[0]} size="md"/>
                <span className="br-mono br-num" style={{ fontSize: 12, textAlign: "right" }}>{r[1]}</span>
                <span className="br-mono br-num" style={{ fontSize: 12, textAlign: "right", color: "var(--ink-3)" }}>{r[2]}</span>
                <span className="br-mono br-num" style={{ fontSize: 12, textAlign: "right", fontWeight: 600 }}>{r[3]}</span>
                <span className="br-num" style={{ fontSize: 12, textAlign: "right", fontWeight: 600 }}>{r[4]}</span>
                <span className="br-num" style={{ fontSize: 12, textAlign: "right", fontWeight: 600 }}>{r[5]}</span>
                <div style={{ textAlign: "right" }}>{r[6] === "live" ? <Pill tone="ok" size="sm">Live</Pill> : <Delta value={r[6]} tone={r[7]}/>}</div>
              </div>
            ))}
          </Card>

          {/* Footer */}
          <div style={{ padding: 16, background: "var(--surface-2)", borderRadius: 10, fontSize: 12, color: "var(--ink-4)", display: "flex", alignItems: "center", gap: 10 }}>
            <Icon name="info" size={14}/> Auto-generated by Radar every Monday 7am · Data sources: Meta Ads, Google Ads, GA4, TikTok Ads, Google Business Profile, Beacon · 8 connected platforms · Snapshot ID R-2026W18-LSD
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionRule({ label }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
      <span className="br-mono" style={{ fontSize: 11, color: "var(--ink-5)", letterSpacing: ".06em", fontWeight: 600 }}>{label}</span>
      <div style={{ flex: 1, height: 1, background: "var(--line)" }}/>
    </div>
  );
}

function AnomalyMini({ platform, tone, delta, title, detail }) {
  const tones = { err: { bg: "var(--err-soft)", bd: "#fecaca", fg: "var(--err)" }, warn: { bg: "var(--warn-soft)", bd: "#fcd34d", fg: "var(--warn)" }, ok: { bg: "var(--ok-soft)", bd: "#a7f3d0", fg: "var(--ok)" } };
  const t = tones[tone];
  return (
    <div style={{ display: "grid", gridTemplateColumns: "auto 1fr auto auto", gap: 14, padding: "12px 14px", background: t.bg, border: `1px solid ${t.bd}`, borderRadius: 10, alignItems: "center" }}>
      <PlatformBadge kind={platform} size="md"/>
      <div>
        <div style={{ fontSize: 13.5, fontWeight: 600, letterSpacing: "-0.005em" }}>{title}</div>
        <div style={{ fontSize: 12, color: "var(--ink-3)", marginTop: 2 }}>{detail}</div>
      </div>
      <Delta value={delta} tone={tone}/>
      <Icon name="chevron_right" size={14} color="var(--ink-4)"/>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 07 — Empty / connecting platforms state
// ─────────────────────────────────────────────────────────────
function REmpty() {
  return (
    <div className="br-frame">
      <RadarTopBar active="overview"/>
      <div className="br-scroll" style={{ flex: 1, overflowY: "auto", padding: "28px 28px 36px" }}>
        <div style={{ marginBottom: 22 }}>
          <Pill tone="neutral" size="sm">First-time setup</Pill>
          <h1 className="br-h1" style={{ fontSize: 28, marginTop: 10, marginBottom: 4 }}>Almost ready. Connect your sources.</h1>
          <p className="br-body" style={{ margin: 0 }}>
            Bridge already collected access tokens for most platforms — just confirm the connections. Radar will start populating in under a minute.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 14 }}>
          {/* Connections list */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { k: "meta",    note: "Bridge-provisioned via Meta Business Mgr", state: "connected" },
              { k: "google",  note: "Bridge-provisioned · Google Ads + GBP",    state: "connected" },
              { k: "ga4",     note: "GA4 property linked via Bridge",            state: "connected" },
              { k: "gbp",     note: "All 3 locations · GBP API",                 state: "connected" },
              { k: "email",   note: "Beacon-managed workflow data feed",         state: "connected" },
              { k: "tiktok",  note: "Pixel + Ads account · pilot scope",         state: "awaiting", action: "Confirm" },
              { k: "organic", note: "FB + IG native insights · OAuth pending",   state: "awaiting", action: "Authorize" },
              { k: "linkedin",note: "Out of scope this quarter",                 state: "skipped",  action: "Connect anyway" },
            ].map((row) => (
              <div key={row.k} style={{
                padding: "14px 16px", border: "1px solid var(--line)", borderRadius: 10, background: "var(--surface)",
                display: "grid", gridTemplateColumns: "auto 1fr auto auto", gap: 12, alignItems: "center",
                opacity: row.state === "skipped" ? .65 : 1,
                boxShadow: "var(--shadow-1)",
              }}>
                <PlatformBadge kind={row.k} size="md"/>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 500 }}>{PLATFORMS[row.k].display}</div>
                  <div className="br-mono" style={{ fontSize: 10.5, color: "var(--ink-5)" }}>{row.note}</div>
                </div>
                {row.state === "connected" && (
                  <>
                    <Pill tone="ok" size="sm" icon="check">Connected · syncing</Pill>
                    <span className="br-mono" style={{ fontSize: 10.5, color: "var(--ok)" }}>62%</span>
                  </>
                )}
                {row.state === "awaiting" && (
                  <>
                    <Pill tone="warn" size="sm" icon="alert">Awaiting OAuth</Pill>
                    <Button variant="primary" size="sm" iconRight="arrow_right">{row.action}</Button>
                  </>
                )}
                {row.state === "skipped" && (
                  <>
                    <Pill tone="neutral" size="sm">Not in scope</Pill>
                    <Button variant="ghost" size="sm">{row.action}</Button>
                  </>
                )}
              </div>
            ))}
          </div>

          {/* Right rail — progress + what's next */}
          <aside style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <Card padding={20}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <div style={{ position: "relative", width: 56, height: 56 }}>
                  <svg viewBox="0 0 36 36" style={{ width: "100%", height: "100%", transform: "rotate(-90deg)" }}>
                    <circle cx="18" cy="18" r="15.9" fill="none" stroke="var(--surface-3)" strokeWidth="3"/>
                    <circle cx="18" cy="18" r="15.9" fill="none" stroke="var(--accent)" strokeWidth="3" strokeDasharray="62 100" strokeLinecap="round"/>
                  </svg>
                  <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", fontSize: 13, fontWeight: 700, fontVariantNumeric: "tabular-nums" }}>5/8</div>
                </div>
                <div>
                  <div style={{ fontSize: 13.5, fontWeight: 600 }}>Connections live</div>
                  <div style={{ fontSize: 11.5, color: "var(--ink-4)" }}>2 awaiting, 1 skipped</div>
                </div>
              </div>
              <Button variant="primary" size="md" full iconRight="arrow_right">Continue setup</Button>
            </Card>

            <Card padding={18}>
              <div className="br-eyebrow" style={{ marginBottom: 8 }}>What you'll see when this is done</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {[
                  ["target",   "7 KPI cards · executive view"],
                  ["layers",   "Channel-by-channel breakdown"],
                  ["globe",    "Hootsuite-style platform widgets"],
                  ["sparkle",  "Plain-language observations"],
                  ["alert",    "Automatic anomaly detection"],
                  ["file",     "Auto-generated weekly reports"],
                ].map(([i, l]) => (
                  <div key={l} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <Icon name={i} size={14} color="var(--ink-3)"/>
                    <span style={{ fontSize: 12.5, color: "var(--ink-2)" }}>{l}</span>
                  </div>
                ))}
              </div>
            </Card>

            <div style={{ padding: 14, background: "linear-gradient(180deg, #faf8ff 0%, var(--bg) 100%)", border: "1px solid #e9e3ff", borderRadius: 10, fontSize: 12, color: "var(--ink-2)", lineHeight: 1.55 }}>
              <span className="br-mono" style={{ fontSize: 10, color: "var(--ai)", fontWeight: 600, letterSpacing: ".06em", display: "block", marginBottom: 4 }}>FROM BRIDGE · A NOTE</span>
              Most of your tokens were captured during onboarding. The two awaiting connections were not part of the initial Compass scope, but enabling them now adds them to next week's report at no extra cost.
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { RDrilldown, RInsights, RReport, REmpty, DrillCrumb, AnomalyCard, SectionRule, AnomalyMini });
