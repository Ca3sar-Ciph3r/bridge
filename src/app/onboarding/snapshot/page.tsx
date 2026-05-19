"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { ProgressRail } from "@/components/layout/ProgressRail";
import { ClientBar } from "@/components/layout/ClientBar";
import { StepFooter } from "@/components/layout/StepFooter";
import { Field } from "@/components/ui/Field";
import { Chip, Pill } from "@/components/ui/Chip";
import { SelectCard } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { MobileNav } from "@/components/layout/MobileNav";
import { getOrCreateSession, getSnapshot, saveSnapshot, updateSessionSection } from "@/lib/actions/session";
import type { OnboardingSession } from "@/lib/types";

const BUSINESS_TYPES = [
  { label: "Single location", icon: "building" },
  { label: "Multi-location", icon: "layers" },
  { label: "Franchise", icon: "globe" },
  { label: "Mobile / on-site", icon: "map" },
  { label: "Online-first", icon: "monitor" },
] as const;

const COMPANY_SIZES = ["1–5", "6–15", "16–50", "51–150", "150+"];

const REVENUE_STAGES = [
  { label: "Pre-revenue", subtitle: "Not yet trading" },
  { label: "Early",       subtitle: "Under R500K/yr" },
  { label: "Growing",     subtitle: "R500K–R2M/yr" },
  { label: "Established", subtitle: "R2M–R5M/yr" },
];

const PRIMARY_GOALS = [
  { icon: "users",     label: "Acquire new clients",      subtitle: "Inbound leads, bookings" },
  { icon: "target",    label: "Retain existing clients",  subtitle: "Loyalty, repeat business" },
  { icon: "megaphone", label: "Launch a new location",    subtitle: "Awareness, ramp-up" },
  { icon: "bolt",      label: "Operational efficiency",   subtitle: "Automate, fewer no-shows" },
];

const SA_INDUSTRIES = [
  "Accounting & Bookkeeping",
  "Agriculture & Farming",
  "Architecture & Interior Design",
  "Automotive & Transport",
  "Beauty & Aesthetics",
  "Cleaning & Maintenance",
  "Construction & Contracting",
  "Dental & Oral Care",
  "E-Commerce & Online Retail",
  "Education & Training",
  "Engineering & Manufacturing",
  "Events & Entertainment",
  "Financial Services",
  "Fitness & Wellness",
  "Food & Beverage / Restaurants",
  "Funeral Services",
  "Healthcare & Medical",
  "Hospitality & Tourism",
  "Insurance",
  "Legal Services",
  "Logistics & Supply Chain",
  "Marketing & Advertising",
  "Mining & Resources",
  "Nonprofit & NGO",
  "Optometry & Eyecare",
  "Pet Services & Veterinary",
  "Pharmacy & Dispensary",
  "Photography & Videography",
  "Physiotherapy & Rehab",
  "Property & Real Estate",
  "Recruitment & HR",
  "Retail & Fashion",
  "Security Services",
  "Software & Technology",
  "Specialist Medical",
  "Telecommunications",
  "Utilities & Energy",
  "Veterinary",
];

const SA_CITIES = [
  "Alberton", "Benoni", "Bloemfontein", "Boksburg", "Braamfontein",
  "Cape Town", "Centurion", "Durban", "East London", "Ekurhuleni",
  "George", "Germiston", "Gqeberha (Port Elizabeth)", "Graaff-Reinet",
  "Hermanus", "Johannesburg", "Kempton Park", "Kimberley", "Klerksdorp",
  "Knysna", "Krugersdorp", "Lephalale", "Mahikeng", "Mbombela (Nelspruit)",
  "Midrand", "Mossel Bay", "Paarl", "Pietermaritzburg", "Polokwane",
  "Pretoria", "Randburg", "Richards Bay", "Roodepoort", "Rustenburg",
  "Sandton", "Somerset West", "Soweto", "Stellenbosch", "Tembisa",
  "Thohoyandou", "Tzaneen", "Umhlanga", "Upington", "Vanderbijlpark",
  "Vereeniging", "Witbank (eMalahleni)",
];

