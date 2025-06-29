// app/login/page.tsx
"use client";

import { auth, provider } from "@/lib/firebase";
import { signInWithPopup } from "firebase/auth";
import { useState } from "react";
import { GoogleAuthProvider } from "firebase/auth";

export default function LoginPage() {
  const [user, setUser] = useState<any>(null);

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      const user = result.user;
      setUser(user);
      console.log("User Info:", user);
    } catch (error: any) {
      console.error("Login Error:", error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center space-y-6">
        <h1 className="text-3xl font-bold">Welcome to CorePanel</h1>
        <button onClick={handleLogin} className="w-60">
          Sign in with Google
        </button>

        {user && (
          <div className="mt-4">
            <p>Welcome, {user.displayName}</p>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
        )}
      </div>
    </div>
  );
}
