"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { ProgressRail } from "@/components/layout/ProgressRail";
import { ClientBar } from "@/components/layout/ClientBar";
import { StepFooter } from "@/components/layout/StepFooter";
import { AICallout } from "@/components/layout/AICallout";
import { Pill } from "@/components/ui/Chip";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { MobileNav } from "@/components/layout/MobileNav";
import { getOrCreateSession, saveAccountAccess, getAccountAccess, updateSessionSection } from "@/lib/actions/session";
import type { OnboardingSession } from "@/lib/types";

type PlatformStatus = "not_started" | "steps_sent" | "connected";

type Platform = {
  id: string;
  name: string;
  icon: string;
  url: string;
  steps: string[];
};

const PLATFORMS: Platform[] = [
  {
    id: "google_business",
    name: "Google Business Profile",
    icon: "globe",
    url: "https://business.google.com",
    steps: [
      "Sign in and click Users in the left menu",
      "Click Add users and enter access@digitalnative.co.za",
      "Select Manager as the role",
      "Click Invite — we will receive it instantly",
    ],
  },
  {
    id: "meta_business",
    name: "Meta Business Manager",
    icon: "layers",
    url: "https://business.facebook.com/settings/partners",
    steps: [
      "Click Business Settings → Users → Partners",
      "Click Add → Give a partner access to your assets",
      "Enter Digital Native's Business ID (we will confirm this with you)",
      "Select your Ad Account and Page to share, then confirm",
    ],
  },
  {
    id: "google_ads",
    name: "Google Ads",
    icon: "megaphone",
    url: "https://ads.google.com/aw/accountaccess/users",
    steps: [
      "Click the + button to add a user",
      "Enter access@digitalnative.co.za",
      "Select Manager as the access level",
      "Click Send invitation",
    ],
  },
  {
    id: "google_analytics",
    name: "Google Analytics 4",
    icon: "target",
    url: "https://analytics.google.com",
    steps: [
      "Click Admin (gear icon) in the bottom left",
      "Under Account or Property, click Access Management",
      "Click + → Add users and enter access@digitalnative.co.za",
      "Select Editor role as a minimum and click Add",
    ],
  },
  {
    id: "instagram",
    name: "Instagram",
    icon: "star",
    url: "https://business.facebook.com/settings/instagram-accounts",
    steps: [
      "Instagram is managed through Meta Business Manager",
      "Complete the Meta Business Manager steps above first",
      "When sharing assets, include your Instagram account in the selection",
    ],
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    icon: "users",
    url: "https://www.linkedin.com/company/admin/manage-admins/",
    steps: [
      "Go to your LinkedIn Company Page and click Admin tools",
      "Select Manage admins → Add admin",
      "Search for Digital Native or enter the page name",
      "Choose Super admin for full access and save",
    ],
  },
  {
    id: "tiktok",
    name: "TikTok Business",
    icon: "bolt",
    url: "https://business.tiktok.com",
    steps: [
      "Click Assets → Ad Accounts in the left menu",
      "Click Assign on your ad account",
      "Enter Digital Native's Business Center ID (we will provide this)",
      "Select Admin access level and confirm",
    ],
  },
];

const STATUS_CONFIG: Record<PlatformStatus, { label: string; tone: "neutral" | "warn" | "ok"; icon?: string }> = {
  not_started: { label: "Not started", tone: "neutral" },
  steps_sent:  { label: "Steps sent",  tone: "warn",    icon: "alert" },
  connected:   { label: "Connected",   tone: "ok",      icon: "check" },
};

