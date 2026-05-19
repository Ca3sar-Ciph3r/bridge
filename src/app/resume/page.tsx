import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getOrCreateSession, getAllSectionData } from "@/lib/actions/session";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Pill } from "@/components/ui/Chip";
import { SignOutButton } from "@/components/ui/SignOutButton";
import { NAV_SECTIONS } from "@/lib/types";

export default async function ResumePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/");

  // Agency admin gets a choice screen
  if (user.email === process.env.AGENCY_ADMIN_EMAIL) {
    return (
      <div style={{ background: "var(--bg)", display: "flex", flexDirection: "column", minHeight: "100dvh" }}>
        <div className="br-top-nav" style={{ padding: "24px 56px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/" className="br-wordmark"><span className="br-mark"/>Bridge</Link>
          <span className="br-mono" style={{ fontSize: 11, color: "var(--ink-5)" }}>AGENCY · LUKE GUNN</span>
        </div>
        <div style={{ flex: 1, display: "grid", placeItems: "center", padding: "24px 32px" }}>
          <div style={{ width: 560, maxWidth: "100%" }} className="br-fade-up">
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 8 }}>Welcome back</div>
            <h1 style={{ fontSize: 32, fontWeight: 700, letterSpacing: "-0.03em", marginBottom: 6, lineHeight: 1.1, fontFamily: "var(--font-sans)" }}>
              Where do you want to go?
            </h1>
            <p style={{ fontSize: 15, color: "var(--ink-3)", lineHeight: 1.55, marginBottom: 28 }}>
              You&apos;re signed in as the agency owner. Choose your destination.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <Link href="/agency/submissions" style={{ textDecoration: "none" }}>
                <div style={{
                  display: "flex", alignItems: "center", gap: 16, padding: "20px 22px",
                  background: "var(--ink)", borderRadius: 14, boxShadow: "0 4px 16px -4px rgba(0,0,0,.25)",
                  transition: "opacity .15s",
                }}>
                  <div style={{ width: 42, height: 42, borderRadius: 10, background: "rgba(255,255,255,.1)", display: "grid", placeItems: "center", flexShrink: 0 }}>
                    <Icon name="layers" size={20} color="#fff"/>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 15, fontWeight: 700, color: "#fff", letterSpacing: "-0.01em" }}>Agency Dashboard</div>
                    <div style={{ fontSize: 13, color: "rgba(255,255,255,.55)", marginTop: 2 }}>Manage submissions, activate portals, edit clients</div>
                  </div>
                  <Icon name="arrow_right" size={16} color="rgba(255,255,255,.5)"/>
                </div>
              </Link>
              <Link href="/onboarding/snapshot" style={{ textDecoration: "none" }}>
                <div style={{
                  display: "flex", alignItems: "center", gap: 16, padding: "20px 22px",
                  background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 14,
                  boxShadow: "var(--shadow-1)", transition: "border-color .15s",
                }}>
                  <div style={{ width: 42, height: 42, borderRadius: 10, background: "var(--surface-2)", border: "1px solid var(--line)", display: "grid", placeItems: "center", flexShrink: 0 }}>
                    <Icon name="search" size={20} color="var(--ink-3)"/>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 15, fontWeight: 600, color: "var(--ink)", letterSpacing: "-0.01em" }}>Preview Onboarding</div>
                    <div style={{ fontSize: 13, color: "var(--ink-4)", marginTop: 2 }}>Walk through the client experience from the start</div>
                  </div>
                  <Icon name="arrow_right" size={16} color="var(--ink-5)"/>
                </div>
              </Link>
            </div>
            <div style={{ marginTop: 24, textAlign: "center" }}>
              <SignOutButton style={{ fontSize: 12, color: "var(--ink-5)" }}>Sign out</SignOutButton>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const session = await getOrCreateSession();
  if (!session) redirect("/");

  // Submitted clients go straight to the portal
  if (session.status === "submitted") redirect("/portal/dashboard");

  const allData = await getAllSectionData(session.id);

  // Guard against stale section IDs (assets/access removed from flow)
  const validSections = NAV_SECTIONS.map(s => s.id);
  const rawSection = session.current_section as string;
  const resolvedSection = validSections.includes(rawSection as typeof validSections[number])
    ? (rawSection as typeof validSections[number])
    : "goals";

  const currentIdx = NAV_SECTIONS.findIndex(s => s.id === resolvedSection) ?? 0;
  const isNew = currentIdx === 0 && !allData.snapshot;

  if (isNew) redirect("/onboarding/snapshot");

  const sections = NAV_SECTIONS.map((s, i) => ({
    ...s,
    state: i < currentIdx ? "done" : i === currentIdx ? "active" : "todo" as const,
  }));

  const firstName = session.client_name?.split(" ")[0] ?? user.email?.split("@")[0] ?? "there";
  const remaining = NAV_SECTIONS.length - currentIdx;

  return (
    <div style={{ background: "var(--bg)", display: "flex", flexDirection: "column", minHeight: "100dvh" }}>
      <div className="br-top-nav" style={{ padding: "24px 56px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link href="/" className="br-wordmark"><span className="br-mark"/>Bridge</Link>
        <span className="br-mono" style={{ fontSize: 11, color: "var(--ink-5)" }}>SESSION · RESUMED</span>
      </div>

      <div style={{ flex: 1, display: "grid", placeItems: "center", padding: "16px 32px" }}>
        <div style={{ width: 640, maxWidth: "100%", padding: "0 4px" }} className="br-fade-up br-mw-full">
          <Pill tone="accent" size="md" icon="sparkle">Welcome back, {firstName}</Pill>
          <h1 style={{ fontSize: 36, fontWeight: 600, letterSpacing: "-0.025em", marginTop: 14, marginBottom: 8, lineHeight: 1.1, fontFamily: "var(--font-sans)" }}>
            We left off at {NAV_SECTIONS[currentIdx]?.title}.<br/>
            <span style={{ color: "var(--ink-4)" }}>Pick up where you were — it'll only take ~{remaining * 2} more minutes.</span>
          </h1>
          <p style={{ fontSize: 16, color: "var(--ink-3)", lineHeight: 1.55, marginTop: 0, marginBottom: 28 }}>
            Everything you've shared is saved. We auto-resumed your session — any device, same magic link.
          </p>

          <Card padding={22} style={{ marginBottom: 18, boxShadow: "var(--shadow-2)" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
              <div>
                <div className="br-eyebrow">Your progress so far</div>
                <div style={{ fontSize: 16, fontWeight: 600, marginTop: 4, letterSpacing: "-0.005em" }}>{currentIdx} of {NAV_SECTIONS.length} sections complete</div>
              </div>
              <Pill tone="ok" size="sm" icon="check">Autosaved</Pill>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 4, marginBottom: 14 }}>
              {sections.map((s, i) => (
                <div key={s.id} style={{
                  display: "grid", gridTemplateColumns: "auto 1fr auto", gap: 12, alignItems: "center",
                  padding: "10px 12px", borderRadius: 8,
                  background: s.state === "active" ? "var(--surface)" : "transparent",
                  border: s.state === "active" ? "1.5px solid var(--accent)" : "1px solid transparent",
                  boxShadow: s.state === "active" ? "0 0 0 3px rgba(79,70,229,.08)" : "none",
                }}>
                  <div style={{
                    width: 22, height: 22, borderRadius: 999,
                    background: s.state === "done" ? "var(--ink)" : s.state === "active" ? "var(--accent-soft)" : "var(--surface-2)",
                    border: s.state === "done" ? "1px solid var(--ink)" : s.state === "active" ? "1.5px solid var(--accent)" : "1.5px solid var(--line-strong)",
                    display: "grid", placeItems: "center", flexShrink: 0,
                  }}>
                    {s.state === "done" && <Icon name="check" size={11} strokeWidth={3} color="#fff"/>}
                    {s.state === "active" && <div style={{ width: 6, height: 6, borderRadius: 999, background: "var(--accent)" }}/>}
                    {s.state === "todo" && <span className="br-mono" style={{ fontSize: 10, color: "var(--ink-5)" }}>{i + 1}</span>}
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ fontSize: 13.5, fontWeight: s.state === "active" ? 600 : 500, color: s.state === "todo" ? "var(--ink-4)" : "var(--ink)" }}>{s.title}</span>
                      {s.state === "active" && <Pill tone="accent" size="sm">Resume here</Pill>}
                    </div>
                    <div style={{ fontSize: 12, color: "var(--ink-4)", marginTop: 1 }}>{s.subtitle}</div>
                  </div>
                  <span className="br-mono" style={{ fontSize: 10.5, color: "var(--ink-5)" }}>
                    {s.state === "done" ? "✓" : s.state === "active" ? "In progress" : "—"}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <Link href={NAV_SECTIONS[currentIdx]?.path ?? "/onboarding/snapshot"}>
              <Button variant="accent" size="lg" iconRight="arrow_right">
                Continue from {NAV_SECTIONS[currentIdx]?.title}
              </Button>
            </Link>
            <Link href="/onboarding/snapshot">
              <Button variant="outline" size="md" icon="info">Start from beginning</Button>
            </Link>
            <div style={{ flex: 1 }}/>
            <span className="br-mono" style={{ fontSize: 11, color: "var(--ink-5)" }}>~{remaining * 2} MIN REMAINING</span>
          </div>
        </div>
      </div>

      <div style={{ padding: "16px 56px", borderTop: "1px solid var(--line)", fontSize: 11, color: "var(--ink-5)", display: "flex", justifyContent: "space-between" }}>
        <span>Session active · 7 days remaining</span>
        <span>Not you? <SignOutButton style={{ color: "var(--ink-3)", fontWeight: 500, textDecoration: "underline", textUnderlineOffset: 3 }}>Sign out</SignOutButton></span>
      </div>
    </div>
  );
}
