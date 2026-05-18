"use client";
import { Icon } from "./Icon";

interface CardProps {
  children: React.ReactNode;
  padding?: number;
  style?: React.CSSProperties;
}

export function Card({ children, padding = 20, style }: CardProps) {
  return (
    <div style={{
      background: "var(--surface)", border: "1px solid var(--line)",
      borderRadius: 14, padding, boxShadow: "var(--shadow-1)", ...style,
    }}>{children}</div>
  );
}

interface SelectCardProps {
  active?: boolean;
  onClick?: () => void;
  icon?: string;
  title: string;
  subtitle?: string;
  badge?: React.ReactNode;
  style?: React.CSSProperties;
  disabled?: boolean;
}

export function SelectCard({ active, onClick, icon, title, subtitle, badge, style, disabled }: SelectCardProps) {
  return (
    <button
      type="button"
      onClick={disabled ? undefined : onClick}
      className="br-focus"
      style={{
        textAlign: "left", display: "flex", flexDirection: "column", gap: 8,
        padding: 16, borderRadius: 12, cursor: disabled ? "default" : "pointer",
        background: "var(--surface)",
        border: active ? "1.5px solid var(--accent)" : "1px solid var(--line-strong)",
        boxShadow: active ? "0 0 0 4px rgba(79,70,229,.12), var(--shadow-1)" : "var(--shadow-1)",
        transition: "all .18s ease", position: "relative", fontFamily: "var(--font-sans)",
        opacity: disabled ? .5 : 1,
        ...style,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
        {icon && (
          <div style={{
            width: 32, height: 32, borderRadius: 8, display: "grid", placeItems: "center",
            background: active ? "var(--accent-soft)" : "var(--surface-2)",
            color: active ? "var(--accent)" : "var(--ink-3)",
            border: `1px solid ${active ? "var(--accent-soft-2)" : "var(--line)"}`,
          }}>
            <Icon name={icon} size={16}/>
          </div>
        )}
        <div style={{
          width: 18, height: 18, borderRadius: 999, display: "grid", placeItems: "center",
          background: active ? "var(--accent)" : "transparent",
          border: active ? "1.5px solid var(--accent)" : "1.5px solid var(--line-strong)",
          transition: "all .15s ease", marginLeft: "auto",
        }}>
          {active && <Icon name="check" size={11} color="#fff" strokeWidth={2.5}/>}
        </div>
      </div>
      <div>
        <div style={{ fontSize: 14, fontWeight: 600, color: "var(--ink)", letterSpacing: "-0.01em" }}>{title}</div>
        {subtitle && <div style={{ fontSize: 12.5, color: "var(--ink-4)", marginTop: 2, lineHeight: 1.45 }}>{subtitle}</div>}
      </div>
      {badge && <div style={{ position: "absolute", top: 12, right: 36 }}>{badge}</div>}
    </button>
  );
}
