"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { auth, provider } from "@/lib/firebase";
import {
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

const allowedEmails = ["nagaljohnllenard@gmail.com", "bondoymonica@gmail.com"];

export default function LoginPage() {
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams(); 
  const unauthorized = searchParams.get("unauthorized") === "true";

  useEffect(() => {
    setMounted(true);

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user && allowedEmails.includes(user.email ?? "")) {
        router.push("/");
      } else if (user) {
        await signOut(auth);
        router.push("/login?unauthorized=true");
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      if (allowedEmails.includes(user.email ?? "")) {
        router.push("/");
      } else {
        await signOut(auth);
        router.push("/login?unauthorized=true");
      }
    } catch (error: unknown) {
      console.error("Login Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!mounted) return null;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-background p-4">
      <Card className="w-full max-w-sm shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-center flex flex-col items-center gap-2">
            <Image src="/favico.svg" alt="CorePanel Logo" width={48} height={48} className="mx-auto" />
            Welcome to CorePanel
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-4">
          <Button onClick={handleLogin} className="w-full">
            {isLoading ? "Signing in..." : "Sign in with Google"}
          </Button>

          {unauthorized && (
            <p className="text-red-500 text-sm text-center">
              Unauthorized user. Access denied.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
