"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { ProgressRail } from "@/components/layout/ProgressRail";
import { ClientBar } from "@/components/layout/ClientBar";
import { StepFooter } from "@/components/layout/StepFooter";
import { AICallout } from "@/components/layout/AICallout";
import { Pill } from "@/components/ui/Chip";
import { Icon } from "@/components/ui/Icon";
import { MobileNav } from "@/components/layout/MobileNav";
import { getOrCreateSession, saveSnapshot, updateSessionSection } from "@/lib/actions/session";
import { uploadAsset, getAssets, deleteAsset } from "@/lib/actions/assets";
import type { OnboardingSession, AssetFile } from "@/lib/types";

type AssetCategory = {
  id: string;
  title: string;
  icon: string;
  hint: string;
  accept?: string;
  colourPicker?: true;
};

const ASSET_CATEGORIES: AssetCategory[] = [
  { id: "Primary Logo",       title: "Primary Logo",       icon: "brand",     hint: "SVG or PNG preferred",      accept: ".svg,.png,.jpg,.jpeg,.pdf,.ai,.eps" },
  { id: "Logo Dark Variant",  title: "Logo Dark Variant",  icon: "brand",     hint: "White / reversed version",  accept: ".svg,.png,.jpg,.jpeg,.pdf,.ai,.eps" },
  { id: "Brand Guidelines",   title: "Brand Guidelines",   icon: "file",      hint: "PDF, PPT, or DOCX",         accept: ".pdf,.pptx,.ppt,.docx,.doc" },
  { id: "Brand Colours",      title: "Brand Colours",      icon: "palette",   hint: "Pick 3 swatches",           colourPicker: true },
  { id: "Headshots",          title: "Headshots",          icon: "users",     hint: "Team & leadership",         accept: ".jpg,.jpeg,.png,.webp" },
  { id: "Location Photos",    title: "Location Photos",    icon: "map",       hint: "Exterior & interior",       accept: ".jpg,.jpeg,.png,.webp" },
  { id: "Ad Creative",        title: "Ad Creative",        icon: "megaphone", hint: "Display, social, banners",  accept: ".jpg,.jpeg,.png,.svg,.pdf,.ai,.eps" },
  { id: "Testimonials",       title: "Testimonials",       icon: "star",      hint: "Screenshots, PDFs, video",  accept: ".jpg,.jpeg,.png,.pdf,.docx,.mp4,.mov" },
  { id: "Brand Fonts",        title: "Brand Fonts",        icon: "pen",       hint: "TTF, OTF, WOFF",            accept: ".ttf,.otf,.woff,.woff2,.zip" },
];

const COLOUR_LABELS = ["Primary", "Secondary", "Accent"];

