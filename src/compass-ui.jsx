/* global React, Icon, Button, Field, Input, Textarea, Chip, Pill, Card, SelectCard, Toggle, Slider, AICallout */
// Compass — UI primitives unique to the proposal workspace.
// Reuses Bridge's UI primitives (Icon, Button, Pill, Card, etc.) from src/ui.jsx.

const { useState: cUseState } = React;

// ─────────────────────────────────────────────────────────────
// Compass wordmark — a compass needle, distinct from Bridge.
// ─────────────────────────────────────────────────────────────
function CompassWordmark({ size = 18 }) {
  const px = size === "lg" ? 24 : 18;
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "var(--ink)", fontFamily: "var(--font-display)", fontWeight: 600, letterSpacing: "-0.04em", fontSize: size === "lg" ? 22 : 18 }}>
      <div style={{
        width: px + 4, height: px + 4, borderRadius: 999,
        background: "radial-gradient(circle at 30% 30%, #ffffff 0%, #f5f5f4 100%)",
        border: "1px solid var(--line-strong)",
        display: "grid", placeItems: "center",
        boxShadow: "inset 0 0 0 1px rgba(255,255,255,.6), 0 1px 2px rgba(0,0,0,.06)",
        position: "relative",
      }}>
        <svg width={px - 4} height={px - 4} viewBox="0 0 20 20">
          <polygon points="10,2 12,10 10,18 8,10" fill="var(--accent)"/>
          <polygon points="10,2 12,10 10,10" fill="#7c3aed"/>
          <circle cx="10" cy="10" r="1.4" fill="#0c0a09"/>
        </svg>
      </div>
      Compass
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// WorkspaceRail — left navigation for Compass workspace
// Sections: Brief / Strategy / Scope / Pricing / ROI / Assumptions / Publish
// ─────────────────────────────────────────────────────────────
function WorkspaceRail({ activeId = "scope" }) {
  const sections = [
    { group: "Inputs",  id: "brief",       title: "Client brief",        icon: "folder", meta: "from Bridge", state: "done" },
    { group: "Inputs",  id: "assumptions", title: "Assumptions",         icon: "info",   meta: "11 known · 4 inferred · 2 unknown", state: "warn" },
    { group: "Build",   id: "scope",       title: "Modular scope",       icon: "layers", meta: "8 of 14 active", state: "active" },
    { group: "Build",   id: "pricing",     title: "Pricing tiers",       icon: "target", meta: "3 tiers · auto-anchored", state: "done" },
    { group: "Build",   id: "roi",         title: "ROI simulation",      icon: "bolt",   meta: "Low · Expected · High", state: "done" },
    { group: "Build",   id: "narrative",   title: "Strategy narrative",  icon: "pen",    meta: "Draft · AI-written", state: "done" },
    { group: "Deliver", id: "preview",     title: "Client preview",      icon: "monitor",meta: "Read mode", state: "todo" },
    { group: "Deliver", id: "publish",     title: "Publish & share",     icon: "upload", meta: "Not sent", state: "todo" },
  ];

  return (
    <aside style={{
      width: 280, flexShrink: 0, borderRight: "1px solid var(--line)",
      background: "var(--bg)", padding: "20px 18px 18px 22px",
      display: "flex", flexDirection: "column", gap: 18,
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <CompassWordmark/>
        <button style={{
          padding: "4px 8px", borderRadius: 6, background: "var(--surface)",
          border: "1px solid var(--line)", fontSize: 11, color: "var(--ink-3)",
          fontFamily: "var(--font-sans)", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 4,
        }}>
          <Icon name="chevron_right" size={11}/> Workspace
        </button>
      </div>

      {/* client context */}
      <div style={{
        padding: 12, borderRadius: 10, background: "var(--surface)",
        border: "1px solid var(--line)", boxShadow: "var(--shadow-1)",
        display: "flex", alignItems: "center", gap: 10,
      }}>
        <div style={{
          width: 32, height: 32, borderRadius: 8, background: "#0c4a6e",
          color: "#fff", display: "grid", placeItems: "center", fontWeight: 600, fontSize: 12.5, letterSpacing: "-0.01em",
        }}>LD</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: "-0.005em" }}>Lakeside Dental</div>
          <div className="br-mono" style={{ fontSize: 10.5, color: "var(--ink-5)" }}>LSD-7F2A · v2 of 3</div>
        </div>
        <Pill tone="accent" size="sm">Draft</Pill>
      </div>

      <nav style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {["Inputs", "Build", "Deliver"].map((g) => (
          <div key={g}>
            <div className="br-eyebrow" style={{ marginBottom: 6, fontSize: 10, paddingLeft: 6 }}>{g}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {sections.filter((s) => s.group === g).map((s) => {
                const active = s.id === activeId;
                return (
                  <div key={s.id} style={{
                    display: "flex", alignItems: "center", gap: 10, padding: "8px 10px",
                    borderRadius: 7,
                    background: active ? "var(--surface)" : "transparent",
                    border: active ? "1px solid var(--line)" : "1px solid transparent",
                    boxShadow: active ? "var(--shadow-1)" : "none",
                    cursor: "pointer",
                  }}>
                    <div style={{
                      width: 22, height: 22, borderRadius: 6, flexShrink: 0,
                      background: active ? "var(--accent-soft)" : "transparent",
                      color: active ? "var(--accent)" : s.state === "done" ? "var(--ink-3)" : s.state === "warn" ? "var(--warn)" : "var(--ink-4)",
                      display: "grid", placeItems: "center",
                    }}>
                      <Icon name={s.icon} size={13}/>
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 13, fontWeight: active ? 600 : 500, color: "var(--ink)", letterSpacing: "-0.005em" }}>{s.title}</div>
                      <div style={{ fontSize: 10.5, color: "var(--ink-4)", marginTop: 0 }}>{s.meta}</div>
                    </div>
                    {s.state === "done" && !active && <div style={{ width: 5, height: 5, borderRadius: 999, background: "var(--ok)" }}/>}
                    {s.state === "warn" && <div style={{ width: 5, height: 5, borderRadius: 999, background: "var(--warn)" }}/>}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: 10 }}>
        <div style={{ padding: 10, borderRadius: 8, background: "var(--surface)", border: "1px solid var(--line)" }}>
          <div className="br-eyebrow" style={{ fontSize: 9.5, marginBottom: 4 }}>Confidence</div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
            <span className="br-num" style={{ fontSize: 22, fontWeight: 600, letterSpacing: "-0.02em" }}>87</span>
            <span style={{ fontSize: 11, color: "var(--ink-4)" }}>/ 100</span>
          </div>
          <div style={{ height: 4, borderRadius: 999, background: "var(--surface-3)", overflow: "hidden", marginTop: 6 }}>
            <div style={{ height: "100%", width: "87%", background: "linear-gradient(90deg, var(--accent), var(--ok))" }}/>
          </div>
        </div>
        <div style={{ fontSize: 10.5, color: "var(--ink-5)", paddingLeft: 4 }}>
          Compass · Digital Native
        </div>
      </div>
    </aside>
  );
}

// ─────────────────────────────────────────────────────────────
// ProposalToolbar — top bar with version chips, share, status
// ─────────────────────────────────────────────────────────────
function ProposalToolbar({ activeVersion = "rec" }) {
  return (
    <div style={{
      padding: "12px 28px", borderBottom: "1px solid var(--line)",
      background: "var(--bg)", display: "flex", alignItems: "center", gap: 12, flexShrink: 0,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <Pill tone="neutral" size="sm" icon="folder">Lakeside Dental</Pill>
        <Icon name="chevron_right" size={12} color="var(--ink-5)"/>
        <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: "-0.005em" }}>Q3 — Growth proposal</span>
        <span className="br-mono" style={{ fontSize: 11, color: "var(--ink-5)" }}>LSD-7F2A</span>
      </div>

      {/* Version segmented control */}
      <div style={{
        marginLeft: 16, display: "inline-flex",
        background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 8, padding: 2,
        boxShadow: "var(--shadow-1)",
      }}>
        {[
          ["safe",  "Conservative", "Safe close"],
          ["rec",   "Recommended",  "Default"],
          ["agg",   "Aggressive",   "Growth bet"],
        ].map(([k, label, sub]) => {
          const active = k === activeVersion;
          return (
            <button key={k} style={{
              padding: "6px 12px", borderRadius: 6, border: "none", cursor: "pointer",
              background: active ? "var(--ink)" : "transparent",
              color: active ? "#fff" : "var(--ink-2)",
              fontFamily: "var(--font-sans)", fontSize: 12.5, fontWeight: 500,
              display: "inline-flex", alignItems: "center", gap: 6,
            }}>
              {label}
              <span className="br-mono" style={{ fontSize: 10, opacity: .6 }}>{sub}</span>
            </button>
          );
        })}
      </div>

      <div style={{ flex: 1 }}/>

      <div style={{ display: "flex", alignItems: "center", gap: 6, marginRight: 4 }}>
        <span style={{ width: 6, height: 6, borderRadius: 999, background: "var(--ok)", animation: "br-pulse-soft 2s ease-in-out infinite" }}/>
        <span className="br-mono" style={{ fontSize: 11, color: "var(--ink-4)" }}>Autosaved · 4s ago</span>
      </div>
      <div style={{ width: 1, height: 16, background: "var(--line)" }}/>
      <Button variant="ghost" size="sm" icon="file">Export PDF</Button>
      <Button variant="outline" size="sm" icon="globe">Preview</Button>
      <Button variant="accent" size="sm" iconRight="arrow_right">Publish & share</Button>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// ServiceBlock — modular scope module card
// ─────────────────────────────────────────────────────────────
function ServiceBlock({ icon, title, category, cost, effort, impact, time, active, recommended, conflict }) {
  return (
    <div style={{
      display: "grid", gridTemplateColumns: "auto 1fr auto auto auto auto auto",
      alignItems: "center", gap: 12, padding: "11px 14px",
      borderRadius: 10, background: "var(--surface)",
      border: active ? "1.5px solid var(--accent)" : "1px solid var(--line-strong)",
      boxShadow: active ? "0 0 0 3px rgba(79,70,229,.08), var(--shadow-1)" : "var(--shadow-1)",
      position: "relative",
    }}>
      <Icon name="drag" size={14} color="var(--ink-5)"/>
      <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
        <div style={{
          width: 28, height: 28, borderRadius: 7, flexShrink: 0,
          background: active ? "var(--accent-soft)" : "var(--surface-2)",
          color: active ? "var(--accent)" : "var(--ink-3)",
          border: `1px solid ${active ? "var(--accent-soft-2)" : "var(--line)"}`,
          display: "grid", placeItems: "center",
        }}>
          <Icon name={icon} size={14}/>
        </div>
        <div style={{ minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: "-0.005em" }}>{title}</span>
            {recommended && <Pill tone="ai" size="sm" icon="sparkle">AI rec</Pill>}
            {conflict && <Pill tone="warn" size="sm" icon="alert">Conflict</Pill>}
          </div>
          <div className="br-mono" style={{ fontSize: 10.5, color: "var(--ink-5)", marginTop: 1 }}>{category}</div>
        </div>
      </div>

      <Metric label="Effort" value={effort} tone="ink"/>
      <Metric label="Impact" value={impact} tone={impact >= 8 ? "ok" : impact >= 5 ? "ink" : "warn"}/>
      <Metric label="Time"   value={time}   raw/>
      <div className="br-num" style={{ fontSize: 14, fontWeight: 600, letterSpacing: "-0.01em", minWidth: 70, textAlign: "right" }}>{cost}</div>

      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
        <Toggle on={active}/>
      </div>
    </div>
  );
}

function Metric({ label, value, tone = "ink", raw }) {
  const color = tone === "ok" ? "var(--ok)" : tone === "warn" ? "var(--warn)" : "var(--ink-2)";
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minWidth: 52 }}>
      {!raw ? (
        <div style={{ display: "flex", gap: 2, alignItems: "center", height: 14 }}>
          {[1,2,3,4,5,6,7,8,9,10].map((i) => (
            <div key={i} style={{
              width: 3, height: i <= value ? 10 : 5, borderRadius: 1,
              background: i <= value ? color : "var(--surface-3)",
            }}/>
          ))}
        </div>
      ) : (
        <div className="br-mono br-num" style={{ fontSize: 12, fontWeight: 600, color: "var(--ink)" }}>{value}</div>
      )}
      <div className="br-mono" style={{ fontSize: 9.5, color: "var(--ink-5)", marginTop: 3, textTransform: "uppercase", letterSpacing: ".06em" }}>{label}</div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// TierCard — pricing tier (Starter / Growth / Scale)
// ─────────────────────────────────────────────────────────────
function TierCard({ name, tagline, price, period = "/ mo", featured, items, anchor, savings, badge }) {
  return (
    <div style={{
      position: "relative", borderRadius: 16,
      background: featured ? "var(--ink)" : "var(--surface)",
      color: featured ? "#fff" : "var(--ink)",
      border: featured ? "1px solid var(--ink)" : "1px solid var(--line-strong)",
      boxShadow: featured ? "0 12px 32px -8px rgba(0,0,0,.18)" : "var(--shadow-1)",
      padding: 22, display: "flex", flexDirection: "column",
    }}>
      {badge && (
        <div style={{
          position: "absolute", top: -10, left: 22,
          padding: "3px 8px", borderRadius: 999, fontSize: 10.5, fontWeight: 600, letterSpacing: ".04em", textTransform: "uppercase",
          background: featured ? "#fff" : "var(--accent)",
          color: featured ? "var(--ink)" : "#fff",
          border: featured ? "1px solid var(--ink)" : "1px solid var(--accent)",
        }}>{badge}</div>
      )}
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 4 }}>
        <span style={{ fontSize: 14, fontWeight: 600, letterSpacing: "-0.005em" }}>{name}</span>
        {savings && <span className="br-mono" style={{ fontSize: 10.5, color: featured ? "#a5f3fc" : "var(--ok)" }}>{savings}</span>}
      </div>
      <div style={{ fontSize: 12.5, color: featured ? "rgba(255,255,255,.7)" : "var(--ink-4)", marginBottom: 18, lineHeight: 1.4 }}>{tagline}</div>

      <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 4 }}>
        {anchor && <span style={{ fontSize: 14, color: featured ? "rgba(255,255,255,.5)" : "var(--ink-5)", textDecoration: "line-through", marginRight: 4 }}>{anchor}</span>}
        <span className="br-num" style={{ fontSize: 32, fontWeight: 600, letterSpacing: "-0.025em" }}>{price}</span>
        <span style={{ fontSize: 13, color: featured ? "rgba(255,255,255,.6)" : "var(--ink-4)" }}>{period}</span>
      </div>
      <div className="br-mono" style={{ fontSize: 10.5, color: featured ? "rgba(255,255,255,.55)" : "var(--ink-5)", marginBottom: 18 }}>
        Setup waived · 6-mo minimum · billed monthly
      </div>

      <div style={{ height: 1, background: featured ? "rgba(255,255,255,.12)" : "var(--line)", marginBottom: 14 }}/>

      <div style={{ display: "flex", flexDirection: "column", gap: 8, flex: 1 }}>
        {items.map(([label, included, sub]) => (
          <div key={label} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
            <div style={{
              width: 16, height: 16, borderRadius: 4, flexShrink: 0, marginTop: 1,
              background: included ? (featured ? "#fff" : "var(--ink)") : "transparent",
              color: featured ? "var(--ink)" : "#fff",
              border: included ? "none" : `1.5px solid ${featured ? "rgba(255,255,255,.25)" : "var(--line-strong)"}`,
              display: "grid", placeItems: "center",
            }}>{included && <Icon name="check" size={10} strokeWidth={3}/>}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12.5, color: included ? (featured ? "#fff" : "var(--ink)") : (featured ? "rgba(255,255,255,.4)" : "var(--ink-5)"), textDecoration: included ? "none" : "line-through" }}>{label}</div>
              {sub && included && <div style={{ fontSize: 11, color: featured ? "rgba(255,255,255,.55)" : "var(--ink-4)", marginTop: 1 }}>{sub}</div>}
            </div>
          </div>
        ))}
      </div>

      <Button
        variant={featured ? "outline" : "outline"}
        full
        size="md"
        style={{
          marginTop: 18,
          background: featured ? "#fff" : undefined,
          color: featured ? "var(--ink)" : undefined,
          border: featured ? "1px solid #fff" : undefined,
        }}
        iconRight="arrow_right"
      >Choose {name}</Button>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// ScenarioBar — Low / Expected / High range bar for ROI
