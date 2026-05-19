"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@/components/ui/Icon";
import { PORTAL_SECTIONS, type PortalSectionId } from "@/lib/types";

interface PortalNavProps {
  clientName?: string | null;
  companyName?: string | null;
}

export function PortalNav({ clientName, companyName }: PortalNavProps) {
  const pathname = usePathname();
  const currentId = PORTAL_SECTIONS.find(s => pathname.startsWith(s.path))?.id as PortalSectionId | undefined;

  return (
    <aside style={{
      width: 240, flexShrink: 0, borderRight: "1px solid var(--line)",
      background: "var(--bg)", display: "flex", flexDirection: "column",
      padding: "24px 16px 24px", gap: 0,
    }}>
      {/* Wordmark */}
      <div style={{ padding: "0 8px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link href="/" className="br-wordmark" style={{ fontSize: 16 }}>
          <span className="br-mark"/>Bridge
        </Link>
        <span className="br-mono" style={{ fontSize: 10, color: "var(--ink-5)" }}>PORTAL</span>
      </div>

      {/* Client info */}
      {(clientName || companyName) && (
        <div style={{ margin: "0 0 16px", padding: "10px 12px", borderRadius: 10, background: "var(--surface)", border: "1px solid var(--line)" }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: "var(--ink)", letterSpacing: "-0.005em" }}>{companyName ?? clientName}</div>
          {companyName && clientName && <div style={{ fontSize: 11, color: "var(--ink-4)", marginTop: 2 }}>{clientName}</div>}
        </div>
      )}

      {/* Nav items */}
      <nav style={{ display: "flex", flexDirection: "column", gap: 2, flex: 1 }}>
        {PORTAL_SECTIONS.map(s => {
          const active = currentId === s.id;
          return (
            <Link key={s.id} href={s.path} style={{
              display: "flex", alignItems: "center", gap: 10, padding: "9px 10px", borderRadius: 8,
              textDecoration: "none", transition: "all .15s ease",
              background: active ? "var(--surface)" : "transparent",
              border: active ? "1px solid var(--line)" : "1px solid transparent",
              boxShadow: active ? "var(--shadow-1)" : "none",
              color: active ? "var(--ink)" : "var(--ink-4)",
            }}>
              <Icon name={s.icon} size={15} />
              <span style={{ fontSize: 13, fontWeight: active ? 600 : 500, letterSpacing: "-0.005em" }}>{s.title}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div style={{ paddingTop: 16, borderTop: "1px solid var(--line)", display: "flex", flexDirection: "column", gap: 8 }}>
        <div style={{ padding: "8px 10px", display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 7, height: 7, borderRadius: 999, background: "var(--ok)", animation: "br-pulse-soft 2s ease-in-out infinite", flexShrink: 0 }}/>
          <span style={{ fontSize: 11.5, color: "var(--ink-4)" }}>Managed by Digital Native</span>
        </div>
        <Link href="/auth/signout" style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 10px", borderRadius: 8, textDecoration: "none", color: "var(--ink-4)", fontSize: 12 }}>
          <Icon name="arrow_right" size={13}/>
          Sign out
        </Link>
      </div>
    </aside>
  );
}
