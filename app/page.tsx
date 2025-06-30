// app/page.tsx
"use client";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { SectionCards } from "@/components/section-cards";
// import { ModeToggle } from "@/components/theme/ModeToggle";

export default function HomePage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading || !user) return null;

  return (
    <div className="@container/main flex flex-1 flex-col gap-2">
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <SectionCards />
        <div className="px-4 lg:px-6">{/* <ChartAreaInteractive /> */}</div>
        {/* <DataTable data={data} /> */}
      </div>
    </div>
  );
}
