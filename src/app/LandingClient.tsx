"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Field, Input } from "@/components/ui/Field";
import { Pill } from "@/components/ui/Chip";
import { Icon } from "@/components/ui/Icon";
import { createClient } from "@/lib/supabase/client";

type AuthTab = "magic" | "password";
type PasswordMode = "signin" | "signup";

export function LandingClient() {
  const router = useRouter();

  // Shared
  const [tab, setTab] = useState<AuthTab>("magic");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  // Password-specific
  const [passwordMode, setPasswordMode] = useState<PasswordMode>("signin");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  function resetState() {
    setError(""); setDone(false);
  }

  async function handleMagicLink() {
    if (!email.includes("@")) { setError("Please enter a valid email address."); return; }
    setLoading(true); setError("");
    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${location.origin}/auth/callback` },
    });
    setLoading(false);
    if (authError) { setError(authError.message); return; }
    router.push(`/magic-link?email=${encodeURIComponent(email)}`);
  }

  async function handlePassword() {
    if (!email.includes("@")) { setError("Please enter a valid email address."); return; }
    if (password.length < 8) { setError("Password must be at least 8 characters."); return; }
    if (passwordMode === "signup" && !name.trim()) { setError("Please enter your name."); return; }
    setLoading(true); setError("");
    const supabase = createClient();

    if (passwordMode === "signin") {
      const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
      setLoading(false);
      if (authError) { setError("Incorrect email or password."); return; }
      router.push("/resume");
    } else {
      const { error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: name.trim() }, emailRedirectTo: `${location.origin}/auth/callback` },
      });
      setLoading(false);
      if (authError) { setError(authError.message); return; }
      setDone(true);
    }
  }

  return (
    <div style={{ background: "var(--bg)", display: "flex", flexDirection: "column", minHeight: "100dvh" }}>
      {/* Nav */}
      <div className="br-top-nav" style={{ padding: "24px 56px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
        <Link href="/" className="br-wordmark"><span className="br-mark"/>Bridge</Link>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <span className="br-mono" style={{ fontSize: 11, color: "var(--ink-5)" }}>POWERED BY</span>
          <span style={{ fontSize: 13, fontWeight: 500, letterSpacing: "-0.01em" }}>Digital Native</span>
        </div>
      </div>

      {/* Hero */}
      <div className="br-g-landing" style={{ flex: 1, display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 0 }}>
        {/* Left */}
        <div className="br-mw-full" style={{ padding: "40px 56px 56px", display: "flex", flexDirection: "column", justifyContent: "center", maxWidth: 600 }}>
          <Pill tone="accent" size="md" icon="sparkle">A guided strategy session, not a form</Pill>
          <h1 style={{ marginTop: 20, marginBottom: 16, fontSize: 44, fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1.08, fontFamily: "var(--font-sans)" }}>
            Welcome.<br/>
            <span style={{ color: "var(--ink-4)" }}>Let&apos;s understand your business — so we build a system that fits it precisely.</span>
          </h1>

          <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 20 }}>
            {([
              ["target", "Built around your specific services", "Questions adapt to what you've selected — nothing extraneous."],
              ["save",   "Save anywhere, resume anywhere",      "Auto-saves after every change. Switch devices freely."],
              ["lock",   "Yours alone, end-to-end encrypted",   "A secure session. No password to manage."],
            ] as const).map(([icon, title, desc]) => (
              <div key={title} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <div style={{ width: 28, height: 28, borderRadius: 7, flexShrink: 0, background: "var(--surface)", border: "1px solid var(--line)", display: "grid", placeItems: "center", color: "var(--ink-3)" }}>
                  <Icon name={icon} size={14}/>
                </div>
                <div style={{ paddingTop: 4 }}>
                  <div style={{ fontSize: 14, fontWeight: 500, color: "var(--ink)" }}>{title}</div>
                  <div style={{ fontSize: 13, color: "var(--ink-4)", marginTop: 1 }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 20, marginTop: 32, paddingTop: 20, borderTop: "1px solid var(--line)" }}>
            {([
              ["Estimated time", "10–12 min"],
              ["Sections", "5"],
              ["Saved", null],
            ] as const).map(([label, val], i) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: 20 }}>
                {i > 0 && <div style={{ width: 1, height: 36, background: "var(--line)" }}/>}
                <div>
                  <div className="br-eyebrow" style={{ fontSize: 10 }}>{label}</div>
                  {val
                    ? <div style={{ fontSize: 22, fontWeight: 600, letterSpacing: "-0.02em", marginTop: 2, fontVariantNumeric: "tabular-nums" }}>{val}</div>
                    : <div style={{ fontSize: 14, fontWeight: 500, marginTop: 4, display: "flex", alignItems: "center", gap: 6 }}>
                        <Icon name="check" size={13} color="var(--ok)" strokeWidth={2.4}/> Automatically
                      </div>
                  }
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — auth card */}
        <div style={{ padding: "0 56px 40px", display: "flex", alignItems: "center" }}>
          <div style={{ width: "100%", background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 16, boxShadow: "var(--shadow-3)", overflow: "hidden" }}>

            {/* Tabs */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", borderBottom: "1px solid var(--line)" }}>
              {([["magic", "Magic link"], ["password", "Email & password"]] as [AuthTab, string][]).map(([t, label]) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => { setTab(t); resetState(); }}
                  style={{
                    padding: "14px 16px", border: "none", cursor: "pointer", fontFamily: "var(--font-sans)",
                    fontSize: 13, fontWeight: tab === t ? 600 : 500,
                    background: tab === t ? "var(--surface)" : "var(--surface-2)",
                    color: tab === t ? "var(--ink)" : "var(--ink-4)",
                    borderBottom: tab === t ? "2px solid var(--ink)" : "2px solid transparent",
                  }}
                >{label}</button>
              ))}
            </div>

            <div style={{ padding: 28 }}>
              {/* ── Magic link tab ── */}
              {tab === "magic" && (
                <>
                  <div style={{ marginBottom: 20 }}>
                    <Pill tone="ok" size="sm" icon="check">Invitation verified</Pill>
                    <h2 style={{ marginTop: 12, fontSize: 22, fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1.15, fontFamily: "var(--font-sans)" }}>Sign in to continue</h2>
                    <p style={{ marginTop: 6, marginBottom: 0, fontSize: 14, lineHeight: 1.55, color: "var(--ink-3)" }}>
                      We&apos;ll send a secure link to your inbox. Click it and you&apos;re in — no password required.
                    </p>
                  </div>
                  <Field label="Work email" error={error}>
                    <Input value={email} onChange={setEmail} placeholder="you@company.com" type="email" prefix={<Icon name="mail" size={15}/>} error={!!error} />
                  </Field>
                  <div style={{ marginTop: 16 }}>
                    <Button variant="accent" full size="lg" iconRight="arrow_right" onClick={handleMagicLink} loading={loading}>
                      Send magic link
                    </Button>
                  </div>
                  <div style={{ marginTop: 14, fontSize: 11.5, color: "var(--ink-4)", display: "flex", alignItems: "center", gap: 6, justifyContent: "center" }}>
                    <Icon name="lock" size={12}/> 256-bit TLS · session expires in 7 days
                  </div>
                </>
              )}

              {/* ── Email & password tab ── */}
              {tab === "password" && !done && (
                <>
                  <div style={{ marginBottom: 20 }}>
                    <h2 style={{ margin: "0 0 6px 0", fontSize: 22, fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1.15, fontFamily: "var(--font-sans)" }}>
                      {passwordMode === "signin" ? "Sign in" : "Create account"}
                    </h2>
                    <p style={{ margin: 0, fontSize: 14, lineHeight: 1.55, color: "var(--ink-3)" }}>
                      {passwordMode === "signin"
                        ? "Sign in to your Bridge account or client portal."
                        : "Create an account to start your onboarding session."}
                    </p>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                    {passwordMode === "signup" && (
                      <Field label="Your name">
                        <Input value={name} onChange={setName} placeholder="Jane Smith" prefix={<Icon name="users" size={15}/>} />
                      </Field>
                    )}
                    <Field label="Email address" error={error}>
                      <Input value={email} onChange={setEmail} placeholder="you@company.com" type="email" prefix={<Icon name="mail" size={15}/>} error={!!error} />
                    </Field>
                    <Field label="Password" error={passwordMode === "signup" && password.length > 0 && password.length < 8 ? "At least 8 characters" : undefined}>
                      <Input
                        value={password}
                        onChange={setPassword}
                        placeholder={passwordMode === "signup" ? "Min. 8 characters" : "Your password"}
                        type={showPassword ? "text" : "password"}
                        prefix={<Icon name="lock" size={15}/>}
                        suffix={
                          <button type="button" onClick={() => setShowPassword(v => !v)} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, color: "var(--ink-4)" }}>
                            <Icon name={showPassword ? "star" : "search"} size={14}/>
                          </button>
                        }
                      />
                    </Field>
                  </div>

                  {error && <p style={{ margin: "10px 0 0", fontSize: 13, color: "var(--err)" }}>{error}</p>}

                  <div style={{ marginTop: 18 }}>
                    <Button variant="accent" full size="lg" iconRight="arrow_right" onClick={handlePassword} loading={loading}>
                      {passwordMode === "signin" ? "Sign in" : "Create account"}
                    </Button>
                  </div>

                  <div style={{ marginTop: 16, textAlign: "center", fontSize: 13, color: "var(--ink-4)" }}>
                    {passwordMode === "signin" ? (
                      <>No account?{" "}
                        <button type="button" onClick={() => { setPasswordMode("signup"); resetState(); }} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--accent)", fontWeight: 500, fontSize: 13, padding: 0, fontFamily: "var(--font-sans)" }}>
                          Create one
                        </button>
                      </>
                    ) : (
                      <>Already have an account?{" "}
                        <button type="button" onClick={() => { setPasswordMode("signin"); resetState(); }} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--accent)", fontWeight: 500, fontSize: 13, padding: 0, fontFamily: "var(--font-sans)" }}>
                          Sign in
                        </button>
                      </>
                    )}
                  </div>
                </>
              )}

              {/* ── Sign-up confirmation ── */}
              {tab === "password" && done && (
                <div style={{ textAlign: "center", padding: "16px 0" }}>
                  <div style={{ width: 48, height: 48, borderRadius: 12, background: "var(--ok-soft)", display: "grid", placeItems: "center", margin: "0 auto 16px" }}>
                    <Icon name="mail" size={22} color="var(--ok)"/>
                  </div>
                  <h2 style={{ margin: "0 0 8px", fontSize: 20, fontWeight: 600, letterSpacing: "-0.02em" }}>Check your inbox</h2>
                  <p style={{ margin: 0, fontSize: 14, color: "var(--ink-3)", lineHeight: 1.6 }}>
                    We sent a confirmation link to <strong style={{ color: "var(--ink-2)" }}>{email}</strong>. Click it to activate your account and begin.
                  </p>
                  <button type="button" onClick={() => { setDone(false); setPasswordMode("signin"); }} style={{ marginTop: 20, background: "none", border: "none", cursor: "pointer", color: "var(--accent)", fontSize: 13, fontWeight: 500, fontFamily: "var(--font-sans)" }}>
                    Back to sign in
                  </button>
                </div>
              )}

              {/* Sections preview — shown on magic tab only */}
              {tab === "magic" && (
                <div style={{ marginTop: 24, paddingTop: 18, borderTop: "1px dashed var(--line)" }}>
                  <div className="br-eyebrow" style={{ fontSize: 10 }}>What we&apos;ll cover</div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 10 }}>
                    {([
                      ["Snapshot", "Industry & scale"],
                      ["Services", "What we're scoping"],
                      ["Strategy", "ICP & competitors"],
                      ["Goals",    "Targets & ranks"],
                      ["Review",   "Confirm & submit"],
                    ] as const).map(([t, d], i) => (
                      <div key={t} style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                        <span className="br-mono" style={{ fontSize: 10, color: "var(--ink-5)", fontVariantNumeric: "tabular-nums" }}>0{i + 1}</span>
                        <div>
                          <div style={{ fontSize: 12, fontWeight: 500, color: "var(--ink-2)" }}>{t}</div>
                          <div style={{ fontSize: 11, color: "var(--ink-4)" }}>{d}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ padding: "16px 56px", borderTop: "1px solid var(--line)", display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 12, color: "var(--ink-5)", flexShrink: 0 }}>
        <div style={{ display: "flex", gap: 18 }}>
          <span>Privacy</span><span>Terms</span><span>Support</span>
        </div>
        <span>© Digital Native</span>
      </div>
    </div>
  );
}
