"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { ProgressRail } from "@/components/layout/ProgressRail";
import { ClientBar } from "@/components/layout/ClientBar";
import { StepFooter } from "@/components/layout/StepFooter";
import { AICallout } from "@/components/layout/AICallout";
import { Field, Input } from "@/components/ui/Field";
import { Chip, Pill } from "@/components/ui/Chip";
import { SelectCard } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { MobileNav } from "@/components/layout/MobileNav";
import { getOrCreateSession, getServices, saveServices, updateSessionSection } from "@/lib/actions/session";
import type { OnboardingSession } from "@/lib/types";

const SERVICES = [
  { id: "web",     icon: "monitor",   title: "Website design",    desc: "Site, landing pages, conversion" },
  { id: "ads",     icon: "megaphone", title: "Paid ads",          desc: "Meta, Google, TikTok, LinkedIn" },
  { id: "seo",     icon: "search",    title: "SEO",               desc: "Local, on-page, content velocity" },
  { id: "brand",   icon: "brush",     title: "Branding",          desc: "Identity, voice, guidelines" },
  { id: "content", icon: "pen",       title: "Content marketing", desc: "Editorial, social, video" },
  { id: "auto",    icon: "bolt",      title: "Automation / CRM",  desc: "Workflows, lifecycle, attribution" },
] as const;

const AD_PLATFORMS = ["Meta", "Google", "TikTok", "LinkedIn", "YouTube"];
const WEB_PLATFORMS = ["Webflow", "WordPress", "Squarespace", "Wix", "Shopify", "Custom"];
const WEB_ISSUES = ["Looks dated", "Slow on mobile", "Bad booking flow", "Hard to update", "Poor SEO", "No analytics"];

function BranchPanel({ icon, title, complete, children }: {
  icon: string; title: string; complete?: boolean; children: React.ReactNode;
}) {
  const [open, setOpen] = useState(!complete);
  return (
    <div style={{
      background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 14,
      boxShadow: "var(--shadow-1)", marginBottom: 10, overflow: "hidden",
    }}>
      <button type="button" onClick={() => setOpen(o => !o)} style={{
        width: "100%", padding: "14px 18px", display: "flex", alignItems: "center", gap: 14,
        borderBottom: open ? "1px solid var(--line)" : "none",
        background: open ? "linear-gradient(180deg, #fafafa 0%, transparent 100%)" : "transparent",
        cursor: "pointer", fontFamily: "var(--font-sans)", textAlign: "left",
      }}>
        <div style={{
          width: 32, height: 32, borderRadius: 8, display: "grid", placeItems: "center",
          background: "var(--accent-soft)", color: "var(--accent)", border: "1px solid var(--accent-soft-2)",
          flexShrink: 0,
        }}>
          <Icon name={icon} size={16} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, fontWeight: 600, letterSpacing: "-0.005em" }}>{title}</div>
        </div>
        {complete && <Pill tone="ok" size="sm" icon="check">Complete</Pill>}
        <Icon name={open ? "chevron_down" : "chevron_right"} size={16} color="var(--ink-4)" />
      </button>
      {open && <div style={{ padding: 18 }}>{children}</div>}
    </div>
  );
}

