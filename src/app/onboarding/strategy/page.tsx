"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { ProgressRail } from "@/components/layout/ProgressRail";
import { ClientBar } from "@/components/layout/ClientBar";
import { StepFooter } from "@/components/layout/StepFooter";
import { AICallout } from "@/components/layout/AICallout";
import { Field, Textarea } from "@/components/ui/Field";
import { Pill } from "@/components/ui/Chip";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { MobileNav } from "@/components/layout/MobileNav";
import { getOrCreateSession, getStrategy, saveStrategy, updateSessionSection } from "@/lib/actions/session";
import type { OnboardingSession, Competitor } from "@/lib/types";

const CONSTRAINTS: { label: string; desc: string }[] = [
  { label: "Getting new customers costs too much",   desc: "You're spending a lot on ads or referrals but not seeing enough new clients in return." },
  { label: "Not enough people know about us",        desc: "Most people in your area haven't heard of your business — you need more visibility." },
  { label: "No system to track leads or follow-ups", desc: "Enquiries slip through the cracks because there's no software tracking who's interested and what happens next." },
  { label: "Low or too few online reviews",          desc: "Your Google or Facebook rating is low, or you simply don't have many reviews yet — which puts off new customers." },
  { label: "Bookings and quotes take too long",      desc: "Getting a quote out or booking a client still involves phone calls, WhatsApp, and manual back-and-forth." },
  { label: "Our website isn't bringing in business", desc: "People visit the site but don't call, book, or enquire — something in the experience is losing them." },
  { label: "We don't show up on Google",             desc: "When someone searches for your type of service in your area, your business doesn't appear in the results." },
  { label: "Our brand looks inconsistent",           desc: "Your logo, colours, or tone of voice changes across your website, social media, and print — it doesn't feel like one brand." },
];

type IcpField = "icp_demographics" | "icp_geography" | "icp_mindset" | "icp_triggers";

const ICP_SECTIONS: {
  heading: string;
  fields: { key: IcpField; label: string; hint?: string; options: string[] }[];
}[] = [
  {
    heading: "Demographics",
    fields: [
      {
        key: "icp_demographics",
        label: "Age range",
        hint: "Select all that apply",
        options: ["Under 18", "18–24", "25–34", "35–44", "45–54", "55+"],
      },
      {
        key: "icp_demographics",
        label: "Gender",
        options: ["All genders", "Male", "Female", "Non-binary"],
      },
      {
        key: "icp_demographics",
        label: "Monthly household income",
        hint: "ZAR",
        options: ["Under R10K", "R10K–R25K", "R25K–R50K", "R50K–R100K", "R100K+"],
      },
      {
        key: "icp_demographics",
        label: "Education level",
        options: ["High school", "Diploma / Certificate", "Bachelor's degree", "Postgraduate"],
      },
      {
        key: "icp_demographics",
        label: "Employment status",
        options: ["Student", "Employed", "Self-employed", "Business owner", "Retired"],
      },
    ],
  },
  {
    heading: "Location",
    fields: [
      {
        key: "icp_geography",
        label: "Location type",
        options: ["Urban / CBD", "Suburban", "Peri-urban", "Rural", "Online — nationwide"],
      },
      {
        key: "icp_geography",
        label: "Primary region",
        hint: "SA province",
        options: ["Gauteng", "Western Cape", "KwaZulu-Natal", "Eastern Cape", "Limpopo", "Mpumalanga", "North West", "Free State", "Northern Cape", "Nationwide"],
      },
    ],
  },
  {
    heading: "Psychographics",
    fields: [
      {
        key: "icp_mindset",
        label: "Lifestyle",
        hint: "Who they are day-to-day",
        options: ["Urban professional", "Family-focused", "Health & fitness", "Entrepreneur", "Social trendsetter", "Budget-conscious", "Eco-conscious"],
      },
      {
        key: "icp_mindset",
        label: "Core values",
        hint: "What they care about most",
        options: ["Quality over price", "Convenience", "Status & prestige", "Value for money", "Community", "Sustainability", "Innovation"],
      },
    ],
  },
  {
    heading: "Triggers",
    fields: [
      {
        key: "icp_triggers",
        label: "What usually gets them off the fence",
        hint: "Select all that apply",
        options: ["Frustrated with their current provider", "First time needing this kind of help", "Recommended by someone they trust", "Found you on Google or social media", "Their business hit a new milestone", "A life event (home, baby, job change)", "Seasonal or time-of-year pressure", "Looking for better value or lower cost", "Something broke or became urgent", "Planning ahead — no rush, just researching"],
      },
    ],
  },
];

