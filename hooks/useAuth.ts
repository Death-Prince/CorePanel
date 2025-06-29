// hooks/useAuth.ts
"use client";

import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function useAuth() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true); // important!

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user ?? null);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { user, loading };
}
