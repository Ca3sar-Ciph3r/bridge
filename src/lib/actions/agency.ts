"use server";
import { createAdminClient } from "@/lib/supabase/admin";
import { revalidatePath } from "next/cache";
import type { AgencyStatus, PortalClient, Deliverable, Invoice } from "@/lib/types";

const BUCKET = "client-files";

// ── Signed URL helper ─────────────────────────────────────────

async function withSignedUrl<T extends { image_url?: string | null; pdf_url?: string | null }>(
  items: T[]
): Promise<T[]> {
  const admin = createAdminClient();
  return Promise.all(
    items.map(async (item) => {
      const path = item.image_url ?? item.pdf_url;
      if (!path || path.startsWith("http")) return item;
      const key = "image_url" in item && item.image_url === path ? "image_url" : "pdf_url";
      const { data } = await admin.storage.from(BUCKET).createSignedUrl(path, 3600);
      return { ...item, [key]: data?.signedUrl ?? null };
    })
  );
}

// ── Submissions ───────────────────────────────────────────────

export async function getSubmissions() {
  const supabase = createAdminClient();
  const { data } = await supabase
    .from("onboarding_sessions")
    .select("*")
    .eq("status", "submitted")
    .order("submitted_at", { ascending: false });
  return data ?? [];
}

export async function getSubmission(id: string) {
  const supabase = createAdminClient();
  const [session, snapshot, services, strategy, goals] = await Promise.all([
    supabase.from("onboarding_sessions").select("*").eq("id", id).single(),
    supabase.from("onboarding_snapshot").select("*").eq("session_id", id).maybeSingle(),
    supabase.from("onboarding_services").select("*").eq("session_id", id).maybeSingle(),
    supabase.from("onboarding_strategy").select("*").eq("session_id", id).maybeSingle(),
    supabase.from("onboarding_goals").select("*").eq("session_id", id).maybeSingle(),
  ]);
  return {
    session: session.data,
    snapshot: snapshot.data,
    services: services.data,
    strategy: strategy.data,
    goals: goals.data,
  };
}

export async function setAgencyStatus(sessionId: string, agencyStatus: AgencyStatus) {
  const supabase = createAdminClient();
  await supabase
    .from("onboarding_sessions")
    .update({ agency_status: agencyStatus })
    .eq("id", sessionId);

  if (agencyStatus === "won") {
    const { data: session } = await supabase
      .from("onboarding_sessions")
      .select("user_id, client_name, client_email, client_company")
      .eq("id", sessionId)
      .single();

    if (session?.user_id) {
      await supabase.from("portal_clients").upsert(
        {
          id: session.user_id,
          name: session.client_name ?? null,
          company_name: session.client_company ?? null,
          email: session.client_email ?? null,
          retainer_status: "active",
          start_date: new Date().toISOString().slice(0, 10),
        },
        { onConflict: "id", ignoreDuplicates: false }
      );
    }

    revalidatePath("/agency/clients");
  }

  revalidatePath("/agency/submissions");
  revalidatePath(`/agency/submissions/${sessionId}`);
  return { success: true };
}

// ── Clients ───────────────────────────────────────────────────

export async function getAgencyClients() {
  const supabase = createAdminClient();
  const { data } = await supabase
    .from("portal_clients")
    .select("*")
    .order("created_at", { ascending: false });
  return (data ?? []) as PortalClient[];
}

export async function getAgencyClient(clientId: string) {
  const supabase = createAdminClient();
  const [client, projects, invoices, deliverables, reports] = await Promise.all([
    supabase.from("portal_clients").select("*").eq("id", clientId).single(),
    supabase.from("projects").select("*").eq("client_id", clientId).order("sort_order", { ascending: true }),
    supabase.from("invoices").select("*").eq("client_id", clientId).order("issued_date", { ascending: false }),
    supabase.from("deliverables").select("*").eq("client_id", clientId).order("created_at", { ascending: false }),
    supabase.from("reports").select("*").eq("client_id", clientId).order("month", { ascending: false }),
  ]);
  return {
    client: client.data as PortalClient | null,
    projects: projects.data ?? [],
    invoices: invoices.data ?? [],
    deliverables: deliverables.data ?? [],
    reports: reports.data ?? [],
  };
}

