import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { adminAuth } from "@/lib/firebase/admin";
import { ROUTES, SESSION_COOKIE_NAME } from "@/constants";
import { AppSidebar } from "@/components/layout/sidebar";
import { AppHeader } from "@/components/layout/header";

interface DashboardLayoutProps {
  children: ReactNode;
}

/**
 * Dashboard layout — server-side auth guard + full app shell.
 *
 * Server Component: auth check happens before any HTML is sent to the browser.
 * Sidebar and header are rendered server-side; interactive parts (theme toggle,
 * mobile menu) are Client Components nested within.
 */
export default async function DashboardLayout({ children }: DashboardLayoutProps) {
  // ── Server-side session verification ──────────────────────────────────────
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (!sessionCookie) {
    redirect(ROUTES.LOGIN);
  }

  try {
    await adminAuth.verifySessionCookie(sessionCookie, true);
  } catch {
    redirect(ROUTES.LOGIN);
  }

  // ── App Shell ──────────────────────────────────────────────────────────────
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Desktop sidebar — hidden on mobile, shown lg+ */}
      <div className="hidden border-r border-sidebar-border lg:flex lg:flex-shrink-0">
        <AppSidebar />
      </div>

      {/* Main content area */}
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        {/* Top command bar */}
        <AppHeader unreadAlerts={2} />

        {/* Page content */}
        <main id="main-content" className="flex-1 overflow-y-auto" aria-label="Main content">
          {children}
        </main>
      </div>
    </div>
  );
}
