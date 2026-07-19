"use client";

import { useStadium, useActiveMatch, useIncidents, useAlerts } from "@/hooks/use-firestore";
import { MOCK_CROWD_STATUS, MOCK_GATES, MOCK_WEATHER, MOCK_TIMELINE } from "@/lib/data/mock";

import { ActiveMatchCard } from "./active-match-card";
import { CrowdStatusCard } from "./crowd-status-card";
import { AlertsFeedCard } from "./alerts-feed-card";
import { GateStatusCard } from "./gate-status-card";
import { WeatherCard } from "./weather-card";
import { IncidentsSummaryCard } from "./incidents-summary-card";
import { OperationsTimeline } from "./operations-timeline";
import { AIBriefingCard } from "./ai-briefing-card";
import { PageShell, PageHeader } from "@/components/layout/page-shell";
import dynamic from "next/dynamic";
import { StadiumLayoutMapSkeleton } from "./skeletons";

const StadiumLayoutMap = dynamic(
  () =>
    import("@/features/stadium/components/stadium-layout-map").then((mod) => mod.StadiumLayoutMap),
  { ssr: false, loading: () => <StadiumLayoutMapSkeleton /> }
);

import {
  KpiTileSkeleton,
  ActiveMatchCardSkeleton,
  CrowdStatusCardSkeleton,
  IncidentsSummaryCardSkeleton,
  AlertsFeedCardSkeleton,
} from "./skeletons";

import { AlertCircle } from "lucide-react";

interface DashboardViewProps {
  stadiumId: string;
}

