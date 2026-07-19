"use client";

import { useState } from "react";
import { PageShell, PageHeader } from "@/components/layout/page-shell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Activity,
  AlertTriangle,
  Play,
  CloudLightning,
  HeartPulse,
  Users,
  Train,
  DoorClosed,
  CheckCircle2,
  Clock,
  ShieldCheck,
  RefreshCw,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils/cn";

import type { AISimulationResult } from "@/types";
import { useActiveMatch, useIncidents } from "@/hooks/use-firestore";
import { MOCK_CROWD_STATUS, MOCK_GATES, MOCK_WEATHER } from "@/lib/data/mock";

const SCENARIOS = [
  {
    id: "gate_closure",
    label: "Gate Closure",
    icon: DoorClosed,
    desc: "Sudden closure of main entry/exit points",
  },
  {
    id: "crowd_surge",
    label: "Crowd Surge",
    icon: Users,
    desc: "Unexpected high-density movement in concourse",
  },
  {
    id: "medical_emergency",
    label: "Medical Emergency",
    icon: HeartPulse,
    desc: "Mass casualty or localized medical event",
  },
  {
    id: "severe_weather",
    label: "Severe Weather",
    icon: CloudLightning,
    desc: "Lightning, extreme winds, or flooding",
  },
  {
    id: "transit_disruption",
    label: "Transit Disruption",
    icon: Train,
    desc: "Train cancellations affecting egress",
  },
];

const riskConfig = {
  Low: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  Medium: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  High: "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20",
  Critical: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20",
} as const;

