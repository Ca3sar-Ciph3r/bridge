/* global React */
// Bridge UI primitives — buttons, fields, chips, cards, rails, etc.

const { useState, useEffect, useRef, useMemo } = React;

// ─────────────────────────────────────────────────────────────
// Icon — tiny inline SVG set; stroke-based, 1.5px, 18px box.
// ─────────────────────────────────────────────────────────────
function Icon({ name, size = 18, color = "currentColor", strokeWidth = 1.6 }) {
  const common = {
    width: size, height: size, viewBox: "0 0 24 24", fill: "none",
    stroke: color, strokeWidth, strokeLinecap: "round", strokeLinejoin: "round",
  };
  const paths = {
    arrow_right: <><line x1="5" y1="12" x2="19" y2="12"/><polyline points="13 6 19 12 13 18"/></>,
    arrow_left: <><line x1="19" y1="12" x2="5" y2="12"/><polyline points="11 6 5 12 11 18"/></>,
    check: <polyline points="5 12.5 10 17.5 19 7.5"/>,
    sparkle: <><path d="M12 3 13.6 9.2 19.8 10.8 13.6 12.4 12 18.6 10.4 12.4 4.2 10.8 10.4 9.2 Z"/><path d="M19 4 19.6 6 21.6 6.6 19.6 7.2 19 9.2 18.4 7.2 16.4 6.6 18.4 6 Z"/></>,
    lock: <><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2"/><polyline points="3 7 12 13 21 7"/></>,
    globe: <><circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></>,
    map: <><polygon points="3 6 9 4 15 6 21 4 21 18 15 20 9 18 3 20"/><line x1="9" y1="4" x2="9" y2="18"/><line x1="15" y1="6" x2="15" y2="20"/></>,
    building: <><rect x="5" y="3" width="14" height="18" rx="1"/><line x1="9" y1="7" x2="9" y2="7.01"/><line x1="13" y1="7" x2="13" y2="7.01"/><line x1="9" y1="11" x2="9" y2="11.01"/><line x1="13" y1="11" x2="13" y2="11.01"/><line x1="9" y1="15" x2="9" y2="15.01"/><line x1="13" y1="15" x2="13" y2="15.01"/></>,
    users: <><circle cx="9" cy="9" r="3.5"/><path d="M3 19c.6-3 3-5 6-5s5.4 2 6 5"/><circle cx="17" cy="8" r="2.5"/><path d="M16 14c2.5 0 4.5 1.6 5 4"/></>,
    target: <><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.4" fill="currentColor"/></>,
    layers: <><polygon points="12 3 21 8 12 13 3 8"/><polyline points="3 13 12 18 21 13"/><polyline points="3 18 12 22 21 18" opacity=".55"/></>,
    upload: <><path d="M12 16V4"/><polyline points="6 9 12 4 18 9"/><path d="M5 17v2a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-2"/></>,
    folder: <><path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"/></>,
    image: <><rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="11" r="1.5"/><path d="m3 17 5-4 4 3 3-2 6 4"/></>,
    file: <><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><polyline points="14 3 14 8 19 8"/></>,
    monitor: <><rect x="3" y="4" width="18" height="13" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></>,
    megaphone: <><path d="M3 11v2l9 4V7Z"/><path d="M12 7l7-3v16l-7-3"/><path d="M6 15a3 3 0 0 0 5 2"/></>,
    search: <><circle cx="11" cy="11" r="6"/><line x1="20" y1="20" x2="15.5" y2="15.5"/></>,
    brush: <><path d="M14 3l7 7-9 9c-1.5 1.5-4 1.5-5.5 0L4 16c-1.5-1.5-1.5-4 0-5.5Z"/><line x1="9" y1="14" x2="14" y2="9"/></>,
    pen: <><path d="M3 21h6l11-11-6-6L3 15Z"/><line x1="14" y1="6" x2="18" y2="10"/></>,
    bolt: <polygon points="13 3 4 14 11 14 10 21 20 10 13 10"/>,
    plus: <><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></>,
    x: <><line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/></>,
    chevron_down: <polyline points="6 9 12 15 18 9"/>,
    chevron_right: <polyline points="9 6 15 12 9 18"/>,
    info: <><circle cx="12" cy="12" r="9"/><line x1="12" y1="11" x2="12" y2="16"/><line x1="12" y1="8" x2="12" y2="8.01"/></>,
    alert: <><path d="M12 3 2 21h20Z"/><line x1="12" y1="10" x2="12" y2="15"/><line x1="12" y1="18" x2="12" y2="18.01"/></>,
    drag: <><circle cx="9" cy="6" r="1" fill="currentColor"/><circle cx="9" cy="12" r="1" fill="currentColor"/><circle cx="9" cy="18" r="1" fill="currentColor"/><circle cx="15" cy="6" r="1" fill="currentColor"/><circle cx="15" cy="12" r="1" fill="currentColor"/><circle cx="15" cy="18" r="1" fill="currentColor"/></>,
    save: <><path d="M5 5a2 2 0 0 1 2-2h10l4 4v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2Z"/><polyline points="7 3 7 9 15 9 15 3"/><rect x="8" y="13" width="8" height="6"/></>,
    sliders: <><line x1="4" y1="7" x2="20" y2="7"/><circle cx="9" cy="7" r="2" fill="white"/><line x1="4" y1="17" x2="20" y2="17"/><circle cx="15" cy="17" r="2" fill="white"/></>,
    star: <polygon points="12 3 14.5 9 21 9.8 16 14 17.5 20.5 12 17 6.5 20.5 8 14 3 9.8 9.5 9"/>,
  };
  return <svg {...common}>{paths[name] || null}</svg>;
}

