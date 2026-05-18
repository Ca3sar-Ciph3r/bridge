"use client";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { NAV_SECTIONS, type SectionId } from "@/lib/types";

interface ProgressRailProps {
  current: SectionId;
  savedAt?: string;
}

export function ProgressRail({ current, savedAt }: ProgressRailProps) {
  const currentIdx = NAV_SECTIONS.findIndex(s => s.id === current);

  return (
    <aside className="br-sidebar" style={{
      width: 280, padding: "32px 28px 28px 32px", borderRight: "1px solid var(--line)",
      background: "var(--bg)", display: "flex", flexDirection: "column", gap: 28, flexShrink: 0,
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link href="/" className="br-wordmark">
          <span className="br-mark"/>Bridge
        </Link>
        <span className="br-mono" style={{ color: "var(--ink-5)", fontSize: 11 }}>v1.0</span>
      </div>

      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }}>
          <span className="br-eyebrow">Progress</span>
          <span className="br-mono" style={{ fontSize: 12, color: "var(--ink-3)", fontVariantNumeric: "tabular-nums" }}>
            {Math.round((currentIdx / NAV_SECTIONS.length) * 100)}%
          </span>
        </div>
        <div style={{ height: 3, background: "var(--surface-3)", borderRadius: 999, overflow: "hidden" }}>
          <div style={{
            height: "100%", width: `${(currentIdx / NAV_SECTIONS.length) * 100}%`,
            background: "var(--ink)", borderRadius: 999, transition: "width .4s ease",
          }}/>
        </div>
      </div>

      <nav style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {NAV_SECTIONS.map((s, i) => {
          const state = i < currentIdx ? "done" : i === currentIdx ? "active" : "todo";
          return (
            <div key={s.id} style={{
              display: "flex", alignItems: "flex-start", gap: 12, padding: "10px 8px",
              borderRadius: 8,
              background: state === "active" ? "var(--surface)" : "transparent",
              border: state === "active" ? "1px solid var(--line)" : "1px solid transparent",
              boxShadow: state === "active" ? "var(--shadow-1)" : "none",
              transition: "all .18s ease",
            }}>
              <div style={{
                width: 22, height: 22, borderRadius: 999, marginTop: 1,
                display: "grid", placeItems: "center", flexShrink: 0,
                background: state === "done" ? "var(--ink)" : "transparent",
                border: state === "done" ? "1px solid var(--ink)" : state === "active" ? "1.5px solid var(--ink)" : "1.5px solid var(--line-strong)",
                color: state === "done" ? "#fff" : "var(--ink)",
                fontSize: 10.5, fontWeight: 600,
              }}>
                {state === "done"
                  ? <Icon name="check" size={11} strokeWidth={2.4}/>
                  : <span style={{ fontVariantNumeric: "tabular-nums" }}>{i + 1}</span>
                }
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: state === "active" ? 600 : 500, color: state === "todo" ? "var(--ink-4)" : "var(--ink)", letterSpacing: "-0.005em" }}>
                  {s.title}
                </div>
                <div style={{ fontSize: 11.5, color: "var(--ink-4)", marginTop: 1 }}>{s.subtitle}</div>
              </div>
            </div>
          );
        })}
      </nav>

      <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: 12 }}>
        <div style={{
          padding: "10px 12px", borderRadius: 10, border: "1px solid var(--line)",
          background: "var(--surface)", display: "flex", alignItems: "center", gap: 10,
        }}>
          <div style={{ width: 8, height: 8, borderRadius: 999, background: "var(--ok)", animation: "br-pulse-soft 2s ease-in-out infinite" }}/>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 12, fontWeight: 500, color: "var(--ink)" }}>Autosaved</div>
            <div style={{ fontSize: 11, color: "var(--ink-4)" }}>{savedAt ?? "Just now"} · resume on any device</div>
          </div>
        </div>
        <div style={{ fontSize: 11, color: "var(--ink-5)", lineHeight: 1.5, paddingLeft: 4 }}>
          Powered by <span style={{ color: "var(--ink-3)", fontWeight: 500 }}>Digital Native</span>
        </div>
      </div>
    </aside>
  );
}
