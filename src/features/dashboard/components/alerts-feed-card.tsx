import {
  Bell,
  ShieldAlert,
  Stethoscope,
  Wrench,
  CloudRain,
  AlertTriangle,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils/cn";
import { ROUTES } from "@/constants";
import type { Alert } from "@/types";
import type { AlertType } from "@/constants";
import { formatRelativeDate } from "@/lib/utils/dates";

interface AlertsFeedCardProps {
  alerts: Alert[];
}

const alertTypeIcon: Record<AlertType, React.ElementType> = {
  safety: AlertTriangle,
  security: ShieldAlert,
  medical: Stethoscope,
  operational: Wrench,
  weather: CloudRain,
};

const severityStyle = {
  critical: "border-l-red-500 bg-red-500/5",
  high: "border-l-orange-500 bg-orange-500/5",
  medium: "border-l-amber-500 bg-amber-500/5",
  low: "border-l-blue-500 bg-blue-500/5",
} as const;

const severityDot = {
  critical: "bg-red-500",
  high: "bg-orange-500",
  medium: "bg-amber-500",
  low: "bg-blue-500",
} as const;

export function AlertsFeedCard({ alerts }: AlertsFeedCardProps) {
  const unread = alerts.filter((a) => !a.isRead).length;
  const sorted = [...alerts].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

  return (
    <article
      className="rounded-xl border border-border bg-card p-5 shadow-sm"
      aria-label="Active Alerts"
    >
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10">
            <Bell className="h-4 w-4 text-amber-500" aria-hidden="true" />
            {unread > 0 && (
              <span
                className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white"
                aria-label={`${unread} unread alerts`}
              >
                {unread}
              </span>
            )}
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Active Alerts
            </p>
            <p className="text-xl font-bold">{alerts.length}</p>
          </div>
        </div>
        <Link
          href={ROUTES.ALERTS}
          className="flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="View all alerts"
        >
          View all
          <ChevronRight className="h-3 w-3" aria-hidden="true" />
        </Link>
      </div>

      {/* Alert list */}
      <ul className="space-y-2" aria-label="Alert list">
        {sorted.slice(0, 4).map((alert) => {
          const Icon = alertTypeIcon[alert.type];
          return (
            <li
              key={alert.id}
              className={cn(
                "relative rounded-lg border-l-2 p-3 transition-colors",
                severityStyle[alert.severity],
                !alert.isRead && "ring-1 ring-border"
              )}
            >
              <div className="flex items-start gap-2.5">
                <Icon
                  className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-muted-foreground"
                  aria-hidden="true"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="truncate text-xs font-semibold">{alert.title}</p>
                    {!alert.isRead && (
                      <span
                        className={cn(
                          "h-1.5 w-1.5 flex-shrink-0 rounded-full",
                          severityDot[alert.severity]
                        )}
                        aria-label="Unread"
                      />
                    )}
                  </div>
                  <p className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">
                    {alert.message}
                  </p>
                  <p className="mt-1 text-[10px] text-muted-foreground/60">
                    {formatRelativeDate(alert.createdAt)}
                  </p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </article>
  );
}
