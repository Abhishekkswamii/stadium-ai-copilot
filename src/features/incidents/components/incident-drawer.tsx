import { useState } from "react";
import { formatRelativeDate } from "@/lib/utils/dates";
import { cn } from "@/lib/utils/cn";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { updateIncident, deleteIncident } from "@/lib/firebase/mutations/incidents";
import { toast } from "sonner";
import {
  MapPin,
  Clock,
  User,
  ShieldAlert,
  Activity,
  CheckCircle2,
  Trash2,
  Sparkles,
  Loader2,
} from "lucide-react";
import type { Incident } from "@/types";
import { INCIDENT_STATUS } from "@/constants";
import { AIAnalysisPanel } from "./ai-analysis-panel";

interface IncidentDrawerProps {
  incident: Incident;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const severityConfig = {
  critical: "bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20",
  high: "bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20",
  medium: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20",
  low: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20",
} as const;

export function IncidentDrawer({ incident, isOpen, onOpenChange }: IncidentDrawerProps) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleStatusChange = async (newStatus: Incident["status"]) => {
    setIsUpdating(true);
    try {
      await updateIncident(incident.id, { status: newStatus });
      toast.success(`Status updated to ${newStatus.replace("_", " ")}`);
    } catch (error) {
      console.error("Failed to update status:", error);
      toast.error("Failed to update status");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this incident? This action cannot be undone."))
      return;

    setIsDeleting(true);
    try {
      await deleteIncident(incident.id);
      toast.success("Incident deleted successfully");
      onOpenChange(false);
    } catch (error) {
      console.error("Failed to delete incident:", error);
      toast.error("Failed to delete incident");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    try {
      const response = await fetch("/api/ai/analyze-incident", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          incidentId: incident.id,
          description: incident.description,
          category: incident.category,
          severity: incident.severity,
          location: incident.location,
        }),
      });

      if (!response.ok) throw new Error("AI analysis failed");

      toast.success("AI analysis complete!");
    } catch (error) {
      console.error("AI Analysis failed:", error);
      toast.error("AI Analysis failed. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="flex flex-col sm:max-w-md overflow-y-auto">
        <SheetHeader className="text-left">
          <div className="flex items-center justify-between gap-4">
            <Badge
              variant="outline"
              className={cn("capitalize font-semibold", severityConfig[incident.severity])}
            >
              {incident.severity}
            </Badge>
            <span className="text-xs text-muted-foreground uppercase tracking-widest">
              {incident.id.slice(0, 8)}
            </span>
          </div>
          <SheetTitle className="text-xl mt-2 leading-tight">{incident.title}</SheetTitle>
          <SheetDescription className="text-sm mt-1">{incident.description}</SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-6 flex-1">
          {/* Metadata Grid */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex flex-col gap-1">
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <Activity className="h-3.5 w-3.5" />
                Status
              </span>
              <span className="font-medium capitalize">{incident.status.replace("_", " ")}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <ShieldAlert className="h-3.5 w-3.5" />
                Category
              </span>
              <span className="font-medium capitalize">{incident.category}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <MapPin className="h-3.5 w-3.5" />
                Location
              </span>
              <span className="font-medium">{incident.location.section}</span>
              <span className="text-xs text-muted-foreground">{incident.location.description}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <User className="h-3.5 w-3.5" />
                Assigned To
              </span>
              <span className="font-medium">{incident.assignedTo || "Unassigned"}</span>
            </div>
          </div>

          <Separator />

          {/* AI Analysis Section */}
          <div className="space-y-4">
            {incident.aiAnalysis ? (
              <AIAnalysisPanel analysis={incident.aiAnalysis} />
            ) : (
              <div className="flex flex-col items-center justify-center p-6 text-center border border-dashed rounded-xl bg-muted/20">
                <div className="h-10 w-10 rounded-full bg-indigo-500/10 flex items-center justify-center mb-3">
                  <Sparkles className="h-5 w-5 text-indigo-500" />
                </div>
                <h4 className="text-sm font-semibold mb-1">AI Incident Intelligence</h4>
                <p className="text-xs text-muted-foreground mb-4 max-w-[250px]">
                  Analyze this incident context against real-time stadium data to determine root
                  cause and operational impact.
                </p>
                <Button
                  onClick={handleAnalyze}
                  disabled={isAnalyzing}
                  variant="secondary"
                  className="w-full gap-2 text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 dark:text-indigo-400 dark:hover:bg-indigo-500/10"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4" />
                      Analyze with AI
                    </>
                  )}
                </Button>
              </div>
            )}
          </div>

          <Separator />

          {/* Timeline */}
          <div>
            <h4 className="text-sm font-semibold mb-4">Activity Timeline</h4>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="relative flex flex-col items-center">
                  <div className="h-2 w-2 rounded-full bg-border" />
                  <div className="w-px h-full bg-border absolute top-2" />
                </div>
                <div className="pb-1">
                  <p className="text-sm font-medium">Incident Created</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Reported by {incident.reportedBy}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {formatRelativeDate(incident.createdAt)}
                  </p>
                </div>
              </div>

              {incident.resolvedAt && (
                <div className="flex gap-3">
                  <div className="relative flex flex-col items-center">
                    <div className="h-2 w-2 rounded-full bg-emerald-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                      Incident Resolved
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
                      <CheckCircle2 className="h-3 w-3" />
                      {formatRelativeDate(incident.resolvedAt)}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Notes */}
          {incident.notes && incident.notes.length > 0 && (
            <>
              <Separator />
              <div>
                <h4 className="text-sm font-semibold mb-3">Notes</h4>
                <ul className="space-y-2">
                  {incident.notes.map((note, idx) => (
                    <li
                      key={idx}
                      className="text-sm bg-secondary/50 p-3 rounded-lg border border-border/50"
                    >
                      {note}
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </div>

        <SheetFooter className="mt-6 flex-col gap-2 sm:flex-col sm:justify-end sm:space-x-0">
          {incident.status !== INCIDENT_STATUS.RESOLVED &&
            incident.status !== INCIDENT_STATUS.CLOSED && (
              <Button
                className="w-full"
                disabled={isUpdating}
                onClick={() => handleStatusChange(INCIDENT_STATUS.RESOLVED)}
              >
                Mark as Resolved
              </Button>
            )}
          {incident.status === INCIDENT_STATUS.OPEN && (
            <Button
              variant="outline"
              className="w-full"
              disabled={isUpdating}
              onClick={() => handleStatusChange(INCIDENT_STATUS.IN_PROGRESS)}
            >
              Start Investigation
            </Button>
          )}
          <Button
            variant="destructive"
            className="w-full gap-2 mt-4"
            disabled={isDeleting}
            onClick={handleDelete}
          >
            <Trash2 className="h-4 w-4" />
            Delete Incident
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
