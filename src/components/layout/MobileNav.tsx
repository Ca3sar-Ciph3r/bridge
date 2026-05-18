"use client";
import Link from "next/link";
import { NAV_SECTIONS, type SectionId } from "@/lib/types";

interface MobileNavProps {
  current: SectionId;
  savedAt?: string;
}

export function MobileNav({ current, savedAt }: MobileNavProps) {
  const currentIdx = NAV_SECTIONS.findIndex(s => s.id === current);
  const total = NAV_SECTIONS.length;
  const pct = Math.round(((currentIdx + 1) / total) * 100);

  return (
    <div className="br-mobile-nav" style={{ flexShrink: 0, borderBottom: "1px solid var(--line)", background: "var(--bg)" }}>
      <div style={{ padding: "14px 20px 10px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link href="/" className="br-wordmark" style={{ fontSize: 16 }}>
          <span className="br-mark" />Bridge
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {savedAt && (
            <span style={{ fontSize: 11, color: "var(--ink-5)" }}>{savedAt}</span>
          )}
          <span className="br-mono" style={{ fontSize: 13, color: "var(--ink-3)", fontVariantNumeric: "tabular-nums", letterSpacing: "0" }}>
            {currentIdx + 1}<span style={{ color: "var(--ink-5)" }}>/{total}</span>
          </span>
        </div>
      </div>
      <div style={{ height: 3, background: "var(--surface-3)" }}>
        <div style={{
          height: "100%",
          width: `${pct}%`,
          background: "var(--ink)",
          transition: "width .4s ease",
        }} />
      </div>
    </div>
  );
}
