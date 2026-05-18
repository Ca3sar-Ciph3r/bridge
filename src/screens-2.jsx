/* global React, Icon, Button, Field, Input, Textarea, Chip, Pill, Card, SelectCard, Toggle, Slider, ProgressRail, StepFooter, AICallout, ClientBar, SECTIONS, BranchPanel */
// Bridge — onboarding screens part 2: strategy, assets, goals, review, complete

// ─────────────────────────────────────────────────────────────
// 05 — Strategy & ICP (with AI extraction)
// ─────────────────────────────────────────────────────────────
function ScreenStrategy() {
  return (
    <div className="br-frame" style={{ flexDirection: "row" }}>
      <ProgressRail current={2} sections={SECTIONS}/>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <ClientBar section={3} total={6} sectionName="Strategy Inputs"/>
        <div className="br-scroll" style={{ flex: 1, overflowY: "auto", padding: "32px 56px 32px" }}>
          <div style={{ maxWidth: 1000 }}>
            <Pill tone="neutral" size="sm">C · Intelligence</Pill>
            <h1 className="br-h1" style={{ marginTop: 12, marginBottom: 8, fontSize: 32 }}>Tell us how you see your business.</h1>
            <p className="br-bodyLg" style={{ marginTop: 0, marginBottom: 24 }}>
              Talk to us like you'd talk to a strategist. We'll structure it for you.
            </p>

            {/* Describe your business — AI shimmer */}
            <Card padding={20} style={{ marginBottom: 16, borderColor: "#ddd6fe", background: "linear-gradient(180deg, #faf8ff 0%, #fff 100%)" }}>
              <Field label="Describe Lakeside Dental in your own words" ai hint="2–4 sentences is plenty">
                <Textarea
                  rows={4}
                  value="We're a family dental practice with three offices in Chittenden County. We focus on preventive care and gentle treatment for kids — most of our growth comes from word of mouth. We just opened a new Williston location and need to fill the schedule there without cannibalizing the other two."
                  shimmer
                />
              </Field>
              <div style={{ marginTop: 14, fontSize: 12, color: "var(--ai)", display: "flex", alignItems: "center", gap: 6 }}>
                <Icon name="sparkle" size={12}/> Bridge extracted 11 structured fields from this — review below.
              </div>
            </Card>

            <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 16, marginBottom: 24 }}>
              {/* ICP */}
              <Card padding={20}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                  <div>
                    <div className="br-eyebrow">Ideal patient (ICP)</div>
                    <div style={{ fontSize: 16, fontWeight: 600, marginTop: 4, letterSpacing: "-0.01em" }}>Who you serve best</div>
                  </div>
                  <Pill tone="ai" size="sm" icon="sparkle">Drafted by AI · edit freely</Pill>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <ICPRow label="Demographics" pills={["Families with kids 3–14", "Couples 28–45", "Avg. household income $75K+"]}/>
                  <ICPRow label="Geography" pills={["Chittenden County, VT", "<20 min commute"]}/>
                  <ICPRow label="Mindset" pills={["Values gentle care", "Anxious about dentists", "Trusts word of mouth"]}/>
                  <ICPRow label="Trigger events" pills={["New baby", "Moving to area", "Insurance change", "Last visit > 12 mo"]}/>
                </div>

                <button style={{
                  marginTop: 14, padding: "8px 12px", borderRadius: 8, background: "transparent",
                  border: "1px dashed var(--line-strong)", color: "var(--ink-3)", cursor: "pointer",
                  display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, fontFamily: "var(--font-sans)",
                }}>
                  <Icon name="plus" size={13}/> Add a second persona
                </button>
              </Card>

              {/* Competitors */}
              <Card padding={20}>
                <div className="br-eyebrow" style={{ marginBottom: 6 }}>Competitors</div>
                <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 12, letterSpacing: "-0.01em" }}>Who you're up against</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {[
                    ["smile-burlington.com", "Smile Burlington", "Direct · 2 mi", "ok"],
                    ["greenmtnortho.com",    "Green Mountain Ortho", "Adjacent · 0.8 mi", "neutral"],
                    ["champlaindds.com",     "Champlain DDS", "Direct · 4.3 mi", "neutral"],
                  ].map(([url, name, ctx, tone]) => (
                    <div key={url} style={{
                      display: "flex", alignItems: "center", gap: 10, padding: "10px 12px",
                      border: "1px solid var(--line)", borderRadius: 10, background: "var(--surface-2)",
                    }}>
                      <div style={{ width: 22, height: 22, borderRadius: 5, background: "#fff", border: "1px solid var(--line)", display: "grid", placeItems: "center", fontSize: 11, fontWeight: 600, color: "var(--ink-3)" }}>
                        {name[0]}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 13, fontWeight: 500 }}>{name}</div>
                        <div className="br-mono" style={{ fontSize: 11, color: "var(--ink-4)" }}>{url}</div>
                      </div>
                      <Pill tone={tone} size="sm">{ctx}</Pill>
                    </div>
                  ))}
                  <button style={{
                    padding: "10px 12px", borderRadius: 10, background: "transparent",
                    border: "1px dashed var(--line-strong)", color: "var(--ink-3)", cursor: "pointer",
                    display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, fontFamily: "var(--font-sans)",
                  }}>
                    <Icon name="plus" size={13}/> Add competitor URL
                  </button>
                </div>
              </Card>
            </div>

            {/* Challenges + Sales process */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <Card padding={20}>
                <div className="br-eyebrow" style={{ marginBottom: 6 }}>Growth constraints</div>
                <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 12, letterSpacing: "-0.01em" }}>What's actually in the way?</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {[
                    ["Williston schedule is 38% full", "warn", true],
                    ["No CRM — patient data lives in Dentrix only", "warn", true],
                    ["Reviews stuck at 4.4★ for 18 months", "warn", true],
                    ["Recall outreach is manual", "neutral", false],
                    ["Insurance verification is slow", "neutral", false],
                  ].map(([label, tone, on]) => (
                    <label key={label} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 10px", borderRadius: 8, background: on ? "var(--warn-soft)" : "var(--surface-2)", border: `1px solid ${on ? "#fcd34d" : "var(--line)"}` }}>
                      <div style={{
                        width: 16, height: 16, borderRadius: 4, flexShrink: 0,
                        background: on ? "var(--ink)" : "var(--surface)",
                        border: on ? "1px solid var(--ink)" : "1.5px solid var(--line-strong)",
                        display: "grid", placeItems: "center", color: "#fff",
                      }}>{on && <Icon name="check" size={10} strokeWidth={3}/>}</div>
                      <span style={{ fontSize: 13, color: "var(--ink-2)" }}>{label}</span>
                    </label>
                  ))}
                </div>
              </Card>

              <Card padding={20}>
                <div className="br-eyebrow" style={{ marginBottom: 6 }}>Sales / patient journey</div>
                <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 16, letterSpacing: "-0.01em" }}>How does a stranger become a patient today?</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                  {[
                    ["Awareness", "Word of mouth · Google search", "~62% / ~38%"],
                    ["Inquiry",   "Phone call (front desk)",       "84% of all"],
                    ["Booking",   "Manual scheduling, 1–2 day wait", "Bottleneck"],
                    ["First visit", "30-min consult + cleaning",   ""],
                    ["Retention", "6-mo recall (manual)",          "63% return"],
                  ].map(([stage, detail, kpi], i, arr) => (
                    <div key={stage} style={{ display: "flex", gap: 12, position: "relative" }}>
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 4 }}>
                        <div style={{ width: 10, height: 10, borderRadius: 999, background: "var(--ink)" }}/>
                        {i < arr.length - 1 && <div style={{ flex: 1, width: 1.5, background: "var(--line-strong)", minHeight: 24 }}/>}
                      </div>
                      <div style={{ flex: 1, paddingBottom: i < arr.length - 1 ? 14 : 0 }}>
                        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
                          <span style={{ fontSize: 13, fontWeight: 500 }}>{stage}</span>
                          {kpi && <span className="br-mono" style={{ fontSize: 11, color: kpi === "Bottleneck" ? "var(--warn)" : "var(--ink-5)" }}>{kpi}</span>}
                        </div>
                        <div style={{ fontSize: 12, color: "var(--ink-4)" }}>{detail}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
        <StepFooter note="11 fields filled · 2 AI-suggested" continueLabel="Continue to Assets"/>
      </div>
    </div>
  );
}

