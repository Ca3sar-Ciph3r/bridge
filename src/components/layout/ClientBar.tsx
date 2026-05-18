"use client";
import { Button } from "@/components/ui/Button";
import { Pill } from "@/components/ui/Chip";
import { Icon } from "@/components/ui/Icon";
import { NAV_SECTIONS, type SectionId } from "@/lib/types";

interface ClientBarProps {
  section: SectionId;
  email?: string;
  initials?: string;
  onSaveExit?: () => void;
}

export function ClientBar({ section, email, initials, onSaveExit }: ClientBarProps) {
  const idx = NAV_SECTIONS.findIndex(s => s.id === section);
  const s = NAV_SECTIONS[idx];
  const display = email ?? "you@example.com";
  const ini = initials ?? display.slice(0, 2).toUpperCase();

  return (
    <div className="br-client-bar" style={{
      padding: "16px 56px", borderBottom: "1px solid var(--line)",
      background: "var(--bg)", alignItems: "center",
      justifyContent: "space-between", flexShrink: 0,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <Pill icon="lock" size="sm">Secure session · {display}</Pill>
        <span className="br-mono" style={{ fontSize: 11, color: "var(--ink-5)" }}>
          STEP {idx + 1}/{NAV_SECTIONS.length} — {s?.title}
        </span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <Button variant="ghost" size="sm" icon="save" onClick={onSaveExit}>Save &amp; exit</Button>
        <div style={{ width: 1, height: 16, background: "var(--line-strong)" }}/>
        <div style={{
          width: 28, height: 28, borderRadius: 999, background: "var(--accent)",
          color: "#fff", display: "grid", placeItems: "center", fontSize: 11, fontWeight: 700,
        }}>{ini}</div>
      </div>
    </div>
  );
}
