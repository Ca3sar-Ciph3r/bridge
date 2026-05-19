"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message === "Invalid login credentials"
        ? "Incorrect email or password."
        : error.message);
      setLoading(false);
    } else {
      router.refresh();
      router.push("/portal/dashboard");
    }
  }

  return (
    <div style={{ background: "var(--bg)", minHeight: "100dvh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "24px 16px" }}>
      <div style={{ width: 380, maxWidth: "100%" }}>
        {/* Wordmark */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <Link href="/" className="br-wordmark" style={{ fontSize: 18, textDecoration: "none" }}>
            <span className="br-mark" />Bridge
          </Link>
          <div style={{ fontSize: 13, color: "var(--ink-4)", marginTop: 8 }}>Client portal login</div>
        </div>

        <div style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 16, padding: "28px 24px", boxShadow: "var(--shadow-2)" }}>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: "var(--ink)", letterSpacing: "-0.025em", margin: "0 0 20px" }}>
            Sign in to your portal
          </h1>

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
                placeholder="••••••••"
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
                transition: "background .15s",
              }}
            >
              {loading ? "Signing in…" : "Sign in"}
            </button>
          </form>

          <div style={{ marginTop: 20, paddingTop: 20, borderTop: "1px solid var(--line)", display: "flex", justifyContent: "space-between", fontSize: 13 }}>
            <Link href="/signup" style={{ color: "var(--accent)", textDecoration: "none", fontWeight: 500 }}>
              Create account
            </Link>
            <Link href="/forgot-password" style={{ color: "var(--ink-4)", textDecoration: "none" }}>
              Forgot password?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