export default function ServicesPage() {
  const router = useRouter();
  const [session, setSession] = useState<OnboardingSession | null>(null);
  const [savedAt, setSavedAt] = useState<string | undefined>();
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const sessionRef = useRef<OnboardingSession | null>(null);

  const [selected, setSelected] = useState<string[]>([]);
  const [hasWebsite, setHasWebsite] = useState<string | null>(null);
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [websitePlatform, setWebsitePlatform] = useState<string | null>(null);
  const [websiteIssues, setWebsiteIssues] = useState<string[]>([]);
  const [adPlatforms, setAdPlatforms] = useState<string[]>([]);
  const [monthlyBudget, setMonthlyBudget] = useState("");
  const [trackingGa4, setTrackingGa4] = useState(false);
  const [trackingGtm, setTrackingGtm] = useState(false);
  const [trackingPixel, setTrackingPixel] = useState(false);
  const [competitorUrls, setCompetitorUrls] = useState("");
  const [targetLocations, setTargetLocations] = useState("");
  const [hasCrm, setHasCrm] = useState<string | null>(null);
  const [crmName, setCrmName] = useState("");

  useEffect(() => {
    async function load() {
      const sess = await getOrCreateSession();
      if (!sess) { router.push("/"); return; }
      setSession(sess);
      sessionRef.current = sess;
      const svc = await getServices(sess.id);
      if (svc) {
        setSelected(svc.selected_services ?? []);
        setHasWebsite(svc.has_existing_website === true ? "Yes" : svc.has_existing_website === false ? "No" : null);
        setWebsiteUrl(svc.website_url ?? "");
        setWebsitePlatform(svc.website_platform);
        setWebsiteIssues(svc.website_issues ?? []);
        setAdPlatforms(svc.ad_platforms ?? []);
        setMonthlyBudget(svc.monthly_budget_usd ? String(svc.monthly_budget_usd) : "");
        setTrackingGa4(svc.tracking_ga4 ?? false);
        setTrackingGtm(svc.tracking_gtm ?? false);
        setTrackingPixel(svc.tracking_pixel ?? false);
        setCompetitorUrls((svc.competitor_urls ?? []).join(", "));
        setTargetLocations((svc.target_locations ?? []).join(", "));
        setHasCrm(svc.has_crm === true ? "Yes" : svc.has_crm === false ? "No" : null);
        setCrmName(svc.crm_name ?? "");
      }
      setLoading(false);
    }
    load();
  }, [router]);

  const autosave = useCallback(async (patch: object) => {
    const sess = sessionRef.current;
    if (!sess) return;
    setSaving(true);
    await saveServices(sess.id, patch);
    setSaving(false);
    setSavedAt(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
  }, []);

  function toggleService(id: string) {
    const next = selected.includes(id) ? selected.filter(s => s !== id) : [...selected, id];
    setSelected(next);
    autosave({ selected_services: next });
  }

  function toggleIssue(issue: string) {
    const next = websiteIssues.includes(issue) ? websiteIssues.filter(i => i !== issue) : [...websiteIssues, issue];
    setWebsiteIssues(next);
    autosave({ website_issues: next });
  }

  function toggleAdPlatform(p: string) {
    const next = adPlatforms.includes(p) ? adPlatforms.filter(x => x !== p) : [...adPlatforms, p];
    setAdPlatforms(next);
    autosave({ ad_platforms: next });
  }

  async function handleContinue() {
    const sess = sessionRef.current;
    if (!sess) return;
    await saveServices(sess.id, {
      selected_services: selected,
      has_existing_website: hasWebsite === "Yes" ? true : hasWebsite === "No" ? false : null,
      website_url: websiteUrl || null,
      website_platform: websitePlatform,
      website_issues: websiteIssues,
      ad_platforms: adPlatforms,
      monthly_budget_usd: monthlyBudget ? Number(monthlyBudget.replace(/[^0-9.]/g, "")) : null,
      tracking_ga4: trackingGa4,
      tracking_gtm: trackingGtm,
      tracking_pixel: trackingPixel,
      competitor_urls: competitorUrls ? competitorUrls.split(",").map(s => s.trim()).filter(Boolean) : [],
      target_locations: targetLocations ? targetLocations.split(",").map(s => s.trim()).filter(Boolean) : [],
      has_crm: hasCrm === "Yes" ? true : hasCrm === "No" ? false : null,
      crm_name: crmName || null,
    });
    await updateSessionSection(sess.id, "strategy");
    router.push("/onboarding/strategy");
  }

  if (loading) return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100dvh", background: "var(--bg)" }}>
      <div style={{ width: 28, height: 28, border: "2.5px solid var(--line)", borderTopColor: "var(--ink)", borderRadius: 999, animation: "spin 0.7s linear infinite" }} />
    </div>
  );

  const hasWeb = selected.includes("web");
  const hasAds = selected.includes("ads");
  const hasSeo = selected.includes("seo");
  const hasAuto = selected.includes("auto");

  return (
    <div style={{ display: "flex", flexDirection: "row", minHeight: "100dvh", background: "var(--bg)" }}>
      <ProgressRail current="services" savedAt={saving ? "Saving…" : savedAt} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <ClientBar section="services" email={session?.client_email ?? undefined} />
        <MobileNav current="services" savedAt={saving ? "Saving…" : savedAt} />
        <div className="br-scroll" style={{ flex: 1, overflowY: "auto", padding: "32px 56px" }}>
          <div style={{ maxWidth: 980 }} className="br-fade-up">
            <Pill tone="neutral" size="sm">B · Scope</Pill>
            <h1 style={{ marginTop: 12, marginBottom: 8, fontSize: 32, fontWeight: 600, letterSpacing: "-0.025em", lineHeight: 1.1, fontFamily: "var(--font-sans)" }}>
              What are we building together?
            </h1>
            <p style={{ marginTop: 0, marginBottom: 28, fontSize: 16, color: "var(--ink-3)", lineHeight: 1.55 }}>
              Pick anything that's in play. Each one reveals the right follow-ups — nothing extra.
            </p>

            <div className="br-g-3-1" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 32 }}>
              {SERVICES.map(s => (
                <SelectCard
                  key={s.id}
                  active={selected.includes(s.id)}
                  icon={s.icon}
                  title={s.title}
                  subtitle={s.desc}
                  onClick={() => toggleService(s.id)}
                />
              ))}
            </div>

            {selected.length > 0 && (
              <>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                  <div className="br-eyebrow">Branching follow-ups</div>
                  <div style={{ flex: 1, height: 1, background: "var(--line)" }} />
                  <span className="br-mono" style={{ fontSize: 11, color: "var(--ink-5)" }}>
                    {selected.length} SELECTED
                  </span>
                </div>

                {hasWeb && (
                  <BranchPanel icon="monitor" title="Website design" complete={!!(hasWebsite && websiteUrl)}>
                    <Field label="Do you currently have a website?">
                      <div style={{ display: "flex", gap: 8 }}>
                        {["Yes", "No", "In progress"].map(opt => (
                          <Chip key={opt} active={hasWebsite === opt} onClick={() => {
                            setHasWebsite(opt);
                            autosave({ has_existing_website: opt === "Yes" ? true : opt === "No" ? false : null });
                          }}>{opt}</Chip>
                        ))}
                      </div>
                    </Field>
                    {hasWebsite === "Yes" && (
                      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 16, marginTop: 14 }}>
                        <Field label="Current URL">
                          <Input value={websiteUrl} onChange={setWebsiteUrl} onBlur={() => autosave({ website_url: websiteUrl || null })} placeholder="yoursite.com" prefix={<Icon name="globe" size={14} />} />
                        </Field>
                        <Field label="Platform">
                          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                            {WEB_PLATFORMS.map(p => (
                              <Chip key={p} size="sm" active={websitePlatform === p} onClick={() => {
                                setWebsitePlatform(p);
                                autosave({ website_platform: p });
                              }}>{p}</Chip>
                            ))}
                          </div>
                        </Field>
                      </div>
                    )}
                    <Field label="What's broken on it today?" hint="Pick all that apply" style={{ marginTop: 14 }}>
                      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                        {WEB_ISSUES.map(issue => (
                          <Chip key={issue} size="sm" active={websiteIssues.includes(issue)} onClick={() => toggleIssue(issue)}>{issue}</Chip>
                        ))}
                      </div>
                    </Field>
                  </BranchPanel>
                )}

                {hasAds && (
                  <BranchPanel icon="megaphone" title="Paid ads" complete={adPlatforms.length > 0}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
                      <Field label="Platforms">
                        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                          {AD_PLATFORMS.map(p => (
                            <Chip key={p} size="sm" active={adPlatforms.includes(p)} onClick={() => toggleAdPlatform(p)}>{p}</Chip>
                          ))}
                        </div>
                      </Field>
                      <Field label="Monthly budget (ZAR)">
                        <Input value={monthlyBudget} onChange={setMonthlyBudget} onBlur={() => autosave({ monthly_budget_usd: monthlyBudget ? Number(monthlyBudget.replace(/[^0-9.]/g, "")) : null })} placeholder="15,000" prefix="R" suffix="/ mo" />
                      </Field>
                      <Field label="Tracking installed">
                        <div style={{ display: "flex", gap: 6 }}>
                          <Chip size="sm" active={trackingGa4} onClick={() => { setTrackingGa4(!trackingGa4); autosave({ tracking_ga4: !trackingGa4 }); }}>GA4</Chip>
                          <Chip size="sm" active={trackingGtm} onClick={() => { setTrackingGtm(!trackingGtm); autosave({ tracking_gtm: !trackingGtm }); }}>GTM</Chip>
                          <Chip size="sm" active={trackingPixel} onClick={() => { setTrackingPixel(!trackingPixel); autosave({ tracking_pixel: !trackingPixel }); }}>Pixel</Chip>
                        </div>
                      </Field>
                    </div>
                  </BranchPanel>
                )}

                {hasSeo && (
                  <BranchPanel icon="search" title="SEO" complete={!!(competitorUrls || targetLocations)}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                      <Field label="Top competitor URLs" hint="Comma-separated">
                        <Input value={competitorUrls} onChange={setCompetitorUrls} onBlur={() => autosave({ competitor_urls: competitorUrls ? competitorUrls.split(",").map(s => s.trim()).filter(Boolean) : [] })} placeholder="competitor1.com, competitor2.com" />
                      </Field>
                      <Field label="Target locations" hint="Comma-separated">
                        <Input value={targetLocations} onChange={setTargetLocations} onBlur={() => autosave({ target_locations: targetLocations ? targetLocations.split(",").map(s => s.trim()).filter(Boolean) : [] })} placeholder="Burlington, Williston, Essex" />
                      </Field>
                    </div>
                  </BranchPanel>
                )}

                {hasAuto && (
                  <BranchPanel icon="bolt" title="Automation / CRM" complete={hasCrm !== null}>
                    <Field label="Do you have a CRM today?">
                      <div style={{ display: "flex", gap: 8 }}>
                        {["Yes", "No"].map(opt => (
                          <Chip key={opt} active={hasCrm === opt} onClick={() => {
                            setHasCrm(opt);
                            autosave({ has_crm: opt === "Yes" });
                          }}>{opt}</Chip>
                        ))}
                      </div>
                    </Field>
                    {hasCrm === "Yes" && (
                      <Field label="Which CRM?" style={{ marginTop: 14 }}>
                        <Input value={crmName} onChange={setCrmName} onBlur={() => autosave({ crm_name: crmName || null })} placeholder="e.g. HubSpot, Salesforce, Dentrix" />
                      </Field>
                    )}
                  </BranchPanel>
                )}

                <div style={{ marginTop: 24 }}>
                  <AICallout title="Heads up from Bridge">
                    Based on your selected services, we'll tailor the strategy and asset questions to what's actually relevant — you won't see anything that doesn't apply.
                  </AICallout>
                </div>
              </>
            )}
          </div>
        </div>
        <StepFooter
          note={saving ? "Saving…" : savedAt ? `Autosaved · ${savedAt}` : `${selected.length} selected`}
          continueLabel="Continue to Strategy"
          onBack={() => router.push("/onboarding/snapshot")}
          onContinue={handleContinue}
        />
      </div>
    </div>
  );
}
