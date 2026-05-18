/* global React, Icon, Button, Pill, Card, Field, Input, Toggle, AICallout,
   RadarWordmark, RadarTopBar, PlatformBadge, PLATFORMS, KpiCard, Sparkline, LineChart, HBar, Delta, MetricRow, Widget, ObsCard */
// Radar — screens part 1: Main dashboard, Platform widget grid, Channel deep-dive

// ─────────────────────────────────────────────────────────────
// Realistic data — month 4, paid humming, recall live.
// Aligned with Compass projection: CPL ~$76, +140 patients/mo, $3.6M run-rate.
// ─────────────────────────────────────────────────────────────
const TREND_LEADS_30 = [3, 4, 4, 5, 4, 6, 5, 6, 7, 6, 7, 8, 6, 7, 8, 9, 8, 9, 10, 8, 9, 11, 10, 12, 11, 13, 12, 14, 13, 15];
const TREND_LEADS_PREV = [2, 3, 3, 3, 4, 4, 3, 4, 5, 4, 5, 5, 4, 6, 5, 5, 6, 6, 6, 7, 6, 6, 7, 7, 8, 7, 8, 7, 9, 8];
const TREND_LABELS_30 = ["Apr 16","Apr 17","Apr 18","Apr 19","Apr 20","Apr 21","Apr 22","Apr 23","Apr 24","Apr 25","Apr 26","Apr 27","Apr 28","Apr 29","Apr 30","May 1","May 2","May 3","May 4","May 5","May 6","May 7","May 8","May 9","May 10","May 11","May 12","May 13","May 14","May 15"];