// ─────────────────────────────────────────────────────────────
// Button
// ─────────────────────────────────────────────────────────────
function Button({ children, variant = "primary", size = "md", icon, iconRight, full, onClick, disabled, style }) {
  const sizes = {
    sm: { padding: "6px 12px", fontSize: 13, height: 32, radius: 6 },
    md: { padding: "9px 16px", fontSize: 14, height: 40, radius: 8 },
    lg: { padding: "13px 22px", fontSize: 15, height: 48, radius: 10 },
  }[size];
  const variants = {
    primary: { background: "var(--ink)", color: "#fff", border: "1px solid var(--ink)", boxShadow: "inset 0 1px 0 rgba(255,255,255,.12), 0 1px 2px rgba(0,0,0,.08)" },
    accent: { background: "var(--accent)", color: "#fff", border: "1px solid var(--accent)", boxShadow: "inset 0 1px 0 rgba(255,255,255,.18), 0 1px 2px rgba(79,70,229,.32)" },
    ghost: { background: "transparent", color: "var(--ink-2)", border: "1px solid transparent" },
    outline: { background: "var(--surface)", color: "var(--ink)", border: "1px solid var(--line-strong)", boxShadow: "var(--shadow-1)" },
    subtle: { background: "var(--surface-2)", color: "var(--ink)", border: "1px solid var(--line)" },
  }[variant];
  return (
    <button
      className="br-focus"
      onClick={onClick}
      disabled={disabled}
      style={{
        display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
        fontFamily: "var(--font-sans)", fontWeight: 500, cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? .5 : 1, transition: "transform .08s ease, background .15s ease",
        width: full ? "100%" : "auto", letterSpacing: "-0.005em",
        ...sizes, ...variants, borderRadius: sizes.radius, ...style,
      }}
    >
      {icon && <Icon name={icon} size={16} />}
      {children}
      {iconRight && <Icon name={iconRight} size={16} />}
    </button>
  );
}

