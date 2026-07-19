import type { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

/**
 * Auth route group layout.
 * Provides a centered, minimal shell for login/register pages.
 * No sidebar, no header — just the auth form.
 */
export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">{children}</div>
    </div>
  );
}
