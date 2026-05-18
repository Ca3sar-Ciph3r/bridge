/* global React, Icon, Button, Pill, Card, Field, Input, Toggle, AICallout,
   DockWordmark, DockTopBar, WhyCallout, StageStrip, WorkstreamPill, StatusDot, AssetThumb, AssetCard, FeedItem, SectionDivider */
// Dock — screens part 2: Project Tracker (website), Billing, Weekly Summary

// ─────────────────────────────────────────────────────────────
// 04 — Project Tracker (Website build)
// ─────────────────────────────────────────────────────────────
function DProject() {
  return (
    <div className="br-frame">
      <DockTopBar active="projects"/>
      <div className="br-scroll" style={{ flex: 1, overflowY: "auto", padding: "28px 32px 36px" }}>
        {/* breadcrumb + title */}
        <div style={{ marginBottom: 18 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "var(--ink-4)", marginBottom: 10 }}>
            <span>Projects</span>
            <Icon name="chevron_right" size={11}/>
            <span style={{ color: "var(--ink-2)", fontWeight: 500 }}>Website refresh + Williston landing</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <WorkstreamPill kind="web"/>
              <h1 className="br-h1" style={{ fontSize: 28, marginTop: 10, marginBottom: 6 }}>Website refresh + Williston landing.</h1>
              <p className="br-body" style={{ margin: 0, maxWidth: 720 }}>
                A full refresh of <span className="br-mono">lakesidedental.com</span> plus a dedicated Williston landing page that anchors the paid acquisition. Built in five stages, transparent at every step.
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
              <Pill tone="accent" size="sm">Stage 02 of 05 · Design</Pill>
              <div className="br-num" style={{ fontSize: 32, fontWeight: 600, letterSpacing: "-0.025em" }}>32%</div>
              <span className="br-mono" style={{ fontSize: 10.5, color: "var(--ink-5)" }}>LAUNCH · OCT 14 · 26d</span>
            </div>
          </div>
        </div>

        {/* Stage strip — big version */}
        <Card padding={22} style={{ marginBottom: 18 }}>
          <div className="br-eyebrow" style={{ marginBottom: 14 }}>Stage progress</div>
          <StageStripBig
            stages={[
              { name: "Planning",    sub: "Sept 02 – Sept 08", state: "done"     },
              { name: "Design",      sub: "Sept 09 – Sept 24", state: "active"   },
              { name: "Build",       sub: "Sept 25 – Oct 06",  state: "upcoming" },
              { name: "QA",          sub: "Oct 07 – Oct 12",   state: "upcoming" },
              { name: "Launch",      sub: "Oct 14",            state: "upcoming" },
            ]}
          />
        </Card>

        {/* Two column: current stage + sub-pages */}
        <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 14, marginBottom: 18 }}>
          <Card padding={22}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
              <div>
                <div className="br-eyebrow">Currently · Design</div>
                <div style={{ fontSize: 18, fontWeight: 600, marginTop: 4, letterSpacing: "-0.015em" }}>Bringing the structure to life</div>
              </div>
              <StatusDot state="in_progress"/>
            </div>

            {/* Inner stage steps */}
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {[
                { t: "Brand & moodboard alignment",      s: "done",     d: "Locked — keep the warmth, modernize the type.",  by: "Jess" },
                { t: "Wireframes — 9 pages + Williston", s: "done",     d: "Signed off internally · matches sitemap.",        by: "Jess + Mike" },
                { t: "Williston landing — v1 visual",    s: "doing",    d: "Hero, sections, CTAs landing Thu 9am for review.",by: "Jess" },
                { t: "Site-wide design system",          s: "doing",    d: "Type, spacing, components — 60% built.",          by: "Jess" },
                { t: "Page templates — all 9",           s: "upcoming", d: "Begins Mon after Williston signoff.",              by: "Jess" },
                { t: "Hand-off to build",                s: "upcoming", d: "Tokens + Figma file + spec doc.",                  by: "Jess → Tom" },
              ].map((row, i, arr) => (
                <div key={row.t} style={{ display: "grid", gridTemplateColumns: "auto 1fr auto", gap: 12, padding: "12px 0", borderTop: i > 0 ? "1px solid var(--line-faint)" : "none" }}>
                  <div style={{
                    width: 22, height: 22, borderRadius: 999, marginTop: 1,
                    background: row.s === "done" ? "var(--ink)" : row.s === "doing" ? "var(--surface)" : "var(--surface)",
                    border: row.s === "done" ? "1px solid var(--ink)" : row.s === "doing" ? "1.5px solid var(--accent)" : "1.5px solid var(--line-strong)",
                    display: "grid", placeItems: "center", color: "#fff", flexShrink: 0,
                  }}>
                    {row.s === "done" && <Icon name="check" size={11} strokeWidth={3}/>}
                    {row.s === "doing" && <div style={{ width: 6, height: 6, borderRadius: 999, background: "var(--accent)" }}/>}
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ fontSize: 13.5, fontWeight: row.s === "doing" ? 600 : 500 }}>{row.t}</span>
                      {row.s === "doing" && <Pill tone="accent" size="sm">In progress</Pill>}
                    </div>
                    <div style={{ fontSize: 12, color: "var(--ink-4)", marginTop: 2 }}>{row.d}</div>
                  </div>
                  <span className="br-mono" style={{ fontSize: 10.5, color: "var(--ink-5)", whiteSpace: "nowrap", paddingTop: 4 }}>{row.by}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card padding={22}>
            <div className="br-eyebrow" style={{ marginBottom: 4 }}>Pages in scope</div>
            <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 14, letterSpacing: "-0.005em" }}>10 of them, tracked</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {[
                ["/", "Home", "design"],
                ["/williston", "Williston landing", "design", "FEATURED"],
                ["/burlington", "Burlington location", "wires"],
                ["/sburlington", "S. Burlington location", "wires"],
                ["/services", "Services overview", "wires"],
                ["/services/kids", "Pediatric care", "wires"],
                ["/team", "Our dentists", "wires"],
                ["/insurance", "Insurance & costs", "wires"],
                ["/book", "Booking flow", "design"],
                ["/blog", "Blog index", "scoped"],
              ].map(([slug, name, stage, badge]) => {
                const stageMap = { scoped: { c: "var(--ink-5)", l: "Scoped" }, wires: { c: "var(--accent)", l: "Wires" }, design: { c: "var(--ai)", l: "Design" } };
                const s = stageMap[stage];
                return (
                  <div key={slug} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 10px", border: "1px solid var(--line)", borderRadius: 8, background: badge ? "linear-gradient(90deg, rgba(79,70,229,.05) 0%, transparent 100%)" : "var(--surface)" }}>
                    <span className="br-mono" style={{ fontSize: 10.5, color: "var(--ink-5)", minWidth: 90 }}>{slug}</span>
                    <span style={{ fontSize: 12.5, flex: 1 }}>{name}</span>
                    {badge && <Pill tone="accent" size="sm">{badge}</Pill>}
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 11, color: s.c }}>
                      <span style={{ width: 6, height: 6, borderRadius: 999, background: s.c }}/>{s.l}
                    </span>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        {/* Current preview + why */}
        <Card padding={22} style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 22, alignItems: "center" }}>
          <div style={{ padding: 18, background: "linear-gradient(180deg, var(--surface-2) 0%, var(--bg) 100%)", borderRadius: 12, border: "1px solid var(--line)" }}>
            <AssetThumb kind="landing-page" scale={1}/>
          </div>
          <div>
            <Pill tone="ai" size="sm" icon="sparkle">Live preview · v1 design</Pill>
            <div style={{ fontSize: 18, fontWeight: 600, marginTop: 10, marginBottom: 6, letterSpacing: "-0.015em" }}>Williston landing — first visual pass</div>
            <p className="br-body" style={{ margin: 0, marginBottom: 12, maxWidth: 480 }}>
              The Williston-only landing page that paid acquisition routes to. Clicking the preview opens a full-fidelity view in a new tab. Comment anywhere on it.
            </p>
            <WhyCallout ref_="Funnel §01">
              Holds the Meta + Google clicks. We expect <strong style={{ color: "var(--ink)" }}>38% of visits to self-book</strong> within 90 days — funded by the Compass ROI model.
            </WhyCallout>
            <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
              <Button variant="primary" size="md" iconRight="arrow_right">Open live preview</Button>
              <Button variant="outline" size="md" icon="info">View version history</Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

