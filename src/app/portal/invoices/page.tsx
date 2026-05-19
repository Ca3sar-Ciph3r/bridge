import { getInvoices } from "@/lib/actions/portal";
import { Icon } from "@/components/ui/Icon";
import type { Invoice } from "@/lib/types";

function formatDate(d: string | null) {
  if (!d) return null;
  return new Date(d).toLocaleDateString("en-ZA", { day: "numeric", month: "long", year: "numeric" });
}

export default async function InvoicesPage() {
  const invoices = await getInvoices();

  return (
    <div style={{ padding: "32px 40px", maxWidth: 760 }}>
      <div className="br-fade-up" style={{ marginBottom: 32 }}>
        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--accent)" }}>Billing</span>
        <h1 style={{ fontSize: 26, fontWeight: 700, color: "var(--ink)", margin: "4px 0 6px", letterSpacing: "-0.03em" }}>Invoices</h1>
        <p style={{ fontSize: 14, color: "var(--ink-3)", margin: 0 }}>
          All invoices from your agency. Download PDFs to view details.
        </p>
      </div>

      {invoices.length === 0 ? (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 14, padding: "64px 24px", background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 16, textAlign: "center" }}>
          <div style={{ width: 48, height: 48, borderRadius: 12, background: "var(--surface-2)", display: "grid", placeItems: "center", border: "1px solid var(--line)" }}>
            <Icon name="file" size={22} color="var(--ink-4)" />
          </div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 600, color: "var(--ink-2)", marginBottom: 6, letterSpacing: "-0.01em" }}>No invoices yet</div>
            <p style={{ fontSize: 13.5, color: "var(--ink-4)", lineHeight: 1.6, margin: 0, maxWidth: 300 }}>
              Invoices will appear here once they&apos;ve been issued to your account.
            </p>
          </div>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {invoices.map((invoice) => (
            <InvoiceRow key={invoice.id} invoice={invoice} />
          ))}
        </div>
      )}
    </div>
  );
}

function InvoiceRow({ invoice }: { invoice: Invoice }) {
  const date = formatDate(invoice.issued_date);

  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 16, padding: "16px 20px",
      background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 12,
      boxShadow: "var(--shadow-1)",
    }}>
      {/* PDF icon */}
      <div style={{ width: 44, height: 44, borderRadius: 10, background: "var(--err-soft)", border: "1px solid var(--err)", display: "grid", placeItems: "center", flexShrink: 0 }}>
        <Icon name="file" size={20} color="var(--err)" />
      </div>

      {/* Name + date */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: "var(--ink)", letterSpacing: "-0.01em", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {invoice.invoice_number ?? "Invoice"}
        </div>
        {date && (
          <div style={{ fontSize: 12, color: "var(--ink-4)", marginTop: 2 }}>
            {date}
          </div>
        )}
      </div>

      {/* Download */}
      {invoice.pdf_url ? (
        <a
          href={invoice.pdf_url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "flex", alignItems: "center", gap: 6,
            padding: "8px 16px", background: "var(--ink)", color: "#fff",
            borderRadius: 8, textDecoration: "none", fontSize: 13, fontWeight: 600,
            flexShrink: 0,
          }}
        >
          <Icon name="file" size={14} color="#fff" />
          Download PDF
        </a>
      ) : (
        <span style={{ fontSize: 12, color: "var(--ink-5)", flexShrink: 0 }}>No PDF</span>
      )}
    </div>
  );
}
