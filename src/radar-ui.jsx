/* global React, Icon, Button, Pill, Card, Field, Input, Toggle */
// Radar — primitives unique to the analytics dashboard.

// ─────────────────────────────────────────────────────────────
// Radar wordmark — concentric arcs (radar sweep)
// ─────────────────────────────────────────────────────────────
function RadarWordmark({ size = 18 }) {
  const px = size === "lg" ? 26 : 22;
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "var(--ink)", fontFamily: "var(--font-display)", fontWeight: 600, letterSpacing: "-0.04em", fontSize: size === "lg" ? 24 : 18 }}>
      <div style={{
        width: px, height: px, borderRadius: 999,
        background: "radial-gradient(circle at 30% 30%, #fff 0%, #f5f5f4 100%)",
        border: "1px solid var(--line-strong)",
        position: "relative", display: "grid", placeItems: "center",
        boxShadow: "inset 0 0 0 1px rgba(255,255,255,.6), 0 1px 2px rgba(0,0,0,.06)",
        overflow: "hidden",
      }}>
        <svg width={px - 2} height={px - 2} viewBox="0 0 22 22">
          <circle cx="11" cy="11" r="9"  fill="none" stroke="#a8a29e" strokeWidth="0.6"/>
          <circle cx="11" cy="11" r="6"  fill="none" stroke="#a8a29e" strokeWidth="0.6"/>
          <circle cx="11" cy="11" r="3"  fill="none" stroke="#a8a29e" strokeWidth="0.6"/>
          <line x1="11" y1="11" x2="20" y2="6" stroke="#4f46e5" strokeWidth="1.6" strokeLinecap="round"/>
          <circle cx="11" cy="11" r="1.5" fill="#0c0a09"/>
        </svg>
      </div>
      Radar
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// RadarTopBar — global header
// ─────────────────────────────────────────────────────────────
function RadarTopBar({ active = "overview" }) {
  const nav = [
    ["overview",   "Overview",   "target"],
    ["channels",   "Channels",   "layers"],
    ["platforms",  "Platforms",  "globe"],
    ["insights",   "Insights",   "sparkle"],
    ["report",     "Report",     "file"],
  ];
  return (
    <div style={{
      padding: "12px 28px", borderBottom: "1px solid var(--line)",
      background: "var(--bg)", display: "flex", alignItems: "center", gap: 16, flexShrink: 0,
    }}>
      <RadarWordmark/>
      <span style={{ width: 1, height: 16, background: "var(--line)" }}/>

      {/* Client picker */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "5px 10px", border: "1px solid var(--line)", borderRadius: 8, background: "var(--surface)", boxShadow: "var(--shadow-1)" }}>
        <div style={{ width: 22, height: 22, borderRadius: 5, background: "#0c4a6e", color: "#fff", display: "grid", placeItems: "center", fontSize: 10, fontWeight: 600 }}>LD</div>
        <span style={{ fontSize: 13, fontWeight: 600 }}>Lakeside Family Dental</span>
        <Icon name="chevron_down" size={12} color="var(--ink-4)"/>
      </div>

      {/* Date range */}
      <div style={{ display: "inline-flex", alignItems: "center", background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 8, padding: 2, boxShadow: "var(--shadow-1)" }}>
        {["7d", "30d", "MTD", "QTD", "Custom"].map((p, i) => (
          <span key={p} style={{
            padding: "4px 10px", borderRadius: 6, fontSize: 12, fontWeight: 500, cursor: "pointer",
            background: p === "30d" ? "var(--ink)" : "transparent",
            color: p === "30d" ? "#fff" : "var(--ink-3)",
          }}>{p}</span>
        ))}
      </div>
      <span className="br-mono" style={{ fontSize: 10.5, color: "var(--ink-5)" }}>Apr 16 → May 15</span>

      <nav style={{ marginLeft: 14, display: "flex", gap: 2 }}>
        {nav.map(([k, l, i]) => {
          const a = k === active;
          return (
            <span key={k} style={{
              padding: "6px 11px", borderRadius: 7, fontSize: 13,
              background: a ? "var(--surface)" : "transparent",
              color: a ? "var(--ink)" : "var(--ink-3)",
              border: a ? "1px solid var(--line)" : "1px solid transparent",
              boxShadow: a ? "var(--shadow-1)" : "none",
              fontWeight: a ? 600 : 500, display: "inline-flex", alignItems: "center", gap: 6, cursor: "pointer",
            }}>
              <Icon name={i} size={13}/> {l}
            </span>
          );
        })}
      </nav>

      <div style={{ flex: 1 }}/>

      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <Pill tone="warn" size="sm" icon="alert">2 anomalies</Pill>
        <span style={{ width: 1, height: 16, background: "var(--line)" }}/>
        <Button variant="outline" size="sm" icon="file">Export</Button>
        <div style={{ width: 28, height: 28, borderRadius: 999, background: "#0c4a6e", color: "#fff", display: "grid", placeItems: "center", fontSize: 11, fontWeight: 600 }}>SC</div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// PlatformBadge — branded icon + name, color-coded
// ─────────────────────────────────────────────────────────────
const PLATFORMS = {
  meta:    { label: "Meta",         bg: "#1877f2", fg: "#fff", shortcut: "M",  display: "Meta · FB + IG" },
  google:  { label: "Google Ads",   bg: "#34a853", fg: "#fff", shortcut: "G",  display: "Google Ads" },
  tiktok:  { label: "TikTok",       bg: "#000000", fg: "#fff", shortcut: "T",  display: "TikTok Ads" },
  linkedin:{ label: "LinkedIn",     bg: "#0a66c2", fg: "#fff", shortcut: "Li", display: "LinkedIn" },
  organic: { label: "Organic social",bg: "#a78bfa", fg: "#fff", shortcut: "S", display: "Organic social" },
  email:   { label: "Email",        bg: "#ea580c", fg: "#fff", shortcut: "E",  display: "Email" },
  ga4:     { label: "Website / GA4",bg: "#f59e0b", fg: "#fff", shortcut: "W",  display: "Website · GA4" },
  gbp:     { label: "Local · GBP",  bg: "#0891b2", fg: "#fff", shortcut: "L",  display: "Local SEO · GBP" },
};

function PlatformBadge({ kind, size = "md" }) {
  const p = PLATFORMS[kind];
  const px = size === "lg" ? 32 : size === "sm" ? 18 : 24;
  const fs = size === "lg" ? 13 : size === "sm" ? 9 : 11;
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
      <div style={{
        width: px, height: px, borderRadius: 6,
        background: p.bg, color: p.fg,
        display: "grid", placeItems: "center", fontWeight: 700, fontSize: fs,
        boxShadow: "inset 0 0 0 1px rgba(255,255,255,.18)",
      }}>{p.shortcut}</div>
      {size !== "sm" && <span style={{ fontSize: 13, fontWeight: 500, letterSpacing: "-0.005em" }}>{p.label}</span>}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// KpiCard — large headline KPI with delta + tiny sparkline
// ─────────────────────────────────────────────────────────────
function KpiCard({ label, value, sub, delta, deltaLabel, tone = "ok", spark, featured }) {
  const deltaColor = tone === "ok" ? "var(--ok)" : tone === "warn" ? "var(--warn)" : tone === "err" ? "var(--err)" : "var(--ink-4)";
  return (
    <div style={{
      padding: 16,
      background: featured ? "var(--ink)" : "var(--surface)",
      color: featured ? "#fff" : "var(--ink)",
      border: featured ? "1px solid var(--ink)" : "1px solid var(--line)",
      borderRadius: 12, boxShadow: "var(--shadow-1)",
      display: "flex", flexDirection: "column", gap: 4, minWidth: 0,
    }}>
      <div className="br-eyebrow" style={{ fontSize: 9.5, color: featured ? "rgba(255,255,255,.65)" : "var(--ink-5)" }}>{label}</div>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 8 }}>
        <span className="br-num" style={{ fontSize: 26, fontWeight: 600, letterSpacing: "-0.025em" }}>{value}</span>
        {delta && (
          <span style={{ display: "inline-flex", alignItems: "center", gap: 3, fontSize: 11.5, fontWeight: 600, color: featured ? "#86efac" : deltaColor }}>
            <span style={{ fontSize: 9 }}>{delta.startsWith("-") ? "▼" : "▲"}</span> {delta.replace(/^-/, "")}
          </span>
        )}
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
        <span style={{ fontSize: 11, color: featured ? "rgba(255,255,255,.6)" : "var(--ink-4)" }}>{sub}</span>
        {deltaLabel && <span className="br-mono" style={{ fontSize: 10, color: featured ? "rgba(255,255,255,.55)" : "var(--ink-5)" }}>{deltaLabel}</span>}
      </div>
      {spark && (
        <div style={{ marginTop: 4 }}>
          <Sparkline data={spark} stroke={featured ? "#a5f3fc" : tone === "ok" ? "var(--ok)" : tone === "warn" ? "var(--warn)" : tone === "err" ? "var(--err)" : "var(--accent)"} height={28}/>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Sparkline — minimal SVG line
// ─────────────────────────────────────────────────────────────
function Sparkline({ data, stroke = "var(--accent)", fill = true, height = 32, width = 120 }) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const span = (max - min) || 1;
  const points = data.map((v, i) => [(i / (data.length - 1)) * width, height - ((v - min) / span) * (height - 4) - 2]);
  const path = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p[0]} ${p[1]}`).join(" ");
  const area = `${path} L ${width} ${height} L 0 ${height} Z`;
  return (
    <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" style={{ width: "100%", height, display: "block" }}>
      {fill && <path d={area} fill={stroke} opacity="0.12"/>}
      <path d={path} fill="none" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx={points[points.length - 1][0]} cy={points[points.length - 1][1]} r="2.5" fill={stroke}/>
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────
// LineChart — multi-series chart with grid + axes
// series: [{name, color, data: number[]}]; labels: string[]
// ─────────────────────────────────────────────────────────────
function LineChart({ series, labels, height = 240, yFormat = (v) => v, compareSeries }) {
  const allData = series.flatMap((s) => s.data).concat(compareSeries ? compareSeries.flatMap((s) => s.data) : []);
  const minRaw = Math.min(...allData);
  const maxRaw = Math.max(...allData);
  const min = Math.max(0, minRaw - (maxRaw - minRaw) * 0.1);
  const max = maxRaw + (maxRaw - minRaw) * 0.1;
  const span = max - min || 1;
  const w = 760;
  const h = height;
  const padL = 40, padR = 12, padT = 16, padB = 28;
  const cw = w - padL - padR;
  const ch = h - padT - padB;
  const x = (i) => padL + (i / (labels.length - 1)) * cw;
  const y = (v) => padT + (1 - (v - min) / span) * ch;

  const gridLines = 4;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} style={{ width: "100%", height: "auto", display: "block" }}>
      {/* Y grid */}
      {Array.from({ length: gridLines + 1 }).map((_, i) => {
        const v = min + (span * (gridLines - i)) / gridLines;
        const yy = y(v);
        return (
          <g key={i}>
            <line x1={padL} y1={yy} x2={w - padR} y2={yy} stroke="var(--line-faint)" strokeWidth="1"/>
            <text x={padL - 8} y={yy + 3} fontSize="9.5" fill="var(--ink-5)" textAnchor="end" fontFamily="var(--font-mono)">{yFormat(v)}</text>
          </g>
        );
      })}
      {/* X labels (every Nth) */}
      {labels.map((l, i) => {
        const step = Math.max(1, Math.floor(labels.length / 7));
        if (i % step !== 0 && i !== labels.length - 1) return null;
        return <text key={i} x={x(i)} y={h - 8} fontSize="9.5" fill="var(--ink-5)" textAnchor="middle" fontFamily="var(--font-mono)">{l}</text>;
      })}
      {/* Compare series — muted */}
      {compareSeries && compareSeries.map((s, si) => {
        const path = s.data.map((v, i) => `${i === 0 ? "M" : "L"} ${x(i)} ${y(v)}`).join(" ");
        return <path key={si} d={path} fill="none" stroke="var(--ink-5)" strokeWidth="1.2" strokeDasharray="3 3" opacity=".55"/>;
      })}
      {/* Main series */}
      {series.map((s, si) => {
        const path = s.data.map((v, i) => `${i === 0 ? "M" : "L"} ${x(i)} ${y(v)}`).join(" ");
        const area = `${path} L ${x(s.data.length - 1)} ${h - padB} L ${x(0)} ${h - padB} Z`;
        return (
          <g key={si}>
            {series.length === 1 && <path d={area} fill={s.color} opacity="0.08"/>}
            <path d={path} fill="none" stroke={s.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            {s.data.map((v, i) => i === s.data.length - 1 && <circle key={i} cx={x(i)} cy={y(v)} r="3.5" fill={s.color}/>)}
          </g>
        );
      })}
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────
// HorizontalBar — for channel comparison rows
// ─────────────────────────────────────────────────────────────
function HBar({ value, max, color = "var(--accent)", height = 6 }) {
  const pct = Math.min(100, (value / max) * 100);
  return (
    <div style={{ height, borderRadius: 999, background: "var(--surface-3)", overflow: "hidden" }}>
      <div style={{ height: "100%", width: `${pct}%`, background: color, borderRadius: 999 }}/>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Delta — small + or − chip
// ─────────────────────────────────────────────────────────────
function Delta({ value, tone, suffix = "" }) {
  const positive = !value.startsWith("-");
  const auto = tone ? tone : positive ? "ok" : "err";
  const colorMap = { ok: "var(--ok)", err: "var(--err)", warn: "var(--warn)", neutral: "var(--ink-4)" };
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 3, fontSize: 11, fontWeight: 600, color: colorMap[auto] }}>
      <span style={{ fontSize: 8 }}>{positive ? "▲" : "▼"}</span> {value.replace(/^-/, "")}{suffix}
    </span>
  );
}

// ─────────────────────────────────────────────────────────────
// MetricRow — generic numeric row in a widget
// ─────────────────────────────────────────────────────────────
function MetricRow({ label, value, delta, deltaTone, sub }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 0", borderTop: "1px solid var(--line-faint)" }}>
      <div>
        <div style={{ fontSize: 12.5, color: "var(--ink-2)" }}>{label}</div>
        {sub && <div className="br-mono" style={{ fontSize: 10, color: "var(--ink-5)" }}>{sub}</div>}
      </div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
        <span className="br-num" style={{ fontSize: 14, fontWeight: 600 }}>{value}</span>
        {delta && <Delta value={delta} tone={deltaTone}/>}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Widget — base shell for a platform card
// ─────────────────────────────────────────────────────────────
function Widget({ platform, title, children, footerLink, collapsed }) {
  return (
    <div style={{
      background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 12,
      boxShadow: "var(--shadow-1)", overflow: "hidden",
      display: "flex", flexDirection: "column", minWidth: 0,
    }}>
      <div style={{ padding: "12px 14px", borderBottom: "1px solid var(--line)", display: "flex", alignItems: "center", gap: 10 }}>
        {platform && <PlatformBadge kind={platform} size="md"/>}
        {!platform && title && <span style={{ fontSize: 13, fontWeight: 600 }}>{title}</span>}
        <div style={{ flex: 1 }}/>
        <span className="br-mono" style={{ fontSize: 10.5, color: "var(--ink-5)" }}>Last 30d</span>
        <Icon name="chevron_down" size={13} color="var(--ink-4)"/>
      </div>
      {!collapsed && (
        <div style={{ padding: 14, display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
          {children}
        </div>
      )}
      {footerLink && (
        <div style={{ padding: "10px 14px", borderTop: "1px solid var(--line)", background: "var(--surface-2)", display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 11.5 }}>
          <span style={{ color: "var(--ink-4)" }}>{footerLink.note}</span>
          <span style={{ color: "var(--ink-2)", fontWeight: 500, display: "inline-flex", alignItems: "center", gap: 4, cursor: "pointer" }}>
            {footerLink.label} <Icon name="arrow_right" size={11}/>
          </span>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// ObsCard — observational insight card (no recommendations)
// ─────────────────────────────────────────────────────────────
function ObsCard({ tone = "ok", icon, headline, detail, metric, time }) {
  const tones = {
    ok:      { bd: "#a7f3d0", fg: "var(--ok)",  bg: "var(--ok-soft)" },
    warn:    { bd: "#fcd34d", fg: "var(--warn)",bg: "var(--warn-soft)" },
    err:     { bd: "#fecaca", fg: "var(--err)", bg: "var(--err-soft)" },
    neutral: { bd: "var(--line-strong)", fg: "var(--ink-3)", bg: "var(--surface)" },
  };
  const t = tones[tone];
  return (
    <div style={{
      padding: 14, borderRadius: 10, border: `1px solid ${t.bd}`, background: t.bg,
      display: "flex", gap: 12, alignItems: "flex-start",
    }}>
      <div style={{
        width: 28, height: 28, borderRadius: 7, background: "#fff", color: t.fg,
        border: `1px solid ${t.bd}`, display: "grid", placeItems: "center", flexShrink: 0,
      }}>
        <Icon name={icon} size={14}/>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 8 }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)", letterSpacing: "-0.005em" }}>{headline}</span>
          {time && <span className="br-mono" style={{ fontSize: 10, color: "var(--ink-5)" }}>{time}</span>}
        </div>
        <div style={{ fontSize: 12.5, color: "var(--ink-3)", marginTop: 3, lineHeight: 1.5 }}>{detail}</div>
        {metric && (
          <div style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 8 }}>
            <span className="br-mono" style={{ fontSize: 10.5, color: "var(--ink-5)", textTransform: "uppercase", letterSpacing: ".06em" }}>{metric.label}</span>
            <span className="br-num" style={{ fontSize: 13, fontWeight: 600 }}>{metric.value}</span>
            {metric.delta && <Delta value={metric.delta}/>}
          </div>
        )}
      </div>
    </div>
  );
}

Object.assign(window, {
  RadarWordmark, RadarTopBar, PlatformBadge, PLATFORMS, KpiCard, Sparkline, LineChart, HBar, Delta, MetricRow, Widget, ObsCard,
});