export function DashboardView({ stadiumId }: DashboardViewProps) {
  // Real-time Firestore subscriptions
  const { data: stadium, isLoading: stadiumLoading, error: stadiumError } = useStadium(stadiumId);
  const { data: match, isLoading: matchLoading, error: matchError } = useActiveMatch(stadiumId);
  const {
    data: incidents,
    isLoading: incidentsLoading,
    error: incidentsError,
  } = useIncidents(stadiumId);
  const { data: alerts, isLoading: alertsLoading, error: alertsError } = useAlerts(stadiumId);

  // Derived state from mock data (unchanged per requirements)
  const totalCurrent = MOCK_CROWD_STATUS.reduce((sum, s) => sum + s.current, 0);
  const openIncidentsCount =
    incidents?.filter((i) => i.status === "open" || i.status === "in_progress").length ?? 0;
  const criticalIncidentsCount = incidents?.filter((i) => i.severity === "critical").length ?? 0;
  const unreadAlertsCount = alerts?.filter((a) => !a.isRead).length ?? 0;
  const activeAlertsCount = alerts?.length ?? 0;

  // Global error state
  const hasError = stadiumError || matchError || incidentsError || alertsError;

  if (hasError) {
    return (
      <PageShell>
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10">
            <AlertCircle className="h-6 w-6 text-red-500" />
          </div>
          <h2 className="mt-4 text-lg font-semibold">Error Loading Dashboard</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Please check your connection or contact support.
          </p>
        </div>
      </PageShell>
    );
  }

  // ─── Header ───────────────────────────────────────────────────────────────────

  const renderHeader = () => {
    if (stadiumLoading) {
      return (
        <PageHeader title="Operations Overview">
          <div className="flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 opacity-50">
            <span className="h-2 w-2 rounded-full bg-muted-foreground" />
            <span className="text-xs font-semibold text-muted-foreground">Connecting...</span>
          </div>
        </PageHeader>
      );
    }

    if (!stadium) {
      return <PageHeader title="Operations Overview" description="Stadium not found" />;
    }

    const hasCritical =
      criticalIncidentsCount > 0 ||
      (alerts?.some((a) => a.severity === "critical" && !a.isRead) ?? false);

    return (
      <PageHeader
        title="Operations Overview"
        description={`${stadium.name} · Match day · ${new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" })}`}
      >
        {hasCritical ? (
          <div className="flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1.5">
            <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" aria-hidden="true" />
            <span className="text-xs font-semibold text-red-600 dark:text-red-400">
              Critical Alerts Active
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden="true" />
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              Operations Normal
            </span>
          </div>
        )}
      </PageHeader>
    );
  };

  return (
    <PageShell>
      {renderHeader()}

      {/* ── Top KPI row ─────────────────────────────────────────────── */}
      <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {stadiumLoading ? (
          <KpiTileSkeleton />
        ) : (
          <KpiTile
            label="Total Attendance"
            value={totalCurrent.toLocaleString()}
            sub={`of ${stadium?.capacity?.toLocaleString() ?? "N/A"}`}
            accent="blue"
          />
        )}
        {incidentsLoading ? (
          <KpiTileSkeleton />
        ) : (
          <KpiTile
            label="Open Incidents"
            value={openIncidentsCount.toString()}
            sub={`${criticalIncidentsCount} critical`}
            accent="red"
          />
        )}
        {alertsLoading ? (
          <KpiTileSkeleton />
        ) : (
          <KpiTile
            label="Unread Alerts"
            value={unreadAlertsCount.toString()}
            sub={`${activeAlertsCount} total active`}
            accent="amber"
          />
        )}
        <KpiTile
          label="Gates Open"
          value={`${MOCK_GATES.filter((g) => g.status === "open").length} / ${MOCK_GATES.length}`}
          sub="1 restricted"
          accent="emerald"
        />
      </div>

      {/* ── Main grid ─────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 xl:grid-cols-4">
        {/* AI Briefing Card (Premium Full Width Top Slot) */}
        {!stadiumLoading && (
          <AIBriefingCard
            stadiumId={stadiumId}
            stadium={stadium ?? null}
            activeIncidents={openIncidentsCount}
            unresolvedAlerts={unreadAlertsCount}
            crowdDensity={totalCurrent > 50000 ? "High" : "Medium"}
            gateStatus={`${MOCK_GATES.filter((g) => g.status === "open").length} Open`}
            weather={`${MOCK_WEATHER.condition}, ${MOCK_WEATHER.temperatureCelsius}°C`}
            matchStatus={match ? match.status : "No Active Match"}
          />
        )}

        <div className="space-y-4 lg:col-span-2 xl:col-span-3">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {matchLoading ? (
              <ActiveMatchCardSkeleton />
            ) : match ? (
              <ActiveMatchCard match={match} currentAttendance={totalCurrent} />
            ) : (
              <div className="rounded-xl border border-border bg-card p-5 text-center text-sm text-muted-foreground shadow-sm flex items-center justify-center min-h-[220px]">
                No active match
              </div>
            )}
            {stadiumLoading ? (
              <CrowdStatusCardSkeleton />
            ) : (
              <CrowdStatusCard
                sections={MOCK_CROWD_STATUS}
                totalCapacity={stadium?.capacity ?? 0}
                totalCurrent={totalCurrent}
              />
            )}
            <WeatherCard weather={MOCK_WEATHER} />
          </div>

          {stadiumLoading ? (
            <StadiumLayoutMapSkeleton />
          ) : (
            <StadiumLayoutMap
              sections={MOCK_CROWD_STATUS}
              stadiumName={stadium?.name ?? "Unknown Stadium"}
            />
          )}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {incidentsLoading ? (
              <IncidentsSummaryCardSkeleton />
            ) : (
              <IncidentsSummaryCard incidents={incidents ?? []} />
            )}
            <GateStatusCard gates={MOCK_GATES} />
          </div>
        </div>

        <div className="space-y-4 lg:col-span-1 xl:col-span-1">
          {alertsLoading ? <AlertsFeedCardSkeleton /> : <AlertsFeedCard alerts={alerts ?? []} />}
          {/* We continue using MOCK_TIMELINE since timeline is synthesized from incidents and alerts normally */}
          <OperationsTimeline events={MOCK_TIMELINE} />
        </div>
      </div>
    </PageShell>
  );
}

// ─── KPI Tile ─────────────────────────────────────────────────────────────────

interface KpiTileProps {
  label: string;
  value: string;
  sub?: string;
  accent: "blue" | "red" | "amber" | "emerald";
}

const accentMap: Record<KpiTileProps["accent"], string> = {
  blue: "border-l-blue-500",
  red: "border-l-red-500",
  amber: "border-l-amber-500",
  emerald: "border-l-emerald-500",
};

function KpiTile({ label, value, sub, accent }: KpiTileProps) {
  return (
    <div
      className={`rounded-xl border border-border border-l-4 ${accentMap[accent]} bg-card px-4 py-3 shadow-sm`}
      role="figure"
      aria-label={`${label}: ${value}`}
    >
      <p className="text-xs font-medium text-muted-foreground">{label}</p>
      <p className="mt-1 text-2xl font-bold tabular-nums">{value}</p>
      {sub && <p className="mt-0.5 text-xs text-muted-foreground">{sub}</p>}
    </div>
  );
}
