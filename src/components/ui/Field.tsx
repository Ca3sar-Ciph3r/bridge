"use client";
import { Icon } from "./Icon";

interface FieldProps {
  label?: string;
  hint?: string;
  error?: string;
  optional?: boolean;
  ai?: boolean;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export function Field({ label, hint, error, optional, ai, children, style }: FieldProps) {
  return (
    <label style={{ display: "block", ...style }}>
      {label && (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 13, fontWeight: 500, color: "var(--ink-2)", letterSpacing: "-0.005em" }}>{label}</span>
            {optional && <span style={{ fontSize: 11, color: "var(--ink-5)" }}>Optional</span>}
            {ai && (
              <span style={{ display: "inline-flex", alignItems: "center", gap: 3, fontSize: 11, color: "var(--ai)", background: "var(--ai-soft)", padding: "1.5px 6px", borderRadius: 4, fontWeight: 500 }}>
                <Icon name="sparkle" size={10}/> AI-assist
              </span>
            )}
          </div>
          {hint && <span style={{ fontSize: 12, color: "var(--ink-4)" }}>{hint}</span>}
        </div>
      )}
      {children}
      {error && <div style={{ fontSize: 12, color: "var(--err)", marginTop: 4, display: "flex", alignItems: "center", gap: 4 }}><Icon name="alert" size={11}/>{error}</div>}
    </label>
  );
}

interface InputProps {
  value: string;
  onChange?: (v: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  type?: string;
  error?: boolean;
  name?: string;
  autoComplete?: string;
  required?: boolean;
}

export function Input({ value, onChange, onBlur, placeholder, prefix, suffix, type = "text", error, name, autoComplete, required }: InputProps) {
  return (
    <div style={{
      display: "flex", alignItems: "center",
      background: "var(--surface)", border: `1px solid ${error ? "var(--err)" : "var(--line-strong)"}`,
      borderRadius: 8, padding: "0 12px", height: 40,
      boxShadow: error ? "0 0 0 3px rgba(185,28,28,.08)" : "var(--shadow-1)",
      transition: "all .15s ease",
    }}>
      {prefix && <span style={{ color: error ? "var(--err)" : "var(--ink-4)", marginRight: 8, display: "flex", alignItems: "center" }}>{prefix}</span>}
      <input
        type={type}
        value={value}
        name={name}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={required}
        onChange={e => onChange?.(e.target.value)}
        onBlur={onBlur}
        className="br-focus"
        style={{
          flex: 1, height: "100%", border: "none", outline: "none", background: "transparent",
          fontFamily: "var(--font-sans)", fontSize: 14, color: "var(--ink)", letterSpacing: "-0.005em",
        }}
      />
      {suffix && <span style={{ color: "var(--ink-4)", marginLeft: 8, fontSize: 13 }}>{suffix}</span>}
    </div>
  );
}

interface TextareaProps {
  value: string;
  onChange?: (v: string) => void;
  placeholder?: string;
  rows?: number;
  shimmer?: boolean;
  style?: React.CSSProperties;
  name?: string;
}

export function Textarea({ value, onChange, placeholder, rows = 4, shimmer, style, name }: TextareaProps) {
  return (
    <div style={{ position: "relative" }}>
      <textarea
        value={value}
        name={name}
        onChange={e => onChange?.(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="br-focus"
        style={{
          width: "100%", padding: "12px 14px",
          background: "var(--surface)", border: "1px solid var(--line-strong)",
          borderRadius: 10, fontFamily: "var(--font-sans)", fontSize: 14, color: "var(--ink)",
          lineHeight: 1.55, resize: "none", boxShadow: "var(--shadow-1)", letterSpacing: "-0.005em",
          ...style,
        }}
      />
      {shimmer && (
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, bottom: 0, borderRadius: 10,
          pointerEvents: "none",
          background: "linear-gradient(110deg, transparent 30%, rgba(124,58,237,.08) 50%, transparent 70%)",
          backgroundSize: "200% 100%", animation: "br-shimmer 2.4s linear infinite",
        }}/>
      )}
    </div>
  );
}
