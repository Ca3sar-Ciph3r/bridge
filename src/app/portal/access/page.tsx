import { getAccountCredentials } from "@/lib/actions/portal";
import { Icon } from "@/components/ui/Icon";
import { Pill } from "@/components/ui/Chip";
import type { AccountCredential } from "@/lib/types";

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-ZA", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function statusTone(
  status: AccountCredential["status"]
): "ok" | "warn" | "neutral" {
  if (status === "active") return "ok";
  if (status === "pending") return "warn";
  return "neutral";
}

function statusLabel(status: AccountCredential["status"]): string {
  if (status === "active") return "Active";
  if (status === "pending") return "Pending";
  return "Revoked";
}

// ── Sub-components ────────────────────────────────────────────────────────────

function CredentialCard({ credential }: { credential: AccountCredential }) {
  return (
    <div
      style={{
        padding: "16px 18px",
        background: "var(--surface)",
        border: "1px solid var(--line)",
        borderRadius: 12,
        boxShadow: "var(--shadow-1)",
        display: "flex",
        flexDirection: "column",
        gap: 6,
      }}
    >
      {/* Top row: platform + status */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 2, minWidth: 0 }}>
          <span
            style={{
              fontSize: 15,
              fontWeight: 700,
              color: "var(--ink)",
              letterSpacing: "-0.015em",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {credential.platform}
          </span>
          {credential.account_name && (
            <span
              style={{
                fontSize: 12.5,
                color: "var(--ink-3)",
                fontWeight: 400,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {credential.account_name}
            </span>
          )}
        </div>
        <Pill tone={statusTone(credential.status)} size="sm">
          {statusLabel(credential.status)}
        </Pill>
      </div>

      {/* Username */}
      {credential.username && (
        <div
          style={{
            fontSize: 12.5,
            color: "var(--ink-3)",
            fontFamily: "var(--font-mono)",
            background: "var(--surface-2)",
            border: "1px solid var(--line)",
            borderRadius: 6,
            padding: "4px 8px",
            display: "inline-block",
            alignSelf: "flex-start",
            letterSpacing: "0.02em",
          }}
        >
          {credential.username}
        </div>
      )}

      {/* Notes */}
      {credential.notes && (
        <p
          style={{
            fontSize: 12.5,
            color: "var(--ink-4)",
            lineHeight: 1.55,
            margin: 0,
          }}
        >
          {credential.notes}
        </p>
      )}

      {/* Created date */}
      <div
        style={{
          fontSize: 11.5,
          color: "var(--ink-5)",
          fontFamily: "var(--font-mono)",
          letterSpacing: "0.02em",
          marginTop: 2,
        }}
      >
        Added {formatDate(credential.created_at)}
      </div>
    </div>
  );
}

// Section wrapper (Active / Pending / Revoked)

interface CredentialGroupProps {
  title: string;
  credentials: AccountCredential[];
}

function CredentialGroup({ title, credentials }: CredentialGroupProps) {
  if (credentials.length === 0) return null;

  return (
    <div style={{ marginBottom: 36 }}>
      {/* Section header */}
      <div
        style={{
          fontSize: 13,
          fontWeight: 600,
          color: "var(--ink-2)",
          letterSpacing: "-0.01em",
          marginBottom: 12,
          paddingBottom: 10,
          borderBottom: "1px solid var(--line)",
        }}
      >
        {title}
        <span
          style={{
            marginLeft: 8,
            fontSize: 12,
            fontWeight: 500,
            color: "var(--ink-4)",
          }}
        >
          {credentials.length}
        </span>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: 10,
        }}
      >
        {credentials.map((cred) => (
          <CredentialCard key={cred.id} credential={cred} />
        ))}
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function AccessPage() {
  const credentials = await getAccountCredentials();

  const active = credentials.filter((c) => c.status === "active");
  const pending = credentials.filter((c) => c.status === "pending");
  const revoked = credentials.filter((c) => c.status === "revoked");

  return (
    <div style={{ padding: "32px 40px" }}>
      {/* Header */}
      <div
        className="br-fade-up"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 6,
          marginBottom: 36,
        }}
      >
        <span
          style={{
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "var(--accent)",
          }}
        >
          Account Access
        </span>
        <h1
          style={{
            fontSize: 26,
            fontWeight: 700,
            color: "var(--ink)",
            margin: 0,
            letterSpacing: "-0.03em",
          }}
        >
          Platform credentials
        </h1>
        <p style={{ fontSize: 14.5, color: "var(--ink-3)", margin: 0 }}>
          A record of all accounts and access relevant to your campaigns.
        </p>
      </div>

      {/* Empty state */}
      {credentials.length === 0 ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 14,
            padding: "72px 24px",
            background: "var(--surface)",
            border: "1px solid var(--line)",
            borderRadius: 16,
            textAlign: "center",
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 12,
              background: "var(--surface-2)",
              display: "grid",
              placeItems: "center",
              border: "1px solid var(--line)",
            }}
          >
            <Icon name="lock" size={22} color="var(--ink-4)" />
          </div>
          <div>
            <div
              style={{
                fontSize: 15,
                fontWeight: 600,
                color: "var(--ink-2)",
                marginBottom: 6,
                letterSpacing: "-0.01em",
              }}
            >
              No account access records yet
            </div>
            <p
              style={{
                fontSize: 13.5,
                color: "var(--ink-4)",
                lineHeight: 1.6,
                margin: 0,
                maxWidth: 360,
              }}
            >
              Platform credentials and account access records will appear here
              once they&apos;ve been set up.
            </p>
          </div>
        </div>
      ) : (
        <div>
          <CredentialGroup title="Active" credentials={active} />
          <CredentialGroup title="Pending" credentials={pending} />
          <CredentialGroup title="Revoked" credentials={revoked} />
        </div>
      )}
    </div>
  );
}
