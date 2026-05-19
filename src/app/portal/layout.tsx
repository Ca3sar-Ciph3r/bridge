import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getPortalClient } from "@/lib/actions/portal";
import { PortalNav } from "@/components/portal/PortalNav";

export default async function PortalLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/");

  const client = await getPortalClient();

  return (
    <div style={{ display: "flex", minHeight: "100dvh", background: "var(--bg)" }}>
      <PortalNav clientName={client?.name} companyName={client?.company_name} />
      <main style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, overflowY: "auto" }}>
        {children}
      </main>
    </div>
  );
}
