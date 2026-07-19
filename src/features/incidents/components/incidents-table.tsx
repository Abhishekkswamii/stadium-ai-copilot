import { formatRelativeDate } from "@/lib/utils/dates";
import { cn } from "@/lib/utils/cn";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import type { Incident } from "@/types";
import { Activity, Clock, CheckCircle2, FileText } from "lucide-react";

interface IncidentsTableProps {
  incidents: Incident[];
  isLoading: boolean;
  onRowClick: (incident: Incident) => void;
}

const severityConfig = {
  critical: "bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20",
  high: "bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20",
  medium: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20",
  low: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20",
} as const;

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

export function IncidentsTable({ incidents, isLoading, onRowClick }: IncidentsTableProps) {
  if (isLoading) {
    return (
      <div className="w-full">
        <div className="border-b px-4 py-3">
          <Skeleton className="h-5 w-1/4" />
        </div>
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex items-center gap-4 border-b px-4 py-4">
            <Skeleton className="h-8 w-8 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-6 w-24 rounded-full" />
          </div>
        ))}
      </div>
    );
  }

  if (incidents.length === 0) {
    return (
      <div className="flex h-64 flex-col items-center justify-center text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary">
          <FileText className="h-6 w-6 text-muted-foreground" />
        </div>
        <h3 className="mt-4 font-semibold text-foreground">No incidents found</h3>
        <p className="mt-1 text-sm text-muted-foreground">Try adjusting your search or filters.</p>
      </div>
    );
  }

  return (
    <div className="relative w-full overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[300px]">Incident</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Severity</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Time</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {incidents.map((incident) => {
            const StatusIcon = statusIcon[incident.status];
            const badgeClass = severityConfig[incident.severity];

            return (
              <TableRow
                key={incident.id}
                onClick={() => onRowClick(incident)}
                className="cursor-pointer transition-colors hover:bg-secondary/50"
              >
                <TableCell>
                  <p className="truncate font-semibold text-foreground">{incident.title}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {incident.assignedTo || "Unassigned"}
                  </p>
                </TableCell>
                <TableCell>
                  <span className="inline-block truncate max-w-[150px] text-sm text-muted-foreground">
                    {incident.location.section}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="capitalize text-sm">{incident.category}</span>
                </TableCell>
                <TableCell>
                  <span
                    className={cn(
                      "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold capitalize",
                      badgeClass
                    )}
                  >
                    {incident.severity}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1.5">
                    <StatusIcon className={cn("h-4 w-4", statusClass[incident.status])} />
                    <span className="text-sm capitalize">{incident.status.replace("_", " ")}</span>
                  </div>
                </TableCell>
                <TableCell className="text-right text-sm text-muted-foreground whitespace-nowrap">
                  {formatRelativeDate(incident.createdAt)}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
