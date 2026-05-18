"use client";
import { useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { createClient } from "@/lib/supabase/client";

function MagicLinkContent() {
  const params = useSearchParams();
  const email = params.get("email") ?? "your inbox";
  const [seconds, setSeconds] = useState(0);
  const [resent, setResent] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => clearInterval(t);
  }, []);

  const fmt = (s: number) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  async function handleResend() {
    const supabase = createClient();
    await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${location.origin}/auth/callback` },
    });
    setResent(true); setSeconds(0);
  }

  return (
    <div style={{ background: "var(--bg)", display: "flex", flexDirection: "column", minHeight: "100dvh" }}>
      <div className="br-top-nav" style={{ padding: "24px 56px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link href="/" className="br-wordmark"><span className="br-mark"/>Bridge</Link>
        <span className="br-mono" style={{ fontSize: 11, color: "var(--ink-5)" }}>SESSION · PENDING</span>
      </div>

      <div style={{ flex: 1, display: "grid", placeItems: "center", padding: 32 }}>
        <div style={{ width: 440, textAlign: "center" }}>
          {/* Animated envelope */}
          <div style={{ position: "relative", width: 120, height: 120, margin: "0 auto 24px", display: "grid", placeItems: "center" }}>
            <div style={{ position: "absolute", inset: 0, borderRadius: 999, background: "radial-gradient(circle, rgba(79,70,229,.14) 0%, transparent 60%)", animation: "br-pulse-soft 2.4s ease-in-out infinite" }}/>
            <div style={{ width: 72, height: 72, borderRadius: 18, background: "linear-gradient(135deg, #fff 0%, #f5f5f4 100%)", border: "1px solid var(--line)", display: "grid", placeItems: "center", boxShadow: "var(--shadow-2)", position: "relative" }}>
              <Icon name="mail" size={32} color="var(--accent)" strokeWidth={1.4}/>
              <div style={{ position: "absolute", top: -6, right: -6, width: 22, height: 22, borderRadius: 999, background: "var(--ok)", display: "grid", placeItems: "center", color: "#fff", boxShadow: "0 2px 6px rgba(4,120,87,.4)" }}>
                <Icon name="check" size={12} strokeWidth={3}/>
              </div>
            </div>
          </div>

          <h1 style={{ fontSize: 30, fontWeight: 600, letterSpacing: "-0.025em", marginBottom: 10, fontFamily: "var(--font-sans)" }}>Check your inbox</h1>
          <p style={{ margin: 0, fontSize: 16, lineHeight: 1.55, color: "var(--ink-3)" }}>
            A secure link is on its way to <strong style={{ color: "var(--ink)", fontWeight: 500 }}>{email}</strong>.
            Click it and we'll pick up right where you left off.
          </p>

          <div style={{ marginTop: 28, padding: 16, background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 12, textAlign: "left" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <div style={{ width: 8, height: 8, borderRadius: 999, background: "var(--accent)", animation: "br-pulse-soft 1.5s ease-in-out infinite" }}/>
              <span style={{ fontSize: 12.5, fontWeight: 500 }}>{resent ? "New link sent" : "Waiting for confirmation"}</span>
              <span className="br-mono" style={{ fontSize: 11, color: "var(--ink-5)", marginLeft: "auto", fontVariantNumeric: "tabular-nums" }}>{fmt(seconds)}</span>
            </div>
            <div style={{ fontSize: 12, color: "var(--ink-4)", lineHeight: 1.55 }}>
              The link expires in 15 minutes. Didn't get it? Check spam or{" "}
              <button onClick={handleResend} style={{ background: "none", border: "none", padding: 0, color: "var(--accent)", fontWeight: 500, cursor: "pointer", fontSize: 12 }}>resend it</button>.
            </div>
          </div>

          <div style={{ marginTop: 24, fontSize: 12, color: "var(--ink-5)" }}>
            Wrong email?{" "}
            <Link href="/" style={{ color: "var(--ink-3)", fontWeight: 500, textDecoration: "underline", textUnderlineOffset: 3 }}>Use a different one</Link>
          </div>
        </div>
      </div>

      <div style={{ padding: "16px 56px", borderTop: "1px solid var(--line)", fontSize: 11, color: "var(--ink-5)", textAlign: "center" }}>
        We'll never share your data. Bridge is SOC 2 Type II and GDPR-aligned.
      </div>
    </div>
  );
}

export default function MagicLinkPage() {
  return <Suspense fallback={null}><MagicLinkContent/></Suspense>;
}
