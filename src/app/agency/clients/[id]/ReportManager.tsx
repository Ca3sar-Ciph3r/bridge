"use client";
import { useState, useTransition, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import { addReport, deleteReport } from "@/lib/actions/agency";
import { Icon } from "@/components/ui/Icon";
import type { Report } from "@/lib/types";

function currentMonth() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-01`;
}

function formatMonth(month: string) {
  const [y, m] = month.split("-");
  return new Date(Number(y), Number(m) - 1, 1).toLocaleDateString("en-ZA", { month: "long", year: "numeric" });
}

export function ReportManager({ clientId, initial }: { clientId: string; initial: Report[] }) {
  const [items, setItems]         = useState<Report[]>(initial);
  const [isPending, startTx]      = useTransition();
  const [uploading, setUploading] = useState(false);
  const [error, setError]         = useState("");
  const [dragging, setDragging]   = useState(false);
  const inputRef                  = useRef<HTMLInputElement>(null);

  async function upload(files: FileList | null) {
    if (!files || files.length === 0) return;
    setUploading(true); setError("");

    for (const file of Array.from(files)) {
      if (file.type !== "application/pdf") {
        setError("Only PDF files are supported."); setUploading(false); return;
      }
      if (file.size > 52428800) {
        setError("File exceeds 50 MB limit."); setUploading(false); return;
      }

      const supabase = createClient();
      const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
      const path = `${clientId}/reports/${Date.now()}-${safeName}`;
      const label = file.name.replace(/\.pdf$/i, "");
      const month = currentMonth();

      const { error: upErr } = await supabase.storage
        .from("client-files")
        .upload(path, file, { contentType: "application/pdf" });

      if (upErr) { setError(upErr.message); setUploading(false); return; }

      startTx(async () => {
        const result = await addReport(clientId, { title: label, month, file_path: path });
        if (result.error) { setError(result.error); return; }
        setItems(prev => [{
          id: crypto.randomUUID(), client_id: clientId,
          title: label, month, pdf_url: null,
          summary: null, metrics: {}, created_at: new Date().toISOString(),
        }, ...prev]);
      });
    }

    setUploading(false);
    if (inputRef.current) inputRef.current.value = "";
  }

  function handleDelete(item: Report) {
    if (!confirm(`Remove "${item.title ?? formatMonth(item.month)}"?`)) return;
    setItems(prev => prev.filter(i => i.id !== item.id));
    startTx(() => deleteReport(item.id, clientId, item.pdf_url));
  }

  return (
    <div>
      {/* Drop zone */}
      <div
        onDragOver={e => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={e => { e.preventDefault(); setDragging(false); upload(e.dataTransfer.files); }}
        onClick={() => inputRef.current?.click()}
        style={{
          border: `2px dashed ${dragging ? "var(--accent)" : "var(--line-strong)"}`,
          borderRadius: 12, padding: "36px 24px", textAlign: "center", cursor: "pointer",
          background: dragging ? "var(--accent-soft)" : "var(--surface)",
          transition: "all .15s", marginBottom: 20,
        }}
      >
        <input
          ref={inputRef} type="file" accept="application/pdf" multiple
          style={{ display: "none" }}
          onChange={e => upload(e.target.files)}
        />
        <div style={{ width: 44, height: 44, borderRadius: 10, background: "var(--surface-2)", border: "1px solid var(--line)", display: "grid", placeItems: "center", margin: "0 auto 12px" }}>
          {uploading
            ? <div style={{ width: 18, height: 18, borderRadius: "50%", border: "2px solid var(--accent)", borderTopColor: "transparent", animation: "spin 0.7s linear infinite" }} />
            : <Icon name="bolt" size={20} color="var(--ink-4)" />}
        </div>
        <div style={{ fontSize: 14, fontWeight: 600, color: "var(--ink-2)", marginBottom: 4 }}>
          {uploading ? "Uploading…" : "Drop monthly report PDFs here"}
        </div>
        <div style={{ fontSize: 12, color: "var(--ink-5)" }}>
          or click to browse · PDF only · max 50 MB each
        </div>
      </div>

      {error && (
        <div style={{ fontSize: 13, color: "var(--err)", background: "var(--err-soft)", border: "1px solid var(--err)", borderRadius: 8, padding: "10px 12px", marginBottom: 16 }}>
          {error}
        </div>
      )}

      {items.length === 0 ? (
        <div style={{ padding: "32px 24px", textAlign: "center", background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 12, color: "var(--ink-4)", fontSize: 13 }}>
          No reports yet — drop a PDF above.
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {items.map(item => (
            <div key={item.id} style={{
              display: "flex", alignItems: "center", gap: 12, padding: "12px 16px",
              background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 10,
            }}>
              <div style={{ width: 36, height: 36, borderRadius: 8, background: "var(--accent-soft)", border: "1px solid var(--accent-soft-2)", display: "grid", placeItems: "center", flexShrink: 0 }}>
                <Icon name="bolt" size={16} color="var(--accent)" />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {item.title ?? formatMonth(item.month)}
                </div>
                <div style={{ fontSize: 11, color: "var(--ink-5)", marginTop: 1 }}>
                  {formatMonth(item.month)}
                </div>
              </div>
              {item.pdf_url && (
                <a href={item.pdf_url} target="_blank" rel="noopener noreferrer"
                  style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, fontWeight: 500, color: "var(--accent)", textDecoration: "none", padding: "5px 10px", background: "var(--accent-soft)", borderRadius: 6, flexShrink: 0 }}>
                  <Icon name="arrow_right" size={12} color="var(--accent)" />
                  Preview
                </a>
              )}
              <button onClick={() => handleDelete(item)} style={{ background: "none", border: "none", cursor: "pointer", padding: 4, borderRadius: 6, display: "flex", flexShrink: 0 }}>
                <Icon name="close" size={14} color="var(--ink-5)" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
