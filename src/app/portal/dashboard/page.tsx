import Link from "next/link";
import { getPortalDashboardData } from "@/lib/actions/portal";
import { Icon } from "@/components/ui/Icon";
import { Pill } from "@/components/ui/Chip";
import { Card } from "@/components/ui/Card";
import type { Project, Invoice, Deliverable } from "@/lib/types";

// ── Helpers ──────────────────────────────────────────────────────────────────

function formatCurrency(amount: number | null, currency = "ZAR"): string {
  if (amount === null) return "—";
  return `R${amount.toLocaleString("en-ZA")}`;
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-ZA", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function retainerStatusTone(
  status: "active" | "paused" | "cancelled"
): "ok" | "warn" | "err" {
  if (status === "active") return "ok";
  if (status === "paused") return "warn";
  return "err";
}

function invoiceStatusTone(
  status: Invoice["status"]
): "ok" | "warn" | "err" | "neutral" {
  if (status === "paid") return "ok";
  if (status === "pending") return "warn";
  if (status === "overdue") return "err";
  return "neutral";
}

function projectStatusTone(
  status: Project["status"]
): "ok" | "warn" | "accent" | "neutral" {
  if (status === "in_progress") return "accent";
  if (status === "upcoming") return "warn";
  return "ok";
}

function projectStatusLabel(status: Project["status"]): string {
  if (status === "in_progress") return "In progress";
  if (status === "upcoming") return "Upcoming";
  return "Completed";
}

// ── Sub-components ────────────────────────────────────────────────────────────

function StatBox({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        flex: 1,
        minWidth: 0,
        padding: "16px 20px",
        background: "var(--surface)",
        border: "1px solid var(--line)",
        borderRadius: 12,
        boxShadow: "var(--shadow-1)",
      }}
    >
      <div
        style={{
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          color: "var(--ink-4)",
          marginBottom: 8,
        }}
      >
        {label}
      </div>
      {children}
    </div>
  );
}

