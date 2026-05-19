import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AgencyNav } from "@/components/agency/AgencyNav";

export default async function AgencyLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user || user.email !== process.env.AGENCY_ADMIN_EMAIL) redirect("/");

  return (
    <div style={{ display: "flex", minHeight: "100dvh", background: "var(--bg)" }}>
      <AgencyNav />
      <main style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, overflowY: "auto" }}>
        {children}
      </main>
    </div>
  );
}
