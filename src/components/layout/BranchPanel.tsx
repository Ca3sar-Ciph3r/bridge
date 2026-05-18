"use client";
import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { Pill } from "@/components/ui/Chip";

interface BranchPanelProps {
  icon: string;
  title: string;
  progress?: string[];
  active?: number;
  summary?: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  complete?: boolean;
}

export function BranchPanel({ icon, title, progress, active = 0, summary, children, defaultOpen = false, complete = false }: BranchPanelProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div style={{
      background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 14,
      boxShadow: "var(--shadow-1)", marginBottom: 12, overflow: "hidden",
    }}>
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        style={{
          width: "100%", padding: "14px 18px", display: "flex", alignItems: "center", gap: 14,
          borderBottom: open ? "1px solid var(--line)" : "none",
          background: open ? "linear-gradient(180deg, #fafafa 0%, transparent 100%)" : "transparent",
          cursor: "pointer", fontFamily: "var(--font-sans)",
        }}
      >
        <div style={{
          width: 32, height: 32, borderRadius: 8, display: "grid", placeItems: "center",
          background: "var(--accent-soft)", color: "var(--accent)", border: "1px solid var(--accent-soft-2)",
        }}>
          <Icon name={icon} size={16}/>
        </div>
        <div style={{ flex: 1, textAlign: "left" }}>
          <div style={{ fontSize: 14, fontWeight: 600, letterSpacing: "-0.005em" }}>{title}</div>
          {summary && !open && <div style={{ fontSize: 12, color: "var(--ink-4)", marginTop: 1 }}>{summary}</div>}
        </div>
        {progress && open && (
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            {progress.map((p, i) => (
              <div key={p} style={{
                fontSize: 11, padding: "3px 8px", borderRadius: 999,
                background: i < active ? "var(--ink)" : i === active ? "var(--accent-soft)" : "var(--surface-2)",
                color: i < active ? "#fff" : i === active ? "var(--accent-ink)" : "var(--ink-4)",
                fontWeight: 500, border: i === active ? "1px solid var(--accent-soft-2)" : "1px solid var(--line)",
                whiteSpace: "nowrap",
              }}>{p}</div>
            ))}
          </div>
        )}
        {complete && !open && <Pill tone="ok" size="sm" icon="check">Complete</Pill>}
        <Icon name={open ? "chevron_down" : "chevron_right"} size={16} color="var(--ink-4)"/>
      </button>
      {open && <div style={{ padding: 18 }}>{children}</div>}
    </div>
  );
}
