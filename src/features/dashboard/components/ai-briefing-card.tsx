import { useState } from "react";
import {
  Sparkles,
  RefreshCw,
  Activity,
  AlertTriangle,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatRelativeDate } from "@/lib/utils/dates";
import { toast } from "sonner";
import type { Stadium } from "@/types";
import { cn } from "@/lib/utils/cn";

interface AIBriefingCardProps {
  stadiumId: string;
  stadium: Stadium | null;
  activeIncidents: number;
  unresolvedAlerts: number;
  crowdDensity: string;
  gateStatus: string;
  weather: string;
  matchStatus: string;
}

const statusConfig = {
  Normal: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20",
  Elevated: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20",
  "High Risk": "bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20",
} as const;

export function AIBriefingCard({
  activeIncidents,
  unresolvedAlerts,
  crowdDensity,
  gateStatus,
  weather,
  matchStatus,
  stadium,
}: AIBriefingCardProps) {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [briefingData, setBriefingData] = useState(stadium?.aiBriefing ?? null);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      const res = await fetch("/api/ai/briefing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          activeIncidents: String(activeIncidents),
          unresolvedAlerts: String(unresolvedAlerts),
          crowdDensity,
          gateStatus,
          weather,
          matchStatus,
        }),
      });
      const json = await res.json() as { success?: boolean; data?: typeof briefingData; error?: string };
      if (!res.ok || !json.success) throw new Error(json.error ?? "Failed");
      setBriefingData(json.data ?? null);
      toast.success("AI operations briefing updated.");
    } catch (error) {
      console.error("Failed to generate briefing:", error);
      toast.error("Failed to update AI briefing. Please try again.");
    } finally {
      setIsRefreshing(false);
    }
  };

  const briefing = briefingData;


  if (!briefing) {
    return (
      <div className="col-span-full rounded-xl border border-dashed border-indigo-500/30 bg-indigo-500/5 p-6 flex flex-col items-center justify-center text-center shadow-sm">
        <div className="h-12 w-12 rounded-full bg-indigo-500/10 flex items-center justify-center mb-4">
          <Sparkles className="h-6 w-6 text-indigo-500" />
        </div>
        <h3 className="text-lg font-semibold text-foreground">AI Operations Briefing</h3>
        <p className="text-sm text-muted-foreground max-w-md mt-1 mb-5">
          Generate an AI-powered summary of the current stadium state, predicting operational risks
          based on real-time incidents, weather, and crowd density.
        </p>
        <Button
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="gap-2 bg-indigo-600 hover:bg-indigo-700 text-white"
        >
          <RefreshCw className={cn("h-4 w-4", isRefreshing && "animate-spin")} />
          {isRefreshing ? "Analyzing Context..." : "Generate Briefing"}
        </Button>
      </div>
    );
  }

  const confidencePercent = Math.round(briefing.confidence * 100);
  const scorePercent = briefing.operationalScore;
  const getScoreColor = (score: number) => {
    if (score >= 80) return "bg-emerald-500";
    if (score >= 60) return "bg-amber-500";
    return "bg-red-500";
  };

  return (
    <div className="col-span-full rounded-xl border border-border bg-card shadow-sm overflow-hidden flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border bg-indigo-500/5 px-5 py-4">
        <div className="flex items-center gap-2.5">
          <Sparkles className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
          <h3 className="font-semibold text-base tracking-tight text-foreground">
            AI Operations Briefing
          </h3>
          <Badge
            variant="outline"
            className={cn("ml-2 px-2.5 py-0.5", statusConfig[briefing.overallStatus])}
          >
            {briefing.overallStatus}
          </Badge>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs text-muted-foreground flex items-center gap-1.5">
            <Activity className="h-3.5 w-3.5" />
            Last updated {formatRelativeDate(briefing.generatedAt)}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="h-8 gap-1.5 border-indigo-500/20 hover:bg-indigo-500/10 hover:text-indigo-600 dark:hover:text-indigo-400"
          >
            <RefreshCw className={cn("h-3.5 w-3.5", isRefreshing && "animate-spin")} />
            Refresh
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (Summary & Actions) */}
        <div className="lg:col-span-8 flex flex-col gap-5">
          <div>
            <h4 className="text-sm font-semibold text-muted-foreground mb-1.5 uppercase tracking-wider text-[11px]">
              Executive Summary
            </h4>
            <p className="text-[15px] leading-relaxed text-foreground font-medium">
              {briefing.executiveSummary}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-2">
            <div>
              <h4 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-1.5">
                <AlertTriangle className="h-4 w-4 text-amber-500" />
                Top Risks
              </h4>
              <ul className="space-y-2.5">
                {briefing.topRisks.map((risk, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2.5 text-sm bg-secondary/30 p-2.5 rounded-lg border border-border/50"
                  >
                    <span className="mt-0.5 h-1.5 w-1.5 rounded-full bg-amber-500 shrink-0" />
                    <span className="text-foreground leading-snug">{risk}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                Recommended Actions
              </h4>
              <ul className="space-y-2.5">
                {briefing.recommendedActions.map((action, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2.5 text-sm bg-secondary/30 p-2.5 rounded-lg border border-border/50"
                  >
                    <span className="mt-0.5 h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" />
                    <span className="text-foreground leading-snug">{action}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Right Column (Metrics & Resources) */}
        <div className="lg:col-span-4 flex flex-col gap-5 border-t lg:border-t-0 lg:border-l border-border pt-5 lg:pt-0 lg:pl-6">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Operational Score
              </span>
              <span className="font-bold text-lg">{scorePercent}/100</span>
            </div>
            <div className="h-2 w-full rounded-full bg-secondary overflow-hidden">
              <div
                className={cn(
                  "h-full rounded-full transition-all duration-1000",
                  getScoreColor(scorePercent)
                )}
                style={{ width: `${scorePercent}%` }}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1">
                <ShieldCheck className="h-3.5 w-3.5" />
                AI Confidence
              </span>
              <span className="font-semibold text-sm">{confidencePercent}%</span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-secondary overflow-hidden">
              <div
                className="h-full bg-indigo-500 rounded-full transition-all duration-1000"
                style={{ width: `${confidencePercent}%` }}
              />
            </div>
          </div>

          <div className="mt-2">
            <h4 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wider text-[11px]">
              Resource Suggestions
            </h4>
            <div className="flex flex-col gap-2">
              {briefing.resourceSuggestions.map((suggestion, i) => (
                <div
                  key={i}
                  className="text-sm text-foreground bg-secondary/50 px-3 py-2 rounded-md border border-border/50"
                >
                  {suggestion}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
