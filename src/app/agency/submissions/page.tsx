import Link from "next/link";
import { getSubmissions } from "@/lib/actions/agency";
import { Icon } from "@/components/ui/Icon";
import { Pill } from "@/components/ui/Chip";
import type { AgencyStatus } from "@/lib/types";

function statusConfig(s: AgencyStatus | null): { label: string; tone: "neutral" | "warn" | "ok" | "err" | "accent" } {
  if (!s)                    return { label: "New",           tone: "accent"  };
  if (s === "reviewed")      return { label: "Reviewed",      tone: "neutral" };
  if (s === "proposal_sent") return { label: "Proposal sent", tone: "warn"    };
  if (s === "won")           return { label: "Won",           tone: "ok"      };
  return                            { label: "Lost",          tone: "err"     };
}

function formatDate(d: string | null) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("en-ZA", { day: "numeric", month: "short", year: "numeric" });
}

export default async function SubmissionsPage() {
  const submissions = await getSubmissions();

  const groups: Record<string, typeof submissions> = {
    new:           submissions.filter(s => !s.agency_status),
    reviewed:      submissions.filter(s => s.agency_status === "reviewed"),
    proposal_sent: submissions.filter(s => s.agency_status === "proposal_sent"),
    won:           submissions.filter(s => s.agency_status === "won"),
    lost:          submissions.filter(s => s.agency_status === "lost"),
  };

  return (
    <div style={{ padding: "32px 40px", maxWidth: 900 }}>
      {/* Header */}
      <div className="br-fade-up" style={{ marginBottom: 32 }}>
        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--accent)" }}>Agency</span>
        <h1 style={{ fontSize: 26, fontWeight: 700, color: "var(--ink)", margin: "4px 0 6px", letterSpacing: "-0.03em" }}>Submissions</h1>
        <p style={{ fontSize: 14, color: "var(--ink-3)", margin: 0 }}>
          {submissions.length} total · {groups.new.length} new
        </p>
      </div>

      {submissions.length === 0 ? (
        <div style={{ padding: "40px 24px", textAlign: "center", color: "var(--ink-4)", fontSize: 14, background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 12 }}>
          No submissions yet. They&apos;ll appear here when clients complete onboarding.
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
          {(["new", "reviewed", "proposal_sent", "won", "lost"] as const)
            .filter(key => groups[key].length > 0)
            .map(key => {
              const { label, tone } = statusConfig(key === "new" ? null : key as AgencyStatus);
              return (
                <div key={key}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                    <Pill tone={tone} size="sm">{label}</Pill>
                    <span style={{ fontSize: 12, color: "var(--ink-5)" }}>{groups[key].length}</span>
                    <div style={{ flex: 1, height: 1, background: "var(--line)" }} />
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    {groups[key].map(s => (
                      <Link key={s.id} href={`/agency/submissions/${s.id}`} style={{ textDecoration: "none" }}>
                        <div style={{
                          display: "flex", alignItems: "center", gap: 14,
                          padding: "14px 16px", background: "var(--surface)",
                          border: "1px solid var(--line)", borderRadius: 12,
                          boxShadow: "var(--shadow-1)", transition: "border-color .15s",
                        }}>
                          {/* Icon */}
                          <div style={{ width: 36, height: 36, borderRadius: 9, background: "var(--surface-2)", border: "1px solid var(--line)", display: "grid", placeItems: "center", flexShrink: 0 }}>
                            <Icon name="file" size={16} color="var(--ink-3)" />
                          </div>

                          {/* Name + email */}
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontSize: 14, fontWeight: 600, color: "var(--ink)", letterSpacing: "-0.01em" }}>
                              {s.client_company ?? s.client_name ?? s.client_email ?? "Unknown client"}
                            </div>
                            <div style={{ fontSize: 12, color: "var(--ink-4)", marginTop: 2 }}>
                              {s.client_name && s.client_company ? s.client_name + " · " : ""}{s.client_email}
                            </div>
                          </div>

                          {/* Score */}
                          {s.quality_score != null && (
                            <div style={{ textAlign: "right", flexShrink: 0 }}>
                              <div className="br-mono" style={{ fontSize: 16, fontWeight: 700, color: s.quality_score >= 80 ? "var(--ok)" : "var(--warn)", letterSpacing: "-0.02em" }}>
                                {s.quality_score}
                              </div>
                              <div style={{ fontSize: 10, color: "var(--ink-5)" }}>/ 100</div>
                            </div>
                          )}

                          {/* Date */}
                          <div style={{ fontSize: 12, color: "var(--ink-4)", flexShrink: 0, minWidth: 80, textAlign: "right" }}>
                            {formatDate(s.submitted_at)}
                          </div>

                          <Icon name="arrow_right" size={14} color="var(--ink-5)" />
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
}
