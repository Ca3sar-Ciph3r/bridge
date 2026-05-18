/* global React, Icon, Button, Field, Input, Textarea, Chip, Pill, Card, SelectCard, Toggle, Slider, AICallout, MobileFrame */
// Bridge — additional mobile screens: Landing, MagicLink, Resume, Snapshot, Strategy, Assets, Goals, Complete.

// Bare device-only shell (no Bridge top-bar / progress / heading) for screens
// that have their own chrome (Landing, MagicLink, Complete).
function MobileBare({ children, status = "9:41" }) {
  return (
    <div className="br-frame" style={{ background: "#e9e9e6", padding: 16, alignItems: "center" }}>
      <div style={{
        width: 360, flex: 1, maxHeight: 720,
        borderRadius: 44, background: "#0c0a09",
        padding: 8, boxShadow: "0 10px 40px -10px rgba(0,0,0,.28), 0 1px 3px rgba(0,0,0,.1)",
        display: "flex", flexDirection: "column",
      }}>
        <div style={{ flex: 1, background: "var(--bg)", borderRadius: 36, overflow: "hidden", display: "flex", flexDirection: "column", position: "relative" }}>
          <div style={{ padding: "12px 24px 4px", display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 12, fontWeight: 600 }}>
            <span>{status}</span>
            <div style={{ position: "absolute", left: "50%", top: 6, transform: "translateX(-50%)", width: 84, height: 22, borderRadius: 999, background: "#0c0a09" }}/>
            <div style={{ display: "flex", gap: 4 }}><span>􀛨</span><span>􀙇</span></div>
          </div>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", minHeight: 0 }}>{children}</div>
          <div style={{ position: "absolute", bottom: 6, left: "50%", transform: "translateX(-50%)", width: 110, height: 4, borderRadius: 999, background: "#0c0a09", opacity: .35 }}/>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Mobile · 01 Landing
// ─────────────────────────────────────────────────────────────
function MobileLanding() {
  return (
    <MobileBare>
      <div style={{ padding: "12px 20px 6px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div className="br-wordmark" style={{ fontSize: 15 }}><span className="br-mark" style={{ width: 18, height: 18 }}></span>Bridge</div>
        <span className="br-mono" style={{ fontSize: 10, color: "var(--ink-5)" }}>POWERED BY DN</span>
      </div>

      <div className="br-scroll" style={{ flex: 1, overflowY: "auto", padding: "12px 20px 8px" }}>
        <Pill tone="accent" size="sm" icon="sparkle">A guided session, not a form</Pill>
        <h1 style={{ fontSize: 26, fontWeight: 600, letterSpacing: "-0.025em", lineHeight: 1.1, marginTop: 14, marginBottom: 10 }}>
          Welcome, Sarah.<br/>
          <span style={{ color: "var(--ink-4)" }}>Let's understand Lakeside.</span>
        </h1>
        <p style={{ fontSize: 13.5, color: "var(--ink-3)", margin: 0, marginBottom: 14, lineHeight: 1.55 }}>
          Six quick sections. We'll build a system that fits your practice precisely.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 16 }}>
          {[
            ["target", "Built around your services"],
            ["save",   "Save anywhere, resume anywhere"],
            ["lock",   "Magic-link secure · no password"],
          ].map(([i, t]) => (
            <div key={t} style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <div style={{ width: 26, height: 26, borderRadius: 6, background: "var(--surface)", border: "1px solid var(--line)", display: "grid", placeItems: "center", color: "var(--ink-3)", flexShrink: 0 }}>
                <Icon name={i} size={13}/>
              </div>
              <span style={{ fontSize: 13.5, color: "var(--ink-2)", fontWeight: 500 }}>{t}</span>
            </div>
          ))}
        </div>

        <Card padding={16} style={{ boxShadow: "var(--shadow-2)" }}>
          <Pill tone="ok" size="sm" icon="check">Invitation verified</Pill>
          <div style={{ fontSize: 16, fontWeight: 600, marginTop: 8, marginBottom: 4 }}>Sign in to continue</div>
          <p style={{ fontSize: 12.5, color: "var(--ink-4)", margin: "0 0 12px 0", lineHeight: 1.5 }}>
            We'll send a secure link to your inbox.
          </p>
          <Field label="Work email">
            <Input value="sarah.chen@lakesidedental.com" prefix={<Icon name="mail" size={14}/>}/>
          </Field>
        </Card>

        <div style={{ display: "flex", gap: 14, padding: "14px 4px 0", fontSize: 12, color: "var(--ink-4)" }}>
          <div>
            <div className="br-eyebrow" style={{ fontSize: 9 }}>Time</div>
            <div style={{ fontSize: 16, fontWeight: 600, marginTop: 2 }}>10–12 min</div>
          </div>
          <div style={{ width: 1, background: "var(--line)" }}/>
          <div>
            <div className="br-eyebrow" style={{ fontSize: 9 }}>Sections</div>
            <div style={{ fontSize: 16, fontWeight: 600, marginTop: 2 }}>6</div>
          </div>
          <div style={{ width: 1, background: "var(--line)" }}/>
          <div>
            <div className="br-eyebrow" style={{ fontSize: 9 }}>Autosave</div>
            <div style={{ fontSize: 13, fontWeight: 500, marginTop: 4, display: "flex", alignItems: "center", gap: 4 }}>
              <Icon name="check" size={12} color="var(--ok)" strokeWidth={2.4}/> Always
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: "12px 16px 18px", borderTop: "1px solid var(--line)", background: "var(--surface)" }}>
        <Button variant="accent" full size="lg" iconRight="arrow_right">Send magic link</Button>
        <div style={{ marginTop: 8, fontSize: 11, color: "var(--ink-5)", textAlign: "center", display: "flex", alignItems: "center", gap: 5, justifyContent: "center" }}>
          <Icon name="lock" size={11}/> 256-bit TLS · 7-day session
        </div>
      </div>
    </MobileBare>
  );
}

// ─────────────────────────────────────────────────────────────
// Mobile · 02 Magic Link
// ─────────────────────────────────────────────────────────────
function MobileMagicLink() {
  return (
    <MobileBare>
      <div style={{ padding: "12px 20px 0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div className="br-wordmark" style={{ fontSize: 15 }}><span className="br-mark" style={{ width: 18, height: 18 }}></span>Bridge</div>
        <span className="br-mono" style={{ fontSize: 10, color: "var(--ink-5)" }}>LSD-7F2A-9E</span>
      </div>

      <div style={{ flex: 1, display: "grid", placeItems: "center", padding: "16px 20px" }}>
        <div style={{ textAlign: "center", width: "100%" }}>
          <div style={{ position: "relative", width: 96, height: 96, margin: "0 auto 18px" }}>
            <div style={{ position: "absolute", inset: 0, borderRadius: 999, background: "radial-gradient(circle, rgba(79,70,229,.14) 0%, transparent 60%)", animation: "br-pulse-soft 2.4s ease-in-out infinite" }}/>
            <div style={{ width: 60, height: 60, borderRadius: 16, background: "linear-gradient(135deg, #fff 0%, #f5f5f4 100%)", border: "1px solid var(--line)", display: "grid", placeItems: "center", boxShadow: "var(--shadow-2)", position: "absolute", top: 18, left: 18 }}>
              <Icon name="mail" size={26} color="var(--accent)" strokeWidth={1.4}/>
              <div style={{ position: "absolute", top: -5, right: -5, width: 20, height: 20, borderRadius: 999, background: "var(--ok)", display: "grid", placeItems: "center", color: "#fff", boxShadow: "0 2px 6px rgba(4,120,87,.4)" }}>
                <Icon name="check" size={11} strokeWidth={3}/>
              </div>
            </div>
          </div>

          <h1 style={{ fontSize: 22, fontWeight: 600, letterSpacing: "-0.02em", marginBottom: 8, marginTop: 0 }}>Check your inbox</h1>
          <p style={{ fontSize: 13.5, color: "var(--ink-3)", margin: 0, lineHeight: 1.55 }}>
            A link is on its way to <strong style={{ color: "var(--ink)" }}>sarah.chen@<br/>lakesidedental.com</strong>.
          </p>

          <div style={{ marginTop: 20, padding: 14, background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 12, textAlign: "left" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
              <div style={{ width: 7, height: 7, borderRadius: 999, background: "var(--accent)", animation: "br-pulse-soft 1.5s ease-in-out infinite" }}/>
              <span style={{ fontSize: 12, fontWeight: 500 }}>Waiting for confirmation</span>
              <span className="br-mono br-num" style={{ fontSize: 10.5, color: "var(--ink-5)", marginLeft: "auto" }}>00:27</span>
            </div>
            <div style={{ fontSize: 11.5, color: "var(--ink-4)", lineHeight: 1.5 }}>
              Link expires in 15 min · Didn't get it? <span style={{ color: "var(--accent)", fontWeight: 500 }}>resend</span>.
            </div>
          </div>

          <div style={{ marginTop: 16, fontSize: 11.5, color: "var(--ink-5)" }}>
            Wrong email? <span style={{ color: "var(--ink-3)", fontWeight: 500, textDecoration: "underline" }}>Use a different one</span>
          </div>
        </div>
      </div>

      <div style={{ padding: "10px 16px 18px", borderTop: "1px solid var(--line)", fontSize: 10.5, color: "var(--ink-5)", textAlign: "center" }}>
        SOC 2 Type II · GDPR-aligned
      </div>
    </MobileBare>
  );
}

// ─────────────────────────────────────────────────────────────
// Mobile · 02b Resume
// ─────────────────────────────────────────────────────────────
function MobileResume() {
  return (
    <MobileBare>
      <div style={{ padding: "12px 20px 0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div className="br-wordmark" style={{ fontSize: 15 }}><span className="br-mark" style={{ width: 18, height: 18 }}></span>Bridge</div>
        <span className="br-mono" style={{ fontSize: 10, color: "var(--ink-5)" }}>RESUMED</span>
      </div>

      <div className="br-scroll" style={{ flex: 1, overflowY: "auto", padding: "16px 20px 12px" }}>
        <Pill tone="accent" size="sm" icon="sparkle">Welcome back, Sarah</Pill>
        <h1 style={{ fontSize: 24, fontWeight: 600, letterSpacing: "-0.025em", lineHeight: 1.15, marginTop: 12, marginBottom: 8 }}>
          We left off mid-Strategy.<br/>
          <span style={{ color: "var(--ink-4)" }}>~6 min remaining.</span>
        </h1>
        <p style={{ fontSize: 13, color: "var(--ink-3)", margin: 0, marginBottom: 16, lineHeight: 1.55 }}>
          Everything saved · 2 of 6 sections complete.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 4, marginBottom: 14 }}>
          {[
            { letter: "A", title: "Snapshot",  state: "done",   sub: "Multi-loc · dental",          time: "Mon" },
            { letter: "B", title: "Services",  state: "done",   sub: "4 selected",                  time: "Mon" },
            { letter: "C", title: "Strategy",  state: "active", sub: "Competitor list pending",     time: "Now" },
            { letter: "D", title: "Assets",    state: "todo" },
            { letter: "E", title: "Goals",     state: "todo" },
            { letter: "F", title: "Review",    state: "todo" },
          ].map((s) => (
            <div key={s.letter} style={{
              display: "grid", gridTemplateColumns: "auto 1fr auto", gap: 10, alignItems: "center",
              padding: "10px 12px", borderRadius: 10,
              background: s.state === "active" ? "var(--surface)" : "transparent",
              border: s.state === "active" ? "1.5px solid var(--accent)" : "1px solid transparent",
              boxShadow: s.state === "active" ? "0 0 0 3px rgba(79,70,229,.08)" : "none",
            }}>
              <div style={{
                width: 20, height: 20, borderRadius: 999,
                background: s.state === "done" ? "var(--ink)" : s.state === "active" ? "var(--accent-soft)" : "var(--surface-2)",
                border: s.state === "done" ? "1px solid var(--ink)" : s.state === "active" ? "1.5px solid var(--accent)" : "1.5px solid var(--line-strong)",
                display: "grid", placeItems: "center", color: "#fff", flexShrink: 0,
              }}>
                {s.state === "done" && <Icon name="check" size={10} strokeWidth={3}/>}
                {s.state === "active" && <div style={{ width: 5, height: 5, borderRadius: 999, background: "var(--accent)" }}/>}
                {s.state === "todo" && <span className="br-mono" style={{ fontSize: 9.5, color: "var(--ink-5)" }}>{s.letter}</span>}
              </div>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: s.state === "active" ? 600 : 500, color: s.state === "todo" ? "var(--ink-4)" : "var(--ink)" }}>{s.title}</div>
                {s.sub && <div style={{ fontSize: 11, color: "var(--ink-4)" }}>{s.sub}</div>}
              </div>
              {s.time && <span className="br-mono" style={{ fontSize: 10, color: "var(--ink-5)" }}>{s.time}</span>}
            </div>
          ))}
        </div>

        <div style={{ padding: 12, background: "var(--surface-2)", borderRadius: 10, borderLeft: "3px solid var(--accent)" }}>
          <div className="br-eyebrow" style={{ fontSize: 9.5, marginBottom: 3 }}>You stopped at</div>
          <div style={{ fontSize: 13, fontWeight: 600 }}>Section C · Competitor list</div>
          <div style={{ fontSize: 11.5, color: "var(--ink-4)", marginTop: 2 }}>2 of 3 URLs entered.</div>
        </div>

        <div style={{ marginTop: 12, padding: 10, background: "var(--surface-2)", border: "1px dashed var(--line-strong)", borderRadius: 8, fontSize: 11, color: "var(--ink-4)", display: "flex", alignItems: "center", gap: 8 }}>
          <Icon name="info" size={12}/>
          Last device: Mac · Mon. Now on iPhone — no action needed.
        </div>
      </div>

      <div style={{ padding: "12px 16px 18px", borderTop: "1px solid var(--line)", background: "var(--surface)" }}>
        <Button variant="accent" full size="lg" iconRight="arrow_right">Continue Section C</Button>
      </div>
    </MobileBare>
  );
}

// ─────────────────────────────────────────────────────────────
// Mobile · 03 Snapshot
// ─────────────────────────────────────────────────────────────
function MobileSnapshot() {
  return (
    <MobileFrame
      step={1}
      total={6}
      title={{ tag: "A · Foundations", main: "The basics, first.", sub: "Six quick fields so we know who we're building for." }}
      foot={
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span className="br-mono" style={{ fontSize: 11, color: "var(--ink-5)", flex: 1 }}>Autosaved · 2s</span>
          <Button variant="accent" size="md" iconRight="arrow_right">Continue</Button>
        </div>
      }
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <Field label="What kind of business?">
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {[["Single loc.", "building", false], ["Multi-loc.", "layers", true], ["Franchise", "globe", false], ["Mobile", "map", false]].map(([l, i, a]) => (
              <Chip key={l} icon={i} active={a} size="sm">{l}</Chip>
            ))}
          </div>
        </Field>

        <Field label="Industry">
          <Input value="Dental & orthodontics" prefix={<Icon name="search" size={14}/>}/>
          <div style={{ display: "flex", gap: 6, marginTop: 6 }}>
            <Pill tone="accent" size="sm">Healthcare · Local</Pill>
          </div>
        </Field>

        <Field label="HQ">
          <Input value="Burlington, Vermont" prefix={<Icon name="map" size={14}/>}/>
          <div className="br-cap" style={{ marginTop: 4 }}>Locations: Burlington, S. Burlington, Williston</div>
        </Field>

        <Field label="Company size">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 4 }}>
            {["1–5", "6–15", "16–50", "51–150", "150+"].map((r, idx) => (
              <button key={r} className="br-focus" style={{
                padding: "8px 4px", borderRadius: 8, cursor: "pointer", fontFamily: "var(--font-sans)",
                background: idx === 2 ? "var(--ink)" : "var(--surface)",
                color: idx === 2 ? "#fff" : "var(--ink-2)",
                border: idx === 2 ? "1px solid var(--ink)" : "1px solid var(--line-strong)",
                fontSize: 11, fontWeight: 500,
              }}>
                <div className="br-mono br-num" style={{ fontSize: 12, fontWeight: 600 }}>{r}</div>
              </button>
            ))}
          </div>
        </Field>

        <Field label="Revenue stage">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {[
              ["Pre-rev", "$0", false],
              ["Early", "<$500K", false],
              ["Established", "$500K–$5M", true],
              ["Scaling", "$5M+", false],
            ].map(([l, s, a]) => (
              <SelectCard key={l} active={a} title={l} subtitle={s}/>
            ))}
          </div>
        </Field>

        <Field label="Main marketing goal?" ai>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              ["users",     "Acquire new patients", true],
              ["target",    "Retain patients", false],
              ["megaphone", "Launch new location", false],
            ].map(([i, t, a]) => (
              <SelectCard key={t} active={a} icon={i} title={t}/>
            ))}
          </div>
        </Field>
      </div>
    </MobileFrame>
  );
}

