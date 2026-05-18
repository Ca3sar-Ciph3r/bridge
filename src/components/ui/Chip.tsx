"use client";
import { Icon } from "./Icon";

interface ChipProps {
  active?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  icon?: string;
  size?: "sm" | "md";
}

export function Chip({ active, onClick, children, icon, size = "md" }: ChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="br-focus"
      style={{
        display: "inline-flex", alignItems: "center", gap: 5,
        padding: size === "sm" ? "5px 10px" : "8px 14px",
        fontSize: size === "sm" ? 12 : 13,
        fontWeight: 500, fontFamily: "var(--font-sans)",
        borderRadius: 999, cursor: "pointer", transition: "all .15s ease", letterSpacing: "-0.005em",
        background: active ? "var(--ink)" : "var(--surface)",
        color: active ? "#fff" : "var(--ink-2)",
        border: active ? "1px solid var(--ink)" : "1px solid var(--line-strong)",
        boxShadow: active ? "0 1px 2px rgba(0,0,0,.08)" : "var(--shadow-1)",
        whiteSpace: "nowrap",
      }}
    >
      {icon && <Icon name={icon} size={12}/>}
      {children}
    </button>
  );
}

interface PillProps {
  children: React.ReactNode;
  tone?: "neutral" | "accent" | "ok" | "warn" | "ai" | "err" | "dark";
  icon?: string;
  size?: "sm" | "md";
  style?: React.CSSProperties;
}

const PILL_TONES = {
  neutral: { bg: "var(--surface-2)", fg: "var(--ink-2)", bd: "var(--line)" },
  accent:  { bg: "var(--accent-soft)", fg: "var(--accent-ink)", bd: "var(--accent-soft-2)" },
  ok:      { bg: "var(--ok-soft)", fg: "var(--ok)", bd: "#a7f3d0" },
  warn:    { bg: "var(--warn-soft)", fg: "var(--warn)", bd: "#fcd34d" },
  ai:      { bg: "var(--ai-soft)", fg: "var(--ai)", bd: "#ddd6fe" },
  err:     { bg: "var(--err-soft)", fg: "var(--err)", bd: "#fecaca" },
  dark:    { bg: "var(--ink)", fg: "#fff", bd: "var(--ink)" },
};

export function Pill({ children, tone = "neutral", icon, size = "md", style }: PillProps) {
  const t = PILL_TONES[tone];
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 4,
      background: t.bg, color: t.fg, border: `1px solid ${t.bd}`,
      padding: size === "sm" ? "2px 7px" : "3px 9px",
      fontSize: size === "sm" ? 10.5 : 11.5,
      fontWeight: 500, borderRadius: 999, letterSpacing: 0,
      whiteSpace: "nowrap", flexShrink: 0,
      ...style,
    }}>
      {icon && <Icon name={icon} size={10}/>}
      {children}
    </span>
  );
}
