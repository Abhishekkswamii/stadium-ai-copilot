"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, type ReactNode } from "react";

interface QueryProviderProps {
  children: ReactNode;
}

/**
 * TanStack Query client provider.
 * Creates the QueryClient once per component mount (not module-level)
 * to prevent shared state between requests in SSR.
 */
export function QueryProvider({ children }: QueryProviderProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Prevent refetch on window focus in production (aggressive for dashboards)
            refetchOnWindowFocus: process.env["NODE_ENV"] === "development",
            // Stale time: 30 seconds (stadium ops data changes frequently)
            staleTime: 30 * 1000,
            // Cache time: 5 minutes
            gcTime: 5 * 60 * 1000,
            retry: 2,
          },
          mutations: {
            retry: 0,
          },
        },
      })
  );

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
