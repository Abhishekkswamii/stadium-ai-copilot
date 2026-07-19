import { DoorOpen, DoorClosed, Lock, ArrowRight, Users } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import type { GateStatus } from "@/lib/data/mock";

interface GateStatusCardProps {
  gates: GateStatus[];
}

const gateStatusConfig = {
  open: { label: "Open", icon: DoorOpen, dotClass: "bg-emerald-500", rowClass: "" },
  closed: { label: "Closed", icon: DoorClosed, dotClass: "bg-zinc-400", rowClass: "opacity-60" },
  restricted: { label: "Restricted", icon: Lock, dotClass: "bg-amber-500", rowClass: "" },
} as const;

const queueConfig = {
  none: { label: "No queue", barWidth: "w-0", barClass: "bg-emerald-500" },
  short: { label: "Short", barWidth: "w-1/4", barClass: "bg-emerald-500" },
  medium: { label: "Medium", barWidth: "w-1/2", barClass: "bg-amber-500" },
  long: { label: "Long", barWidth: "w-full", barClass: "bg-red-500" },
} as const;

export function GateStatusCard({ gates }: GateStatusCardProps) {
  const openCount = gates.filter((g) => g.status === "open").length;
  const closedCount = gates.filter((g) => g.status === "closed").length;
  const restrictedCount = gates.filter((g) => g.status === "restricted").length;

  return (
    <article
      className="rounded-xl border border-border bg-card p-5 shadow-sm"
      aria-label="Gate Status"
    >
      {/* Header */}
      <div className="mb-4 flex items-start justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10">
            <DoorOpen className="h-4 w-4 text-emerald-500" aria-hidden="true" />
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Gate Status
            </p>
            <p className="text-xl font-bold">{openCount} Open</p>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-col gap-1 text-right">
          <span className="text-xs text-emerald-600 dark:text-emerald-400">{openCount} open</span>
          {restrictedCount > 0 && (
            <span className="text-xs text-amber-600 dark:text-amber-400">
              {restrictedCount} restricted
            </span>
          )}
          {closedCount > 0 && (
            <span className="text-xs text-muted-foreground">{closedCount} closed</span>
          )}
        </div>
      </div>

      {/* Gate list */}
      <ul className="space-y-3" aria-label="Gate details">
        {gates.map((gate) => {
          const cfg = gateStatusConfig[gate.status];
          const queue = queueConfig[gate.queueLength];
          const Icon = cfg.icon;

          return (
            <li
              key={gate.id}
              className={cn("flex items-center gap-3", cfg.rowClass)}
              aria-label={`${gate.name}: ${cfg.label}`}
            >
              <Icon className="h-4 w-4 flex-shrink-0 text-muted-foreground" aria-hidden="true" />

              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <span className="truncate text-xs font-medium">{gate.name}</span>
                  <span
                    className={cn(
                      "ml-2 flex-shrink-0 rounded-full px-1.5 py-0.5 text-[10px] font-semibold",
                      gate.status === "open" &&
                        "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
                      gate.status === "restricted" &&
                        "bg-amber-500/10 text-amber-600 dark:text-amber-400",
                      gate.status === "closed" && "bg-zinc-500/10 text-muted-foreground"
                    )}
                  >
                    {cfg.label}
                  </span>
                </div>

                {gate.status !== "closed" && (
                  <div className="mt-1 flex items-center gap-2">
                    {/* Queue bar */}
                    <div
                      className="h-1 flex-1 overflow-hidden rounded-full bg-secondary"
                      role="progressbar"
                      aria-label={`Queue: ${queue.label}`}
                    >
                      <div
                        className={cn(
                          "h-full rounded-full transition-all",
                          queue.barWidth,
                          queue.barClass
                        )}
                      />
                    </div>
                    {gate.throughput > 0 && (
                      <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                        <ArrowRight className="h-2.5 w-2.5" aria-hidden="true" />
                        <Users className="h-2.5 w-2.5" aria-hidden="true" />
                        {gate.throughput}/min
                      </span>
                    )}
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </article>
  );
}
