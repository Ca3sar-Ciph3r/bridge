"use server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function createPortalAccount(email: string, password: string): Promise<{ success?: true; error?: string }> {
  const admin = createAdminClient();

  // Only allow if email has an active portal
  const { data: client } = await admin
    .from("portal_clients")
    .select("id")
    .eq("email", email)
    .eq("retainer_status", "active")
    .maybeSingle();

  if (!client) {
    return { error: "No active portal found for this email. Contact your agency." };
  }

  // Try creating a new account (works if they have never signed up before)
  const { error: createError } = await admin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  });

  if (!createError) return { success: true };

  // User already exists — update their password instead
  const { data: { users } } = await admin.auth.admin.listUsers({ perPage: 1000 });
  const existing = users.find(u => u.email === email);
  if (!existing) return { error: "Could not update account. Please contact support." };

  const { error: updateError } = await admin.auth.admin.updateUserById(existing.id, { password });
  if (updateError) return { error: updateError.message };

  return { success: true };
}
