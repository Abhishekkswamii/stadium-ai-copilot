import { AlertTriangle, Activity, CheckCircle2, Clock, ChevronRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils/cn";
import { ROUTES } from "@/constants";
import type { Incident } from "@/types";
import type { IncidentSeverity } from "@/constants";
import { formatRelativeDate } from "@/lib/utils/dates";

interface IncidentsSummaryCardProps {
  incidents: Incident[];
}

const severityConfig: Record<
  IncidentSeverity,
  { label: string; barClass: string; badgeClass: string }
> = {
  low: {
    label: "Low",
    barClass: "bg-blue-500",
    badgeClass: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  },
  medium: {
    label: "Medium",
    barClass: "bg-amber-500",
    badgeClass: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  },
  high: {
    label: "High",
    barClass: "bg-orange-500",
    badgeClass: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
  },
  critical: {
    label: "Critical",
    barClass: "bg-red-500",
    badgeClass: "bg-red-500/10 text-red-600 dark:text-red-400",
  },
};

const statusIcon = {
  open: Activity,
  in_progress: Clock,
  resolved: CheckCircle2,
  closed: CheckCircle2,
} as const;

const statusClass = {
  open: "text-red-500",
  in_progress: "text-amber-500",
  resolved: "text-emerald-500",
  closed: "text-zinc-400",
} as const;

export function IncidentsSummaryCard({ incidents }: IncidentsSummaryCardProps) {
  const open = incidents.filter((i) => i.status === "open").length;
  const inProgress = incidents.filter((i) => i.status === "in_progress").length;
  const critical = incidents.filter((i) => i.severity === "critical").length;

  const active = incidents
    .filter((i) => i.status !== "resolved" && i.status !== "closed")
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

  return (
    <article
      className="rounded-xl border border-border bg-card p-5 shadow-sm"
      aria-label="Incidents Summary"
    >
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-lg",
              critical > 0 ? "bg-red-500/10" : "bg-orange-500/10"
            )}
          >
            <AlertTriangle
              className={cn("h-4 w-4", critical > 0 ? "text-red-500" : "text-orange-500")}
              aria-hidden="true"
            />
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Incidents
            </p>
            <p className="text-xl font-bold">{open + inProgress} Active</p>
          </div>
        </div>
        <Link
          href={ROUTES.INCIDENTS}
          className="flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="View all incidents"
        >
          View all
          <ChevronRight className="h-3 w-3" aria-hidden="true" />
        </Link>
      </div>

      {/* Counts */}
      <div className="mb-4 grid grid-cols-3 gap-2">
        {[
          { label: "Open", value: open, className: "text-red-600 dark:text-red-400" },
          {
            label: "In Progress",
            value: inProgress,
            className: "text-amber-600 dark:text-amber-400",
          },
          { label: "Critical", value: critical, className: "text-red-600 dark:text-red-400" },
        ].map(({ label, value, className }) => (
          <div key={label} className="rounded-lg bg-secondary p-2.5 text-center">
            <p className={cn("text-lg font-bold tabular-nums", className)}>{value}</p>
            <p className="text-[10px] text-muted-foreground">{label}</p>
          </div>
        ))}
      </div>

      {/* Active incidents list */}
      {active.length > 0 ? (
        <ul className="space-y-2" aria-label="Active incidents">
          {active.slice(0, 3).map((inc) => {
            const sev = severityConfig[inc.severity];
            const StatusIcon = statusIcon[inc.status];

            return (
              <li
                key={inc.id}
                className="flex items-start gap-2.5 rounded-lg border border-border p-2.5 transition-colors hover:bg-secondary"
              >
                <div
                  className={cn("mt-0.5 h-1.5 w-1.5 flex-shrink-0 rounded-full", sev.barClass)}
                  aria-hidden="true"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-semibold">{inc.title}</p>
                  <p className="mt-0.5 truncate text-[10px] text-muted-foreground">
                    {inc.location.section} · {formatRelativeDate(inc.createdAt)}
                  </p>
                </div>
                <div className="flex items-center gap-1.5">
                  <span
                    className={cn(
                      "rounded-full px-1.5 py-0.5 text-[10px] font-semibold",
                      sev.badgeClass
                    )}
                  >
                    {sev.label}
                  </span>
                  <StatusIcon
                    className={cn("h-3.5 w-3.5 flex-shrink-0", statusClass[inc.status])}
                    aria-label={inc.status.replace("_", " ")}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="flex items-center gap-2 rounded-lg bg-emerald-500/10 px-3 py-2.5">
          <CheckCircle2 className="h-4 w-4 text-emerald-500" aria-hidden="true" />
          <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
            No active incidents
          </span>
        </div>
      )}
    </article>
  );
}
