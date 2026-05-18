"use client";

interface SliderProps {
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onChange?: (v: number) => void;
  format?: (v: number) => string;
}

export function Slider({ value, min = 0, max = 100, step = 1, onChange, format = v => String(v) }: SliderProps) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 16, fontWeight: 600, fontVariantNumeric: "tabular-nums" }}>{format(value)}</span>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--ink-5)" }}>{format(min)} → {format(max)}</span>
      </div>
      <div style={{ position: "relative", height: 6, borderRadius: 999, background: "var(--surface-3)" }}>
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: `${pct}%`, background: "var(--ink)", borderRadius: 999 }}/>
        <div style={{
          position: "absolute", top: "50%", left: `${pct}%`,
          width: 18, height: 18, borderRadius: 999, background: "#fff",
          border: "1.5px solid var(--ink)", transform: "translate(-50%, -50%)",
          boxShadow: "0 1px 3px rgba(0,0,0,.18)", pointerEvents: "none",
        }}/>
        <input
          type="range" value={value} min={min} max={max} step={step}
          onChange={e => onChange?.(Number(e.target.value))}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0, cursor: "pointer" }}
        />
      </div>
    </div>
  );
}