// ─────────────────────────────────────────────────────────────
function ScenarioBar({ label, low, expected, high, format = (v) => v, baseline }) {
  const min = Math.min(low, baseline ?? low) * 0.85;
  const max = Math.max(high, baseline ?? high) * 1.05;
  const span = max - min;
  const pct = (v) => ((v - min) / span) * 100;

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 6 }}>
        <span style={{ fontSize: 13, fontWeight: 500 }}>{label}</span>
        <span className="br-mono" style={{ fontSize: 11, color: "var(--ink-5)" }}>{format(low)} → {format(high)}</span>
      </div>
      <div style={{ position: "relative", height: 26, background: "var(--surface-2)", border: "1px solid var(--line)", borderRadius: 6 }}>
        {/* baseline tick */}
        {baseline !== undefined && (
          <>
            <div style={{ position: "absolute", left: `${pct(baseline)}%`, top: -2, bottom: -2, width: 1.5, background: "var(--ink-4)" }}/>
            <div style={{ position: "absolute", left: `${pct(baseline)}%`, top: -16, transform: "translateX(-50%)", fontSize: 9.5, color: "var(--ink-5)", whiteSpace: "nowrap" }}>baseline</div>
          </>
        )}
        {/* range band */}
        <div style={{
          position: "absolute", top: 4, bottom: 4,
          left: `${pct(low)}%`, width: `${pct(high) - pct(low)}%`,
          background: "linear-gradient(90deg, var(--accent-soft) 0%, var(--accent-soft-2) 100%)",
          border: "1px solid var(--accent-soft-2)", borderRadius: 4,
        }}/>
        {/* expected marker */}
        <div style={{
          position: "absolute", top: 1, bottom: 1, left: `${pct(expected)}%`,
          width: 3, background: "var(--accent)", borderRadius: 2,
          boxShadow: "0 1px 3px rgba(79,70,229,.4)",
        }}/>
        <div style={{
          position: "absolute", top: -16, left: `${pct(expected)}%`, transform: "translateX(-50%)",
          fontSize: 10, fontWeight: 600, color: "var(--accent)", whiteSpace: "nowrap",
        }}>{format(expected)}</div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// AssumptionRow — known / inferred / unknown