export function SimulatorView({ stadiumId }: { stadiumId: string }) {
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [result, setResult] = useState<AISimulationResult | null>(null);

  // Live Context
  const { data: match } = useActiveMatch(stadiumId);
  const { data: incidents } = useIncidents(stadiumId);

  const totalCurrent = MOCK_CROWD_STATUS.reduce((sum, s) => sum + s.current, 0);
  const openIncidentsCount =
    incidents?.filter((i) => i.status === "open" || i.status === "in_progress").length ?? 0;
  const gateStatus = `${MOCK_GATES.filter((g) => g.status === "open").length} Open`;
  const crowdDensity = totalCurrent > 50000 ? "High" : "Medium";
  const weatherStr = `${MOCK_WEATHER.condition}, ${MOCK_WEATHER.temperatureCelsius}°C`;
  const matchStatusStr = match ? match.status : "No Active Match";

  const handleSimulate = async () => {
    if (!selectedScenario) {
      toast.error("Please select a scenario to simulate.");
      return;
    }

    const scenarioDef = SCENARIOS.find((s) => s.id === selectedScenario);

    setIsSimulating(true);
    setResult(null);

    try {
      const res = await fetch("/api/ai/simulate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          scenario: scenarioDef?.label ?? selectedScenario,
          currentContext: `Active Incidents: ${openIncidentsCount}, Crowd Density: ${crowdDensity}, Gate Status: ${gateStatus}, Weather: ${weatherStr}, Match Status: ${matchStatusStr}`,
        }),
      });
      const json = await res.json() as { success?: boolean; data?: typeof result; error?: string };
      if (!res.ok || !json.success) throw new Error(json.error ?? "Simulation failed");
      setResult(json.data ?? null);
      toast.success("Simulation complete.");
    } catch (error) {
      console.error(error);
      toast.error("Simulation failed. Please try again.");
    } finally {
      setIsSimulating(false);
    }
  };

  return (
    <PageShell>
      <PageHeader
        title="Scenario Simulator"
        description="Predict operational impacts of hypothetical events using Gemini AI."
      >
        <div className="flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1.5">
          <Activity className="h-4 w-4 text-indigo-500" />
          <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
            Read-Only Environment
          </span>
        </div>
      </PageHeader>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
        {/* Left Column: Configuration */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
            <div className="border-b border-border bg-muted/30 px-5 py-4">
              <h3 className="font-semibold text-foreground">Select Scenario</h3>
              <p className="text-sm text-muted-foreground mt-0.5">
                Choose an event to simulate against live context.
              </p>
            </div>
            <div className="p-3 flex flex-col gap-2">
              {SCENARIOS.map((s) => {
                const isSelected = selectedScenario === s.id;
                const Icon = s.icon;
                return (
                  <button
                    key={s.id}
                    onClick={() => setSelectedScenario(s.id)}
                    className={cn(
                      "flex items-start gap-4 p-4 rounded-lg border text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2",
                      isSelected
                        ? "border-indigo-500 bg-indigo-500/5 ring-1 ring-indigo-500/20"
                        : "border-border bg-card hover:bg-muted/50 hover:border-indigo-500/30"
                    )}
                    aria-pressed={isSelected}
                  >
                    <div
                      className={cn(
                        "mt-0.5 rounded-full p-2.5",
                        isSelected
                          ? "bg-indigo-500 text-white"
                          : "bg-secondary text-muted-foreground"
                      )}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h4
                        className={cn(
                          "font-medium",
                          isSelected ? "text-indigo-700 dark:text-indigo-300" : "text-foreground"
                        )}
                      >
                        {s.label}
                      </h4>
                      <p className="text-xs text-muted-foreground mt-1 leading-snug">{s.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>
            <div className="p-4 border-t border-border bg-muted/10">
              <Button
                className="w-full gap-2 bg-indigo-600 hover:bg-indigo-700 text-white"
                size="lg"
                onClick={handleSimulate}
                disabled={!selectedScenario || isSimulating}
              >
                {isSimulating ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    Simulating...
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 fill-current" />
                    Run Simulation
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Live Context Readout */}
          <div className="rounded-xl border border-border bg-card shadow-sm p-5">
            <h3 className="font-semibold text-sm text-foreground mb-4 flex items-center gap-2">
              <Activity className="h-4 w-4 text-muted-foreground" />
              Live Context Snapshot
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
                  Match Status
                </p>
                <p className="text-sm font-medium mt-0.5">{matchStatusStr}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
                  Active Incidents
                </p>
                <p className="text-sm font-medium mt-0.5">{openIncidentsCount}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
                  Crowd Density
                </p>
                <p className="text-sm font-medium mt-0.5">{crowdDensity}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
                  Gates Open
                </p>
                <p className="text-sm font-medium mt-0.5">{gateStatus}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Results */}
        <div className="lg:col-span-7">
          {result ? (
            <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden flex flex-col h-full animate-in fade-in zoom-in-95 duration-300">
              <div className="border-b border-border bg-muted/30 px-6 py-5 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-lg text-foreground">Simulation Report</h3>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    Based on Gemini 1.5 Pro analysis
                  </p>
                </div>
                <Badge
                  variant="outline"
                  className={cn("px-3 py-1 text-sm border", riskConfig[result.operationalRisk])}
                >
                  {result.operationalRisk} Risk
                </Badge>
              </div>

              <div className="p-6 flex-1 flex flex-col gap-8">
                {/* Summary */}
                <div>
                  <p className="text-[15px] leading-relaxed text-foreground font-medium">
                    {result.summary}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Impacts */}
                  <div>
                    <h4 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-1.5">
                      <AlertTriangle className="h-4 w-4 text-red-500" />
                      Expected Impacts
                    </h4>
                    <ul className="space-y-3">
                      {result.expectedImpacts.map((impact, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm">
                          <span className="mt-0.5 h-1.5 w-1.5 rounded-full bg-red-500 shrink-0" />
                          <span className="text-foreground leading-snug">{impact}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Actions */}
                  <div>
                    <h4 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-1.5">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                      Recommended Actions
                    </h4>
                    <ul className="space-y-3">
                      {result.recommendedActions.map((action, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm">
                          <span className="mt-0.5 h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" />
                          <span className="text-foreground leading-snug">{action}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="border-t border-border bg-muted/10 p-5 grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
                      Est. Recovery
                    </p>
                    <p className="font-medium text-sm">{result.estimatedRecoveryTime}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center">
                    <ShieldCheck className="h-5 w-5 text-indigo-500" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold flex justify-between">
                      <span>Confidence</span>
                      <span>{Math.round(result.confidence * 100)}%</span>
                    </p>
                    <div className="h-1.5 w-full bg-secondary rounded-full mt-1.5 overflow-hidden">
                      <div
                        className="h-full bg-indigo-500 rounded-full"
                        style={{ width: `${result.confidence * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-border bg-card shadow-sm h-full min-h-[400px] flex flex-col items-center justify-center text-center p-8">
              <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
                <Play className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">Awaiting Simulation</h3>
              <p className="text-sm text-muted-foreground max-w-sm mt-2">
                Select a scenario and click run to see how the stadium would react under the current
                operational conditions.
              </p>
            </div>
          )}
        </div>
      </div>
    </PageShell>
  );
}
