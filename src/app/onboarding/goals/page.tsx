"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { ProgressRail } from "@/components/layout/ProgressRail";
import { ClientBar } from "@/components/layout/ClientBar";
import { StepFooter } from "@/components/layout/StepFooter";
import { Pill } from "@/components/ui/Chip";
import { Card, SelectCard } from "@/components/ui/Card";
import { Slider } from "@/components/ui/Slider";
import { Icon } from "@/components/ui/Icon";
import { MobileNav } from "@/components/layout/MobileNav";
import { getOrCreateSession, getGoals, saveGoals, updateSessionSection } from "@/lib/actions/session";
import type { OnboardingSession } from "@/lib/types";

const GOAL_OPTIONS = [
  { id: "new_clients",   icon: "users",     title: "New clients",       subtitle: "Booked first appointment" },
  { id: "revenue",       icon: "target",    title: "Revenue",           subtitle: "Total business revenue" },
  { id: "roas",          icon: "bolt",      title: "ROAS",              subtitle: "Return on ad spend" },
  { id: "reviews",       icon: "star",      title: "Reviews",           subtitle: "Google ★ average" },
  { id: "local_rank",    icon: "search",    title: "Local rank",        subtitle: "Avg. pack position" },
  { id: "reach",         icon: "megaphone", title: "Reach",             subtitle: "Monthly impressions" },
  { id: "location_fill", icon: "building",  title: "Location fill",     subtitle: "Schedule utilization" },
  { id: "retention",     icon: "users",     title: "Retention",         subtitle: "Repeat client rate" },
] as const;