// ─────────────────────────────────────────────────────────────
// Mobile · 05 Strategy
// ─────────────────────────────────────────────────────────────
function MobileStrategy() {
  return (
    <MobileFrame
      step={3}
      total={6}
      title={{ tag: "C · Intelligence", main: "How you see your business.", sub: "Talk to us. We'll structure it." }}
      foot={
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span className="br-mono" style={{ fontSize: 11, color: "var(--ink-5)", flex: 1 }}>11 fields · 2 AI-suggested</span>
          <Button variant="accent" size="md" iconRight="arrow_right">Continue</Button>
        </div>
      }
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <Card padding={14} style={{ borderColor: "#ddd6fe", background: "linear-gradient(180deg, #faf8ff 0%, #fff 100%)" }}>
          <Field label="Describe Lakeside in your words" ai>
            <Textarea
              rows={4}
              value="Family dental practice with 3 offices in Chittenden County. Preventive care, gentle treatment for kids. Just opened Williston — need to fill the schedule there."
              shimmer
            />
          </Field>
          <div style={{ marginTop: 10, fontSize: 11, color: "var(--ai)", display: "flex", alignItems: "center", gap: 5 }}>
            <Icon name="sparkle" size={11}/> Bridge extracted 11 fields.
          </div>
        </Card>

        <Card padding={14}>
          <div className="br-eyebrow" style={{ fontSize: 9.5, marginBottom: 4 }}>Ideal patient (ICP)</div>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 10 }}>Who you serve best</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              ["Demographics", ["Families w/ kids 3–14", "Couples 28–45"]],
              ["Geography",    ["Chittenden Co., VT", "<20 min commute"]],
              ["Mindset",      ["Values gentle care", "Trusts referrals"]],
            ].map(([k, pills]) => (
              <div key={k}>
                <div className="br-mono" style={{ fontSize: 9.5, color: "var(--ink-5)", textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 4 }}>{k}</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                  {pills.map((p) => <Pill key={p} size="sm" tone="neutral">{p}</Pill>)}
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card padding={14}>
          <div className="br-eyebrow" style={{ fontSize: 9.5, marginBottom: 4 }}>Competitors</div>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 10 }}>Who you're up against</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {[
              ["Smile Burlington",      "Direct · 2 mi"],
              ["Green Mountain Ortho",  "Adjacent · 0.8 mi"],
            ].map(([n, ctx]) => (
              <div key={n} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 10px", background: "var(--surface-2)", border: "1px solid var(--line)", borderRadius: 8 }}>
                <div style={{ width: 20, height: 20, borderRadius: 5, background: "#fff", border: "1px solid var(--line)", display: "grid", placeItems: "center", fontSize: 10, fontWeight: 600, color: "var(--ink-3)" }}>
                  {n[0]}
                </div>
                <span style={{ flex: 1, fontSize: 12, fontWeight: 500 }}>{n}</span>
                <span className="br-mono" style={{ fontSize: 9.5, color: "var(--ink-5)" }}>{ctx}</span>
              </div>
            ))}
            <button style={{ padding: "8px", borderRadius: 8, background: "transparent", border: "1px dashed var(--line-strong)", color: "var(--ink-4)", cursor: "pointer", fontSize: 12, fontFamily: "var(--font-sans)", display: "flex", alignItems: "center", gap: 5, justifyContent: "center" }}>
              <Icon name="plus" size={12}/> Add competitor URL
            </button>
          </div>
        </Card>
      </div>
    </MobileFrame>
  );
}

