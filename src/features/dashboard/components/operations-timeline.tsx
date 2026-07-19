"use client";

import { cn } from "@/lib/utils/cn";
import { AlertTriangle, Bell, Wrench, Info, CheckCircle2 } from "lucide-react";
import { formatRelativeDate } from "@/lib/utils/dates";
import type { TimelineEvent } from "@/lib/data/mock";

interface OperationsTimelineProps {
  events: TimelineEvent[];
}

const categoryConfig = {
  incident: { icon: AlertTriangle, color: "text-orange-500", ring: "bg-orange-500" },
  alert: { icon: Bell, color: "text-amber-500", ring: "bg-amber-500" },
  operational: { icon: Wrench, color: "text-blue-500", ring: "bg-blue-500" },
  system: { icon: Info, color: "text-zinc-400", ring: "bg-zinc-400" },
} as const;

const severityBadge = {
  critical: "bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20",
  high: "bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20",
  medium: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20",
  low: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20",
  info: "bg-secondary text-muted-foreground",
} as const;

function TimelineItem({ event, isLast }: { event: TimelineEvent; isLast: boolean }) {
  const cfg = categoryConfig[event.category];
  const Icon = cfg.icon;
  const badge = severityBadge[event.severity];

  return (
    <li className="relative flex gap-4">
      {/* Vertical line */}
      {!isLast && (
        <div className="absolute left-[15px] top-8 h-full w-px bg-border" aria-hidden="true" />
      )}

      {/* Icon node */}
      <div
        className={cn(
          "relative z-10 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border-2 border-background bg-secondary"
        )}
        aria-hidden="true"
      >
        <Icon className={cn("h-3.5 w-3.5", cfg.color)} />
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1 pb-6">
        <div className="flex flex-wrap items-start gap-2">
          <p className="flex-1 text-sm font-semibold leading-tight">{event.title}</p>
          <span
            className={cn("rounded-full px-2 py-0.5 text-[10px] font-semibold capitalize", badge)}
          >
            {event.severity}
          </span>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">{event.detail}</p>
        <div className="mt-1.5 flex items-center gap-3 text-xs text-muted-foreground/70">
          <time dateTime={event.timestamp.toISOString()}>
            {formatRelativeDate(event.timestamp)}
          </time>
          <span aria-hidden="true">·</span>
          <span>{event.actor}</span>
        </div>
      </div>
    </li>
  );
}

export function OperationsTimeline({ events }: OperationsTimelineProps) {
  const sorted = [...events].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

  return (
    <section aria-label="Operations Timeline">
      <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold">Operations Timeline</h2>
            <p className="text-xs text-muted-foreground">Real-time event log</p>
          </div>
          <span className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
            <span
              className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500"
              aria-hidden="true"
            />
            Live
          </span>
        </div>

        {sorted.length === 0 ? (
          <div className="flex flex-col items-center gap-2 py-8 text-center">
            <CheckCircle2 className="h-8 w-8 text-emerald-500" aria-hidden="true" />
            <p className="text-sm text-muted-foreground">No events — all systems nominal</p>
          </div>
        ) : (
          <ol aria-label="Event timeline">
            {sorted.map((event, idx) => (
              <TimelineItem key={event.id} event={event} isLast={idx === sorted.length - 1} />
            ))}
          </ol>
        )}
      </div>
    </section>
  );
}
