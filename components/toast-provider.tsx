"use client";

import { Toaster } from "sonner";
import { useTheme } from "next-themes";

export function ToastProvider() {
  const { theme } = useTheme();

  return (
    <Toaster
      theme={theme === "system" ? "system" : (theme as "light" | "dark")}
      toastOptions={{
        className:
          "rounded-md border shadow-sm bg-white text-black dark:bg-zinc-900 dark:text-white",
      }}
    />
  );
}