function ICPRow({ label, pills }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "120px 1fr", gap: 12, alignItems: "flex-start" }}>
      <div className="br-mono" style={{ fontSize: 11, color: "var(--ink-5)", paddingTop: 5, textTransform: "uppercase", letterSpacing: ".06em" }}>{label}</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {pills.map((p, i) => <Pill key={i} tone="neutral" size="sm">{p}</Pill>)}
        <button style={{
          padding: "3px 8px", fontSize: 11.5, fontFamily: "var(--font-sans)",
          background: "transparent", border: "1px dashed var(--line-strong)",
          borderRadius: 999, color: "var(--ink-4)", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 3,
        }}><Icon name="plus" size={10}/> Add</button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 06 — Asset Upload
// ─────────────────────────────────────────────────────────────
function ScreenAssets() {
  return (
    <div className="br-frame" style={{ flexDirection: "row" }}>
      <ProgressRail current={3} sections={SECTIONS}/>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <ClientBar section={4} total={6} sectionName="Assets"/>
        <div className="br-scroll" style={{ flex: 1, overflowY: "auto", padding: "32px 56px 32px" }}>
          <div style={{ maxWidth: 1080 }}>
            <Pill tone="neutral" size="sm">D · Materials</Pill>
            <h1 className="br-h1" style={{ marginTop: 12, marginBottom: 8, fontSize: 32 }}>Drop in what you have.</h1>
            <p className="br-bodyLg" style={{ marginTop: 0, marginBottom: 24 }}>
              We auto-tag, validate, and flag what's missing. Don't worry about being complete — you can add more later.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 16 }}>
              {/* Drop zone + uploaded list */}
              <div>
                <div style={{
                  border: "1.5px dashed var(--accent)", borderRadius: 14,
                  background: "linear-gradient(180deg, #faf8ff 0%, #fff 100%)",
                  padding: "32px 24px", textAlign: "center",
                  display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
                }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: 12, background: "var(--surface)",
                    border: "1px solid var(--accent-soft-2)", display: "grid", placeItems: "center",
                    color: "var(--accent)", boxShadow: "var(--shadow-1)",
                  }}>
                    <Icon name="upload" size={22}/>
                  </div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: "var(--ink)", marginTop: 4 }}>Drop files here or paste links</div>
                  <div className="br-cap" style={{ maxWidth: 320 }}>SVG, PNG, JPG, PDF, AI, Figma, Drive, Dropbox. We dedupe and convert.</div>
                  <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                    <Button variant="outline" size="sm" icon="folder">Choose files</Button>
                    <Button variant="ghost" size="sm" icon="globe">Connect Drive</Button>
                  </div>
                </div>

                <div style={{ marginTop: 16 }}>
                  <div className="br-eyebrow" style={{ marginBottom: 10 }}>Uploaded · 7 files</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    {[
                      ["lakeside-logo-primary.svg",  "image", "SVG · 12 KB", ["Brand", "Logo", "Primary"], "ok",   "1080×320"],
                      ["lakeside-logo-mark.svg",     "image", "SVG · 4 KB",  ["Brand", "Logo", "Mark"],    "ok",   "256×256"],
                      ["brand-guide-2024.pdf",       "file",  "PDF · 6.2 MB", ["Brand", "Guide"],          "ok",   "32 pp"],
                      ["dr-chen-headshot.jpg",       "image", "JPG · 1.1 MB", ["People", "Headshot"],      "ok",   "2400×3000"],
                      ["office-burlington-01.jpg",   "image", "JPG · 3.4 MB", ["Locations"],               "warn", "1200×800 · low-res"],
                      ["sept-promo-1x1.png",         "image", "PNG · 480 KB", ["Ads", "Meta", "1:1"],      "ok",   "1080×1080"],
                      ["patient-testimonials.docx",  "file",  "DOCX · 28 KB", ["Content", "Reviews"],      "ok",   "12 quotes"],
                    ].map(([name, icon, size, tags, status, meta]) => (
                      <div key={name} style={{
                        display: "flex", alignItems: "center", gap: 10, padding: "10px 12px",
                        border: "1px solid var(--line)", borderRadius: 10, background: "var(--surface)",
                      }}>
                        <div style={{
                          width: 32, height: 32, borderRadius: 6, flexShrink: 0,
                          background: "var(--surface-2)", border: "1px solid var(--line)",
                          display: "grid", placeItems: "center", color: "var(--ink-3)",
                        }}>
                          <Icon name={icon} size={15}/>
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 500 }}>
                            {name}
                            <span className="br-mono" style={{ fontSize: 10.5, color: "var(--ink-5)" }}>{size}</span>
                          </div>
                          <div style={{ display: "flex", gap: 4, marginTop: 4, alignItems: "center" }}>
                            {tags.map((t) => <Pill key={t} size="sm" tone="neutral">{t}</Pill>)}
                            <span className="br-mono" style={{ fontSize: 10.5, color: "var(--ink-5)", marginLeft: 4 }}>{meta}</span>
                          </div>
                        </div>
                        {status === "ok"   && <Pill tone="ok"   size="sm" icon="check">Validated</Pill>}
                        {status === "warn" && <Pill tone="warn" size="sm" icon="alert">Low-res</Pill>}
                        <Icon name="x" size={14} color="var(--ink-5)"/>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Missing checklist + access */}
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <Card padding={18}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                    <div className="br-eyebrow">Still needed</div>
                    <Pill tone="warn" size="sm">3 of 9 missing</Pill>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    {[
                      ["Primary logo",        "Brand",     true],
                      ["Brand guidelines",    "Brand",     true],
                      ["Color palette",       "Brand",     true],
                      ["Headshots",           "People",    true],
                      ["Location photography","Locations", "warn"],
                      ["Ad creative — Sept",  "Ads",       true],
                      ["Patient testimonials","Content",   true],
                      ["Logo — dark variant", "Brand",     false],
                      ["Brand fonts (.otf)",  "Brand",     false],
                    ].map(([item, cat, state]) => {
                      const got = state === true;
                      const warn = state === "warn";
                      return (
                        <div key={item} style={{ display: "flex", alignItems: "center", gap: 10, padding: "6px 0" }}>
                          <div style={{
                            width: 16, height: 16, borderRadius: 4, flexShrink: 0,
                            background: got ? "var(--ink)" : warn ? "var(--warn-soft)" : "var(--surface)",
                            border: got ? "1px solid var(--ink)" : warn ? "1px solid #fcd34d" : "1.5px solid var(--line-strong)",
                            display: "grid", placeItems: "center", color: got ? "#fff" : "var(--warn)",
                          }}>{got ? <Icon name="check" size={10} strokeWidth={3}/> : warn ? <Icon name="alert" size={9}/> : null}</div>
                          <span style={{ fontSize: 13, color: got ? "var(--ink-3)" : "var(--ink)", textDecoration: got ? "line-through" : "none", flex: 1 }}>{item}</span>
                          <span className="br-mono" style={{ fontSize: 10, color: "var(--ink-5)" }}>{cat}</span>
                        </div>
                      );
                    })}
                  </div>
                </Card>

                <Card padding={18}>
                  <div className="br-eyebrow" style={{ marginBottom: 10 }}>Account access</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    {[
                      ["Google Business Profile", "Connected",  "ok"],
                      ["Meta Business Manager",   "Connected",  "ok"],
                      ["Google Ads",              "Connected",  "ok"],
                      ["Google Analytics 4",      "Awaiting",   "warn"],
                      ["Instagram",               "Not started","neutral"],
                    ].map(([name, status, tone]) => (
                      <div key={name} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 10px", border: "1px solid var(--line)", borderRadius: 8 }}>
                        <span style={{ fontSize: 13, fontWeight: 500, flex: 1 }}>{name}</span>
                        <Pill tone={tone} size="sm" icon={tone === "ok" ? "check" : tone === "warn" ? "alert" : undefined}>{status}</Pill>
                      </div>
                    ))}
                  </div>
                </Card>

                <AICallout title="Asset audit">
                  Your <strong style={{ color: "var(--ink)" }}>brand kit</strong> is complete — we can ship a polished proposal. Add 2 fresh office photos (≥2000px) and we'll unlock Location landing pages.
                </AICallout>
              </div>
            </div>
          </div>
        </div>
        <StepFooter note="6/9 assets · 3 still needed" continueLabel="Continue to Goals"/>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 07 — Goals
