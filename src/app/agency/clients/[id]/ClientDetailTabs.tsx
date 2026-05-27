"use client";
import { useState } from "react";
import { ClientEditor } from "./ClientEditor";
import { PortalUrlBox } from "./PortalUrlBox";
import { DeliverableManager } from "./DeliverableManager";
import { InvoiceManager } from "./InvoiceManager";
import { ReportManager } from "./ReportManager";
import { BrandManager } from "./BrandManager";
import type { PortalClient, Deliverable, Invoice, Report, BrandAsset } from "@/lib/types";

const TABS = [
  { id: "overview",      label: "Overview" },
  { id: "deliverables",  label: "Deliverables" },
  { id: "invoices",      label: "Invoices" },
  { id: "reports",       label: "Reports" },
  { id: "brand",         label: "Brand Assets" },
] as const;

type TabId = typeof TABS[number]["id"];

interface Props {
  client: PortalClient;
  deliverables: Deliverable[];
  invoices: Invoice[];
  reports: Report[];
  brandAssets: BrandAsset[];
}

export function ClientDetailTabs({ client, deliverables, invoices, reports, brandAssets }: Props) {
  const [active, setActive] = useState<TabId>("overview");

  return (
    <div>
      {/* Tab bar */}
      <div style={{ display: "flex", gap: 2, borderBottom: "1px solid var(--line)", marginBottom: 24, flexWrap: "wrap" }}>
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            style={{
              padding: "9px 16px", fontSize: 13, fontWeight: active === tab.id ? 600 : 500,
              background: "none", border: "none", cursor: "pointer",
              color: active === tab.id ? "var(--ink)" : "var(--ink-4)",
              borderBottom: active === tab.id ? "2px solid var(--ink)" : "2px solid transparent",
              marginBottom: -1, transition: "color .15s",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {active === "overview" && (
        <div>
          <ClientEditor client={client} />
          {client.retainer_status === "active" && (
            <PortalUrlBox email={client.email} />
          )}
        </div>
      )}

      {active === "deliverables" && (
        <DeliverableManager clientId={client.id} initial={deliverables} />
      )}

      {active === "invoices" && (
        <InvoiceManager clientId={client.id} initial={invoices} />
      )}

      {active === "reports" && (
        <ReportManager clientId={client.id} initial={reports} />
      )}

      {active === "brand" && (
        <BrandManager clientId={client.id} initial={brandAssets} />
      )}
    </div>
  );
}
