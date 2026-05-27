import { getReports } from "@/lib/actions/portal";
import { Icon } from "@/components/ui/Icon";
import { Card } from "@/components/ui/Card";
import type { Report } from "@/lib/types";

// ── Helpers ──────────────────────────────────────────────────────────────────

function formatMonth(monthStr: string): string {
  // month is stored as YYYY-MM or YYYY-MM-DD
  const [year, month] = monthStr.split("-");
  const date = new Date(Number(year), Number(month) - 1, 1);
  return date.toLocaleDateString("en-ZA", { month: "long", year: "numeric" });
}

function truncate(text: string | null, max: number): string {
  if (!text) return "";
  if (text.length <= max) return text;
  return text.slice(0, max).trimEnd() + "…";
}

function metricsCount(metrics: Record<string, unknown>): number {
  return Object.keys(metrics).length;
}

// ── Sub-components ────────────────────────────────────────────────────────────

function ReportCard({ report }: { report: Report }) {
  const count = metricsCount(report.metrics);
  const summary = truncate(report.summary, 120);

  return (
    <Card padding={22}>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {/* Month + metrics count */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
          }}
        >
          <span
            style={{
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: "var(--accent)",
            }}
          >
            {formatMonth(report.month)}
          </span>
          {count > 0 && (
            <span
              style={{
                fontSize: 11,
                color: "var(--ink-4)",
                fontWeight: 500,
                display: "inline-flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              <Icon name="bolt" size={12} color="var(--ink-4)" />
              {count} metric{count === 1 ? "" : "s"}
            </span>
          )}
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: 16,
            fontWeight: 700,
            color: "var(--ink)",
            letterSpacing: "-0.02em",
            lineHeight: 1.35,
          }}
        >
          {report.title ?? formatMonth(report.month)}
        </div>

        {/* Summary */}
        {summary && (
          <p
            style={{
              fontSize: 13.5,
              color: "var(--ink-3)",
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            {summary}
          </p>
        )}

        {/* Divider + meta row */}
        <div
          style={{
            paddingTop: 10,
            borderTop: "1px solid var(--line)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <Icon name="file" size={13} color="var(--ink-4)" />
            <span style={{ fontSize: 12, color: "var(--ink-4)" }}>
              Added{" "}
              {new Date(report.created_at).toLocaleDateString("en-ZA", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </span>
          </div>
          {report.pdf_url && (
            <a
              href={report.pdf_url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                padding: "6px 14px", background: "var(--ink)", color: "#fff",
                borderRadius: 8, textDecoration: "none", fontSize: 12.5, fontWeight: 600,
                flexShrink: 0,
              }}
            >
              <Icon name="file" size={13} color="#fff" />
              Download PDF
            </a>
          )}
        </div>
      </div>
    </Card>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default async function ReportsPage() {
  const reports = await getReports();

  return (
    <div style={{ padding: "32px 40px", maxWidth: 820 }}>
      {/* Header */}
      <div
        className="br-fade-up"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 6,
          marginBottom: 36,
        }}
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
          Reports
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
          Monthly performance
        </h1>
        <p style={{ fontSize: 14.5, color: "var(--ink-3)", margin: 0 }}>
          A new report is added each month summarising your campaign results and
          key metrics.
        </p>
      </div>

      {/* List or empty state */}
      {reports.length === 0 ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 14,
            padding: "56px 24px",
            background: "var(--surface)",
            border: "1px solid var(--line)",
            borderRadius: 16,
            textAlign: "center",
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 12,
              background: "var(--surface-2)",
              display: "grid",
              placeItems: "center",
              border: "1px solid var(--line)",
            }}
          >
            <Icon name="bolt" size={22} color="var(--ink-4)" />
          </div>
          <div>
            <div
              style={{
                fontSize: 15,
                fontWeight: 600,
                color: "var(--ink-2)",
                marginBottom: 6,
                letterSpacing: "-0.01em",
              }}
            >
              No reports yet
            </div>
            <p
              style={{
                fontSize: 13.5,
                color: "var(--ink-4)",
                lineHeight: 1.6,
                margin: 0,
                maxWidth: 380,
              }}
            >
              Your first report will appear here once your campaign has been
              live for a full month.
            </p>
          </div>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {reports.map((report) => (
            <ReportCard key={report.id} report={report} />
          ))}
        </div>
      )}
    </div>
  );
}