function ColourPickerModal({ initial, onSave, onClose }: {
  initial: string[];
  onSave: (colours: string[]) => void;
  onClose: () => void;
}) {
  const [colours, setColours] = useState(() => {
    const c = [...initial];
    while (c.length < 3) c.push("#ffffff");
    return c;
  });

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 100,
      background: "rgba(0,0,0,.45)", display: "flex", alignItems: "center", justifyContent: "center",
    }} onClick={onClose}>
      <div style={{
        background: "var(--surface)", borderRadius: 16, padding: 28, width: 400, maxWidth: "90vw",
        boxShadow: "var(--shadow-3)", border: "1px solid var(--line)",
      }} onClick={e => e.stopPropagation()}>
        <div style={{ fontSize: 17, fontWeight: 600, marginBottom: 20, letterSpacing: "-0.01em" }}>Brand Colours</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {COLOUR_LABELS.map((label, i) => (
            <div key={label} style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{
                width: 44, height: 44, borderRadius: 10, border: "2px solid var(--line-strong)",
                background: colours[i], flexShrink: 0, overflow: "hidden", cursor: "pointer",
                boxShadow: "var(--shadow-1)",
              }}>
                <input type="color" value={colours[i]} onChange={e => {
                  const next = [...colours];
                  next[i] = e.target.value;
                  setColours(next);
                }} style={{ width: "200%", height: "200%", cursor: "pointer", opacity: 0, position: "absolute" }} />
                <input type="color" value={colours[i]} onChange={e => {
                  const next = [...colours];
                  next[i] = e.target.value;
                  setColours(next);
                }} style={{ width: "100%", height: "100%", cursor: "pointer", border: "none", padding: 0, background: "none" }} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 4 }}>{label}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <input
                    value={colours[i]}
                    onChange={e => {
                      const v = e.target.value;
                      const next = [...colours];
                      next[i] = v;
                      setColours(next);
                    }}
                    style={{
                      fontFamily: "var(--font-mono)", fontSize: 12, padding: "4px 8px",
                      border: "1px solid var(--line-strong)", borderRadius: 6, background: "var(--bg)",
                      color: "var(--ink)", width: 100, outline: "none",
                    }}
                  />
                  <div style={{
                    width: 24, height: 24, borderRadius: 5, border: "1px solid var(--line)",
                    background: colours[i],
                  }} />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: 10, marginTop: 24, justifyContent: "flex-end" }}>
          <button type="button" onClick={onClose} style={{
            padding: "8px 16px", borderRadius: 8, background: "var(--surface-2)", border: "1px solid var(--line)",
            cursor: "pointer", fontSize: 14, fontFamily: "var(--font-sans)", color: "var(--ink-2)",
          }}>Cancel</button>
          <button type="button" onClick={() => { onSave(colours); onClose(); }} style={{
            padding: "8px 16px", borderRadius: 8, background: "var(--ink)", border: "none",
            cursor: "pointer", fontSize: 14, fontFamily: "var(--font-sans)", color: "#fff", fontWeight: 500,
          }}>Save colours</button>
        </div>
      </div>
    </div>
  );
}