function StageStripBig({ stages }) {
  return (
    <div style={{ display: "flex", alignItems: "stretch", gap: 0 }}>
      {stages.map((s, i) => {
        const done = s.state === "done";
        const active = s.state === "active";
        return (
          <React.Fragment key={s.name}>
            <div style={{ flex: 1, padding: "12px 16px", borderRadius: 10, background: active ? "var(--surface)" : "transparent", border: active ? "1.5px solid var(--accent)" : "1px solid transparent", boxShadow: active ? "var(--shadow-1)" : "none" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                <div style={{
                  width: 24, height: 24, borderRadius: 999,
                  background: done ? "var(--ink)" : active ? "var(--accent-soft)" : "var(--surface-2)",
                  border: done ? "1px solid var(--ink)" : active ? "1.5px solid var(--accent)" : "1.5px solid var(--line-strong)",
                  display: "grid", placeItems: "center", color: "#fff", flexShrink: 0,
                }}>
                  {done && <Icon name="check" size={11} strokeWidth={3}/>}
                  {active && <div style={{ width: 7, height: 7, borderRadius: 999, background: "var(--accent)" }}/>}
                  {!done && !active && <span style={{ fontSize: 10.5, color: "var(--ink-5)", fontFamily: "var(--font-mono)" }}>{String(i + 1).padStart(2, "0")}</span>}
                </div>
                <span style={{ fontSize: 13.5, fontWeight: active ? 700 : 600, color: done ? "var(--ink-3)" : active ? "var(--ink)" : "var(--ink-4)", letterSpacing: "-0.005em" }}>{s.name}</span>
              </div>
              <div className="br-mono" style={{ fontSize: 10.5, color: "var(--ink-5)" }}>{s.sub}</div>
            </div>
            {i < stages.length - 1 && (
              <div style={{ alignSelf: "center", width: 16, height: 2, background: done ? "var(--ink)" : "var(--line-strong)", margin: "0 2px" }}/>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 05 — Billing & Invoices
// ─────────────────────────────────────────────────────────────
function DBilling() {
  return (
    <div className="br-frame">
      <DockTopBar active="billing"/>
      <div className="br-scroll" style={{ flex: 1, overflowY: "auto", padding: "28px 32px 36px" }}>
        <div style={{ marginBottom: 22 }}>
          <Pill tone="neutral" size="sm">Billing</Pill>
          <h1 className="br-h1" style={{ fontSize: 26, marginTop: 8, marginBottom: 4 }}>What you're paying, and what it's actually doing.</h1>
          <p className="br-body" style={{ margin: 0 }}>Every dollar is mapped to a workstream. No "miscellaneous", no surprises.</p>
        </div>

        {/* Hero summary card */}
        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 14, marginBottom: 22 }}>
          <Card padding={24}>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 24, marginBottom: 18 }}>
              <div>
                <div className="br-eyebrow" style={{ fontSize: 10 }}>Monthly retainer</div>
                <div className="br-num" style={{ fontSize: 42, fontWeight: 600, letterSpacing: "-0.03em", marginTop: 4 }}>$8,800<span style={{ fontSize: 16, fontWeight: 400, color: "var(--ink-4)", marginLeft: 4 }}>/ mo</span></div>
                <div className="br-mono" style={{ fontSize: 11, color: "var(--ink-5)", marginTop: 4 }}>GROWTH TIER · 6-MO COMMIT · NEXT INVOICE OCT 02</div>
              </div>
              <div style={{ flex: 1 }}/>
              <div>
                <div className="br-eyebrow" style={{ fontSize: 10 }}>One-time</div>
                <div className="br-num" style={{ fontSize: 26, fontWeight: 600, letterSpacing: "-0.025em", marginTop: 4 }}>$20,600</div>
                <div style={{ fontSize: 11, color: "var(--ink-4)", marginTop: 4 }}>Web build · paid in 3</div>
              </div>
              <div>
                <div className="br-eyebrow" style={{ fontSize: 10 }}>12-mo total</div>
                <div className="br-num" style={{ fontSize: 26, fontWeight: 600, letterSpacing: "-0.025em", marginTop: 4 }}>$126,200</div>
                <div style={{ fontSize: 11, color: "var(--ink-4)", marginTop: 4 }}>vs. $135K budget · −6%</div>
              </div>
            </div>

            {/* Allocation bar */}
            <div className="br-eyebrow" style={{ fontSize: 10, marginBottom: 8 }}>What this retainer covers · monthly allocation</div>
            <AllocationBar
              segments={[
                { kind: "web",     label: "Website + Williston build",   pct: 14, amount: "$1,230" },
                { kind: "paid",    label: "Paid acquisition mgmt",        pct: 36, amount: "$3,200" },
                { kind: "seo",     label: "Local SEO + reviews",          pct: 20, amount: "$1,800" },
                { kind: "recall",  label: "Recall automation",            pct: 14, amount: "$1,200" },
                { kind: "strategy", label: "Strategy + reporting",        pct: 16, amount: "$1,370" },
              ]}
            />

            {/* breakdown rows */}
            <div style={{ marginTop: 14, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {[
                ["web",      "Website + Williston build",   "$1,230 / mo", "amortised"],
                ["paid",     "Paid acquisition mgmt",        "$3,200 / mo", "incl. $2.4K ad spend"],
                ["seo",      "Local SEO + reviews",          "$1,800 / mo", "across 3 locations"],
                ["recall",   "Recall automation",            "$1,200 / mo", "Beacon · staged"],
                ["strategy", "Strategy + reporting",         "$1,370 / mo", "Sam · 6 hr/wk dedicated"],
              ].map(([kind, label, amount, sub]) => (
                <div key={label} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 10px", border: "1px solid var(--line)", borderRadius: 8 }}>
                  <WorkstreamPill kind={kind}/>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 12, fontWeight: 500 }}>{label}</div>
                    <div className="br-mono" style={{ fontSize: 10.5, color: "var(--ink-5)" }}>{sub}</div>
                  </div>
                  <span className="br-num" style={{ fontSize: 12.5, fontWeight: 600 }}>{amount}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card padding={22}>
            <div className="br-eyebrow" style={{ marginBottom: 4 }}>Payment method</div>
            <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 12, letterSpacing: "-0.005em" }}>On file</div>
            <div style={{ padding: 16, borderRadius: 10, background: "linear-gradient(135deg, #0c0a09 0%, #292524 100%)", color: "#fff", marginBottom: 14, position: "relative", height: 130 }}>
              <div style={{ fontSize: 11, opacity: .65, letterSpacing: ".1em" }}>VISA · BUSINESS</div>
              <div className="br-mono" style={{ fontSize: 18, fontWeight: 500, marginTop: 16, letterSpacing: ".06em" }}>•••• •••• •••• 4814</div>
              <div style={{ position: "absolute", bottom: 16, left: 16, right: 16, display: "flex", justifyContent: "space-between", fontSize: 10.5, color: "rgba(255,255,255,.7)" }}>
                <div>LAKESIDE FAMILY DENTAL</div>
                <div>EXP 12/27</div>
              </div>
            </div>

            <Button variant="outline" size="sm" full>Manage method</Button>

            <div style={{ marginTop: 16, padding: 12, background: "var(--surface-2)", borderRadius: 8 }}>
              <div className="br-eyebrow" style={{ fontSize: 9.5, marginBottom: 4 }}>Next invoice</div>
              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
                <span className="br-num" style={{ fontSize: 22, fontWeight: 600, letterSpacing: "-0.02em" }}>$8,800</span>
                <span className="br-mono" style={{ fontSize: 11, color: "var(--ink-5)" }}>OCT 02 · auto-charged</span>
              </div>
            </div>

            <div style={{ marginTop: 14, padding: 12, background: "var(--ok-soft)", border: "1px solid #a7f3d0", borderRadius: 8, display: "flex", gap: 8 }}>
              <Icon name="check" size={14} color="var(--ok)" strokeWidth={2.4}/>
              <div>
                <div style={{ fontSize: 12.5, fontWeight: 600, color: "var(--ok)" }}>All payments current</div>
                <div style={{ fontSize: 11.5, color: "var(--ink-3)", marginTop: 2 }}>Auto-pay · 4 invoices, 0 late.</div>
              </div>
            </div>
          </Card>
        </div>

        {/* Invoice history */}
        <SectionDivider title="Invoice history" subtitle="All your invoices, with what each one funded." count={4}/>
        <Card padding={0} style={{ overflow: "hidden" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr 1fr 1fr 80px", padding: "10px 18px", background: "var(--surface-2)", fontSize: 10.5, color: "var(--ink-5)", fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: ".06em", fontWeight: 600 }}>
            <span>Invoice</span><span>What it funded</span><span>Amount</span><span>Status</span><span/>
          </div>
          {[
            { id: "INV-0142", date: "Sept 02, 2026", desc: "Sept retainer + web build deposit",     funded: ["web", "paid", "seo", "recall", "strategy"], amount: "$15,667", status: "Paid", ok: true },
            { id: "INV-0128", date: "Aug 02, 2026",  desc: "Aug retainer",                          funded: ["paid", "seo", "strategy"], amount: "$6,370", status: "Paid", ok: true },
            { id: "INV-0114", date: "Jul 02, 2026",  desc: "Jul retainer + onboarding (Bridge fee)", funded: ["paid", "strategy"], amount: "$5,570", status: "Paid", ok: true },
            { id: "INV-0103", date: "Jun 18, 2026",  desc: "Compass strategy retainer (initial)",   funded: ["strategy"], amount: "$2,500", status: "Paid", ok: true },
          ].map((inv, i) => (
            <div key={inv.id} style={{ display: "grid", gridTemplateColumns: "1fr 2fr 1fr 1fr 80px", padding: "14px 18px", borderTop: "1px solid var(--line-faint)", alignItems: "center", gap: 10 }}>
              <div>
                <div className="br-mono" style={{ fontSize: 12, fontWeight: 600 }}>{inv.id}</div>
                <div style={{ fontSize: 11, color: "var(--ink-4)", marginTop: 2 }}>{inv.date}</div>
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 500 }}>{inv.desc}</div>
                <div style={{ display: "flex", gap: 4, marginTop: 4, flexWrap: "wrap" }}>
                  {inv.funded.map((k) => <WorkstreamPill key={k} kind={k}/>)}
                </div>
              </div>
              <div className="br-num" style={{ fontSize: 14, fontWeight: 600 }}>{inv.amount}</div>
              <Pill tone="ok" size="sm" icon="check">{inv.status}</Pill>
              <Button variant="ghost" size="sm" icon="file">PDF</Button>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}

function AllocationBar({ segments }) {
  const colors = { web: "#4f46e5", paid: "#f59e0b", seo: "#10b981", recall: "#a78bfa", strategy: "#6b7280" };
  return (
    <div>
      <div style={{ display: "flex", height: 32, borderRadius: 8, overflow: "hidden", boxShadow: "inset 0 0 0 1px var(--line)" }}>
        {segments.map((s) => (
          <div key={s.label} title={`${s.label}: ${s.amount}`} style={{
            width: `${s.pct}%`, background: colors[s.kind], display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 10.5, fontWeight: 600, color: "#fff", letterSpacing: ".02em",
          }}>{s.pct}%</div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 06 — Weekly Summary ("This week")
// ─────────────────────────────────────────────────────────────
function DSummary() {
  return (
    <div className="br-frame">
      <DockTopBar active="summary"/>
      <div className="br-scroll" style={{ flex: 1, overflowY: "auto" }}>
        <div style={{ padding: "36px 32px 28px", borderBottom: "1px solid var(--line)", background: "linear-gradient(180deg, var(--surface-2) 0%, var(--bg) 100%)" }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
            <div>
              <Pill tone="accent" size="sm" icon="star">Weekly summary · Week 3</Pill>
              <h1 className="br-h1" style={{ fontSize: 32, marginTop: 14, marginBottom: 6, letterSpacing: "-0.025em" }}>
                What we did for you<br/>
                <span style={{ color: "var(--ink-4)" }}>between Sept 16 → Sept 22.</span>
              </h1>
              <p className="br-bodyLg" style={{ margin: 0, maxWidth: 720 }}>
                A plain-language read of the week. Sent Mondays at 9am — and waiting for you here whenever you want it.
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
              <Button variant="outline" size="sm" icon="mail">Forward to team</Button>
              <Button variant="ghost" size="sm" icon="file">Download PDF</Button>
            </div>
          </div>
        </div>

        <div style={{ padding: "28px 32px 36px", maxWidth: 980 }}>
          {/* Headline numbers */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 32 }}>
            {[
              ["11", "Shipped",         "+3 vs. last week"],
              ["6",  "In flight",       "Mid-stage work"],
              ["2",  "Awaiting you",    "Avg. age: 6 hours"],
              ["1",  "Blocked",         "Dentrix API access"],
            ].map(([n, l, s]) => (
              <div key={l} style={{ padding: 16, background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 12 }}>
                <div className="br-num" style={{ fontSize: 32, fontWeight: 600, letterSpacing: "-0.025em" }}>{n}</div>
                <div style={{ fontSize: 13, fontWeight: 500, marginTop: 2 }}>{l}</div>
                <div style={{ fontSize: 11.5, color: "var(--ink-4)", marginTop: 1 }}>{s}</div>
              </div>
            ))}
          </div>

          {/* The narrative */}
          <SummarySection
            badge="01 · The headline"
            title="Williston design is on schedule, paid is performing under target CPL, recall is the only friction."
            body={
              <>
                <p>The week's centerpiece is the Williston landing page moving from wireframes to first visual pass — that's the asset everything else funnels toward, and it's on track for Thursday's review.</p>
                <p>On the paid side, CPL came in at <strong style={{ color: "var(--ink)" }}>$76 against an $84 target</strong>. The 'gentle care' angle is meaningfully outperforming the 'new location' angle on click-through, so we've shifted 60% of spend behind the winner without changing daily budget.</p>
                <p>The only thing in our way is recall — we have the Beacon workflow staged and ready, but it can't talk to your Dentrix instance until your IT forwards API credentials. We've flagged it in the feed.</p>
              </>
            }
          />

          <SummarySection
            badge="02 · Shipped"
            title="The eleven things that left our hands this week."
            body={
              <ul style={{ paddingLeft: 16, margin: 0, lineHeight: 1.8, color: "var(--ink-3)" }}>
                <li>Williston landing page wireframes — internally signed off.</li>
                <li>Three Meta ad creatives — one square ('Gentle care'), one vertical ('Kids who don't dread'), one square ('New location'). Two pending your approval.</li>
                <li>Sept Tip Tuesday post — scheduled.</li>
                <li>Google Business Profile photo refresh, all three locations.</li>
                <li>Insurance & costs page — copy v2.</li>
                <li>Recall automation scope doc (staged in Beacon).</li>
                <li>Spend reallocation: 60% to the 'gentle care' creative.</li>
                <li>Two blog drafts written, one in internal review.</li>
                <li>Compass-flagged open question: insurance mix — drafted answer for you.</li>
              </ul>
            }
          />

          <SummarySection
            badge="03 · Performance pulse"
            body={
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
                {[
                  ["Meta CPL",        "$76",  "target $84", "ok",  -10],
                  ["Click-through",   "3.4%", "var. by ad", "ok",  +18],
                  ["Williston GBP views", "1,420", "+62% wow", "ok", +62],
                  ["Bookings · week", "32",  "Williston: 6 (was 2)", "ok", +50],
                ].map(([k, v, s, t, delta]) => (
                  <div key={k} style={{ padding: 14, background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 10 }}>
                    <div className="br-eyebrow" style={{ fontSize: 9.5 }}>{k}</div>
                    <div className="br-num" style={{ fontSize: 22, fontWeight: 600, letterSpacing: "-0.02em", marginTop: 4 }}>{v}</div>
                    <div style={{ fontSize: 11, color: t === "ok" ? "var(--ok)" : "var(--ink-4)", marginTop: 2, display: "flex", alignItems: "center", gap: 4 }}>
                      <span>{delta > 0 ? "↑" : "↓"} {Math.abs(delta)}%</span>
                      <span style={{ color: "var(--ink-4)" }}>· {s}</span>
                    </div>
                  </div>
                ))}
              </div>
            }
            title="The early numbers, with context."
          />

          <SummarySection
            badge="04 · Next week"
            title="What you'll see between Sept 23 → Sept 29."
            body={
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {[
                  ["web",  "Williston landing — full visual review (Thursday)"],
                  ["web",  "Burlington + S. Burlington page designs begin"],
                  ["paid", "Google search ad set live (kid-friendly dentist terms)"],
                  ["seo",  "First batch of pediatric blog posts published"],
                  ["recall", "If we get Dentrix access: Beacon workflow goes into testing"],
                ].map(([k, l]) => (
                  <div key={l} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", border: "1px solid var(--line)", borderRadius: 8, background: "var(--surface)" }}>
                    <WorkstreamPill kind={k}/>
                    <span style={{ fontSize: 13, color: "var(--ink-2)" }}>{l}</span>
                  </div>
                ))}
              </div>
            }
          />

          {/* Sign-off */}
          <div style={{ marginTop: 36, padding: 22, background: "var(--surface-2)", borderRadius: 14, display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ width: 48, height: 48, borderRadius: 999, background: "#7c2d12", color: "#fff", display: "grid", placeItems: "center", fontWeight: 600 }}>SP</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600, letterSpacing: "-0.005em" }}>Sam Patel · your strategy lead</div>
              <div style={{ fontSize: 12.5, color: "var(--ink-4)" }}>I read this with my coffee Monday morning — happy to walk through anything that's not clear. Just hit reply.</div>
            </div>
            <Button variant="outline" size="md" icon="mail">Message Sam</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function SummarySection({ badge, title, body }) {
  return (
    <section style={{ marginBottom: 36 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
        <span className="br-mono" style={{ fontSize: 11, color: "var(--ink-5)", letterSpacing: ".06em" }}>{badge}</span>
        <div style={{ flex: 1, height: 1, background: "var(--line)" }}/>
      </div>
      {title && <h2 className="br-h2" style={{ fontSize: 22, marginBottom: 12, letterSpacing: "-0.02em", lineHeight: 1.25 }}>{title}</h2>}
      <div style={{ fontSize: 14.5, color: "var(--ink-3)", lineHeight: 1.65 }}>{body}</div>
    </section>
  );
}

Object.assign(window, { DProject, DBilling, DSummary, StageStripBig, AllocationBar, SummarySection });