export default function AccessPage() {
  const router = useRouter();
  const [session, setSession] = useState<OnboardingSession | null>(null);
  const [savedAt, setSavedAt] = useState<string | undefined>();
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const sessionRef = useRef<OnboardingSession | null>(null);

  const [statuses, setStatuses] = useState<Record<string, PlatformStatus>>({});
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      const sess = await getOrCreateSession();
      if (!sess) { router.push("/"); return; }
      setSession(sess);
      sessionRef.current = sess;
      const access = await getAccountAccess(sess.id);
      const statusMap: Record<string, PlatformStatus> = {};
      for (const row of access) {
        statusMap[row.platform_name] = row.status as PlatformStatus;
      }
      setStatuses(statusMap);
      setLoading(false);
    }
    load();
  }, [router]);

  const cycleStatus = useCallback(async (platformId: string) => {
    const sess = sessionRef.current;
    if (!sess) return;
    const current = statuses[platformId] ?? "not_started";
    const next: PlatformStatus = current === "not_started" ? "steps_sent" : current === "steps_sent" ? "connected" : "not_started";
    setStatuses(prev => ({ ...prev, [platformId]: next }));
    setSaving(true);
    await saveAccountAccess(sess.id, platformId, next);
    setSaving(false);
    setSavedAt(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
  }, [statuses]);

  async function handleContinue() {
    const sess = sessionRef.current;
    if (!sess) return;
    await updateSessionSection(sess.id, "goals");
    router.push("/onboarding/goals");
  }

  if (loading) return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100dvh", background: "var(--bg)" }}>
      <div style={{ width: 28, height: 28, border: "2.5px solid var(--line)", borderTopColor: "var(--ink)", borderRadius: 999, animation: "spin 0.7s linear infinite" }} />
    </div>
  );

  const connectedCount = Object.values(statuses).filter(s => s === "connected").length;
  const sentCount = Object.values(statuses).filter(s => s === "steps_sent").length;

  return (
    <div style={{ display: "flex", flexDirection: "row", minHeight: "100dvh", background: "var(--bg)" }}>
      <ProgressRail current="access" savedAt={saving ? "Saving…" : savedAt} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <ClientBar section="access" email={session?.client_email ?? undefined} />
        <MobileNav current="access" savedAt={saving ? "Saving…" : savedAt} />
        <div className="br-scroll" style={{ flex: 1, overflowY: "auto", padding: "32px 56px" }}>
          <div style={{ maxWidth: 860 }} className="br-fade-up">
            <Pill tone="neutral" size="sm">E · Access</Pill>
            <h1 style={{ marginTop: 12, marginBottom: 8, fontSize: 32, fontWeight: 600, letterSpacing: "-0.025em", lineHeight: 1.1, fontFamily: "var(--font-sans)" }}>
              Grant Digital Native access.
            </h1>
            <p style={{ marginTop: 0, marginBottom: 8, fontSize: 16, color: "var(--ink-3)", lineHeight: 1.55 }}>
              We need manager-level access to each platform to run and report on campaigns. Follow the steps for each one — they take under 2 minutes each.
            </p>
            <div style={{ display: "flex", gap: 10, marginBottom: 28 }}>
              <Pill tone="ok" size="sm" icon="check">{connectedCount} connected</Pill>
              {sentCount > 0 && <Pill tone="warn" size="sm">{sentCount} in progress</Pill>}
              <Pill tone="neutral" size="sm">{PLATFORMS.length - connectedCount - sentCount} not started</Pill>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {PLATFORMS.map((platform) => {
                const status = statuses[platform.id] ?? "not_started";
                const cfg = STATUS_CONFIG[status];
                const isExpanded = expanded === platform.id;

                return (
                  <Card key={platform.id} padding={0} style={{ overflow: "hidden" }}>
                    <div style={{
                      display: "flex", alignItems: "center", gap: 14, padding: "16px 20px",
                      background: status === "connected" ? "linear-gradient(180deg, #f0fdf4 0%, #fff 100%)" : "var(--surface)",
                      borderBottom: isExpanded ? "1px solid var(--line)" : "none",
                    }}>
                      <div style={{
                        width: 38, height: 38, borderRadius: 10, display: "grid", placeItems: "center", flexShrink: 0,
                        background: status === "connected" ? "rgba(34,197,94,.12)" : "var(--surface-2)",
                        color: status === "connected" ? "#16a34a" : "var(--ink-3)",
                        border: `1px solid ${status === "connected" ? "#bbf7d0" : "var(--line)"}`,
                      }}>
                        <Icon name={platform.icon} size={17} />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 14, fontWeight: 600, letterSpacing: "-0.005em" }}>{platform.name}</div>
                        <div style={{ fontSize: 12, color: "var(--ink-4)", marginTop: 2 }}>
                          {status === "connected"
                            ? "Access confirmed"
                            : status === "steps_sent"
                            ? "In progress — mark as connected once done"
                            : "Open the platform, follow the steps, then mark as done"}
                        </div>
                      </div>
                      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                        <a
                          href={platform.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            padding: "5px 12px", borderRadius: 20, cursor: "pointer", fontFamily: "var(--font-sans)",
                            fontSize: 12, fontWeight: 500, display: "inline-flex", alignItems: "center", gap: 5,
                            background: "var(--accent-soft)", color: "var(--accent)",
                            border: "1px solid var(--accent-soft-2)", textDecoration: "none",
                          }}
                        >
                          Open →
                        </a>
                        <button type="button" onClick={() => cycleStatus(platform.id)} style={{
                          padding: "5px 12px", borderRadius: 20, cursor: "pointer", fontFamily: "var(--font-sans)",
                          fontSize: 12, fontWeight: 500, display: "flex", alignItems: "center", gap: 6,
                          background: status === "connected" ? "rgba(34,197,94,.12)" : status === "steps_sent" ? "rgba(245,158,11,.12)" : "var(--surface-2)",
                          color: status === "connected" ? "#16a34a" : status === "steps_sent" ? "#b45309" : "var(--ink-3)",
                          border: `1px solid ${status === "connected" ? "#bbf7d0" : status === "steps_sent" ? "#fde68a" : "var(--line)"}`,
                        }}>
                          {cfg.icon && <Icon name={cfg.icon} size={11} />}
                          {status === "not_started" ? "Mark sent" : status === "steps_sent" ? "Mark connected" : "Reset"}
                        </button>
                        <button type="button" onClick={() => setExpanded(isExpanded ? null : platform.id)} style={{
                          width: 28, height: 28, borderRadius: 7, display: "grid", placeItems: "center",
                          background: "var(--surface-2)", border: "1px solid var(--line)", cursor: "pointer",
                        }}>
                          <Icon name={isExpanded ? "chevron_down" : "chevron_right"} size={14} color="var(--ink-4)" />
                        </button>
                      </div>
                    </div>

                    {isExpanded && (
                      <div style={{ padding: "16px 20px 18px", background: "var(--bg)" }}>
                        <div className="br-eyebrow" style={{ marginBottom: 12 }}>Steps</div>
                        <ol style={{ margin: 0, paddingLeft: 20, display: "flex", flexDirection: "column", gap: 8 }}>
                          {platform.steps.map((step, i) => (
                            <li key={i} style={{ fontSize: 13.5, color: "var(--ink-2)", lineHeight: 1.55, paddingLeft: 4 }}>
                              {step}
                            </li>
                          ))}
                        </ol>
                        <div style={{ marginTop: 16, display: "flex", gap: 10, flexWrap: "wrap" }}>
                          <a
                            href={platform.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              padding: "8px 16px", borderRadius: 8, background: "var(--accent)", color: "#fff",
                              border: "none", cursor: "pointer", fontSize: 13, fontWeight: 500,
                              fontFamily: "var(--font-sans)", display: "inline-flex", alignItems: "center", gap: 7,
                              textDecoration: "none",
                            }}
                          >
                            Open {platform.name} →
                          </a>
                          {status !== "connected" && (
                            <button type="button" onClick={() => { cycleStatus(platform.id); }} style={{
                              padding: "8px 16px", borderRadius: 8, background: "var(--ok-soft)", color: "var(--ok)",
                              border: "1px solid #a7f3d0", cursor: "pointer", fontSize: 13, fontWeight: 500,
                              fontFamily: "var(--font-sans)", display: "inline-flex", alignItems: "center", gap: 7,
                            }}>
                              <Icon name="check" size={13} />
                              {status === "not_started" ? "I've sent the invite" : "Access is granted"}
                            </button>
                          )}
                          <button type="button" onClick={() => setExpanded(null)} style={{
                            padding: "8px 14px", borderRadius: 8, background: "var(--surface-2)", color: "var(--ink-3)",
                            border: "1px solid var(--line)", cursor: "pointer", fontSize: 13,
                            fontFamily: "var(--font-sans)",
                          }}>
                            Close
                          </button>
                        </div>
                      </div>
                    )}
                  </Card>
                );
              })}
            </div>

            <div style={{ marginTop: 20 }}>
              <AICallout title="Why we need this">
                Manager access lets us launch campaigns, read analytics, and report back without asking for your password. You can revoke access at any time — your account, your rules.
              </AICallout>
            </div>
          </div>
        </div>
        <StepFooter
          note={saving ? "Saving…" : connectedCount > 0 ? `${connectedCount} of ${PLATFORMS.length} connected` : savedAt ? `Autosaved · ${savedAt}` : undefined}
          continueLabel="Continue to Goals"
          onBack={() => router.push("/onboarding/assets")}
          onContinue={handleContinue}
        />
      </div>
    </div>
  );
}
