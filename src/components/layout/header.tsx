"use client";

import { useState } from "react";
import { Menu, Bell, Search, Moon, Sun, X } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils/cn";
import { useIsMounted } from "@/hooks/use-utils";
import { AppSidebar } from "./sidebar";

interface AppHeaderProps {
  /** Page title shown in the breadcrumb area */
  pageTitle?: string;
  unreadAlerts?: number;
}

export function AppHeader({ pageTitle, unreadAlerts = 0 }: AppHeaderProps) {
  const { theme, setTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMounted = useIsMounted();

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  return (
    <>
      <header
        className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-border bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60"
        role="banner"
      >
        {/* Mobile menu toggle */}
        <button
          type="button"
          className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring lg:hidden"
          onClick={() => setMobileMenuOpen((v) => !v)}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-sidebar"
          aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
        >
          {mobileMenuOpen ? (
            <X className="h-4 w-4" aria-hidden="true" />
          ) : (
            <Menu className="h-4 w-4" aria-hidden="true" />
          )}
        </button>

        {/* Page title / breadcrumb */}
        <div className="flex flex-1 items-center gap-2 min-w-0">
          {pageTitle && <h1 className="truncate text-sm font-semibold">{pageTitle}</h1>}
        </div>

        {/* Command bar: Search + Actions */}
        <div className="flex items-center gap-1.5" role="toolbar" aria-label="Top bar actions">
          {/* Search trigger */}
          <button
            type="button"
            className="hidden items-center gap-2 rounded-lg border border-border bg-secondary/50 px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:flex"
            aria-label="Search (Ctrl+K)"
          >
            <Search className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Search…</span>
            <kbd
              className="rounded border border-border bg-background px-1 py-0.5 text-[10px] font-mono text-muted-foreground/60"
              aria-hidden="true"
            >
              ⌘K
            </kbd>
          </button>

          {/* Mobile search */}
          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:hidden"
            aria-label="Search"
          >
            <Search className="h-4 w-4" aria-hidden="true" />
          </button>

          {/* Alerts button */}
          <button
            type="button"
            className="relative flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label={`Notifications${unreadAlerts > 0 ? ` — ${unreadAlerts} unread` : ""}`}
          >
            <Bell className="h-4 w-4" aria-hidden="true" />
            {unreadAlerts > 0 && (
              <span
                className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white"
                aria-hidden="true"
              >
                {unreadAlerts}
              </span>
            )}
          </button>

          {/* Theme toggle */}
          {isMounted && (
            <button
              type="button"
              onClick={toggleTheme}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4" aria-hidden="true" />
              ) : (
                <Moon className="h-4 w-4" aria-hidden="true" />
              )}
            </button>
          )}

          {/* User avatar */}
          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            aria-label="User account menu"
          >
            OP
          </button>
        </div>
      </header>

      {/* Mobile sidebar overlay */}
      {mobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
          <div
            id="mobile-sidebar"
            className={cn(
              "fixed inset-y-0 left-0 z-50 w-60 shadow-2xl transition-transform duration-300 lg:hidden",
              mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
            )}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            <AppSidebar />
          </div>
        </>
      )}
    </>
  );
}
