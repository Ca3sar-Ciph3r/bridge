"use client";
import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function ForgotPasswordPage() {
  const [email, setEmail]   = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent]     = useState(false);
  const [error, setError]   = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const supabase = createClient();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/callback?next=/portal/dashboard`,
    });
    if (error) { setError(error.message); setLoading(false); return; }
    setSent(true);
  }

  if (sent) {
    return (
      <div style={{ background: "var(--bg)", minHeight: "100dvh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "24px 16px" }}>
        <div style={{ width: 380, maxWidth: "100%", textAlign: "center" }}>
          <div style={{ fontSize: 32, marginBottom: 16 }}>📬</div>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: "var(--ink)", letterSpacing: "-0.025em", marginBottom: 8 }}>Check your inbox</h2>
          <p style={{ fontSize: 14, color: "var(--ink-3)", lineHeight: 1.6, marginBottom: 24 }}>
            We sent a password reset link to <strong>{email}</strong>.
          </p>
          <Link href="/login" style={{ fontSize: 13, color: "var(--accent)", textDecoration: "none" }}>
            Back to login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: "var(--bg)", minHeight: "100dvh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "24px 16px" }}>
      <div style={{ width: 380, maxWidth: "100%" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <Link href="/" className="br-wordmark" style={{ fontSize: 18, textDecoration: "none" }}>
            <span className="br-mark" />Bridge
          </Link>
          <div style={{ fontSize: 13, color: "var(--ink-4)", marginTop: 8 }}>Reset your password</div>
        </div>

        <div style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 16, padding: "28px 24px", boxShadow: "var(--shadow-2)" }}>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: "var(--ink)", letterSpacing: "-0.025em", margin: "0 0 8px" }}>
            Forgot password?
          </h1>
          <p style={{ fontSize: 13, color: "var(--ink-4)", margin: "0 0 20px", lineHeight: 1.5 }}>
            Enter your email and we&apos;ll send you a link to set a new password.
          </p>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div>
              <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "var(--ink-3)", marginBottom: 6 }}>Email address</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                autoFocus
                placeholder="you@example.com"
                style={{
                  width: "100%", boxSizing: "border-box",
                  padding: "10px 12px", fontSize: 14,
                  background: "var(--bg)", border: "1px solid var(--line-strong)",
                  borderRadius: 8, color: "var(--ink)", outline: "none",
                }}
              />
            </div>

            {error && (
              <div style={{ fontSize: 13, color: "var(--err)", background: "var(--err-soft)", border: "1px solid var(--err)", borderRadius: 8, padding: "10px 12px" }}>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%", padding: "11px 16px", marginTop: 4,
                background: loading ? "var(--ink-5)" : "var(--ink)",
                color: "#fff", border: "none", borderRadius: 8,
                fontSize: 14, fontWeight: 600, cursor: loading ? "not-allowed" : "pointer",
              }}
            >
              {loading ? "Sending…" : "Send reset link"}
            </button>
          </form>

          <div style={{ marginTop: 20, paddingTop: 20, borderTop: "1px solid var(--line)", textAlign: "center", fontSize: 13 }}>
            <Link href="/login" style={{ color: "var(--ink-4)", textDecoration: "none" }}>
              Back to login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
