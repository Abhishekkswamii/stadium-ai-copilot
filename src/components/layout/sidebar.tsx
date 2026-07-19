"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  AlertTriangle,
  Bell,
  Calendar,
  Building2,
  Settings,
  LogOut,
  Bot,
  ChevronRight,
  Activity,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { ROUTES, APP_NAME } from "@/constants";

interface NavItem {
  href: string;
  label: string;
  icon: React.ElementType;
  badge?: number;
}

const PRIMARY_NAV: NavItem[] = [
  { href: ROUTES.DASHBOARD, label: "Overview", icon: LayoutDashboard },
  { href: ROUTES.SIMULATOR, label: "Simulator", icon: Activity },
  { href: ROUTES.INCIDENTS, label: "Incidents", icon: AlertTriangle, badge: 2 },
  { href: ROUTES.ALERTS, label: "Alerts", icon: Bell, badge: 2 },
  { href: ROUTES.MATCHES, label: "Matches", icon: Calendar },
  { href: ROUTES.STADIUMS, label: "Stadiums", icon: Building2 },
];

interface SidebarNavLinkProps {
  item: NavItem;
  isActive: boolean;
}

function SidebarNavLink({ item, isActive }: SidebarNavLinkProps) {
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-150",
        isActive
          ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm"
          : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
      )}
    >
      <Icon
        className={cn(
          "h-4 w-4 flex-shrink-0 transition-transform duration-150 group-hover:scale-110",
          isActive ? "opacity-100" : "opacity-70 group-hover:opacity-100"
        )}
        aria-hidden="true"
      />
      <span className="flex-1 truncate">{item.label}</span>
      {item.badge !== undefined && item.badge > 0 && (
        <span
          className={cn(
            "flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[10px] font-bold tabular-nums",
            isActive
              ? "bg-sidebar-primary-foreground/20 text-sidebar-primary-foreground"
              : "bg-red-500 text-white"
          )}
          aria-label={`${item.badge} unread`}
        >
          {item.badge}
        </span>
      )}
    </Link>
  );
}

interface AppSidebarProps {
  className?: string;
}

export function AppSidebar({ className }: AppSidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={cn("flex h-screen w-60 flex-col bg-sidebar", className)}
      role="navigation"
      aria-label="Main navigation"
    >
      {/* Logo */}
      <div className="flex h-14 flex-shrink-0 items-center gap-2.5 border-b border-sidebar-border px-4">
        <div
          className="flex h-7 w-7 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground"
          aria-hidden="true"
        >
          <Bot className="h-4 w-4" />
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-sidebar-foreground">{APP_NAME}</p>
          <p className="text-[10px] text-sidebar-foreground/50">Operations Centre</p>
        </div>
      </div>

      {/* Stadium info */}
      <div className="flex-shrink-0 px-3 py-3">
        <button
          className="flex w-full items-center gap-2.5 rounded-lg bg-sidebar-accent px-3 py-2 text-left transition-colors hover:bg-sidebar-accent/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring"
          aria-label="Current stadium: Northgate Arena"
        >
          <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded bg-blue-500/20">
            <Building2 className="h-3.5 w-3.5 text-blue-500" aria-hidden="true" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-semibold text-sidebar-foreground">
              Northgate Arena
            </p>
            <p className="text-[10px] text-sidebar-foreground/60">Manchester, UK</p>
          </div>
          <ChevronRight
            className="h-3.5 w-3.5 flex-shrink-0 text-sidebar-foreground/40"
            aria-hidden="true"
          />
        </button>
      </div>

      {/* Section label */}
      <div className="px-4 pb-1 pt-0">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-sidebar-foreground/40">
          Operations
        </p>
      </div>

      {/* Nav items */}
      <nav className="flex-1 overflow-y-auto px-3 pb-2">
        <ul role="list" className="space-y-0.5">
          {PRIMARY_NAV.map((item) => (
            <li key={item.href}>
              <SidebarNavLink
                item={item}
                isActive={
                  item.href === ROUTES.DASHBOARD
                    ? pathname === item.href
                    : pathname.startsWith(item.href)
                }
              />
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="flex-shrink-0 border-t border-sidebar-border p-3 space-y-0.5">
        <Link
          href={ROUTES.SETTINGS}
          aria-current={pathname.startsWith(ROUTES.SETTINGS) ? "page" : undefined}
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-sidebar-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring"
        >
          <Settings className="h-4 w-4 opacity-70" aria-hidden="true" />
          Settings
        </Link>

        <button
          type="button"
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-sidebar-foreground transition-colors hover:bg-red-500/10 hover:text-red-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring"
          aria-label="Sign out"
        >
          <LogOut className="h-4 w-4 opacity-70" aria-hidden="true" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