// ─────────────────────────────────────────────────────────────
// Field — labeled input wrapper
// ─────────────────────────────────────────────────────────────
function Field({ label, hint, error, optional, ai, children, style }) {
  return (
    <label style={{ display: "block", ...style }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 13, fontWeight: 500, color: "var(--ink-2)", letterSpacing: "-0.005em" }}>{label}</span>
          {optional && <span style={{ fontSize: 11, color: "var(--ink-5)" }}>Optional</span>}
          {ai && (
            <span style={{ display: "inline-flex", alignItems: "center", gap: 3, fontSize: 11, color: "var(--ai)", background: "var(--ai-soft)", padding: "1.5px 6px", borderRadius: 4, fontWeight: 500 }}>
              <Icon name="sparkle" size={10}/> AI-assist
            </span>
          )}
        </div>
        {hint && <span style={{ fontSize: 12, color: "var(--ink-4)" }}>{hint}</span>}
      </div>
      {children}
      {error && <div style={{ fontSize: 12, color: "var(--err)", marginTop: 4 }}>{error}</div>}
    </label>
  );
}

function Input({ value, onChange, placeholder, prefix, suffix, type = "text", ...rest }) {
  return (
    <div style={{
      display: "flex", alignItems: "center",
      background: "var(--surface)", border: "1px solid var(--line-strong)",
      borderRadius: 8, padding: "0 12px", height: 40,
      boxShadow: "var(--shadow-1)", transition: "all .15s ease",
    }}>
      {prefix && <span style={{ color: "var(--ink-4)", marginRight: 8, fontSize: 14 }}>{prefix}</span>}
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange && onChange(e.target.value)}
        className="br-focus"
        style={{
          flex: 1, height: "100%", border: "none", outline: "none", background: "transparent",
          fontFamily: "var(--font-sans)", fontSize: 14, color: "var(--ink)", letterSpacing: "-0.005em",
        }}
        {...rest}
      />
      {suffix && <span style={{ color: "var(--ink-4)", marginLeft: 8, fontSize: 13 }}>{suffix}</span>}
    </div>
  );
}

function Textarea({ value, onChange, placeholder, rows = 4, shimmer, style }) {
  return (
    <div style={{ position: "relative" }}>
      <textarea
        value={value}
        onChange={(e) => onChange && onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="br-focus"
        style={{
          width: "100%", padding: "12px 14px",
          background: "var(--surface)", border: "1px solid var(--line-strong)",
          borderRadius: 10, fontFamily: "var(--font-sans)", fontSize: 14, color: "var(--ink)",
          lineHeight: 1.55, resize: "none", boxShadow: "var(--shadow-1)", letterSpacing: "-0.005em",
          ...style,
        }}
      />
      {shimmer && (
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, bottom: 0, borderRadius: 10,
          pointerEvents: "none",
          background: "linear-gradient(110deg, transparent 30%, rgba(124,58,237,.08) 50%, transparent 70%)",
          backgroundSize: "200% 100%", animation: "br-shimmer 2.4s linear infinite",
        }}/>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// SelectChip — single-select option chip
// ─────────────────────────────────────────────────────────────
function Chip({ active, onClick, children, icon, size = "md" }) {
  const pad = size === "sm" ? "5px 10px" : "8px 14px";
  const fs = size === "sm" ? 12 : 13;
  return (
    <button onClick={onClick} className="br-focus" style={{
      display: "inline-flex", alignItems: "center", gap: 6,
      padding: pad, fontSize: fs, fontWeight: 500, fontFamily: "var(--font-sans)",
      borderRadius: 999, cursor: "pointer", transition: "all .15s ease", letterSpacing: "-0.005em",
      background: active ? "var(--ink)" : "var(--surface)",
      color: active ? "#fff" : "var(--ink-2)",
      border: active ? "1px solid var(--ink)" : "1px solid var(--line-strong)",
      boxShadow: active ? "0 1px 2px rgba(0,0,0,.08)" : "var(--shadow-1)",
    }}>
      {icon && <Icon name={icon} size={13}/>}
      {children}
    </button>
  );
}

// Pill — non-interactive tag
function Pill({ children, tone = "neutral", icon, size = "md" }) {
  const tones = {
    neutral: { bg: "var(--surface-2)", fg: "var(--ink-2)", bd: "var(--line)" },
    accent: { bg: "var(--accent-soft)", fg: "var(--accent-ink)", bd: "var(--accent-soft-2)" },
    ok: { bg: "var(--ok-soft)", fg: "var(--ok)", bd: "#a7f3d0" },
    warn: { bg: "var(--warn-soft)", fg: "var(--warn)", bd: "#fcd34d" },
    ai: { bg: "var(--ai-soft)", fg: "var(--ai)", bd: "#ddd6fe" },
    err: { bg: "var(--err-soft)", fg: "var(--err)", bd: "#fecaca" },
    dark: { bg: "var(--ink)", fg: "#fff", bd: "var(--ink)" },
  }[tone];
  const fs = size === "sm" ? 10.5 : 11.5;
  const pad = size === "sm" ? "2px 7px" : "3px 9px";
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 4,
      background: tones.bg, color: tones.fg, border: `1px solid ${tones.bd}`,
      padding: pad, fontSize: fs, fontWeight: 500, borderRadius: 999, letterSpacing: 0,
    }}>
      {icon && <Icon name={icon} size={11}/>}
      {children}
    </span>
  );
}

