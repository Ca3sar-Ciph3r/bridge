"use client";
import { Button } from "@/components/ui/Button";

interface StepFooterProps {
  backLabel?: string;
  continueLabel?: string;
  note?: string;
  onBack?: () => void;
  onContinue?: () => void;
  loading?: boolean;
  continueDisabled?: boolean;
}

export function StepFooter({
  backLabel = "Back",
  continueLabel = "Continue",
  note,
  onBack,
  onContinue,
  loading,
  continueDisabled,
}: StepFooterProps) {
  return (
    <footer className="br-step-footer" style={{
      borderTop: "1px solid var(--line)", padding: "16px 56px", background: "var(--surface)",
      display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0,
    }}>
      <Button variant="ghost" icon="arrow_left" onClick={onBack}>{backLabel}</Button>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        {note && <span style={{ fontSize: 12, color: "var(--ink-4)" }}>{note}</span>}
        <Button variant="accent" iconRight="arrow_right" onClick={onContinue} loading={loading} disabled={continueDisabled}>
          {continueLabel}
        </Button>
      </div>
    </footer>
  );
}
