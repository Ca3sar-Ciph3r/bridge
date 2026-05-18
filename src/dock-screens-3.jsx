/* global React, Icon, Button, Pill, Card, Field, Input, Textarea, Toggle, AICallout,
   DockWordmark, DockTopBar, WhyCallout, StageStrip, WorkstreamPill, StatusDot, AssetThumb, AssetCard, FeedItem, SectionDivider */
// Dock — screens part 3: asset detail, empty state, internal ops, mobile

// ─────────────────────────────────────────────────────────────
// 07 — Single asset detail (approve / request changes)
// ─────────────────────────────────────────────────────────────
function DAssetDetail() {
  return (
    <div className="br-frame">
      <DockTopBar active="assets"/>
      <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 380px", minHeight: 0 }}>
        {/* Left — preview canvas */}
        <div style={{ background: "linear-gradient(180deg, var(--surface-2) 0%, var(--bg) 100%)", overflow: "hidden", display: "flex", flexDirection: "column" }}>
          {/* breadcrumb + actions */}
          <div style={{ padding: "14px 28px", borderBottom: "1px solid var(--line)", display: "flex", alignItems: "center", gap: 12, background: "var(--bg)" }}>
            <Button variant="ghost" size="sm" icon="arrow_left">Back</Button>
            <span style={{ width: 1, height: 14, background: "var(--line)" }}/>
            <span style={{ fontSize: 12.5, color: "var(--ink-4)" }}>Assets · Awaiting · </span>
            <span style={{ fontSize: 12.5, fontWeight: 600 }}>Meta — Williston launch · v2</span>
            <div style={{ flex: 1 }}/>
            <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
              <span className="br-mono" style={{ fontSize: 10.5, color: "var(--ink-5)" }}>1 / 3</span>
              <Button variant="outline" size="sm" icon="arrow_left"/>
              <Button variant="outline" size="sm" iconRight="arrow_right"/>
            </div>
          </div>

          <div style={{ flex: 1, display: "grid", placeItems: "center", padding: 32, overflow: "auto" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 18 }}>
              <div style={{ padding: 28, background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 18, boxShadow: "var(--shadow-3)", position: "relative" }}>
                {/* annotation marker */}
                <div style={{ position: "absolute", top: 80, right: -16, width: 32, height: 32, borderRadius: 999, background: "#fff", border: "1.5px solid var(--accent)", display: "grid", placeItems: "center", boxShadow: "0 4px 12px -2px rgba(79,70,229,.3)" }}>
                  <span className="br-num" style={{ fontSize: 12, fontWeight: 700, color: "var(--accent)" }}>1</span>
                </div>
                <div style={{ position: "absolute", bottom: 60, left: -16, width: 32, height: 32, borderRadius: 999, background: "#fff", border: "1.5px solid var(--accent)", display: "grid", placeItems: "center", boxShadow: "0 4px 12px -2px rgba(79,70,229,.3)" }}>
                  <span className="br-num" style={{ fontSize: 12, fontWeight: 700, color: "var(--accent)" }}>2</span>
                </div>
                <AssetThumb kind="ad-square" scale={1.4}/>
              </div>
              <div className="br-mono" style={{ fontSize: 11, color: "var(--ink-5)" }}>1080 × 1080 · Meta + IG · 280 KB · 'Gentle care' angle</div>
            </div>
          </div>

          {/* Version strip */}
          <div style={{ padding: "12px 28px", borderTop: "1px solid var(--line)", background: "var(--bg)", display: "flex", alignItems: "center", gap: 12 }}>
            <span className="br-eyebrow">Versions</span>
            <div style={{ flex: 1, display: "flex", gap: 8 }}>
              {[
                { v: "v3", label: "Current", note: "Tightened headline, added warmth", active: true, by: "SP · 2h ago" },
                { v: "v2", label: "Previous", note: "Initial draft after copy review",  by: "SP · 1d ago" },
                { v: "v1", label: "Original", note: "Auto-generated from Compass brief",  by: "Compass · Sept 11" },
              ].map((ver) => (
                <div key={ver.v} style={{
                  padding: "8px 12px", borderRadius: 8,
                  background: ver.active ? "var(--surface)" : "transparent",
                  border: ver.active ? "1.5px solid var(--accent)" : "1px solid var(--line)",
                  cursor: "pointer", minWidth: 160,
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span className="br-mono" style={{ fontSize: 11, fontWeight: 700, color: ver.active ? "var(--accent)" : "var(--ink-3)" }}>{ver.v}</span>
                    <span style={{ fontSize: 11, color: "var(--ink-4)" }}>{ver.label}</span>
                  </div>
                  <div style={{ fontSize: 11, color: "var(--ink-4)", marginTop: 2, lineHeight: 1.3 }}>{ver.note}</div>
                  <div className="br-mono" style={{ fontSize: 10, color: "var(--ink-5)", marginTop: 4 }}>{ver.by}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right — review panel */}
        <aside style={{ borderLeft: "1px solid var(--line)", background: "var(--surface)", display: "flex", flexDirection: "column", overflow: "hidden" }}>
          <div style={{ padding: 22, borderBottom: "1px solid var(--line)" }}>
            <Pill tone="warn" size="sm" icon="alert">Awaiting your approval</Pill>
            <h2 className="br-h3" style={{ fontSize: 18, marginTop: 10, marginBottom: 6 }}>Meta launch ad · Williston</h2>
            <div style={{ display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap" }}>
              <WorkstreamPill kind="paid"/>
              <span className="br-mono" style={{ fontSize: 10.5, color: "var(--ink-5)" }}>v3 · 1080×1080</span>
            </div>
            <div style={{ marginTop: 12, padding: 12, background: "var(--ai-soft)", border: "1px solid #ddd6fe", borderRadius: 8, fontSize: 12, color: "var(--ink-2)", lineHeight: 1.55 }}>
              <span className="br-mono" style={{ fontSize: 10, color: "var(--ai)", textTransform: "uppercase", letterSpacing: ".06em", fontWeight: 600, display: "block", marginBottom: 4 }}>Why this exists · Compass §02</span>
              Williston-only paid acquisition. This is the awareness creative — it'll run on Meta feed + stories targeted within 5 miles of the new office, never Burlington or S. Burlington.
            </div>
            <div style={{ marginTop: 10, padding: 12, background: "var(--surface-2)", borderRadius: 8 }}>
              <div className="br-eyebrow" style={{ fontSize: 9.5, marginBottom: 4 }}>Expected impact · Compass forecast</div>
              <div style={{ display: "flex", gap: 14 }}>
                <div>
                  <div className="br-num" style={{ fontSize: 16, fontWeight: 600 }}>$76</div>
                  <div style={{ fontSize: 10.5, color: "var(--ink-4)" }}>CPL projection</div>
                </div>
                <div>
                  <div className="br-num" style={{ fontSize: 16, fontWeight: 600 }}>+18 / wk</div>
                  <div style={{ fontSize: 10.5, color: "var(--ink-4)" }}>Williston-only bookings</div>
                </div>
              </div>
            </div>
          </div>

          {/* Comments thread */}
          <div className="br-scroll" style={{ flex: 1, overflowY: "auto", padding: 18 }}>
            <div className="br-eyebrow" style={{ marginBottom: 10 }}>Annotations & comments · 3</div>

            <Comment
              num={1}
              author={["Sam Patel", "SP", "#7c2d12"]}
              time="2h ago"
              body="Pin 1 marks the headline — we biased toward the warmest variant. Open to 'Now open at Williston' if you'd prefer that framing."
              replyAction
            />
            <Comment
              num={2}
              author={["Sarah Chen", "SC", "#0c4a6e"]}
              time="1h ago"
              you
              body="Pin 2 — can the CTA button say 'Book at Williston' instead of 'Book a visit'? More specific."
              tag="Change requested"
            />
            <Comment
              num={null}
              author={["Sam Patel", "SP", "#7c2d12"]}
              time="38 min ago"
              indent
              body="Yep — pushing v3 with that change now. Will take 6 minutes."
              tag="Acknowledged"
            />
          </div>

          {/* Footer actions */}
          <div style={{ padding: 18, borderTop: "1px solid var(--line)", background: "var(--surface-2)", display: "flex", flexDirection: "column", gap: 10 }}>
            <Textarea rows={2} placeholder="Approve, request a change, or just leave a note…" style={{ background: "var(--surface)" }}/>
            <div style={{ display: "flex", gap: 8 }}>
              <Button variant="outline" size="md" style={{ flex: 1 }}>Request changes</Button>
              <Button variant="primary" size="md" icon="check" style={{ flex: 1.2 }}>Approve v3</Button>
            </div>
            <div className="br-cap" style={{ textAlign: "center", marginTop: 2 }}>
              Sam is notified · this becomes live within ~6 hours of approval.
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Comment({ num, author, time, body, you, indent, tag, replyAction }) {
  const [name, ini, bg] = author;
  return (
    <div style={{ display: "flex", gap: 10, marginBottom: 14, marginLeft: indent ? 24 : 0, borderLeft: indent ? "2px solid var(--line)" : "none", paddingLeft: indent ? 12 : 0 }}>
      <div style={{ width: 26, height: 26, borderRadius: 999, background: bg, color: "#fff", display: "grid", placeItems: "center", fontSize: 10.5, fontWeight: 600, flexShrink: 0 }}>{ini}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4, flexWrap: "wrap" }}>
          <span style={{ fontSize: 12.5, fontWeight: 600 }}>{name}</span>
          {you && <Pill tone="accent" size="sm">You</Pill>}
          {num && <span className="br-mono" style={{ fontSize: 10, color: "var(--accent)", padding: "1px 5px", border: "1px solid #ddd6fe", borderRadius: 4 }}>PIN {num}</span>}
          <span className="br-mono" style={{ fontSize: 10.5, color: "var(--ink-5)" }}>{time}</span>
          {tag && <Pill tone={tag === "Change requested" ? "warn" : "ok"} size="sm">{tag}</Pill>}
        </div>
        <div style={{ fontSize: 13, color: "var(--ink-2)", lineHeight: 1.55 }}>{body}</div>
        {replyAction && (
          <div style={{ marginTop: 6 }}>
            <button style={{ fontSize: 11.5, color: "var(--ink-4)", background: "transparent", border: "none", padding: 0, cursor: "pointer" }}>Reply</button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 08 — Empty / waiting state
// ─────────────────────────────────────────────────────────────
function DEmpty() {
  return (
    <div className="br-frame">
      <DockTopBar active="assets"/>
      <div className="br-scroll" style={{ flex: 1, overflowY: "auto", padding: "28px 32px 36px" }}>
        <div style={{ marginBottom: 18 }}>
          <Pill tone="ok" size="sm" icon="check">Inbox zero</Pill>
          <h1 className="br-h1" style={{ fontSize: 26, marginTop: 8, marginBottom: 4 }}>You're all caught up.</h1>
          <p className="br-body" style={{ margin: 0 }}>Nothing needs your eyes right now. Here's what's brewing.</p>
        </div>

        {/* Big empty illustration card */}
        <div style={{
          padding: "60px 40px", background: "var(--surface)", border: "1px solid var(--line)",
          borderRadius: 16, marginBottom: 22, textAlign: "center", boxShadow: "var(--shadow-1)",
          backgroundImage: "radial-gradient(circle at center, var(--surface-2) 0%, transparent 70%)",
        }}>
          <div style={{ position: "relative", width: 120, height: 120, margin: "0 auto 24px" }}>
            <div style={{ position: "absolute", inset: 0, borderRadius: 999, background: "radial-gradient(circle, rgba(4,120,87,.16) 0%, transparent 60%)", animation: "br-pulse-soft 2.6s ease-in-out infinite" }}/>
            <div style={{ position: "absolute", inset: 20, borderRadius: 999, background: "var(--surface)", border: "1px solid var(--line)", boxShadow: "var(--shadow-2)", display: "grid", placeItems: "center" }}>
              <Icon name="check" size={36} color="var(--ok)" strokeWidth={2.2}/>
            </div>
          </div>
          <h2 className="br-h2" style={{ fontSize: 22, marginBottom: 8 }}>Nothing pending — and that's good.</h2>
          <p className="br-body" style={{ margin: "0 auto", maxWidth: 480 }}>
            Three workstreams are running. We'll only ping you when an asset, copy, or decision actually needs your eyes — not for status reports. You'll know in a notification when something lands.
          </p>
          <div style={{ display: "flex", gap: 10, justifyContent: "center", marginTop: 18 }}>
            <Button variant="outline" size="md" iconRight="arrow_right">See what's in motion</Button>
            <Button variant="ghost" size="md">Notify settings</Button>
          </div>
        </div>

        {/* Coming next */}
        <SectionDivider title="On the workbench" subtitle="Approved internally — coming to you in the next few days." count={5}/>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {[
            { who: "Jess", item: "Williston landing — full visual pass", workstream: "web",  eta: "Thu" },
            { who: "Mike", item: "Hero copy A/B/C — Williston",          workstream: "web",  eta: "Tue" },
            { who: "Sam",  item: "Google search ad — 'kid-friendly dentist'", workstream: "paid", eta: "Wed" },
            { who: "Sam",  item: "Q3 mid-quarter strategy recap",        workstream: "strategy", eta: "Mon" },
            { who: "Mike", item: "Pediatric blog · 3 drafts",            workstream: "seo",  eta: "Fri" },
          ].map((r) => (
            <div key={r.item} style={{ padding: 14, background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 10, display: "flex", alignItems: "center", gap: 12 }}>
              <WorkstreamPill kind={r.workstream}/>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 500 }}>{r.item}</div>
                <div className="br-mono" style={{ fontSize: 10.5, color: "var(--ink-5)" }}>{r.who} · ETA {r.eta}</div>
              </div>
              <Icon name="chevron_right" size={14} color="var(--ink-4)"/>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 09 — Internal ops view (agency-side workstream control)
// ─────────────────────────────────────────────────────────────
function DInternalOps() {
  return (
    <div className="br-frame">
      {/* Internal chrome */}
      <div style={{ padding: "12px 28px", borderBottom: "1px solid var(--line)", background: "#0c0a09", color: "#fff", display: "flex", alignItems: "center", gap: 14, flexShrink: 0 }}>
        <DockWordmark/>
        <span style={{ width: 1, height: 16, background: "rgba(255,255,255,.18)" }}/>
        <Pill tone="dark" size="sm">Internal · Operations</Pill>
        <span style={{ fontSize: 12, color: "rgba(255,255,255,.65)" }}>Workstream control room</span>
        <div style={{ flex: 1 }}/>
        <div style={{ display: "flex", gap: 8 }}>
          {["SP","JK","MD","TM"].map((i, idx) => (
            <div key={i} style={{ width: 24, height: 24, borderRadius: 999, background: ["#7c2d12","#0c4a6e","#065f46","#7c3aed"][idx], color: "#fff", display: "grid", placeItems: "center", fontSize: 10, fontWeight: 600, border: "1.5px solid #0c0a09" }}>{i}</div>
          ))}
        </div>
      </div>

      <div className="br-scroll" style={{ flex: 1, overflowY: "auto", padding: "24px 28px 32px" }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 18 }}>
          <div>
            <span className="br-mono" style={{ fontSize: 11, color: "var(--ink-5)" }}>CLIENTS · LAKESIDE DENTAL · WORKSTREAMS</span>
            <h1 className="br-h1" style={{ fontSize: 24, marginTop: 6, marginBottom: 4 }}>Workstream control · Lakeside</h1>
            <p className="br-body" style={{ margin: 0 }}>Agency-side. The view your strategist sees — every workstream, every blocker, every SLA in one grid.</p>
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            <Button variant="outline" size="sm" icon="sliders">View</Button>
            <Button variant="outline" size="sm" icon="plus">Add task</Button>
            <Button variant="primary" size="sm" iconRight="arrow_right">Open client view</Button>
          </div>
        </div>

        {/* Snapshot tiles */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 10, marginBottom: 18 }}>
          {[
            ["Workstreams active",   "3"],
            ["Tasks in flight",      "23"],
            ["Awaiting client",      "2"],
            ["Internal blockers",    "1"],
            ["SLA breach risk",      "0", "ok"],
            ["Avg. task age",        "2.4d"],
          ].map(([k, v, t]) => (
            <div key={k} style={{ padding: 12, background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 10 }}>
              <div className="br-eyebrow" style={{ fontSize: 9.5 }}>{k}</div>
              <div className="br-num" style={{ fontSize: 22, fontWeight: 600, letterSpacing: "-0.02em", marginTop: 4, color: t === "ok" ? "var(--ok)" : "var(--ink)" }}>{v}</div>
            </div>
          ))}
        </div>

        {/* Kanban-style swimlanes */}
        <Card padding={0} style={{ overflow: "hidden" }}>
          <div style={{ display: "grid", gridTemplateColumns: "200px 1fr 1fr 1fr 1fr", borderBottom: "1px solid var(--line)" }}>
            {["Workstream", "Backlog", "In progress", "Review", "Done"].map((h, i) => (
              <div key={h} style={{ padding: "10px 14px", fontSize: 11, color: "var(--ink-5)", fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: ".06em", fontWeight: 600, borderRight: i < 4 ? "1px solid var(--line)" : "none", background: i === 0 ? "var(--surface-2)" : "transparent" }}>{h}</div>
            ))}
          </div>

          {[
            {
              kind: "web", name: "Website refresh + Williston", lead: "JK", health: "ok",
              cols: [
                [["Burlington page design", "Mon"]],
                [["Williston design v1", "Today · Jess"], ["Design system", "Today · Jess"]],
                [["Hero copy variants", "Client · 4h"], ["Wireframes archive", "Internal"]],
                [["Wireframes sign-off", "Sept 15"], ["Sitemap locked", "Sept 09"]],
              ],
            },
            {
              kind: "paid", name: "Meta + Google paid", lead: "SP", health: "ok",
              cols: [
                [["TikTok pilot scope", "Oct"]],
                [["Ad v3 — gentle care", "Today · Sam"], ["Search ad set", "Wed · Sam"]],
                [["Ads v2 — Williston", "Client · 2h"], ["Spend reallocation", "Internal"]],
                [["Wk 2 perf review", "Sept 16"], ["Pixel + GTM", "Sept 04"]],
              ],
            },
            {
              kind: "recall", name: "Recall automation · Beacon", lead: "MD", health: "blocked",
              cols: [
                [["Recall messaging copy", "Pending unblock"]],
                [["Beacon workflow build", "Staged"]],
                [["Dentrix API access", "BLOCKED · client IT"]],
                [["Scope doc signed", "Sept 11"]],
              ],
            },
          ].map((row) => (
            <div key={row.name} style={{ display: "grid", gridTemplateColumns: "200px 1fr 1fr 1fr 1fr", borderBottom: "1px solid var(--line-faint)" }}>
              <div style={{ padding: 14, borderRight: "1px solid var(--line)", background: "var(--surface-2)" }}>
                <WorkstreamPill kind={row.kind}/>
                <div style={{ fontSize: 13, fontWeight: 600, marginTop: 6, letterSpacing: "-0.005em" }}>{row.name}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 6 }}>
                  <div style={{ width: 20, height: 20, borderRadius: 999, background: row.lead === "SP" ? "#7c2d12" : row.lead === "JK" ? "#0c4a6e" : "#065f46", color: "#fff", display: "grid", placeItems: "center", fontSize: 9.5, fontWeight: 600 }}>{row.lead}</div>
                  <span style={{ fontSize: 11, color: "var(--ink-4)" }}>· lead</span>
                  {row.health === "blocked" ? <Pill tone="err" size="sm" icon="alert">Blocked</Pill> : <Pill tone="ok" size="sm">Healthy</Pill>}
                </div>
              </div>
              {row.cols.map((cell, i) => (
                <div key={i} style={{ padding: 10, borderRight: i < 3 ? "1px solid var(--line)" : "none", display: "flex", flexDirection: "column", gap: 6 }}>
                  {cell.map(([t, meta]) => (
                    <div key={t} style={{
                      padding: "8px 10px",
                      background: meta.startsWith("BLOCKED") ? "var(--err-soft)" : meta.startsWith("Client") ? "var(--warn-soft)" : "var(--surface)",
                      border: `1px solid ${meta.startsWith("BLOCKED") ? "#fecaca" : meta.startsWith("Client") ? "#fcd34d" : "var(--line)"}`,
                      borderRadius: 7, fontSize: 12,
                    }}>
                      <div style={{ fontWeight: 500 }}>{t}</div>
                      <div className="br-mono" style={{ fontSize: 10, color: meta.startsWith("BLOCKED") ? "var(--err)" : meta.startsWith("Client") ? "var(--warn)" : "var(--ink-5)", marginTop: 2 }}>{meta}</div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </Card>

        {/* Telemetry strip */}
        <div style={{ marginTop: 14, display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr", gap: 10 }}>
          <Card padding={14}>
            <div className="br-eyebrow" style={{ marginBottom: 6 }}>SLA · client response time</div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
              <span className="br-num" style={{ fontSize: 18, fontWeight: 600 }}>4h 12m</span>
              <span className="br-mono" style={{ fontSize: 10.5, color: "var(--ok)" }}>median · target ≤ 24h</span>
            </div>
          </Card>
          <Card padding={14}>
            <div className="br-eyebrow" style={{ marginBottom: 6 }}>Contract source</div>
            <div className="br-mono" style={{ fontSize: 11, color: "var(--ink-3)" }}>Compass · LSD-7F2A · v2 (signed Sept 02)</div>
          </Card>
          <Card padding={14}>
            <div className="br-eyebrow" style={{ marginBottom: 6 }}>Auto-generated from</div>
            <div className="br-mono" style={{ fontSize: 11, color: "var(--ink-3)" }}>8 modules · workstream engine v3.2</div>
          </Card>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 10 — Mobile preview (Live Feed)
// ─────────────────────────────────────────────────────────────
function DMobile() {
  return (
    <div className="br-frame" style={{ background: "#e9e9e6", padding: 16, alignItems: "center" }}>
      <div style={{ width: 360, flex: 1, maxHeight: 760, borderRadius: 44, background: "#0c0a09", padding: 8, boxShadow: "0 10px 40px -10px rgba(0,0,0,.28), 0 1px 3px rgba(0,0,0,.1)", display: "flex", flexDirection: "column" }}>
        <div style={{ flex: 1, background: "var(--bg)", borderRadius: 36, overflow: "hidden", display: "flex", flexDirection: "column", position: "relative" }}>
          {/* status bar */}
          <div style={{ padding: "12px 24px 4px", display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 12, fontWeight: 600 }}>
            <span>9:41</span>
            <div style={{ position: "absolute", left: "50%", top: 6, transform: "translateX(-50%)", width: 84, height: 22, borderRadius: 999, background: "#0c0a09" }}/>
            <div style={{ display: "flex", gap: 4 }}><span>􀛨</span><span>􀙇</span></div>
          </div>

          {/* top bar */}
          <div style={{ padding: "8px 16px 8px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <DockWordmark/>
            <Pill tone="accent" size="sm">3 for you</Pill>
          </div>

          <div style={{ padding: "0 16px 4px", display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 24, height: 24, borderRadius: 6, background: "#0c4a6e", color: "#fff", display: "grid", placeItems: "center", fontSize: 9.5, fontWeight: 600 }}>LD</div>
            <span style={{ fontSize: 12.5, fontWeight: 600 }}>Lakeside Dental</span>
            <span style={{ width: 6, height: 6, borderRadius: 999, background: "var(--ok)" }}/>
            <span className="br-mono" style={{ fontSize: 10, color: "var(--ink-5)" }}>WEEK 3</span>
          </div>

          {/* tabs */}
          <div style={{ padding: "8px 16px 0", display: "flex", gap: 4, overflow: "auto" }}>
            {[["Feed", true],["For you", false],["Assets", false],["Project", false],["Billing", false]].map(([t, a]) => (
              <span key={t} style={{
                padding: "5px 10px", borderRadius: 999, fontSize: 11.5,
                background: a ? "var(--ink)" : "var(--surface)",
                color: a ? "#fff" : "var(--ink-3)",
                border: a ? "1px solid var(--ink)" : "1px solid var(--line-strong)",
                whiteSpace: "nowrap", fontWeight: 500,
              }}>{t}</span>
            ))}
          </div>

          {/* feed */}
          <div className="br-scroll" style={{ flex: 1, overflowY: "auto", padding: "12px 16px 16px" }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: "var(--ink-3)", margin: "0 0 10px" }}>TODAY</div>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <MobileFeedItem
                kind="paid" status="waiting_you" time="2:14 PM"
                title="3 Meta ads ready for your eyes"
                body="Williston launch — needs you before Friday."
                action="Review"
              />
              <MobileFeedItem
                kind="web" status="in_progress" time="11:08 AM"
                title="Williston landing — design pass underway"
                body="Clickable preview ready Thursday."
              />
              <MobileFeedItem
                kind="web" status="waiting_you" time="9:42 AM"
                title="Hero copy — pick one of three"
                body="A, B, or C — or send notes."
                action="Pick one"
              />
            </div>

            <div style={{ fontSize: 11, fontWeight: 600, color: "var(--ink-3)", margin: "16px 0 10px" }}>YESTERDAY</div>
            <MobileFeedItem
              kind="recall" status="blocked" time="2:30 PM"
              title="Recall — needs Dentrix access"
              body="We've staged the workflow. Need IT credentials."
              action="Forward to IT"
            />
            <div style={{ height: 8 }}/>
            <MobileFeedItem
              kind="paid" status="done" time="4:55 PM (Tue)"
              title="Week 2 ad performance"
              body="CPL $76 against $84 target. Reallocating spend."
            />
          </div>

          {/* bottom tab bar */}
          <div style={{ padding: "10px 16px 16px", borderTop: "1px solid var(--line)", background: "var(--surface)", display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 4 }}>
            {[["target", "Overview"], ["bolt", "Feed", true], ["image", "Assets"], ["file", "Billing"], ["star", "Week"]].map(([i, l, a]) => (
              <div key={l} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, color: a ? "var(--ink)" : "var(--ink-4)" }}>
                <Icon name={i} size={17}/>
                <span style={{ fontSize: 9.5, fontWeight: a ? 600 : 500 }}>{l}</span>
              </div>
            ))}
          </div>
          <div style={{ position: "absolute", bottom: 6, left: "50%", transform: "translateX(-50%)", width: 110, height: 4, borderRadius: 999, background: "#0c0a09", opacity: .35 }}/>
        </div>
      </div>
    </div>
  );
}

function MobileFeedItem({ kind, status, time, title, body, action }) {
  return (
    <div style={{
      padding: 12, background: "var(--surface)", border: status === "waiting_you" ? "1.5px solid var(--warn)" : "1px solid var(--line)",
      borderRadius: 12, boxShadow: "var(--shadow-1)", display: "flex", flexDirection: "column", gap: 8,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <WorkstreamPill kind={kind}/>
        <span style={{ flex: 1 }}/>
        <span className="br-mono" style={{ fontSize: 10, color: "var(--ink-5)" }}>{time}</span>
      </div>
      <div>
        <div style={{ fontSize: 13.5, fontWeight: 600, lineHeight: 1.3, letterSpacing: "-0.005em" }}>{title}</div>
        {body && <div style={{ fontSize: 12, color: "var(--ink-4)", marginTop: 3 }}>{body}</div>}
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <StatusDot state={status}/>
        {action && <Button variant="primary" size="sm" iconRight="arrow_right">{action}</Button>}
      </div>
    </div>
  );
}

Object.assign(window, { DAssetDetail, DEmpty, DInternalOps, DMobile, Comment, MobileFeedItem });
