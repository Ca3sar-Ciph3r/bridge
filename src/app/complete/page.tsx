import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getLatestSession } from "@/lib/actions/session";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { Pill } from "@/components/ui/Chip";

const PIPELINE = [
  { name: "Dock",    desc: "CRM · client record + contacts created",       status: "done",   time: "instant", icon: "folder" },
  { name: "Compass", desc: "Proposal generator · drafting now",             status: "doing",  time: "ETA ~4 min", icon: "file" },
  { name: "Deck",    desc: "Client portal · provisioning workspace",        status: "queued", time: "queued", icon: "layers" },
  { name: "Radar",   desc: "Analytics · baseline import from GA4 + GBP",    status: "queued", time: "queued", icon: "target" },
  { name: "Beacon",  desc: "Automation · recall & intake workflows queued", status: "queued", time: "queued", icon: "bolt" },
] as const;

export default async function CompletePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/");

  const session = await getLatestSession();
  if (!session || session.status !== "submitted") redirect("/");

  const firstName = session.client_name?.split(" ")[0] ?? user.email?.split("@")[0] ?? "there";
  const submitTime = session.submitted_at
    ? new Date(session.submitted_at).toLocaleTimeString([], { hour: "numeric", minute: "2-digit", timeZoneName: "short" })
    : "";

  return (
    <div style={{ background: "var(--bg)", display: "flex", flexDirection: "column", minHeight: "100dvh" }}>
      <div className="br-top-nav" style={{ padding: "24px 56px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
        <Link href="/" className="br-wordmark"><span className="br-mark" />Bridge</Link>
        <span className="br-mono" style={{ fontSize: 11, color: "var(--ink-5)" }}>
          SUBMITTED{submitTime ? ` · ${submitTime}` : ""}
        </span>
      </div>

      <div className="br-g-complete" style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: 0 }}>
        {/* Left — success */}
        <div style={{ padding: "32px 32px 40px" }} className="br-fade-up">
          <div style={{
            width: 56, height: 56, borderRadius: 14,
            background: "linear-gradient(135deg, var(--ok) 0%, #059669 100%)",
            display: "grid", placeItems: "center", color: "#fff",
            boxShadow: "0 8px 20px -4px rgba(4,120,87,.4)", marginBottom: 22,
          }}>
            <Icon name="check" size={28} strokeWidth={2.6} />
          </div>

          <h1 style={{ fontSize: 36, fontWeight: 600, letterSpacing: "-0.03em", marginBottom: 12, lineHeight: 1.08, fontFamily: "var(--font-sans)" }}>
            You're handed off, {firstName}.
          </h1>
          <p style={{ marginTop: 0, marginBottom: 24, fontSize: 16, lineHeight: 1.55, color: "var(--ink-3)", maxWidth: 480 }}>
            Bridge has structured everything you shared and routed it to the five tools that run your account.
            Your strategist gets a notification — and a {session.quality_score ?? 94}/100 readiness score — right now.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 24, maxWidth: 480 }}>
            {[
              ["Quality score", `${session.quality_score ?? 94} / 100`],
              ["Status", "Submitted"],
              ["Proposal ETA", "~4 minutes"],
              ["Notified", "Your strategist"],
            ].map(([k, v]) => (
              <div key={k} style={{ padding: 14, background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 10 }}>
                <div className="br-eyebrow" style={{ fontSize: 10 }}>{k}</div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 20, fontWeight: 600, letterSpacing: "-0.02em", marginTop: 4, fontVariantNumeric: "tabular-nums" }}>{v}</div>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", gap: 10 }}>
            <Button variant="primary" size="md" iconRight="arrow_right">Open client portal</Button>
            <Button variant="outline" size="md" icon="file">Download summary</Button>
          </div>
        </div>

        {/* Right — pipeline */}
        <div style={{
          padding: "32px 32px 40px",
          background: "linear-gradient(180deg, #f9f8f4 0%, var(--bg) 100%)",
          borderLeft: "1px solid var(--line)",
          display: "flex", flexDirection: "column",
        }}>
          <div className="br-eyebrow" style={{ marginBottom: 14 }}>Where your data went</div>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: 10 }}>
            {PIPELINE.map((app) => (
              <div key={app.name} style={{
                display: "flex", alignItems: "center", gap: 14, padding: "14px 16px",
                background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 12,
                boxShadow: "var(--shadow-1)",
              }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 9, flexShrink: 0,
                  background: app.status === "done" ? "var(--ok-soft)" : app.status === "doing" ? "var(--accent-soft)" : "var(--surface-2)",
                  color: app.status === "done" ? "var(--ok)" : app.status === "doing" ? "var(--accent)" : "var(--ink-4)",
                  border: `1px solid ${app.status === "done" ? "#a7f3d0" : app.status === "doing" ? "var(--accent-soft-2)" : "var(--line)"}`,
                  display: "grid", placeItems: "center",
                }}>
                  <Icon name={app.icon} size={17} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                    <span style={{ fontSize: 15, fontWeight: 600, letterSpacing: "-0.01em" }}>{app.name}</span>
                    <span className="br-mono" style={{ fontSize: 11, color: "var(--ink-5)" }}>{app.time}</span>
                  </div>
                  <div style={{ fontSize: 12.5, color: "var(--ink-4)" }}>{app.desc}</div>
                </div>
                {app.status === "done" && <Pill tone="ok" size="sm" icon="check">Synced</Pill>}
                {app.status === "doing" && (
                  <Pill tone="accent" size="sm">
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                      <span style={{ width: 6, height: 6, borderRadius: 999, background: "var(--accent)", animation: "br-pulse-soft 1.2s ease-in-out infinite" }} />
                      Running
                    </span>
                  </Pill>
                )}
                {app.status === "queued" && <Pill tone="neutral" size="sm">Queued</Pill>}
              </div>
            ))}
          </div>

          <div style={{
            padding: 14, border: "1px dashed var(--line-strong)", borderRadius: 10, marginTop: 18,
            fontSize: 12.5, color: "var(--ink-3)", display: "flex", alignItems: "center", gap: 10,
          }}>
            <Icon name="info" size={14} color="var(--ink-4)" />
            A Compass-generated proposal will be sent to{" "}
            <strong style={{ color: "var(--ink-2)" }}>{user.email}</strong> in ~4 min.
          </div>
        </div>
      </div>
    </div>
  );
}
