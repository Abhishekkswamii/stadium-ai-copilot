import { cn } from "@/lib/utils/cn";
import type { SectionCrowdStatus } from "@/lib/data/mock";

interface StadiumLayoutMapProps {
  sections: SectionCrowdStatus[];
  stadiumName: string;
}

const statusFill = {
  normal: "fill-emerald-500/30 stroke-emerald-500 hover:fill-emerald-500/50",
  busy: "fill-amber-500/30 stroke-amber-500 hover:fill-amber-500/50",
  full: "fill-orange-500/30 stroke-orange-500 hover:fill-orange-500/50",
  critical: "fill-red-500/40 stroke-red-500 hover:fill-red-500/60",
} as const;

const statusLabel = {
  normal: "Normal",
  busy: "Busy",
  full: "Full",
  critical: "Critical",
} as const;

interface SectionPathProps {
  section: SectionCrowdStatus;
  d: string;
  labelX: number;
  labelY: number;
}

function SectionPath({ section, d, labelX, labelY }: SectionPathProps) {
  const pct = Math.round((section.current / section.capacity) * 100);
  return (
    <g
      role="img"
      aria-label={`${section.sectionName}: ${pct}% capacity, ${statusLabel[section.status]}`}
    >
      <path
        d={d}
        className={cn(
          "cursor-pointer stroke-[1.5] transition-all duration-300",
          statusFill[section.status]
        )}
        strokeLinejoin="round"
      />
      <text
        x={labelX}
        y={labelY}
        textAnchor="middle"
        dominantBaseline="middle"
        className="pointer-events-none select-none fill-foreground text-[9px] font-bold"
        style={{ fontSize: "9px", fontWeight: 700 }}
      >
        {pct}%
      </text>
    </g>
  );
}

export function StadiumLayoutMap({ sections, stadiumName }: StadiumLayoutMapProps) {
  // Map section IDs to crowd data
  const byId = Object.fromEntries(sections.map((s) => [s.sectionId, s]));

  const north = byId["s-north"];
  const south = byId["s-south"];
  const east = byId["s-east"];
  const west = byId["s-west"];
  const standing = byId["s-stand"];

  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold">Stadium Layout</h2>
          <p className="text-xs text-muted-foreground">{stadiumName} — Occupancy Overview</p>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-3" aria-label="Legend">
          {(["normal", "busy", "full", "critical"] as const).map((s) => (
            <div key={s} className="flex items-center gap-1.5">
              <span
                className={cn(
                  "h-2.5 w-2.5 rounded-sm",
                  s === "normal" && "bg-emerald-500",
                  s === "busy" && "bg-amber-500",
                  s === "full" && "bg-orange-500",
                  s === "critical" && "bg-red-500"
                )}
                aria-hidden="true"
              />
              <span className="text-[10px] text-muted-foreground capitalize">{s}</span>
            </div>
          ))}
        </div>
      </div>

      {/* SVG Stadium */}
      <div className="relative flex items-center justify-center">
        <svg
          viewBox="0 0 400 300"
          className="w-full max-w-lg"
          role="img"
          aria-label={`${stadiumName} seating layout occupancy map`}
        >
          {/* Outer stadium boundary */}
          <ellipse
            cx="200"
            cy="150"
            rx="185"
            ry="135"
            className="fill-muted/20 stroke-border stroke-2"
          />

          {/* Pitch */}
          <rect
            x="110"
            y="85"
            width="180"
            height="130"
            rx="8"
            className="fill-emerald-900/40 stroke-emerald-700/60 stroke-[1.5]"
          />
          {/* Centre circle */}
          <circle
            cx="200"
            cy="150"
            r="28"
            className="fill-none stroke-emerald-700/40 stroke-[1.5]"
          />
          {/* Halfway line */}
          <line
            x1="110"
            y1="150"
            x2="290"
            y2="150"
            className="stroke-emerald-700/40 stroke-[1.5]"
          />
          {/* Centre spot */}
          <circle cx="200" cy="150" r="2" className="fill-emerald-700/60" />

          {/* Goal boxes */}
          <rect
            x="110"
            y="124"
            width="22"
            height="52"
            rx="2"
            className="fill-none stroke-emerald-700/40 stroke-[1.5]"
          />
          <rect
            x="268"
            y="124"
            width="22"
            height="52"
            rx="2"
            className="fill-none stroke-emerald-700/40 stroke-[1.5]"
          />

          {/* ── NORTH STAND (top) ── */}
          {north && (
            <SectionPath
              section={north}
              d="M30,25 L370,25 L340,75 L60,75 Z"
              labelX={200}
              labelY={50}
            />
          )}

          {/* ── SOUTH STAND (bottom) ── */}
          {south && (
            <SectionPath
              section={south}
              d="M60,225 L340,225 L370,275 L30,275 Z"
              labelX={200}
              labelY={250}
            />
          )}

          {/* ── WEST STAND (left) ── */}
          {west && (
            <SectionPath
              section={west}
              d="M15,35 L60,75 L60,225 L15,265 Z"
              labelX={37}
              labelY={150}
            />
          )}

          {/* ── EAST STAND (right) ── */}
          {east && (
            <SectionPath
              section={east}
              d="M385,35 L340,75 L340,225 L385,265 Z"
              labelX={363}
              labelY={150}
            />
          )}

          {/* Standing terrace (inner ring visual) */}
          {standing && (
            <g
              role="img"
              aria-label={`Standing Terrace: ${Math.round((standing.current / standing.capacity) * 100)}% capacity`}
            >
              <ellipse
                cx="200"
                cy="150"
                rx="105"
                ry="76"
                className={cn("stroke-[1.5]", statusFill[standing.status], "fill-none")}
                strokeDasharray="5,3"
              />
            </g>
          )}

          {/* Labels */}
          <text
            x="200"
            y="17"
            textAnchor="middle"
            style={{ fontSize: "10px", fontWeight: 600 }}
            className="fill-muted-foreground select-none"
          >
            NORTH
          </text>
          <text
            x="200"
            y="289"
            textAnchor="middle"
            style={{ fontSize: "10px", fontWeight: 600 }}
            className="fill-muted-foreground select-none"
          >
            SOUTH
          </text>
          <text
            x="9"
            y="150"
            textAnchor="middle"
            style={{ fontSize: "10px", fontWeight: 600 }}
            className="fill-muted-foreground select-none"
            transform="rotate(-90 9 150)"
          >
            WEST
          </text>
          <text
            x="391"
            y="150"
            textAnchor="middle"
            style={{ fontSize: "10px", fontWeight: 600 }}
            className="fill-muted-foreground select-none"
            transform="rotate(90 391 150)"
          >
            EAST
          </text>
        </svg>
      </div>
    </div>
  );
}
