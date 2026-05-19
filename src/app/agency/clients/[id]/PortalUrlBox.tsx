"use client";
import { useState, useEffect } from "react";
import { Icon } from "@/components/ui/Icon";

export function PortalUrlBox({ email }: { email: string | null }) {
  const [origin, setOrigin] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  const url = origin ? `${origin}/login` : "…";

  function copy() {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div style={{ marginTop: 20, padding: "16px 18px", background: "var(--ok-soft)", border: "1px solid var(--ok)", borderRadius: 12 }}>
      <div style={{ fontSize: 13, fontWeight: 600, color: "var(--ok-ink)", marginBottom: 8 }}>
        Share this link with the client
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
        <div className="br-mono" style={{
          flex: 1, fontSize: 13, color: "var(--ink-2)",
          background: "var(--surface)", border: "1px solid var(--line)",
          borderRadius: 8, padding: "9px 12px",
        }}>
          {url}
        </div>
        <button
          onClick={copy}
          style={{
            display: "flex", alignItems: "center", gap: 6, padding: "9px 14px",
            background: copied ? "var(--ok)" : "var(--ink)", color: "#fff",
            border: "none", borderRadius: 8, cursor: "pointer", fontSize: 13, fontWeight: 600,
            transition: "background .2s", flexShrink: 0,
          }}
        >
          <Icon name={copied ? "check" : "copy"} size={14} color="#fff" />
          {copied ? "Copied" : "Copy"}
        </button>
      </div>

      <div style={{ fontSize: 12, color: "var(--ok-ink)", lineHeight: 1.5 }}>
        Send this to <strong>{email ?? "the client"}</strong>. They create an account using
        their email address, then sign in to access their portal.
      </div>
    </div>
  );
}
