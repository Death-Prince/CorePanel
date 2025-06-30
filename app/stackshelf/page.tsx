// app/page.tsx

"use client";

import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { DataTable } from "@/components/data-table";
import { SiteHeader } from "@/components/site-header";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
// import { ModeToggle } from "@/components/theme/ModeToggle";

import data from "./data.json";

export default function StackShelf() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const pageName = "Stack Shelf";

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading || !user) return null;

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      {/* <AppSidebar/> */}
      <AppSidebar variant="inset" user={user} />
      <SidebarInset style={{ backgroundColor: "oklch(0.1448 0 0)" }}>
        <SiteHeader pageName={pageName} />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <DataTable data={data} />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