export default function GoalsPage() {
  const router = useRouter();
  const [session, setSession] = useState<OnboardingSession | null>(null);
  const [savedAt, setSavedAt] = useState<string | undefined>();
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const sessionRef = useRef<OnboardingSession | null>(null);
  const dragItem = useRef<number | null>(null);
  const dragOver = useRef<number | null>(null);

  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  // Dedicated DB columns
  const [newClientsPerMonth, setNewClientsPerMonth] = useState(50);
  const [annualRevenue, setAnnualRevenue] = useState(5);  // millions ZAR
  const [blendedRoas, setBlendedRoas] = useState(3.5);
  const [locationFillPct, setLocationFillPct] = useState(70);
  // numeric_targets JSONB for remaining goals
  const [reviewsTarget, setReviewsTarget] = useState(4.5);
  const [localRankTarget, setLocalRankTarget] = useState(3);
  const [reachTarget, setReachTarget] = useState(50);  // thousands
  const [retentionTarget, setRetentionTarget] = useState(60);
  const [priorityOrder, setPriorityOrder] = useState<string[]>([]);

  useEffect(() => {
    async function load() {
      const sess = await getOrCreateSession();
      if (!sess) { router.push("/"); return; }
      setSession(sess);
      sessionRef.current = sess;
      const goals = await getGoals(sess.id);
      if (goals) {
        setSelectedGoals(goals.selected_goals ?? []);
        setNewClientsPerMonth(goals.new_patients_per_month ?? 50);
        setAnnualRevenue(goals.annual_revenue_usd ? goals.annual_revenue_usd / 1_000_000 : 5);
        setBlendedRoas(goals.blended_roas ?? 3.5);
        setLocationFillPct(goals.williston_fill_pct ?? 70);
        const nt = goals.numeric_targets ?? {};
        setReviewsTarget(nt["reviews"] ?? 4.5);
        setLocalRankTarget(nt["local_rank"] ?? 3);
        setReachTarget(nt["reach"] ?? 50);
        setRetentionTarget(nt["retention"] ?? 60);
        setPriorityOrder(goals.priority_order ?? []);
      }
      setLoading(false);
    }
    load();
  }, [router]);

  const autosave = useCallback(async (patch: object) => {
    const sess = sessionRef.current;
    if (!sess) return;
    setSaving(true);
    await saveGoals(sess.id, patch);
    setSaving(false);
    setSavedAt(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
  }, []);

  function saveNumericTargets(field: string, value: number) {
    const sess = sessionRef.current;
    if (!sess) return;
    const currentTargets: Record<string, number> = {
      reviews: reviewsTarget,
      local_rank: localRankTarget,
      reach: reachTarget,
      retention: retentionTarget,
    };
    const updated = { ...currentTargets, [field]: value };
    autosave({ numeric_targets: updated });
  }

  function toggleGoal(id: string) {
    const next = selectedGoals.includes(id) ? selectedGoals.filter(g => g !== id) : [...selectedGoals, id];
    setSelectedGoals(next);
    const newPriority = [...priorityOrder.filter(p => next.includes(p)), ...next.filter(p => !priorityOrder.includes(p))];
    setPriorityOrder(newPriority);
    autosave({ selected_goals: next, priority_order: newPriority });
  }

  function handleDragStart(idx: number) { dragItem.current = idx; }
  function handleDragEnter(idx: number) { dragOver.current = idx; }
  function handleDragEnd() {
    if (dragItem.current === null || dragOver.current === null) return;
    const next = [...priorityOrder];
    const [moved] = next.splice(dragItem.current, 1);
    next.splice(dragOver.current, 0, moved);
    dragItem.current = null;
    dragOver.current = null;
    setPriorityOrder(next);
    autosave({ priority_order: next });
  }

  async function handleContinue() {
    const sess = sessionRef.current;
    if (!sess) return;
    await saveGoals(sess.id, {
      selected_goals: selectedGoals,
      new_patients_per_month: newClientsPerMonth,
      annual_revenue_usd: Math.round(annualRevenue * 1_000_000),
      blended_roas: blendedRoas,
      williston_fill_pct: locationFillPct,
      numeric_targets: {
        reviews: reviewsTarget,
        local_rank: localRankTarget,
        reach: reachTarget,
        retention: retentionTarget,
      },
      priority_order: priorityOrder,
    });
    await updateSessionSection(sess.id, "review");
    router.push("/onboarding/review");
  }

  const prioritizedGoals = priorityOrder
    .filter(id => selectedGoals.includes(id))
    .map(id => GOAL_OPTIONS.find(g => g.id === id)!);

  if (loading) return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100dvh", background: "var(--bg)" }}>
      <div style={{ width: 28, height: 28, border: "2.5px solid var(--line)", borderTopColor: "var(--ink)", borderRadius: 999, animation: "spin 0.7s linear infinite" }} />
    </div>
  );

  const hasSliders = selectedGoals.length > 0;

  return (
    <div style={{ display: "flex", flexDirection: "row", minHeight: "100dvh", background: "var(--bg)" }}>
      <ProgressRail current="goals" savedAt={saving ? "Saving…" : savedAt} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <ClientBar section="goals" email={session?.client_email ?? undefined} />
        <MobileNav current="goals" savedAt={saving ? "Saving…" : savedAt} />
        <div className="br-scroll" style={{ flex: 1, overflowY: "auto", padding: "32px 56px" }}>
          <div style={{ maxWidth: 1040 }} className="br-fade-up">
            <Pill tone="neutral" size="sm">F · Targets</Pill>
            <h1 style={{ marginTop: 12, marginBottom: 8, fontSize: 32, fontWeight: 600, letterSpacing: "-0.025em", lineHeight: 1.1, fontFamily: "var(--font-sans)" }}>
              What does success look like?
            </h1>
            <p style={{ marginTop: 0, marginBottom: 24, fontSize: 16, color: "var(--ink-3)", lineHeight: 1.55 }}>
              Set numbers we'll actually report against. Rank them so we know where to spend first.
            </p>

            <div className="br-g-4" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginBottom: 24 }}>
              {GOAL_OPTIONS.map(({ id, icon, title, subtitle }) => (
                <SelectCard
                  key={id}
                  icon={icon}
                  title={title}
                  subtitle={subtitle}
                  active={selectedGoals.includes(id)}
                  onClick={() => toggleGoal(id)}
                />
              ))}
            </div>

            <div className="br-g-side" style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 16 }}>
              <Card padding={20}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
                  <div>
                    <div className="br-eyebrow">12-month targets</div>
                    <div style={{ fontSize: 16, fontWeight: 600, marginTop: 4, letterSpacing: "-0.01em" }}>Numbers we'll report against</div>
                  </div>
                  <Pill tone="ai" size="sm" icon="sparkle">Adjust freely</Pill>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
                  {!hasSliders && (
                    <div style={{ fontSize: 14, color: "var(--ink-4)", padding: "16px 0", textAlign: "center" }}>
                      Select goals above to set numeric targets.
                    </div>
                  )}

                  {selectedGoals.includes("new_clients") && (
                    <div>
                      <div style={{ fontSize: 13.5, fontWeight: 500, marginBottom: 6 }}>New clients / month</div>
                      <Slider
                        value={newClientsPerMonth}
                        min={5}
                        max={500}
                        step={5}
                        format={v => `+${v}`}
                        onChange={v => { setNewClientsPerMonth(v); autosave({ new_patients_per_month: v }); }}
                      />
                    </div>
                  )}

                  {selectedGoals.includes("revenue") && (
                    <div>
                      <div style={{ fontSize: 13.5, fontWeight: 500, marginBottom: 6 }}>Annual revenue target (ZAR)</div>
                      <Slider
                        value={annualRevenue}
                        min={0.5}
                        max={10}
                        step={0.1}
                        format={v => v >= 1 ? `R${v.toFixed(1)}M` : `R${(v * 1000).toFixed(0)}K`}
                        onChange={v => { setAnnualRevenue(v); autosave({ annual_revenue_usd: Math.round(v * 1_000_000) }); }}
                      />
                    </div>
                  )}

                  {selectedGoals.includes("roas") && (
                    <div>
                      <div style={{ fontSize: 13.5, fontWeight: 500, marginBottom: 6 }}>Blended ROAS target</div>
                      <Slider
                        value={blendedRoas}
                        min={1}
                        max={10}
                        step={0.1}
                        format={v => `${v.toFixed(1)}×`}
                        onChange={v => { setBlendedRoas(v); autosave({ blended_roas: v }); }}
                      />
                    </div>
                  )}

                  {selectedGoals.includes("reviews") && (
                    <div>
                      <div style={{ fontSize: 13.5, fontWeight: 500, marginBottom: 6 }}>Target Google star rating</div>
                      <Slider
                        value={reviewsTarget}
                        min={3.0}
                        max={5.0}
                        step={0.1}
                        format={v => `${v.toFixed(1)} ★`}
                        onChange={v => { setReviewsTarget(v); saveNumericTargets("reviews", v); }}
                      />
                    </div>
                  )}

                  {selectedGoals.includes("local_rank") && (
                    <div>
                      <div style={{ fontSize: 13.5, fontWeight: 500, marginBottom: 6 }}>Target local pack position</div>
                      <Slider
                        value={localRankTarget}
                        min={1}
                        max={10}
                        step={1}
                        format={v => `#${v}`}
                        onChange={v => { setLocalRankTarget(v); saveNumericTargets("local_rank", v); }}
                      />
                    </div>
                  )}

                  {selectedGoals.includes("reach") && (
                    <div>
                      <div style={{ fontSize: 13.5, fontWeight: 500, marginBottom: 6 }}>Monthly reach target</div>
                      <Slider
                        value={reachTarget}
                        min={1}
                        max={1000}
                        step={1}
                        format={v => v >= 1000 ? `${(v / 1000).toFixed(1)}M` : `${v}K`}
                        onChange={v => { setReachTarget(v); saveNumericTargets("reach", v); }}
                      />
                    </div>
                  )}

                  {selectedGoals.includes("location_fill") && (
                    <div>
                      <div style={{ fontSize: 13.5, fontWeight: 500, marginBottom: 6 }}>Schedule utilization target</div>
                      <Slider
                        value={locationFillPct}
                        min={10}
                        max={100}
                        step={1}
                        format={v => `${v}%`}
                        onChange={v => { setLocationFillPct(v); autosave({ williston_fill_pct: v }); }}
                      />
                    </div>
                  )}

                  {selectedGoals.includes("retention") && (
                    <div>
                      <div style={{ fontSize: 13.5, fontWeight: 500, marginBottom: 6 }}>Repeat client rate target</div>
                      <Slider
                        value={retentionTarget}
                        min={10}
                        max={100}
                        step={1}
                        format={v => `${v}%`}
                        onChange={v => { setRetentionTarget(v); saveNumericTargets("retention", v); }}
                      />
                    </div>
                  )}
                </div>
              </Card>

              <Card padding={20}>
                <div style={{ marginBottom: 14 }}>
                  <div className="br-eyebrow">Priority order</div>
                  <div style={{ fontSize: 16, fontWeight: 600, marginTop: 4, letterSpacing: "-0.01em" }}>Drag to rank</div>
                </div>
                <p className="br-cap" style={{ marginBottom: 14 }}>If we had to pick one to win at, it would be #1.</p>

                {prioritizedGoals.length === 0 ? (
                  <div style={{ fontSize: 14, color: "var(--ink-4)", padding: "16px 0", textAlign: "center" }}>
                    Select goals above to set priority order.
                  </div>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {prioritizedGoals.map((g, i) => (
                      <div
                        key={g.id}
                        draggable
                        onDragStart={() => handleDragStart(i)}
                        onDragEnter={() => handleDragEnter(i)}
                        onDragEnd={handleDragEnd}
                        onDragOver={e => e.preventDefault()}
                        style={{
                          display: "flex", alignItems: "center", gap: 10, padding: "10px 12px",
                          border: "1px solid var(--line)", borderRadius: 10, background: "var(--surface)",
                          boxShadow: "var(--shadow-1)", cursor: "grab",
                        }}
                      >
                        <Icon name="drag" size={16} color="var(--ink-5)" />
                        <div style={{
                          width: 26, height: 26, borderRadius: 7, flexShrink: 0,
                          background: i === 0 ? "var(--ink)" : "var(--surface-2)",
                          color: i === 0 ? "#fff" : "var(--ink-3)",
                          display: "grid", placeItems: "center", fontWeight: 600, fontSize: 13,
                          fontVariantNumeric: "tabular-nums",
                        }}>{i + 1}</div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: 13, fontWeight: 500 }}>{g.title}</div>
                          <div style={{ fontSize: 11.5, color: "var(--ink-4)" }}>{g.subtitle}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            </div>
          </div>
        </div>
        <StepFooter
          note={saving ? "Saving…" : savedAt ? `Autosaved · ${savedAt}` : `${selectedGoals.length} goals selected`}
          continueLabel="Continue to Review"
          onBack={() => router.push("/onboarding/strategy")}
          onContinue={handleContinue}
        />
      </div>
    </div>
  );
}
