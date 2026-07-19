"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { Toaster } from "sonner";
import { type ReactNode } from "react";
import { AuthProvider } from "./auth-provider";
import { QueryProvider } from "./query-provider";
import type { AuthSession } from "@/types";

interface ProvidersProps {
  children: ReactNode;
  initialSession?: AuthSession | null;
}

/**
 * Root provider composition — wraps the entire application.
 * Order matters: QueryProvider must be inside React tree, ThemeProvider outermost.
 *
 * Rendered once in the root layout.
 */
export function Providers({ children, initialSession }: ProvidersProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <QueryProvider>
        <AuthProvider initialSession={initialSession}>
          {children}
          <Toaster
            position="bottom-right"
            richColors
            closeButton
            expand={false}
            toastOptions={{
              duration: 4000,
              classNames: {
                toast:
                  "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
              },
            }}
          />
        </AuthProvider>
      </QueryProvider>
    </NextThemesProvider>
  );
}
