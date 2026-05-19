"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function SignupPage() {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm]   = useState("");
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);
  const [done, setDone]         = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password !== confirm) { setError("Passwords don't match."); return; }
    if (password.length < 8)  { setError("Password must be at least 8 characters."); return; }
    setLoading(true);
    setError("");

    const supabase = createClient();
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: `${window.location.origin}/auth/callback?next=/portal/dashboard` },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    // If session is returned, email confirmation is off — go straight to portal
    if (data.session) {
      router.refresh();
      router.push("/portal/dashboard");
    } else {
      // Email confirmation required
      setDone(true);
    }
  }

  if (done) {
    return (
      <div style={{ background: "var(--bg)", minHeight: "100dvh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "24px 16px" }}>
        <div style={{ width: 380, maxWidth: "100%", textAlign: "center" }}>
          <div style={{ fontSize: 32, marginBottom: 16 }}>📬</div>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: "var(--ink)", letterSpacing: "-0.025em", marginBottom: 8 }}>Check your inbox</h2>
          <p style={{ fontSize: 14, color: "var(--ink-3)", lineHeight: 1.6, marginBottom: 24 }}>
            We sent a confirmation link to <strong>{email}</strong>. Click it to activate your account and access your portal.
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
        {/* Wordmark */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <Link href="/" className="br-wordmark" style={{ fontSize: 18, textDecoration: "none" }}>
            <span className="br-mark" />Bridge
          </Link>
          <div style={{ fontSize: 13, color: "var(--ink-4)", marginTop: 8 }}>Create your portal account</div>
        </div>

        <div style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 16, padding: "28px 24px", boxShadow: "var(--shadow-2)" }}>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: "var(--ink)", letterSpacing: "-0.025em", margin: "0 0 4px" }}>
            Create account
          </h1>
          <p style={{ fontSize: 13, color: "var(--ink-4)", margin: "0 0 20px", lineHeight: 1.5 }}>
            Use the email address your agency has on file for you.
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

            <div>
              <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "var(--ink-3)", marginBottom: 6 }}>Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                placeholder="Min. 8 characters"
                style={{
                  width: "100%", boxSizing: "border-box",
                  padding: "10px 12px", fontSize: 14,
                  background: "var(--bg)", border: "1px solid var(--line-strong)",
                  borderRadius: 8, color: "var(--ink)", outline: "none",
                }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "var(--ink-3)", marginBottom: 6 }}>Confirm password</label>
              <input
                type="password"
                value={confirm}
                onChange={e => setConfirm(e.target.value)}
                required
                placeholder="Repeat password"
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
                background: loading ? "var(--ink-5)" : "var(--accent)",
                color: "#fff", border: "none", borderRadius: 8,
                fontSize: 14, fontWeight: 600, cursor: loading ? "not-allowed" : "pointer",
                transition: "background .15s",
              }}
            >
              {loading ? "Creating account…" : "Create account"}
            </button>
          </form>

          <div style={{ marginTop: 20, paddingTop: 20, borderTop: "1px solid var(--line)", textAlign: "center", fontSize: 13, color: "var(--ink-4)" }}>
            Already have an account?{" "}
            <Link href="/login" style={{ color: "var(--accent)", textDecoration: "none", fontWeight: 500 }}>
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
