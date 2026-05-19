import { notFound } from "next/navigation";
import Link from "next/link";
import { getSubmission } from "@/lib/actions/agency";
import { Icon } from "@/components/ui/Icon";
import { Pill } from "@/components/ui/Chip";
import { Card } from "@/components/ui/Card";
import { SubmissionActions } from "./SubmissionActions";
import type { AgencyStatus } from "@/lib/types";

const SERVICE_LABELS: Record<string, string> = {
  web: "Website design", ads: "Paid ads", seo: "SEO",
  brand: "Branding", content: "Content marketing", auto: "Automation / CRM",
};

const GOAL_LABELS: Record<string, string> = {
  new_clients: "New clients", revenue: "Revenue", roas: "Ad return",
  reviews: "Google reviews", local_rank: "Google ranking",
  reach: "Brand awareness", location_fill: "Keep diary full", retention: "Repeat customers",
};

function Row({ label, value }: { label: string; value: string | null | undefined }) {
  if (!value) return null;
  return (
    <div style={{ display: "contents" }}>
      <span className="br-mono" style={{ fontSize: 11, color: "var(--ink-5)", textTransform: "uppercase", letterSpacing: ".06em", paddingTop: 2 }}>{label}</span>
      <span style={{ fontSize: 13, color: "var(--ink-2)" }}>{value}</span>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Card padding={18}>
      <div style={{ fontSize: 12, fontWeight: 600, color: "var(--ink-4)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 12 }}>{title}</div>
      <div style={{ display: "grid", gridTemplateColumns: "130px 1fr", rowGap: 8, columnGap: 14 }}>
        {children}
      </div>
    </Card>
  );
}

function agencyStatusConfig(s: AgencyStatus | null) {
  if (!s)                    return { label: "New",           tone: "accent"  as const };
  if (s === "reviewed")      return { label: "Reviewed",      tone: "neutral" as const };
  if (s === "proposal_sent") return { label: "Proposal sent", tone: "warn"    as const };
  if (s === "won")           return { label: "Won",           tone: "ok"      as const };
  return                            { label: "Lost",          tone: "err"     as const };
}

export default async function SubmissionDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { session, snapshot, services, strategy, goals } = await getSubmission(id);
  if (!session) notFound();

  const { label: statusLabel, tone: statusTone } = agencyStatusConfig(session.agency_status as AgencyStatus | null);
  const serviceNames = (services?.selected_services ?? []).map((s: string) => SERVICE_LABELS[s] ?? s).join(", ");
  const goalNames = (goals?.selected_goals ?? []).map((g: string) => GOAL_LABELS[g] ?? g).join(", ");

  return (
    <div style={{ padding: "32px 40px", maxWidth: 860 }}>
      {/* Back */}
      <Link href="/agency/submissions" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, color: "var(--ink-4)", textDecoration: "none", marginBottom: 20 }}>
        <span style={{ display: "inline-flex", transform: "rotate(180deg)" }}><Icon name="arrow_right" size={13} /></span> Back to submissions
      </Link>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 28, gap: 16 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: "var(--ink)", margin: "0 0 4px", letterSpacing: "-0.025em" }}>
            {session.client_company ?? session.client_name ?? session.client_email}
          </h1>
          <div style={{ fontSize: 13, color: "var(--ink-4)" }}>
            {session.client_name && session.client_company ? `${session.client_name} · ` : ""}
            {session.client_email}
            {session.submitted_at ? ` · Submitted ${new Date(session.submitted_at).toLocaleDateString("en-ZA", { day: "numeric", month: "short", year: "numeric" })}` : ""}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
          {session.quality_score != null && (
            <div style={{ textAlign: "center" }}>
              <div className="br-mono" style={{ fontSize: 22, fontWeight: 700, color: session.quality_score >= 80 ? "var(--ok)" : "var(--warn)", letterSpacing: "-0.02em" }}>{session.quality_score}</div>
              <div style={{ fontSize: 10, color: "var(--ink-5)" }}>/ 100</div>
            </div>
          )}
          <Pill tone={statusTone} size="md">{statusLabel}</Pill>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 16, alignItems: "start" }}>
        {/* Left: section data */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <Section title="Business snapshot">
            <Row label="Type"     value={snapshot?.business_type} />
            <Row label="Industry" value={snapshot?.industry} />
            <Row label="HQ"       value={snapshot?.headquarters} />
            <Row label="Size"     value={snapshot?.company_size ? `${snapshot.company_size} people` : null} />
            <Row label="Stage"    value={snapshot?.revenue_stage} />
            <Row label="Goal"     value={snapshot?.primary_goal} />
          </Section>

          <Section title="Services">
            <Row label="Selected" value={serviceNames || "—"} />
            <Row label="Budget"   value={services?.monthly_budget_usd ? `R${services.monthly_budget_usd.toLocaleString()}/mo` : null} />
            <Row label="Website"  value={services?.has_existing_website === true ? (services.website_url ?? "Yes") : services?.has_existing_website === false ? "No" : null} />
            <Row label="Platform" value={services?.website_platform} />
            <Row label="Ad platforms" value={(services?.ad_platforms ?? []).join(", ") || null} />
            <Row label="CRM"      value={services?.has_crm ? (services.crm_name ?? "Yes") : services?.has_crm === false ? "None" : null} />
          </Section>

          <Section title="Strategy">
            <Row label="Description" value={strategy?.business_description} />
            <Row label="ICP" value={(strategy?.icp_demographics ?? []).slice(0, 3).join(", ") || null} />
            <Row label="Location" value={(strategy?.icp_geography ?? []).join(", ") || null} />
            <Row label="Mindset" value={(strategy?.icp_mindset ?? []).slice(0, 2).join(", ") || null} />
            <Row label="Triggers" value={(strategy?.icp_triggers ?? []).slice(0, 2).join(", ") || null} />
            <Row label="Competitors" value={(strategy?.competitors ?? []).map((c: { name: string }) => c.name).join(", ") || null} />
            <Row label="Constraints" value={(strategy?.growth_constraints ?? []).slice(0, 2).join(", ") || null} />
          </Section>

          <Section title="Goals">
            <Row label="Goals"    value={goalNames || "—"} />
            <Row label="Top goal" value={(goals?.priority_order ?? [])[0] ? (GOAL_LABELS[(goals?.priority_order ?? [])[0]] ?? (goals?.priority_order ?? [])[0]) : null} />
            <Row label="New clients" value={goals?.new_patients_per_month ? `+${goals.new_patients_per_month}/mo` : null} />
            <Row label="Revenue" value={goals?.annual_revenue_usd ? `R${(goals.annual_revenue_usd / 1_000_000).toFixed(1)}M/yr` : null} />
          </Section>
        </div>

        {/* Right: actions */}
        <SubmissionActions sessionId={session.id} currentStatus={session.agency_status as AgencyStatus | null} />
      </div>
    </div>
  );
}