// ─────────────────────────────────────────────────────────────
// 01 — Main Dashboard (KPIs + trends + channel mix + insights)
// ─────────────────────────────────────────────────────────────
function ROverview() {
  return (
    <div className="br-frame">
      <RadarTopBar active="overview"/>
      <div className="br-scroll" style={{ flex: 1, overflowY: "auto", padding: "20px 28px 28px" }}>
        {/* Hero */}
        <div style={{ marginBottom: 18, display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
          <div>
            <span className="br-mono" style={{ fontSize: 11, color: "var(--ink-5)" }}>MONTH 4 · APR 16 → MAY 15</span>
            <h1 className="br-h1" style={{ fontSize: 26, marginTop: 6, marginBottom: 4, letterSpacing: "-0.02em" }}>
              How Lakeside performed across <span style={{ color: "var(--ink-4)" }}>every platform</span>.
            </h1>
            <p className="br-body" style={{ margin: 0 }}>
              All channels in one view. Drill into any number to see how it was built.
            </p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            {Object.keys(PLATFORMS).map((k, i) => (
              <div key={k} style={{ opacity: i < 6 ? 1 : .35 }}><PlatformBadge kind={k} size="sm"/></div>
            ))}
            <Button variant="outline" size="sm" icon="sliders">Filter</Button>
          </div>
        </div>

        {/* KPI row — 7 dense cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 10, marginBottom: 18 }}>
          <KpiCard
            label="New patient leads"
            value="138"
            sub="vs. 96 prev. 30d"
            delta="+44%"
            deltaLabel="VS PREV"
            tone="ok"
            spark={TREND_LEADS_30}
            featured
          />
          <KpiCard label="First-visit bookings" value="112" sub="81% lead conv." delta="+38%" tone="ok" spark={[4,5,4,6,5,7,6,7,8,7,8,9,8,9,10,11,10,12,11,13]}/>
          <KpiCard label="Revenue · est."     value="$312K" sub="@ $2.8K avg." delta="+34%" tone="ok" spark={[8,9,10,11,12,14,16,18,21,24,28,31]}/>
          <KpiCard label="Ad spend"           value="$8.96K" sub="vs. $8.5K budget" delta="+5%" tone="warn" spark={[280,290,300,295,310,305]}/>
          <KpiCard label="Blended ROAS"       value="3.9×"  sub="target 4.2×" delta="-7%" tone="warn" spark={[3.4,3.5,3.7,3.9,3.8,3.9]}/>
          <KpiCard label="Website sessions"   value="9,420" sub="+62% organic" delta="+28%" tone="ok" spark={[180,195,220,240,260,290,320,310]}/>
          <KpiCard label="Conv. rate · site"  value="2.84%" sub="from 1.96%"  delta="+45%" tone="ok" spark={[1.9,2.0,2.2,2.3,2.5,2.7,2.8]}/>
        </div>

        {/* Trend + channel mix */}
        <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 14, marginBottom: 18 }}>
          <Card padding={20}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
              <div>
                <div className="br-eyebrow">Trend · last 30 days</div>
                <div style={{ fontSize: 16, fontWeight: 600, marginTop: 4, letterSpacing: "-0.005em" }}>New patient leads</div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                {/* metric switcher */}
                <div style={{ display: "inline-flex", background: "var(--surface-2)", borderRadius: 6, padding: 2, border: "1px solid var(--line)" }}>
                  {[["Leads", true], ["Spend", false], ["Sessions", false], ["Conv.", false]].map(([l, a]) => (
                    <span key={l} style={{ padding: "4px 10px", borderRadius: 4, fontSize: 11.5, fontWeight: 500, background: a ? "#fff" : "transparent", color: a ? "var(--ink)" : "var(--ink-4)", cursor: "pointer", boxShadow: a ? "var(--shadow-1)" : "none" }}>{l}</span>
                  ))}
                </div>
                {/* Compare toggle */}
                <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 11.5 }}>
                  <Toggle on size="sm"/>
                  <span style={{ color: "var(--ink-3)" }}>Compare prev. 30d</span>
                </span>
              </div>
            </div>
            <LineChart
              labels={TREND_LABELS_30}
              series={[{ name: "Leads", color: "#4f46e5", data: TREND_LEADS_30 }]}
              compareSeries={[{ name: "Prev.", color: "var(--ink-5)", data: TREND_LEADS_PREV }]}
              yFormat={(v) => Math.round(v)}
              height={240}
            />
            <div style={{ display: "flex", gap: 14, paddingTop: 10, marginTop: 6, borderTop: "1px solid var(--line)" }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 11.5 }}>
                <span style={{ width: 10, height: 2.5, background: "#4f46e5", borderRadius: 2 }}/> This 30d · <strong className="br-num">138</strong>
              </span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 11.5, color: "var(--ink-4)" }}>
                <span style={{ width: 10, height: 2, background: "var(--ink-5)", borderRadius: 1, opacity: .6, borderBottom: "1px dashed transparent" }}/> Prev. 30d · <strong className="br-num">96</strong>
              </span>
              <div style={{ flex: 1 }}/>
              <Delta value="+44%"/>
              <span className="br-mono" style={{ fontSize: 11, color: "var(--ink-5)" }}>+42 LEADS</span>
            </div>
          </Card>

          <Card padding={20}>
            <div className="br-eyebrow" style={{ marginBottom: 4 }}>Channel mix · leads</div>
            <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 12, letterSpacing: "-0.005em" }}>Where they came from</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                ["meta",    "Meta · FB + IG",  62, 138, "$3.4K", "+18%"],
                ["google",  "Google Ads",      34, 138, "$2.9K", "+24%"],
                ["ga4",     "Website · organic", 22, 138, "—",   "+62%"],
                ["gbp",     "Local · GBP",     12, 138, "—",     "+42%"],
                ["tiktok",  "TikTok · pilot",   5, 138, "$0.8K", "new"],
                ["email",   "Recall · email",   3, 138, "—",     "live"],
              ].map(([k, label, v, max, spend, delta]) => (
                <div key={k} style={{ display: "grid", gridTemplateColumns: "auto 1fr auto", gap: 10, alignItems: "center" }}>
                  <PlatformBadge kind={k} size="sm"/>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <span style={{ fontSize: 12, color: "var(--ink-2)" }}>{label}</span>
                      <span className="br-mono br-num" style={{ fontSize: 11, color: "var(--ink-3)", fontWeight: 600 }}>{v}</span>
                    </div>
                    <HBar value={v} max={max} color={PLATFORMS[k].bg}/>
                  </div>
                  <div style={{ minWidth: 56, textAlign: "right" }}>
                    <span className="br-mono" style={{ fontSize: 10, color: "var(--ink-5)" }}>{spend}</span>
                    <div><Delta value={delta === "new" || delta === "live" ? "+0" : delta} tone={delta === "new" ? "neutral" : "ok"}/></div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Channel performance summary table + Insights inbox */}
        <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 14 }}>
          <Card padding={0} style={{ overflow: "hidden" }}>
            <div style={{ padding: "14px 18px", borderBottom: "1px solid var(--line)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <div className="br-eyebrow">Channel breakdown · ranked by cost per result</div>
                <div style={{ fontSize: 15, fontWeight: 600, marginTop: 4, letterSpacing: "-0.005em" }}>What each channel is doing for you</div>
              </div>
              <Button variant="ghost" size="sm" iconRight="arrow_right">See all</Button>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1.4fr 0.7fr 0.6fr 0.6fr 0.6fr 0.8fr 0.5fr", padding: "8px 18px", background: "var(--surface-2)", fontSize: 10, color: "var(--ink-5)", fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: ".06em", fontWeight: 600, gap: 8 }}>
              <span>Channel</span><span style={{ textAlign: "right" }}>Spend</span><span style={{ textAlign: "right" }}>Impr.</span><span style={{ textAlign: "right" }}>Clicks</span><span style={{ textAlign: "right" }}>CTR</span><span style={{ textAlign: "right" }}>Conv. / CPL</span><span/>
            </div>
            {[
              { k: "meta",    spend: "$3,440", impr: "284K", clicks: "8,420",  ctr: "2.96%",  conv: "62 · $55", trend: "ok",   delta: "+18%" },
              { k: "google",  spend: "$2,890", impr: "112K", clicks: "5,210",  ctr: "4.65%",  conv: "34 · $85", trend: "ok",   delta: "+24%" },
              { k: "tiktok",  spend: "$760",   impr: "186K", clicks: "2,940",  ctr: "1.58%",  conv: "5 · $152", trend: "warn", delta: "new" },
              { k: "ga4",     spend: "—",      impr: "9,420 sess.", clicks: "—", ctr: "2.84% conv.", conv: "22 · —", trend: "ok", delta: "+62%" },
              { k: "gbp",     spend: "—",      impr: "1,420 views", clicks: "184 calls", ctr: "12.9%", conv: "12 · —", trend: "ok", delta: "+42%" },
              { k: "email",   spend: "—",      impr: "1,840 sent", clicks: "428 op.", ctr: "23.3% open", conv: "3 · —", trend: "ok", delta: "live" },
              { k: "linkedin",spend: "—",      impr: "—", clicks: "—", ctr: "—",        conv: "—",        trend: "neutral", delta: "off" },
            ].map((r, i, arr) => (
              <div key={r.k} style={{
                display: "grid", gridTemplateColumns: "1.4fr 0.7fr 0.6fr 0.6fr 0.6fr 0.8fr 0.5fr",
                padding: "12px 18px", gap: 8, alignItems: "center",
                borderTop: i > 0 ? "1px solid var(--line-faint)" : "none",
                opacity: r.delta === "off" ? .55 : 1,
              }}>
                <PlatformBadge kind={r.k} size="md"/>
                <span className="br-mono br-num" style={{ fontSize: 12, textAlign: "right" }}>{r.spend}</span>
                <span className="br-mono br-num" style={{ fontSize: 12, textAlign: "right", color: "var(--ink-3)" }}>{r.impr}</span>
                <span className="br-mono br-num" style={{ fontSize: 12, textAlign: "right", color: "var(--ink-3)" }}>{r.clicks}</span>
                <span className="br-mono br-num" style={{ fontSize: 12, textAlign: "right", fontWeight: 600 }}>{r.ctr}</span>
                <span className="br-num" style={{ fontSize: 12, textAlign: "right", fontWeight: 600 }}>{r.conv}</span>
                <div style={{ textAlign: "right" }}>{r.delta === "new" ? <Pill tone="accent" size="sm">New</Pill> : r.delta === "off" ? <span style={{ fontSize: 10, color: "var(--ink-5)" }}>Off</span> : r.delta === "live" ? <Pill tone="ok" size="sm">Live</Pill> : <Delta value={r.delta} tone={r.trend}/>}</div>
              </div>
            ))}
          </Card>

          <Card padding={20}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
              <div className="br-eyebrow">What changed · last 7 days</div>
              <span className="br-mono" style={{ fontSize: 10, color: "var(--ink-5)" }}>4 OBSERVATIONS</span>
            </div>
            <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 12, letterSpacing: "-0.005em" }}>The plain-language read</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <ObsCard
                tone="ok" icon="users"
                headline="You got 18% more visitors this week than last."
                detail="9,420 sessions vs. 7,980 in the previous 7 days. The bump shows up entirely on the website — paid traffic stayed flat."
                metric={{ label: "Sessions", value: "9,420", delta: "+18%" }}
                time="2h ago"
              />
              <ObsCard
                tone="warn" icon="alert"
                headline="CPA on Google has climbed for three days running."
                detail="Cost per booked lead from Google moved from $74 → $89 between May 12 and May 15. Volume held; the climb is in click price."
                metric={{ label: "Google CPL", value: "$89", delta: "+20%" }}
                time="5h ago"
              />
              <ObsCard
                tone="ok" icon="star"
                headline="Conversions peaked on Tuesday."
                detail="May 13 brought in 15 booked leads — your single best day of the engagement so far. Mostly Williston-zone Meta traffic."
                metric={{ label: "Leads · Tue", value: "15", delta: "+88%" }}
                time="2d ago"
              />
              <ObsCard
                tone="err" icon="megaphone"
                headline="TikTok CTR fell below 2% for the first time."
                detail="The pilot creative's CTR landed at 1.58%, down from 2.42% in the prior week. Three observations were used to detect this."
                metric={{ label: "TikTok CTR", value: "1.58%", delta: "-9%" }}
                time="3d ago"
              />
            </div>
            <div style={{ marginTop: 10, fontSize: 11, color: "var(--ink-5)", paddingTop: 10, borderTop: "1px solid var(--line-faint)" }}>
              <Icon name="info" size={11}/> Radar describes what's changed. For what to do about it, your strategist (in Compass) decides.
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 02 — Platform widget grid (Hootsuite-style)
// ─────────────────────────────────────────────────────────────
function RPlatforms() {
  return (
    <div className="br-frame">
      <RadarTopBar active="platforms"/>
      <div className="br-scroll" style={{ flex: 1, overflowY: "auto", padding: "20px 28px 28px" }}>
        <div style={{ marginBottom: 18, display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
          <div>
            <Pill tone="neutral" size="sm">Platforms · Hootsuite-style grid</Pill>
            <h1 className="br-h1" style={{ fontSize: 24, marginTop: 8, marginBottom: 4 }}>Every platform, its own card.</h1>
            <p className="br-body" style={{ margin: 0 }}>Drag to reorder. Collapse what you don't need. Each card opens to the source if you want the original tool.</p>
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            <Button variant="outline" size="sm" icon="plus">Add widget</Button>
            <Button variant="ghost" size="sm" icon="sliders">Layout</Button>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
          {/* META */}
          <Widget platform="meta" footerLink={{ note: "Source · Meta Ads Manager", label: "Open in Meta" }}>
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
              <div>
                <div className="br-eyebrow" style={{ fontSize: 9.5 }}>Spend · 30d</div>
                <span className="br-num" style={{ fontSize: 22, fontWeight: 600, letterSpacing: "-0.02em" }}>$3,440</span>
              </div>
              <Delta value="+12%"/>
            </div>
            <Sparkline data={[110,118,120,125,128,118,124,130,135,140]} stroke="#1877f2"/>
            <div className="br-eyebrow" style={{ fontSize: 9.5, marginTop: 4 }}>Top campaigns</div>
            <CampaignRow name="Williston launch · Q2"  status="active" spend="$1,840" cpr="$55"  delta="-12%"/>
            <CampaignRow name="Families · always-on"   status="active" spend="$1,160" cpr="$62"  delta="-8%"/>
            <CampaignRow name="Promo · spring cleaning" status="paused" spend="$440"   cpr="$118" delta="+24%"/>
            <div className="br-eyebrow" style={{ fontSize: 9.5, marginTop: 4 }}>Top ad creatives</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6 }}>
              {[
                ["Gentle care · square",  "#0c4a6e", "62 conv"],
                ["Kids · vertical",      "#fce7f3", "44 conv"],
                ["New location · sq.",   "#d6d3d1", "18 conv"],
              ].map(([label, color, kpi]) => (
                <div key={label} style={{ borderRadius: 6, padding: 8, background: color, color: color === "#fce7f3" || color === "#d6d3d1" ? "#0c0a09" : "#fff", aspectRatio: "1/1", display: "flex", flexDirection: "column", justifyContent: "space-between", fontSize: 9.5 }}>
                  <div style={{ fontWeight: 600, lineHeight: 1.15 }}>{label}</div>
                  <div className="br-mono" style={{ opacity: .85 }}>{kpi}</div>
                </div>
              ))}
            </div>
          </Widget>

          {/* GOOGLE */}
          <Widget platform="google" footerLink={{ note: "Source · Google Ads", label: "Open in Google Ads" }}>
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
              <div>
                <div className="br-eyebrow" style={{ fontSize: 9.5 }}>Conversions · 30d</div>
                <span className="br-num" style={{ fontSize: 22, fontWeight: 600, letterSpacing: "-0.02em" }}>34</span>
              </div>
              <Delta value="+24%"/>
            </div>
            <Sparkline data={[18,19,21,24,26,28,30,32,33,34]} stroke="#34a853"/>
            <div className="br-eyebrow" style={{ fontSize: 9.5, marginTop: 4 }}>Top keywords</div>
            <KeywordRow term="kid friendly dentist williston" clicks="412"  cpc="$3.40" conv="14"/>
            <KeywordRow term="family dental burlington vt"    clicks="318"  cpc="$4.10" conv="9"/>
            <KeywordRow term="dental cleaning near me"        clicks="284"  cpc="$5.60" conv="6"/>
            <KeywordRow term="pediatric dentist williston"    clicks="201"  cpc="$4.80" conv="5"/>
            <div className="br-eyebrow" style={{ fontSize: 9.5, marginTop: 4 }}>Conversion tracking</div>
            <div style={{ display: "flex", gap: 4 }}>
              <Pill tone="ok" size="sm" icon="check">Form submit</Pill>
              <Pill tone="ok" size="sm" icon="check">Phone</Pill>
              <Pill tone="ok" size="sm" icon="check">Booking</Pill>
            </div>
          </Widget>

          {/* TIKTOK */}
          <Widget platform="tiktok" footerLink={{ note: "Source · TikTok Ads Manager", label: "Open in TikTok" }}>
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
              <div>
                <div className="br-eyebrow" style={{ fontSize: 9.5 }}>Avg. video watch</div>
                <span className="br-num" style={{ fontSize: 22, fontWeight: 600, letterSpacing: "-0.02em" }}>9.8s</span>
              </div>
              <Delta value="-3%" tone="warn"/>
            </div>
            <Sparkline data={[10.2,10,10.1,9.9,9.8,9.7,9.8,9.6,9.8,9.8]} stroke="#000000"/>
            <div className="br-eyebrow" style={{ fontSize: 9.5, marginTop: 4 }}>Top videos</div>
            {[
              { title: "Dr. Lin · gentle care promise", views: "42K", er: "4.2%" },
              { title: "Williston tour · 0:42",        views: "28K", er: "3.8%" },
              { title: "First-visit FAQ · kids",       views: "18K", er: "2.1%" },
            ].map((v) => (
              <div key={v.title} style={{ display: "grid", gridTemplateColumns: "auto 1fr auto auto", gap: 8, alignItems: "center", padding: "6px 0", borderTop: "1px solid var(--line-faint)" }}>
                <div style={{ width: 28, height: 36, borderRadius: 4, background: "linear-gradient(135deg, #0c0a09 0%, #1a1a1a 100%)", color: "#fff", display: "grid", placeItems: "center", fontSize: 11 }}>▶</div>
                <span style={{ fontSize: 11.5, lineHeight: 1.3 }}>{v.title}</span>
                <span className="br-mono br-num" style={{ fontSize: 10.5, color: "var(--ink-4)" }}>{v.views}</span>
                <span className="br-mono br-num" style={{ fontSize: 10.5, fontWeight: 600, width: 32, textAlign: "right" }}>{v.er}</span>
              </div>
            ))}
          </Widget>

          {/* WEBSITE / GA4 */}
          <Widget platform="ga4" footerLink={{ note: "Source · GA4", label: "Open in GA4" }}>
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
              <div>
                <div className="br-eyebrow" style={{ fontSize: 9.5 }}>Sessions · 30d</div>
                <span className="br-num" style={{ fontSize: 22, fontWeight: 600, letterSpacing: "-0.02em" }}>9,420</span>
              </div>
              <Delta value="+28%"/>
            </div>
            <Sparkline data={[180,195,220,240,260,290,320,310,330,340]} stroke="#f59e0b"/>
            <div className="br-eyebrow" style={{ fontSize: 9.5, marginTop: 4 }}>Traffic sources</div>
            {[
              ["Organic search", 38],
              ["Paid · Meta",    24],
              ["Paid · Google",  18],
              ["Direct",         12],
              ["Local · GBP",     8],
            ].map(([k, pct]) => (
              <div key={k} style={{ display: "grid", gridTemplateColumns: "100px 1fr 36px", gap: 8, alignItems: "center" }}>
                <span style={{ fontSize: 11, color: "var(--ink-2)" }}>{k}</span>
                <HBar value={pct} max={40} color="#f59e0b"/>
                <span className="br-mono br-num" style={{ fontSize: 10.5, textAlign: "right" }}>{pct}%</span>
              </div>
            ))}
            <div className="br-eyebrow" style={{ fontSize: 9.5, marginTop: 4 }}>Top pages</div>
            {[
              ["/williston",       "2,840", "4.6%"],
              ["/services/kids",  "1,720",  "3.1%"],
              ["/",                  "1,420",  "2.2%"],
            ].map(([p, s, c]) => (
              <div key={p} style={{ display: "grid", gridTemplateColumns: "1fr auto auto", gap: 10, alignItems: "center", padding: "6px 0", borderTop: "1px solid var(--line-faint)" }}>
                <span className="br-mono" style={{ fontSize: 11, color: "var(--ink-2)" }}>{p}</span>
                <span className="br-mono br-num" style={{ fontSize: 11, color: "var(--ink-4)" }}>{s} sess.</span>
                <span className="br-mono br-num" style={{ fontSize: 11, fontWeight: 600, width: 38, textAlign: "right" }}>{c}</span>
              </div>
            ))}
          </Widget>

          {/* GBP / Local */}
          <Widget platform="gbp" footerLink={{ note: "Source · Google Business Profile", label: "Open in GBP" }}>
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
              <div>
                <div className="br-eyebrow" style={{ fontSize: 9.5 }}>Direction requests</div>
                <span className="br-num" style={{ fontSize: 22, fontWeight: 600, letterSpacing: "-0.02em" }}>312</span>
              </div>
              <Delta value="+42%"/>
            </div>
            <Sparkline data={[6,8,8,10,11,12,11,13,14,15]} stroke="#0891b2"/>
            <div className="br-eyebrow" style={{ fontSize: 9.5, marginTop: 4 }}>Locations</div>
            {[
              ["Burlington",    "★ 4.6", 184, "+18"],
              ["S. Burlington", "★ 4.5", 92,  "+8"],
              ["Williston",     "★ 4.7", 36,  "+28"],
            ].map(([loc, stars, dirs, delta]) => (
              <div key={loc} style={{ display: "grid", gridTemplateColumns: "1fr auto auto auto", gap: 8, alignItems: "center", padding: "6px 0", borderTop: "1px solid var(--line-faint)" }}>
                <span style={{ fontSize: 11.5 }}>{loc}</span>
                <span className="br-mono" style={{ fontSize: 10.5, color: "var(--ink-4)" }}>{stars}</span>
                <span className="br-mono br-num" style={{ fontSize: 10.5, fontWeight: 600 }}>{dirs}</span>
                <Delta value={"+"+delta}/>
              </div>
            ))}
            <div className="br-eyebrow" style={{ fontSize: 9.5, marginTop: 4 }}>Reviews · last 30d</div>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <span className="br-num" style={{ fontSize: 18, fontWeight: 600 }}>+19</span>
              <span style={{ fontSize: 11, color: "var(--ink-4)" }}>new · avg 4.62 ★</span>
              <div style={{ flex: 1 }}/>
              <Delta value="+58%"/>
            </div>
          </Widget>

          {/* EMAIL */}
          <Widget platform="email" footerLink={{ note: "Source · Beacon recall workflow", label: "Open in Beacon" }}>
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
              <div>
                <div className="br-eyebrow" style={{ fontSize: 9.5 }}>Recall · re-bookings</div>
                <span className="br-num" style={{ fontSize: 22, fontWeight: 600, letterSpacing: "-0.02em" }}>87</span>
              </div>
              <Delta value="live"/>
            </div>
            <Sparkline data={[0,0,2,4,8,12,18,28,42,58,72,87]} stroke="#ea580c"/>
            <div className="br-eyebrow" style={{ fontSize: 9.5, marginTop: 4 }}>Performance</div>
            <MetricRow label="Sends · 30d"     value="1,840" delta="+0%"/>
            <MetricRow label="Open rate"        value="23.3%" delta="+0%"/>
            <MetricRow label="Click-thru"       value="9.4%"  delta="+0%"/>
            <MetricRow label="Re-booked"        value="87"    delta="+87" deltaTone="ok" sub="$243K latent revenue captured"/>
            <div style={{ padding: "6px 8px", background: "var(--ok-soft)", border: "1px solid #a7f3d0", borderRadius: 7, fontSize: 11, color: "var(--ok)", display: "flex", alignItems: "center", gap: 6 }}>
              <Icon name="check" size={11} strokeWidth={2.4}/> Workflow live since Apr 28
            </div>
          </Widget>

          {/* ORGANIC SOCIAL */}
          <Widget platform="organic" footerLink={{ note: "Source · IG + FB native", label: "Open posts" }}>
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
              <div>
                <div className="br-eyebrow" style={{ fontSize: 9.5 }}>Engagement rate</div>
                <span className="br-num" style={{ fontSize: 22, fontWeight: 600, letterSpacing: "-0.02em" }}>4.8%</span>
              </div>
              <Delta value="+0.4pt"/>
            </div>
            <Sparkline data={[3.8,4.0,4.1,4.4,4.2,4.5,4.6,4.7,4.8]} stroke="#a78bfa"/>
            <MetricRow label="Followers · IG"       value="2,140" delta="+82"/>
            <MetricRow label="Posts published"      value="22"    delta="+4"/>
            <MetricRow label="Reach · 30d"          value="48K"   delta="+22%"/>
            <MetricRow label="Saves"                value="312"   delta="+18%"/>
          </Widget>

          {/* LINKEDIN */}
          <Widget platform="linkedin" footerLink={{ note: "Source · LinkedIn Campaign Mgr", label: "Connect" }}>
            <div style={{ padding: "20px 4px", display: "grid", placeItems: "center", textAlign: "center", flex: 1 }}>
              <div style={{
                width: 44, height: 44, borderRadius: 10, background: "var(--surface-2)",
                color: "var(--ink-4)", display: "grid", placeItems: "center", marginBottom: 10,
              }}>
                <Icon name="plus" size={20}/>
              </div>
              <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 4 }}>Not connected yet</div>
              <div style={{ fontSize: 12, color: "var(--ink-4)", marginBottom: 12, maxWidth: 200 }}>Out of scope this quarter — connect to start tracking.</div>
              <Button variant="outline" size="sm" iconRight="arrow_right">Connect</Button>
            </div>
          </Widget>

          {/* Compass goals progress — special widget */}
          <Widget title="Compass goals · M4" footerLink={{ note: "Linked to Compass scope §05", label: "Open in Compass" }}>
            <div className="br-eyebrow" style={{ fontSize: 9.5 }}>Pacing against the 12-mo plan</div>
            {[
              { name: "New patients / mo",   target: 140, current: 112, unit: "" },
              { name: "Blended ROAS",        target: 4.2, current: 3.9, unit: "×" },
              { name: "Williston fill",      target: 82,  current: 71,  unit: "%" },
              { name: "Annual revenue · proj", target: 3.6, current: 3.1, unit: "M" },
            ].map((g) => {
              const pct = (g.current / g.target) * 100;
              return (
                <div key={g.name}>
                  <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 3 }}>
                    <span style={{ fontSize: 12, color: "var(--ink-2)" }}>{g.name}</span>
                    <span className="br-mono br-num" style={{ fontSize: 11 }}>
                      <strong>{g.current}{g.unit}</strong> <span style={{ color: "var(--ink-5)" }}>/ {g.target}{g.unit}</span>
                    </span>
                  </div>
                  <div style={{ height: 5, borderRadius: 999, background: "var(--surface-3)", overflow: "hidden", position: "relative" }}>
                    <div style={{ height: "100%", width: `${pct}%`, background: pct >= 90 ? "var(--ok)" : pct >= 70 ? "var(--accent)" : "var(--warn)" }}/>
                    <div style={{ position: "absolute", left: "100%", top: -2, bottom: -2, width: 1.5, background: "var(--ink-3)" }}/>
                  </div>
                </div>
              );
            })}
          </Widget>
        </div>
      </div>
    </div>
  );
}