// ─────────────────────────────────────────────────────────────
function ScreenGoals() {
  return (
    <div className="br-frame" style={{ flexDirection: "row" }}>
      <ProgressRail current={4} sections={SECTIONS}/>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <ClientBar section={5} total={6} sectionName="Goals"/>
        <div className="br-scroll" style={{ flex: 1, overflowY: "auto", padding: "32px 56px 32px" }}>
          <div style={{ maxWidth: 1040 }}>
            <Pill tone="neutral" size="sm">E · Targets</Pill>
            <h1 className="br-h1" style={{ marginTop: 12, marginBottom: 8, fontSize: 32 }}>What does success look like?</h1>
            <p className="br-bodyLg" style={{ marginTop: 0, marginBottom: 24 }}>
              Set numbers we'll actually report against. Rank them so we know where to spend first.
            </p>

            {/* Goal cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginBottom: 24 }}>
              {[
                ["users", "New patients", "Booked first visit", true],
                ["target", "Revenue", "Total practice revenue", true],
                ["bolt", "ROAS", "Return on ad spend", true],
                ["star", "Reviews", "Google ★ avg.", false],
                ["search", "Local rank", "Avg. pack position", false],
                ["megaphone", "Reach", "Monthly impressions", false],
                ["building", "Williston fill", "Schedule utilization", true],
                ["users", "Retention", "Recall return rate", false],
              ].map(([i, t, s, on]) => (
                <SelectCard key={t} icon={i} title={t} subtitle={s} active={on}/>
              ))}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 16 }}>
              {/* Numeric targets */}
              <Card padding={20}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
                  <div>
                    <div className="br-eyebrow">12-month targets</div>
                    <div style={{ fontSize: 16, fontWeight: 600, marginTop: 4, letterSpacing: "-0.01em" }}>Numbers we'll report against</div>
                  </div>
                  <Pill tone="ai" size="sm" icon="sparkle">AI baseline · adjust</Pill>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
                  <SliderRow label="New patients / month" value={140} min={60} max={250} format={(v) => `+${v}`} note="Currently ~85 · industry top quartile is 160+"/>
                  <SliderRow label="Annual revenue" value={3.6} min={2.4} max={6} step={0.1} format={(v) => `$${v.toFixed(1)}M`} note="Currently $2.4M across 3 locations"/>
                  <SliderRow label="Blended ROAS" value={4.2} min={1} max={8} step={0.1} format={(v) => `${v.toFixed(1)}×`} note="Healthcare benchmark: 3.5–5×"/>
                  <SliderRow label="Williston schedule fill" value={82} min={40} max={100} format={(v) => `${v}%`} note="Currently 38% · break-even at 65%"/>
                </div>
              </Card>

              {/* Priority ranking */}
              <Card padding={20}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
                  <div>
                    <div className="br-eyebrow">Priority order</div>
                    <div style={{ fontSize: 16, fontWeight: 600, marginTop: 4, letterSpacing: "-0.01em" }}>Drag to rank</div>
                  </div>
                </div>
                <div className="br-cap" style={{ marginBottom: 14 }}>If we had to pick one to win at, it would be #1.</div>

                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {[
                    ["Williston fill", "Schedule utilization → 82%"],
                    ["New patients",   "+140/mo across all locations"],
                    ["ROAS",           "Maintain 4.2× blended"],
                    ["Revenue",        "$3.6M annual run-rate"],
                  ].map(([t, s], i) => (
                    <div key={t} style={{
                      display: "flex", alignItems: "center", gap: 10, padding: "10px 12px",
                      border: "1px solid var(--line)", borderRadius: 10, background: "var(--surface)",
                      boxShadow: "var(--shadow-1)",
                    }}>
                      <Icon name="drag" size={16} color="var(--ink-5)"/>
                      <div style={{
                        width: 26, height: 26, borderRadius: 7, flexShrink: 0,
                        background: i === 0 ? "var(--ink)" : "var(--surface-2)",
                        color: i === 0 ? "#fff" : "var(--ink-3)",
                        display: "grid", placeItems: "center", fontWeight: 600, fontSize: 13,
                        fontVariantNumeric: "tabular-nums",
                      }}>{i + 1}</div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 13, fontWeight: 500 }}>{t}</div>
                        <div style={{ fontSize: 11.5, color: "var(--ink-4)" }}>{s}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
        <StepFooter note="4 goals · 4 numeric targets" continueLabel="Continue to Review"/>
      </div>
    </div>
  );
}

function SliderRow({ label, value, min, max, step, format, note }) {
  return (
    <div>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 6 }}>
        <span style={{ fontSize: 13.5, fontWeight: 500 }}>{label}</span>
        <span className="br-mono" style={{ fontSize: 11, color: "var(--ink-5)" }}>{note}</span>
      </div>
      <Slider value={value} min={min} max={max} step={step} format={format}/>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 08 — Review & Validate
// ─────────────────────────────────────────────────────────────
function ScreenReview() {
  return (
    <div className="br-frame" style={{ flexDirection: "row" }}>
      <ProgressRail current={5} sections={SECTIONS}/>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <ClientBar section={6} total={6} sectionName="Review"/>
        <div className="br-scroll" style={{ flex: 1, overflowY: "auto", padding: "32px 56px 32px" }}>
          <div style={{ maxWidth: 1080 }}>
            <Pill tone="neutral" size="sm">F · Confirmation</Pill>
            <h1 className="br-h1" style={{ marginTop: 12, marginBottom: 8, fontSize: 32 }}>Here's how we understand Lakeside.</h1>
            <p className="br-bodyLg" style={{ marginTop: 0, marginBottom: 20 }}>
              Read it like we'd say it back to you. Edit anything that's off — then send it through.
            </p>

            <AICallout title="Bridge summary · generated 12s ago">
              <p style={{ margin: "0 0 8px 0", color: "var(--ink)", fontSize: 14, lineHeight: 1.6 }}>
                Lakeside Family Dental is a <strong style={{ color: "var(--ink)" }}>multi-location family practice</strong> in Chittenden County, VT. The primary pressure is filling the new <strong style={{ color: "var(--ink)" }}>Williston location</strong> (currently 38% utilization) without cannibalizing Burlington or S. Burlington.
              </p>
              <p style={{ margin: "0 0 8px 0", color: "var(--ink)", fontSize: 14, lineHeight: 1.6 }}>
                We're scoping <strong style={{ color: "var(--ink)" }}>Website, Paid ads, SEO and Automation</strong> against a baseline of <strong style={{ color: "var(--ink)" }}>$8.5K/mo ad spend</strong>, no CRM, and manual recall outreach. The 12-month bet is +140 new patients/mo, $3.6M run-rate, 4.2× blended ROAS, and 82% Williston fill.
              </p>
              <p style={{ margin: 0, color: "var(--ink)", fontSize: 14, lineHeight: 1.6 }}>
                Brand assets are complete; we need 2 office photos and a Williston-specific photo pack to unlock location landing pages.
              </p>
            </AICallout>

            <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 16, marginTop: 16 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {[
                  {
                    title: "Business Snapshot", section: "A",
                    items: [
                      ["Type", "Multi-location · 3 offices"],
                      ["Industry", "Dental & orthodontics"],
                      ["HQ", "Burlington, VT"],
                      ["Size", "16–50 people"],
                      ["Stage", "Established · $500K–$5M"],
                      ["Goal", "Acquire new patients"],
                    ],
                  },
                  {
                    title: "Services", section: "B",
                    items: [
                      ["Selected", "Website, Paid ads, SEO, Automation"],
                      ["Budget context", "$8.5K/mo ad spend"],
                      ["Tracking", "GA4 ✓ · GTM ✗ · Pixel ✗"],
                      ["CRM", "None today"],
                    ],
                  },
                  {
                    title: "Strategy & ICP", section: "C", warn: 1,
                    items: [
                      ["ICP — primary", "Families w/ kids 3–14 · Chittenden Cty"],
                      ["Competitors", "Smile Burlington, Green Mtn Ortho, Champlain DDS"],
                      ["Constraints", "Williston schedule · No CRM · Reviews 4.4★"],
                      ["⚠ Missing", "Brand voice descriptors"],
                    ],
                  },
                  {
                    title: "Assets", section: "D",
                    items: [
                      ["Uploaded", "7 files · 6 validated · 1 low-res"],
                      ["Access", "GBP, Meta, Google Ads ✓ · GA4 awaiting"],
                      ["⚠ Gaps", "Williston photos · Logo dark variant"],
                    ],
                  },
                  {
                    title: "Goals", section: "E",
                    items: [
                      ["Top priority", "Williston schedule fill → 82%"],
                      ["12-mo targets", "+140 patients/mo · $3.6M · 4.2× ROAS"],
                      ["Selected goals", "4 of 8"],
                    ],
                  },
                ].map((sec) => (
                  <ReviewSection key={sec.title} {...sec}/>
                ))}
              </div>

              {/* Right rail — completion + downstream */}
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <Card padding={20}>
                  <div className="br-eyebrow" style={{ marginBottom: 4 }}>Completion quality</div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 14 }}>
                    <span className="br-num" style={{ fontSize: 38, fontWeight: 600, letterSpacing: "-0.03em" }}>94</span>
                    <span style={{ fontSize: 14, color: "var(--ink-4)" }}>/ 100</span>
                    <Pill tone="ok" size="sm" icon="check" style={{ marginLeft: "auto" }}>Proposal-ready</Pill>
                  </div>
                  <div style={{ height: 6, borderRadius: 999, background: "var(--surface-3)", overflow: "hidden", marginBottom: 14 }}>
                    <div style={{ height: "100%", width: "94%", background: "linear-gradient(90deg, var(--accent) 0%, var(--ok) 100%)", borderRadius: 999 }}/>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 12.5 }}>
                    {[
                      ["Snapshot",  100, "ok"],
                      ["Services",  100, "ok"],
                      ["Strategy",  92, "ok"],
                      ["Assets",    78, "warn"],
                      ["Goals",     100, "ok"],
                    ].map(([k, v, t]) => (
                      <div key={k} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{ flex: 1, color: "var(--ink-3)" }}>{k}</span>
                        <div style={{ width: 80, height: 4, borderRadius: 999, background: "var(--surface-3)", overflow: "hidden" }}>
                          <div style={{ height: "100%", width: `${v}%`, background: t === "ok" ? "var(--ok)" : "var(--warn)" }}/>
                        </div>
                        <span className="br-mono br-num" style={{ fontSize: 11, color: "var(--ink-4)", width: 28, textAlign: "right" }}>{v}</span>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card padding={20}>
                  <div className="br-eyebrow" style={{ marginBottom: 10 }}>What happens when you submit</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                    {[
                      ["Dock",    "Client record created", "ok"],
                      ["Compass", "Proposal drafted in 4 min", "next"],
                      ["Deck",    "Portal provisioned",     "next"],
                      ["Radar",   "Baseline analytics imported", "next"],
                      ["Beacon",  "Recall & intake workflows queued", "next"],
                    ].map(([app, action, state], i, arr) => (
                      <div key={app} style={{ display: "flex", gap: 12, position: "relative" }}>
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 4 }}>
                          <div style={{
                            width: 10, height: 10, borderRadius: 999,
                            background: state === "ok" ? "var(--ok)" : "var(--surface)",
                            border: state === "ok" ? "1px solid var(--ok)" : "1.5px solid var(--line-strong)",
                          }}/>
                          {i < arr.length - 1 && <div style={{ flex: 1, width: 1.5, background: "var(--line-strong)", minHeight: 18 }}/>}
                        </div>
                        <div style={{ flex: 1, paddingBottom: i < arr.length - 1 ? 12 : 0 }}>
                          <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: "-0.005em" }}>{app}</div>
                          <div style={{ fontSize: 12, color: "var(--ink-4)" }}>{action}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                <Button variant="accent" size="lg" full iconRight="arrow_right">Submit & generate proposal</Button>
                <div style={{ fontSize: 11.5, color: "var(--ink-5)", textAlign: "center" }}>
                  We'll email you when the proposal is ready (≤ 4 min).
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ReviewSection({ title, section, items, warn }) {
  return (
    <Card padding={18}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
        <span className="br-mono" style={{ fontSize: 11, color: "var(--ink-5)", letterSpacing: ".06em" }}>SECTION {section}</span>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 15, fontWeight: 600, letterSpacing: "-0.01em" }}>{title}</div>
        </div>
        {warn ? <Pill tone="warn" size="sm" icon="alert">{warn} to confirm</Pill> : <Pill tone="ok" size="sm" icon="check">Looks right</Pill>}
        <button style={{ fontSize: 12, color: "var(--accent)", background: "transparent", border: "none", cursor: "pointer", fontWeight: 500 }}>Edit</button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "140px 1fr", rowGap: 8, columnGap: 14 }}>
        {items.map(([k, v]) => (
          <React.Fragment key={k}>
            <span className="br-mono" style={{ fontSize: 11, color: "var(--ink-5)", textTransform: "uppercase", letterSpacing: ".06em", paddingTop: 2 }}>{k}</span>
            <span style={{ fontSize: 13, color: "var(--ink-2)" }}>{v}</span>
          </React.Fragment>
        ))}
      </div>
    </Card>
  );
}

