"use client";
import { useState, useTransition, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import { addBrandAsset, deleteBrandAsset } from "@/lib/actions/agency";
import { Icon } from "@/components/ui/Icon";
import type { BrandAsset } from "@/lib/types";

const TYPE_OPTIONS: { value: BrandAsset["type"]; label: string }[] = [
  { value: "logo",      label: "Logo" },
  { value: "image",     label: "Image" },
  { value: "font",      label: "Font" },
  { value: "guideline", label: "Guideline" },
  { value: "document",  label: "Document" },
  { value: "other",     label: "Other" },
];

const TYPE_LABELS: Record<BrandAsset["type"], string> = {
  logo: "Logo", color: "Colour", font: "Font", image: "Image",
  guideline: "Guideline", document: "Document", other: "Other",
};

export function BrandManager({ clientId, initial }: { clientId: string; initial: BrandAsset[] }) {
  const [items, setItems]         = useState<BrandAsset[]>(initial);
  const [isPending, startTx]      = useTransition();
  const [uploading, setUploading] = useState(false);
  const [error, setError]         = useState("");
  const [dragging, setDragging]   = useState(false);
  const [assetType, setAssetType] = useState<BrandAsset["type"]>("logo");
  const inputRef                  = useRef<HTMLInputElement>(null);

  async function upload(files: FileList | null) {
    if (!files || files.length === 0) return;
    setUploading(true); setError("");

    for (const file of Array.from(files)) {
      if (file.size > 52428800) {
        setError("File exceeds 50 MB limit."); setUploading(false); return;
      }

      const supabase = createClient();
      const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
      const path = `${clientId}/brand/${Date.now()}-${safeName}`;
      const label = file.name.replace(/\.[^.]+$/, "");

      const { error: upErr } = await supabase.storage
        .from("client-files")
        .upload(path, file, { contentType: file.type || "application/octet-stream" });

      if (upErr) { setError(upErr.message); setUploading(false); return; }

      startTx(async () => {
        const result = await addBrandAsset(clientId, {
          name: label,
          type: assetType,
          file_path: path,
          metadata: {},
        });
        if (result.error) { setError(result.error); return; }
        setItems(prev => [{
          id: crypto.randomUUID(), client_id: clientId,
          name: label, type: assetType, file_url: null,
          thumbnail_url: null, metadata: {}, created_at: new Date().toISOString(),
        }, ...prev]);
      });
    }

    setUploading(false);
    if (inputRef.current) inputRef.current.value = "";
  }

  function handleDelete(item: BrandAsset) {
    if (!confirm(`Remove "${item.name}"?`)) return;
    setItems(prev => prev.filter(i => i.id !== item.id));
    startTx(() => deleteBrandAsset(item.id, clientId, item.file_url));
  }

  return (
    <div>
      {/* Type selector */}
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>
        {TYPE_OPTIONS.map(opt => (
          <button
            key={opt.value}
            onClick={() => setAssetType(opt.value)}
            style={{
              padding: "5px 12px", borderRadius: 20, fontSize: 12, fontWeight: 500, cursor: "pointer",
              border: `1px solid ${assetType === opt.value ? "var(--accent)" : "var(--line)"}`,
              background: assetType === opt.value ? "var(--accent-soft)" : "var(--surface)",
              color: assetType === opt.value ? "var(--accent)" : "var(--ink-3)",
            }}
          >
            {opt.label}
          </button>
        ))}
      </div>

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
          ref={inputRef} type="file" multiple
          style={{ display: "none" }}
          onChange={e => upload(e.target.files)}
        />
        <div style={{ width: 44, height: 44, borderRadius: 10, background: "var(--surface-2)", border: "1px solid var(--line)", display: "grid", placeItems: "center", margin: "0 auto 12px" }}>
          {uploading
            ? <div style={{ width: 18, height: 18, borderRadius: "50%", border: "2px solid var(--accent)", borderTopColor: "transparent", animation: "spin 0.7s linear infinite" }} />
            : <Icon name="star" size={20} color="var(--ink-4)" />}
        </div>
        <div style={{ fontSize: 14, fontWeight: 600, color: "var(--ink-2)", marginBottom: 4 }}>
          {uploading ? "Uploading…" : `Drop ${TYPE_LABELS[assetType].toLowerCase()} files here`}
        </div>
        <div style={{ fontSize: 12, color: "var(--ink-5)" }}>
          or click to browse · any file type · max 50 MB each
        </div>
      </div>

      {error && (
        <div style={{ fontSize: 13, color: "var(--err)", background: "var(--err-soft)", border: "1px solid var(--err)", borderRadius: 8, padding: "10px 12px", marginBottom: 16 }}>
          {error}
        </div>
      )}

      {items.length === 0 ? (
        <div style={{ padding: "32px 24px", textAlign: "center", background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 12, color: "var(--ink-4)", fontSize: 13 }}>
          No brand assets yet — drop files above.
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {items.map(item => (
            <div key={item.id} style={{
              display: "flex", alignItems: "center", gap: 12, padding: "12px 16px",
              background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 10,
            }}>
              <div style={{ width: 36, height: 36, borderRadius: 8, background: "var(--surface-2)", border: "1px solid var(--line)", display: "grid", placeItems: "center", flexShrink: 0 }}>
                <Icon name="star" size={16} color="var(--ink-4)" />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {item.name}
                </div>
                <div style={{ fontSize: 11, color: "var(--ink-5)", marginTop: 1 }}>
                  {TYPE_LABELS[item.type]}
                </div>
              </div>
              {item.file_url && (
                <a href={item.file_url} target="_blank" rel="noopener noreferrer"
                  style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, fontWeight: 500, color: "var(--accent)", textDecoration: "none", padding: "5px 10px", background: "var(--accent-soft)", borderRadius: 6, flexShrink: 0 }}>
                  <Icon name="arrow_right" size={12} color="var(--accent)" />
                  View
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