export async function updatePortalClient(clientId: string, data: Partial<PortalClient>) {
  const supabase = createAdminClient();
  await supabase.from("portal_clients").update(data).eq("id", clientId);
  revalidatePath(`/agency/clients/${clientId}`);
  revalidatePath("/agency/clients");
  return { success: true };
}

// ── Deliverables (agency) ─────────────────────────────────────

export async function getClientDeliverables(clientId: string): Promise<Deliverable[]> {
  const admin = createAdminClient();
  const { data } = await admin
    .from("deliverables")
    .select("*")
    .eq("client_id", clientId)
    .order("created_at", { ascending: false });
  return withSignedUrl((data ?? []) as Deliverable[]) as Promise<Deliverable[]>;
}

export async function addDeliverable(
  clientId: string,
  payload: {
    title: string;
    caption: string | null;
    platform: Deliverable["platform"];
    scheduled_date: string | null;
    file_path: string | null;
  }
): Promise<{ error?: string }> {
  const admin = createAdminClient();
  const { error } = await admin.from("deliverables").insert({
    client_id: clientId,
    title: payload.title,
    caption: payload.caption,
    platform: payload.platform,
    scheduled_date: payload.scheduled_date,
    image_url: payload.file_path,
    status: "pending",
  });
  if (error) return { error: error.message };
  revalidatePath(`/agency/clients/${clientId}`);
  revalidatePath("/portal/deliverables");
  return {};
}

export async function deleteDeliverable(id: string, clientId: string, filePath: string | null): Promise<void> {
  const admin = createAdminClient();
  if (filePath && !filePath.startsWith("http")) {
    await admin.storage.from(BUCKET).remove([filePath]);
  }
  await admin.from("deliverables").delete().eq("id", id);
  revalidatePath(`/agency/clients/${clientId}`);
  revalidatePath("/portal/deliverables");
}

// ── Invoices (agency) ─────────────────────────────────────────

export async function getClientInvoices(clientId: string): Promise<Invoice[]> {
  const admin = createAdminClient();
  const { data } = await admin
    .from("invoices")
    .select("*")
    .eq("client_id", clientId)
    .order("issued_date", { ascending: false });
  return withSignedUrl((data ?? []) as Invoice[]) as Promise<Invoice[]>;
}

export async function addInvoice(
  clientId: string,
  payload: {
    invoice_number: string;
    amount: number;
    description: string | null;
    issued_date: string | null;
    due_date: string | null;
    status: Invoice["status"];
    file_path: string | null;
  }
): Promise<{ error?: string }> {
  const admin = createAdminClient();
  const { error } = await admin.from("invoices").insert({
    client_id: clientId,
    invoice_number: payload.invoice_number,
    amount: payload.amount,
    description: payload.description,
    issued_date: payload.issued_date,
    due_date: payload.due_date,
    status: payload.status,
    pdf_url: payload.file_path,
    currency: "ZAR",
  });
  if (error) return { error: error.message };
  revalidatePath(`/agency/clients/${clientId}`);
  revalidatePath("/portal/invoices");
  return {};
}

export async function updateInvoiceStatus(id: string, clientId: string, status: Invoice["status"]): Promise<void> {
  const admin = createAdminClient();
  await admin.from("invoices").update({ status }).eq("id", id);
  revalidatePath(`/agency/clients/${clientId}`);
  revalidatePath("/portal/invoices");
}

export async function deleteInvoice(id: string, clientId: string, filePath: string | null): Promise<void> {
  const admin = createAdminClient();
  if (filePath && !filePath.startsWith("http")) {
    await admin.storage.from(BUCKET).remove([filePath]);
  }
  await admin.from("invoices").delete().eq("id", id);
  revalidatePath(`/agency/clients/${clientId}`);
  revalidatePath("/portal/invoices");
}
