import { notFound } from "next/navigation";
import Link from "next/link";
import { getAgencyClient } from "@/lib/actions/agency";
import { Icon } from "@/components/ui/Icon";
import { Pill } from "@/components/ui/Chip";
import { ClientEditor } from "./ClientEditor";

function formatDate(d: string | null) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("en-ZA", { day: "numeric", month: "short", year: "numeric" });
}

function StatTile({ label, value }: { label: string; value: string | number }) {
  return (
    <div style={{ padding: "14px 16px", background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 10 }}>
      <div style={{ fontSize: 10, fontWeight: 600, color: "var(--ink-5)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>{label}</div>
      <div style={{ fontSize: 20, fontWeight: 700, color: "var(--ink)", letterSpacing: "-0.02em" }}>{value}</div>
    </div>
  );
}

export default async function ClientDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { client, projects, invoices, deliverables, reports } = await getAgencyClient(id);
  if (!client) notFound();

  const retainerTone = client.retainer_status === "active" ? "ok" : client.retainer_status === "paused" ? "warn" : "err";

  return (
    <div style={{ padding: "32px 40px", maxWidth: 860 }}>
      {/* Back */}
      <Link href="/agency/clients" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, color: "var(--ink-4)", textDecoration: "none", marginBottom: 20 }}>
        <span style={{ display: "inline-flex", transform: "rotate(180deg)" }}><Icon name="arrow_right" size={13} /></span> Back to clients
      </Link>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 28 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: "var(--ink)", margin: "0 0 4px", letterSpacing: "-0.025em" }}>
            {client.company_name ?? client.name ?? client.email}
          </h1>
          <div style={{ fontSize: 13, color: "var(--ink-4)" }}>
            {client.company_name && client.name ? `${client.name} · ` : ""}
            {client.email}
            {client.start_date ? ` · Client since ${formatDate(client.start_date)}` : ""}
          </div>
        </div>
        <Pill tone={retainerTone} size="md">
          {client.retainer_status.charAt(0).toUpperCase() + client.retainer_status.slice(1)}
        </Pill>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginBottom: 28 }}>
        <StatTile label="Projects"     value={projects.length} />
        <StatTile label="Invoices"     value={invoices.length} />
        <StatTile label="Deliverables" value={deliverables.length} />
        <StatTile label="Reports"      value={reports.length} />
      </div>

      {/* Editor */}
      <ClientEditor client={client} />

      {/* Portal link */}
      {client.retainer_status === "active" && (
        <div style={{ marginTop: 20, padding: "14px 16px", background: "var(--ok-soft)", border: "1px solid var(--ok)", borderRadius: 12 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "var(--ok-ink)", marginBottom: 4 }}>Portal URL to share with client</div>
          <div className="br-mono" style={{ fontSize: 12.5, color: "var(--ink-2)" }}>
            {process.env.NEXT_PUBLIC_SUPABASE_URL?.replace("https://pchnmikhxwrgexhzwolf.supabase.co", "") || ""}
            /portal/dashboard
          </div>
          <div style={{ fontSize: 12, color: "var(--ink-4)", marginTop: 4 }}>
            They sign in at the home page — the portal loads automatically once authenticated.
          </div>
        </div>
      )}
    </div>
  );
}
