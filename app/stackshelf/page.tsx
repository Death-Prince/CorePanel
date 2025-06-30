// app/stackshelf/page.tsx

"use client";

import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { DataTable } from "@/components/data-table";
// import { ModeToggle } from "@/components/theme/ModeToggle";

export default function StackShelf() {
  const router = useRouter();
  const { user, loading } = useAuth();

  const [data, setData] = useState<any[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/stackshelf");
        const json = await res.json();

        if (json.success) {
          setData(json.data);
        } else {
          console.error("API error:", json.error);
        }
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoadingData(false);
      }
    };

    fetchData();
  }, []);

  if (loading || !user) return null;

  return (
    <div className="@container/main flex flex-1 flex-col gap-2">
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <DataTable data={data} />
      </div>
    </div>
  );
}
