import { Zap, Clock, Users, Trophy } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import type { Match, MatchStatus } from "@/types";

interface ActiveMatchCardProps {
  match: Match;
  currentAttendance: number;
}

const statusConfig: Record<MatchStatus, { label: string; dotClass: string; badgeClass: string }> = {
  live: {
    label: "LIVE",
    dotClass: "bg-red-500 animate-pulse",
    badgeClass: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20",
  },
  scheduled: {
    label: "Scheduled",
    dotClass: "bg-blue-500",
    badgeClass: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  },
  completed: {
    label: "Completed",
    dotClass: "bg-emerald-500",
    badgeClass: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  },
  postponed: {
    label: "Postponed",
    dotClass: "bg-amber-500",
    badgeClass: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  },
  cancelled: {
    label: "Cancelled",
    dotClass: "bg-zinc-400",
    badgeClass: "bg-zinc-500/10 text-zinc-500 border-zinc-500/20",
  },
};

function formatKickoffTime(date: Date): string {
  return date.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
}

export function ActiveMatchCard({ match, currentAttendance }: ActiveMatchCardProps) {
  const cfg = statusConfig[match.status];
  const fillPct = Math.round((currentAttendance / match.expectedAttendance) * 100);

  return (
    <article
      className="rounded-xl border border-border bg-card p-5 shadow-sm"
      aria-label={`Match: ${match.title}`}
    >
      {/* Header */}
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-500/10">
            <Trophy className="h-4 w-4 text-violet-500" aria-hidden="true" />
          </div>
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Active Match
          </p>
        </div>

        {/* Status badge */}
        <span
          className={cn(
            "flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold",
            cfg.badgeClass
          )}
          aria-label={`Match status: ${cfg.label}`}
        >
          <span className={cn("h-1.5 w-1.5 rounded-full", cfg.dotClass)} aria-hidden="true" />
          {cfg.label}
        </span>
      </div>

      {/* Teams */}
      <div className="mb-4">
        <h2 className="text-lg font-bold leading-tight">{match.homeTeam}</h2>
        <p className="text-sm text-muted-foreground">
          vs <span className="font-medium text-foreground">{match.awayTeam ?? "TBD"}</span>
        </p>
        <p className="mt-0.5 text-xs text-muted-foreground">{match.title}</p>
      </div>

      {/* Meta */}
      <div className="mb-4 grid grid-cols-2 gap-3">
        <div className="rounded-lg bg-secondary p-2.5">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" aria-hidden="true" />
            <span>Kick-off</span>
          </div>
          <p className="mt-0.5 text-sm font-semibold tabular-nums">
            {formatKickoffTime(match.scheduledAt)}
          </p>
        </div>
        <div className="rounded-lg bg-secondary p-2.5">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Zap className="h-3 w-3" aria-hidden="true" />
            <span>Sport</span>
          </div>
          <p className="mt-0.5 text-sm font-semibold">{match.sport}</p>
        </div>
      </div>

      {/* Attendance */}
      <div>
        <div className="mb-1.5 flex items-center justify-between text-xs">
          <span className="flex items-center gap-1 text-muted-foreground">
            <Users className="h-3 w-3" aria-hidden="true" />
            Attendance
          </span>
          <span className="font-semibold tabular-nums">
            {currentAttendance.toLocaleString()} / {match.expectedAttendance.toLocaleString()}
          </span>
        </div>
        <div
          className="h-1.5 w-full overflow-hidden rounded-full bg-secondary"
          role="progressbar"
          aria-valuenow={fillPct}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Attendance ${fillPct}% of expected`}
        >
          <div
            className="h-full rounded-full bg-violet-500 transition-all duration-500"
            style={{ width: `${Math.min(fillPct, 100)}%` }}
          />
        </div>
      </div>
    </article>
  );
}