// ─────────────────────────────────────────────────────────────
// Card
// ─────────────────────────────────────────────────────────────
function Card({ children, padding = 20, style }) {
  return (
    <div style={{
      background: "var(--surface)", border: "1px solid var(--line)",
      borderRadius: 14, padding, boxShadow: "var(--shadow-1)", ...style,
    }}>{children}</div>
  );
}

// SelectCard — radio-style large card option
function SelectCard({ active, onClick, icon, title, subtitle, badge, style }) {
  return (
    <button onClick={onClick} className="br-focus" style={{
      textAlign: "left", display: "flex", flexDirection: "column", gap: 8,
      padding: 16, borderRadius: 12, cursor: "pointer",
      background: active ? "var(--surface)" : "var(--surface)",
      border: active ? "1.5px solid var(--accent)" : "1px solid var(--line-strong)",
      boxShadow: active ? "0 0 0 4px rgba(79, 70, 229, .12), var(--shadow-1)" : "var(--shadow-1)",
      transition: "all .18s ease", position: "relative", fontFamily: "var(--font-sans)",
      ...style,
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
        {icon && (
          <div style={{
            width: 32, height: 32, borderRadius: 8, display: "grid", placeItems: "center",
            background: active ? "var(--accent-soft)" : "var(--surface-2)",
            color: active ? "var(--accent)" : "var(--ink-3)",
            border: `1px solid ${active ? "var(--accent-soft-2)" : "var(--line)"}`,
          }}>
            <Icon name={icon} size={16}/>
          </div>
        )}
        <div style={{
          width: 18, height: 18, borderRadius: 999, display: "grid", placeItems: "center",
          background: active ? "var(--accent)" : "transparent",
          border: active ? "1.5px solid var(--accent)" : "1.5px solid var(--line-strong)",
          transition: "all .15s ease",
        }}>
          {active && <Icon name="check" size={11} color="#fff" strokeWidth={2.5}/>}
        </div>
      </div>
      <div>
        <div style={{ fontSize: 14, fontWeight: 600, color: "var(--ink)", letterSpacing: "-0.01em" }}>{title}</div>
        {subtitle && <div style={{ fontSize: 12.5, color: "var(--ink-4)", marginTop: 2, lineHeight: 1.45 }}>{subtitle}</div>}
      </div>
      {badge && <div style={{ position: "absolute", top: 12, right: 36 }}>{badge}</div>}
    </button>
  );
}

// ─────────────────────────────────────────────────────────────
// Toggle / Switch
// ─────────────────────────────────────────────────────────────
function Toggle({ on, onChange, size = "md" }) {
  const w = size === "sm" ? 28 : 36;
  const h = size === "sm" ? 16 : 20;
  const knob = h - 4;
  return (
    <button onClick={() => onChange && onChange(!on)} style={{
      width: w, height: h, borderRadius: 999, border: "none", padding: 2,
      background: on ? "var(--accent)" : "var(--surface-3)", cursor: "pointer",
      transition: "background .18s ease", display: "inline-flex", alignItems: "center",
    }}>
      <span style={{
        width: knob, height: knob, borderRadius: 999, background: "#fff",
        transform: `translateX(${on ? w - knob - 4 : 0}px)`,
        transition: "transform .18s cubic-bezier(.3, .9, .3, 1)",
        boxShadow: "0 1px 2px rgba(0,0,0,.18)",
      }}/>
    </button>
  );
}

// ─────────────────────────────────────────────────────────────
// Slider — labeled value slider
// ─────────────────────────────────────────────────────────────
function Slider({ value, min = 0, max = 100, step = 1, onChange, format = (v) => v }) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }}>
        <span className="br-mono br-num" style={{ color: "var(--ink)", fontSize: 16, fontWeight: 600 }}>{format(value)}</span>
        <span className="br-mono" style={{ color: "var(--ink-5)", fontSize: 11 }}>{format(min)} → {format(max)}</span>
      </div>
      <div style={{ position: "relative", height: 6, borderRadius: 999, background: "var(--surface-3)" }}>
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: `${pct}%`, background: "var(--ink)", borderRadius: 999 }}/>
        <div style={{
          position: "absolute", top: "50%", left: `${pct}%`,
          width: 18, height: 18, borderRadius: 999, background: "#fff",
          border: "1.5px solid var(--ink)", transform: "translate(-50%, -50%)",
          boxShadow: "0 1px 3px rgba(0,0,0,.18)",
        }}/>
        <input
          type="range"
          value={value}
          min={min}
          max={max}
          step={step}
          onChange={(e) => onChange && onChange(Number(e.target.value))}
          style={{
            position: "absolute", inset: 0, width: "100%", height: "100%",
            opacity: 0, cursor: "pointer",
          }}
        />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// ProgressRail — left sidebar with section progress
