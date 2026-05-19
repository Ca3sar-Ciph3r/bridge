"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@/components/ui/Icon";

const NAV = [
  { id: "submissions", label: "Submissions",  icon: "file",     path: "/agency/submissions" },
  { id: "clients",     label: "Clients",       icon: "users",    path: "/agency/clients" },
] as const;

export function AgencyNav() {
  const pathname = usePathname();

  return (
    <aside style={{
      width: 220, flexShrink: 0, borderRight: "1px solid var(--line)",
      background: "var(--bg)", display: "flex", flexDirection: "column",
      padding: "20px 14px",
    }}>
      {/* Wordmark */}
      <div style={{ padding: "0 8px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link href="/" className="br-wordmark" style={{ fontSize: 15 }}>
          <span className="br-mark" />Bridge
        </Link>
        <span className="br-mono" style={{ fontSize: 10, color: "var(--ink-5)", background: "var(--surface-2)", border: "1px solid var(--line)", borderRadius: 4, padding: "2px 5px" }}>
          AGENCY
        </span>
      </div>

      {/* Nav */}
      <nav style={{ display: "flex", flexDirection: "column", gap: 2, flex: 1 }}>
        {NAV.map(({ id, label, icon, path }) => {
          const active = pathname.startsWith(path);
          return (
            <Link key={id} href={path} style={{
              display: "flex", alignItems: "center", gap: 10, padding: "9px 10px",
              borderRadius: 8, textDecoration: "none", transition: "all .15s ease",
              background: active ? "var(--surface)" : "transparent",
              border: active ? "1px solid var(--line)" : "1px solid transparent",
              boxShadow: active ? "var(--shadow-1)" : "none",
              color: active ? "var(--ink)" : "var(--ink-4)",
            }}>
              <Icon name={icon} size={15} />
              <span style={{ fontSize: 13, fontWeight: active ? 600 : 500, letterSpacing: "-0.005em" }}>{label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div style={{ paddingTop: 14, borderTop: "1px solid var(--line)", display: "flex", flexDirection: "column", gap: 6 }}>
        <div style={{ padding: "6px 10px", fontSize: 11.5, color: "var(--ink-4)" }}>
          Signed in as <strong style={{ color: "var(--ink-2)" }}>Luke Gunn</strong>
        </div>
        <Link href="/auth/signout" style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 10px", borderRadius: 8, textDecoration: "none", color: "var(--ink-4)", fontSize: 12 }}>
          <Icon name="arrow_right" size={13} />
          Sign out
        </Link>
      </div>
    </aside>
  );
}
