/* global React, Icon, Button, Field, Input, Textarea, Chip, Pill, Card, SelectCard, Toggle, Slider, StepFooter, AICallout, ProgressRailT, ClientBarT, T, SliderRow, ReviewSection */
// Bridge — TEMPLATE versions, part 2: Assets, Goals, Review, Complete

// ─────────────────────────────────────────────────────────────
// 06 — Assets (template)
// ─────────────────────────────────────────────────────────────
function ScreenAssetsT() {
  return (
    <div className="br-frame" style={{ flexDirection: "row" }}>
      <ProgressRailT current={3}/>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <ClientBarT section={4} total={6} sectionName="Assets"/>
        <div className="br-scroll" style={{ flex: 1, overflowY: "auto", padding: "32px 56px 32px" }}>
          <div style={{ maxWidth: 1080 }}>
            <Pill tone="neutral" size="sm">D · Materials</Pill>
            <h1 className="br-h1" style={{ marginTop: 12, marginBottom: 8, fontSize: 32 }}>Drop in what you have.</h1>
            <p className="br-bodyLg" style={{ marginTop: 0, marginBottom: 24 }}>
              We auto-tag, validate, and flag what's missing. Don't worry about being complete — you can add more later.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 16 }}>
              <div>
                <div style={{
                  border: "1.5px dashed var(--accent)", borderRadius: 14,
                  background: "linear-gradient(180deg, #faf8ff 0%, #fff 100%)",
                  padding: "32px 24px", textAlign: "center",
                  display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
                }}>
                  <div style={{ width: 48, height: 48, borderRadius: 12, background: "var(--surface)", border: "1px solid var(--accent-soft-2)", display: "grid", placeItems: "center", color: "var(--accent)", boxShadow: "var(--shadow-1)" }}>
                    <Icon name="upload" size={22}/>
                  </div>
                  <div style={{ fontSize: 15, fontWeight: 600, marginTop: 4 }}>Drop files here or paste links</div>
                  <div className="br-cap" style={{ maxWidth: 320 }}>SVG, PNG, JPG, PDF, AI, Figma, Drive, Dropbox. We dedupe and convert.</div>
                  <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                    <Button variant="outline" size="sm" icon="folder">Choose files</Button>
                    <Button variant="ghost" size="sm" icon="globe">Connect Drive</Button>
                  </div>
                </div>

                <div style={{ marginTop: 16 }}>
                  <div className="br-eyebrow" style={{ marginBottom: 10 }}>Uploaded · <T>UPLOADED_COUNT</T> files</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    {[1, 2, 3, 4, 5].map((n) => {
                      const isWarn = n === 4;
                      return (
                        <div key={n} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", border: "1px solid var(--line)", borderRadius: 10, background: "var(--surface)" }}>
                          <div style={{ width: 32, height: 32, borderRadius: 6, flexShrink: 0, background: "var(--surface-2)", border: "1px solid var(--line)", display: "grid", placeItems: "center", color: "var(--ink-3)" }}>
                            <Icon name={n % 2 === 0 ? "file" : "image"} size={15}/>
                          </div>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 500 }}>
                              <T>{`FILE_${n}_NAME`}</T>
                              <span className="br-mono" style={{ fontSize: 10.5, color: "var(--ink-5)" }}><T>{`FILE_${n}_SIZE`}</T></span>
                            </div>
                            <div style={{ display: "flex", gap: 4, marginTop: 4, alignItems: "center" }}>
                              <Pill size="sm" tone="neutral"><T>{`FILE_${n}_TAG`}</T></Pill>
                              <span className="br-mono" style={{ fontSize: 10.5, color: "var(--ink-5)", marginLeft: 4 }}><T>{`FILE_${n}_META`}</T></span>
                            </div>
                          </div>
                          {isWarn ? <Pill tone="warn" size="sm" icon="alert">Low-res</Pill> : <Pill tone="ok" size="sm" icon="check">Validated</Pill>}
                          <Icon name="x" size={14} color="var(--ink-5)"/>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <Card padding={18}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                    <div className="br-eyebrow">Still needed</div>
                    <Pill tone="warn" size="sm"><T>MISSING_COUNT</T> of <T>TOTAL_COUNT</T> missing</Pill>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    {["Primary logo", "Brand guidelines", "Color palette", "Headshots", "Location photography", "Ad creative", "Testimonials", "Logo — dark variant", "Brand fonts"].map((item, i) => {
                      const got = i < 6;
                      return (
                        <div key={item} style={{ display: "flex", alignItems: "center", gap: 10, padding: "6px 0" }}>
                          <div style={{ width: 16, height: 16, borderRadius: 4, flexShrink: 0, background: got ? "var(--ink)" : "var(--surface)", border: got ? "1px solid var(--ink)" : "1.5px solid var(--line-strong)", display: "grid", placeItems: "center", color: "#fff" }}>
                            {got && <Icon name="check" size={10} strokeWidth={3}/>}
                          </div>
                          <span style={{ fontSize: 13, color: got ? "var(--ink-3)" : "var(--ink)", textDecoration: got ? "line-through" : "none", flex: 1 }}>{item}</span>
                          <span className="br-mono" style={{ fontSize: 10, color: "var(--ink-5)" }}><T>{`CAT_${i+1}`}</T></span>
                        </div>
                      );
                    })}
                  </div>
                </Card>

                <Card padding={18}>
                  <div className="br-eyebrow" style={{ marginBottom: 10 }}>Account access</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    {[
                      ["Google Business Profile", "ok"],
                      ["Meta Business Manager",   "ok"],
                      ["Google Ads",              "ok"],
                      ["Google Analytics 4",      "warn"],
                      ["Instagram",               "neutral"],
                    ].map(([name, tone], i) => (
                      <div key={name} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 10px", border: "1px solid var(--line)", borderRadius: 8 }}>
                        <span style={{ fontSize: 13, fontWeight: 500, flex: 1 }}>{name}</span>
                        <Pill tone={tone} size="sm" icon={tone === "ok" ? "check" : tone === "warn" ? "alert" : undefined}>
                          <T>{`ACCESS_${i+1}_STATUS`}</T>
                        </Pill>
                      </div>
                    ))}
                  </div>
                </Card>

                <AICallout title="Asset audit">
                  Your <strong style={{ color: "var(--ink)" }}><T>COMPLETE_KIT_NAME</T></strong> is complete — we can ship a polished proposal. Add <T>MISSING_DETAIL</T> and we'll unlock <T>UNLOCKED_FEATURE</T>.
                </AICallout>
              </div>
            </div>
          </div>
        </div>
        <StepFooter note={<><T>UPLOADED_COUNT</T>/<T>TOTAL_COUNT</T> assets · <T>MISSING_COUNT</T> still needed</>} continueLabel="Continue to Goals"/>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 07 — Goals (template)
// ─────────────────────────────────────────────────────────────
function ScreenGoalsT() {
  return (
    <div className="br-frame" style={{ flexDirection: "row" }}>
      <ProgressRailT current={4}/>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <ClientBarT section={5} total={6} sectionName="Goals"/>
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
                ["users",   "GOAL_1_TITLE", "GOAL_1_SUB"],
                ["target",  "GOAL_2_TITLE", "GOAL_2_SUB"],
                ["bolt",    "GOAL_3_TITLE", "GOAL_3_SUB"],
                ["star",    "GOAL_4_TITLE", "GOAL_4_SUB"],
                ["search",  "GOAL_5_TITLE", "GOAL_5_SUB"],
                ["megaphone","GOAL_6_TITLE","GOAL_6_SUB"],
                ["building","GOAL_7_TITLE", "GOAL_7_SUB"],
                ["users",   "GOAL_8_TITLE", "GOAL_8_SUB"],
              ].map(([i, t, s]) => (
                <SelectCard key={t} icon={i} title={<T>{t}</T>} subtitle={<T>{s}</T>}/>
              ))}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 16 }}>
              <Card padding={20}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
                  <div>
                    <div className="br-eyebrow">12-month targets</div>
                    <div style={{ fontSize: 16, fontWeight: 600, marginTop: 4 }}>Numbers we'll report against</div>
                  </div>
                  <Pill tone="ai" size="sm" icon="sparkle">AI baseline · adjust</Pill>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
                  {[1, 2, 3, 4].map((n) => (
                    <div key={n}>
                      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 6 }}>
                        <span style={{ fontSize: 13.5, fontWeight: 500 }}><T>{`TARGET_${n}_LABEL`}</T></span>
                        <span className="br-mono" style={{ fontSize: 11, color: "var(--ink-5)" }}><T>{`TARGET_${n}_NOTE`}</T></span>
                      </div>
                      <Slider value={50 + n * 8} min={0} max={100} format={(v) => `${v}`}/>
                    </div>
                  ))}
                </div>
              </Card>

              <Card padding={20}>
                <div className="br-eyebrow" style={{ marginBottom: 4 }}>Priority order</div>
                <div style={{ fontSize: 16, fontWeight: 600 }}>Drag to rank</div>
                <div className="br-cap" style={{ marginTop: 4, marginBottom: 14 }}>If we had to pick one to win at, it would be #1.</div>

                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {[1, 2, 3, 4].map((n, i) => (
                    <div key={n} style={{
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
                      }}>{i + 1}</div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 13, fontWeight: 500 }}><T>{`PRIORITY_${n}_TITLE`}</T></div>
                        <div style={{ fontSize: 11.5, color: "var(--ink-4)" }}><T>{`PRIORITY_${n}_NOTE`}</T></div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
        <StepFooter note={<><T>GOAL_COUNT</T> goals · <T>TARGET_COUNT</T> numeric targets</>} continueLabel="Continue to Review"/>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 08 — Review (template)
// ─────────────────────────────────────────────────────────────
function ScreenReviewT() {
  return (
    <div className="br-frame" style={{ flexDirection: "row" }}>
      <ProgressRailT current={5}/>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <ClientBarT section={6} total={6} sectionName="Review"/>
        <div className="br-scroll" style={{ flex: 1, overflowY: "auto", padding: "32px 56px 32px" }}>
          <div style={{ maxWidth: 1080 }}>
            <Pill tone="neutral" size="sm">F · Confirmation</Pill>
            <h1 className="br-h1" style={{ marginTop: 12, marginBottom: 8, fontSize: 32 }}>Here's how we understand <T>CLIENT_COMPANY</T>.</h1>
            <p className="br-bodyLg" style={{ marginTop: 0, marginBottom: 20 }}>
              Read it like we'd say it back to you. Edit anything that's off — then send it through.
            </p>

            <AICallout title={<>Bridge summary · generated <T>SECONDS_AGO</T>s ago</>}>
              <p style={{ margin: "0 0 8px 0", color: "var(--ink)", fontSize: 14, lineHeight: 1.6 }}>
                <T>CLIENT_COMPANY</T> is a <strong style={{ color: "var(--ink)" }}><T>BUSINESS_TYPE_DESCRIPTION</T></strong> in <T>HQ_CITY_STATE</T>. The primary pressure is <strong style={{ color: "var(--ink)" }}><T>PRIMARY_PRESSURE</T></strong>.
              </p>
              <p style={{ margin: "0 0 8px 0", color: "var(--ink)", fontSize: 14, lineHeight: 1.6 }}>
                We're scoping <strong style={{ color: "var(--ink)" }}><T>SERVICES_SELECTED</T></strong> against a baseline of <strong style={{ color: "var(--ink)" }}><T>AD_BUDGET</T>/mo ad spend</strong>, <T>CURRENT_CRM_DESC</T>, and <T>OPERATIONAL_BASELINE</T>. The 12-month bet is <T>TARGET_SUMMARY</T>.
              </p>
              <p style={{ margin: 0, color: "var(--ink)", fontSize: 14, lineHeight: 1.6 }}>
                <T>ASSET_STATUS_SUMMARY</T>.
              </p>
            </AICallout>

            <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 16, marginTop: 16 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {[
                  { title: "Business Snapshot", section: "A", items: [["Type", "BUSINESS_TYPE"], ["Industry", "INDUSTRY"], ["HQ", "HQ_CITY_STATE"], ["Size", "SIZE_RANGE"], ["Stage", "REVENUE_STAGE"], ["Goal", "PRIMARY_GOAL"]] },
                  { title: "Services",          section: "B", items: [["Selected", "SERVICES_SELECTED"], ["Budget context", "BUDGET_CONTEXT"], ["Tracking", "TRACKING_STATUS"], ["CRM", "CURRENT_CRM"]] },
                  { title: "Strategy & ICP",    section: "C", warn: 1, items: [["ICP — primary", "ICP_PRIMARY"], ["Competitors", "COMPETITORS_LIST"], ["Constraints", "CONSTRAINTS_LIST"], ["⚠ Missing", "MISSING_FIELD"]] },
                  { title: "Assets",            section: "D", items: [["Uploaded", "UPLOADED_SUMMARY"], ["Access", "ACCESS_SUMMARY"], ["⚠ Gaps", "ASSET_GAPS"]] },
                  { title: "Goals",             section: "E", items: [["Top priority", "TOP_PRIORITY"], ["12-mo targets", "TARGETS_SUMMARY"], ["Selected goals", "GOAL_COUNT_OF_TOTAL"]] },
                ].map((sec) => (
                  <Card key={sec.title} padding={18}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                      <span className="br-mono" style={{ fontSize: 11, color: "var(--ink-5)" }}>SECTION {sec.section}</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 15, fontWeight: 600 }}>{sec.title}</div>
                      </div>
                      {sec.warn ? <Pill tone="warn" size="sm" icon="alert">{sec.warn} to confirm</Pill> : <Pill tone="ok" size="sm" icon="check">Looks right</Pill>}
                      <button style={{ fontSize: 12, color: "var(--accent)", background: "transparent", border: "none", cursor: "pointer", fontWeight: 500 }}>Edit</button>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "140px 1fr", rowGap: 8, columnGap: 14 }}>
                      {sec.items.map(([k, v]) => (
                        <React.Fragment key={k}>
                          <span className="br-mono" style={{ fontSize: 11, color: "var(--ink-5)", textTransform: "uppercase", paddingTop: 2 }}>{k}</span>
                          <span style={{ fontSize: 13, color: "var(--ink-2)" }}><T>{v}</T></span>
                        </React.Fragment>
                      ))}
                    </div>
                  </Card>
                ))}
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <Card padding={20}>
                  <div className="br-eyebrow" style={{ marginBottom: 4 }}>Completion quality</div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 14 }}>
                    <span className="br-num" style={{ fontSize: 38, fontWeight: 600 }}><T>QUALITY_SCORE</T></span>
                    <span style={{ fontSize: 14, color: "var(--ink-4)" }}>/ 100</span>
                    <Pill tone="ok" size="sm" icon="check" style={{ marginLeft: "auto" }}>Proposal-ready</Pill>
                  </div>
                  <div style={{ height: 6, borderRadius: 999, background: "var(--surface-3)", overflow: "hidden", marginBottom: 14 }}>
                    <div style={{ height: "100%", width: "94%", background: "linear-gradient(90deg, var(--accent) 0%, var(--ok) 100%)" }}/>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 12.5 }}>
                    {[["Snapshot", "ok"], ["Services", "ok"], ["Strategy", "ok"], ["Assets", "warn"], ["Goals", "ok"]].map(([k, t], i) => (
                      <div key={k} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{ flex: 1, color: "var(--ink-3)" }}>{k}</span>
                        <div style={{ width: 80, height: 4, borderRadius: 999, background: "var(--surface-3)", overflow: "hidden" }}>
                          <div style={{ height: "100%", width: "85%", background: t === "ok" ? "var(--ok)" : "var(--warn)" }}/>
                        </div>
                        <span className="br-mono br-num" style={{ fontSize: 11, color: "var(--ink-4)", width: 28, textAlign: "right" }}><T>{`SCORE_${i+1}`}</T></span>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card padding={20}>
                  <div className="br-eyebrow" style={{ marginBottom: 10 }}>What happens when you submit</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                    {[
                      ["Dock",    "Client record created", "ok"],
                      ["Compass", <>Proposal drafted in <T>DRAFT_MIN</T> min</>, "next"],
                      ["Deck",    "Portal provisioned",     "next"],
                      ["Radar",   "Baseline analytics imported", "next"],
                      ["Beacon",  "Workflows queued",       "next"],
                    ].map(([app, action, state], i, arr) => (
                      <div key={app} style={{ display: "flex", gap: 12, position: "relative" }}>
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 4 }}>
                          <div style={{ width: 10, height: 10, borderRadius: 999, background: state === "ok" ? "var(--ok)" : "var(--surface)", border: state === "ok" ? "1px solid var(--ok)" : "1.5px solid var(--line-strong)" }}/>
                          {i < arr.length - 1 && <div style={{ flex: 1, width: 1.5, background: "var(--line-strong)", minHeight: 18 }}/>}
                        </div>
                        <div style={{ flex: 1, paddingBottom: i < arr.length - 1 ? 12 : 0 }}>
                          <div style={{ fontSize: 13, fontWeight: 600 }}>{app}</div>
                          <div style={{ fontSize: 12, color: "var(--ink-4)" }}>{action}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                <Button variant="accent" size="lg" full iconRight="arrow_right">Submit & generate proposal</Button>
                <div style={{ fontSize: 11.5, color: "var(--ink-5)", textAlign: "center" }}>
                  We'll email you when the proposal is ready (≤ <T>DRAFT_MIN</T> min).
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 09 — Complete (template)
// ─────────────────────────────────────────────────────────────
function ScreenCompleteT() {
  return (
    <div className="br-frame" style={{ background: "var(--bg)" }}>
      <div style={{ padding: "24px 56px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
        <div className="br-wordmark"><span className="br-mark"></span>Bridge</div>
        <span className="br-mono" style={{ fontSize: 11, color: "var(--ink-5)" }}>SUBMITTED · <T>SUBMIT_TIME</T></span>
      </div>

      <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: 0 }}>
        <div style={{ padding: "40px 56px 56px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div style={{
            width: 56, height: 56, borderRadius: 14,
            background: "linear-gradient(135deg, var(--ok) 0%, #059669 100%)",
            display: "grid", placeItems: "center", color: "#fff",
            boxShadow: "0 8px 20px -4px rgba(4,120,87,.4)", marginBottom: 22,
          }}>
            <Icon name="check" size={28} strokeWidth={2.6}/>
          </div>
          <h1 className="br-h1" style={{ fontSize: 36, marginBottom: 12 }}>You're handed off, <T>CLIENT_FIRST_NAME</T>.</h1>
          <p className="br-bodyLg" style={{ marginTop: 0, marginBottom: 24, maxWidth: 480 }}>
            Bridge has structured everything you shared and routed it to the five tools that run your account. Your strategist gets a notification — and a <T>QUALITY_SCORE</T>/100 readiness score — right now.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 24, maxWidth: 480 }}>
            {[
              ["Time spent",      "TIME_SPENT"],
              ["Fields captured", "FIELD_COUNT"],
              ["Files uploaded",  "FILE_COUNT"],
              ["Quality score",   "QUALITY_SCORE_OUT_OF"],
            ].map(([k, v]) => (
              <div key={k} style={{ padding: 14, background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 10 }}>
                <div className="br-eyebrow" style={{ fontSize: 10 }}>{k}</div>
                <div className="br-num" style={{ fontSize: 20, fontWeight: 600, marginTop: 4 }}><T>{v}</T></div>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", gap: 10 }}>
            <Button variant="primary" size="md" iconRight="arrow_right">Open client portal</Button>
            <Button variant="outline" size="md" icon="file">Download summary PDF</Button>
          </div>
        </div>

        <div style={{ padding: "40px 56px 40px", background: "linear-gradient(180deg, #f9f8f4 0%, var(--bg) 100%)", borderLeft: "1px solid var(--line)", display: "flex", flexDirection: "column" }}>
          <div className="br-eyebrow" style={{ marginBottom: 14 }}>Where your data went</div>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: 10 }}>
            {[
              { name: "Dock",    desc: "CRM · client record + contacts created",      status: "done",   time: "instant",        icon: "folder" },
              { name: "Compass", desc: "Proposal generator · drafting now",           status: "doing",  time: <>ETA <T>ETA_TIME</T></>, icon: "file" },
              { name: "Deck",    desc: "Client portal · provisioning workspace",      status: "queued", time: "queued",         icon: "layers" },
              { name: "Radar",   desc: "Analytics · baseline import",                 status: "queued", time: "queued",         icon: "target" },
              { name: "Beacon",  desc: "Automation · workflows queued",               status: "queued", time: "queued",         icon: "bolt" },
            ].map((app) => (
              <div key={app.name} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 16px", background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 12, boxShadow: "var(--shadow-1)" }}>
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
                    <span style={{ fontSize: 15, fontWeight: 600 }}>{app.name}</span>
                    <span className="br-mono" style={{ fontSize: 11, color: "var(--ink-5)" }}>{app.time}</span>
                  </div>
                  <div style={{ fontSize: 12.5, color: "var(--ink-4)" }}>{app.desc}</div>
                </div>
                {app.status === "done" && <Pill tone="ok" size="sm" icon="check">Synced</Pill>}
                {app.status === "doing" && <Pill tone="accent" size="sm">Running</Pill>}
                {app.status === "queued" && <Pill tone="neutral" size="sm">Queued</Pill>}
              </div>
            ))}
          </div>

          <div style={{ padding: 14, border: "1px dashed var(--line-strong)", borderRadius: 10, marginTop: 18, fontSize: 12.5, color: "var(--ink-3)", display: "flex", alignItems: "center", gap: 10 }}>
            <Icon name="info" size={14} color="var(--ink-4)"/>
            <T>CLIENT_FULL_NAME</T> will receive a Compass-generated proposal at <strong style={{ color: "var(--ink-2)" }}><T>CLIENT_EMAIL</T></strong> in ~<T>ETA_MIN</T> min.
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Reference cheat-sheet artboard (lists every placeholder used)
// ─────────────────────────────────────────────────────────────
function ScreenPlaceholderRef() {
  const groups = [
    {
      title: "Client identity",
      items: [
        ["CLIENT_COMPANY",       "Lakeside Family Dental",            "Brand/company name"],
        ["CLIENT_FIRST_NAME",    "Sarah",                              "Primary contact's given name"],
        ["CLIENT_FULL_NAME",     "Sarah Chen",                         "Primary contact's full name"],
        ["CLIENT_EMAIL",         "sarah@example.com",                  "Work email"],
        ["CI",                   "SC",                                 "Initials (2 letters)"],
        ["SESSION_ID",           "ABC-1234-9E",                        "Bridge session token"],
        ["AGENCY_NAME",          "Digital Native",                     "Agency operating Bridge"],
      ],
    },
    {
      title: "Business profile",
      items: [
        ["BUSINESS_TYPE",        "Multi-location",                     "Single/Multi/Franchise/etc."],
        ["BUSINESS_TYPE_DESCRIPTION", "multi-location family practice", "Sentence-form for summary"],
        ["INDUSTRY",             "Dental & orthodontics",              "Free-form industry"],
        ["INDUSTRY_TAXONOMY",    "Healthcare · Local services",        "Bridge taxonomy chip"],
        ["HQ_CITY_STATE",        "Burlington, VT",                     "Primary location"],
        ["LOCATIONS_LIST",       "Burlington, S. Burlington…",         "All locations"],
        ["LOCALE",               "Vermont",                            "Marketing region"],
        ["SIZE_RANGE",           "16–50",                              "Headcount bucket"],
        ["REVENUE_STAGE",        "Established · $500K–$5M",            "Stage bucket"],
        ["CLIENT_DOMAIN",        "example.com",                        "Current website domain"],
      ],
    },
    {
      title: "Goals & priorities",
      items: [
        ["PRIMARY_GOAL",         "Acquire new patients",               "Top marketing goal"],
        ["PRIMARY_GOAL_1..4_TITLE", "Acquire / Retain / Launch / Ops", "Goal card titles (1–4)"],
        ["PRIMARY_GOAL_1..4_SUB", "Inbound leads, bookings",            "Goal card subtitles"],
        ["GOAL_1..8_TITLE",      "New patients · Revenue · ROAS…",     "Section E goal cards"],
        ["TARGET_1..4_LABEL",    "New patients / month",               "Slider labels"],
        ["TARGET_1..4_NOTE",     "Currently ~85 · benchmark 160+",     "Slider context note"],
        ["PRIORITY_1..4_TITLE",  "Williston fill",                     "Ranked priority items"],
        ["PRIORITY_1..4_NOTE",   "Schedule utilization → 82%",         "Ranked priority subtitle"],
        ["TOP_PRIORITY",         "Williston schedule fill → 82%",      "Single highest priority"],
        ["TARGETS_SUMMARY",      "+140 patients/mo · $3.6M · 4.2× ROAS","Targets one-liner"],
        ["GOAL_COUNT",           "4",                                  "Selected goal count"],
        ["TARGET_COUNT",         "4",                                  "Numeric target count"],
        ["GOAL_COUNT_OF_TOTAL",  "4 of 8",                             "Display ratio"],
      ],
    },
    {
      title: "Services & branching",
      items: [
        ["SELECTED_COUNT",       "4",                                  "Services picked"],
        ["QUESTION_COUNT",       "16",                                 "Follow-up questions count"],
        ["PLATFORMS",            "Meta + Google",                       "Paid ads platforms"],
        ["AD_BUDGET",            "$8.5K",                              "Monthly ad spend"],
        ["BUDGET_CONTEXT",       "$8.5K/mo ad spend",                  "Sentence form"],
        ["TRACKING_STATUS",      "GA4 ✓ · GTM ✗ · Pixel ✗",            "Tracking pixel status"],
        ["SEO_FOCUS",            "Local",                              "SEO scope"],
        ["COMPETITOR_COUNT",     "3",                                  "Competitor count"],
        ["TARGET_LOCATIONS",     "Burlington + 4 nearby",              "SEO target areas"],
        ["CURRENT_CRM",          "None today",                         "CRM in use"],
        ["CURRENT_CRM_DESC",     "no CRM",                             "Sentence form"],
        ["AUTOMATION_FOCUS",     "Recall + intake",                    "Automation scope"],
        ["AI_SUGGESTED_SERVICE", "Local SEO + Reviews",                "AI recommendation"],
        ["SERVICES_SELECTED",    "Website, Paid, SEO, Automation",     "Comma list"],
      ],
    },
    {
      title: "Strategy / ICP",
      items: [
        ["FREE_TEXT_DESCRIPTION","We're a family dental practice…",    "Client's own description"],
        ["EXTRACTED_FIELD_COUNT","11",                                  "AI-extracted field count"],
        ["DEMO_1..3",            "Families with kids 3–14",             "ICP demographic pills"],
        ["GEO_1..2",             "Chittenden County, VT",               "ICP geography pills"],
        ["MINDSET_1..3",         "Values gentle care",                  "ICP mindset pills"],
        ["TRIGGER_1..4",         "New baby · Moving to area…",          "ICP trigger events"],
        ["COMPETITOR_1..3_NAME", "Smile Burlington",                    "Competitor display name"],
        ["COMPETITOR_1..3_URL",  "smile-burlington.com",                "Competitor URL"],
        ["COMP_1..3_CTX",        "Direct · 2 mi",                       "Competitor context chip"],
        ["C1..C3",               "S",                                   "1-letter competitor avatar"],
        ["CONSTRAINT_1..5",      "Williston schedule is 38% full",      "Growth constraint rows"],
        ["STAGE_1..5_KPI",       "~62% / ~38%",                         "Funnel-stage KPI"],
        ["STAGE_1..5_DETAIL",    "Word of mouth · Google search",       "Funnel-stage description"],
        ["ICP_PRIMARY",          "Families w/ kids 3–14 · Chittenden",  "ICP review summary"],
        ["COMPETITORS_LIST",     "Smile Burlington, Green Mtn Ortho…",  "Competitors review"],
        ["CONSTRAINTS_LIST",     "Williston schedule · No CRM · Reviews 4.4★", "Constraints review"],
        ["MISSING_FIELD",        "Brand voice descriptors",             "Field flagged missing"],
        ["FIELDS_FILLED",        "11",                                  "Total Section C fields filled"],
        ["AI_SUGGESTED_COUNT",   "2",                                   "Fields suggested by AI"],
      ],
    },
    {
      title: "Assets",
      items: [
        ["UPLOADED_COUNT",       "7",                                   "Files dropped in"],
        ["MISSING_COUNT",        "3",                                   "Assets still needed"],
        ["TOTAL_COUNT",          "9",                                   "Total needed"],
        ["FILE_1..5_NAME",       "logo-primary.svg",                    "Filename"],
        ["FILE_1..5_SIZE",       "SVG · 12 KB",                         "Format + bytes"],
        ["FILE_1..5_TAG",        "Brand",                               "Auto-tag chip"],
        ["FILE_1..5_META",       "1080×320",                            "Dimensions / pages"],
        ["CAT_1..9",             "Brand",                               "Required-asset category"],
        ["ACCESS_1..5_STATUS",   "Connected",                           "Account access state"],
        ["COMPLETE_KIT_NAME",    "brand kit",                           "Audit hero noun"],
        ["MISSING_DETAIL",       "2 fresh office photos (≥2000px)",     "Missing specifics"],
        ["UNLOCKED_FEATURE",     "Location landing pages",              "What completing unlocks"],
        ["UPLOADED_SUMMARY",     "7 files · 6 validated · 1 low-res",   "Assets review one-liner"],
        ["ACCESS_SUMMARY",       "GBP, Meta, Google Ads ✓ · GA4 awaiting", "Access review one-liner"],
        ["ASSET_GAPS",           "Williston photos · Logo dark variant","Gaps line"],
      ],
    },
    {
      title: "Review / submission",
      items: [
        ["QUALITY_SCORE",        "94",                                  "Completion score"],
        ["QUALITY_SCORE_OUT_OF", "94 / 100",                            "Display form"],
        ["SCORE_1..5",           "100",                                 "Per-section score"],
        ["PRIMARY_PRESSURE",     "Williston location at 38% utilization","Headline pressure"],
        ["OPERATIONAL_BASELINE", "manual recall outreach",              "Operational baseline"],
        ["TARGET_SUMMARY",       "+140 patients/mo · $3.6M run-rate…",  "Sentence summary"],
        ["ASSET_STATUS_SUMMARY", "Brand assets are complete; need 2 office photos…", "Assets summary sentence"],
        ["SECONDS_AGO",          "12",                                  "AI summary freshness"],
        ["TIME_SPENT",           "11 min 42 s",                         "Time-to-complete"],
        ["FIELD_COUNT",          "127",                                 "Fields captured"],
        ["FILE_COUNT",           "7",                                   "Files uploaded"],
        ["DRAFT_MIN",            "4",                                   "Proposal draft ETA (minutes)"],
        ["ETA_TIME",             "3m 21s",                              "Compass running ETA"],
        ["ETA_MIN",              "4",                                   "Compass complete ETA"],
        ["SUBMIT_TIME",          "2:14 PM EST",                         "Submission timestamp"],
      ],
    },
    {
      title: "Resume / progress",
      items: [
        ["VERSION",              "1.4",                                 "Bridge version"],
        ["SECONDS",              "2",                                   "Autosave age (s)"],
        ["DAYS",                 "2",                                   "Last-saved age (days)"],
        ["DONE_COUNT",           "2",                                   "Sections complete count"],
        ["LAST_SECTION_LETTER",  "C",                                   "Resume section letter"],
        ["LAST_SECTION_NAME",    "Strategy",                            "Resume section name"],
        ["LAST_FIELD_LABEL",     "Competitor list",                     "Resume field label"],
        ["LAST_FIELD_PROGRESS_NOTE","2 of 3 competitor URLs entered",   "Resume field detail"],
        ["CURRENT_FIELD_LABEL",  "Competitor list",                     "Active section subtitle"],
        ["SECTION_A..E_SUMMARY", "Multi-loc · dental · Burlington VT",  "Completed section recap"],
        ["T_A..T_E",             "Mon · 1m 42s",                        "Time spent per section"],
        ["MIN_LEFT",             "6",                                   "Minutes remaining"],
        ["EXPIRY_DATE",          "Sept 9",                              "Magic-link expiry"],
        ["DAYS_LEFT",            "7",                                   "Days until session expiry"],
        ["MM:SS",                "00:27",                               "Live countdown"],
      ],
    },
    {
      title: "Landing page copy",
      items: [
        ["HERO_EYEBROW",         "A guided strategy session, not a form","Pill text"],
        ["HERO_SUBTITLE",        "so we build a system that fits it precisely", "Continuation clause"],
        ["BENEFIT_1..3_TITLE",   "Built around your specific services",  "Three benefit bullet titles"],
        ["BENEFIT_1..3_BODY",    "Questions adapt to what you've selected","Three benefit bullet bodies"],
        ["EST_MIN_LOW",          "10",                                   "Minimum estimated minutes"],
        ["EST_MIN_HIGH",         "12",                                   "Maximum estimated minutes"],
      ],
    },
  ];

  return (
    <div className="br-frame" style={{ background: "linear-gradient(180deg, #fafaf9 0%, #f5f5f4 100%)", padding: "28px 36px 36px", overflow: "auto" }}>
      <div style={{ marginBottom: 22 }}>
        <Pill tone="dark" size="sm">Placeholder reference · Bridge templates</Pill>
        <h1 className="br-h1" style={{ fontSize: 28, marginTop: 12, marginBottom: 6 }}>Every <T>PLACEHOLDER</T> used.</h1>
        <p className="br-body" style={{ margin: 0, maxWidth: 720 }}>
          Each placeholder shown across the template screens, with its meaning and a sample value. Use this as a fill-in dictionary when wiring real data in Claude Code.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        {groups.map((g) => (
          <Card key={g.title} padding={0} style={{ overflow: "hidden" }}>
            <div style={{ padding: "12px 16px", background: "var(--surface-2)", borderBottom: "1px solid var(--line)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ fontSize: 14, fontWeight: 600 }}>{g.title}</div>
              <span className="br-mono" style={{ fontSize: 10.5, color: "var(--ink-5)" }}>{g.items.length} keys</span>
            </div>
            <div>
              {g.items.map(([key, sample, meaning], i) => (
                <div key={key} style={{
                  display: "grid", gridTemplateColumns: "1.1fr 1fr 1fr", gap: 12,
                  padding: "9px 16px", alignItems: "center",
                  borderTop: i > 0 ? "1px solid var(--line-faint)" : "none",
                }}>
                  <T>{key}</T>
                  <span style={{ fontSize: 11.5, color: "var(--ink-3)" }}>{meaning}</span>
                  <span className="br-mono" style={{ fontSize: 10.5, color: "var(--ink-5)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>e.g. {sample}</span>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { ScreenAssetsT, ScreenGoalsT, ScreenReviewT, ScreenCompleteT, ScreenPlaceholderRef });
