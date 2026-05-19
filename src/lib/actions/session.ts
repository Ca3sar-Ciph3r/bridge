"use server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { type SectionId, type SnapshotData, type ServicesData, type StrategyData, type GoalsData } from "@/lib/types";
import { revalidatePath } from "next/cache";

// ── Session ──────────────────────────────────────────────────

export async function getOrCreateSession() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: existing } = await supabase
    .from("onboarding_sessions")
    .select("*")
    .eq("user_id", user.id)
    .eq("status", "in_progress")
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (existing) return existing;

  const { data: created } = await supabase
    .from("onboarding_sessions")
    .insert({ user_id: user.id, client_email: user.email, status: "in_progress", current_section: "snapshot" })
    .select()
    .single();

  return created;
}

export async function updateSessionSection(sessionId: string, section: SectionId) {
  const supabase = await createClient();
  await supabase
    .from("onboarding_sessions")
    .update({ current_section: section })
    .eq("id", sessionId);
}

export async function getSession() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  const { data } = await supabase
    .from("onboarding_sessions")
    .select("*")
    .eq("user_id", user.id)
    .eq("status", "in_progress")
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  return data;
}

export async function getLatestSession() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  const { data } = await supabase
    .from("onboarding_sessions")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  return data;
}

// ── Section A: Snapshot ──────────────────────────────────────

export async function saveSnapshot(sessionId: string, data: Partial<SnapshotData>) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("onboarding_snapshot")
    .upsert({ session_id: sessionId, ...data }, { onConflict: "session_id" });
  if (!error) revalidatePath("/onboarding/snapshot");
  return { error };
}

export async function getSnapshot(sessionId: string) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("onboarding_snapshot")
    .select("*")
    .eq("session_id", sessionId)
    .maybeSingle();
  return data;
}

// ── Section B: Services ──────────────────────────────────────

export async function saveServices(sessionId: string, data: Partial<ServicesData>) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("onboarding_services")
    .upsert({ session_id: sessionId, ...data }, { onConflict: "session_id" });
  if (!error) revalidatePath("/onboarding/services");
  return { error };
}

export async function getServices(sessionId: string) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("onboarding_services")
    .select("*")
    .eq("session_id", sessionId)
    .maybeSingle();
  return data;
}

// ── Section C: Strategy ──────────────────────────────────────

export async function saveStrategy(sessionId: string, data: Partial<StrategyData>) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("onboarding_strategy")
    .upsert({ session_id: sessionId, ...data }, { onConflict: "session_id" });
  if (!error) revalidatePath("/onboarding/strategy");
  return { error };
}

export async function getStrategy(sessionId: string) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("onboarding_strategy")
    .select("*")
    .eq("session_id", sessionId)
    .maybeSingle();
  return data;
}

// ── Section D·2: Account Access ──────────────────────────────

export async function saveAccountAccess(sessionId: string, platform: string, status: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("onboarding_account_access")
    .upsert({ session_id: sessionId, platform_name: platform, status }, { onConflict: "session_id,platform_name" });
  return { error };
}

export async function getAccountAccess(sessionId: string) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("onboarding_account_access")
    .select("*")
    .eq("session_id", sessionId);
  return data ?? [];
}

// ── Section E: Goals ─────────────────────────────────────────

export async function saveGoals(sessionId: string, data: Partial<GoalsData>) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("onboarding_goals")
    .upsert({ session_id: sessionId, ...data }, { onConflict: "session_id" });
  if (!error) revalidatePath("/onboarding/goals");
  return { error };
}

export async function getGoals(sessionId: string) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("onboarding_goals")
    .select("*")
    .eq("session_id", sessionId)
    .maybeSingle();
  return data;
}

// ── Submit ───────────────────────────────────────────────────

export async function submitOnboarding(sessionId: string, qualityScore: number) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const [updateResult, sessionResult] = await Promise.all([
    supabase
      .from("onboarding_sessions")
      .update({ status: "submitted", submitted_at: new Date().toISOString(), quality_score: qualityScore })
      .eq("id", sessionId),
    supabase
      .from("onboarding_sessions")
      .select("client_name, client_email, client_company")
      .eq("id", sessionId)
      .maybeSingle(),
  ]);

  if (user && !updateResult.error) {
    const sess = sessionResult.data;
    const admin = createAdminClient();
    await admin.from("portal_clients").upsert(
      {
        id: user.id,
        name: sess?.client_name ?? user.user_metadata?.full_name ?? null,
        company_name: sess?.client_company ?? null,
        email: sess?.client_email ?? user.email ?? null,
        retainer_status: "paused",
        start_date: new Date().toISOString().slice(0, 10),
      },
      { onConflict: "id", ignoreDuplicates: true }
    );
  }

  return { error: updateResult.error };
}

// ── All section data (for Review / Resume) ───────────────────

export async function getAllSectionData(sessionId: string) {
  const supabase = await createClient();
  const [snap, svc, strat, goals, assets, access] = await Promise.all([
    supabase.from("onboarding_snapshot").select("*").eq("session_id", sessionId).maybeSingle(),
    supabase.from("onboarding_services").select("*").eq("session_id", sessionId).maybeSingle(),
    supabase.from("onboarding_strategy").select("*").eq("session_id", sessionId).maybeSingle(),
    supabase.from("onboarding_goals").select("*").eq("session_id", sessionId).maybeSingle(),
    supabase.from("onboarding_assets").select("*").eq("session_id", sessionId),
    supabase.from("onboarding_account_access").select("*").eq("session_id", sessionId),
  ]);
  return {
    snapshot: snap.data,
    services: svc.data,
    strategy: strat.data,
    goals: goals.data,
    assets: assets.data ?? [],
    access: access.data ?? [],
  };
}