function CampaignRow({ name, status, spend, cpr, delta }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "auto 1fr auto auto auto", gap: 8, alignItems: "center", padding: "6px 0", borderTop: "1px solid var(--line-faint)" }}>
      <span style={{ width: 6, height: 6, borderRadius: 999, background: status === "active" ? "var(--ok)" : "var(--ink-5)" }}/>
      <span style={{ fontSize: 11.5, color: "var(--ink-2)" }}>{name}</span>
      <span className="br-mono br-num" style={{ fontSize: 10.5, color: "var(--ink-4)" }}>{spend}</span>
      <span className="br-mono br-num" style={{ fontSize: 10.5, fontWeight: 600 }}>{cpr}</span>
      <Delta value={delta}/>
    </div>
  );
}

function KeywordRow({ term, clicks, cpc, conv }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr auto auto auto", gap: 8, alignItems: "center", padding: "6px 0", borderTop: "1px solid var(--line-faint)" }}>
      <span className="br-mono" style={{ fontSize: 11, color: "var(--ink-2)" }}>{term}</span>
      <span className="br-mono br-num" style={{ fontSize: 10.5, color: "var(--ink-4)" }}>{clicks}</span>
      <span className="br-mono br-num" style={{ fontSize: 10.5, color: "var(--ink-4)" }}>{cpc}</span>
      <span className="br-mono br-num" style={{ fontSize: 11, fontWeight: 600 }}>{conv}</span>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 03 — Channel deep-dive (Meta)
// ─────────────────────────────────────────────────────────────
function RChannelDetail() {
  return (
    <div className="br-frame">
      <RadarTopBar active="channels"/>
      <div className="br-scroll" style={{ flex: 1, overflowY: "auto", padding: "20px 28px 28px" }}>
        {/* breadcrumb */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "var(--ink-4)", marginBottom: 12 }}>
          <span>Channels</span><Icon name="chevron_right" size={11}/>
          <span style={{ color: "var(--ink-2)", fontWeight: 500 }}>Meta · FB + IG</span>
        </div>

        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 18 }}>
          <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
            <PlatformBadge kind="meta" size="lg"/>
            <div>
              <h1 className="br-h1" style={{ fontSize: 24, margin: 0, letterSpacing: "-0.02em" }}>Meta · paid acquisition</h1>
              <div style={{ fontSize: 12.5, color: "var(--ink-4)", marginTop: 2 }}>3 active campaigns · 1 paused · Williston-only geo</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <Button variant="outline" size="sm" iconRight="arrow_right">Open in Meta Ads Manager</Button>
          </div>
        </div>

        {/* Channel KPIs (6 cards) */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 10, marginBottom: 18 }}>
          <KpiCard label="Spend"          value="$3,440" sub="$2.8K → $3.4K"  delta="+22%" tone="warn"   spark={[110,118,125,128,124,132,138,142,140,144]}/>
          <KpiCard label="Impressions"    value="284K"   sub="vs. 248K"        delta="+15%" tone="ok"     spark={[8,9,9,10,10,11,12,11,12,13]}/>
          <KpiCard label="Clicks"         value="8,420"  sub="vs. 6,920"       delta="+22%" tone="ok"     spark={[240,265,280,295,310,300,320,340,345,360]}/>
          <KpiCard label="CTR"            value="2.96%"  sub="vs. 2.79%"       delta="+6%"  tone="ok"     spark={[2.7,2.8,2.8,2.9,2.9,3.0,2.95,3.0,2.96]} featured/>
          <KpiCard label="Conversions"    value="62"     sub="lead bookings"   delta="+19%" tone="ok"     spark={[40,44,48,51,55,57,58,60,61,62]}/>
          <KpiCard label="Cost per lead"  value="$55"    sub="target ≤ $84"    delta="-9%"  tone="ok"     spark={[62,60,59,58,58,57,56,55,55,55]}/>
        </div>

        {/* Trend + audience breakdown */}
        <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 14, marginBottom: 18 }}>
          <Card padding={20}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
              <div>
                <div className="br-eyebrow">Spend vs. results · 30d</div>
                <div style={{ fontSize: 15, fontWeight: 600, marginTop: 4 }}>Efficiency holding</div>
              </div>
              <div style={{ display: "flex", gap: 14, alignItems: "center", fontSize: 11 }}>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
                  <span style={{ width: 10, height: 2.5, background: "#1877f2" }}/> Spend
                </span>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
                  <span style={{ width: 10, height: 2.5, background: "#4f46e5" }}/> Conversions
                </span>
              </div>
            </div>
            <LineChart
              labels={TREND_LABELS_30}
              series={[
                { name: "Spend ($)",   color: "#1877f2", data: [108,112,115,118,124,126,128,130,128,132,134,138,140,135,138,140,142,138,142,144,146,148,142,144,146,148,150,148,148,150] },
                { name: "Conversions", color: "#4f46e5", data: [1.4,1.6,1.5,1.8,1.7,2.0,1.9,2.1,2.2,2.0,2.2,2.4,2.3,2.5,2.6,2.4,2.6,2.7,2.8,2.6,2.8,3.0,2.9,3.1,3.0,3.2,3.3,3.0,3.2,3.4] },
              ]}
              yFormat={(v) => Math.round(v)}
              height={220}
            />
          </Card>

          <Card padding={20}>
            <div className="br-eyebrow" style={{ marginBottom: 4 }}>Audience breakdown</div>
            <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 12 }}>Who's converting</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { l: "Age 28–34", v: 18, total: 62, sub: "Families · pre-kids" },
                { l: "Age 35–44", v: 31, total: 62, sub: "Families · young kids" },
                { l: "Age 45–54", v: 9,  total: 62, sub: "Families · teens" },
                { l: "Age 55+",   v: 4,  total: 62, sub: "Retirees" },
              ].map((a) => (
                <div key={a.l}>
                  <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 4 }}>
                    <span style={{ fontSize: 12 }}>{a.l} · <span style={{ color: "var(--ink-4)" }}>{a.sub}</span></span>
                    <span className="br-mono br-num" style={{ fontSize: 11, fontWeight: 600 }}>{a.v}</span>
                  </div>
                  <HBar value={a.v} max={a.total} color="#1877f2"/>
                </div>
              ))}
            </div>
            <div style={{ paddingTop: 12, marginTop: 12, borderTop: "1px solid var(--line)", display: "flex", gap: 12 }}>
              <div>
                <div className="br-eyebrow" style={{ fontSize: 9.5 }}>Geo radius</div>
                <div className="br-num" style={{ fontSize: 16, fontWeight: 600 }}>5 mi · Williston</div>
              </div>
              <div>
                <div className="br-eyebrow" style={{ fontSize: 9.5 }}>Placements</div>
                <div style={{ fontSize: 13, fontWeight: 600 }}>Feed + Reels + Stories</div>
              </div>
            </div>
          </Card>
        </div>

        {/* Campaigns table */}
        <Card padding={0} style={{ overflow: "hidden" }}>
          <div style={{ padding: "14px 18px", borderBottom: "1px solid var(--line)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <div className="br-eyebrow">Active campaigns · click any row to drill</div>
              <div style={{ fontSize: 15, fontWeight: 600, marginTop: 4 }}>4 campaigns</div>
            </div>
            <Button variant="ghost" size="sm" icon="sliders">Columns</Button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1.6fr 0.6fr 0.5fr 0.5fr 0.6fr 0.6fr 0.6fr 0.6fr", padding: "8px 18px", background: "var(--surface-2)", fontSize: 10, color: "var(--ink-5)", fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: ".06em", fontWeight: 600, gap: 8 }}>
            <span>Campaign</span><span style={{ textAlign: "right" }}>Status</span><span style={{ textAlign: "right" }}>Spend</span><span style={{ textAlign: "right" }}>Impr.</span><span style={{ textAlign: "right" }}>CTR</span><span style={{ textAlign: "right" }}>Conv.</span><span style={{ textAlign: "right" }}>CPL</span><span style={{ textAlign: "right" }}>Δ</span>
          </div>
          {[
            { name: "Williston launch · Q2",       status: "active", spend: "$1,840", impr: "152K", ctr: "3.42%", conv: "34", cpl: "$54",  delta: "-12%", trend: "ok",   featured: true },
            { name: "Families always-on",          status: "active", spend: "$1,160", impr: "98K",  ctr: "2.88%", conv: "19", cpl: "$61",  delta: "-8%",  trend: "ok" },
            { name: "Reels · gentle care",         status: "active", spend: "$440",   impr: "28K",  ctr: "2.10%", conv: "7",  cpl: "$63",  delta: "+4%",  trend: "warn" },
            { name: "Promo · spring cleaning",     status: "paused", spend: "$0",     impr: "6K",   ctr: "1.40%", conv: "2",  cpl: "$118", delta: "+24%", trend: "err" },
          ].map((r, i) => (
            <div key={r.name} style={{ display: "grid", gridTemplateColumns: "1.6fr 0.6fr 0.5fr 0.5fr 0.6fr 0.6fr 0.6fr 0.6fr", padding: "12px 18px", gap: 8, alignItems: "center", borderTop: i > 0 ? "1px solid var(--line-faint)" : "none", background: r.featured ? "linear-gradient(90deg, rgba(79,70,229,.04) 0%, transparent 100%)" : "transparent" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ width: 6, height: 6, borderRadius: 999, background: r.status === "active" ? "var(--ok)" : "var(--ink-5)" }}/>
                <span style={{ fontSize: 13, fontWeight: 500 }}>{r.name}</span>
                {r.featured && <Pill tone="accent" size="sm">Top</Pill>}
              </div>
              <span className="br-mono" style={{ fontSize: 11, color: "var(--ink-4)", textAlign: "right" }}>{r.status}</span>
              <span className="br-mono br-num" style={{ fontSize: 12, textAlign: "right" }}>{r.spend}</span>
              <span className="br-mono br-num" style={{ fontSize: 12, textAlign: "right", color: "var(--ink-3)" }}>{r.impr}</span>
              <span className="br-mono br-num" style={{ fontSize: 12, textAlign: "right", fontWeight: 600 }}>{r.ctr}</span>
              <span className="br-num" style={{ fontSize: 12, textAlign: "right", fontWeight: 600 }}>{r.conv}</span>
              <span className="br-num" style={{ fontSize: 12, textAlign: "right", fontWeight: 600 }}>{r.cpl}</span>
              <div style={{ textAlign: "right" }}><Delta value={r.delta} tone={r.trend}/></div>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}

Object.assign(window, { ROverview, RPlatforms, RChannelDetail, CampaignRow, KeywordRow, TREND_LEADS_30, TREND_LEADS_PREV, TREND_LABELS_30 });
