import { Cloud, CloudRain, Sun, CloudSnow, Wind, Droplets, Eye, Thermometer } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import type { WeatherData } from "@/lib/data/mock";

interface WeatherCardProps {
  weather: WeatherData;
}

const conditionConfig = {
  clear: { icon: Sun, label: "Clear", iconClass: "text-yellow-500" },
  cloudy: { icon: Cloud, label: "Cloudy", iconClass: "text-zinc-400" },
  rain: { icon: CloudRain, label: "Rain", iconClass: "text-blue-400" },
  storm: { icon: CloudRain, label: "Storm", iconClass: "text-purple-500" },
  fog: { icon: Cloud, label: "Fog", iconClass: "text-zinc-300" },
  snow: { icon: CloudSnow, label: "Snow", iconClass: "text-blue-200" },
} as const;

const riskConfig = {
  low: { label: "Low Risk", className: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" },
  moderate: {
    label: "Moderate Risk",
    className: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  },
  high: { label: "High Risk", className: "bg-red-500/10 text-red-600 dark:text-red-400" },
} as const;

export function WeatherCard({ weather }: WeatherCardProps) {
  const condition = conditionConfig[weather.condition];
  const risk = riskConfig[weather.operationalRisk];
  const ConditionIcon = condition.icon;

  return (
    <article
      className="rounded-xl border border-border bg-card p-5 shadow-sm"
      aria-label="Current Weather Conditions"
    >
      {/* Header */}
      <div className="mb-4 flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Weather
          </p>
          <div className="mt-1 flex items-end gap-2">
            <span className="text-3xl font-bold tabular-nums">{weather.temperatureCelsius}°C</span>
            <span className="mb-0.5 text-sm text-muted-foreground">
              Feels {weather.feelsLikeCelsius}°C
            </span>
          </div>
        </div>
        <ConditionIcon className={cn("h-10 w-10", condition.iconClass)} aria-hidden="true" />
      </div>

      {/* Condition & Risk */}
      <div className="mb-4 flex items-center gap-2">
        <span className="text-sm font-medium">{condition.label}</span>
        <span
          className={cn("rounded-full px-2 py-0.5 text-xs font-semibold", risk.className)}
          role="status"
          aria-label={`Operational risk: ${risk.label}`}
        >
          {risk.label}
        </span>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-2.5">
        <div className="flex items-center gap-2 rounded-lg bg-secondary p-2">
          <Wind className="h-3.5 w-3.5 flex-shrink-0 text-muted-foreground" aria-hidden="true" />
          <div>
            <p className="text-[10px] text-muted-foreground">Wind</p>
            <p className="text-xs font-semibold tabular-nums">
              {weather.windSpeedKph} km/h {weather.windDirection}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 rounded-lg bg-secondary p-2">
          <Droplets
            className="h-3.5 w-3.5 flex-shrink-0 text-muted-foreground"
            aria-hidden="true"
          />
          <div>
            <p className="text-[10px] text-muted-foreground">Humidity</p>
            <p className="text-xs font-semibold tabular-nums">{weather.humidity}%</p>
          </div>
        </div>

        <div className="flex items-center gap-2 rounded-lg bg-secondary p-2">
          <Eye className="h-3.5 w-3.5 flex-shrink-0 text-muted-foreground" aria-hidden="true" />
          <div>
            <p className="text-[10px] text-muted-foreground">Visibility</p>
            <p className="text-xs font-semibold capitalize">{weather.visibility}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 rounded-lg bg-secondary p-2">
          <Thermometer
            className="h-3.5 w-3.5 flex-shrink-0 text-muted-foreground"
            aria-hidden="true"
          />
          <div>
            <p className="text-[10px] text-muted-foreground">UV Index</p>
            <p className="text-xs font-semibold tabular-nums">{weather.uvIndex}</p>
          </div>
        </div>
      </div>

      <p className="mt-3 text-[10px] text-muted-foreground/60">
        Updated{" "}
        {weather.updatedAt.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}
      </p>
    </article>
  );
}