// ─────────────────────────────────────────────────────────────
// 09 — Complete / Handoff
// ─────────────────────────────────────────────────────────────
function ScreenComplete() {
  return (
    <div className="br-frame" style={{ background: "var(--bg)" }}>
      <div style={{ padding: "24px 56px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
        <div className="br-wordmark"><span className="br-mark"></span>Bridge</div>
        <span className="br-mono" style={{ fontSize: 11, color: "var(--ink-5)" }}>SUBMITTED · 2:14 PM EST</span>
      </div>

      <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: 0 }}>
        {/* Left — success */}
        <div style={{ padding: "40px 56px 56px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div style={{
            width: 56, height: 56, borderRadius: 14,
            background: "linear-gradient(135deg, var(--ok) 0%, #059669 100%)",
            display: "grid", placeItems: "center", color: "#fff",
            boxShadow: "0 8px 20px -4px rgba(4,120,87,.4)", marginBottom: 22,
          }}>
            <Icon name="check" size={28} strokeWidth={2.6}/>
          </div>
          <h1 className="br-h1" style={{ fontSize: 36, marginBottom: 12 }}>You're handed off, Sarah.</h1>
          <p className="br-bodyLg" style={{ marginTop: 0, marginBottom: 24, maxWidth: 480 }}>
            Bridge has structured everything you shared and routed it to the five tools that run your account. Your strategist gets a notification — and a 94/100 readiness score — right now.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 24, maxWidth: 480 }}>
            {[
              ["Time spent", "11 min 42 s"],
              ["Fields captured", "127"],
              ["Files uploaded", "7"],
              ["Quality score", "94 / 100"],
            ].map(([k, v]) => (
              <div key={k} style={{ padding: 14, background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 10 }}>
                <div className="br-eyebrow" style={{ fontSize: 10 }}>{k}</div>
                <div className="br-num" style={{ fontSize: 20, fontWeight: 600, letterSpacing: "-0.02em", marginTop: 4 }}>{v}</div>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", gap: 10 }}>
            <Button variant="primary" size="md" iconRight="arrow_right">Open client portal</Button>
            <Button variant="outline" size="md" icon="file">Download summary PDF</Button>
          </div>
        </div>

        {/* Right — downstream pipeline */}
        <div style={{ padding: "40px 56px 40px", background: "linear-gradient(180deg, #f9f8f4 0%, var(--bg) 100%)", borderLeft: "1px solid var(--line)", display: "flex", flexDirection: "column" }}>
          <div className="br-eyebrow" style={{ marginBottom: 14 }}>Where your data went</div>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: 10 }}>
            {[
              { name: "Dock",    desc: "CRM · client record + contacts created",      status: "done", time: "instant", icon: "folder" },
              { name: "Compass", desc: "Proposal generator · drafting now",            status: "doing", time: "ETA 3m 21s", icon: "file" },
              { name: "Deck",    desc: "Client portal · provisioning workspace",       status: "queued", time: "queued", icon: "layers" },
              { name: "Radar",   desc: "Analytics · baseline import from GA4 + GBP",   status: "queued", time: "queued", icon: "target" },
              { name: "Beacon",  desc: "Automation · recall & intake workflows queued", status: "queued", time: "queued", icon: "bolt" },
            ].map((app) => (
              <div key={app.name} style={{
                display: "flex", alignItems: "center", gap: 14, padding: "14px 16px",
                background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 12,
                boxShadow: "var(--shadow-1)",
              }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 9, flexShrink: 0,
                  background: app.status === "done" ? "var(--ok-soft)" : app.status === "doing" ? "var(--accent-soft)" : "var(--surface-2)",
                  color: app.status === "done" ? "var(--ok)" : app.status === "doing" ? "var(--accent)" : "var(--ink-4)",
                  border: `1px solid ${app.status === "done" ? "#a7f3d0" : app.status === "doing" ? "var(--accent-soft-2)" : "var(--line)"}`,
                  display: "grid", placeItems: "center",
                }}>
                  <Icon name={app.icon} size={17}/>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                    <span style={{ fontSize: 15, fontWeight: 600, letterSpacing: "-0.01em" }}>{app.name}</span>
                    <span className="br-mono" style={{ fontSize: 11, color: "var(--ink-5)" }}>{app.time}</span>
                  </div>
                  <div style={{ fontSize: 12.5, color: "var(--ink-4)" }}>{app.desc}</div>
                </div>
                {app.status === "done" && <Pill tone="ok" size="sm" icon="check">Synced</Pill>}
                {app.status === "doing" && (
                  <Pill tone="accent" size="sm">
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                      <span style={{ width: 6, height: 6, borderRadius: 999, background: "var(--accent)", animation: "br-pulse-soft 1.2s ease-in-out infinite" }}/>
                      Running
                    </span>
                  </Pill>
                )}
                {app.status === "queued" && <Pill tone="neutral" size="sm">Queued</Pill>}
              </div>
            ))}
          </div>

          <div style={{ padding: 14, border: "1px dashed var(--line-strong)", borderRadius: 10, marginTop: 18, fontSize: 12.5, color: "var(--ink-3)", display: "flex", alignItems: "center", gap: 10 }}>
            <Icon name="info" size={14} color="var(--ink-4)"/>
            Sarah Chen will receive a Compass-generated proposal at <strong style={{ color: "var(--ink-2)" }}>sarah.chen@lakesidedental.com</strong> in ~4 min.
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { ScreenStrategy, ScreenAssets, ScreenGoals, ScreenReview, ScreenComplete, ICPRow, SliderRow, ReviewSection });
