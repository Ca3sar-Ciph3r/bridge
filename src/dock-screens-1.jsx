/* global React, Icon, Button, Pill, Card, Field, Input, Toggle, AICallout,
   DockWordmark, DockTopBar, WhyCallout, StageStrip, WorkstreamPill, StatusDot, AssetThumb, AssetCard, FeedItem */
// Dock — screens part 1: Overview, Live Feed, Asset Hub

// ─────────────────────────────────────────────────────────────
// 01 — Executive Overview
// ─────────────────────────────────────────────────────────────
function DOverview() {
  return (
    <div className="br-frame">
      <DockTopBar active="overview"/>
      <div className="br-scroll" style={{ flex: 1, overflowY: "auto", padding: "28px 32px 36px" }}>
        {/* Hero */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
            <span className="br-mono" style={{ fontSize: 11, color: "var(--ink-5)" }}>WEEK 3 · ENGAGEMENT START SEPT 02</span>
            <span style={{ width: 4, height: 4, borderRadius: 999, background: "var(--ink-5)" }}/>
            <Pill tone="ok" size="sm" icon="check">On track</Pill>
          </div>
          <h1 className="br-h1" style={{ fontSize: 30, marginBottom: 8, letterSpacing: "-0.025em" }}>
            Hi Sarah — here's where Williston is.
          </h1>
          <p className="br-bodyLg" style={{ margin: 0, maxWidth: 720 }}>
            Three workstreams in motion, two assets need your eyes today, and the website's first design pass lands Thursday. Everything else is humming.
          </p>
        </div>

        {/* KPI row — actual delivery numbers, not vanity */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 12, marginBottom: 28 }}>
          {[
            ["Active workstreams",  "3 / 3",  "All running",        "ok"],
            ["Awaiting your review", "2",     "Ads · Landing copy", "warn"],
            ["Shipped this week",   "11",     "+3 vs. last wk",     "ok"],
            ["Blocked",             "1",      "Dentrix API access", "err"],
            ["Next milestone",      "Thu",    "Williston design v1","neutral"],
          ].map(([k, v, s, tone]) => (
            <div key={k} style={{ padding: 16, background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 12, boxShadow: "var(--shadow-1)" }}>
              <div className="br-eyebrow" style={{ fontSize: 10 }}>{k}</div>
              <div className="br-num" style={{ fontSize: 24, fontWeight: 600, letterSpacing: "-0.025em", marginTop: 4, color: tone === "err" ? "var(--err)" : "var(--ink)" }}>{v}</div>
              <div style={{ fontSize: 11.5, color: tone === "ok" ? "var(--ok)" : tone === "err" ? "var(--err)" : tone === "warn" ? "var(--warn)" : "var(--ink-4)", marginTop: 2, fontWeight: 500 }}>{s}</div>
            </div>
          ))}
        </div>

        {/* Three workstream cards */}
        <div className="br-eyebrow" style={{ marginBottom: 12 }}>Active workstreams</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14, marginBottom: 28 }}>
          <WorkstreamSummary
            kind="web"
            name="Website refresh + Williston landing"
            stage="Design"
            stages={["Planning", "Design", "Build", "QA", "Launch"]}
            current={1}
            eta="Launch Oct 14"
            nextStep="First design pass ready Thursday for your review"
            ratio={[7, 22]}
            assets={["landing-page"]}
          />
          <WorkstreamSummary
            kind="paid"
            name="Meta + Google paid acquisition"
            stage="Optimising"
            stages={["Setup", "Build", "Launch", "Optimise", "Scale"]}
            current={3}
            eta="Live · ongoing"
            nextStep="2 new ad variants pending your approval"
            ratio={[42, 60]}
            metric={["$3.2K / mo spend", "CPL $76 · target $84"]}
            assets={["ad-square", "ad-vertical"]}
          />
          <WorkstreamSummary
            kind="recall"
            name="Recall automation (Beacon)"
            stage="Build"
            stages={["Scope", "Build", "Test", "Launch"]}
            current={1}
            eta="Launch Oct 28"
            nextStep="Awaiting Dentrix API credentials from your IT"
            ratio={[3, 9]}
            blocked
          />
        </div>

        {/* Two columns: needs-you + this week */}
        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 14 }}>
          <Card padding={20}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
              <div>
                <div className="br-eyebrow">Needs you · today</div>
                <div style={{ fontSize: 15, fontWeight: 600, marginTop: 4, letterSpacing: "-0.005em" }}>2 items waiting — about 8 minutes total</div>
              </div>
              <Button variant="outline" size="sm" iconRight="arrow_right">Open review hub</Button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {[
                { kind: "paid", title: "Meta ads — Williston launch (v2, 3 creatives)",  meta: "Sam Patel · 2h ago", time: "~5 min" },
                { kind: "web",  title: "Williston landing page — hero copy + CTA",        meta: "Jess Kwon · 4h ago", time: "~3 min" },
              ].map((r) => (
                <div key={r.title} style={{
                  display: "flex", alignItems: "center", gap: 12, padding: "12px 14px",
                  background: "var(--warn-soft)", border: "1px solid #fcd34d", borderRadius: 10,
                }}>
                  <div style={{ width: 32, height: 32, borderRadius: 7, background: "#fff", border: "1px solid #fcd34d", display: "grid", placeItems: "center", color: "var(--warn)", flexShrink: 0 }}>
                    <Icon name="alert" size={15}/>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>{r.title}</div>
                    <div className="br-mono" style={{ fontSize: 10.5, color: "var(--ink-4)", marginTop: 2 }}>{r.meta} · {r.time}</div>
                  </div>
                  <WorkstreamPill kind={r.kind}/>
                  <Button variant="primary" size="sm" iconRight="arrow_right">Review</Button>
                </div>
              ))}
              <div style={{ marginTop: 4 }}>
                <WhyCallout ref_="Compass · Strategy §02">
                  Every approval routes back to "<strong style={{ color: "var(--ink)" }}>Williston first, then let the system pull the other two with it.</strong>" — you don't have to remember why something exists, we'll show you.
                </WhyCallout>
              </div>
            </div>
          </Card>

          <Card padding={20}>
            <div className="br-eyebrow" style={{ marginBottom: 4 }}>This week's pulse</div>
            <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 16, letterSpacing: "-0.005em" }}>Sept 16 → Sept 22</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                ["Shipped", "11", ["3 ad creatives", "Williston landing wires", "Recall scope doc"]],
                ["In flight", "6", ["Design pass · Williston", "GBP photo refresh", "Ad copy A/B v3"]],
                ["Planned next wk", "5", ["Landing copy review", "Hero photography", "Meta TT pilot"]],
              ].map(([label, n, items]) => (
                <div key={label} style={{ display: "flex", gap: 12 }}>
                  <div style={{ minWidth: 100 }}>
                    <div style={{ fontSize: 12, fontWeight: 500, color: "var(--ink-3)" }}>{label}</div>
                    <div className="br-num" style={{ fontSize: 22, fontWeight: 600, letterSpacing: "-0.025em" }}>{n}</div>
                  </div>
                  <div style={{ flex: 1, paddingTop: 4 }}>
                    {items.map((it) => (
                      <div key={it} style={{ fontSize: 12.5, color: "var(--ink-3)", marginBottom: 2, display: "flex", alignItems: "center", gap: 6 }}>
                        <span style={{ width: 4, height: 4, borderRadius: 999, background: "var(--ink-5)" }}/>{it}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <Button variant="ghost" size="sm" iconRight="arrow_right" full style={{ marginTop: 14, justifyContent: "center" }}>Open weekly summary</Button>
          </Card>
        </div>
      </div>
    </div>
  );
}

function WorkstreamSummary({ kind, name, stage, stages, current, eta, nextStep, ratio, metric, assets, blocked }) {
  return (
    <div style={{ padding: 18, background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 14, boxShadow: "var(--shadow-1)", display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8 }}>
        <WorkstreamPill kind={kind}/>
        <span className="br-mono" style={{ fontSize: 10.5, color: "var(--ink-5)" }}>{eta}</span>
      </div>
      <div>
        <div style={{ fontSize: 14, fontWeight: 600, letterSpacing: "-0.005em", lineHeight: 1.3 }}>{name}</div>
        <div style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 8 }}>
          <StatusDot state={blocked ? "blocked" : current === stages.length - 1 ? "live" : "in_progress"}/>
          <span style={{ fontSize: 11.5, color: "var(--ink-4)" }}>· stage <span style={{ color: "var(--ink-2)", fontWeight: 500 }}>{stage}</span></span>
        </div>
      </div>
      <div style={{ paddingTop: 4 }}>
        <StageStrip stages={stages} current={current} blocked={blocked}/>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8, paddingTop: 4 }}>
        <div style={{ flex: 1, height: 4, background: "var(--surface-3)", borderRadius: 999, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${(ratio[0] / ratio[1]) * 100}%`, background: blocked ? "var(--warn)" : "var(--ink)", borderRadius: 999 }}/>
        </div>
        <span className="br-mono br-num" style={{ fontSize: 10.5, color: "var(--ink-4)" }}>{ratio[0]}/{ratio[1]}</span>
      </div>
      {assets && (
        <div style={{ display: "flex", gap: 8, padding: 10, background: "var(--surface-2)", borderRadius: 8, overflow: "hidden" }}>
          {assets.map((a, i) => <div key={i} style={{ flexShrink: 0 }}><AssetThumb kind={a} scale={0.42}/></div>)}
        </div>
      )}
      {metric && (
        <div style={{ display: "flex", gap: 14, padding: "8px 0", borderTop: "1px solid var(--line-faint)" }}>
          {metric.map((m, i) => (
            <div key={i} style={{ fontSize: 11.5 }}>
              <span className="br-mono br-num" style={{ color: "var(--ink-2)", fontWeight: 600 }}>{m.split(" · ")[0]}</span>
              <div style={{ fontSize: 10, color: "var(--ink-5)" }}>{m.split(" · ")[1]}</div>
            </div>
          ))}
        </div>
      )}
      <div style={{ padding: "10px 12px", background: "var(--surface-2)", borderRadius: 8, fontSize: 12.5, color: "var(--ink-2)" }}>
        <span className="br-mono" style={{ fontSize: 10, color: "var(--ink-5)", textTransform: "uppercase", letterSpacing: ".06em", display: "block", marginBottom: 2 }}>Next step</span>
        {nextStep}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 02 — Live Workstream Feed
// ─────────────────────────────────────────────────────────────
function DFeed() {
  return (
    <div className="br-frame">
      <DockTopBar active="feed"/>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 0, flex: 1, minHeight: 0 }}>
        <div className="br-scroll" style={{ overflowY: "auto", padding: "28px 28px 32px 32px" }}>
          <div style={{ marginBottom: 22, display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
            <div>
              <Pill tone="ok" size="sm"><span style={{ width: 5, height: 5, borderRadius: 999, background: "var(--ok)", animation: "br-pulse-soft 1.4s ease-in-out infinite", display: "inline-block", marginRight: 4 }}/>Live</Pill>
              <h1 className="br-h1" style={{ fontSize: 26, marginTop: 8, marginBottom: 4 }}>Everything happening today.</h1>
              <p className="br-body" style={{ margin: 0 }}>An honest, chronological account. Nothing is hidden, nothing is padded.</p>
            </div>
            <div style={{ display: "flex", gap: 6 }}>
              <Button variant="outline" size="sm" icon="sliders">Filter</Button>
              <Button variant="ghost" size="sm" icon="info">What is this?</Button>
            </div>
          </div>

          {/* Day separators + feed items */}
          <DaySeparator label="Today · Sept 18" sub="Wednesday"/>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <FeedItem
              time="2:14 PM"
              kind="paid"
              status="waiting_you"
              title="3 new Meta ad creatives are ready for your eyes."
              body="Variations on the Williston launch — square + vertical formats, each leaning on different angles (new location, gentle care, family-first). We need your approval on at least 2 before Friday's spend ramp."
              asset={{ kind: "ad-square", title: "Williston launch · 3 variants · v2",  meta: "1080×1080 · 1080×1920 · Meta + Google Display" }}
              why={{ ref: "Strategy §02", body: "Williston-only paid acquisition. Burlington and S. Burlington are not targeted." }}
              by={{ name: "Sam Patel · Strategy lead", initials: "SP", bg: "#7c2d12" }}
              action={
                <>
                  <Button variant="primary" size="sm" icon="check">Approve all 3</Button>
                  <Button variant="outline" size="sm">Open in review hub</Button>
                </>
              }
            />

            <FeedItem
              time="11:08 AM"
              kind="web"
              status="in_progress"
              title="Williston landing page — design pass v1 underway."
              body="Jess is on it. The hero is leaning into 'gentle, predictable, walkable from downtown Williston' — we'll have a clickable preview ready for you Thursday morning."
              by={{ name: "Jess Kwon · Designer", initials: "JK", bg: "#0c4a6e" }}
            />

            <FeedItem
              time="9:42 AM"
              kind="web"
              status="waiting_you"
              title="Hero copy + primary CTA need your gut-check."
              body="Three options below. Pick one — or send notes and we'll iterate. We've biased toward language a parent would use, not language a dentist would."
              asset={{ kind: "blog", title: "Three hero variants · A / B / C", meta: "Doc · 0.4KB · 3 min read" }}
              why={{ ref: "Compass · Tone §03", body: "Family-warm voice, calibrated to Vermont parents." }}
              by={{ name: "Mike Diaz · Copywriter", initials: "MD", bg: "#065f46" }}
              action={
                <>
                  <Button variant="primary" size="sm" icon="check">Pick A</Button>
                  <Button variant="outline" size="sm">Pick B</Button>
                  <Button variant="outline" size="sm">Pick C</Button>
                  <Button variant="ghost" size="sm">Send notes</Button>
                </>
              }
            />

            <DaySeparator label="Yesterday · Sept 17" sub="Tuesday"/>

            <FeedItem
              time="4:55 PM"
              kind="paid"
              status="done"
              title="Ad performance check — week 2."
              body="CPL is at $76, comfortably under our $84 target. Click-through is highest on the 'gentle care' angle (3.4%), lowest on 'new location' (1.9%). We're moving 60% of spend to the winner."
              by={{ name: "Sam Patel · Strategy lead", initials: "SP", bg: "#7c2d12" }}
            />

            <FeedItem
              time="2:30 PM"
              kind="recall"
              status="blocked"
              title="Recall automation needs Dentrix API access."
              body="We've staged the workflow in Beacon, but we can't connect to the practice database without IT credentials. Could you forward this to whoever manages Dentrix?"
              why={{ ref: "Scope §04 · Recall", body: "Recovers ~$92K in latent recall revenue. Funds the engagement from M5." }}
              by={{ name: "Mike Diaz · Implementation", initials: "MD", bg: "#065f46" }}
              action={
                <>
                  <Button variant="primary" size="sm" icon="mail">Forward to IT</Button>
                  <Button variant="ghost" size="sm">I'll handle it</Button>
                </>
              }
            />

            <FeedItem
              time="10:14 AM"
              kind="web"
              status="done"
              title="Williston landing — wireframes signed off internally."
              body="Stage moves to Design. ETA: visual pass ready Thursday."
              by={{ name: "Jess Kwon · Designer", initials: "JK", bg: "#0c4a6e" }}
            />
          </div>
        </div>

        {/* Right rail */}
        <aside style={{ borderLeft: "1px solid var(--line)", background: "var(--bg)", padding: "28px 24px 24px", display: "flex", flexDirection: "column", gap: 20 }}>
          <div>
            <div className="br-eyebrow" style={{ marginBottom: 10 }}>Filters</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {[
                ["All",    true],
                ["Needs you", false],
                ["Web",    false],
                ["Paid",   false],
                ["Recall", false],
                ["Done",   false],
              ].map(([l, a]) => (
                <span key={l} style={{
                  padding: "4px 10px", borderRadius: 999, fontSize: 12,
                  background: a ? "var(--ink)" : "var(--surface)",
                  color: a ? "#fff" : "var(--ink-2)",
                  border: a ? "1px solid var(--ink)" : "1px solid var(--line-strong)",
                  cursor: "pointer", fontWeight: 500,
                }}>{l}</span>
              ))}
            </div>
          </div>

          <div>
            <div className="br-eyebrow" style={{ marginBottom: 10 }}>Your team</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {[
                ["Sam Patel", "Strategy lead", "SP", "#7c2d12", "online"],
                ["Jess Kwon", "Designer",      "JK", "#0c4a6e", "online"],
                ["Mike Diaz", "Implementation","MD", "#065f46", "away"],
              ].map(([n, role, ini, bg, presence]) => (
                <div key={n} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ position: "relative", width: 30, height: 30 }}>
                    <div style={{ width: 30, height: 30, borderRadius: 999, background: bg, color: "#fff", display: "grid", placeItems: "center", fontSize: 11, fontWeight: 600 }}>{ini}</div>
                    <span style={{ position: "absolute", bottom: -1, right: -1, width: 9, height: 9, borderRadius: 999, background: presence === "online" ? "var(--ok)" : "var(--warn)", border: "2px solid var(--bg)" }}/>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 12.5, fontWeight: 500 }}>{n}</div>
                    <div style={{ fontSize: 11, color: "var(--ink-4)" }}>{role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ padding: 14, background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 10 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Icon name="sparkle" size={14} color="var(--ai)"/>
              <span style={{ fontSize: 12.5, fontWeight: 600 }}>Heads-up from Dock</span>
            </div>
            <div style={{ fontSize: 12, color: "var(--ink-3)", lineHeight: 1.55, marginTop: 6 }}>
              At your current pace, you'll spend about <strong style={{ color: "var(--ink)" }}>~12 min/week</strong> on Dock. That's the lowest in our portfolio — and the project's on track.
            </div>
          </div>

          <div style={{ marginTop: "auto", fontSize: 10.5, color: "var(--ink-5)" }}>
            Feed updates in real time · 23 events today
          </div>
        </aside>
      </div>
    </div>
  );
}

function DaySeparator({ label, sub }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "20px 0 10px" }}>
      <div style={{ fontSize: 12, fontWeight: 600, color: "var(--ink-2)", letterSpacing: "-0.005em" }}>{label}</div>
      <span className="br-mono" style={{ fontSize: 10.5, color: "var(--ink-5)" }}>{sub}</span>
      <div style={{ flex: 1, height: 1, background: "var(--line)" }}/>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 03 — Asset Review Hub
// ─────────────────────────────────────────────────────────────
function DAssets() {
  return (
    <div className="br-frame">
      <DockTopBar active="assets"/>
      <div className="br-scroll" style={{ flex: 1, overflowY: "auto", padding: "28px 32px 32px" }}>
        <div style={{ marginBottom: 18, display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
          <div>
            <Pill tone="warn" size="sm" icon="alert">3 awaiting your approval</Pill>
            <h1 className="br-h1" style={{ fontSize: 26, marginTop: 8, marginBottom: 4 }}>Things for you to look at.</h1>
            <p className="br-body" style={{ margin: 0 }}>Approve, request changes, or ask. Each item shows you why it exists and what we expect it to do.</p>
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            <Button variant="outline" size="sm" icon="sliders">View</Button>
            <Button variant="ghost" size="sm">All workstreams</Button>
          </div>
        </div>

        {/* tabs / filters */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 18, flexWrap: "wrap" }}>
          {[
            ["Needs you", 3,  true,  "var(--warn)"],
            ["In review", 4,  false, "var(--ai)"],
            ["Approved",  19, false, "var(--ok)"],
            ["Live",      11, false, "var(--ok)"],
            ["All",       46, false, "var(--ink-3)"],
          ].map(([l, n, a, c]) => (
            <span key={l} style={{
              display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 12px", borderRadius: 7,
              background: a ? "var(--surface)" : "transparent",
              border: a ? "1px solid var(--line-strong)" : "1px solid transparent",
              boxShadow: a ? "var(--shadow-1)" : "none",
              fontSize: 13, fontWeight: a ? 600 : 500, color: a ? "var(--ink)" : "var(--ink-3)",
              cursor: "pointer",
            }}>
              <span style={{ width: 7, height: 7, borderRadius: 999, background: c }}/> {l}
              <span className="br-mono" style={{ fontSize: 10.5, color: "var(--ink-5)", marginLeft: 2 }}>{n}</span>
            </span>
          ))}
        </div>

        {/* Awaiting section */}
        <SectionDivider title="Awaiting your approval" subtitle="The three below are time-sensitive." count={3}/>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14, marginBottom: 28 }}>
          <AssetCard
            thumbKind="ad-square"
            title="Meta — Williston launch · 'New location' angle"
            workstream="paid"
            status="waiting_you"
            version="v2"
            needsBy="Needed by Fri"
            comments={2}
            why={{ ref: "Strategy §02", body: "Williston-only acquisition. Awareness phase." }}
          />
          <AssetCard
            thumbKind="ad-vertical"
            title="Meta Stories — 'Kids who don't dread the dentist'"
            workstream="paid"
            status="waiting_you"
            version="v2"
            needsBy="Needed by Fri"
            comments={1}
            why={{ ref: "ICP §01", body: "Speaks to your primary ICP: families with kids 3–14." }}
          />
          <AssetCard
            thumbKind="landing-page"
            title="Williston landing page — hero copy & layout"
            workstream="web"
            status="waiting_you"
            version="v1"
            needsBy="Needed by Mon"
            comments={0}
            why={{ ref: "Funnel §01", body: "Anchors the Meta + Google clicks. Single dedicated page." }}
          />
        </div>

        {/* In review */}
        <SectionDivider title="In internal review" subtitle="Our team is iterating — no action needed from you." count={4}/>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 14, marginBottom: 28 }}>
          {[
            { thumbKind: "post",  title: "Tip Tuesday — pediatric calm tips",       workstream: "seo",     version: "v1" },
            { thumbKind: "blog",  title: "Blog · minimal-fluoride sealants",        workstream: "seo",     version: "v3" },
            { thumbKind: "ad-square", title: "Google search ad — 'kid-friendly dentist'", workstream: "paid", version: "v1" },
            { thumbKind: "video", title: "Williston walkthrough — Dr. Lin",         workstream: "web",     version: "v1" },
          ].map((a) => <AssetCard key={a.title} {...a} status="in_review"/>)}
        </div>

        {/* Recently approved */}
        <SectionDivider title="Recently approved" subtitle="Already shipped or scheduled. Saved for your reference." count={5}/>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr", gap: 12 }}>
          {[
            { kind: "ad-square", label: "Meta · 'Gentle care'",      ws: "paid", ts: "Sept 14" },
            { kind: "post",      label: "Sept Tip Tuesday",          ws: "seo",  ts: "Sept 12" },
            { kind: "landing-page", label: "Williston wireframes",   ws: "web",  ts: "Sept 11" },
            { kind: "ad-vertical", label: "Reel · families · v1",    ws: "paid", ts: "Sept 09" },
            { kind: "blog",      label: "Insurance FAQ",             ws: "seo",  ts: "Sept 06" },
          ].map((a) => (
            <div key={a.label} style={{ padding: 10, background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 10, display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ height: 100, display: "grid", placeItems: "center", background: "var(--surface-2)", borderRadius: 6, overflow: "hidden" }}>
                <AssetThumb kind={a.kind} scale={0.42}/>
              </div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 500 }}>{a.label}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 4 }}>
                  <WorkstreamPill kind={a.ws}/>
                  <span className="br-mono" style={{ fontSize: 10, color: "var(--ink-5)" }}>{a.ts}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SectionDivider({ title, subtitle, count }) {
  return (
    <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 14 }}>
      <div>
        <div style={{ fontSize: 14, fontWeight: 600, letterSpacing: "-0.005em" }}>{title}</div>
        <div style={{ fontSize: 12, color: "var(--ink-4)" }}>{subtitle}</div>
      </div>
      <span className="br-mono" style={{ fontSize: 11, color: "var(--ink-5)" }}>{count} items</span>
      <div style={{ flex: 1, height: 1, background: "var(--line)" }}/>
    </div>
  );
}

Object.assign(window, { DOverview, DFeed, DAssets, WorkstreamSummary, DaySeparator, SectionDivider });
