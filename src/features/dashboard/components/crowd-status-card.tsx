"use client";

import { Users, TrendingUp, AlertTriangle, Activity } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import type { SectionCrowdStatus } from "@/lib/data/mock";

interface CrowdStatusCardProps {
  sections: SectionCrowdStatus[];
  totalCapacity: number;
  totalCurrent: number;
}

const statusConfig = {
  normal: {
    label: "Normal",
    color: "bg-emerald-500",
    textColor: "text-emerald-600 dark:text-emerald-400",
  },
  busy: { label: "Busy", color: "bg-amber-500", textColor: "text-amber-600 dark:text-amber-400" },
  full: {
    label: "Full",
    color: "bg-orange-500",
    textColor: "text-orange-600 dark:text-orange-400",
  },
  critical: { label: "Critical", color: "bg-red-500", textColor: "text-red-600 dark:text-red-400" },
} as const;

export function CrowdStatusCard({ sections, totalCapacity, totalCurrent }: CrowdStatusCardProps) {
  const occupancyPct = totalCapacity > 0 ? Math.round((totalCurrent / totalCapacity) * 100) : 0;
  const criticalSections = sections.filter((s) => s.status === "critical").length;

  return (
    <article
      className="rounded-xl border border-border bg-card p-5 shadow-sm"
      aria-label="Crowd Status"
    >
      {/* Header */}
      <div className="mb-4 flex items-start justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10">
            <Users className="h-4 w-4 text-blue-500" aria-hidden="true" />
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Crowd Status
            </p>
            <p className="text-xl font-bold tabular-nums">
              {totalCurrent.toLocaleString()}
              <span className="ml-1 text-sm font-normal text-muted-foreground">
                / {totalCapacity.toLocaleString()}
              </span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 rounded-full bg-secondary px-2.5 py-1">
          <TrendingUp className="h-3 w-3 text-muted-foreground" aria-hidden="true" />
          <span className="text-xs font-semibold tabular-nums">{occupancyPct}%</span>
        </div>
      </div>

      {/* Overall bar */}
      <div className="mb-4">
        <div
          className="h-2 w-full overflow-hidden rounded-full bg-secondary"
          role="progressbar"
          aria-valuenow={occupancyPct}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Overall occupancy ${occupancyPct}%`}
        >
          <div
            className={cn(
              "h-full rounded-full transition-all duration-500",
              occupancyPct >= 95
                ? "bg-red-500"
                : occupancyPct >= 85
                  ? "bg-orange-500"
                  : occupancyPct >= 70
                    ? "bg-amber-500"
                    : "bg-emerald-500"
            )}
            style={{ width: `${occupancyPct}%` }}
          />
        </div>
      </div>

      {/* Sections */}
      <ul className="space-y-2" aria-label="Section breakdown">
        {sections.slice(0, 4).map((section) => {
          const cfg = statusConfig[section.status];
          const pct = section.capacity > 0 ? Math.round((section.current / section.capacity) * 100) : 0;
          return (
            <li key={section.sectionId} className="flex items-center gap-3">
              <div
                className={cn("h-2 w-2 flex-shrink-0 rounded-full", cfg.color)}
                aria-hidden="true"
              />
              <span className="min-w-0 flex-1 truncate text-xs text-muted-foreground">
                {section.sectionName}
              </span>
              <span className={cn("text-xs font-semibold tabular-nums", cfg.textColor)}>
                {pct}%
              </span>
            </li>
          );
        })}
      </ul>

      {criticalSections > 0 && (
        <div
          className="mt-4 flex items-center gap-2 rounded-lg bg-red-500/10 px-3 py-2"
          role="alert"
          aria-live="polite"
        >
          <AlertTriangle className="h-3.5 w-3.5 flex-shrink-0 text-red-500" aria-hidden="true" />
          <span className="text-xs font-medium text-red-600 dark:text-red-400">
            {criticalSections} section{criticalSections > 1 ? "s" : ""} at critical density
          </span>
        </div>
      )}

      <div className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
        <Activity className="h-3 w-3" aria-hidden="true" />
        <span>Live — updates every 30s</span>
      </div>
    </article>
  );
}
