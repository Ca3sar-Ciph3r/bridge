"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ProgressRail } from "@/components/layout/ProgressRail";
import { ClientBar } from "@/components/layout/ClientBar";
import { AICallout } from "@/components/layout/AICallout";
import { Pill } from "@/components/ui/Chip";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { MobileNav } from "@/components/layout/MobileNav";
import { getOrCreateSession, getAllSectionData, submitOnboarding } from "@/lib/actions/session";
import type { OnboardingSession, Competitor } from "@/lib/types";
// Competitor used in strategyItems map below

const SERVICE_LABELS: Record<string, string> = {
  web: "Website design",
  ads: "Paid ads",
  seo: "SEO",
  brand: "Branding",
  content: "Content marketing",
  auto: "Automation / CRM",
};

const GOAL_LABELS: Record<string, string> = {
  new_clients: "New clients",
  revenue: "Revenue",
  roas: "ROAS",
  reviews: "Reviews",
  local_rank: "Local rank",
  reach: "Reach",
  location_fill: "Location fill",
  retention: "Retention",
};

function ReviewSection({ title, section, items, warn, editPath }: {
  title: string; section: string; items: [string, string][]; warn?: number; editPath: string;
}) {
  return (
    <Card padding={18}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
        <span className="br-mono" style={{ fontSize: 11, color: "var(--ink-5)", letterSpacing: ".06em" }}>SECTION {section}</span>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 15, fontWeight: 600, letterSpacing: "-0.01em" }}>{title}</div>
        </div>
        {warn ? <Pill tone="warn" size="sm" icon="alert">{warn} to confirm</Pill> : <Pill tone="ok" size="sm" icon="check">Looks right</Pill>}
        <Link href={editPath} style={{ fontSize: 12, color: "var(--accent)", fontWeight: 500, textDecoration: "none" }}>Edit</Link>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "140px 1fr", rowGap: 8, columnGap: 14 }}>
        {items.map(([k, v]) => (
          <span key={k} style={{ display: "contents" }}>
            <span className="br-mono" style={{ fontSize: 11, color: "var(--ink-5)", textTransform: "uppercase", letterSpacing: ".06em", paddingTop: 2 }}>{k}</span>
            <span style={{ fontSize: 13, color: "var(--ink-2)" }}>{v || "—"}</span>
          </span>
        ))}
      </div>
    </Card>
  );
}

function computeQualityScore(data: Awaited<ReturnType<typeof getAllSectionData>>) {
  const snap = data?.snapshot;
  const svc = data?.services;
  const strat = data?.strategy;
  const goals = data?.goals;

  let score = 0;

  // Business profile: 30 pts
  if (snap?.business_type) score += 6;
  if (snap?.industry) score += 6;
  if (snap?.headquarters) score += 6;
  if (snap?.company_size) score += 6;
  if (snap?.revenue_stage) score += 6;

  // Service scope: 25 pts
  if ((svc?.selected_services?.length ?? 0) >= 1) score += 10;
  if ((svc?.selected_services?.length ?? 0) >= 2) score += 5;
  if (svc?.monthly_budget_usd) score += 10;

  // Strategy quality: 30 pts
  if ((strat?.business_description?.length ?? 0) > 50) score += 10;
  if ((strat?.icp_demographics?.length ?? 0) > 0) score += 6;
  if ((strat?.icp_geography?.length ?? 0) > 0) score += 4;
  if ((strat?.competitors?.length ?? 0) > 0) score += 6;
  if ((strat?.growth_constraints?.length ?? 0) > 0) score += 4;

  // Goals: 15 pts
  if ((goals?.selected_goals?.length ?? 0) >= 1) score += 5;
  const nt = goals?.numeric_targets ?? {};
  const hasNumericTarget =
    goals?.new_patients_per_month != null ||
    goals?.annual_revenue_usd != null ||
    goals?.blended_roas != null ||
    goals?.williston_fill_pct != null ||
    Object.keys(nt).length > 0;
  if (hasNumericTarget) score += 5;
  if ((goals?.priority_order?.length ?? 0) >= 1) score += 5;

  return Math.min(score, 100);
}

