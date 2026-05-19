"use client";
import { useState, useTransition } from "react";
import { createClient } from "@/lib/supabase/client";
import { addInvoice, deleteInvoice, updateInvoiceStatus } from "@/lib/actions/agency";
import { Icon } from "@/components/ui/Icon";
import { Pill } from "@/components/ui/Chip";
import type { Invoice } from "@/lib/types";

const STATUSES: Invoice["status"][] = ["draft", "pending", "paid", "overdue"];
const STATUS_TONE = { draft: "neutral", pending: "warn", paid: "ok", overdue: "err" } as const;
const STATUS_LABEL = { draft: "Draft", pending: "Pending", paid: "Paid", overdue: "Overdue" };

export function InvoiceManager({ clientId, initial }: { clientId: string; initial: Invoice[] }) {
  const [items, setItems]         = useState<Invoice[]>(initial);
  const [showForm, setShowForm]   = useState(false);
  const [isPending, startTx]      = useTransition();
  const [uploading, setUploading] = useState(false);
  const [error, setError]         = useState("");

  // Form state
  const [invNum, setInvNum]       = useState("");
  const [amount, setAmount]       = useState("");
  const [desc, setDesc]           = useState("");
  const [issued, setIssued]       = useState("");
  const [due, setDue]             = useState("");
  const [status, setStatus]       = useState<Invoice["status"]>("pending");
  const [file, setFile]           = useState<File | null>(null);

  function reset() {
    setInvNum(""); setAmount(""); setDesc(""); setIssued(""); setDue(""); setStatus("pending"); setFile(null);
    setError(""); setShowForm(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!invNum.trim()) { setError("Invoice number is required."); return; }
    if (!amount || isNaN(Number(amount))) { setError("Valid amount is required."); return; }
    setUploading(true); setError("");

    let filePath: string | null = null;

    if (file) {
      const supabase = createClient();
      const ext = file.name.split(".").pop();
      const name = `${clientId}/invoices/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { error: upErr } = await supabase.storage.from("client-files").upload(name, file, { contentType: file.type });
      if (upErr) { setError(upErr.message); setUploading(false); return; }
      filePath = name;
    }

    startTx(async () => {
      const result = await addInvoice(clientId, {
        invoice_number: invNum.trim(),
        amount: Number(amount),
        description: desc.trim() || null,
        issued_date: issued || null,
        due_date: due || null,
        status,
        file_path: filePath,
      });
      if (result.error) { setError(result.error); }
      else {
        setItems(prev => [{
          id: crypto.randomUUID(), client_id: clientId, invoice_number: invNum.trim(),
          amount: Number(amount), currency: "ZAR", description: desc.trim() || null,
          issued_date: issued || null, due_date: due || null, status,
          pdf_url: null, created_at: new Date().toISOString(),
        }, ...prev]);
        reset();
      }
      setUploading(false);
    });
  }

  function handleDelete(item: Invoice) {
    if (!confirm(`Delete invoice ${item.invoice_number}?`)) return;
    setItems(prev => prev.filter(i => i.id !== item.id));
    startTx(() => deleteInvoice(item.id, clientId, item.pdf_url));
  }

  function handleStatusChange(item: Invoice, newStatus: Invoice["status"]) {
    setItems(prev => prev.map(i => i.id === item.id ? { ...i, status: newStatus } : i));
    startTx(() => updateInvoiceStatus(item.id, clientId, newStatus));
  }

  const fmt = (n: number) => `R${n.toLocaleString("en-ZA")}`;
  const fmtDate = (d: string | null) => d ? new Date(d).toLocaleDateString("en-ZA", { day: "numeric", month: "short", year: "numeric" }) : "—";

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <div style={{ fontSize: 13, color: "var(--ink-3)" }}>{items.length} invoice{items.length !== 1 ? "s" : ""}</div>
        <button onClick={() => setShowForm(v => !v)} style={{
          display: "flex", alignItems: "center", gap: 6, padding: "7px 14px",
          background: showForm ? "var(--surface-2)" : "var(--ink)", color: showForm ? "var(--ink)" : "#fff",
          border: "1px solid var(--line)", borderRadius: 8, cursor: "pointer", fontSize: 13, fontWeight: 600,
        }}>
          <Icon name={showForm ? "close" : "plus"} size={14} color={showForm ? "var(--ink)" : "#fff"} />
          {showForm ? "Cancel" : "Add invoice"}
        </button>
      </div>

      {/* Upload form */}
      {showForm && (
        <form onSubmit={handleSubmit} style={{
          background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 12,
          padding: "20px", marginBottom: 16, display: "flex", flexDirection: "column", gap: 12,
        }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
            <div>
              <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "var(--ink-4)", marginBottom: 5 }}>Invoice # *</label>
              <input value={invNum} onChange={e => setInvNum(e.target.value)} placeholder="INV-001"
                style={{ width: "100%", boxSizing: "border-box", padding: "8px 10px", fontSize: 13, background: "var(--bg)", border: "1px solid var(--line-strong)", borderRadius: 7, color: "var(--ink)", outline: "none" }} />
            </div>
            <div>
              <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "var(--ink-4)", marginBottom: 5 }}>Amount (R) *</label>
              <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="15000"
                style={{ width: "100%", boxSizing: "border-box", padding: "8px 10px", fontSize: 13, background: "var(--bg)", border: "1px solid var(--line-strong)", borderRadius: 7, color: "var(--ink)", outline: "none" }} />
            </div>
            <div>
              <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "var(--ink-4)", marginBottom: 5 }}>Status</label>
              <select value={status} onChange={e => setStatus(e.target.value as Invoice["status"])}
                style={{ width: "100%", padding: "8px 10px", fontSize: 13, background: "var(--bg)", border: "1px solid var(--line-strong)", borderRadius: 7, color: "var(--ink)", outline: "none" }}>
                {STATUSES.map(s => <option key={s} value={s}>{STATUS_LABEL[s]}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "var(--ink-4)", marginBottom: 5 }}>Description</label>
            <input value={desc} onChange={e => setDesc(e.target.value)} placeholder="e.g. May retainer — social media management"
              style={{ width: "100%", boxSizing: "border-box", padding: "8px 10px", fontSize: 13, background: "var(--bg)", border: "1px solid var(--line-strong)", borderRadius: 7, color: "var(--ink)", outline: "none" }} />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
            <div>
              <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "var(--ink-4)", marginBottom: 5 }}>Issued date</label>
              <input type="date" value={issued} onChange={e => setIssued(e.target.value)}
                style={{ width: "100%", boxSizing: "border-box", padding: "8px 10px", fontSize: 13, background: "var(--bg)", border: "1px solid var(--line-strong)", borderRadius: 7, color: "var(--ink)", outline: "none" }} />
            </div>
            <div>
              <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "var(--ink-4)", marginBottom: 5 }}>Due date</label>
              <input type="date" value={due} onChange={e => setDue(e.target.value)}
                style={{ width: "100%", boxSizing: "border-box", padding: "8px 10px", fontSize: 13, background: "var(--bg)", border: "1px solid var(--line-strong)", borderRadius: 7, color: "var(--ink)", outline: "none" }} />
            </div>
            <div>
              <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "var(--ink-4)", marginBottom: 5 }}>PDF file</label>
              <input type="file" accept="application/pdf" onChange={e => setFile(e.target.files?.[0] ?? null)}
                style={{ width: "100%", fontSize: 12, color: "var(--ink-3)" }} />
            </div>
          </div>

          {error && <div style={{ fontSize: 12, color: "var(--err)", background: "var(--err-soft)", border: "1px solid var(--err)", borderRadius: 6, padding: "8px 10px" }}>{error}</div>}

          <div style={{ display: "flex", gap: 8 }}>
            <button type="submit" disabled={uploading || isPending} style={{
              padding: "8px 18px", background: (uploading || isPending) ? "var(--ink-5)" : "var(--accent)",
              color: "#fff", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 600,
              cursor: (uploading || isPending) ? "not-allowed" : "pointer",
            }}>
              {uploading ? "Uploading…" : isPending ? "Saving…" : "Add invoice"}
            </button>
            <button type="button" onClick={reset} style={{ padding: "8px 14px", background: "transparent", border: "1px solid var(--line)", borderRadius: 8, fontSize: 13, cursor: "pointer", color: "var(--ink-3)" }}>
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* List */}
      {items.length === 0 ? (
        <div style={{ padding: "40px 24px", textAlign: "center", background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 12, color: "var(--ink-4)", fontSize: 13 }}>
          No invoices yet. Add one above.
        </div>
      ) : (
        <div style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 12, overflow: "hidden" }}>
          {items.map((item, idx) => (
            <div key={item.id} style={{
              display: "grid", gridTemplateColumns: "1fr 2fr auto auto auto auto", gap: 12, alignItems: "center",
              padding: "12px 16px", borderBottom: idx < items.length - 1 ? "1px solid var(--line)" : "none",
            }}>
              {/* Invoice # */}
              <div className="br-mono" style={{ fontSize: 12, fontWeight: 600, color: "var(--ink)" }}>{item.invoice_number}</div>

              {/* Desc + dates */}
              <div>
                <div style={{ fontSize: 13, color: "var(--ink-2)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.description ?? "—"}</div>
                <div style={{ fontSize: 11, color: "var(--ink-5)", marginTop: 1 }}>Issued {fmtDate(item.issued_date)} · Due {fmtDate(item.due_date)}</div>
              </div>

              {/* Amount */}
              <div style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)", letterSpacing: "-0.01em", whiteSpace: "nowrap" }}>{fmt(item.amount)}</div>

              {/* Status dropdown */}
              <select value={item.status} onChange={e => handleStatusChange(item, e.target.value as Invoice["status"])}
                style={{ padding: "4px 8px", fontSize: 11, background: "var(--surface-2)", border: "1px solid var(--line)", borderRadius: 6, color: "var(--ink-2)", cursor: "pointer", outline: "none" }}>
                {STATUSES.map(s => <option key={s} value={s}>{STATUS_LABEL[s]}</option>)}
              </select>

              {/* PDF */}
              {item.pdf_url ? (
                <a href={item.pdf_url} target="_blank" rel="noopener noreferrer"
                  style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: "var(--accent)", textDecoration: "none" }}>
                  <Icon name="file" size={13} color="var(--accent)" />PDF
                </a>
              ) : <span style={{ fontSize: 12, color: "var(--ink-5)" }}>—</span>}

              {/* Delete */}
              <button onClick={() => handleDelete(item)} style={{ background: "none", border: "none", cursor: "pointer", padding: 4, borderRadius: 6, color: "var(--ink-5)", display: "flex" }}>
                <Icon name="close" size={14} color="var(--ink-5)" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
