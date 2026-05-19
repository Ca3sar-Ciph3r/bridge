"use client";
import { useState } from "react";
import { ClientEditor } from "./ClientEditor";
import { PortalUrlBox } from "./PortalUrlBox";
import { DeliverableManager } from "./DeliverableManager";
import { InvoiceManager } from "./InvoiceManager";
import type { PortalClient, Deliverable, Invoice } from "@/lib/types";

const TABS = [
  { id: "overview",      label: "Overview" },
  { id: "deliverables",  label: "Deliverables" },
  { id: "invoices",      label: "Invoices" },
] as const;

type TabId = typeof TABS[number]["id"];

interface Props {
  client: PortalClient;
  deliverables: Deliverable[];
  invoices: Invoice[];
}

export function ClientDetailTabs({ client, deliverables, invoices }: Props) {
  const [active, setActive] = useState<TabId>("overview");

  return (
    <div>
      {/* Tab bar */}
      <div style={{ display: "flex", gap: 2, borderBottom: "1px solid var(--line)", marginBottom: 24 }}>
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

      {/* Overview */}
      {active === "overview" && (
        <div>
          <ClientEditor client={client} />
          {client.retainer_status === "active" && (
            <PortalUrlBox email={client.email} />
          )}
        </div>
      )}

      {/* Deliverables */}
      {active === "deliverables" && (
        <DeliverableManager clientId={client.id} initial={deliverables} />
      )}

      {/* Invoices */}
      {active === "invoices" && (
        <InvoiceManager clientId={client.id} initial={invoices} />
      )}
    </div>
  );
}
