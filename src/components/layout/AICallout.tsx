"use client";
import { Icon } from "@/components/ui/Icon";

interface AICalloutProps {
  title?: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}

export function AICallout({ title, children, action }: AICalloutProps) {
  return (
    <div style={{
      background: "linear-gradient(180deg, #faf8ff 0%, #f5f3ff 100%)",
      border: "1px solid #e9e3ff", borderRadius: 12, padding: 16,
      display: "flex", gap: 12, alignItems: "flex-start",
    }}>
      <div style={{
        width: 28, height: 28, borderRadius: 8, flexShrink: 0,
        background: "linear-gradient(135deg, #7c3aed 0%, #a78bfa 100%)",
        display: "grid", placeItems: "center", color: "#fff",
        boxShadow: "0 2px 6px rgba(124,58,237,.3)",
      }}>
        <Icon name="sparkle" size={14}/>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        {title && <div style={{ fontSize: 12.5, fontWeight: 600, color: "var(--ai)", letterSpacing: "-0.005em", marginBottom: 4 }}>{title}</div>}
        <div style={{ fontSize: 13, color: "var(--ink-2)", lineHeight: 1.55 }}>{children}</div>
        {action && <div style={{ marginTop: 10 }}>{action}</div>}
      </div>
    </div>
  );
}
