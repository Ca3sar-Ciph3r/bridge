"use client";
import { useState, useTransition } from "react";
import { createClient } from "@/lib/supabase/client";
import { addDeliverable, deleteDeliverable } from "@/lib/actions/agency";
import { Icon } from "@/components/ui/Icon";
import { Pill } from "@/components/ui/Chip";
import type { Deliverable } from "@/lib/types";

const PLATFORMS: Deliverable["platform"][] = ["instagram","facebook","linkedin","tiktok","google","twitter","other"];
const STATUS_TONE = { pending: "warn", approved: "ok", changes_requested: "err" } as const;
const STATUS_LABEL = { pending: "Pending", approved: "Approved", changes_requested: "Changes requested" };

function isImage(url: string | null) {
  if (!url) return false;
  return /\.(jpg|jpeg|png|webp|gif|svg)$/i.test(url) || url.includes("token=");
}

export function DeliverableManager({ clientId, initial }: { clientId: string; initial: Deliverable[] }) {
  const [items, setItems]         = useState<Deliverable[]>(initial);
  const [showForm, setShowForm]   = useState(false);
  const [isPending, startTx]      = useTransition();
  const [uploading, setUploading] = useState(false);
  const [error, setError]         = useState("");

  // Form state
  const [title, setTitle]         = useState("");
  const [platform, setPlatform]   = useState<Deliverable["platform"]>("instagram");
  const [caption, setCaption]     = useState("");
  const [schedDate, setSchedDate] = useState("");
  const [file, setFile]           = useState<File | null>(null);

  function reset() {
    setTitle(""); setPlatform("instagram"); setCaption(""); setSchedDate(""); setFile(null);
    setError(""); setShowForm(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) { setError("Title is required."); return; }
    setUploading(true); setError("");

    let filePath: string | null = null;

    if (file) {
      const supabase = createClient();
      const ext = file.name.split(".").pop();
      const name = `${clientId}/deliverables/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { error: upErr } = await supabase.storage.from("client-files").upload(name, file, { contentType: file.type });
      if (upErr) { setError(upErr.message); setUploading(false); return; }
      filePath = name;
    }

    startTx(async () => {
      const result = await addDeliverable(clientId, {
        title: title.trim(),
        caption: caption.trim() || null,
        platform,
        scheduled_date: schedDate || null,
        file_path: filePath,
      });
      if (result.error) { setError(result.error); }
      else {
        // Add optimistic item (without signed URL — will show placeholder until reload)
        setItems(prev => [{
          id: crypto.randomUUID(), client_id: clientId, title: title.trim(),
          caption: caption.trim() || null, image_url: null, platform, status: "pending",
          changes_note: null, scheduled_date: schedDate || null, created_at: new Date().toISOString(),
        }, ...prev]);
        reset();
      }
      setUploading(false);
    });
  }

  function handleDelete(item: Deliverable) {
    if (!confirm(`Delete "${item.title}"?`)) return;
    setItems(prev => prev.filter(d => d.id !== item.id));
    startTx(() => deleteDeliverable(item.id, clientId, item.image_url));
  }

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <div style={{ fontSize: 13, color: "var(--ink-3)" }}>{items.length} deliverable{items.length !== 1 ? "s" : ""}</div>
        <button onClick={() => setShowForm(v => !v)} style={{
          display: "flex", alignItems: "center", gap: 6, padding: "7px 14px",
          background: showForm ? "var(--surface-2)" : "var(--ink)", color: showForm ? "var(--ink)" : "#fff",
          border: "1px solid var(--line)", borderRadius: 8, cursor: "pointer", fontSize: 13, fontWeight: 600,
        }}>
          <Icon name={showForm ? "close" : "plus"} size={14} color={showForm ? "var(--ink)" : "#fff"} />
          {showForm ? "Cancel" : "Add deliverable"}
        </button>
      </div>

      {/* Upload form */}
      {showForm && (
        <form onSubmit={handleSubmit} style={{
          background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 12,
          padding: "20px", marginBottom: 16, display: "flex", flexDirection: "column", gap: 12,
        }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div>
              <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "var(--ink-4)", marginBottom: 5 }}>Title *</label>
              <input value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. June Instagram Post 1"
                style={{ width: "100%", boxSizing: "border-box", padding: "8px 10px", fontSize: 13, background: "var(--bg)", border: "1px solid var(--line-strong)", borderRadius: 7, color: "var(--ink)", outline: "none" }} />
            </div>
            <div>
              <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "var(--ink-4)", marginBottom: 5 }}>Platform</label>
              <select value={platform} onChange={e => setPlatform(e.target.value as Deliverable["platform"])}
                style={{ width: "100%", padding: "8px 10px", fontSize: 13, background: "var(--bg)", border: "1px solid var(--line-strong)", borderRadius: 7, color: "var(--ink)", outline: "none" }}>
                {PLATFORMS.map(p => <option key={p} value={p}>{p.charAt(0).toUpperCase() + p.slice(1)}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "var(--ink-4)", marginBottom: 5 }}>Caption / copy</label>
            <textarea value={caption} onChange={e => setCaption(e.target.value)} rows={3} placeholder="Post caption or body copy…"
              style={{ width: "100%", boxSizing: "border-box", padding: "8px 10px", fontSize: 13, background: "var(--bg)", border: "1px solid var(--line-strong)", borderRadius: 7, color: "var(--ink)", outline: "none", resize: "vertical", fontFamily: "inherit" }} />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div>
              <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "var(--ink-4)", marginBottom: 5 }}>Scheduled date</label>
              <input type="date" value={schedDate} onChange={e => setSchedDate(e.target.value)}
                style={{ width: "100%", boxSizing: "border-box", padding: "8px 10px", fontSize: 13, background: "var(--bg)", border: "1px solid var(--line-strong)", borderRadius: 7, color: "var(--ink)", outline: "none" }} />
            </div>
            <div>
              <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "var(--ink-4)", marginBottom: 5 }}>File (image or PDF)</label>
              <input type="file" accept="image/*,application/pdf" onChange={e => setFile(e.target.files?.[0] ?? null)}
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
              {uploading ? "Uploading…" : isPending ? "Saving…" : "Add deliverable"}
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
          No deliverables yet. Add one above.
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {items.map(item => (
            <div key={item.id} style={{ display: "grid", gridTemplateColumns: "48px 1fr auto auto", gap: 12, alignItems: "center", padding: "12px 14px", background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 10 }}>
              {/* Thumbnail */}
              <div style={{ width: 48, height: 48, borderRadius: 6, overflow: "hidden", background: "var(--surface-2)", border: "1px solid var(--line)", flexShrink: 0 }}>
                {isImage(item.image_url) ? (
                  <img src={item.image_url!} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                ) : item.image_url ? (
                  <div style={{ width: "100%", height: "100%", display: "grid", placeItems: "center" }}><Icon name="file" size={18} color="var(--ink-4)" /></div>
                ) : (
                  <div style={{ width: "100%", height: "100%", display: "grid", placeItems: "center" }}><Icon name="megaphone" size={18} color="var(--ink-5)" /></div>
                )}
              </div>

              {/* Info */}
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)", letterSpacing: "-0.01em", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.title}</div>
                <div style={{ fontSize: 11, color: "var(--ink-4)", marginTop: 2 }}>
                  {item.platform.charAt(0).toUpperCase() + item.platform.slice(1)}
                  {item.scheduled_date ? ` · ${new Date(item.scheduled_date).toLocaleDateString("en-ZA", { day: "numeric", month: "short" })}` : ""}
                </div>
              </div>

              {/* Status */}
              <Pill tone={STATUS_TONE[item.status]} size="sm">{STATUS_LABEL[item.status]}</Pill>

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
