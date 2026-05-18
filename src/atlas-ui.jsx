/* global React, Icon, Button, Pill, Card */
// Atlas — UI primitives. Light Stripe-clean to match the ecosystem.

// ─────────────────────────────────────────────────────────────
// Atlas wordmark — node mesh mark
// ─────────────────────────────────────────────────────────────
function AtlasWordmark({ size = 18 }) {
  const px = size === "lg" ? 26 : 22;
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "var(--ink)", fontFamily: "var(--font-display)", fontWeight: 600, letterSpacing: "-0.04em", fontSize: size === "lg" ? 24 : 18 }}>
      <div style={{
        width: px, height: px, borderRadius: 6,
        background: "linear-gradient(135deg, #0c0a09 0%, #292524 100%)",
        position: "relative", display: "grid", placeItems: "center",
        boxShadow: "inset 0 0 0 1px rgba(255,255,255,.06), 0 1px 2px rgba(0,0,0,.18)",
      }}>
        <svg width={px - 4} height={px - 4} viewBox="0 0 18 18" fill="none">
          {/* Nodes connected in a mesh */}
          <line x1="4" y1="4" x2="14" y2="4" stroke="#fff" strokeWidth="1" opacity=".4"/>
          <line x1="4" y1="4" x2="9" y2="14" stroke="#fff" strokeWidth="1" opacity=".4"/>
          <line x1="14" y1="4" x2="9" y2="14" stroke="#fff" strokeWidth="1" opacity=".4"/>
          <line x1="4" y1="4" x2="14" y2="14" stroke="#fff" strokeWidth="1" opacity=".25"/>
          <line x1="14" y1="4" x2="4" y2="14" stroke="#fff" strokeWidth="1" opacity=".25"/>
          <circle cx="4" cy="4" r="2" fill="#fff"/>
          <circle cx="14" cy="4" r="2" fill="#fff"/>
          <circle cx="9" cy="14" r="2" fill="#4f46e5"/>
          <circle cx="4" cy="14" r="1.4" fill="#fff" opacity=".5"/>
          <circle cx="14" cy="14" r="1.4" fill="#fff" opacity=".5"/>
        </svg>
      </div>
      Atlas
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// AtlasShell — left rail navigation
// ─────────────────────────────────────────────────────────────
function AtlasShell({ active = "dashboard", children, topBar }) {
  const groups = [
    { title: "Operate", items: [
        ["dashboard",   "Dashboard",        "target",   true],
        ["workload",    "Workload",         "users"],
        ["projects",    "Projects",         "layers"],
        ["approvals",   "Approvals",        "check"],
    ]},
    { title: "Coordinate", items: [
        ["notifications","Notifications",   "bolt"],
        ["clickup",     "ClickUp sync",     "globe"],
        ["ecosystem",   "Ecosystem",        "map"],
    ]},
    { title: "Setup", items: [
        ["onboarding",  "Onboarding",       "sparkle"],
    ]},
  ];

  return (
    <div className="br-frame" style={{ flexDirection: "row" }}>
      <aside style={{
        width: 232, flexShrink: 0, borderRight: "1px solid var(--line)",
        background: "var(--bg)", padding: "16px 14px 14px 18px",
        display: "flex", flexDirection: "column", gap: 18,
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <AtlasWordmark/>
          <Pill tone="neutral" size="sm">Op-center</Pill>
        </div>

        {/* Org switcher */}
        <div style={{
          padding: 10, borderRadius: 9, background: "var(--surface)",
          border: "1px solid var(--line)", boxShadow: "var(--shadow-1)",
          display: "flex", alignItems: "center", gap: 9, cursor: "pointer",
        }}>
          <div style={{
            width: 28, height: 28, borderRadius: 7,
            background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
            color: "#fff", display: "grid", placeItems: "center", fontWeight: 700, fontSize: 12, letterSpacing: "-0.01em",
          }}>DN</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 12.5, fontWeight: 600, letterSpacing: "-0.005em" }}>Digital Native</div>
            <div className="br-mono" style={{ fontSize: 10, color: "var(--ink-5)" }}>5 people · 8 active</div>
          </div>
          <Icon name="chevron_down" size={12} color="var(--ink-4)"/>
        </div>

        {/* Command bar trigger */}
        <button style={{
          padding: "8px 10px", borderRadius: 8, background: "var(--surface)",
          border: "1px solid var(--line)", boxShadow: "var(--shadow-1)",
          display: "flex", alignItems: "center", gap: 8, fontFamily: "var(--font-sans)", cursor: "pointer", color: "var(--ink-4)",
          fontSize: 12.5,
        }}>
          <Icon name="search" size={13}/>
          <span style={{ flex: 1, textAlign: "left" }}>Search or run command…</span>
          <span className="br-mono" style={{ fontSize: 10, padding: "1px 5px", border: "1px solid var(--line)", borderRadius: 4, color: "var(--ink-5)" }}>⌘K</span>
        </button>

        <nav style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {groups.map((g) => (
            <div key={g.title}>
              <div className="br-eyebrow" style={{ fontSize: 9.5, paddingLeft: 6, marginBottom: 4 }}>{g.title}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
                {g.items.map(([k, l, i, badge]) => {
                  const a = k === active;
                  return (
                    <div key={k} style={{
                      display: "flex", alignItems: "center", gap: 9, padding: "7px 10px", borderRadius: 7,
                      background: a ? "var(--surface)" : "transparent",
                      border: a ? "1px solid var(--line)" : "1px solid transparent",
                      boxShadow: a ? "var(--shadow-1)" : "none",
                      cursor: "pointer",
                    }}>
                      <Icon name={i} size={13} color={a ? "var(--accent)" : "var(--ink-4)"}/>
                      <span style={{ flex: 1, fontSize: 13, fontWeight: a ? 600 : 500, color: a ? "var(--ink)" : "var(--ink-2)", letterSpacing: "-0.005em" }}>{l}</span>
                      {/* Per-item badge */}
                      {k === "approvals" && <Pill tone="warn" size="sm">5</Pill>}
                      {k === "notifications" && <span style={{ width: 6, height: 6, borderRadius: 999, background: "var(--err)" }}/>}
                      {k === "clickup" && <Pill tone="ok" size="sm">·</Pill>}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Team list */}
        <div>
          <div className="br-eyebrow" style={{ fontSize: 9.5, paddingLeft: 6, marginBottom: 6 }}>Team · online now</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {[
              ["Sam Patel",  "SP", "#7c2d12", "online", "Strategy"],
              ["Jess Kwon",  "JK", "#0c4a6e", "online", "Design"],
              ["Mike Diaz",  "MD", "#065f46", "online", "Implementation"],
              ["Tom Reyes",  "TR", "#7c3aed", "away",   "Dev"],
              ["Lin (you)",  "L",  "#1c1917", "online", "Founder"],
            ].map(([n, i, bg, pr, role]) => (
              <div key={n} style={{ display: "flex", alignItems: "center", gap: 8, padding: "5px 6px", borderRadius: 6 }}>
                <div style={{ position: "relative", width: 22, height: 22, flexShrink: 0 }}>
                  <div style={{ width: 22, height: 22, borderRadius: 999, background: bg, color: "#fff", display: "grid", placeItems: "center", fontSize: 9.5, fontWeight: 600 }}>{i}</div>
                  <span style={{ position: "absolute", bottom: -1, right: -1, width: 7, height: 7, borderRadius: 999, background: pr === "online" ? "var(--ok)" : "var(--warn)", border: "1.5px solid var(--bg)" }}/>
                </div>
                <span style={{ flex: 1, fontSize: 12, color: "var(--ink-2)", fontWeight: n.includes("you") ? 600 : 500 }}>{n}</span>
                <span className="br-mono" style={{ fontSize: 9.5, color: "var(--ink-5)" }}>{role}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: "auto", fontSize: 10.5, color: "var(--ink-5)" }}>
          Atlas · operational backbone
        </div>
      </aside>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        {topBar}
        {children}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// AtlasTopBar — sub-header with breadcrumb + tools
// ─────────────────────────────────────────────────────────────
function AtlasTopBar({ section, title, sub, right }) {
  return (
    <div style={{
      padding: "14px 28px", borderBottom: "1px solid var(--line)",
      background: "var(--bg)", display: "flex", alignItems: "center", gap: 14, flexShrink: 0,
    }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <span className="br-mono" style={{ fontSize: 10.5, color: "var(--ink-5)" }}>{section}</span>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 2 }}>
          <span style={{ fontSize: 16, fontWeight: 600, letterSpacing: "-0.01em" }}>{title}</span>
          {sub && <span style={{ fontSize: 12.5, color: "var(--ink-4)" }}>· {sub}</span>}
        </div>
      </div>
      {right || (
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Button variant="ghost" size="sm" icon="info"/>
          <Button variant="outline" size="sm" icon="sliders">View</Button>
          <Button variant="primary" size="sm" iconRight="arrow_right">Quick action</Button>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// HealthDot — operational signal indicator
// ─────────────────────────────────────────────────────────────
function HealthDot({ state, size = 8, pulse }) {
  const map = { ok: "var(--ok)", warn: "var(--warn)", err: "var(--err)", idle: "var(--ink-4)", active: "var(--accent)" };
  return (
    <span style={{ position: "relative", width: size, height: size, display: "inline-grid", placeItems: "center" }}>
      <span style={{ width: size, height: size, borderRadius: 999, background: map[state] || map.idle }}/>
      {pulse && <span style={{ position: "absolute", inset: -3, borderRadius: 999, background: map[state] || map.idle, opacity: .25, animation: "br-pulse-soft 1.6s ease-in-out infinite" }}/>}
    </span>
  );
}

// ─────────────────────────────────────────────────────────────
// ClientAvatar — color-coded initials
// ─────────────────────────────────────────────────────────────
const CLIENTS = {
  lakeside: { name: "Lakeside Dental",  ini: "LD",  bg: "#0c4a6e", industry: "Healthcare · 3 loc." },
  northwind:{ name: "Northwind Optics", ini: "NO",  bg: "#1c1917", industry: "DTC · eyewear" },
  maple:    { name: "Maple & Hide",     ini: "M&H", bg: "#3f3f46", industry: "Hospitality · 2 hotels" },
  hartwell: { name: "Hartwell Law",     ini: "HL",  bg: "#065f46", industry: "Local · law" },
  cedarpoint:{name: "Cedarpoint SaaS",  ini: "CP",  bg: "#7c2d12", industry: "B2B SaaS" },
  glasswing:{ name: "Glasswing Studios",ini: "GS",  bg: "#374151", industry: "B2B · creative" },
};

function ClientAvatar({ id, size = 28 }) {
  const c = CLIENTS[id];
  if (!c) return null;
  return (
    <div style={{
      width: size, height: size, borderRadius: 7,
      background: c.bg, color: "#fff",
      display: "grid", placeItems: "center", fontWeight: 600, fontSize: size <= 22 ? 9.5 : 11,
      letterSpacing: "-0.01em", flexShrink: 0,
    }}>{c.ini}</div>
  );
}

function ClientChip({ id, withIndustry, size = "md" }) {
  const c = CLIENTS[id];
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 8, minWidth: 0 }}>
      <ClientAvatar id={id} size={size === "sm" ? 20 : 26}/>
      <div style={{ minWidth: 0 }}>
        <div style={{ fontSize: size === "sm" ? 12 : 13, fontWeight: 600, letterSpacing: "-0.005em" }}>{c.name}</div>
        {withIndustry && <div className="br-mono" style={{ fontSize: 10, color: "var(--ink-5)" }}>{c.industry}</div>}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// PersonAvatar — team member
// ─────────────────────────────────────────────────────────────
const TEAM = {
  sam:  { name: "Sam Patel",  ini: "SP", bg: "#7c2d12", role: "Strategy lead" },
  jess: { name: "Jess Kwon",  ini: "JK", bg: "#0c4a6e", role: "Designer" },
  mike: { name: "Mike Diaz",  ini: "MD", bg: "#065f46", role: "Implementation" },
  tom:  { name: "Tom Reyes",  ini: "TR", bg: "#7c3aed", role: "Developer" },
  lin:  { name: "Lin Park",   ini: "LP", bg: "#1c1917", role: "Founder" },
};

function PersonAvatar({ id, size = 22, presence }) {
  const p = TEAM[id];
  if (!p) return <div style={{ width: size, height: size }}/>;
  return (
    <div style={{ position: "relative", width: size, height: size, flexShrink: 0 }}>
      <div style={{ width: size, height: size, borderRadius: 999, background: p.bg, color: "#fff", display: "grid", placeItems: "center", fontSize: size < 24 ? 9.5 : 11, fontWeight: 600 }}>{p.ini}</div>
      {presence && <span style={{ position: "absolute", bottom: -1, right: -1, width: 7, height: 7, borderRadius: 999, background: presence === "online" ? "var(--ok)" : "var(--warn)", border: "1.5px solid var(--bg)" }}/>}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// CapacityBar — workload utilization (0-130%+)
// ─────────────────────────────────────────────────────────────
function CapacityBar({ pct, height = 6 }) {
  const tone = pct > 100 ? "var(--err)" : pct > 85 ? "var(--warn)" : pct > 60 ? "var(--accent)" : "var(--ok)";
  const display = Math.min(pct, 120);
  return (
    <div style={{ position: "relative", height, background: "var(--surface-3)", borderRadius: 999, overflow: "hidden" }}>
      <div style={{ height: "100%", width: `${(display / 120) * 100}%`, background: tone, borderRadius: 999 }}/>
      <div style={{ position: "absolute", left: `${(100 / 120) * 100}%`, top: -2, bottom: -2, width: 1.5, background: "var(--ink-3)" }}/>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// KpiCard — slim ops KPI
// ─────────────────────────────────────────────────────────────
function OpsKpi({ label, value, sub, tone = "neutral", icon, delta }) {
  const toneMap = {
    ok: "var(--ok)", warn: "var(--warn)", err: "var(--err)", accent: "var(--accent)", neutral: "var(--ink-2)",
  };
  return (
    <div style={{ padding: 14, background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 10, boxShadow: "var(--shadow-1)", display: "flex", flexDirection: "column", gap: 4, minWidth: 0 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        {icon && <Icon name={icon} size={12} color="var(--ink-4)"/>}
        <span className="br-eyebrow" style={{ fontSize: 9.5 }}>{label}</span>
      </div>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 8 }}>
        <span className="br-num" style={{ fontSize: 24, fontWeight: 600, letterSpacing: "-0.025em", color: toneMap[tone] }}>{value}</span>
        {delta && (
          <span style={{ fontSize: 11, color: tone === "err" ? "var(--err)" : "var(--ink-4)", fontWeight: 500 }}>{delta}</span>
        )}
      </div>
      {sub && <div style={{ fontSize: 11.5, color: "var(--ink-4)" }}>{sub}</div>}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// AppPill — Bridge/Compass/Dock/Radar/Atlas reference
// ─────────────────────────────────────────────────────────────
const APPS = {
  bridge:  { name: "Bridge",  color: "#4f46e5", desc: "Onboarding" },
  compass: { name: "Compass", color: "#7c3aed", desc: "Proposal" },
  dock:    { name: "Dock",    color: "#0c0a09", desc: "Client portal" },
  radar:   { name: "Radar",   color: "#0891b2", desc: "Analytics" },
  atlas:   { name: "Atlas",   color: "#0c0a09", desc: "Op-center" },
  beacon:  { name: "Beacon",  color: "#b45309", desc: "Automation" },
  clickup: { name: "ClickUp", color: "#7b68ee", desc: "Tasks" },
};

function AppPill({ kind, size = "md" }) {
  const a = APPS[kind];
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 5,
      padding: size === "sm" ? "2px 7px" : "3px 9px",
      borderRadius: 999, fontSize: size === "sm" ? 10.5 : 11.5, fontWeight: 600,
      background: "var(--surface)", border: "1px solid var(--line-strong)", color: "var(--ink-2)",
    }}>
      <span style={{ width: 6, height: 6, borderRadius: 2, background: a.color }}/>
      {a.name}
    </span>
  );
}

Object.assign(window, {
  AtlasWordmark, AtlasShell, AtlasTopBar, HealthDot, ClientAvatar, ClientChip, PersonAvatar, CapacityBar, OpsKpi, AppPill,
  CLIENTS, TEAM, APPS,
});