function Combobox({ value, onChange, onBlur, options, placeholder, prefix }: {
  value: string;
  onChange: (v: string) => void;
  onBlur?: () => void;
  options: string[];
  placeholder: string;
  prefix?: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState(value);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = query.length > 0
    ? options.filter(o => o.toLowerCase().includes(query.toLowerCase())).slice(0, 8)
    : options.slice(0, 8);

  useEffect(() => { setQuery(value); }, [value]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
        onBlur?.();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onBlur]);

  return (
    <div ref={containerRef} style={{ position: "relative" }}>
      <div style={{
        display: "flex", alignItems: "center", gap: 8,
        background: "var(--surface)", border: `1px solid ${open ? "var(--accent)" : "var(--line-strong)"}`,
        borderRadius: 10, padding: "0 12px", height: 40,
        boxShadow: open ? "0 0 0 3px rgba(79,70,229,.10)" : "var(--shadow-1)",
        transition: "border-color .15s, box-shadow .15s",
      }}>
        {prefix && <span style={{ color: "var(--ink-4)", flexShrink: 0, display: "flex" }}>{prefix}</span>}
        <input
          ref={inputRef}
          value={query}
          onChange={e => { setQuery(e.target.value); onChange(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          onKeyDown={e => {
            if (e.key === "Escape") { setOpen(false); inputRef.current?.blur(); }
            if (e.key === "Enter" && filtered.length > 0) {
              onChange(filtered[0]);
              setQuery(filtered[0]);
              setOpen(false);
            }
          }}
          placeholder={placeholder}
          style={{
            flex: 1, background: "none", border: "none", outline: "none",
            fontSize: 14, color: "var(--ink)", fontFamily: "var(--font-sans)",
          }}
        />
        <button type="button" onClick={() => { setOpen(o => !o); inputRef.current?.focus(); }} style={{
          background: "none", border: "none", cursor: "pointer", color: "var(--ink-4)", padding: 0, display: "flex",
        }}>
          <Icon name={open ? "chevron_down" : "chevron_right"} size={14} />
        </button>
      </div>
      {open && filtered.length > 0 && (
        <div style={{
          position: "absolute", top: "calc(100% + 4px)", left: 0, right: 0, zIndex: 50,
          background: "var(--surface)", border: "1px solid var(--line-strong)", borderRadius: 10,
          boxShadow: "var(--shadow-2)", overflow: "hidden", maxHeight: 260, overflowY: "auto",
        }}>
          {filtered.map(opt => (
            <button key={opt} type="button" onMouseDown={e => e.preventDefault()} onClick={() => {
              onChange(opt); setQuery(opt); setOpen(false);
            }} style={{
              width: "100%", padding: "9px 14px", textAlign: "left", cursor: "pointer",
              background: opt === value ? "var(--accent-soft)" : "transparent",
              color: opt === value ? "var(--accent)" : "var(--ink)", fontSize: 14,
              fontFamily: "var(--font-sans)", border: "none",
              borderBottom: "1px solid var(--line)",
            }}>
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function SnapshotPage() {
  const router = useRouter();
  const [session, setSession] = useState<OnboardingSession | null>(null);
  const [savedAt, setSavedAt] = useState<string | undefined>();
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const sessionRef = useRef<OnboardingSession | null>(null);

  const [businessType, setBusinessType] = useState<string | null>(null);
  const [industry, setIndustry] = useState("");
  const [headquarters, setHeadquarters] = useState("");
  const [companySize, setCompanySize] = useState<string | null>(null);
  const [revenueStage, setRevenueStage] = useState<string | null>(null);
  const [primaryGoal, setPrimaryGoal] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      const sess = await getOrCreateSession();
      if (!sess) { router.push("/"); return; }
      setSession(sess);
      sessionRef.current = sess;
      const snap = await getSnapshot(sess.id);
      if (snap) {
        setBusinessType(snap.business_type);
        setIndustry(snap.industry ?? "");
        setHeadquarters(snap.headquarters ?? "");
        setCompanySize(snap.company_size);
        setRevenueStage(snap.revenue_stage);
        setPrimaryGoal(snap.primary_goal);
      }
      setLoading(false);
    }
    load();
  }, [router]);

  const autosave = useCallback(async (patch: object) => {
    const sess = sessionRef.current;
    if (!sess) return;
    setSaving(true);
    await saveSnapshot(sess.id, patch);
    setSaving(false);
    setSavedAt(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
  }, []);

  async function handleContinue() {
    const sess = sessionRef.current;
    if (!sess) return;
    await saveSnapshot(sess.id, {
      business_type: businessType,
      industry: industry || null,
      headquarters: headquarters || null,
      company_size: companySize,
      revenue_stage: revenueStage,
      primary_goal: primaryGoal,
    });
    await updateSessionSection(sess.id, "services");
    router.push("/onboarding/services");
  }

  if (loading) return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100dvh", background: "var(--bg)" }}>
      <div style={{ width: 28, height: 28, border: "2.5px solid var(--line)", borderTopColor: "var(--ink)", borderRadius: 999, animation: "spin 0.7s linear infinite" }}/>
    </div>
  );

  return (
    <div style={{ display: "flex", flexDirection: "row", minHeight: "100dvh", background: "var(--bg)" }}>
      <ProgressRail current="snapshot" savedAt={saving ? "Saving…" : savedAt} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <ClientBar section="snapshot" email={session?.client_email ?? undefined} />
        <MobileNav current="snapshot" savedAt={saving ? "Saving…" : savedAt} />
        <div className="br-scroll" style={{ flex: 1, overflowY: "auto", padding: "32px 56px" }}>
          <div style={{ maxWidth: 720 }} className="br-fade-up">
            <Pill tone="neutral" size="sm">A · Foundations</Pill>
            <h1 style={{ marginTop: 12, marginBottom: 8, fontSize: 32, fontWeight: 600, letterSpacing: "-0.025em", lineHeight: 1.1, fontFamily: "var(--font-sans)" }}>
              The basics, first.
            </h1>
            <p style={{ marginTop: 0, marginBottom: 28, fontSize: 16, color: "var(--ink-3)", lineHeight: 1.55 }}>
              Six quick fields so we know who we're building for. The rest of the flow adapts from here.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              <Field label="What kind of business is this?" hint="Pick the closest fit">
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {BUSINESS_TYPES.map(({ label, icon }) => (
                    <Chip key={label} icon={icon} active={businessType === label} onClick={() => {
                      setBusinessType(label);
                      autosave({ business_type: label });
                    }}>{label}</Chip>
                  ))}
                </div>
              </Field>

              <div className="br-g-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                <Field label="Industry" hint="Start typing to filter">
                  <Combobox
                    value={industry}
                    onChange={setIndustry}
                    onBlur={() => autosave({ industry: industry || null })}
                    options={SA_INDUSTRIES}
                    placeholder="e.g. Dental & Oral Care"
                    prefix={<Icon name="search" size={14} />}
                  />
                </Field>
                <Field label="Headquarters" hint="Start typing for suggestions">
                  <Combobox
                    value={headquarters}
                    onChange={setHeadquarters}
                    onBlur={() => autosave({ headquarters: headquarters || null })}
                    options={SA_CITIES}
                    placeholder="City or town"
                    prefix={<Icon name="map" size={14} />}
                  />
                </Field>
              </div>

              <Field label="Company size" hint="Including all staff">
                <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 8 }}>
                  {COMPANY_SIZES.map((size) => (
                    <button key={size} type="button" onClick={() => {
                      setCompanySize(size);
                      autosave({ company_size: size });
                    }} style={{
                      padding: "12px 8px", borderRadius: 10, cursor: "pointer", fontFamily: "var(--font-sans)",
                      background: companySize === size ? "var(--ink)" : "var(--surface)",
                      color: companySize === size ? "#fff" : "var(--ink-2)",
                      border: companySize === size ? "1px solid var(--ink)" : "1px solid var(--line-strong)",
                      boxShadow: companySize === size ? "0 1px 2px rgba(0,0,0,.08)" : "var(--shadow-1)",
                      fontSize: 13, fontWeight: 500, textAlign: "center",
                    }}>
                      <div style={{ fontFamily: "var(--font-mono)", fontSize: 15, fontWeight: 600, fontVariantNumeric: "tabular-nums" }}>{size}</div>
                      <div style={{ fontSize: 10.5, opacity: 0.7, marginTop: 2 }}>people</div>
                    </button>
                  ))}
                </div>
              </Field>

              <Field label="Current revenue stage" hint="Annual (ZAR)">
                <div className="br-g-rev" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
                  {REVENUE_STAGES.map(({ label, subtitle }) => (
                    <SelectCard key={label} active={revenueStage === label} title={label} subtitle={subtitle} onClick={() => {
                      setRevenueStage(label);
                      autosave({ revenue_stage: label });
                    }} />
                  ))}
                </div>
              </Field>

              <Field label="What's the main marketing goal right now?" ai>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  {PRIMARY_GOALS.map(({ icon, label, subtitle }) => (
                    <SelectCard key={label} active={primaryGoal === label} icon={icon} title={label} subtitle={subtitle} onClick={() => {
                      setPrimaryGoal(label);
                      autosave({ primary_goal: label });
                    }} />
                  ))}
                </div>
              </Field>
            </div>
          </div>
        </div>
        <StepFooter
          note={saving ? "Saving…" : savedAt ? `Autosaved · ${savedAt}` : undefined}
          continueLabel="Continue to Services"
          onBack={() => router.push("/")}
          onContinue={handleContinue}
        />
      </div>
    </div>
  );
}