function SectionHeader({ title }: { title: string }) {
  return (
    <div
      style={{
        fontSize: 13,
        fontWeight: 600,
        color: "var(--ink-2)",
        letterSpacing: "-0.01em",
        marginBottom: 12,
        paddingBottom: 10,
        borderBottom: "1px solid var(--line)",
      }}
    >
      {title}
    </div>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div
      style={{
        padding: "24px 20px",
        textAlign: "center",
        color: "var(--ink-4)",
        fontSize: 13.5,
        background: "var(--surface)",
        border: "1px solid var(--line)",
        borderRadius: 12,
      }}
    >
      {message}
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default async function DashboardPage() {
  const { client, deliverables, projects, invoices } =
    await getPortalDashboardData();

  // No client record yet
  if (!client) {
    return (
      <div style={{ padding: "32px 40px", maxWidth: 680 }}>
        <div
          className="br-fade-up"
          style={{ display: "flex", flexDirection: "column", gap: 6 }}
        >
          <span
            style={{
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--accent)",
            }}
          >
            Dashboard
          </span>
          <h1
            style={{
              fontSize: 26,
              fontWeight: 700,
              color: "var(--ink)",
              margin: 0,
              letterSpacing: "-0.03em",
            }}
          >
            Welcome to your portal
          </h1>
          <p style={{ fontSize: 14.5, color: "var(--ink-3)", margin: 0 }}>
            Your client dashboard is being prepared.
          </p>
        </div>

        <Card padding={28} style={{ marginTop: 32 }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                background: "var(--accent-soft)",
                display: "grid",
                placeItems: "center",
                flexShrink: 0,
              }}
            >
              <Icon name="sparkle" size={20} color="var(--accent)" />
            </div>
            <div>
              <div
                style={{
                  fontSize: 15,
                  fontWeight: 600,
                  color: "var(--ink)",
                  marginBottom: 6,
                  letterSpacing: "-0.01em",
                }}
              >
                Your portal is being set up
              </div>
              <p
                style={{
                  fontSize: 13.5,
                  color: "var(--ink-3)",
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                We&apos;re putting the finishing touches on your client portal.
                Once everything is ready you&apos;ll see your projects, reports,
                invoices, and deliverables here. If you have any questions in
                the meantime, reach out to your account manager directly.
              </p>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  // Derived data
  const activeProjects = projects
    .filter((p) => p.status === "in_progress" || p.status === "upcoming")
    .slice(0, 3);

  const pendingCount = deliverables.filter(
    (d: Deliverable) => d.status === "pending"
  ).length;

  const recentInvoice = invoices.length > 0 ? invoices[0] : null;

  const retainerLabel =
    client.retainer_status.charAt(0).toUpperCase() +
    client.retainer_status.slice(1);

  return (
    <div style={{ padding: "32px 40px", maxWidth: 900 }}>
      {/* Header */}
      <div
        className="br-fade-up"
        style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 32 }}
      >
        <span
          style={{
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "var(--accent)",
          }}
        >
          Dashboard
        </span>
        <h1
          style={{
            fontSize: 26,
            fontWeight: 700,
            color: "var(--ink)",
            margin: 0,
            letterSpacing: "-0.03em",
          }}
        >
          {client.company_name ?? client.name ?? "Your portal"}
        </h1>
        <p style={{ fontSize: 14.5, color: "var(--ink-3)", margin: 0 }}>
          Here&apos;s a summary of your current activity and account status.
        </p>
      </div>

      {/* Stats row */}
      <div
        style={{
          display: "flex",
          gap: 12,
          marginBottom: 36,
          flexWrap: "wrap",
        }}
      >
        <StatBox label="Retainer status">
          <Pill tone={retainerStatusTone(client.retainer_status)} size="md">
            {retainerLabel}
          </Pill>
        </StatBox>

        <StatBox label="Monthly retainer">
          <div
            style={{
              fontSize: 20,
              fontWeight: 700,
              color: "var(--ink)",
              letterSpacing: "-0.03em",
            }}
          >
            {client.retainer_amount !== null
              ? `${formatCurrency(client.retainer_amount)}/mo`
              : "—"}
          </div>
        </StatBox>

        <StatBox label="Client since">
          <div
            style={{
              fontSize: 15,
              fontWeight: 600,
              color: "var(--ink)",
              letterSpacing: "-0.01em",
            }}
          >
            {formatDate(client.start_date)}
          </div>
        </StatBox>

        {client.package && (
          <StatBox label="Package">
            <div
              style={{
                fontSize: 15,
                fontWeight: 600,
                color: "var(--ink)",
                letterSpacing: "-0.01em",
              }}
            >
              {client.package}
            </div>
          </StatBox>
        )}
      </div>

      {/* Active projects */}
      <div style={{ marginBottom: 32 }}>
        <SectionHeader title="Active projects" />
        {activeProjects.length === 0 ? (
          <EmptyState message="No active projects right now. New work will appear here when it kicks off." />
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {activeProjects.map((project) => (
              <div
                key={project.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  padding: "14px 18px",
                  background: "var(--surface)",
                  border: "1px solid var(--line)",
                  borderRadius: 12,
                  boxShadow: "var(--shadow-1)",
                }}
              >
                <div
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: 8,
                    background: "var(--surface-2)",
                    display: "grid",
                    placeItems: "center",
                    flexShrink: 0,
                    border: "1px solid var(--line)",
                  }}
                >
                  <Icon name="layers" size={16} color="var(--ink-3)" />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: 14,
                      fontWeight: 600,
                      color: "var(--ink)",
                      letterSpacing: "-0.01em",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {project.title}
                  </div>
                  {project.due_date && (
                    <div
                      style={{ fontSize: 12, color: "var(--ink-4)", marginTop: 2 }}
                    >
                      Due {formatDate(project.due_date)}
                    </div>
                  )}
                </div>
                <Pill tone={projectStatusTone(project.status)} size="sm">
                  {projectStatusLabel(project.status)}
                </Pill>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Pending deliverables */}
      <div style={{ marginBottom: 32 }}>
        <SectionHeader title="Pending deliverables" />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            padding: "16px 18px",
            background: "var(--surface)",
            border: "1px solid var(--line)",
            borderRadius: 12,
            boxShadow: "var(--shadow-1)",
          }}
        >
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: 8,
              background:
                pendingCount > 0 ? "var(--warn-soft)" : "var(--surface-2)",
              display: "grid",
              placeItems: "center",
              flexShrink: 0,
              border: "1px solid var(--line)",
            }}
          >
            <Icon
              name="star"
              size={16}
              color={pendingCount > 0 ? "var(--warn)" : "var(--ink-4)"}
            />
          </div>
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontSize: 14,
                fontWeight: 600,
                color: "var(--ink)",
                letterSpacing: "-0.01em",
              }}
            >
              {pendingCount > 0
                ? `${pendingCount} deliverable${pendingCount === 1 ? "" : "s"} awaiting your review`
                : "All deliverables reviewed"}
            </div>
            <div style={{ fontSize: 12, color: "var(--ink-4)", marginTop: 2 }}>
              Approve or request changes on the deliverables page
            </div>
          </div>
          <Link
            href="/portal/deliverables"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 5,
              fontSize: 13,
              fontWeight: 500,
              color: "var(--accent)",
              textDecoration: "none",
            }}
          >
            View all
            <Icon name="arrow_right" size={14} color="var(--accent)" />
          </Link>
        </div>
      </div>

      {/* Recent invoice */}
      <div>
        <SectionHeader title="Recent invoice" />
        {recentInvoice === null ? (
          <EmptyState message="No invoices have been issued yet." />
        ) : (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              padding: "16px 18px",
              background: "var(--surface)",
              border: "1px solid var(--line)",
              borderRadius: 12,
              boxShadow: "var(--shadow-1)",
            }}
          >
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: 8,
                background: "var(--surface-2)",
                display: "grid",
                placeItems: "center",
                flexShrink: 0,
                border: "1px solid var(--line)",
              }}
            >
              <Icon name="file" size={16} color="var(--ink-3)" />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 2,
                }}
              >
                <span
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: "var(--ink)",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {recentInvoice.invoice_number}
                </span>
                <Pill tone={invoiceStatusTone(recentInvoice.status)} size="sm">
                  {recentInvoice.status.charAt(0).toUpperCase() +
                    recentInvoice.status.slice(1)}
                </Pill>
              </div>
              <div style={{ fontSize: 12, color: "var(--ink-4)" }}>
                {formatCurrency(recentInvoice.amount, recentInvoice.currency)}
                {recentInvoice.due_date
                  ? ` · Due ${formatDate(recentInvoice.due_date)}`
                  : ""}
              </div>
            </div>
            <Link
              href="/portal/invoices"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 5,
                fontSize: 13,
                fontWeight: 500,
                color: "var(--accent)",
                textDecoration: "none",
              }}
            >
              All invoices
              <Icon name="arrow_right" size={14} color="var(--accent)" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
