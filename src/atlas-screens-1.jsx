/* global React, Icon, Button, Pill, Card, Toggle,
   AtlasShell, AtlasTopBar, HealthDot, ClientAvatar, ClientChip, PersonAvatar, CapacityBar, OpsKpi, AppPill, CLIENTS, TEAM, APPS */
// Atlas — screens part 1: Dashboard, Workload, Projects

// ─────────────────────────────────────────────────────────────
// 01 — Global Operations Dashboard
// ─────────────────────────────────────────────────────────────
function AOpsDashboard() {
  return (
    <AtlasShell
      active="dashboard"
      topBar={
        <AtlasTopBar
          section="OPERATE · DASHBOARD"
          title="How the business is running"
          sub="Thursday · May 16 · 9:42 AM"
          right={
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Pill tone="ok" size="sm"><HealthDot state="ok" pulse/><span style={{ marginLeft: 4 }}>All systems healthy</span></Pill>
              <Button variant="outline" size="sm" icon="sliders">View</Button>
              <Button variant="primary" size="sm" icon="plus">New project</Button>
            </div>
          }
        />
      }
    >
      <div className="br-scroll" style={{ flex: 1, overflowY: "auto", padding: "20px 28px 32px" }}>

        {/* KPI strip — 7 cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 10, marginBottom: 18 }}>
          <OpsKpi label="Active clients"     value="6"   sub="+1 this month"          icon="folder"  tone="neutral" delta="+1"/>
          <OpsKpi label="Active projects"    value="11"  sub="8 on track · 2 at risk" icon="layers"  tone="neutral"/>
          <OpsKpi label="Overdue tasks"      value="4"   sub="2 with client"          icon="alert"   tone="warn" delta="+2"/>
          <OpsKpi label="Team load"          value="87%" sub="5 people · 1 over"      icon="users"   tone="warn"/>
          <OpsKpi label="Pending approvals"  value="5"   sub="Avg. age 8h"            icon="check"   tone="warn"/>
          <OpsKpi label="Automations · 24h"  value="42 / 43" sub="1 failed · Beacon" icon="bolt"    tone="err"/>
          <OpsKpi label="Campaigns live"     value="9"   sub="3 launching this wk"    icon="megaphone" tone="ok"/>
        </div>

        {/* Two-col: priority alerts + capacity */}
        <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 14, marginBottom: 18 }}>
          {/* Priority Alerts — operationally critical */}
          <Card padding={0} style={{ overflow: "hidden" }}>
            <div style={{ padding: "14px 18px", borderBottom: "1px solid var(--line)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <div className="br-eyebrow">Priority alerts</div>
                <div style={{ fontSize: 15, fontWeight: 600, marginTop: 4, letterSpacing: "-0.005em" }}>What needs attention right now</div>
              </div>
              <Pill tone="err" size="sm" icon="alert">5 critical</Pill>
            </div>
            <div>
              <AlertRow
                tone="err"
                icon="alert"
                client="cedarpoint"
                title="Cedarpoint · proposal revisions overdue by 2 days"
                detail="Sam owns it · Compass v2 awaiting your edits"
                meta="Owner SP · 49h overdue"
                cta="Open in Compass"
              />
              <AlertRow
                tone="err"
                icon="bolt"
                client="lakeside"
                title="Beacon automation failed — recall workflow · Lakeside"
                detail="Dentrix API returned 503 at 7:14am · 1 patient affected"
                meta="Auto · 2h ago"
                cta="View failure log"
              />
              <AlertRow
                tone="warn"
                icon="users"
                client="northwind"
                title="Northwind · design pass missed Tuesday deadline"
                detail="Jess at 105% capacity · review reallocating to Tom"
                meta="Owner JK · 1d slipped"
                cta="Reassign"
              />
              <AlertRow
                tone="warn"
                icon="check"
                client="maple"
                title="Maple & Hide · 3 ad creatives awaiting client approval"
                detail="In Dock 18 hours · Sam pinged the client this morning"
                meta="Dock · 18h"
                cta="Nudge client"
              />
              <AlertRow
                tone="warn"
                icon="globe"
                client="lakeside"
                title="ClickUp sync delayed by 6 minutes"
                detail="Webhook backlog cleared at 9:38 · auto-recovered"
                meta="System · resolved"
                cta="View sync log"
                resolved
              />
            </div>
          </Card>

          {/* Team capacity */}
          <Card padding={20}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
              <div>
                <div className="br-eyebrow">Team capacity · this week</div>
                <div style={{ fontSize: 15, fontWeight: 600, marginTop: 4, letterSpacing: "-0.005em" }}>1 person over capacity</div>
              </div>
              <Button variant="ghost" size="sm" iconRight="arrow_right">Workload</Button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { id: "jess", pct: 105, hours: "42 / 40h", state: "over",  context: "Northwind + Lakeside design" },
                { id: "sam",  pct: 92,  hours: "37 / 40h", state: "near",  context: "5 clients · strategy" },
                { id: "tom",  pct: 78,  hours: "31 / 40h", state: "ok",    context: "Lakeside web build" },
                { id: "mike", pct: 64,  hours: "26 / 40h", state: "ok",    context: "Automations + ops" },
                { id: "lin",  pct: 42,  hours: "17 / 40h", state: "low",   context: "Founder · meetings" },
              ].map((p) => (
                <div key={p.id} style={{ display: "grid", gridTemplateColumns: "auto 1fr auto", gap: 10, alignItems: "center" }}>
                  <PersonAvatar id={p.id} size={32} presence="online"/>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 4 }}>
                      <div>
                        <span style={{ fontSize: 12.5, fontWeight: 600 }}>{TEAM[p.id].name}</span>
                        <span style={{ fontSize: 11, color: "var(--ink-4)", marginLeft: 6 }}>· {p.context}</span>
                      </div>
                      <span className="br-mono br-num" style={{ fontSize: 11, fontWeight: 600, color: p.state === "over" ? "var(--err)" : "var(--ink-2)" }}>
                        {p.pct}%
                      </span>
                    </div>
                    <CapacityBar pct={p.pct}/>
                    <div className="br-mono" style={{ fontSize: 10, color: "var(--ink-5)", marginTop: 3 }}>{p.hours}</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 14, paddingTop: 12, borderTop: "1px solid var(--line)", display: "flex", gap: 12 }}>
              <div>
                <div className="br-eyebrow" style={{ fontSize: 9.5 }}>Avg. utilization</div>
                <div className="br-num" style={{ fontSize: 18, fontWeight: 600, marginTop: 2 }}>76%</div>
              </div>
              <div>
                <div className="br-eyebrow" style={{ fontSize: 9.5 }}>Billable</div>
                <div className="br-num" style={{ fontSize: 18, fontWeight: 600, marginTop: 2 }}>82%</div>
              </div>
              <div>
                <div className="br-eyebrow" style={{ fontSize: 9.5 }}>This week vs. last</div>
                <div className="br-num" style={{ fontSize: 18, fontWeight: 600, marginTop: 2, color: "var(--ok)" }}>+4%</div>
              </div>
            </div>
          </Card>
        </div>

        {/* Two-col: Activity feed + client portfolio */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.3fr", gap: 14 }}>
          {/* Activity feed */}
          <Card padding={0} style={{ overflow: "hidden" }}>
            <div style={{ padding: "14px 18px", borderBottom: "1px solid var(--line)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <div className="br-eyebrow">Activity · live</div>
                <div style={{ fontSize: 15, fontWeight: 600, marginTop: 4, letterSpacing: "-0.005em" }}>The last hour</div>
              </div>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 11, color: "var(--ink-4)" }}>
                <HealthDot state="ok" pulse size={6}/> Live
              </span>
            </div>
            <div className="br-scroll" style={{ maxHeight: 360, overflowY: "auto" }}>
              {[
                { time: "9:38am", kind: "Approval requested", actor: "sam", text: "Maple & Hide · 3 ad creatives · awaiting client", app: "dock", client: "maple" },
                { time: "9:22am", kind: "Task completed",     actor: "jess", text: "Williston landing — v1 design pass shipped", app: "clickup", client: "lakeside" },
                { time: "9:14am", kind: "Automation triggered", actor: null, text: "Compass.contract.signed → 11 ClickUp tasks created (Hartwell Law)", app: "atlas", client: "hartwell" },
                { time: "8:50am", kind: "Automation failed",  actor: null, text: "Beacon recall · Dentrix 503 · auto-retry in 5min", app: "beacon", client: "lakeside", error: true },
                { time: "8:42am", kind: "Project created",    actor: "lin",  text: "Glasswing Studios · brand refresh · 8 tasks", app: "atlas", client: "glasswing" },
                { time: "8:33am", kind: "Campaign launched",  actor: "sam",  text: "Williston launch · Q2 ads now live on Meta", app: "radar", client: "lakeside" },
                { time: "8:18am", kind: "Proposal approved",  actor: null, text: "Hartwell Law · Compass v2 · signed", app: "compass", client: "hartwell" },
                { time: "8:02am", kind: "Sync · ClickUp",     actor: null, text: "127 task updates synced from ClickUp (5 workspaces)", app: "clickup" },
              ].map((row, i) => (
                <div key={i} style={{ display: "grid", gridTemplateColumns: "auto 1fr auto", gap: 10, padding: "10px 18px", borderTop: i > 0 ? "1px solid var(--line-faint)" : "none", alignItems: "flex-start" }}>
                  <span className="br-mono" style={{ fontSize: 10.5, color: "var(--ink-5)", paddingTop: 2 }}>{row.time}</span>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap", marginBottom: 2 }}>
                      <span className="br-mono" style={{ fontSize: 10, color: row.error ? "var(--err)" : "var(--ink-4)", textTransform: "uppercase", letterSpacing: ".06em", fontWeight: 600 }}>{row.kind}</span>
                      <AppPill kind={row.app} size="sm"/>
                      {row.client && <ClientAvatar id={row.client} size={16}/>}
                    </div>
                    <div style={{ fontSize: 12.5, color: row.error ? "var(--err)" : "var(--ink-2)", lineHeight: 1.4 }}>{row.text}</div>
                  </div>
                  {row.actor && <PersonAvatar id={row.actor} size={22}/>}
                </div>
              ))}
            </div>
          </Card>

          {/* Client portfolio */}
          <Card padding={0} style={{ overflow: "hidden" }}>
            <div style={{ padding: "14px 18px", borderBottom: "1px solid var(--line)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <div className="br-eyebrow">Client portfolio · health</div>
                <div style={{ fontSize: 15, fontWeight: 600, marginTop: 4, letterSpacing: "-0.005em" }}>6 active engagements</div>
              </div>
              <div style={{ display: "flex", gap: 6 }}>
                <Pill tone="ok" size="sm">4 healthy</Pill>
                <Pill tone="warn" size="sm">1 at risk</Pill>
                <Pill tone="err" size="sm">1 escalated</Pill>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1.6fr 0.7fr 0.7fr 0.7fr 0.5fr 28px", padding: "8px 18px", background: "var(--surface-2)", fontSize: 10, color: "var(--ink-5)", fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: ".06em", fontWeight: 600, gap: 8 }}>
              <span>Client · stage</span><span style={{ textAlign: "right" }}>MRR</span><span style={{ textAlign: "right" }}>Tasks</span><span style={{ textAlign: "right" }}>Team</span><span style={{ textAlign: "center" }}>Health</span><span/>
            </div>
            {[
              { id: "lakeside",  stage: "Execution · M4",  mrr: "$8.8K", tasks: "23 / 8", team: ["sam","jess","tom","mike"], health: "ok"   },
              { id: "northwind", stage: "Execution · M2",  mrr: "$6.4K", tasks: "18 / 5", team: ["sam","jess"],               health: "warn" },
              { id: "maple",     stage: "Execution · M5",  mrr: "$12K",  tasks: "31 / 12",team: ["sam","jess","mike"],        health: "ok"   },
              { id: "hartwell",  stage: "Onboarding",      mrr: "$5.4K", tasks: "11 / 11",team: ["sam"],                       health: "ok"   },
              { id: "cedarpoint",stage: "Proposal · v2",   mrr: "—",     tasks: "0 / 4",  team: ["sam","lin"],                 health: "err"  },
              { id: "glasswing", stage: "Kickoff",         mrr: "$6.2K", tasks: "8 / 0",  team: ["sam","jess"],                health: "ok"   },
            ].map((row, i) => (
              <div key={row.id} style={{ display: "grid", gridTemplateColumns: "1.6fr 0.7fr 0.7fr 0.7fr 0.5fr 28px", padding: "12px 18px", gap: 8, alignItems: "center", borderTop: i > 0 ? "1px solid var(--line-faint)" : "none" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
                  <ClientAvatar id={row.id}/>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: "-0.005em" }}>{CLIENTS[row.id].name}</div>
                    <div className="br-mono" style={{ fontSize: 10.5, color: "var(--ink-5)" }}>{row.stage}</div>
                  </div>
                </div>
                <span className="br-num" style={{ fontSize: 13, fontWeight: 600, textAlign: "right" }}>{row.mrr}</span>
                <span className="br-mono br-num" style={{ fontSize: 11.5, textAlign: "right", color: "var(--ink-3)" }}>{row.tasks}</span>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <div style={{ display: "flex" }}>
                    {row.team.slice(0, 4).map((t, idx) => (
                      <div key={t} style={{ marginLeft: idx > 0 ? -8 : 0, border: "1.5px solid var(--surface)", borderRadius: 999 }}>
                        <PersonAvatar id={t} size={22}/>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <HealthDot state={row.health}/>
                </div>
                <Icon name="chevron_right" size={13} color="var(--ink-4)"/>
              </div>
            ))}
          </Card>
        </div>
      </div>
    </AtlasShell>
  );
}

function AlertRow({ tone, icon, client, title, detail, meta, cta, resolved }) {
  const tones = {
    err:  { bg: "var(--err-soft)",  bd: "#fecaca", fg: "var(--err)" },
    warn: { bg: "var(--warn-soft)", bd: "#fcd34d", fg: "var(--warn)" },
  };
  const t = tones[tone];
  return (
    <div style={{
      padding: "12px 18px", borderTop: "1px solid var(--line-faint)",
      display: "grid", gridTemplateColumns: "auto auto 1fr auto auto", gap: 12, alignItems: "center",
      background: resolved ? "var(--surface-2)" : "transparent",
      opacity: resolved ? .6 : 1,
    }}>
      <div style={{ width: 28, height: 28, borderRadius: 7, background: t.bg, color: t.fg, border: `1px solid ${t.bd}`, display: "grid", placeItems: "center" }}>
        <Icon name={icon} size={13}/>
      </div>
      {client ? <ClientAvatar id={client} size={28}/> : <div style={{ width: 28 }}/>}
      <div style={{ minWidth: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: "-0.005em" }}>{title}</div>
        <div style={{ fontSize: 11.5, color: "var(--ink-4)", marginTop: 2 }}>{detail}</div>
      </div>
      <span className="br-mono" style={{ fontSize: 10.5, color: "var(--ink-5)", whiteSpace: "nowrap" }}>{meta}</span>
      {resolved ? <Pill tone="ok" size="sm" icon="check">Resolved</Pill> : <Button variant="outline" size="sm" iconRight="arrow_right">{cta}</Button>}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 02 — Team Workload Management
// ─────────────────────────────────────────────────────────────
function AWorkload() {
  // 5 people × 14 days (Mon May 12 → Sun May 25). Numbers represent hours/day.
  const team = [
    { id: "sam",  total: 37, weekHrs: [8, 9, 7, 8, 5, 0, 0,  9, 8, 9, 7, 5, 0, 0], skill: "Strategy" },
    { id: "jess", total: 42, weekHrs: [9, 10, 8, 9, 6, 0, 0,  10, 9, 9, 8, 6, 0, 0], skill: "Design" },
    { id: "tom",  total: 31, weekHrs: [7, 8, 6, 7, 3, 0, 0,  8, 6, 7, 7, 3, 0, 0], skill: "Dev" },
    { id: "mike", total: 26, weekHrs: [6, 5, 7, 5, 3, 0, 0,  5, 6, 5, 5, 2, 0, 0], skill: "Ops" },
    { id: "lin",  total: 17, weekHrs: [4, 3, 3, 4, 3, 0, 0,  4, 3, 4, 3, 3, 0, 0], skill: "Founder" },
  ];
  const dayLabels = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun","Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
  const dayDates  = ["12","13","14","15","16","17","18","19","20","21","22","23","24","25"];

  const cellColor = (hrs) => {
    if (hrs === 0)  return "var(--surface-2)";
    if (hrs <= 3)  return "#eef0ff";
    if (hrs <= 5)  return "#c7d2fe";
    if (hrs <= 7)  return "#a5b4fc";
    if (hrs <= 8)  return "#818cf8";
    if (hrs === 9) return "#6366f1";
    return "#ef4444"; // 10+ = over
  };

  return (
    <AtlasShell
      active="workload"
      topBar={<AtlasTopBar
        section="OPERATE · TEAM WORKLOAD"
        title="Who's loaded, who has room"
        sub="Two-week view · synced from ClickUp time-tracking"
        right={
          <div style={{ display: "flex", gap: 8 }}>
            <Button variant="ghost" size="sm">By skill</Button>
            <Button variant="ghost" size="sm">By client</Button>
            <Button variant="outline" size="sm" icon="sliders">View</Button>
            <Button variant="primary" size="sm" icon="plus">Assign work</Button>
          </div>
        }/>}
    >
      <div className="br-scroll" style={{ flex: 1, overflowY: "auto", padding: "20px 28px 32px" }}>

        {/* Capacity strip */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 10, marginBottom: 18 }}>
          <OpsKpi label="Team avg utilization" value="76%"  sub="vs. 72% prev. wk" icon="users" tone="ok" delta="+4%"/>
          <OpsKpi label="People over capacity" value="1"    sub="Jess · 105%"      icon="alert" tone="err"/>
          <OpsKpi label="Bench hours"          value="58"   sub="across 5 people"  icon="bolt"  tone="ok"/>
          <OpsKpi label="Billable rate"        value="82%"  sub="target ≥ 75%"     icon="target" tone="ok"/>
          <OpsKpi label="Reassignments · wk"   value="3"    sub="2 auto · 1 manual" icon="layers" tone="neutral"/>
        </div>

        {/* Workload heatmap */}
        <Card padding={0} style={{ overflow: "hidden", marginBottom: 18 }}>
          <div style={{ padding: "14px 18px", borderBottom: "1px solid var(--line)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <div className="br-eyebrow">Workload heatmap</div>
              <div style={{ fontSize: 15, fontWeight: 600, marginTop: 4 }}>Hours per day · 2 weeks</div>
            </div>
            {/* Legend */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 10.5, color: "var(--ink-4)" }}>
              <span>Less</span>
              {[1, 4, 6, 8, 9, 11].map((h) => <span key={h} style={{ width: 12, height: 12, borderRadius: 3, background: cellColor(h) }}/>)}
              <span>Over</span>
            </div>
          </div>

          <div style={{ padding: "12px 18px" }}>
            {/* Day-of-week header */}
            <div style={{ display: "grid", gridTemplateColumns: "200px repeat(14, 1fr) 100px", gap: 4, marginBottom: 6 }}>
              <span/>
              {dayLabels.map((d, i) => (
                <div key={i} style={{ textAlign: "center", padding: i === 6 || i === 13 ? "0 0 0 0" : 0, borderLeft: i === 7 ? "1px dashed var(--line-strong)" : "none" }}>
                  <div className="br-mono" style={{ fontSize: 9, color: "var(--ink-5)", textTransform: "uppercase", letterSpacing: ".06em" }}>{d}</div>
                  <div className="br-mono br-num" style={{ fontSize: 10, color: "var(--ink-4)" }}>{dayDates[i]}</div>
                </div>
              ))}
              <span style={{ textAlign: "right", paddingRight: 4 }}>
                <div className="br-mono" style={{ fontSize: 9, color: "var(--ink-5)" }}>UTIL.</div>
              </span>
            </div>

            {team.map((p) => {
              const pct = Math.round((p.total / 40) * 100);
              const tone = pct > 100 ? "var(--err)" : pct > 85 ? "var(--warn)" : "var(--ink-2)";
              return (
                <div key={p.id} style={{ display: "grid", gridTemplateColumns: "200px repeat(14, 1fr) 100px", gap: 4, alignItems: "center", padding: "6px 0", borderTop: "1px solid var(--line-faint)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <PersonAvatar id={p.id} size={28} presence="online"/>
                    <div>
                      <div style={{ fontSize: 12.5, fontWeight: 600 }}>{TEAM[p.id].name}</div>
                      <div className="br-mono" style={{ fontSize: 10, color: "var(--ink-5)" }}>{p.skill}</div>
                    </div>
                  </div>
                  {p.weekHrs.map((h, i) => (
                    <div key={i} style={{ aspectRatio: "1/1", borderRadius: 4, background: cellColor(h), display: "grid", placeItems: "center", minHeight: 26, borderLeft: i === 7 ? "1px dashed var(--line-strong)" : "none" }}>
                      {h > 0 && <span className="br-mono br-num" style={{ fontSize: 9.5, color: h >= 8 ? "#fff" : "var(--ink-2)", fontWeight: 600 }}>{h}</span>}
                    </div>
                  ))}
                  <div style={{ textAlign: "right", paddingRight: 4 }}>
                    <div className="br-num" style={{ fontSize: 13, fontWeight: 600, color: tone }}>{p.total}h</div>
                    <div className="br-mono br-num" style={{ fontSize: 10, color: tone }}>{pct}%</div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Two-col: per-person breakdown + suggestions */}
        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 14 }}>
          <Card padding={0} style={{ overflow: "hidden" }}>
            <div style={{ padding: "14px 18px", borderBottom: "1px solid var(--line)" }}>
              <div className="br-eyebrow">Jess Kwon · this week</div>
              <div style={{ fontSize: 15, fontWeight: 600, marginTop: 4, display: "flex", alignItems: "baseline", gap: 8 }}>
                <PersonAvatar id="jess" size={20}/>
                Why she's at 105%
              </div>
            </div>
            <div style={{ padding: 18, display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { client: "lakeside",  task: "Williston landing · v2 design", hrs: 14, ws: "Design" },
                { client: "northwind", task: "Homepage rebuild · component library", hrs: 12, ws: "Design" },
                { client: "lakeside",  task: "Burlington page · wires + visual", hrs: 10, ws: "Design" },
                { client: "maple",     task: "Q3 campaign creative · 6 ads", hrs: 6, ws: "Design" },
              ].map((t) => (
                <div key={t.task} style={{ display: "grid", gridTemplateColumns: "auto 1fr auto auto", gap: 12, alignItems: "center", padding: "10px 12px", border: "1px solid var(--line)", borderRadius: 8 }}>
                  <ClientAvatar id={t.client} size={28}/>
                  <div>
                    <div style={{ fontSize: 12.5, fontWeight: 500 }}>{t.task}</div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 2 }}>
                      <span style={{ fontSize: 11, color: "var(--ink-4)" }}>{CLIENTS[t.client].name}</span>
                      <span style={{ width: 2, height: 2, borderRadius: 999, background: "var(--ink-5)" }}/>
                      <AppPill kind="clickup" size="sm"/>
                    </div>
                  </div>
                  <span className="br-num" style={{ fontSize: 13, fontWeight: 600 }}>{t.hrs}h</span>
                  <Icon name="chevron_right" size={13} color="var(--ink-4)"/>
                </div>
              ))}
              <div style={{ padding: "10px 12px", background: "var(--err-soft)", border: "1px solid #fecaca", borderRadius: 8, display: "flex", alignItems: "center", gap: 10 }}>
                <Icon name="alert" size={14} color="var(--err)"/>
                <span style={{ flex: 1, fontSize: 12.5, color: "var(--err)" }}>42 hours scheduled · 2 over capacity</span>
              </div>
            </div>
          </Card>

          <Card padding={20}>
            <div className="br-eyebrow" style={{ marginBottom: 4 }}>Atlas suggestions · rebalance</div>
            <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 14, letterSpacing: "-0.005em" }}>Move work to free up Jess</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <ReassignSuggestion
                from="jess"
                to="tom"
                task="Maple & Hide · Q3 campaign creative"
                fromHrs="42h → 36h"
                toHrs="31h → 37h"
              />
              <ReassignSuggestion
                from="jess"
                to="lin"
                task="Northwind · component library audit"
                fromHrs="42h → 38h"
                toHrs="17h → 21h"
                skill="founder review"
              />
              <ReassignSuggestion
                from="sam"
                to="mike"
                task="Hartwell Law · onboarding checklist"
                fromHrs="37h → 35h"
                toHrs="26h → 28h"
              />
            </div>
            <div style={{ marginTop: 14, paddingTop: 12, borderTop: "1px solid var(--line)", fontSize: 11.5, color: "var(--ink-4)" }}>
              <Icon name="info" size={11}/> Suggestions rank by skill match · client continuity · billable rate · current utilization.
            </div>
          </Card>
        </div>
      </div>
    </AtlasShell>
  );
}

function ReassignSuggestion({ from, to, task, fromHrs, toHrs, skill }) {
  return (
    <div style={{ padding: 12, border: "1px solid var(--line)", borderRadius: 10, background: "var(--surface)" }}>
      <div style={{ fontSize: 12.5, fontWeight: 500, marginBottom: 8 }}>{task}</div>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, flex: 1 }}>
          <PersonAvatar id={from} size={20}/>
          <span className="br-mono" style={{ fontSize: 10.5, color: "var(--err)" }}>{fromHrs}</span>
        </div>
        <Icon name="arrow_right" size={13} color="var(--ink-4)"/>
        <div style={{ display: "flex", alignItems: "center", gap: 6, flex: 1, justifyContent: "flex-end" }}>
          <span className="br-mono" style={{ fontSize: 10.5, color: "var(--ok)" }}>{toHrs}</span>
          <PersonAvatar id={to} size={20}/>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 10 }}>
        {skill && <Pill tone="neutral" size="sm">{skill}</Pill>}
        <div style={{ flex: 1 }}/>
        <Button variant="ghost" size="sm">Dismiss</Button>
        <Button variant="primary" size="sm" icon="check">Reassign</Button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 03 — Project Orchestration View
// ─────────────────────────────────────────────────────────────
function AProjects() {
  return (
    <AtlasShell
      active="projects"
      topBar={<AtlasTopBar
        section="OPERATE · PROJECTS"
        title="All client engagements"
        sub="High-level operational view · 11 projects across 6 clients"
        right={
          <div style={{ display: "flex", gap: 8 }}>
            <Button variant="ghost" size="sm" icon="layers">By phase</Button>
            <Button variant="ghost" size="sm" icon="folder">By client</Button>
            <Button variant="outline" size="sm" iconRight="arrow_right">Open in ClickUp</Button>
            <Button variant="primary" size="sm" icon="plus">New project</Button>
          </div>
        }/>}
    >
      <div className="br-scroll" style={{ flex: 1, overflowY: "auto", padding: "20px 28px 32px" }}>

        {/* Phase rail summary */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 8, marginBottom: 18 }}>
          {[
            ["Proposal",   2, "var(--ink-4)",  "1 awaiting client"],
            ["Onboarding", 1, "var(--accent)", "Bridge in progress"],
            ["Execution",  6, "var(--ink)",    "4 on track · 2 at risk"],
            ["Review",     1, "var(--ai)",     "Final QA"],
            ["Closed",     1, "var(--ok)",     "This month"],
          ].map(([l, n, c, sub]) => (
            <div key={l} style={{ padding: 14, background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 10, boxShadow: "var(--shadow-1)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ width: 8, height: 8, borderRadius: 999, background: c }}/>
                <span className="br-eyebrow" style={{ fontSize: 9.5 }}>{l}</span>
              </div>
              <div className="br-num" style={{ fontSize: 24, fontWeight: 600, letterSpacing: "-0.025em", marginTop: 4 }}>{n}</div>
              <div style={{ fontSize: 11, color: "var(--ink-4)", marginTop: 2 }}>{sub}</div>
            </div>
          ))}
        </div>

        {/* Project orchestration list — each row is a phase-progressing project */}
        <Card padding={0} style={{ overflow: "hidden" }}>
          <div style={{ padding: "14px 18px", borderBottom: "1px solid var(--line)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <div className="br-eyebrow">Projects in flight · 11</div>
              <div style={{ fontSize: 15, fontWeight: 600, marginTop: 4 }}>Phase, departments, blockers, health</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11.5, color: "var(--ink-4)" }}>
              <HealthDot state="ok"/> healthy
              <HealthDot state="warn" pulse/> at risk
              <HealthDot state="err"/> escalated
            </div>
          </div>

          {[
            {
              client: "lakeside",  name: "Lakeside · growth engagement",     mrr: "$8.8K/mo",
              phase: 2, phases: ["Proposal","Onboarding","Execution","Review","Closed"],
              depts: ["strategy","design","dev","ops"], pct: 38, blockers: 1, health: "ok",
              next: "Williston landing v2 design due Tue",
              tasks: { done: 23, total: 8 },
            },
            {
              client: "northwind", name: "Northwind · DTC site rebuild",      mrr: "$6.4K/mo",
              phase: 2, phases: ["Proposal","Onboarding","Execution","Review","Closed"],
              depts: ["strategy","design"], pct: 52, blockers: 2, health: "warn",
              next: "Reassigning component library work",
              tasks: { done: 18, total: 5 },
            },
            {
              client: "maple",     name: "Maple & Hide · Q3 campaign",        mrr: "$12K/mo",
              phase: 2, phases: ["Proposal","Onboarding","Execution","Review","Closed"],
              depts: ["strategy","design","ops"], pct: 68, blockers: 0, health: "ok",
              next: "3 ad creatives awaiting client approval",
              tasks: { done: 31, total: 12 },
            },
            {
              client: "hartwell",  name: "Hartwell Law · onboarding",         mrr: "$5.4K/mo",
              phase: 1, phases: ["Proposal","Onboarding","Execution","Review","Closed"],
              depts: ["strategy"], pct: 12, blockers: 0, health: "ok",
              next: "Bridge complete · Compass routing 8 deliverables",
              tasks: { done: 11, total: 11 },
            },
            {
              client: "cedarpoint",name: "Cedarpoint · SaaS proposal v2",     mrr: "—",
              phase: 0, phases: ["Proposal","Onboarding","Execution","Review","Closed"],
              depts: ["strategy"], pct: 75, blockers: 1, health: "err",
              next: "Overdue · founder review needed",
              tasks: { done: 0, total: 4 },
            },
            {
              client: "glasswing", name: "Glasswing · brand kickoff",         mrr: "$6.2K/mo",
              phase: 1, phases: ["Proposal","Onboarding","Execution","Review","Closed"],
              depts: ["strategy","design"], pct: 30, blockers: 0, health: "ok",
              next: "Discovery workshop scheduled May 21",
              tasks: { done: 8, total: 0 },
            },
          ].map((p, i) => (
            <ProjectRow key={p.client} {...p} divider={i > 0}/>
          ))}
        </Card>
      </div>
    </AtlasShell>
  );
}

function ProjectRow({ client, name, mrr, phases, phase, depts, pct, blockers, health, next, tasks, divider }) {
  const deptColors = { strategy: "var(--accent)", design: "#fce7f3", dev: "var(--ok-soft)", ops: "var(--warn-soft)" };
  const deptFg = { strategy: "#fff", design: "#9d174d", dev: "#166534", ops: "#92400e" };
  const deptBg = { strategy: "#4f46e5", design: "#fce7f3", dev: "#dcfce7", ops: "#fef3c7" };
  return (
    <div style={{
      padding: "16px 18px",
      borderTop: divider ? "1px solid var(--line-faint)" : "none",
      display: "grid", gridTemplateColumns: "300px 1fr 200px 80px 80px 28px", gap: 16, alignItems: "center",
    }}>
      {/* Client + name */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
        <ClientAvatar id={client} size={36}/>
        <div style={{ minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ fontSize: 13.5, fontWeight: 600, letterSpacing: "-0.005em" }}>{name}</span>
            <HealthDot state={health}/>
          </div>
          <div className="br-mono" style={{ fontSize: 10.5, color: "var(--ink-5)", marginTop: 2 }}>{mrr}</div>
          <div style={{ display: "flex", gap: 3, marginTop: 6 }}>
            {depts.map((d) => (
              <span key={d} style={{
                padding: "2px 7px", borderRadius: 999, fontSize: 10, fontWeight: 600,
                background: deptBg[d], color: deptFg[d],
              }}>{d}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Phase strip */}
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
          {phases.map((s, i) => {
            const done = i < phase;
            const active = i === phase;
            return (
              <React.Fragment key={s}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
                  <div style={{
                    width: 14, height: 14, borderRadius: 999,
                    background: done ? "var(--ink)" : active ? "var(--surface)" : "var(--surface)",
                    border: done ? "1px solid var(--ink)" : active ? "1.5px solid var(--accent)" : "1.5px solid var(--line-strong)",
                    display: "grid", placeItems: "center", color: "#fff",
                  }}>
                    {done && <Icon name="check" size={8} strokeWidth={3}/>}
                    {active && <div style={{ width: 5, height: 5, borderRadius: 999, background: "var(--accent)" }}/>}
                  </div>
                  <span style={{ fontSize: 10.5, fontWeight: active ? 600 : 500, color: done ? "var(--ink-3)" : active ? "var(--ink)" : "var(--ink-4)" }}>{s}</span>
                </div>
                {i < phases.length - 1 && <div style={{ flex: 1, height: 1.5, margin: "0 8px", background: i < phase ? "var(--ink)" : "var(--line-strong)" }}/>}
              </React.Fragment>
            );
          })}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 8 }}>
          <Icon name="info" size={11} color="var(--ink-4)"/>
          <span style={{ fontSize: 11.5, color: "var(--ink-3)" }}>{next}</span>
        </div>
      </div>

      {/* Progress */}
      <div>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 4 }}>
          <span className="br-num" style={{ fontSize: 12.5, fontWeight: 600 }}>{pct}%</span>
          <span className="br-mono br-num" style={{ fontSize: 10, color: "var(--ink-5)" }}>{tasks.done}/{tasks.total + tasks.done} tasks</span>
        </div>
        <div style={{ height: 5, borderRadius: 999, background: "var(--surface-3)", overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${pct}%`, background: health === "err" ? "var(--err)" : health === "warn" ? "var(--warn)" : "var(--ink)" }}/>
        </div>
      </div>

      {/* Blockers */}
      <div style={{ textAlign: "center" }}>
        {blockers > 0 ? (
          <Pill tone={health === "err" ? "err" : "warn"} size="sm" icon="alert">{blockers}</Pill>
        ) : (
          <Pill tone="ok" size="sm" icon="check">Clear</Pill>
        )}
      </div>

      {/* App refs */}
      <div style={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
        <AppPill kind="clickup" size="sm"/>
        <AppPill kind="dock" size="sm"/>
      </div>

      <Icon name="chevron_right" size={14} color="var(--ink-4)"/>
    </div>
  );
}

Object.assign(window, { AOpsDashboard, AWorkload, AProjects, AlertRow, ProjectRow, ReassignSuggestion });
