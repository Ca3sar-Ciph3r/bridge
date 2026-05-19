"use client";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { setAgencyStatus } from "@/lib/actions/agency";
import { Icon } from "@/components/ui/Icon";
import { Pill } from "@/components/ui/Chip";
import type { AgencyStatus } from "@/lib/types";

const PIPELINE: { status: AgencyStatus; label: string; desc: string; tone: "neutral" | "warn" | "ok" | "err" }[] = [
  { status: "reviewed",      label: "Mark as reviewed",    desc: "You've read the submission",           tone: "neutral" },
  { status: "proposal_sent", label: "Proposal sent",       desc: "You've sent them a proposal",          tone: "warn"    },
  { status: "won",           label: "Won — activate portal", desc: "Proposal signed, portal goes live", tone: "ok"      },
  { status: "lost",          label: "Mark as lost",         desc: "Client didn't proceed",              tone: "err"     },
];

const ORDER: AgencyStatus[] = ["reviewed", "proposal_sent", "won", "lost"];

export function SubmissionActions({ sessionId, currentStatus }: {
  sessionId: string;
  currentStatus: AgencyStatus | null;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [localStatus, setLocalStatus] = useState(currentStatus);

  function advance(status: AgencyStatus) {
    setLocalStatus(status);
    startTransition(async () => {
      await setAgencyStatus(sessionId, status);
      router.refresh();
    });
  }

  const currentIdx = localStatus ? ORDER.indexOf(localStatus) : -1;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10, position: "sticky", top: 24 }}>
      {/* Current status */}
      <div style={{ padding: "14px 16px", background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 12, boxShadow: "var(--shadow-1)" }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: "var(--ink-4)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>Pipeline status</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {PIPELINE.filter(p => p.status !== "lost").map((p, i) => {
            const idx = ORDER.indexOf(p.status);
            const done = currentIdx >= idx;
            const isCurrent = localStatus === p.status;
            return (
              <div key={p.status} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{
                  width: 20, height: 20, borderRadius: 999, flexShrink: 0,
                  background: done ? "var(--ok)" : "var(--surface-2)",
                  border: `1.5px solid ${done ? "var(--ok)" : "var(--line-strong)"}`,
                  display: "grid", placeItems: "center",
                }}>
                  {done && <Icon name="check" size={10} strokeWidth={3} color="#fff" />}
                  {!done && <span style={{ fontSize: 9, color: "var(--ink-5)", fontWeight: 600 }}>{i + 1}</span>}
                </div>
                <span style={{ fontSize: 12.5, fontWeight: isCurrent ? 600 : 400, color: done ? "var(--ink)" : "var(--ink-4)" }}>
                  {p.label}
                </span>
                {isCurrent && <Pill tone={p.tone} size="sm" style={{ marginLeft: "auto" }}>Current</Pill>}
              </div>
            );
          })}
        </div>
      </div>

      {/* Action buttons */}
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {PIPELINE.filter(p => p.status !== localStatus).map(p => {
          const isWon = p.status === "won";
          return (
            <button
              key={p.status}
              type="button"
              onClick={() => advance(p.status)}
              disabled={isPending}
              style={{
                width: "100%", padding: "11px 14px", borderRadius: 10, cursor: isPending ? "wait" : "pointer",
                fontFamily: "var(--font-sans)", textAlign: "left", display: "flex", alignItems: "center", gap: 10,
                background: isWon ? "var(--ok)" : p.status === "lost" ? "var(--surface-2)" : "var(--surface)",
                border: isWon ? "1px solid var(--ok)" : p.status === "lost" ? "1px solid var(--line)" : "1px solid var(--line-strong)",
                color: isWon ? "#fff" : p.status === "lost" ? "var(--err)" : "var(--ink)",
                boxShadow: isWon ? "0 2px 8px -2px rgba(4,120,87,.3)" : "var(--shadow-1)",
                opacity: isPending ? 0.6 : 1,
              }}
            >
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{p.label}</div>
                <div style={{ fontSize: 11, opacity: 0.75, marginTop: 1 }}>{p.desc}</div>
              </div>
              <Icon name="arrow_right" size={14} color={isWon ? "#fff" : "currentColor"} />
            </button>
          );
        })}
      </div>

      {localStatus === "won" && (
        <div style={{ padding: "12px 14px", background: "var(--ok-soft)", border: "1px solid var(--ok)", borderRadius: 10 }}>
          <div style={{ fontSize: 12.5, fontWeight: 600, color: "var(--ok-ink)", marginBottom: 4 }}>Portal is now live</div>
          <div style={{ fontSize: 12, color: "var(--ink-3)", lineHeight: 1.5 }}>
            Share <strong>/portal/dashboard</strong> with the client. Their retainer status has been set to active.
          </div>
        </div>
      )}
    </div>
  );
}
