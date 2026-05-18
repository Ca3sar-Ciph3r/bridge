/* global React, Icon, Button, Pill, Card, Toggle, Field, Input, Textarea,
   AtlasShell, AtlasTopBar, HealthDot, ClientAvatar, ClientChip, PersonAvatar, OpsKpi, AppPill, CLIENTS, TEAM, APPS */
// Atlas — screens part 2: ClickUp Sync, Approvals, Notifications

// ─────────────────────────────────────────────────────────────
// 04 — ClickUp Sync Layer
// ─────────────────────────────────────────────────────────────
function AClickUp() {
  return (
    <AtlasShell
      active="clickup"
      topBar={<AtlasTopBar
        section="COORDINATE · CLICKUP SYNC"
        title="ClickUp integration"
        sub="6 workspaces · 11 lists · webhook + polling fallback"
        right={
          <div style={{ display: "flex", gap: 8 }}>
            <Button variant="ghost" size="sm" icon="info">API docs</Button>
            <Button variant="outline" size="sm" icon="bolt">Sync now</Button>
            <Button variant="primary" size="sm" icon="plus">Connect workspace</Button>
          </div>
        }/>}
    >
      <div className="br-scroll" style={{ flex: 1, overflowY: "auto", padding: "20px 28px 32px" }}>

        {/* Connection hero */}
        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 14, marginBottom: 18 }}>
          <Card padding={20} style={{ position: "relative", overflow: "hidden" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 18 }}>
              {/* Atlas mark */}
              <div style={{ width: 48, height: 48, borderRadius: 10, background: "linear-gradient(135deg, #0c0a09 0%, #292524 100%)", display: "grid", placeItems: "center" }}>
                <svg width="22" height="22" viewBox="0 0 18 18" fill="none">
                  <circle cx="4" cy="4" r="2" fill="#fff"/><circle cx="14" cy="4" r="2" fill="#fff"/><circle cx="9" cy="14" r="2" fill="#4f46e5"/>
                  <line x1="4" y1="4" x2="14" y2="4" stroke="#fff" strokeWidth="1" opacity=".5"/>
                  <line x1="4" y1="4" x2="9" y2="14" stroke="#fff" strokeWidth="1" opacity=".5"/>
                  <line x1="14" y1="4" x2="9" y2="14" stroke="#fff" strokeWidth="1" opacity=".5"/>
                </svg>
              </div>
              {/* Animated link */}
              <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ flex: 1, height: 2, background: "var(--line-strong)", position: "relative", overflow: "hidden" }}>
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, transparent 0%, var(--ok) 50%, transparent 100%)", animation: "br-shimmer 2s linear infinite", backgroundSize: "200% 100%" }}/>
                </div>
                <Pill tone="ok" size="sm" icon="check">Live · 156ms</Pill>
                <div style={{ flex: 1, height: 2, background: "var(--line-strong)", position: "relative", overflow: "hidden" }}>
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, transparent 0%, var(--ok) 50%, transparent 100%)", animation: "br-shimmer 2.4s linear infinite reverse", backgroundSize: "200% 100%" }}/>
                </div>
              </div>
              {/* ClickUp mark */}
              <div style={{ width: 48, height: 48, borderRadius: 10, background: "#7b68ee", display: "grid", placeItems: "center", color: "#fff", fontWeight: 700, fontSize: 18 }}>cu</div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 14, paddingTop: 14, borderTop: "1px solid var(--line)" }}>
              {[
                ["Sync health",       "100%",  "ok",  "Last 24h"],
                ["Events · 24h",      "1,420", "neutral", "in: 884 · out: 536"],
                ["Latency · p50",     "156ms", "ok",   "Webhook"],
                ["Errors · 7d",       "2",     "warn", "Auto-recovered"],
              ].map(([k, v, tone, sub]) => (
                <div key={k}>
                  <div className="br-eyebrow" style={{ fontSize: 9.5 }}>{k}</div>
                  <div className="br-num" style={{ fontSize: 22, fontWeight: 600, marginTop: 4, letterSpacing: "-0.025em", color: tone === "warn" ? "var(--warn)" : tone === "err" ? "var(--err)" : "var(--ink)" }}>{v}</div>
                  <div style={{ fontSize: 11, color: "var(--ink-4)", marginTop: 2 }}>{sub}</div>
                </div>
              ))}
            </div>
          </Card>

          {/* Sync direction */}
          <Card padding={20}>
            <div className="br-eyebrow" style={{ marginBottom: 12 }}>What syncs which way</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {[
                { from: "atlas",   to: "clickup", what: "Tasks · projects · assignees", dir: "→" },
                { from: "atlas",   to: "clickup", what: "Stage transitions · phase changes", dir: "→" },
                { from: "clickup", to: "atlas",   what: "Time tracking · status · comments", dir: "←" },
                { from: "clickup", to: "atlas",   what: "Custom field updates", dir: "←" },
                { from: "atlas",   to: "clickup", what: "Automation outputs · created tasks", dir: "→" },
              ].map((row, i) => (
                <div key={i} style={{ display: "grid", gridTemplateColumns: "auto auto 1fr", gap: 8, alignItems: "center", padding: "6px 0", borderTop: i > 0 ? "1px solid var(--line-faint)" : "none" }}>
                  <AppPill kind={row.from === "atlas" ? "atlas" : "clickup"} size="sm"/>
                  <span style={{ fontSize: 13, color: "var(--ink-3)", padding: "0 2px" }}>{row.dir}</span>
                  <span style={{ fontSize: 12, color: "var(--ink-2)" }}>{row.what}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 12, paddingTop: 12, borderTop: "1px solid var(--line)" }}>
              <Field label="Polling fallback frequency">
                <div style={{ display: "inline-flex", background: "var(--surface)", border: "1px solid var(--line-strong)", borderRadius: 8, padding: 2 }}>
                  {["15s", "1m", "5m", "Off"].map((p, i) => (
                    <span key={p} style={{ padding: "5px 10px", fontSize: 11.5, fontWeight: 500, borderRadius: 6, background: i === 1 ? "var(--ink)" : "transparent", color: i === 1 ? "#fff" : "var(--ink-3)", cursor: "pointer" }}>{p}</span>
                  ))}
                </div>
              </Field>
            </div>
          </Card>
        </div>

        {/* Workspace list */}
        <Card padding={0} style={{ overflow: "hidden", marginBottom: 14 }}>
          <div style={{ padding: "14px 18px", borderBottom: "1px solid var(--line)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <div className="br-eyebrow">Connected workspaces · 6</div>
              <div style={{ fontSize: 15, fontWeight: 600, marginTop: 4 }}>One ClickUp space per client</div>
            </div>
            <Button variant="ghost" size="sm" iconRight="arrow_right">Open in ClickUp</Button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1.4fr 0.6fr 0.7fr 0.7fr 0.6fr 0.6fr 32px", padding: "8px 18px", background: "var(--surface-2)", fontSize: 10, color: "var(--ink-5)", fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: ".06em", fontWeight: 600, gap: 8 }}>
            <span>Workspace</span><span style={{ textAlign: "right" }}>Lists</span><span style={{ textAlign: "right" }}>Tasks</span><span style={{ textAlign: "right" }}>Last sync</span><span style={{ textAlign: "center" }}>Webhook</span><span style={{ textAlign: "center" }}>Health</span><span/>
          </div>
          {[
            { client: "lakeside",  workspace: "lakeside-dental",  lists: 4, tasks: 142, last: "23s ago",   wh: "ok",   health: "ok"   },
            { client: "northwind", workspace: "northwind-optics", lists: 2, tasks: 68,  last: "1m ago",    wh: "ok",   health: "ok"   },
            { client: "maple",     workspace: "maple-hide",       lists: 3, tasks: 184, last: "12s ago",   wh: "ok",   health: "ok"   },
            { client: "hartwell",  workspace: "hartwell-law",     lists: 1, tasks: 22,  last: "3m ago",    wh: "ok",   health: "ok"   },
            { client: "cedarpoint",workspace: "cedarpoint-saas",  lists: 1, tasks: 14,  last: "1h ago",    wh: "warn", health: "warn" },
            { client: "glasswing", workspace: "glasswing",        lists: 0, tasks: 0,   last: "Just now",  wh: "ok",   health: "ok"   },
          ].map((row, i) => (
            <div key={row.client} style={{ display: "grid", gridTemplateColumns: "1.4fr 0.6fr 0.7fr 0.7fr 0.6fr 0.6fr 32px", padding: "12px 18px", gap: 8, alignItems: "center", borderTop: i > 0 ? "1px solid var(--line-faint)" : "none" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
                <ClientAvatar id={row.client}/>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{CLIENTS[row.client].name}</div>
                  <div className="br-mono" style={{ fontSize: 10.5, color: "var(--ink-5)" }}>cu.workspace/{row.workspace}</div>
                </div>
              </div>
              <span className="br-mono br-num" style={{ fontSize: 12, textAlign: "right" }}>{row.lists}</span>
              <span className="br-mono br-num" style={{ fontSize: 12, textAlign: "right" }}>{row.tasks}</span>
              <span className="br-mono" style={{ fontSize: 11, textAlign: "right", color: "var(--ink-4)" }}>{row.last}</span>
              <div style={{ textAlign: "center" }}>
                {row.wh === "ok" ? <Pill tone="ok" size="sm">Active</Pill> : <Pill tone="warn" size="sm">Polling</Pill>}
              </div>
              <div style={{ textAlign: "center" }}>
                <HealthDot state={row.health} pulse={row.health === "warn"}/>
              </div>
              <Icon name="chevron_right" size={13} color="var(--ink-4)"/>
            </div>
          ))}
        </Card>

        {/* Sync log + API status */}
        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 14 }}>
          <Card padding={0} style={{ overflow: "hidden" }}>
            <div style={{ padding: "14px 18px", borderBottom: "1px solid var(--line)" }}>
              <div className="br-eyebrow">Webhook activity · last hour</div>
              <div style={{ fontSize: 15, fontWeight: 600, marginTop: 4 }}>What's been moving back and forth</div>
            </div>
            <div className="br-scroll" style={{ maxHeight: 320, overflowY: "auto", fontFamily: "var(--font-mono)" }}>
              {[
                { time: "09:42:18", dir: "in",  type: "task.updated",          ref: "lakeside · CU-1083", desc: "Williston landing — status=in_review",  status: 200 },
                { time: "09:41:52", dir: "out", type: "task.create",           ref: "hartwell · 11 tasks", desc: "Compass contract → ClickUp tasks",     status: 201 },
                { time: "09:38:04", dir: "in",  type: "task.timetracked",      ref: "northwind · CU-882", desc: "Jess logged 1.5h",                       status: 200 },
                { time: "09:32:11", dir: "out", type: "task.assignee.update",  ref: "northwind · CU-882", desc: "Atlas reassigned to Tom (from Jess)",    status: 200 },
                { time: "09:21:48", dir: "in",  type: "task.completed",        ref: "lakeside · CU-1083", desc: "Williston landing v1 design",            status: 200 },
                { time: "09:14:02", dir: "out", type: "list.create",           ref: "hartwell · lst-1",   desc: "Engagement list provisioned",            status: 201 },
                { time: "09:08:23", dir: "in",  type: "comment.created",       ref: "maple · CU-771",    desc: "Client feedback on Q3 ad set",          status: 200 },
                { time: "08:52:19", dir: "in",  type: "webhook.delayed",       ref: "system · *",         desc: "Backlog: 18 events — recovering",       status: 200, warn: true },
                { time: "08:50:01", dir: "out", type: "automation.retry",      ref: "lakeside · beacon",  desc: "Beacon retry · Dentrix 503",            status: 503, err: true },
                { time: "08:42:33", dir: "out", type: "task.create",           ref: "glasswing · 8 tasks", desc: "Brand kickoff list created",           status: 201 },
              ].map((row, i) => (
                <div key={i} style={{ display: "grid", gridTemplateColumns: "70px 24px 140px 1fr 50px", gap: 8, padding: "8px 18px", borderTop: i > 0 ? "1px solid var(--line-faint)" : "none", alignItems: "center", fontSize: 11 }}>
                  <span style={{ color: "var(--ink-5)" }}>{row.time}</span>
                  <span style={{
                    padding: "1px 4px", borderRadius: 3, fontSize: 9, fontWeight: 700,
                    background: row.dir === "in" ? "var(--accent-soft)" : "var(--surface-2)",
                    color: row.dir === "in" ? "var(--accent-ink)" : "var(--ink-3)",
                    textAlign: "center",
                  }}>{row.dir.toUpperCase()}</span>
                  <span style={{ color: row.err ? "var(--err)" : row.warn ? "var(--warn)" : "var(--ink-2)", fontWeight: 600 }}>{row.type}</span>
                  <span style={{ color: "var(--ink-3)", fontFamily: "var(--font-sans)", fontSize: 11.5 }}>
                    <strong style={{ color: "var(--ink-2)" }}>{row.ref}</strong> · {row.desc}
                  </span>
                  <span style={{
                    fontSize: 10, fontWeight: 700, textAlign: "right",
                    color: row.err ? "var(--err)" : row.warn ? "var(--warn)" : "var(--ok)",
                  }}>{row.status}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* API status side */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <Card padding={18}>
              <div className="br-eyebrow" style={{ marginBottom: 10 }}>API status · ClickUp v2</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {[
                  ["Tasks API",       "ok", "v2.0", "182ms p50"],
                  ["Webhooks",        "ok", "v2.0", "live · queue 0"],
                  ["Time tracking",   "ok", "v2.0", "318ms p50"],
                  ["Custom fields",   "warn", "v2.0", "1.4s p50 · throttled"],
                  ["Bulk operations", "ok", "v2.0", "rate 200/min"],
                ].map(([api, state, ver, meta]) => (
                  <div key={api} style={{ display: "grid", gridTemplateColumns: "auto 1fr auto", gap: 8, alignItems: "center", padding: "6px 0", borderTop: "1px solid var(--line-faint)" }}>
                    <HealthDot state={state}/>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontSize: 12.5, fontWeight: 500 }}>{api}</div>
                      <div className="br-mono" style={{ fontSize: 10, color: "var(--ink-5)" }}>{ver} · {meta}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card padding={18}>
              <div className="br-eyebrow" style={{ marginBottom: 8 }}>Rate limit</div>
              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 6 }}>
                <span className="br-num" style={{ fontSize: 24, fontWeight: 600, letterSpacing: "-0.02em" }}>118 / 200</span>
                <span className="br-mono" style={{ fontSize: 11, color: "var(--ink-5)" }}>RESETS IN 38s</span>
              </div>
              <div style={{ height: 5, borderRadius: 999, background: "var(--surface-3)", overflow: "hidden" }}>
                <div style={{ height: "100%", width: "59%", background: "var(--accent)" }}/>
              </div>
              <div style={{ fontSize: 11.5, color: "var(--ink-4)", marginTop: 8 }}>Req/min · operating well under the ceiling.</div>
            </Card>

            <Card padding={18} style={{ background: "var(--warn-soft)", borderColor: "#fcd34d" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                <Icon name="alert" size={13} color="var(--warn)"/>
                <span style={{ fontSize: 12.5, fontWeight: 600, color: "var(--warn)" }}>Recovered automatically</span>
              </div>
              <div style={{ fontSize: 12, color: "var(--ink-3)", lineHeight: 1.55 }}>
                Webhook backlog of 18 events at 08:52am — cleared in 6 minutes via polling fallback. No data loss.
              </div>
            </Card>
          </div>
        </div>
      </div>
    </AtlasShell>
  );
}

// ─────────────────────────────────────────────────────────────
// 05 — Approval Queue
// ─────────────────────────────────────────────────────────────
function AApprovals() {
  return (
    <AtlasShell
      active="approvals"
      topBar={<AtlasTopBar
        section="OPERATE · APPROVALS"
        title="Approval queue"
        sub="5 awaiting you · 3 awaiting client · 12 closed this week"
        right={
          <div style={{ display: "flex", gap: 8 }}>
            <Button variant="ghost" size="sm" icon="sliders">Filter</Button>
            <Button variant="outline" size="sm">All assignees</Button>
            <Button variant="primary" size="sm" icon="check">Approve selected</Button>
          </div>
        }/>}
    >
      <div className="br-scroll" style={{ flex: 1, overflowY: "auto", padding: "20px 28px 32px" }}>

        {/* Tabs */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 18 }}>
          {[
            ["Awaiting you", 5,  true,  "var(--warn)"],
            ["Awaiting client", 3, false, "var(--accent)"],
            ["Approved", 12, false, "var(--ok)"],
            ["Rejected", 1, false, "var(--err)"],
            ["All", 21, false, "var(--ink-4)"],
          ].map(([l, n, a, c]) => (
            <span key={l} style={{
              display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 12px", borderRadius: 7,
              background: a ? "var(--surface)" : "transparent",
              border: a ? "1px solid var(--line-strong)" : "1px solid transparent",
              boxShadow: a ? "var(--shadow-1)" : "none",
              fontSize: 13, fontWeight: a ? 600 : 500, color: a ? "var(--ink)" : "var(--ink-3)",
              cursor: "pointer",
            }}>
              <span style={{ width: 6, height: 6, borderRadius: 999, background: c }}/> {l}
              <span className="br-mono" style={{ fontSize: 10.5, color: "var(--ink-5)" }}>{n}</span>
            </span>
          ))}
        </div>

        {/* Awaiting list */}
        <div className="br-eyebrow" style={{ marginBottom: 10 }}>Awaiting your review · sorted by age</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 24 }}>
          <ApprovalRow
            kind="strategy"
            requester="sam"
            client="cedarpoint"
            title="Cedarpoint · proposal v2 final edits"
            detail="Sam revised pricing tier + assumption layer. Ready for founder review before client send."
            sla="49h overdue"
            slaTone="err"
            age="49h"
            tags={["Compass v2", "founder-required"]}
            preview="proposal"
            steps={[["Strategist", "sam", true], ["Founder", "lin", false], ["Send to client", null, false]]}
            currentStep={1}
          />
          <ApprovalRow
            kind="design"
            requester="jess"
            client="lakeside"
            title="Lakeside · Williston landing v2 design"
            detail="Hero copy locked, photography in-place, hand-off to dev next. Needs your strategy gut-check."
            sla="6h"
            age="6h"
            tags={["Design v2", "ready for QA"]}
            preview="design"
            steps={[["Designer", "jess", true], ["Strategy", "sam", false], ["Client", null, false]]}
            currentStep={1}
          />
          <ApprovalRow
            kind="content"
            requester="mike"
            client="maple"
            title="Maple & Hide · Q3 campaign ad copy"
            detail="6 headlines + 6 body variants. Tone tuned to hospitality-warm per your direction."
            sla="2h"
            age="2h"
            tags={["6 variants", "Meta + Google"]}
            preview="copy"
            steps={[["Copy", "mike", true], ["Strategy", "sam", false], ["Client", null, false]]}
            currentStep={1}
          />
          <ApprovalRow
            kind="strategy"
            requester="sam"
            client="glasswing"
            title="Glasswing · discovery workshop agenda"
            detail="3-hour kickoff agenda. Confirming format before sending to client."
            sla="45m"
            age="45m"
            tags={["Workshop · 3h"]}
            preview="agenda"
            steps={[["Strategist", "sam", true], ["Founder", "lin", false]]}
            currentStep={1}
          />
          <ApprovalRow
            kind="ops"
            requester="mike"
            client="lakeside"
            title="Beacon · Recall workflow trigger conditions"
            detail="Updating recall trigger from 'last visit > 6mo' to 'last visit > 5mo' per client feedback."
            sla="20m"
            age="20m"
            tags={["Beacon automation"]}
            preview="config"
            steps={[["Implementation", "mike", true], ["Strategy", "sam", false]]}
            currentStep={1}
          />
        </div>

        {/* Awaiting client + recently approved */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          <Card padding={0} style={{ overflow: "hidden" }}>
            <div style={{ padding: "12px 16px", borderBottom: "1px solid var(--line)" }}>
              <div className="br-eyebrow">Awaiting client · 3</div>
            </div>
            <div>
              {[
                { client: "maple",     title: "3 ad creatives", sub: "Dock · 18h", age: "18h" },
                { client: "lakeside",  title: "Hero copy A/B/C", sub: "Dock · 4h", age: "4h" },
                { client: "northwind", title: "Brand voice doc", sub: "Dock · 2d", age: "2d" },
              ].map((row, i) => (
                <div key={i} style={{ display: "grid", gridTemplateColumns: "auto 1fr auto auto", gap: 10, padding: "10px 16px", borderTop: i > 0 ? "1px solid var(--line-faint)" : "none", alignItems: "center" }}>
                  <ClientAvatar id={row.client}/>
                  <div>
                    <div style={{ fontSize: 12.5, fontWeight: 500 }}>{row.title}</div>
                    <div className="br-mono" style={{ fontSize: 10.5, color: "var(--ink-5)" }}>{CLIENTS[row.client].name} · {row.sub}</div>
                  </div>
                  <Pill tone="accent" size="sm">With client</Pill>
                  <Button variant="ghost" size="sm" icon="mail">Nudge</Button>
                </div>
              ))}
            </div>
          </Card>

          <Card padding={0} style={{ overflow: "hidden" }}>
            <div style={{ padding: "12px 16px", borderBottom: "1px solid var(--line)" }}>
              <div className="br-eyebrow">Approved · last 7 days</div>
            </div>
            <div>
              {[
                { client: "hartwell",  title: "Compass proposal v2",         by: "lin",  ago: "Mon" },
                { client: "lakeside",  title: "Williston wireframes",        by: "sam",  ago: "Mon" },
                { client: "lakeside",  title: "Meta ad creatives v3 (3)",    by: "sam",  ago: "Tue" },
                { client: "maple",     title: "Q3 strategy doc",             by: "lin",  ago: "Wed" },
                { client: "lakeside",  title: "Recall sequence copy",        by: "sam",  ago: "Thu" },
              ].map((row, i) => (
                <div key={i} style={{ display: "grid", gridTemplateColumns: "auto 1fr auto auto", gap: 10, padding: "10px 16px", borderTop: i > 0 ? "1px solid var(--line-faint)" : "none", alignItems: "center" }}>
                  <ClientAvatar id={row.client}/>
                  <div>
                    <div style={{ fontSize: 12.5, fontWeight: 500 }}>{row.title}</div>
                    <div className="br-mono" style={{ fontSize: 10.5, color: "var(--ink-5)" }}>{CLIENTS[row.client].name}</div>
                  </div>
                  <PersonAvatar id={row.by} size={20}/>
                  <span className="br-mono" style={{ fontSize: 10.5, color: "var(--ok)", width: 36, textAlign: "right" }}>{row.ago}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </AtlasShell>
  );
}

function ApprovalRow({ kind, requester, client, title, detail, sla, slaTone = "warn", age, tags, preview, steps, currentStep }) {
  const kindColors = {
    strategy: { bg: "var(--accent-soft)", fg: "var(--accent)" },
    design:   { bg: "#fce7f3",            fg: "#9d174d" },
    content:  { bg: "var(--ai-soft)",     fg: "var(--ai)" },
    ops:      { bg: "var(--warn-soft)",   fg: "var(--warn)" },
  }[kind];

  const previewSurfaces = {
    proposal: (
      <div style={{ background: "#fff", padding: "12px 14px", borderRadius: 6, height: 92, overflow: "hidden", border: "1px solid var(--line)" }}>
        <div style={{ fontSize: 9, color: "var(--accent)", fontWeight: 700, letterSpacing: ".06em" }}>COMPASS · v2</div>
        <div style={{ fontSize: 13, fontWeight: 700, marginTop: 4, letterSpacing: "-0.015em", lineHeight: 1.2 }}>Cedarpoint SaaS — proposal</div>
        <div style={{ marginTop: 6, fontSize: 9.5, color: "var(--ink-4)", lineHeight: 1.4 }}>$18K/mo · Recommended · 6-mo · v2 includes adjusted pricing tier and 11 assumption updates.</div>
      </div>
    ),
    design: (
      <div style={{ background: "#fff", borderRadius: 6, height: 92, overflow: "hidden", border: "1px solid var(--line)" }}>
        <div style={{ height: 12, background: "var(--surface-2)" }}/>
        <div style={{ padding: 8 }}>
          <div style={{ width: 24, height: 5, background: "#0c4a6e", borderRadius: 1 }}/>
          <div style={{ width: "80%", height: 7, background: "var(--ink)", borderRadius: 2, marginTop: 4 }}/>
          <div style={{ width: "60%", height: 7, background: "var(--ink-4)", borderRadius: 2, marginTop: 2 }}/>
          <div style={{ display: "flex", gap: 3, marginTop: 4 }}>
            <div style={{ width: 30, height: 10, background: "#0c4a6e", borderRadius: 2 }}/>
            <div style={{ width: 30, height: 10, background: "var(--surface-3)", borderRadius: 2 }}/>
          </div>
        </div>
      </div>
    ),
    copy: (
      <div style={{ background: "#fff", padding: 10, borderRadius: 6, height: 92, overflow: "hidden", border: "1px solid var(--line)", display: "flex", flexDirection: "column", gap: 4 }}>
        <div style={{ fontSize: 9.5, color: "var(--ink-4)" }}>Headline A</div>
        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "-0.01em" }}>"Old-world stays. Walk-everywhere hosts."</div>
        <div style={{ fontSize: 9.5, color: "var(--ink-4)", marginTop: 2 }}>Headline B</div>
        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "-0.01em" }}>"Two hotels. Twelve places to feel at home."</div>
      </div>
    ),
    agenda: (
      <div style={{ background: "#fff", padding: 10, borderRadius: 6, height: 92, overflow: "hidden", border: "1px solid var(--line)" }}>
        <div style={{ fontSize: 9, color: "var(--ink-5)", fontFamily: "var(--font-mono)" }}>3 HOURS · MAY 21</div>
        <div style={{ fontSize: 11, fontWeight: 600, marginTop: 4 }}>Discovery workshop</div>
        <div style={{ fontSize: 9.5, color: "var(--ink-4)", marginTop: 4, lineHeight: 1.5 }}>09:00 · Brand audit · 10:00 · ICP & voice · 11:00 · Visual exploration · 12:00 · Close</div>
      </div>
    ),
    config: (
      <div style={{ background: "var(--ink)", color: "#fff", padding: 10, borderRadius: 6, height: 92, overflow: "hidden", border: "1px solid var(--ink)", fontFamily: "var(--font-mono)", fontSize: 10, lineHeight: 1.5 }}>
        <div style={{ color: "#86efac" }}>// recall workflow</div>
        <div>trigger: <span style={{ color: "#fbbf24" }}>last_visit_gt</span></div>
        <div>  was: <span style={{ color: "#a78bfa" }}>6mo</span></div>
        <div>  now: <span style={{ color: "#a5f3fc" }}>5mo</span></div>
        <div>cohort: <span style={{ color: "#a78bfa" }}>~340 patients</span></div>
      </div>
    ),
  };

  return (
    <div style={{
      padding: 18, background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 12,
      boxShadow: "var(--shadow-1)",
      display: "grid", gridTemplateColumns: "1.6fr 1fr 200px auto", gap: 18, alignItems: "center",
    }}>
      {/* Left — main */}
      <div style={{ minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 6 }}>
          <span style={{ padding: "2px 8px", borderRadius: 999, fontSize: 10.5, fontWeight: 600, background: kindColors.bg, color: kindColors.fg, textTransform: "capitalize" }}>{kind}</span>
          <Pill tone={slaTone} size="sm" icon="alert">{sla}</Pill>
          <ClientAvatar id={client} size={20}/>
          <span style={{ fontSize: 11.5, color: "var(--ink-4)" }}>{CLIENTS[client].name}</span>
        </div>
        <div style={{ fontSize: 14, fontWeight: 600, letterSpacing: "-0.005em" }}>{title}</div>
        <div style={{ fontSize: 12.5, color: "var(--ink-3)", marginTop: 4, lineHeight: 1.5 }}>{detail}</div>
        {tags && (
          <div style={{ display: "flex", gap: 5, marginTop: 8 }}>
            {tags.map((t) => <Pill key={t} tone="neutral" size="sm">{t}</Pill>)}
          </div>
        )}
      </div>

      {/* Mid — preview */}
      {previewSurfaces[preview]}

      {/* Steps */}
      <div>
        <div className="br-eyebrow" style={{ fontSize: 9.5, marginBottom: 8 }}>Reviewer chain</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {steps.map(([role, person, done], i) => (
            <div key={role} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{
                width: 18, height: 18, borderRadius: 999,
                background: done ? "var(--ink)" : i === currentStep ? "var(--warn)" : "var(--surface-2)",
                border: done ? "1px solid var(--ink)" : i === currentStep ? "1px solid var(--warn)" : "1.5px solid var(--line-strong)",
                display: "grid", placeItems: "center", color: "#fff", flexShrink: 0,
              }}>
                {done && <Icon name="check" size={10} strokeWidth={3}/>}
                {i === currentStep && <span style={{ width: 6, height: 6, borderRadius: 999, background: "#fff" }}/>}
              </div>
              <span style={{ fontSize: 11.5, color: done ? "var(--ink-3)" : i === currentStep ? "var(--ink)" : "var(--ink-4)", fontWeight: i === currentStep ? 600 : 500 }}>{role}</span>
              {person && <PersonAvatar id={person} size={16}/>}
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "flex-end" }}>
        <Button variant="primary" size="md" icon="check">Approve</Button>
        <Button variant="outline" size="sm">Request changes</Button>
        <Button variant="ghost" size="sm">Open in full</Button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 06 — Notification Center
// ─────────────────────────────────────────────────────────────
function ANotifications() {
  return (
    <AtlasShell
      active="notifications"
      topBar={<AtlasTopBar
        section="COORDINATE · NOTIFICATIONS"
        title="Operational notifications"
        sub="14 unread · 3 critical · severity-prioritized"
        right={
          <div style={{ display: "flex", gap: 8 }}>
            <Button variant="ghost" size="sm">Mark all read</Button>
            <Button variant="outline" size="sm" icon="sliders">Routing rules</Button>
          </div>
        }/>}
    >
      <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", flex: 1, minHeight: 0 }}>
        <div className="br-scroll" style={{ overflowY: "auto", padding: "16px 24px 28px 28px" }}>
          {/* Filter chips */}
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 16, flexWrap: "wrap" }}>
            {[
              ["All", 27, true, "var(--ink-3)"],
              ["Critical", 3, false, "var(--err)"],
              ["Action required", 8, false, "var(--warn)"],
              ["Informational", 16, false, "var(--ink-4)"],
            ].map(([l, n, a, c]) => (
              <span key={l} style={{
                display: "inline-flex", alignItems: "center", gap: 5, padding: "5px 10px", borderRadius: 6, fontSize: 12,
                background: a ? "var(--ink)" : "var(--surface)", color: a ? "#fff" : "var(--ink-2)",
                border: a ? "1px solid var(--ink)" : "1px solid var(--line-strong)", cursor: "pointer", fontWeight: 500,
              }}>
                <span style={{ width: 6, height: 6, borderRadius: 999, background: c }}/>{l}
                <span className="br-mono" style={{ fontSize: 10, opacity: .7 }}>{n}</span>
              </span>
            ))}
          </div>

          {/* Today */}
          <NotifGroup label="Today · May 16"/>
          <NotifItem
            severity="err"
            app="beacon"
            title="Automation failed · Beacon recall · Lakeside"
            detail="Dentrix API returned 503 at 7:14am — 1 patient affected · auto-retry in 5 minutes."
            actor={null}
            client="lakeside"
            time="2h ago"
            actions={["View log", "Retry now"]}
          />
          <NotifItem
            severity="err"
            app="compass"
            title="Proposal revision overdue · Cedarpoint"
            detail="Sam's v2 has been awaiting your edits for 49 hours · client expecting it by Friday."
            actor="sam"
            client="cedarpoint"
            time="49h ago"
            actions={["Open Compass", "Snooze 1h"]}
          />
          <NotifItem
            severity="err"
            app="radar"
            title="Radar anomaly · Google CPL climbed 3 days"
            detail="CPL moved from $74 → $89 May 12–15 · suggested to Compass for review."
            actor={null}
            client="lakeside"
            time="5h ago"
            actions={["View in Radar"]}
          />
          <NotifItem
            severity="warn"
            app="atlas"
            title="Jess Kwon is at 105% capacity this week"
            detail="42 hours scheduled vs. 40-hour target · 2 reassignment suggestions available."
            actor="jess"
            time="6h ago"
            actions={["Open workload", "Reassign"]}
          />
          <NotifItem
            severity="warn"
            app="dock"
            title="Maple & Hide · 3 creatives awaiting client 18h"
            detail="Sam pinged Sarah at 9:01am · no response yet · escalation rule will fire in 6 hours."
            actor="sam"
            client="maple"
            time="18h ago"
            actions={["Send second nudge"]}
          />
          <NotifItem
            severity="info"
            app="bridge"
            title="Glasswing Studios completed onboarding"
            detail="127 fields captured · routed to Compass for proposal drafting (ETA 4 min)."
            actor={null}
            client="glasswing"
            time="1h ago"
            actions={["Open Glasswing"]}
            unread={false}
          />

          {/* Yesterday */}
          <NotifGroup label="Yesterday · May 15"/>
          <NotifItem
            severity="info"
            app="compass"
            title="Hartwell Law signed the proposal · $5.4K/mo"
            detail="11 ClickUp tasks created · Dock provisioned · Radar baseline import queued."
            actor="lin"
            client="hartwell"
            time="22h ago"
            actions={["Open project"]}
            unread={false}
          />
          <NotifItem
            severity="info"
            app="clickup"
            title="127 task updates synced from ClickUp"
            detail="5 workspaces · auto-sync · no conflicts."
            actor={null}
            time="1d ago"
            actions={[]}
            unread={false}
          />
          <NotifItem
            severity="warn"
            app="atlas"
            title="Tom Reyes mentioned you in 'Williston build · sprint plan'"
            detail={'"Lin — can you sanity-check the QA test list before Friday?"'}
            actor="tom"
            time="1d ago"
            actions={["Reply", "Open thread"]}
            unread={false}
          />

          <NotifGroup label="Earlier this week"/>
          <NotifItem
            severity="info"
            app="radar"
            title="Weekly report ready · Lakeside · Week 18"
            detail="Auto-generated · 4 KPIs · 2 anomalies flagged · sent to client portal."
            actor={null}
            client="lakeside"
            time="Mon 9:00am"
            actions={["Open report"]}
            unread={false}
          />
        </div>

        {/* Right rail */}
        <aside style={{ borderLeft: "1px solid var(--line)", background: "var(--bg)", padding: "20px 22px 22px", display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <div className="br-eyebrow" style={{ marginBottom: 8 }}>Severity</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {[
                ["Critical · auto-paged",   "var(--err)",  3],
                ["Action required",         "var(--warn)", 8],
                ["Informational",           "var(--ink-4)",16],
              ].map(([l, c, n]) => (
                <div key={l} style={{ display: "flex", alignItems: "center", gap: 8, padding: "5px 8px", border: "1px solid var(--line)", borderRadius: 7, background: "var(--surface)" }}>
                  <span style={{ width: 7, height: 7, borderRadius: 999, background: c }}/>
                  <span style={{ flex: 1, fontSize: 11.5 }}>{l}</span>
                  <span className="br-mono br-num" style={{ fontSize: 10.5, color: "var(--ink-5)" }}>{n}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="br-eyebrow" style={{ marginBottom: 8 }}>By source</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {[
                ["bridge",  2],
                ["compass", 4],
                ["dock",    3],
                ["radar",   2],
                ["beacon",  1],
                ["clickup", 8],
                ["atlas",   7],
              ].map(([k, n]) => (
                <div key={k} style={{ display: "flex", alignItems: "center", gap: 8, padding: "5px 8px", border: "1px solid var(--line)", borderRadius: 7 }}>
                  <AppPill kind={k} size="sm"/>
                  <div style={{ flex: 1 }}/>
                  <span className="br-mono br-num" style={{ fontSize: 10.5, color: "var(--ink-5)" }}>{n}</span>
                </div>
              ))}
            </div>
          </div>

          <Card padding={14}>
            <div className="br-eyebrow" style={{ marginBottom: 6 }}>Quiet hours</div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
              <span style={{ fontSize: 12.5, fontWeight: 500 }}>Mute non-critical</span>
              <Toggle on/>
            </div>
            <div className="br-mono" style={{ fontSize: 10.5, color: "var(--ink-5)" }}>9pm → 7am · weekends muted</div>
          </Card>

          <div style={{ marginTop: "auto", fontSize: 10.5, color: "var(--ink-5)", lineHeight: 1.55 }}>
            Routing rules send critical notifications to Slack #ops, email, and the founder's mobile · others stay in Atlas.
          </div>
        </aside>
      </div>
    </AtlasShell>
  );
}

function NotifGroup({ label }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "16px 0 10px" }}>
      <span style={{ fontSize: 11.5, fontWeight: 600, color: "var(--ink-3)" }}>{label}</span>
      <div style={{ flex: 1, height: 1, background: "var(--line)" }}/>
    </div>
  );
}

function NotifItem({ severity, app, title, detail, actor, client, time, actions, unread = true }) {
  const sevColors = {
    err: { bd: "#fecaca", bg: "var(--err-soft)", fg: "var(--err)", icon: "alert" },
    warn:{ bd: "#fcd34d", bg: "var(--warn-soft)", fg: "var(--warn)", icon: "alert" },
    info:{ bd: "var(--line)", bg: "var(--surface)", fg: "var(--ink-3)", icon: "info" },
  };
  const s = sevColors[severity];
  return (
    <div style={{
      padding: 14, marginBottom: 6,
      background: s.bg, border: `1px solid ${s.bd}`, borderRadius: 10,
      display: "grid", gridTemplateColumns: "auto 1fr auto", gap: 12, alignItems: "flex-start",
      opacity: unread ? 1 : 0.7,
    }}>
      {unread && severity !== "info" && (
        <div style={{ position: "absolute", marginLeft: -8, marginTop: 6, width: 6, height: 6, borderRadius: 999, background: s.fg }}/>
      )}
      <div style={{ width: 32, height: 32, borderRadius: 8, background: "#fff", border: `1px solid ${s.bd}`, color: s.fg, display: "grid", placeItems: "center", flexShrink: 0 }}>
        <Icon name={s.icon} size={14}/>
      </div>
      <div style={{ minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 4 }}>
          <AppPill kind={app} size="sm"/>
          {client && <ClientAvatar id={client} size={18}/>}
          {actor && <PersonAvatar id={actor} size={18}/>}
          <span className="br-mono" style={{ fontSize: 10.5, color: "var(--ink-5)" }}>{time}</span>
        </div>
        <div style={{ fontSize: 13.5, fontWeight: 600, letterSpacing: "-0.005em" }}>{title}</div>
        <div style={{ fontSize: 12.5, color: "var(--ink-3)", marginTop: 3, lineHeight: 1.55 }}>{detail}</div>
        {actions && actions.length > 0 && (
          <div style={{ display: "flex", gap: 6, marginTop: 10 }}>
            {actions.map((a, i) => (
              <Button key={a} variant={i === 0 ? "primary" : "outline"} size="sm" iconRight={i === 0 ? "arrow_right" : undefined}>{a}</Button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

Object.assign(window, { AClickUp, AApprovals, ANotifications, NotifGroup, NotifItem, ApprovalRow });
