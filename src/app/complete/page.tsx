import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getLatestSession } from "@/lib/actions/session";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";

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

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 28 }}>
            {[
              ["Quality score", `${session.quality_score ?? 94} / 100`],
              ["Status",        "Submitted"],
              ["Account manager", "Luke Gunn"],
              ["Next step",     "Luke will be in touch"],
            ].map(([k, v]) => (
              <div key={k} style={{ padding: 14, background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 10 }}>
                <div className="br-eyebrow" style={{ fontSize: 10 }}>{k}</div>
                <div style={{ fontSize: 14, fontWeight: 600, letterSpacing: "-0.01em", marginTop: 4, lineHeight: 1.3 }}>{v}</div>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", gap: 10 }}>
            <Button variant="primary" size="md" iconRight="arrow_right">Enter Client Portal</Button>
            <Button variant="outline" size="md" icon="file">Download summary</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