// ─────────────────────────────────────────────────────────────
// Mobile · 06 Assets
// ─────────────────────────────────────────────────────────────
function MobileAssets() {
  return (
    <MobileFrame
      step={4}
      total={6}
      title={{ tag: "D · Materials", main: "Drop in what you have.", sub: "We auto-tag and flag what's missing." }}
      foot={
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span className="br-mono" style={{ fontSize: 11, color: "var(--ink-5)", flex: 1 }}>6/9 · 3 needed</span>
          <Button variant="accent" size="md" iconRight="arrow_right">Continue</Button>
        </div>
      }
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {/* Drop zone */}
        <div style={{
          border: "1.5px dashed var(--accent)", borderRadius: 12,
          background: "linear-gradient(180deg, #faf8ff 0%, #fff 100%)",
          padding: "20px 14px", textAlign: "center",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
        }}>
          <div style={{ width: 40, height: 40, borderRadius: 10, background: "var(--surface)", border: "1px solid var(--accent-soft-2)", display: "grid", placeItems: "center", color: "var(--accent)", boxShadow: "var(--shadow-1)" }}>
            <Icon name="upload" size={18}/>
          </div>
          <div style={{ fontSize: 13, fontWeight: 600, marginTop: 2 }}>Tap to upload</div>
          <div className="br-cap">SVG, PNG, JPG, PDF · or photo library</div>
          <div style={{ display: "flex", gap: 6, marginTop: 4 }}>
            <Button variant="outline" size="sm" icon="image">Photos</Button>
            <Button variant="ghost" size="sm" icon="globe">Drive</Button>
          </div>
        </div>

        <div className="br-eyebrow" style={{ fontSize: 9.5, marginTop: 2 }}>Uploaded · 7 files</div>

        {[
          ["lakeside-logo.svg",        "image", "SVG · 12 KB",  ["Brand"],         "ok"],
          ["brand-guide-2024.pdf",     "file",  "PDF · 6.2 MB", ["Brand"],         "ok"],
          ["dr-chen-headshot.jpg",     "image", "JPG · 1.1 MB", ["People"],        "ok"],
          ["office-burlington-01.jpg", "image", "JPG · 3.4 MB", ["Locations"],     "warn"],
          ["sept-promo-1x1.png",       "image", "PNG · 480 KB", ["Ads"],           "ok"],
        ].map(([name, icon, size, tags, status]) => (
          <div key={name} style={{
            display: "flex", alignItems: "center", gap: 10, padding: "10px 12px",
            border: "1px solid var(--line)", borderRadius: 10, background: "var(--surface)",
          }}>
            <div style={{ width: 28, height: 28, borderRadius: 6, background: "var(--surface-2)", border: "1px solid var(--line)", display: "grid", placeItems: "center", color: "var(--ink-3)", flexShrink: 0 }}>
              <Icon name={icon} size={13}/>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 12, fontWeight: 500, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{name}</div>
              <div style={{ display: "flex", gap: 4, marginTop: 2, alignItems: "center" }}>
                {tags.map((t) => <Pill key={t} size="sm" tone="neutral">{t}</Pill>)}
                <span className="br-mono" style={{ fontSize: 9.5, color: "var(--ink-5)" }}>{size}</span>
              </div>
            </div>
            {status === "ok" && <Icon name="check" size={13} color="var(--ok)" strokeWidth={2.4}/>}
            {status === "warn" && <Icon name="alert" size={13} color="var(--warn)"/>}
          </div>
        ))}

        <Card padding={14} style={{ marginTop: 4 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
            <div className="br-eyebrow" style={{ fontSize: 9.5 }}>Still needed</div>
            <Pill tone="warn" size="sm">3 missing</Pill>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {[
              ["Logo · dark variant",   false],
              ["Williston exterior pic", false],
              ["Brand fonts (.otf)",     false],
            ].map(([label]) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: 8, padding: "4px 0" }}>
                <div style={{ width: 14, height: 14, borderRadius: 4, background: "var(--surface)", border: "1.5px solid var(--line-strong)", flexShrink: 0 }}/>
                <span style={{ fontSize: 12.5, color: "var(--ink)" }}>{label}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </MobileFrame>
  );
}

// ─────────────────────────────────────────────────────────────
// Mobile · 07 Goals
// ─────────────────────────────────────────────────────────────
function MobileGoals() {
  return (
    <MobileFrame
      step={5}
      total={6}
      title={{ tag: "E · Targets", main: "What does success look like?", sub: "Set numbers we'll report against." }}
      foot={
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span className="br-mono" style={{ fontSize: 11, color: "var(--ink-5)", flex: 1 }}>4 goals · 4 targets</span>
          <Button variant="accent" size="md" iconRight="arrow_right">Continue</Button>
        </div>
      }
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <div className="br-eyebrow" style={{ fontSize: 9.5 }}>Goals you care about</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          {[
            ["users", "New patients", true],
            ["target", "Revenue", true],
            ["bolt", "ROAS", true],
            ["building", "Williston fill", true],
            ["star", "Reviews", false],
            ["search", "Local rank", false],
          ].map(([i, t, on]) => (
            <SelectCard key={t} icon={i} title={t} active={on}/>
          ))}
        </div>

        <Card padding={14} style={{ marginTop: 4 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
            <div>
              <div className="br-eyebrow" style={{ fontSize: 9.5 }}>12-month targets</div>
              <div style={{ fontSize: 14, fontWeight: 600, marginTop: 2 }}>Numbers to hit</div>
            </div>
            <Pill tone="ai" size="sm" icon="sparkle">AI</Pill>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <MobSliderRow label="New patients / mo" value={140} min={60} max={250} format={(v) => `+${v}`} note="now ~85"/>
            <MobSliderRow label="Annual revenue"    value={3.6} min={2.4} max={6} step={0.1} format={(v) => `$${v.toFixed(1)}M`} note="now $2.4M"/>
            <MobSliderRow label="Blended ROAS"      value={4.2} min={1} max={8} step={0.1} format={(v) => `${v.toFixed(1)}×`} note="bench 3.5–5×"/>
            <MobSliderRow label="Williston fill"    value={82} min={40} max={100} format={(v) => `${v}%`} note="now 38%"/>
          </div>
        </Card>

        <Card padding={14}>
          <div className="br-eyebrow" style={{ fontSize: 9.5, marginBottom: 4 }}>Priority order</div>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>Drag to rank</div>
          <div className="br-cap" style={{ marginBottom: 10 }}>#1 is what we win at first.</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {[
              ["Williston fill", "→ 82%"],
              ["New patients",   "+140/mo"],
              ["ROAS",           "4.2×"],
              ["Revenue",        "$3.6M"],
            ].map(([t, s], i) => (
              <div key={t} style={{
                display: "flex", alignItems: "center", gap: 8, padding: "8px 10px",
                border: "1px solid var(--line)", borderRadius: 8, background: "var(--surface)",
              }}>
                <Icon name="drag" size={14} color="var(--ink-5)"/>
                <div style={{
                  width: 22, height: 22, borderRadius: 6, flexShrink: 0,
                  background: i === 0 ? "var(--ink)" : "var(--surface-2)",
                  color: i === 0 ? "#fff" : "var(--ink-3)",
                  display: "grid", placeItems: "center", fontWeight: 600, fontSize: 11,
                }}>{i + 1}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12.5, fontWeight: 500 }}>{t}</div>
                  <div style={{ fontSize: 10.5, color: "var(--ink-4)" }}>{s}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </MobileFrame>
  );
}

function MobSliderRow({ label, value, min, max, step, format, note }) {
  return (
    <div>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 4 }}>
        <span style={{ fontSize: 12.5, fontWeight: 500 }}>{label}</span>
        <span className="br-mono" style={{ fontSize: 10, color: "var(--ink-5)" }}>{note}</span>
      </div>
      <Slider value={value} min={min} max={max} step={step} format={format}/>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Mobile · 09 Complete
// ─────────────────────────────────────────────────────────────
function MobileComplete() {
  return (
    <MobileBare>
      <div style={{ padding: "12px 20px 0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div className="br-wordmark" style={{ fontSize: 15 }}><span className="br-mark" style={{ width: 18, height: 18 }}></span>Bridge</div>
        <span className="br-mono" style={{ fontSize: 10, color: "var(--ink-5)" }}>SUBMITTED · 2:14 PM</span>
      </div>

      <div className="br-scroll" style={{ flex: 1, overflowY: "auto", padding: "20px 20px 12px" }}>
        <div style={{
          width: 48, height: 48, borderRadius: 12,
          background: "linear-gradient(135deg, var(--ok) 0%, #059669 100%)",
          display: "grid", placeItems: "center", color: "#fff",
          boxShadow: "0 8px 20px -4px rgba(4,120,87,.4)", marginBottom: 16,
        }}>
          <Icon name="check" size={24} strokeWidth={2.6}/>
        </div>
        <h1 style={{ fontSize: 24, fontWeight: 600, letterSpacing: "-0.025em", lineHeight: 1.15, marginTop: 0, marginBottom: 8 }}>
          You're handed off,<br/>Sarah.
        </h1>
        <p style={{ fontSize: 13.5, color: "var(--ink-3)", margin: 0, marginBottom: 16, lineHeight: 1.55 }}>
          Bridge routed everything you shared to the five systems that run your account.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 16 }}>
          {[
            ["Time", "11m 42s"],
            ["Fields", "127"],
            ["Files", "7"],
            ["Quality", "94/100"],
          ].map(([k, v]) => (
            <div key={k} style={{ padding: 10, background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 8 }}>
              <div className="br-eyebrow" style={{ fontSize: 9 }}>{k}</div>
              <div className="br-num" style={{ fontSize: 16, fontWeight: 600, marginTop: 2 }}>{v}</div>
            </div>
          ))}
        </div>

        <div className="br-eyebrow" style={{ fontSize: 9.5, marginBottom: 8 }}>Where your data went</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {[
            { name: "Dock",    desc: "Client record created", status: "done",   time: "instant",   icon: "folder" },
            { name: "Compass", desc: "Drafting proposal",     status: "doing",  time: "ETA 3m 21s", icon: "file" },
            { name: "Deck",    desc: "Provisioning portal",   status: "queued", time: "queued",    icon: "layers" },
            { name: "Radar",   desc: "Baseline import",       status: "queued", time: "queued",    icon: "target" },
            { name: "Beacon",  desc: "Workflows staged",      status: "queued", time: "queued",    icon: "bolt" },
          ].map((app) => (
            <div key={app.name} style={{
              display: "flex", alignItems: "center", gap: 10, padding: "10px 12px",
              background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 10,
            }}>
              <div style={{
                width: 28, height: 28, borderRadius: 7, flexShrink: 0,
                background: app.status === "done" ? "var(--ok-soft)" : app.status === "doing" ? "var(--accent-soft)" : "var(--surface-2)",
                color: app.status === "done" ? "var(--ok)" : app.status === "doing" ? "var(--accent)" : "var(--ink-4)",
                border: `1px solid ${app.status === "done" ? "#a7f3d0" : app.status === "doing" ? "var(--accent-soft-2)" : "var(--line)"}`,
                display: "grid", placeItems: "center",
              }}>
                <Icon name={app.icon} size={13}/>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{app.name}</div>
                <div style={{ fontSize: 11, color: "var(--ink-4)" }}>{app.desc}</div>
              </div>
              {app.status === "done" && <Pill tone="ok" size="sm" icon="check">Synced</Pill>}
              {app.status === "doing" && <Pill tone="accent" size="sm">Running</Pill>}
              {app.status === "queued" && <span className="br-mono" style={{ fontSize: 9.5, color: "var(--ink-5)" }}>{app.time}</span>}
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: "12px 16px 18px", borderTop: "1px solid var(--line)", background: "var(--surface)", display: "flex", flexDirection: "column", gap: 6 }}>
        <Button variant="primary" size="md" full iconRight="arrow_right">Open client portal</Button>
        <div style={{ fontSize: 10.5, color: "var(--ink-5)", textAlign: "center" }}>
          Proposal arrives by email in ~4 min
        </div>
      </div>
    </MobileBare>
  );
}

Object.assign(window, {
  MobileBare, MobileLanding, MobileMagicLink, MobileResume,
  MobileSnapshot, MobileStrategy, MobileAssets, MobileGoals, MobileComplete,
  MobSliderRow,
});