type SectionScore = { label: string; score: number; max: number; tone: "ok" | "warn" };

function computeSectionScores(data: Awaited<ReturnType<typeof getAllSectionData>>): SectionScore[] {
  const snap = data?.snapshot;
  const svc = data?.services;
  const strat = data?.strategy;
  const goals = data?.goals;

  const snapScore = [snap?.business_type, snap?.industry, snap?.headquarters, snap?.company_size, snap?.revenue_stage].filter(Boolean).length * 6;
  const svcScore = Math.min(
    ((svc?.selected_services?.length ?? 0) >= 1 ? 10 : 0) +
    ((svc?.selected_services?.length ?? 0) >= 2 ? 5 : 0) +
    (svc?.monthly_budget_usd ? 10 : 0), 25);
  const stratScore = Math.min(
    ((strat?.business_description?.length ?? 0) > 50 ? 10 : 0) +
    ((strat?.icp_demographics?.length ?? 0) > 0 ? 6 : 0) +
    ((strat?.icp_geography?.length ?? 0) > 0 ? 4 : 0) +
    ((strat?.competitors?.length ?? 0) > 0 ? 6 : 0) +
    ((strat?.growth_constraints?.length ?? 0) > 0 ? 4 : 0), 30);
  const goalScore = Math.min(
    ((goals?.selected_goals?.length ?? 0) >= 1 ? 5 : 0) +
    (goals?.new_patients_per_month != null || goals?.annual_revenue_usd != null ? 5 : 0) +
    ((goals?.priority_order?.length ?? 0) >= 1 ? 5 : 0), 15);

  return [
    { label: "Snapshot",  score: snapScore,  max: 30, tone: snapScore >= 24 ? "ok" : "warn" },
    { label: "Services",  score: svcScore,   max: 25, tone: svcScore >= 15 ? "ok" : "warn" },
    { label: "Strategy",  score: stratScore, max: 30, tone: stratScore >= 20 ? "ok" : "warn" },
    { label: "Goals",     score: goalScore,  max: 15, tone: goalScore >= 10 ? "ok" : "warn" },
  ];
}