function ICPChipField({ label, hint, options, selected, onToggle }: {
  label: string;
  hint?: string;
  options: string[];
  selected: string[];
  onToggle: (opt: string) => void;
}) {
  return (
    <div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 7, marginBottom: 7 }}>
        <span style={{ fontSize: 12.5, fontWeight: 600, color: "var(--ink-2)" }}>{label}</span>
        {hint && <span style={{ fontSize: 11, color: "var(--ink-5)" }}>{hint}</span>}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {options.map(opt => {
          const active = selected.includes(opt);
          return (
            <button key={opt} type="button" onClick={() => onToggle(opt)} style={{
              padding: "5px 12px", borderRadius: 999, fontSize: 12.5, cursor: "pointer",
              fontFamily: "var(--font-sans)", fontWeight: active ? 600 : 400,
              background: active ? "var(--ink)" : "var(--surface-2)",
              color: active ? "#fff" : "var(--ink-3)",
              border: `1px solid ${active ? "var(--ink)" : "var(--line-strong)"}`,
              transition: "background .1s, color .1s, border-color .1s",
            }}>
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function StrategyPage() {
  const router = useRouter();
  const [session, setSession] = useState<OnboardingSession | null>(null);
  const [savedAt, setSavedAt] = useState<string | undefined>();
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const sessionRef = useRef<OnboardingSession | null>(null);

  const [description, setDescription] = useState("");
  const [icpDemographics, setIcpDemographics] = useState<string[]>([]);
  const [icpGeography, setIcpGeography] = useState<string[]>([]);
  const [icpMindset, setIcpMindset] = useState<string[]>([]);
  const [icpTriggers, setIcpTriggers] = useState<string[]>([]);
  const [competitors, setCompetitors] = useState<Competitor[]>([]);
  const [newComp, setNewComp] = useState("");
  const [constraints, setConstraints] = useState<string[]>([]);

  useEffect(() => {
    async function load() {
      const sess = await getOrCreateSession();
      if (!sess) { router.push("/"); return; }
      setSession(sess);
      sessionRef.current = sess;
      const strat = await getStrategy(sess.id);
      if (strat) {
        setDescription(strat.business_description ?? "");
        setIcpDemographics(strat.icp_demographics ?? []);
        setIcpGeography(strat.icp_geography ?? []);
        setIcpMindset(strat.icp_mindset ?? []);
        setIcpTriggers(strat.icp_triggers ?? []);
        setCompetitors(strat.competitors ?? []);
        setConstraints(strat.growth_constraints ?? []);
      }
      setLoading(false);
    }
    load();
  }, [router]);

  const autosave = useCallback(async (patch: object) => {
    const sess = sessionRef.current;
    if (!sess) return;
    setSaving(true);
    await saveStrategy(sess.id, patch);
    setSaving(false);
    setSavedAt(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
  }, []);

  function toggleIcp(fieldKey: IcpField, opt: string) {
    const stateMap: Record<IcpField, string[]> = {
      icp_demographics: icpDemographics,
      icp_geography: icpGeography,
      icp_mindset: icpMindset,
      icp_triggers: icpTriggers,
    };
    const setMap: Record<IcpField, (v: string[]) => void> = {
      icp_demographics: setIcpDemographics,
      icp_geography: setIcpGeography,
      icp_mindset: setIcpMindset,
      icp_triggers: setIcpTriggers,
    };
    const current = stateMap[fieldKey];
    const next = current.includes(opt) ? current.filter(x => x !== opt) : [...current, opt];
    setMap[fieldKey](next);
    autosave({ [fieldKey]: next });
  }

  function addCompetitor() {
    if (!newComp.trim()) return;
    const url = newComp.trim().replace(/^https?:\/\//, "");
    const name = url.split(".")[0].replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());
    const next = [...competitors, { name, url, type: "direct" }];
    setCompetitors(next);
    setNewComp("");
    autosave({ competitors: next });
  }

  function removeCompetitor(url: string) {
    const next = competitors.filter(c => c.url !== url);
    setCompetitors(next);
    autosave({ competitors: next });
  }

  function toggleConstraint(c: string) {
    const next = constraints.includes(c) ? constraints.filter(x => x !== c) : [...constraints, c];
    setConstraints(next);
    autosave({ growth_constraints: next });
  }

  async function handleContinue() {
    const sess = sessionRef.current;
    if (!sess) return;
    await saveStrategy(sess.id, {
      business_description: description || null,
      icp_demographics: icpDemographics,
      icp_geography: icpGeography,
      icp_mindset: icpMindset,
      icp_triggers: icpTriggers,
      competitors,
      growth_constraints: constraints,
    });
    await updateSessionSection(sess.id, "goals");
    router.push("/onboarding/goals");
  }

  const icpSelections = icpDemographics.length + icpGeography.length + icpMindset.length + icpTriggers.length;

  if (loading) return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100dvh", background: "var(--bg)" }}>
      <div style={{ width: 28, height: 28, border: "2.5px solid var(--line)", borderTopColor: "var(--ink)", borderRadius: 999, animation: "spin 0.7s linear infinite" }} />
    </div>
  );

  const stateMap: Record<IcpField, string[]> = {
    icp_demographics: icpDemographics,
    icp_geography: icpGeography,
    icp_mindset: icpMindset,
    icp_triggers: icpTriggers,
  };

  return (
    <div style={{ display: "flex", flexDirection: "row", minHeight: "100dvh", background: "var(--bg)" }}>
      <ProgressRail current="strategy" savedAt={saving ? "Saving…" : savedAt} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <ClientBar section="strategy" email={session?.client_email ?? undefined} />
        <MobileNav current="strategy" savedAt={saving ? "Saving…" : savedAt} />
        <div className="br-scroll" style={{ flex: 1, overflowY: "auto", padding: "32px 56px" }}>
          <div style={{ maxWidth: 1000 }} className="br-fade-up">
            <Pill tone="neutral" size="sm">C · Intelligence</Pill>
            <h1 style={{ marginTop: 12, marginBottom: 8, fontSize: 32, fontWeight: 600, letterSpacing: "-0.025em", lineHeight: 1.1, fontFamily: "var(--font-sans)" }}>
              Tell us how you see your business.
            </h1>
            <p style={{ marginTop: 0, marginBottom: 24, fontSize: 16, color: "var(--ink-3)", lineHeight: 1.55 }}>
              Talk to us like you'd talk to a strategist. We'll structure it for you.
            </p>

            {/* Business description */}
            <Card padding={20} style={{ marginBottom: 16, borderColor: "#ddd6fe", background: "linear-gradient(180deg, #faf8ff 0%, #fff 100%)" }}>
              <Field label="Describe your business in your own words" ai hint="2–4 sentences is plenty">
                <Textarea
                  rows={4}
                  value={description}
                  onChange={setDescription}
                  placeholder="Tell us about your business, your customers, and what makes you different…"
                  shimmer={description.length > 0}
                />
              </Field>
              <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 8 }}>
                <button type="button" onClick={() => autosave({ business_description: description || null })} style={{
                  padding: "6px 12px", borderRadius: 7, background: "var(--accent-soft)", color: "var(--accent-ink)",
                  border: "1px solid var(--accent-soft-2)", cursor: "pointer", fontSize: 12, fontWeight: 500,
                  fontFamily: "var(--font-sans)", display: "inline-flex", alignItems: "center", gap: 6,
                }}>
                  <Icon name="sparkle" size={12} /> Save &amp; extract
                </button>
              </div>
            </Card>

            {/* ICP + Competitors side by side */}
            <div className="br-g-side" style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 16, marginBottom: 16 }}>

              {/* ICP — structured chip selectors */}
              <Card padding={20}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                  <div>
                    <div className="br-eyebrow">Ideal customer profile</div>
                    <div style={{ fontSize: 16, fontWeight: 600, marginTop: 4, letterSpacing: "-0.01em" }}>Who you serve best</div>
                  </div>
                  {icpSelections > 0
                    ? <Pill tone="ok" size="sm" icon="check">{icpSelections} selected</Pill>
                    : <Pill tone="neutral" size="sm">Click to select</Pill>
                  }
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                  {ICP_SECTIONS.map((section, si) => (
                    <div key={section.heading}>
                      {si > 0 && <div style={{ height: 1, background: "var(--line)", margin: "14px 0" }} />}
                      <div style={{ fontSize: 11, fontWeight: 600, color: "var(--ink-5)", letterSpacing: ".07em", textTransform: "uppercase", marginBottom: 10 }}>
                        {section.heading}
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                        {section.fields.map(field => (
                          <ICPChipField
                            key={`${field.key}-${field.label}`}
                            label={field.label}
                            hint={field.hint}
                            options={field.options}
                            selected={stateMap[field.key]}
                            onToggle={(opt) => toggleIcp(field.key, opt)}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Competitors */}
              <Card padding={20}>
                <div className="br-eyebrow" style={{ marginBottom: 6 }}>Competitors</div>
                <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 12, letterSpacing: "-0.01em" }}>Who you're up against</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {competitors.map((c) => (
                    <div key={c.url} style={{
                      display: "flex", alignItems: "center", gap: 10, padding: "10px 12px",
                      border: "1px solid var(--line)", borderRadius: 10, background: "var(--surface-2)",
                    }}>
                      <div style={{ width: 22, height: 22, borderRadius: 5, background: "#fff", border: "1px solid var(--line)", display: "grid", placeItems: "center", fontSize: 11, fontWeight: 600, color: "var(--ink-3)", flexShrink: 0 }}>
                        {c.name[0]}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 13, fontWeight: 500 }}>{c.name}</div>
                        <div className="br-mono" style={{ fontSize: 11, color: "var(--ink-4)" }}>{c.url}</div>
                      </div>
                      <button type="button" onClick={() => removeCompetitor(c.url)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--ink-5)", padding: 4 }}>
                        <Icon name="x" size={14} />
                      </button>
                    </div>
                  ))}
                  <div style={{ display: "flex", gap: 8 }}>
                    <input
                      value={newComp}
                      onChange={e => setNewComp(e.target.value)}
                      onKeyDown={e => e.key === "Enter" && addCompetitor()}
                      placeholder="competitor.com"
                      style={{
                        flex: 1, padding: "8px 12px", borderRadius: 8, border: "1px dashed var(--line-strong)",
                        background: "transparent", color: "var(--ink)", fontSize: 13, fontFamily: "var(--font-sans)", outline: "none",
                      }}
                    />
                    <button type="button" onClick={addCompetitor} style={{
                      padding: "8px 12px", borderRadius: 8, background: "var(--surface)", border: "1px solid var(--line-strong)",
                      cursor: "pointer", fontSize: 13, fontFamily: "var(--font-sans)", display: "flex", alignItems: "center", gap: 6,
                    }}>
                      <Icon name="plus" size={13} /> Add
                    </button>
                  </div>
                </div>
              </Card>
            </div>

            {/* Growth constraints */}
            <Card padding={20}>
              <div className="br-eyebrow" style={{ marginBottom: 6 }}>Growth constraints</div>
              <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 12, letterSpacing: "-0.01em" }}>What's actually in the way?</div>
              <div className="br-g-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                {CONSTRAINTS.map(({ label, desc }) => {
                  const on = constraints.includes(label);
                  return (
                    <label key={label} onClick={() => toggleConstraint(label)} style={{
                      display: "flex", alignItems: "flex-start", gap: 10, padding: "11px 12px", borderRadius: 10, cursor: "pointer",
                      background: on ? "var(--warn-soft)" : "var(--surface-2)",
                      border: `1px solid ${on ? "#fcd34d" : "var(--line)"}`,
                    }}>
                      <div style={{
                        width: 16, height: 16, borderRadius: 4, flexShrink: 0, marginTop: 2,
                        background: on ? "var(--ink)" : "var(--surface)",
                        border: on ? "1px solid var(--ink)" : "1.5px solid var(--line-strong)",
                        display: "grid", placeItems: "center", color: "#fff",
                      }}>
                        {on && <Icon name="check" size={10} strokeWidth={3} />}
                      </div>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: "var(--ink-2)", lineHeight: 1.3 }}>{label}</div>
                        <div style={{ fontSize: 11.5, color: "var(--ink-4)", marginTop: 3, lineHeight: 1.45 }}>{desc}</div>
                      </div>
                    </label>
                  );
                })}
              </div>
            </Card>

            <div style={{ marginTop: 16 }}>
              <AICallout title="Bridge intelligence">
                ICP selections feed audience targeting directly — demographics set ad parameters, location narrows geo-targeting, and trigger events time your campaigns.
              </AICallout>
            </div>
          </div>
        </div>
        <StepFooter
          note={saving ? "Saving…" : savedAt ? `Autosaved · ${savedAt}` : icpSelections > 0 ? `${icpSelections} ICP attributes selected` : undefined}
          continueLabel="Continue to Assets"
          onBack={() => router.push("/onboarding/services")}
          onContinue={handleContinue}
        />
      </div>
    </div>
  );
}
