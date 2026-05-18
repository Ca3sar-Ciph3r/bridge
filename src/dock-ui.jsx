/* global React, Icon, Button, Pill, Card, Field, Input, Toggle, AICallout */
// Dock — primitives unique to the client execution portal.

// ─────────────────────────────────────────────────────────────
// Dock wordmark — anchored ship, distinct from Bridge & Compass.
// ─────────────────────────────────────────────────────────────
function DockWordmark({ size = 18 }) {
  const px = size === "lg" ? 26 : 22;
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "var(--ink)", fontFamily: "var(--font-display)", fontWeight: 600, letterSpacing: "-0.04em", fontSize: size === "lg" ? 24 : 18 }}>
      <div style={{
        width: px, height: px, borderRadius: 6,
        background: "linear-gradient(180deg, #0c0a09 0%, #292524 100%)",
        position: "relative", boxShadow: "inset 0 0 0 1px rgba(255,255,255,.08), 0 1px 2px rgba(0,0,0,.18)",
        display: "grid", placeItems: "center",
      }}>
        <svg width={px - 8} height={px - 8} viewBox="0 0 16 16" fill="none" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 11h10"/>
          <path d="M8 3v8"/>
          <path d="M5 5h6"/>
          <path d="M3 11a5 5 0 0 0 10 0"/>
        </svg>
      </div>
      Dock
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// DockTopBar — top of the client portal (Bridge/Compass-aligned)
// ─────────────────────────────────────────────────────────────
function DockTopBar({ active = "overview" }) {
  const nav = [
    ["overview", "Overview",  "target"],
    ["feed",     "Live feed", "bolt"],
    ["assets",   "Assets",    "image"],
    ["projects", "Projects",  "layers"],
    ["billing",  "Billing",   "file"],
    ["summary",  "This week", "star"],
  ];
  return (
    <div style={{
      padding: "12px 32px", borderBottom: "1px solid var(--line)",
      background: "var(--bg)", display: "flex", alignItems: "center", gap: 18, flexShrink: 0,
    }}>
      <DockWordmark/>
      <span style={{ width: 1, height: 16, background: "var(--line)" }}/>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{ width: 24, height: 24, borderRadius: 6, background: "#0c4a6e", color: "#fff", display: "grid", placeItems: "center", fontSize: 10, fontWeight: 600 }}>LD</div>
        <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: "-0.005em" }}>Lakeside Family Dental</span>
        <Pill tone="ok" size="sm" icon="check">Active</Pill>
      </div>

      <nav style={{ marginLeft: 16, display: "flex", gap: 2 }}>
        {nav.map(([k, l, i]) => {
          const a = k === active;
          return (
            <span key={k} style={{
              padding: "6px 12px", borderRadius: 7, fontSize: 13,
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

      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <Pill tone="accent" size="sm"><span style={{ width: 5, height: 5, borderRadius: 999, background: "var(--accent)", animation: "br-pulse-soft 1.6s ease-in-out infinite", display: "inline-block", marginRight: 4 }}/>3 awaiting you</Pill>
        <span style={{ width: 1, height: 16, background: "var(--line)" }}/>
        <Icon name="info" size={15} color="var(--ink-4)"/>
        <div style={{ width: 28, height: 28, borderRadius: 999, background: "#0c4a6e", color: "#fff", display: "grid", placeItems: "center", fontSize: 11, fontWeight: 600 }}>SC</div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// WhyCallout — "Why this exists" reference back to Compass strategy
// Inline tag with hover-state-look (not interactive in static design)
// ─────────────────────────────────────────────────────────────
function WhyCallout({ children, ref_ }) {
  return (
    <div style={{
      display: "inline-flex", alignItems: "flex-start", gap: 8,
      padding: "8px 12px", background: "var(--ai-soft)", border: "1px solid #ddd6fe",
      borderRadius: 8, fontSize: 12.5, color: "var(--ink-2)", lineHeight: 1.5,
      maxWidth: "100%",
    }}>
      <Icon name="sparkle" size={12} color="var(--ai)"/>
      <div style={{ flex: 1 }}>
        <span className="br-mono" style={{ fontSize: 10.5, color: "var(--ai)", textTransform: "uppercase", letterSpacing: ".06em", fontWeight: 600, marginRight: 6 }}>Why this exists</span>
        {children}
        {ref_ && <span className="br-mono" style={{ fontSize: 10.5, color: "var(--ai)", marginLeft: 6, padding: "1px 5px", border: "1px solid #ddd6fe", borderRadius: 4, background: "#fff" }}>{ref_}</span>}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// StageStrip — horizontal stage progress (Planning → Design → Build → QA → Launch)
// ─────────────────────────────────────────────────────────────
function StageStrip({ stages, current, blocked }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 0, width: "100%" }}>
      {stages.map((s, i) => {
        const done = i < current;
        const active = i === current;
        const isBlocked = active && blocked;
        return (
          <React.Fragment key={s}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
              <div style={{
                width: 18, height: 18, borderRadius: 999, flexShrink: 0,
                background: done ? "var(--ink)" : active ? (isBlocked ? "var(--warn)" : "var(--surface)") : "var(--surface)",
                border: done ? "1px solid var(--ink)" : active ? (isBlocked ? "1px solid var(--warn)" : "1.5px solid var(--accent)") : "1.5px solid var(--line-strong)",
                display: "grid", placeItems: "center", color: "#fff",
              }}>
                {done && <Icon name="check" size={10} strokeWidth={3}/>}
                {active && !isBlocked && <div style={{ width: 6, height: 6, borderRadius: 999, background: "var(--accent)" }}/>}
                {isBlocked && <Icon name="alert" size={10} color="#fff" strokeWidth={2.4}/>}
              </div>
              <span style={{
                fontSize: 12, fontWeight: active ? 600 : 500,
                color: done ? "var(--ink-3)" : active ? (isBlocked ? "var(--warn)" : "var(--ink)") : "var(--ink-4)",
                letterSpacing: "-0.005em",
              }}>{s}</span>
            </div>
            {i < stages.length - 1 && (
              <div style={{ flex: 1, height: 2, margin: "0 12px", background: i < current ? "var(--ink)" : "var(--line-strong)", borderRadius: 999 }}/>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// WorkstreamPill — color-coded by category
// ─────────────────────────────────────────────────────────────
function WorkstreamPill({ kind, size = "sm" }) {
  const map = {
    web:     { label: "Website",       icon: "monitor",   bg: "#eef0ff", fg: "#312e81", bd: "#c7d2fe" },
    paid:    { label: "Paid acquisition", icon: "megaphone", bg: "#fef3c7", fg: "#92400e", bd: "#fde68a" },
    seo:     { label: "Local SEO",     icon: "search",    bg: "#dcfce7", fg: "#166534", bd: "#bbf7d0" },
    booking: { label: "Booking",       icon: "bolt",      bg: "#fce7f3", fg: "#9d174d", bd: "#fbcfe8" },
    recall:  { label: "Recall · Beacon", icon: "users",   bg: "#ede9fe", fg: "#5b21b6", bd: "#ddd6fe" },
    strategy: { label: "Strategy",     icon: "target",    bg: "var(--surface-2)", fg: "var(--ink-2)", bd: "var(--line-strong)" },
  };
  const m = map[kind] || map.strategy;
  const fs = size === "sm" ? 11 : 12;
  const pad = size === "sm" ? "3px 8px" : "4px 10px";
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 5, padding: pad,
      background: m.bg, color: m.fg, border: `1px solid ${m.bd}`,
      borderRadius: 999, fontSize: fs, fontWeight: 500,
    }}>
      <Icon name={m.icon} size={fs - 1}/> {m.label}
    </span>
  );
}

// ─────────────────────────────────────────────────────────────
// StatusDot — explicit named state
// ─────────────────────────────────────────────────────────────
function StatusDot({ state }) {
  const map = {
    in_progress: { color: "var(--accent)", label: "In progress", pulse: true },
    waiting_you: { color: "var(--warn)",   label: "Waiting on you", pulse: true },
    in_review:   { color: "var(--ai)",     label: "Internal review" },
    blocked:     { color: "var(--err)",    label: "Blocked" },
    done:        { color: "var(--ok)",     label: "Completed" },
    scheduled:   { color: "var(--ink-4)",  label: "Scheduled" },
    live:        { color: "var(--ok)",     label: "Live", pulse: true },
  };
  const m = map[state] || map.scheduled;
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 11.5, fontWeight: 500, color: "var(--ink-2)" }}>
      <span style={{ position: "relative", width: 8, height: 8, display: "inline-grid", placeItems: "center" }}>
        <span style={{ width: 8, height: 8, borderRadius: 999, background: m.color }}/>
        {m.pulse && <span style={{ position: "absolute", inset: -4, borderRadius: 999, background: m.color, opacity: .25, animation: "br-pulse-soft 1.6s ease-in-out infinite" }}/>}
      </span>
      {m.label}
    </span>
  );
}

// ─────────────────────────────────────────────────────────────
// AssetThumb — visual preview placeholder (no real images)
// kind: "ad-square" | "ad-vertical" | "landing-page" | "post" | "video" | "blog"
// ─────────────────────────────────────────────────────────────
function AssetThumb({ kind, label, scale = 1, style }) {
  const sx = { transform: `scale(${scale})`, transformOrigin: "top left", ...style };
  const surfaces = {
    "ad-square": (
      <div style={{ width: 200, height: 200, borderRadius: 8, overflow: "hidden", position: "relative", background: "linear-gradient(135deg, #0c4a6e 0%, #0369a1 100%)", color: "#fff", padding: 16, display: "flex", flexDirection: "column", justifyContent: "space-between", ...sx }}>
        <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: ".08em", opacity: .8 }}>NEW · WILLISTON</div>
        <div>
          <div style={{ fontSize: 24, fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.025em" }}>Gentle dentistry —<br/>now in Williston.</div>
          <div style={{ marginTop: 12, padding: "6px 10px", background: "#fff", color: "#0c4a6e", borderRadius: 4, fontSize: 11, fontWeight: 600, display: "inline-block" }}>Book a visit →</div>
        </div>
        <div style={{ position: "absolute", top: 8, right: 10, width: 28, height: 28, borderRadius: 999, background: "rgba(255,255,255,.18)", display: "grid", placeItems: "center", fontSize: 10, fontWeight: 700 }}>LD</div>
      </div>
    ),
    "ad-vertical": (
      <div style={{ width: 160, height: 240, borderRadius: 8, overflow: "hidden", position: "relative", background: "linear-gradient(160deg, #fce7f3 0%, #fbcfe8 60%, #f5d0fe 100%)", color: "#0c0a09", padding: 14, display: "flex", flexDirection: "column", ...sx }}>
        <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: ".1em", opacity: .6 }}>FAMILIES · CHITTENDEN</div>
        <div style={{ fontSize: 20, fontWeight: 700, lineHeight: 1.05, marginTop: 10, letterSpacing: "-0.025em" }}>Kids who don't dread the dentist.</div>
        <div style={{ flex: 1 }}/>
        <div style={{ height: 80, background: "rgba(0,0,0,.06)", borderRadius: 5, marginBottom: 8, display: "grid", placeItems: "center", fontSize: 10, color: "var(--ink-4)" }}>Family photo</div>
        <div style={{ padding: "5px 9px", background: "#0c0a09", color: "#fff", borderRadius: 4, fontSize: 10.5, fontWeight: 600, textAlign: "center" }}>Book at Williston</div>
      </div>
    ),
    "landing-page": (
      <div style={{ width: 280, height: 200, borderRadius: 8, overflow: "hidden", background: "#fff", border: "1px solid var(--line)", display: "flex", flexDirection: "column", ...sx }}>
        <div style={{ height: 18, background: "var(--surface-2)", display: "flex", alignItems: "center", gap: 4, padding: "0 8px" }}>
          <span style={{ width: 5, height: 5, borderRadius: 999, background: "#ef4444" }}/>
          <span style={{ width: 5, height: 5, borderRadius: 999, background: "#f59e0b" }}/>
          <span style={{ width: 5, height: 5, borderRadius: 999, background: "#10b981" }}/>
        </div>
        <div style={{ flex: 1, padding: "12px 14px", display: "flex", flexDirection: "column", gap: 6 }}>
          <div style={{ width: 40, height: 8, background: "#0c4a6e", borderRadius: 2 }}/>
          <div style={{ width: "85%", height: 12, background: "var(--ink)", borderRadius: 2, marginTop: 8 }}/>
          <div style={{ width: "70%", height: 12, background: "var(--ink-4)", borderRadius: 2 }}/>
          <div style={{ display: "flex", gap: 4, marginTop: 4 }}>
            <div style={{ width: 56, height: 18, background: "#0c4a6e", borderRadius: 3 }}/>
            <div style={{ width: 56, height: 18, background: "var(--surface-3)", borderRadius: 3 }}/>
          </div>
          <div style={{ flex: 1, background: "var(--surface-2)", borderRadius: 4, marginTop: 6, display: "grid", placeItems: "center", fontSize: 9, color: "var(--ink-4)" }}>Williston exterior</div>
        </div>
      </div>
    ),
    "post": (
      <div style={{ width: 200, height: 200, borderRadius: 8, overflow: "hidden", background: "#f5f3ff", padding: 18, display: "flex", flexDirection: "column", justifyContent: "center", ...sx }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: "var(--ai)", letterSpacing: ".06em" }}>TIP TUESDAY</div>
        <div style={{ fontSize: 22, fontWeight: 700, color: "var(--ink)", lineHeight: 1.1, marginTop: 12, letterSpacing: "-0.02em" }}>5 ways to make your kid's first cleaning calm.</div>
        <div style={{ marginTop: 16, fontSize: 11, color: "var(--ink-4)" }}>@lakesidefamilydental</div>
      </div>
    ),
    "blog": (
      <div style={{ width: 280, height: 160, borderRadius: 8, overflow: "hidden", background: "#fff", border: "1px solid var(--line)", padding: 14, ...sx }}>
        <div style={{ fontSize: 9.5, fontWeight: 600, color: "var(--accent)", letterSpacing: ".08em" }}>BLOG · 4 MIN READ</div>
        <div style={{ fontSize: 16, fontWeight: 700, marginTop: 8, lineHeight: 1.2, letterSpacing: "-0.015em" }}>Why we use minimal-fluoride sealants for first molars.</div>
        <div style={{ marginTop: 10, fontSize: 11, color: "var(--ink-4)", lineHeight: 1.5 }}>A short guide on what we recommend, when, and why — written for parents not dentists.</div>
        <div style={{ marginTop: 10, display: "flex", gap: 5 }}>
          <span style={{ padding: "2px 6px", background: "var(--surface-2)", borderRadius: 4, fontSize: 9.5, color: "var(--ink-3)" }}>Pediatric</span>
          <span style={{ padding: "2px 6px", background: "var(--surface-2)", borderRadius: 4, fontSize: 9.5, color: "var(--ink-3)" }}>Education</span>
        </div>
      </div>
    ),
    "video": (
      <div style={{ width: 240, height: 160, borderRadius: 8, overflow: "hidden", background: "#0c0a09", color: "#fff", position: "relative", padding: 14, display: "flex", flexDirection: "column", justifyContent: "flex-end", ...sx }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 50% 40%, #57534e 0%, transparent 60%)" }}/>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 36, height: 36, borderRadius: 999, background: "rgba(255,255,255,.95)", display: "grid", placeItems: "center" }}>
          <svg width="14" height="14" viewBox="0 0 14 14"><polygon points="2,1 13,7 2,13" fill="#0c0a09"/></svg>
        </div>
        <div style={{ position: "relative", fontSize: 12, fontWeight: 600 }}>Williston tour · 0:42</div>
        <div style={{ position: "relative", fontSize: 10, opacity: .7, marginTop: 2 }}>Dr. Lin walks through the new chairs.</div>
      </div>
    ),
  };
  return surfaces[kind] || <div style={{ width: 200, height: 200, background: "var(--surface-2)", borderRadius: 8, ...sx }}/>;
}

// ─────────────────────────────────────────────────────────────
// AssetCard — wrapper around AssetThumb with metadata + approval row
// ─────────────────────────────────────────────────────────────
function AssetCard({ kind, thumbKind, title, workstream, status = "waiting_you", version = "v2", needsBy, comments = 0, why }) {
  return (
    <div style={{
      background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 14,
      boxShadow: "var(--shadow-1)", overflow: "hidden", display: "flex", flexDirection: "column",
    }}>
      <div style={{ padding: 14, background: "var(--surface-2)", borderBottom: "1px solid var(--line)", display: "grid", placeItems: "center", minHeight: 200 }}>
        <AssetThumb kind={thumbKind}/>
      </div>
      <div style={{ padding: 14, display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8 }}>
          <div style={{ minWidth: 0, flex: 1 }}>
            <div style={{ fontSize: 13.5, fontWeight: 600, letterSpacing: "-0.005em" }}>{title}</div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 4 }}>
              <WorkstreamPill kind={workstream}/>
              <span className="br-mono" style={{ fontSize: 10.5, color: "var(--ink-5)" }}>{version}</span>
            </div>
          </div>
          {status === "waiting_you" && <Pill tone="warn" size="sm">Needs you</Pill>}
          {status === "in_review" && <Pill tone="ai" size="sm">Internal review</Pill>}
          {status === "done" && <Pill tone="ok" size="sm" icon="check">Approved</Pill>}
        </div>
        {why && <WhyCallout ref_={why.ref}>{why.body}</WhyCallout>}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto", paddingTop: 8, borderTop: "1px solid var(--line-faint)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {needsBy && <span className="br-mono" style={{ fontSize: 10.5, color: "var(--ink-4)" }}>{needsBy}</span>}
            {comments > 0 && (
              <span style={{ display: "inline-flex", alignItems: "center", gap: 3, fontSize: 11.5, color: "var(--ink-4)" }}>
                <Icon name="info" size={11}/> {comments}
              </span>
            )}
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            {status === "waiting_you" && (
              <>
                <Button variant="ghost" size="sm">Request change</Button>
                <Button variant="primary" size="sm" icon="check">Approve</Button>
              </>
            )}
            {status === "in_review" && <Button variant="ghost" size="sm" iconRight="chevron_right">Open</Button>}
            {status === "done" && <Button variant="ghost" size="sm" iconRight="chevron_right">View live</Button>}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// FeedItem — entry in the live workstream feed
// ─────────────────────────────────────────────────────────────
function FeedItem({ time, kind, title, body, why, asset, status, by, action }) {
  return (
    <article style={{
      padding: "16px 18px", background: "var(--surface)", border: "1px solid var(--line)",
      borderRadius: 12, boxShadow: "var(--shadow-1)", display: "grid",
      gridTemplateColumns: "auto 1fr", gap: 14,
    }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, paddingTop: 2 }}>
        <span className="br-mono" style={{ fontSize: 10, color: "var(--ink-5)", whiteSpace: "nowrap" }}>{time}</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
          <WorkstreamPill kind={kind}/>
          {status && <StatusDot state={status}/>}
          {by && (
            <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 11.5, color: "var(--ink-4)", marginLeft: "auto" }}>
              <span style={{ width: 18, height: 18, borderRadius: 999, background: by.bg, color: "#fff", display: "grid", placeItems: "center", fontSize: 9, fontWeight: 600 }}>{by.initials}</span>
              {by.name}
            </span>
          )}
        </div>
        <div>
          <div style={{ fontSize: 15, fontWeight: 600, letterSpacing: "-0.005em", lineHeight: 1.3 }}>{title}</div>
          {body && <div style={{ fontSize: 13, color: "var(--ink-3)", marginTop: 4, lineHeight: 1.55 }}>{body}</div>}
        </div>
        {asset && (
          <div style={{
            padding: 12, background: "var(--surface-2)", border: "1px solid var(--line)", borderRadius: 10,
            display: "flex", gap: 14, alignItems: "center",
          }}>
            <div style={{ flexShrink: 0 }}>
              <AssetThumb kind={asset.kind} scale={asset.scale || 0.55}/>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 500 }}>{asset.title}</div>
              <div className="br-mono" style={{ fontSize: 10.5, color: "var(--ink-5)" }}>{asset.meta}</div>
            </div>
            {asset.action && <Button variant="outline" size="sm" iconRight="arrow_right">{asset.action}</Button>}
          </div>
        )}
        {why && <WhyCallout ref_={why.ref}>{why.body}</WhyCallout>}
        {action && (
          <div style={{ display: "flex", gap: 8 }}>
            {action}
          </div>
        )}
      </div>
    </article>
  );
}

Object.assign(window, {
  DockWordmark, DockTopBar, WhyCallout, StageStrip, WorkstreamPill, StatusDot, AssetThumb, AssetCard, FeedItem,
});
