import { Suspense } from "react";
import LoginClient from "./LoginClient";

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="p-4 text-center">Loading...</div>}>
      <LoginClient />
    </Suspense>
  );
}
