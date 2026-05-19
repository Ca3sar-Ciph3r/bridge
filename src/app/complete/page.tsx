import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getLatestSession } from "@/lib/actions/session";
import { Icon } from "@/components/ui/Icon";

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

      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 56px" }}>
        <div style={{ maxWidth: 520, width: "100%" }} className="br-fade-up">
          <div style={{
            width: 56, height: 56, borderRadius: 14,
            background: "linear-gradient(135deg, var(--ok) 0%, #059669 100%)",
            display: "grid", placeItems: "center", color: "#fff",
            boxShadow: "0 8px 20px -4px rgba(4,120,87,.4)", marginBottom: 24,
          }}>
            <Icon name="check" size={28} strokeWidth={2.6} />
          </div>

          <h1 style={{ fontSize: 36, fontWeight: 600, letterSpacing: "-0.03em", marginBottom: 12, lineHeight: 1.08, fontFamily: "var(--font-sans)" }}>
            You&apos;re all done, {firstName}.
          </h1>
          <p style={{ marginTop: 0, marginBottom: 28, fontSize: 16, lineHeight: 1.65, color: "var(--ink-3)" }}>
            Everything you&apos;ve shared has been handed off to{" "}
            <strong style={{ color: "var(--ink-2)" }}>Luke Gunn</strong>, who will personally be managing
            your account. Luke will review your information, put together a strategy tailored to your
            business, and be in touch with you shortly.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 0 }}>
            {([
              { done: true,  icon: "check",      label: "Submission received",   desc: "Everything you've filled in has been sent directly to Luke Gunn." },
              { done: false, icon: "file",        label: "Proposal on its way",   desc: "Luke will review your information and send you a tailored proposal within 1–2 business days." },
              { done: false, icon: "sparkle",     label: "You review & approve",  desc: "Once you're happy with the proposal, you sign off and we get started." },
              { done: false, icon: "arrow_right", label: "Your client portal opens", desc: "You'll get a personal portal to track progress, reports, deliverables, and invoices." },
            ] as const).map(({ done, icon, label, desc }) => (
              <div key={label} style={{
                display: "flex", alignItems: "flex-start", gap: 12,
                padding: "12px 14px", borderRadius: 10,
                background: done ? "var(--ok-soft)" : "var(--surface)",
                border: `1px solid ${done ? "var(--ok)" : "var(--line)"}`,
                opacity: done ? 1 : 0.65,
              }}>
                <div style={{
                  width: 28, height: 28, borderRadius: 7, flexShrink: 0,
                  background: done ? "var(--ok)" : "var(--surface-2)",
                  border: `1px solid ${done ? "var(--ok)" : "var(--line)"}`,
                  display: "grid", placeItems: "center",
                  color: done ? "#fff" : "var(--ink-4)",
                }}>
                  <Icon name={icon} size={13} />
                </div>
                <div>
                  <div style={{ fontSize: 13.5, fontWeight: 600, color: done ? "var(--ok-ink)" : "var(--ink-2)", lineHeight: 1.2 }}>{label}</div>
                  <div style={{ fontSize: 12.5, color: "var(--ink-4)", marginTop: 3, lineHeight: 1.45 }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