export default function ReviewPage() {
  const router = useRouter();
  const [session, setSession] = useState<OnboardingSession | null>(null);
  const [allData, setAllData] = useState<Awaited<ReturnType<typeof getAllSectionData>> | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const sessionRef = useRef<OnboardingSession | null>(null);

  useEffect(() => {
    async function load() {
      const sess = await getOrCreateSession();
      if (!sess) { router.push("/"); return; }
      setSession(sess);
      sessionRef.current = sess;
      const data = await getAllSectionData(sess.id);
      setAllData(data);
      setLoading(false);
    }
    load();
  }, [router]);

  async function handleSubmit() {
    const sess = sessionRef.current;
    if (!sess) return;
    setSubmitting(true);
    await submitOnboarding(sess.id);
    router.push("/complete");
  }

  if (loading) return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100dvh", background: "var(--bg)" }}>
      <div style={{ width: 28, height: 28, border: "2.5px solid var(--line)", borderTopColor: "var(--ink)", borderRadius: 999, animation: "spin 0.7s linear infinite" }} />
    </div>
  );

  const snap = allData?.snapshot;
  const svc = allData?.services;
  const strat = allData?.strategy;
  const goals = allData?.goals;

  const qualityScore = allData ? computeQualityScore(allData) : 0;
  const sectionScores = allData ? computeSectionScores(allData) : [];

  const serviceNames = (svc?.selected_services ?? []).map((id: string) => SERVICE_LABELS[id] ?? id).join(", ");
  const goalNames = (goals?.selected_goals ?? []).map((id: string) => GOAL_LABELS[id] ?? id).join(", ");
  const topGoalId = goals?.priority_order?.[0];
  const topGoalLabel = topGoalId ? (GOAL_LABELS[topGoalId] ?? topGoalId) : "";
  const nt = goals?.numeric_targets ?? {};

  const snapshotItems: [string, string][] = [
    ["Type",     snap?.business_type ?? ""],
    ["Industry", snap?.industry ?? ""],
    ["HQ",       snap?.headquarters ?? ""],
    ["Size",     snap?.company_size ? `${snap.company_size} people` : ""],
    ["Stage",    snap?.revenue_stage ?? ""],
    ["Goal",     snap?.primary_goal ?? ""],
  ];

  const servicesItems: [string, string][] = [
    ["Selected", serviceNames || "—"],
    ["Budget",   svc?.monthly_budget_usd ? `R${svc.monthly_budget_usd.toLocaleString()}/mo` : "Not specified"],
    ["Tracking", [svc?.tracking_ga4 && "GA4", svc?.tracking_gtm && "GTM", svc?.tracking_pixel && "Pixel"].filter(Boolean).join(" · ") || "None"],
    ["CRM",      svc?.has_crm ? (svc.crm_name ?? "Yes") : svc?.has_crm === false ? "None" : "Not specified"],
  ];

  const strategyItems: [string, string][] = [
    ["ICP",         (strat?.icp_demographics ?? []).slice(0, 2).join(", ")],
    ["Geography",   (strat?.icp_geography ?? []).join(", ")],
    ["Competitors", (strat?.competitors ?? []).map((c: Competitor) => c.name).join(", ")],
    ["Constraints", (strat?.growth_constraints ?? []).slice(0, 2).join(", ")],
  ];

  const revenueZAR = goals?.annual_revenue_usd ? `R${(goals.annual_revenue_usd / 1_000_000).toFixed(1)}M` : "";
  const goalsItems: [string, string][] = [
    ["Goals",        goalNames || "—"],
    ["Top priority", topGoalLabel],
    ["New clients",  goals?.new_patients_per_month ? `+${goals.new_patients_per_month}/mo` : ""],
    ["Revenue",      revenueZAR],
    ["ROAS",         goals?.blended_roas ? `${goals.blended_roas.toFixed(1)}×` : ""],
    ["Star rating",  nt["reviews"] ? `${nt["reviews"].toFixed(1)} ★` : ""],
  ].filter(([, v]) => v !== "") as [string, string][];

  return (
    <div style={{ display: "flex", flexDirection: "row", minHeight: "100dvh", background: "var(--bg)" }}>
      <ProgressRail current="review" />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <ClientBar section="review" email={session?.client_email ?? undefined} />
        <MobileNav current="review" />
        <div className="br-scroll" style={{ flex: 1, overflowY: "auto", padding: "32px 56px" }}>
          <div style={{ maxWidth: 1080 }} className="br-fade-up">
            <Pill tone="neutral" size="sm">G · Confirmation</Pill>
            <h1 style={{ marginTop: 12, marginBottom: 8, fontSize: 32, fontWeight: 600, letterSpacing: "-0.025em", lineHeight: 1.1, fontFamily: "var(--font-sans)" }}>
              Here's how we understand your business.
            </h1>
            <p style={{ marginTop: 0, marginBottom: 20, fontSize: 16, color: "var(--ink-3)", lineHeight: 1.55 }}>
              Read it like we'd say it back to you. Edit anything that's off — then send it through.
            </p>

            <AICallout title="Bridge summary">
              {snap?.business_type && svc?.selected_services?.length ? (
                <>
                  <p style={{ margin: "0 0 8px 0", color: "var(--ink)", fontSize: 14, lineHeight: 1.6 }}>
                    A <strong>{snap.business_type}</strong> business{snap.industry ? ` in ${snap.industry}` : ""}{snap.headquarters ? `, based in ${snap.headquarters}` : ""}.
                    {snap.revenue_stage && ` Currently at the ${snap.revenue_stage} stage.`}
                  </p>
                  <p style={{ margin: "0 0 8px 0", color: "var(--ink)", fontSize: 14, lineHeight: 1.6 }}>
                    Scoping <strong>{serviceNames}</strong>
                    {svc.monthly_budget_usd ? ` with a R${svc.monthly_budget_usd.toLocaleString()}/mo ad budget` : ""}.
                    {snap.primary_goal && ` Primary goal: ${snap.primary_goal}.`}
                  </p>
                  {topGoalLabel && (
                    <p style={{ margin: 0, color: "var(--ink)", fontSize: 14, lineHeight: 1.6 }}>
                      Top priority: <strong>{topGoalLabel}</strong>
                      {goals?.new_patients_per_month ? ` — targeting +${goals.new_patients_per_month} new clients/month` : ""}
                      {revenueZAR ? `, ${revenueZAR} revenue target` : ""}.
                    </p>
                  )}
                </>
              ) : (
                <p style={{ margin: 0, color: "var(--ink-3)", fontSize: 14 }}>
                  Complete the earlier sections to see your AI-generated summary here.
                </p>
              )}
            </AICallout>

            <div className="br-g-side" style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 16, marginTop: 16 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <ReviewSection title="Business Snapshot" section="A" items={snapshotItems} editPath="/onboarding/snapshot" />
                <ReviewSection title="Services" section="B" items={servicesItems} editPath="/onboarding/services" />
                <ReviewSection title="Strategy & ICP" section="C" items={strategyItems} warn={!strat?.business_description ? 1 : undefined} editPath="/onboarding/strategy" />
                <ReviewSection title="Goals" section="D" items={goalsItems} editPath="/onboarding/goals" />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <Card padding={20}>
                  <div className="br-eyebrow" style={{ marginBottom: 4 }}>Completion quality</div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 14 }}>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: 38, fontWeight: 600, letterSpacing: "-0.03em", fontVariantNumeric: "tabular-nums" }}>
                      {qualityScore}
                    </span>
                    <span style={{ fontSize: 14, color: "var(--ink-4)" }}>/ 100</span>
                    <Pill tone={qualityScore >= 80 ? "ok" : "warn"} size="sm" icon={qualityScore >= 80 ? "check" : "alert"} style={{ marginLeft: "auto" }}>
                      {qualityScore >= 80 ? "Proposal-ready" : "Needs more info"}
                    </Pill>
                  </div>
                  <div style={{ height: 6, borderRadius: 999, background: "var(--surface-3)", overflow: "hidden", marginBottom: 14 }}>
                    <div style={{ height: "100%", width: `${qualityScore}%`, background: "linear-gradient(90deg, var(--accent) 0%, var(--ok) 100%)", borderRadius: 999, transition: "width .5s ease" }} />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 12.5 }}>
                    {sectionScores.map(({ label, score, max, tone }) => (
                      <div key={label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{ flex: 1, color: "var(--ink-3)" }}>{label}</span>
                        <div style={{ width: 80, height: 4, borderRadius: 999, background: "var(--surface-3)", overflow: "hidden" }}>
                          <div style={{ height: "100%", width: `${Math.round((score / max) * 100)}%`, background: tone === "ok" ? "var(--ok)" : "var(--warn)", transition: "width .5s ease" }} />
                        </div>
                        <span className="br-mono" style={{ fontSize: 11, color: "var(--ink-4)", width: 40, textAlign: "right", fontVariantNumeric: "tabular-nums" }}>{score}/{max}</span>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card padding={20}>
                  <div className="br-eyebrow" style={{ marginBottom: 10 }}>What happens when you submit</div>
                  <p style={{ margin: 0, fontSize: 14, lineHeight: 1.65, color: "var(--ink-2)" }}>
                    Once you submit, your business information will be handed directly to{" "}
                    <strong>Luke Gunn</strong>, who'll be managing your account. Luke will review everything
                    you've shared, put together a tailored strategy, and reach out to you with next steps.
                    It's that personal — no bots, no hand-off queue.
                  </p>
                </Card>

                <Button variant="accent" size="lg" full iconRight="arrow_right" onClick={handleSubmit} loading={submitting}>
                  Submit
                </Button>
                <div style={{ fontSize: 11.5, color: "var(--ink-5)", textAlign: "center" }}>
                  Luke will be in touch shortly after you submit.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
