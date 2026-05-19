"use client";
import { useState, useTransition } from "react";
import { updatePortalClient } from "@/lib/actions/agency";
import { Button } from "@/components/ui/Button";
import { Field, Input } from "@/components/ui/Field";
import { Chip } from "@/components/ui/Chip";
import type { PortalClient } from "@/lib/types";

const RETAINER_STATUSES: PortalClient["retainer_status"][] = ["active", "paused", "cancelled"];
const PACKAGES = ["Starter", "Growth", "Scale", "Enterprise", "Custom"];

export function ClientEditor({ client }: { client: PortalClient }) {
  const [isPending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);

  const [name, setName]                = useState(client.name ?? "");
  const [company, setCompany]          = useState(client.company_name ?? "");
  const [email, setEmail]              = useState(client.email ?? "");
  const [retainerStatus, setRetainerStatus] = useState(client.retainer_status);
  const [retainerAmount, setRetainerAmount] = useState(client.retainer_amount != null ? String(client.retainer_amount) : "");
  const [pkg, setPkg]                  = useState(client.package ?? "");
  const [startDate, setStartDate]      = useState(client.start_date ?? "");

  function handleSave() {
    setSaved(false);
    startTransition(async () => {
      await updatePortalClient(client.id, {
        name: name || null,
        company_name: company || null,
        email: email || null,
        retainer_status: retainerStatus,
        retainer_amount: retainerAmount ? Number(retainerAmount.replace(/[^0-9.]/g, "")) : null,
        package: pkg || null,
        start_date: startDate || null,
      });
      setSaved(true);
    });
  }

  return (
    <div style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 14, padding: 22, boxShadow: "var(--shadow-1)" }}>
      <div style={{ fontSize: 13, fontWeight: 600, color: "var(--ink-2)", marginBottom: 18, paddingBottom: 12, borderBottom: "1px solid var(--line)" }}>
        Client details
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 18 }}>
        <Field label="Contact name">
          <Input value={name} onChange={setName} placeholder="Jane Smith" />
        </Field>
        <Field label="Company name">
          <Input value={company} onChange={setCompany} placeholder="Acme Corp" />
        </Field>
        <Field label="Email address">
          <Input value={email} onChange={setEmail} placeholder="jane@company.com" type="email" />
        </Field>
        <Field label="Start date">
          <Input value={startDate} onChange={setStartDate} placeholder="YYYY-MM-DD" />
        </Field>
        <Field label="Monthly retainer (ZAR)">
          <Input value={retainerAmount} onChange={setRetainerAmount} placeholder="15000" prefix="R" suffix="/ mo" />
        </Field>
        <Field label="Package">
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {PACKAGES.map(p => (
              <Chip key={p} size="sm" active={pkg === p} onClick={() => setPkg(p === pkg ? "" : p)}>{p}</Chip>
            ))}
          </div>
        </Field>
      </div>

      <Field label="Retainer status" style={{ marginBottom: 20 }}>
        <div style={{ display: "flex", gap: 8 }}>
          {RETAINER_STATUSES.map(s => (
            <Chip key={s} active={retainerStatus === s} onClick={() => setRetainerStatus(s)}>
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </Chip>
          ))}
        </div>
      </Field>

      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <Button variant="accent" size="md" onClick={handleSave} loading={isPending}>
          Save changes
        </Button>
        {saved && !isPending && (
          <span style={{ fontSize: 13, color: "var(--ok)", fontWeight: 500 }}>Saved ✓</span>
        )}
      </div>
    </div>
  );
}
