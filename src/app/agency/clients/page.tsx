import Link from "next/link";
import { getAgencyClients } from "@/lib/actions/agency";
import { Icon } from "@/components/ui/Icon";
import { Pill } from "@/components/ui/Chip";
import type { PortalClient } from "@/lib/types";

function retainerTone(s: PortalClient["retainer_status"]): "ok" | "warn" | "err" {
  if (s === "active")    return "ok";
  if (s === "paused")    return "warn";
  return "err";
}

function retainerLabel(s: PortalClient["retainer_status"]) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export default async function ClientsPage() {
  const clients = await getAgencyClients();
  const active = clients.filter(c => c.retainer_status === "active");
  const pending = clients.filter(c => c.retainer_status !== "active");

  return (
    <div style={{ padding: "32px 40px", maxWidth: 900 }}>
      <div className="br-fade-up" style={{ marginBottom: 32 }}>
        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--accent)" }}>Agency</span>
        <h1 style={{ fontSize: 26, fontWeight: 700, color: "var(--ink)", margin: "4px 0 6px", letterSpacing: "-0.03em" }}>Clients</h1>
        <p style={{ fontSize: 14, color: "var(--ink-3)", margin: 0 }}>
          {active.length} active · {pending.length} pending
        </p>
      </div>

      {clients.length === 0 ? (
        <div style={{ padding: "40px 24px", textAlign: "center", color: "var(--ink-4)", fontSize: 14, background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 12 }}>
          No clients yet. They&apos;ll appear here once a submission is marked as won.
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {clients.map(c => (
            <Link key={c.id} href={`/agency/clients/${c.id}`} style={{ textDecoration: "none" }}>
              <div style={{
                display: "flex", alignItems: "center", gap: 14,
                padding: "14px 16px", background: "var(--surface)",
                border: "1px solid var(--line)", borderRadius: 12,
                boxShadow: "var(--shadow-1)", transition: "border-color .15s",
              }}>
                {/* Avatar */}
                <div style={{
                  width: 38, height: 38, borderRadius: 10, flexShrink: 0,
                  background: "var(--accent-soft)", border: "1px solid var(--accent-soft-2)",
                  display: "grid", placeItems: "center",
                  fontSize: 14, fontWeight: 700, color: "var(--accent)",
                }}>
                  {(c.company_name ?? c.name ?? "?")[0].toUpperCase()}
                </div>

                {/* Details */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "var(--ink)", letterSpacing: "-0.01em" }}>
                    {c.company_name ?? c.name ?? c.email}
                  </div>
                  <div style={{ fontSize: 12, color: "var(--ink-4)", marginTop: 2 }}>
                    {c.company_name && c.name ? `${c.name} · ` : ""}{c.email}
                    {c.package ? ` · ${c.package}` : ""}
                  </div>
                </div>

                {/* Retainer amount */}
                {c.retainer_amount != null && (
                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: "var(--ink)", letterSpacing: "-0.01em" }}>
                      R{c.retainer_amount.toLocaleString()}
                    </div>
                    <div style={{ fontSize: 10, color: "var(--ink-5)" }}>/ month</div>
                  </div>
                )}

                {/* Status */}
                <Pill tone={retainerTone(c.retainer_status)} size="sm">{retainerLabel(c.retainer_status)}</Pill>

                <Icon name="arrow_right" size={14} color="var(--ink-5)" />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
