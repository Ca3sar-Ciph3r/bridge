"use server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import type { PortalClient, Deliverable, Report, Invoice, Project, BrandAsset, AccountCredential } from "@/lib/types";

async function getClientId(): Promise<string | null> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user?.email) return null;
  const admin = createAdminClient();
  const { data } = await admin.from("portal_clients").select("id").eq("email", user.email).maybeSingle();
  return data?.id ?? null;
}

export async function getPortalClient(): Promise<PortalClient | null> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user?.email) return null;
  const admin = createAdminClient();
  const { data } = await admin.from("portal_clients").select("*").eq("email", user.email).maybeSingle();
  return data as PortalClient | null;
}

export async function getDeliverables(): Promise<Deliverable[]> {
  const clientId = await getClientId();
  if (!clientId) return [];
  const admin = createAdminClient();
  const { data } = await admin.from("deliverables").select("*").eq("client_id", clientId).order("created_at", { ascending: false });
  const rows = (data ?? []) as Deliverable[];
  return Promise.all(rows.map(async (d) => {
    if (d.image_url && !d.image_url.startsWith("http")) {
      const { data: signed } = await admin.storage.from("client-files").createSignedUrl(d.image_url, 3600);
      return { ...d, image_url: signed?.signedUrl ?? null };
    }
    return d;
  }));
}

export async function updateDeliverableStatus(id: string, status: Deliverable["status"], changes_note?: string): Promise<void> {
  const supabase = await createClient();
  await supabase.from("deliverables").update({ status, changes_note: changes_note ?? null }).eq("id", id);
}

export async function getReports(): Promise<Report[]> {
  const clientId = await getClientId();
  if (!clientId) return [];
  const admin = createAdminClient();
  const { data } = await admin.from("reports").select("*").eq("client_id", clientId).order("month", { ascending: false });
  const rows = (data ?? []) as Report[];
  return Promise.all(rows.map(async (r) => {
    if (r.pdf_url && !r.pdf_url.startsWith("http")) {
      const { data: signed } = await admin.storage.from("client-files").createSignedUrl(r.pdf_url, 3600);
      return { ...r, pdf_url: signed?.signedUrl ?? null };
    }
    return r;
  }));
}

export async function getInvoices(): Promise<Invoice[]> {
  const clientId = await getClientId();
  if (!clientId) return [];
  const admin = createAdminClient();
  const { data } = await admin.from("invoices").select("*").eq("client_id", clientId).order("issued_date", { ascending: false });
  const rows = (data ?? []) as Invoice[];
  return Promise.all(rows.map(async (inv) => {
    if (inv.pdf_url && !inv.pdf_url.startsWith("http")) {
      const { data: signed } = await admin.storage.from("client-files").createSignedUrl(inv.pdf_url, 3600);
      return { ...inv, pdf_url: signed?.signedUrl ?? null };
    }
    return inv;
  }));
}

export async function getProjects(): Promise<Project[]> {
  const clientId = await getClientId();
  if (!clientId) return [];
  const supabase = await createClient();
  const { data } = await supabase.from("projects").select("*").eq("client_id", clientId).order("sort_order", { ascending: true });
  return (data ?? []) as Project[];
}

export async function getBrandAssets(): Promise<BrandAsset[]> {
  const clientId = await getClientId();
  if (!clientId) return [];
  const admin = createAdminClient();
  const { data } = await admin.from("brand_assets").select("*").eq("client_id", clientId).order("type", { ascending: true });
  const rows = (data ?? []) as BrandAsset[];
  return Promise.all(rows.map(async (a) => {
    const signed: Partial<BrandAsset> = {};
    if (a.file_url && !a.file_url.startsWith("http")) {
      const { data: s } = await admin.storage.from("client-files").createSignedUrl(a.file_url, 3600);
      signed.file_url = s?.signedUrl ?? null;
    }
    if (a.thumbnail_url && !a.thumbnail_url.startsWith("http")) {
      const { data: s } = await admin.storage.from("client-files").createSignedUrl(a.thumbnail_url, 3600);
      signed.thumbnail_url = s?.signedUrl ?? null;
    }
    return { ...a, ...signed };
  }));
}

export async function getAccountCredentials(): Promise<AccountCredential[]> {
  const clientId = await getClientId();
  if (!clientId) return [];
  const supabase = await createClient();
  const { data } = await supabase.from("account_credentials").select("*").eq("client_id", clientId).order("platform", { ascending: true });
  return (data ?? []) as AccountCredential[];
}

export async function getPortalDashboardData() {
  const [client, deliverables, projects, invoices] = await Promise.all([
    getPortalClient(),
    getDeliverables(),
    getProjects(),
    getInvoices(),
  ]);
  return { client, deliverables, projects, invoices };
}
