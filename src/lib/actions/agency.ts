"use server";
import { createAdminClient } from "@/lib/supabase/admin";
import { revalidatePath } from "next/cache";
import type { AgencyStatus, PortalClient } from "@/lib/types";

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
      .select("user_id")
      .eq("id", sessionId)
      .single();

    if (session?.user_id) {
      await supabase
        .from("portal_clients")
        .update({ retainer_status: "active" })
        .eq("id", session.user_id);
    }
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