// ─────────────────────────────────────────────────────────────
function ProgressRail({ current, sections }) {
  return (
    <aside style={{
      width: 280, padding: "32px 28px 28px 32px", borderRight: "1px solid var(--line)",
      background: "var(--bg)", display: "flex", flexDirection: "column", gap: 28, flexShrink: 0,
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div className="br-wordmark"><span className="br-mark"></span>Bridge</div>
        <span className="br-mono" style={{ color: "var(--ink-5)", fontSize: 11 }}>v1.4</span>
      </div>

      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }}>
          <span className="br-eyebrow">Progress</span>
          <span className="br-mono br-num" style={{ fontSize: 12, color: "var(--ink-3)" }}>{Math.round((current / sections.length) * 100)}%</span>
        </div>
        <div style={{ height: 3, background: "var(--surface-3)", borderRadius: 999, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${(current / sections.length) * 100}%`, background: "var(--ink)", borderRadius: 999, transition: "width .4s ease" }}/>
        </div>
      </div>

      <nav style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {sections.map((s, i) => {
          const state = i < current ? "done" : i === current ? "active" : "todo";
          return (
            <div key={s.id} style={{
              display: "flex", alignItems: "flex-start", gap: 12, padding: "10px 8px",
              borderRadius: 8, background: state === "active" ? "var(--surface)" : "transparent",
              border: state === "active" ? "1px solid var(--line)" : "1px solid transparent",
              boxShadow: state === "active" ? "var(--shadow-1)" : "none",
              transition: "all .18s ease",
            }}>
              <div style={{
                width: 22, height: 22, borderRadius: 999, marginTop: 1,
                display: "grid", placeItems: "center", flexShrink: 0,
                background: state === "done" ? "var(--ink)" : state === "active" ? "var(--surface)" : "transparent",
                border: state === "done" ? "1px solid var(--ink)" : state === "active" ? "1.5px solid var(--ink)" : "1.5px solid var(--line-strong)",
                color: state === "done" ? "#fff" : "var(--ink)",
                fontSize: 10.5, fontWeight: 600, fontVariantNumeric: "tabular-nums",
              }}>
                {state === "done" ? <Icon name="check" size={11} strokeWidth={2.4}/> : (i + 1).toString().padStart(2, "0").slice(-1)}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: state === "active" ? 600 : 500, color: state === "todo" ? "var(--ink-4)" : "var(--ink)", letterSpacing: "-0.005em" }}>{s.title}</div>
                <div style={{ fontSize: 11.5, color: "var(--ink-4)", marginTop: 1 }}>{s.subtitle}</div>
              </div>
            </div>
          );
        })}
      </nav>

      <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: 12 }}>
        <div style={{
          padding: "10px 12px", borderRadius: 10, border: "1px solid var(--line)",
          background: "var(--surface)", display: "flex", alignItems: "center", gap: 10,
        }}>
          <div style={{ width: 8, height: 8, borderRadius: 999, background: "var(--ok)", animation: "br-pulse-soft 2s ease-in-out infinite" }}/>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 12, fontWeight: 500, color: "var(--ink)" }}>Autosaved</div>
            <div style={{ fontSize: 11, color: "var(--ink-4)" }}>2s ago · resume on any device</div>
          </div>
        </div>
        <div style={{ fontSize: 11, color: "var(--ink-5)", lineHeight: 1.5, paddingLeft: 4 }}>
          Powered by <span style={{ color: "var(--ink-3)", fontWeight: 500 }}>Digital Native</span>
        </div>
      </div>
    </aside>
  );
}

// ─────────────────────────────────────────────────────────────
// Footer — sticky Back / Continue
// ─────────────────────────────────────────────────────────────
function StepFooter({ backLabel = "Back", continueLabel = "Continue", continueIcon = "arrow_right", note, primary = "accent" }) {
  return (
    <footer style={{
      borderTop: "1px solid var(--line)", padding: "16px 56px", background: "var(--surface)",
      display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0,
    }}>
      <Button variant="ghost" icon="arrow_left">{backLabel}</Button>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        {note && <span style={{ fontSize: 12, color: "var(--ink-4)" }}>{note}</span>}
        <Button variant={primary} iconRight={continueIcon}>{continueLabel}</Button>
      </div>
    </footer>
  );
}

// ─────────────────────────────────────────────────────────────
// AICallout — soft purple insight box
// ─────────────────────────────────────────────────────────────
function AICallout({ title, children, action }) {
  return (
    <div style={{
      background: "linear-gradient(180deg, #faf8ff 0%, #f5f3ff 100%)",
      border: "1px solid #e9e3ff", borderRadius: 12, padding: 16,
      display: "flex", gap: 12, alignItems: "flex-start",
    }}>
      <div style={{
        width: 28, height: 28, borderRadius: 8, flexShrink: 0,
        background: "linear-gradient(135deg, #7c3aed 0%, #a78bfa 100%)",
        display: "grid", placeItems: "center", color: "#fff",
        boxShadow: "0 2px 6px rgba(124,58,237,.3)",
      }}>
        <Icon name="sparkle" size={14}/>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        {title && <div style={{ fontSize: 12.5, fontWeight: 600, color: "var(--ai)", letterSpacing: "-0.005em", marginBottom: 4 }}>{title}</div>}
        <div style={{ fontSize: 13, color: "var(--ink-2)", lineHeight: 1.55 }}>{children}</div>
        {action && <div style={{ marginTop: 10 }}>{action}</div>}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Client header bar (top of screen)
// ─────────────────────────────────────────────────────────────
function ClientBar({ section, total, sectionName }) {
  return (
    <div style={{
      padding: "20px 56px", borderBottom: "1px solid var(--line)",
      background: "var(--bg)", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <Pill icon="lock" size="sm">Secure session · sarah@lakesidedental.com</Pill>
        <span className="br-mono" style={{ fontSize: 11, color: "var(--ink-5)" }}>STEP {section}/{total} — {sectionName}</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <Button variant="ghost" size="sm" icon="save">Save & exit</Button>
        <div style={{ width: 1, height: 16, background: "var(--line-strong)" }}/>
        <div style={{
          width: 28, height: 28, borderRadius: 999, background: "#0c4a6e",
          color: "#fff", display: "grid", placeItems: "center", fontSize: 12, fontWeight: 600,
        }}>SC</div>
      </div>
    </div>
  );
}

// Export everything to window for sibling babel scripts.
Object.assign(window, {
  React, Icon, Button, Field, Input, Textarea, Chip, Pill, Card, SelectCard,
  Toggle, Slider, ProgressRail, StepFooter, AICallout, ClientBar,
});