// ─────────────────────────────────────────────────────────────
function AssumptionRow({ kind, source, label, value, confidence }) {
  const tones = {
    known:    { bg: "var(--ok-soft)",      bd: "#a7f3d0",    fg: "var(--ok)",    dot: "var(--ok)",    name: "Known" },
    inferred: { bg: "var(--ai-soft)",      bd: "#ddd6fe",    fg: "var(--ai)",    dot: "var(--ai)",    name: "Inferred" },
    unknown:  { bg: "var(--warn-soft)",    bd: "#fcd34d",    fg: "var(--warn)",  dot: "var(--warn)",  name: "Unknown" },
  }[kind];
  return (
    <div style={{ display: "grid", gridTemplateColumns: "90px 1fr 1.4fr 80px", alignItems: "center", gap: 12, padding: "10px 12px", borderTop: "1px solid var(--line-faint)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <span style={{ width: 6, height: 6, borderRadius: 999, background: tones.dot }}/>
        <span className="br-mono" style={{ fontSize: 10.5, color: tones.fg, fontWeight: 600, textTransform: "uppercase", letterSpacing: ".05em" }}>{tones.name}</span>
      </div>
      <div>
        <div style={{ fontSize: 12.5, fontWeight: 500 }}>{label}</div>
        <div className="br-mono" style={{ fontSize: 10.5, color: "var(--ink-5)" }}>{source}</div>
      </div>
      <div style={{ fontSize: 12.5, color: "var(--ink-2)" }}>{value}</div>
      <div style={{ display: "flex", alignItems: "center", gap: 6, justifyContent: "flex-end" }}>
        <div style={{ width: 40, height: 4, borderRadius: 999, background: "var(--surface-3)", overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${confidence}%`, background: tones.dot }}/>
        </div>
        <span className="br-mono br-num" style={{ fontSize: 10.5, color: "var(--ink-4)", width: 22, textAlign: "right" }}>{confidence}</span>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// SectionHeader — page title bar inside workspace
// ─────────────────────────────────────────────────────────────
function SectionHeader({ eyebrow, title, subtitle, right }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 24, paddingBottom: 18, borderBottom: "1px solid var(--line)" }}>
      <div>
        {eyebrow && <Pill tone="neutral" size="sm">{eyebrow}</Pill>}
        <h1 className="br-h1" style={{ fontSize: 28, marginTop: 10, marginBottom: 4 }}>{title}</h1>
        {subtitle && <p className="br-body" style={{ margin: 0, maxWidth: 640 }}>{subtitle}</p>}
      </div>
      {right && <div>{right}</div>}
    </div>
  );
}

Object.assign(window, {
  CompassWordmark, WorkspaceRail, ProposalToolbar,
  ServiceBlock, Metric, TierCard, ScenarioBar, AssumptionRow, SectionHeader,
});