export default function AssetsPage() {
  const router = useRouter();
  const [session, setSession] = useState<OnboardingSession | null>(null);
  const [savedAt, setSavedAt] = useState<string | undefined>();
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState<string | null>(null);
  const sessionRef = useRef<OnboardingSession | null>(null);

  const [assets, setAssets] = useState<AssetFile[]>([]);
  const [brandColours, setBrandColours] = useState<string[]>([]);
  const [colourModalOpen, setColourModalOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const activeCategory = useRef<string>("");

  useEffect(() => {
    async function load() {
      const sess = await getOrCreateSession();
      if (!sess) { router.push("/"); return; }
      setSession(sess);
      sessionRef.current = sess;
      const files = await getAssets(sess.id);
      setAssets(files ?? []);
      setLoading(false);
    }
    load();
  }, [router]);

  const handleCategoryClick = useCallback((cat: AssetCategory) => {
    if (cat.colourPicker) {
      setColourModalOpen(true);
      return;
    }
    activeCategory.current = cat.id;
    if (fileInputRef.current) {
      fileInputRef.current.accept = cat.accept ?? "*";
      fileInputRef.current.value = "";
      fileInputRef.current.click();
    }
  }, []);

  const handleFiles = useCallback(async (files: FileList | null) => {
    const sess = sessionRef.current;
    if (!files || !sess) return;
    const category = activeCategory.current;
    setUploading(category);
    for (const file of Array.from(files)) {
      const fd = new FormData();
      fd.append("file", file);
      if (category) fd.append("category", category);
      const result = await uploadAsset(sess.id, fd);
      if (result.data) {
        setAssets(prev => [...prev, result.data!]);
      }
    }
    setUploading(null);
    setSavedAt(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
  }, []);

  async function saveBrandColours(colours: string[]) {
    const sess = sessionRef.current;
    if (!sess) return;
    setBrandColours(colours);
    await saveSnapshot(sess.id, { brand_colors: colours });
    setSavedAt(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
  }

  async function handleDelete(assetId: string, filePath: string) {
    await deleteAsset(assetId, filePath);
    setAssets(prev => prev.filter(a => a.id !== assetId));
  }

  async function handleContinue() {
    const sess = sessionRef.current;
    if (!sess) return;
    await updateSessionSection(sess.id, "access");
    router.push("/onboarding/access");
  }

  function getCategoryCount(catId: string) {
    return assets.filter(a => a.tags.includes(catId)).length;
  }

  function getCategoryStatus(catId: string): "empty" | "uploaded" {
    return getCategoryCount(catId) > 0 ? "uploaded" : "empty";
  }

  if (loading) return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100dvh", background: "var(--bg)" }}>
      <div style={{ width: 28, height: 28, border: "2.5px solid var(--line)", borderTopColor: "var(--ink)", borderRadius: 999, animation: "spin 0.7s linear infinite" }} />
    </div>
  );

  const uploadedCount = assets.length + (brandColours.length > 0 ? 1 : 0);

  return (
    <div style={{ display: "flex", flexDirection: "row", minHeight: "100dvh", background: "var(--bg)" }}>
      <ProgressRail current="assets" savedAt={savedAt} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <ClientBar section="assets" email={session?.client_email ?? undefined} />
        <MobileNav current="assets" savedAt={savedAt} />
        <div className="br-scroll" style={{ flex: 1, overflowY: "auto", padding: "32px 56px" }}>
          <div style={{ maxWidth: 1080 }} className="br-fade-up">
            <Pill tone="neutral" size="sm">D · Materials</Pill>
            <h1 style={{ marginTop: 12, marginBottom: 8, fontSize: 32, fontWeight: 600, letterSpacing: "-0.025em", lineHeight: 1.1, fontFamily: "var(--font-sans)" }}>
              Drop in what you have.
            </h1>
            <p style={{ marginTop: 0, marginBottom: 24, fontSize: 16, color: "var(--ink-3)", lineHeight: 1.55 }}>
              Click any category to upload files. Don't worry about being complete — you can add more later.
            </p>

            <div className="br-g-3-2" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 24 }}>
              {ASSET_CATEGORIES.map((cat) => {
                const isColour = cat.colourPicker === true;
                const status = isColour ? (brandColours.length > 0 ? "uploaded" : "empty") : getCategoryStatus(cat.id);
                const count = isColour ? (brandColours.length > 0 ? 1 : 0) : getCategoryCount(cat.id);
                const isUploading = uploading === cat.id;

                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => handleCategoryClick(cat)}
                    disabled={isUploading}
                    style={{
                      display: "flex", flexDirection: "column", gap: 10, padding: 18,
                      borderRadius: 14, cursor: "pointer", textAlign: "left",
                      background: status === "uploaded" ? "linear-gradient(180deg, #f0fdf4 0%, #fff 100%)" : "var(--surface)",
                      border: `1.5px solid ${status === "uploaded" ? "#86efac" : isUploading ? "var(--accent)" : "var(--line)"}`,
                      boxShadow: "var(--shadow-1)", fontFamily: "var(--font-sans)",
                      transition: "border-color .15s, background .15s",
                      position: "relative", overflow: "hidden",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <div style={{
                        width: 36, height: 36, borderRadius: 9, display: "grid", placeItems: "center",
                        background: status === "uploaded" ? "rgba(34,197,94,.12)" : "var(--surface-2)",
                        color: status === "uploaded" ? "#16a34a" : "var(--ink-3)",
                        border: `1px solid ${status === "uploaded" ? "#bbf7d0" : "var(--line)"}`,
                      }}>
                        {isUploading
                          ? <div style={{ width: 16, height: 16, border: "2px solid var(--accent-soft)", borderTopColor: "var(--accent)", borderRadius: 999, animation: "spin 0.7s linear infinite" }} />
                          : <Icon name={cat.icon} size={17} />
                        }
                      </div>
                      {status === "uploaded" && !isColour && (
                        <Pill tone="ok" size="sm">{count} {count === 1 ? "file" : "files"}</Pill>
                      )}
                      {isColour && brandColours.length > 0 && (
                        <div style={{ display: "flex", gap: 4 }}>
                          {brandColours.slice(0, 3).map((c, i) => (
                            <div key={i} style={{ width: 16, height: 16, borderRadius: 4, background: c, border: "1px solid var(--line)" }} />
                          ))}
                        </div>
                      )}
                    </div>
                    <div>
                      <div style={{ fontSize: 13.5, fontWeight: 600, letterSpacing: "-0.005em", color: "var(--ink)", marginBottom: 2 }}>{cat.title}</div>
                      <div style={{ fontSize: 11.5, color: "var(--ink-4)" }}>{cat.hint}</div>
                    </div>
                    {status === "empty" && (
                      <div style={{
                        display: "flex", alignItems: "center", gap: 5,
                        fontSize: 11.5, color: "var(--accent)", fontWeight: 500,
                      }}>
                        <Icon name={isColour ? "palette" : "upload"} size={11} /> {isColour ? "Choose colours" : "Click to upload"}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Uploaded files list */}
            {assets.length > 0 && (
              <div style={{ marginBottom: 24 }}>
                <div className="br-eyebrow" style={{ marginBottom: 10 }}>Uploaded · {assets.length} {assets.length === 1 ? "file" : "files"}</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
                  {assets.map((asset) => (
                    <div key={asset.id} style={{
                      display: "flex", alignItems: "center", gap: 10, padding: "10px 12px",
                      border: "1px solid var(--line)", borderRadius: 10, background: "var(--surface)",
                    }}>
                      <div style={{
                        width: 30, height: 30, borderRadius: 6, flexShrink: 0,
                        background: "var(--surface-2)", border: "1px solid var(--line)",
                        display: "grid", placeItems: "center", color: "var(--ink-3)",
                      }}>
                        <Icon name="file" size={13} />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 12.5, fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{asset.file_name}</div>
                        <div style={{ fontSize: 11, color: "var(--ink-5)", marginTop: 1 }}>
                          {asset.tags[0] ?? "General"} {asset.file_size ? `· ${(asset.file_size / 1024).toFixed(0)} KB` : ""}
                        </div>
                      </div>
                      {asset.validation_status === "ok" && <Pill tone="ok" size="sm" icon="check">OK</Pill>}
                      {asset.validation_status === "warn" && <Pill tone="warn" size="sm" icon="alert">Warn</Pill>}
                      {asset.validation_status === "err" && <Pill tone="err" size="sm" icon="alert">Error</Pill>}
                      <button type="button" onClick={() => handleDelete(asset.id!, asset.file_path)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--ink-5)", padding: 4 }}>
                        <Icon name="x" size={13} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <AICallout title="Asset audit">
              Upload your brand kit and we can generate polished proposals immediately. Brand colours and a primary logo unlock full proposal templating.
            </AICallout>

            <input
              ref={fileInputRef}
              type="file"
              multiple
              style={{ display: "none" }}
              onChange={e => handleFiles(e.target.files)}
            />
          </div>
        </div>
        <StepFooter
          note={uploadedCount > 0 ? `${uploadedCount} ${uploadedCount === 1 ? "item" : "items"} uploaded` : savedAt ? `Autosaved · ${savedAt}` : undefined}
          continueLabel="Continue to Account Access"
          onBack={() => router.push("/onboarding/strategy")}
          onContinue={handleContinue}
        />
      </div>

      {colourModalOpen && (
        <ColourPickerModal
          initial={brandColours}
          onSave={saveBrandColours}
          onClose={() => setColourModalOpen(false)}
        />
      )}
    </div>
  );
}
