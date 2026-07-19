import { Sparkles, AlertTriangle, ShieldCheck, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatRelativeDate } from "@/lib/utils/dates";
import { cn } from "@/lib/utils/cn";
import type { AIAnalysis } from "@/types";

interface AIAnalysisPanelProps {
  analysis: AIAnalysis;
}

const riskConfig = {
  Critical: "bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20",
  High: "bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20",
  Medium: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20",
  Low: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20",
} as const;

export function AIAnalysisPanel({ analysis }: AIAnalysisPanelProps) {
  const confidencePercent = Math.round(analysis.confidence * 100);

  return (
    <div className="rounded-xl border border-border bg-card/50 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border bg-muted/40 px-4 py-3">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-indigo-500" />
          <h4 className="font-semibold text-sm tracking-tight text-foreground">
            Gemini AI Analysis
          </h4>
        </div>
        <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
          {analysis.modelUsed}
        </span>
      </div>

      <div className="p-4 space-y-5">
        {/* Summary */}
        <div>
          <p className="text-sm font-medium text-foreground leading-relaxed">{analysis.summary}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Risk Level */}
          <div className="flex flex-col gap-1.5 rounded-lg border border-border/50 bg-secondary/30 p-3">
            <span className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
              <AlertTriangle className="h-3.5 w-3.5" />
              Operational Risk
            </span>
            <Badge
              variant="outline"
              className={cn("w-max px-2 py-0.5", riskConfig[analysis.operationalRisk])}
            >
              {analysis.operationalRisk}
            </Badge>
          </div>

          {/* Confidence */}
          <div className="flex flex-col gap-1.5 rounded-lg border border-border/50 bg-secondary/30 p-3">
            <span className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5" />
              Confidence
            </span>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold">{confidencePercent}%</span>
              <div className="h-1.5 flex-1 rounded-full bg-secondary overflow-hidden">
                <div
                  className="h-full bg-indigo-500 rounded-full"
                  style={{ width: `${confidencePercent}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Root Cause & Impact */}
        <div className="space-y-3">
          <div>
            <h5 className="text-xs font-semibold text-muted-foreground mb-1">Root Cause</h5>
            <p className="text-sm text-foreground">{analysis.rootCause}</p>
          </div>
          <div>
            <h5 className="text-xs font-semibold text-muted-foreground mb-1">Estimated Impact</h5>
            <p className="text-sm text-foreground">{analysis.estimatedImpact}</p>
          </div>
        </div>

        {/* Recommended Actions */}
        {analysis.recommendedActions.length > 0 && (
          <div>
            <h5 className="text-xs font-semibold text-muted-foreground mb-2">
              Recommended Actions
            </h5>
            <ul className="space-y-2">
              {analysis.recommendedActions.map((action, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm">
                  <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-indigo-500 shrink-0" />
                  <span className="text-muted-foreground leading-snug">{action}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Affected Areas */}
        {analysis.affectedAreas.length > 0 && (
          <div>
            <h5 className="text-xs font-semibold text-muted-foreground mb-2">Affected Areas</h5>
            <div className="flex flex-wrap gap-1.5">
              {analysis.affectedAreas.map((area, idx) => (
                <Badge key={idx} variant="secondary" className="text-xs">
                  {area}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Reasoning */}
        <div className="rounded-lg bg-indigo-500/5 p-3 border border-indigo-500/10 text-xs">
          <div className="flex items-center gap-1.5 mb-1 text-indigo-600 dark:text-indigo-400 font-semibold">
            <Info className="h-3.5 w-3.5" />
            AI Reasoning
          </div>
          <p className="text-muted-foreground leading-relaxed">{analysis.reasoning}</p>
        </div>

        {/* Timestamp */}
        <div className="flex justify-end pt-1">
          <span className="text-[10px] text-muted-foreground">
            Analyzed {formatRelativeDate(analysis.generatedAt)}
          </span>
        </div>
      </div>
    </div>
  );
}
