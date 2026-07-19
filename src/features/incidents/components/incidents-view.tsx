"use client";

import { useState, useMemo } from "react";
import { useIncidents } from "@/hooks/use-firestore";
import { IncidentsTable } from "./incidents-table";
import { CreateIncidentDialog } from "./create-incident-dialog";
import { IncidentDrawer } from "./incident-drawer";
import { PageHeader } from "@/components/layout/page-shell";
import { Input } from "@/components/ui/input";
import { Search, AlertCircle, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { INCIDENT_STATUS, INCIDENT_SEVERITY } from "@/constants";
import type { Incident } from "@/types";

export function IncidentsView({ stadiumId }: { stadiumId: string }) {
  const { data: incidents, isLoading, error } = useIncidents(stadiumId);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [severityFilter, setSeverityFilter] = useState<string>("all");

  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  // Filter incidents locally for immediate response
  const filteredIncidents = useMemo(() => {
    if (!incidents) return [];

    return incidents.filter((incident) => {
      const matchesSearch =
        search === "" ||
        incident.title.toLowerCase().includes(search.toLowerCase()) ||
        incident.description.toLowerCase().includes(search.toLowerCase()) ||
        incident.location.section.toLowerCase().includes(search.toLowerCase());

      const matchesStatus = statusFilter === "all" || incident.status === statusFilter;

      const matchesSeverity = severityFilter === "all" || incident.severity === severityFilter;

      return matchesSearch && matchesStatus && matchesSeverity;
    });
  }, [incidents, search, statusFilter, severityFilter]);

  if (error) {
    return (
      <div className="flex h-full flex-col items-center justify-center py-20 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10">
          <AlertCircle className="h-6 w-6 text-red-500" />
        </div>
        <h2 className="mt-4 text-lg font-semibold">Error Loading Incidents</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {error.message || "Please check your connection."}
        </p>
      </div>
    );
  }

  const handleRowClick = (incident: Incident) => {
    setSelectedIncident(incident);
    setIsDrawerOpen(true);
  };

  return (
    <div className="flex h-full flex-col">
      <PageHeader
        title="Incident Operations Center"
        description="Real-time tracking and resolution of all stadium incidents"
      >
        <Button onClick={() => setIsCreateOpen(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Create Incident
        </Button>
      </PageHeader>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search incidents..."
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex flex-1 items-center gap-3 sm:flex-none">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              {Object.values(INCIDENT_STATUS).map((status) => (
                <SelectItem key={status} value={status} className="capitalize">
                  {status.replace("_", " ")}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={severityFilter} onValueChange={setSeverityFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Severity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Severities</SelectItem>
              {Object.values(INCIDENT_SEVERITY).map((sev) => (
                <SelectItem key={sev} value={sev} className="capitalize">
                  {sev}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex-1 overflow-hidden rounded-xl border border-border bg-card shadow-sm">
        <IncidentsTable
          incidents={filteredIncidents}
          isLoading={isLoading}
          onRowClick={handleRowClick}
        />
      </div>

      {selectedIncident && (
        <IncidentDrawer
          incident={selectedIncident}
          isOpen={isDrawerOpen}
          onOpenChange={setIsDrawerOpen}
        />
      )}

      <CreateIncidentDialog
        stadiumId={stadiumId}
        isOpen={isCreateOpen}
        onOpenChange={setIsCreateOpen}
      />
    </div>
  );
}
