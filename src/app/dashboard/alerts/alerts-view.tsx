"use client";

import { useState } from "react";
import { useStadiumAlerts } from "@/hooks/use-firestore";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, AlertTriangle, Bell, Info, Search } from "lucide-react";
import { ClientDate } from "@/components/common/client-date";
import type { Alert, IncidentSeverity } from "@/types";

const ALERT_ICONS: Record<IncidentSeverity, typeof AlertCircle> = {
  critical: AlertCircle,
  high: AlertTriangle,
  medium: AlertTriangle,
  low: Info,
};

const SEVERITY_COLORS: Record<IncidentSeverity, "destructive" | "default" | "secondary"> = {
  critical: "destructive",
  high: "destructive",
  medium: "default",
  low: "secondary",
};

export function AlertsView() {
  const { data: alerts, isLoading, error } = useStadiumAlerts("northgate-arena");
  const [searchQuery, setSearchQuery] = useState("");
  const [severityFilter, setSeverityFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-5 w-64" />
              <Skeleton className="h-4 w-96" />
            </CardHeader>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Card className="border-destructive">
        <CardHeader>
          <CardTitle className="text-destructive">Error Loading Alerts</CardTitle>
          <CardDescription>{error.message}</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  if (!alerts || alerts.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>No Alerts</CardTitle>
          <CardDescription>All systems operating normally.</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const filteredAlerts = alerts.filter((alert) => {
    const matchesSearch =
      alert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.message.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSeverity = severityFilter === "all" || alert.severity === severityFilter;
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "read" && alert.isRead) ||
      (statusFilter === "unread" && !alert.isRead);
    return matchesSearch && matchesSeverity && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search alerts..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={severityFilter} onValueChange={setSeverityFilter}>
          <SelectTrigger className="w-full sm:w-[160px]">
            <SelectValue placeholder="Severity" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Severities</SelectItem>
            <SelectItem value="critical">Critical</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="low">Low</SelectItem>
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[160px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="read">Read</SelectItem>
            <SelectItem value="unread">Unread</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Alert Count */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Bell className="h-4 w-4" />
        <span>
          Showing {filteredAlerts.length} of {alerts.length} alerts
        </span>
      </div>

      {/* Alerts List */}
      <div className="space-y-3">
        {filteredAlerts.map((alert) => (
          <AlertCard key={alert.id} alert={alert} />
        ))}
        {filteredAlerts.length === 0 && (
          <Card>
            <CardContent className="flex min-h-[200px] items-center justify-center">
              <p className="text-muted-foreground">No alerts match your filters.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

function AlertCard({ alert }: { alert: Alert }) {
  const Icon = ALERT_ICONS[alert.severity];

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <div
              className={`mt-0.5 ${
                alert.severity === "critical" || alert.severity === "high"
                  ? "text-destructive"
                  : alert.severity === "medium"
                    ? "text-yellow-500"
                    : "text-blue-500"
              }`}
            >
              <Icon className="h-5 w-5" />
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <CardTitle className="text-base">{alert.title}</CardTitle>
                {!alert.isRead && (
                  <Badge variant="outline" className="h-5 px-1.5 text-xs">
                    New
                  </Badge>
                )}
              </div>
              <CardDescription className="text-sm">{alert.message}</CardDescription>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="capitalize">{alert.type.replace("_", " ")}</span>
                <span>•</span>
                <span className="capitalize">{alert.createdBy}</span>
                <span>•</span>
                {alert.createdAt instanceof Date ? (
                  <ClientDate date={alert.createdAt} />
                ) : (
                  <span>Just now</span>
                )}
              </div>
            </div>
          </div>
          <Badge variant={SEVERITY_COLORS[alert.severity]} className="capitalize">
            {alert.severity}
          </Badge>
        </div>
      </CardHeader>
    </Card>
  );
}
