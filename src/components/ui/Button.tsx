"use client";
import { Icon } from "./Icon";

type Variant = "primary" | "accent" | "ghost" | "outline" | "subtle";
type Size = "sm" | "md" | "lg";

interface ButtonProps {
  children?: React.ReactNode;
  variant?: Variant;
  size?: Size;
  icon?: string;
  iconRight?: string;
  full?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  type?: "button" | "submit" | "reset";
  style?: React.CSSProperties;
}

const SIZES: Record<Size, React.CSSProperties> = {
  sm: { padding: "6px 12px", fontSize: 13, height: 32, borderRadius: 6 },
  md: { padding: "9px 16px", fontSize: 14, height: 40, borderRadius: 8 },
  lg: { padding: "13px 22px", fontSize: 15, height: 48, borderRadius: 10 },
};

const VARIANTS: Record<Variant, React.CSSProperties> = {
  primary: { background: "var(--ink)", color: "#fff", border: "1px solid var(--ink)", boxShadow: "inset 0 1px 0 rgba(255,255,255,.12), 0 1px 2px rgba(0,0,0,.08)" },
  accent:  { background: "var(--accent)", color: "#fff", border: "1px solid var(--accent)", boxShadow: "inset 0 1px 0 rgba(255,255,255,.18), 0 1px 2px rgba(79,70,229,.32)" },
  ghost:   { background: "transparent", color: "var(--ink-2)", border: "1px solid transparent" },
  outline: { background: "var(--surface)", color: "var(--ink)", border: "1px solid var(--line-strong)", boxShadow: "var(--shadow-1)" },
  subtle:  { background: "var(--surface-2)", color: "var(--ink)", border: "1px solid var(--line)" },
};

export function Button({
  children, variant = "primary", size = "md", icon, iconRight,
  full, onClick, disabled, loading, type = "button", style,
}: ButtonProps) {
  const sz = SIZES[size];
  const vr = VARIANTS[variant];
  const iconSize = size === "lg" ? 17 : 15;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className="br-focus"
      style={{
        display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 7,
        fontFamily: "var(--font-sans)", fontWeight: 500, cursor: (disabled || loading) ? "not-allowed" : "pointer",
        opacity: (disabled || loading) ? .5 : 1,
        transition: "opacity .12s, background .15s",
        width: full ? "100%" : "auto",
        letterSpacing: "-0.005em",
        flexShrink: 0,
        whiteSpace: "nowrap",
        ...sz, ...vr, ...style,
      }}
    >
      {loading
        ? <span style={{ width: iconSize, height: iconSize, borderRadius: 999, border: "2px solid currentColor", borderTopColor: "transparent", animation: "spin .7s linear infinite", display: "inline-block" }}/>
        : icon && <Icon name={icon} size={iconSize}/>
      }
      {children}
      {iconRight && !loading && <Icon name={iconRight} size={iconSize}/>}
    </button>
  );
}
