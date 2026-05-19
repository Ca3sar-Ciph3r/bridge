import { getInvoices } from "@/lib/actions/portal";
import { Icon } from "@/components/ui/Icon";
import { Pill } from "@/components/ui/Chip";
import type { Invoice } from "@/lib/types";

// ── Helpers ──────────────────────────────────────────────────────────────────

function formatCurrency(amount: number, currency = "ZAR"): string {
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

function statusTone(
  status: Invoice["status"]
): "ok" | "warn" | "err" | "neutral" {
  if (status === "paid") return "ok";
  if (status === "pending") return "warn";
  if (status === "overdue") return "err";
  return "neutral";
}

function statusLabel(status: Invoice["status"]): string {
  return status.charAt(0).toUpperCase() + status.slice(1);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default async function InvoicesPage() {
  const invoices = await getInvoices();

  const totalPaid = invoices
    .filter((inv) => inv.status === "paid")
    .reduce((sum, inv) => sum + inv.amount, 0);

  const totalOutstanding = invoices
    .filter((inv) => inv.status === "pending" || inv.status === "overdue")
    .reduce((sum, inv) => sum + inv.amount, 0);

  return (
    <div style={{ padding: "32px 40px", maxWidth: 900 }}>
      {/* Header */}
      <div
        className="br-fade-up"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 6,
          marginBottom: 32,
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
          Invoices
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
          Billing history
        </h1>
        <p style={{ fontSize: 14.5, color: "var(--ink-3)", margin: 0 }}>
          All invoices issued to your account. Download PDFs or check payment
          status here.
        </p>
      </div>

      {/* Summary row */}
      {invoices.length > 0 && (
        <div
          style={{
            display: "flex",
            gap: 12,
            marginBottom: 28,
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              flex: 1,
              minWidth: 160,
              padding: "16px 20px",
              background: "var(--ok-soft)",
              border: "1px solid #a7f3d0",
              borderRadius: 12,
            }}
          >
            <div
              style={{
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: "var(--ok)",
                marginBottom: 8,
              }}
            >
              Total paid
            </div>
            <div
              style={{
                fontSize: 22,
                fontWeight: 700,
                color: "var(--ink)",
                letterSpacing: "-0.03em",
              }}
            >
              {formatCurrency(totalPaid)}
            </div>
          </div>

          <div
            style={{
              flex: 1,
              minWidth: 160,
              padding: "16px 20px",
              background:
                totalOutstanding > 0
                  ? "var(--warn-soft)"
                  : "var(--surface)",
              border: `1px solid ${totalOutstanding > 0 ? "#fcd34d" : "var(--line)"}`,
              borderRadius: 12,
            }}
          >
            <div
              style={{
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color:
                  totalOutstanding > 0 ? "var(--warn)" : "var(--ink-4)",
                marginBottom: 8,
              }}
            >
              Outstanding
            </div>
            <div
              style={{
                fontSize: 22,
                fontWeight: 700,
                color: "var(--ink)",
                letterSpacing: "-0.03em",
              }}
            >
              {formatCurrency(totalOutstanding)}
            </div>
          </div>
        </div>
      )}

      {/* Invoice list or empty state */}
      {invoices.length === 0 ? (
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
            <Icon name="file" size={22} color="var(--ink-4)" />
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
              No invoices yet
            </div>
            <p
              style={{
                fontSize: 13.5,
                color: "var(--ink-4)",
                lineHeight: 1.6,
                margin: 0,
                maxWidth: 340,
              }}
            >
              Invoices will appear here once they have been issued to your
              account.
            </p>
          </div>
        </div>
      ) : (
        <div
          style={{
            background: "var(--surface)",
            border: "1px solid var(--line)",
            borderRadius: 14,
            boxShadow: "var(--shadow-1)",
            overflow: "hidden",
          }}
        >
          {/* Table header */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 2fr 1fr 1fr 1fr auto",
              gap: 0,
              padding: "10px 20px",
              borderBottom: "1px solid var(--line)",
              background: "var(--surface-2)",
            }}
          >
            {[
              "Invoice",
              "Description",
              "Issued",
              "Amount",
              "Status",
              "",
            ].map((col, i) => (
              <div
                key={i}
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  color: "var(--ink-4)",
                  padding: "2px 0",
                }}
              >
                {col}
              </div>
            ))}
          </div>

          {/* Rows */}
          {invoices.map((invoice, index) => (
            <div
              key={invoice.id}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 2fr 1fr 1fr 1fr auto",
                gap: 0,
                padding: "14px 20px",
                alignItems: "center",
                borderBottom:
                  index < invoices.length - 1
                    ? "1px solid var(--line)"
                    : "none",
              }}
            >
              {/* Invoice number */}
              <div
                style={{
                  fontSize: 13.5,
                  fontWeight: 600,
                  color: "var(--ink)",
                  letterSpacing: "-0.01em",
                  fontFamily: "var(--font-mono)",
                }}
              >
                {invoice.invoice_number}
              </div>

              {/* Description */}
              <div
                style={{
                  fontSize: 13,
                  color: "var(--ink-3)",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  paddingRight: 16,
                }}
              >
                {invoice.description ?? "—"}
              </div>

              {/* Issued date */}
              <div style={{ fontSize: 13, color: "var(--ink-3)" }}>
                {formatDate(invoice.issued_date)}
              </div>

              {/* Amount */}
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: "var(--ink)",
                  letterSpacing: "-0.01em",
                }}
              >
                {formatCurrency(invoice.amount, invoice.currency)}
              </div>

              {/* Status */}
              <div>
                <Pill tone={statusTone(invoice.status)} size="sm">
                  {statusLabel(invoice.status)}
                </Pill>
              </div>

              {/* PDF link */}
              <div style={{ minWidth: 72, textAlign: "right" }}>
                {invoice.pdf_url ? (
                  <a
                    href={invoice.pdf_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 5,
                      fontSize: 12.5,
                      fontWeight: 500,
                      color: "var(--accent)",
                      textDecoration: "none",
                    }}
                  >
                    <Icon name="file" size={13} color="var(--accent)" />
                    Download
                  </a>
                ) : (
                  <span style={{ fontSize: 12.5, color: "var(--ink-5)" }}>
                    —
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
