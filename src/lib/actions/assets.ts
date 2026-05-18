"use server";
import { createClient } from "@/lib/supabase/server";

export async function uploadAsset(sessionId: string, formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Not authenticated" };

  const file = formData.get("file") as File;
  if (!file) return { error: "No file provided" };

  const path = `${user.id}/${sessionId}/${Date.now()}-${file.name}`;
  const { error: uploadError } = await supabase.storage
    .from("onboarding-assets")
    .upload(path, file);

  if (uploadError) return { error: uploadError.message };

  // Basic validation
  let validation_status: "ok" | "warn" | "err" = "ok";
  let validation_message: string | null = null;

  const unsupported = ["heic", "heif", "tiff"];
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
  if (unsupported.includes(ext)) {
    validation_status = "err";
    validation_message = `${ext.toUpperCase()} isn't supported. Convert to PNG, SVG, or JPG.`;
  } else if (file.size > 5 * 1024 * 1024 && file.type.startsWith("image/")) {
    validation_status = "warn";
    validation_message = "Large file — may slow down upload. Consider optimising.";
  }

  const category = formData.get("category") as string | null;

  const { data, error: dbError } = await supabase
    .from("onboarding_assets")
    .insert({
      session_id: sessionId,
      file_name: file.name,
      file_path: path,
      file_size: file.size,
      file_type: file.type,
      tags: category ? [category] : guessTagsFromName(file.name),
      validation_status,
      validation_message,
    })
    .select()
    .single();

  if (dbError) return { error: dbError.message };
  return { data };
}

export async function deleteAsset(assetId: string, filePath: string) {
  const supabase = await createClient();
  await supabase.storage.from("onboarding-assets").remove([filePath]);
  await supabase.from("onboarding_assets").delete().eq("id", assetId);
  return { error: null };
}

export async function getAssets(sessionId: string) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("onboarding_assets")
    .select("*")
    .eq("session_id", sessionId)
    .order("created_at", { ascending: false });
  return data ?? [];
}

export async function getAssetUrl(filePath: string) {
  const supabase = await createClient();
  const { data } = await supabase.storage
    .from("onboarding-assets")
    .createSignedUrl(filePath, 3600);
  return data?.signedUrl ?? null;
}

function guessTagsFromName(name: string): string[] {
  const n = name.toLowerCase();
  const tags: string[] = [];
  if (n.includes("logo")) tags.push("Brand", "Logo");
  else if (n.includes("brand") || n.includes("guide")) tags.push("Brand");
  if (n.includes("headshot") || n.includes("photo") || n.includes("portrait")) tags.push("People");
  if (n.includes("office") || n.includes("location")) tags.push("Locations");
  if (n.includes("ad") || n.includes("creative") || n.includes("meta") || n.includes("1x1")) tags.push("Ads");
  if (n.includes("content") || n.includes("review") || n.includes("testimonial")) tags.push("Content");
  if (tags.length === 0) tags.push("General");
  return tags;
}
