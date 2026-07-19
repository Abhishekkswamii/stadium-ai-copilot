/**
 * Mock data for local development.
 *
 * These objects are shaped exactly like Firestore documents — switching to live
 * Firestore data requires only replacing this import in the consuming component.
 *
 * Explicitly approved: "Use Firestore-ready interfaces but mock local data for now."
 */

import type { Stadium, Match, Incident, Alert } from "@/types";

// ─── Stadium ──────────────────────────────────────────────────────────────────

export const MOCK_STADIUM: Stadium = {
  id: "stadium-wembley-01",
  name: "Northgate Arena",
  location: {
    address: "1 Arena Way",
    city: "Manchester",
    country: "United Kingdom",
    coordinates: { latitude: 53.4808, longitude: -2.2426 },
  },
  capacity: 68_274,
  sections: [
    { id: "s-north", name: "North Stand", capacity: 17_068, type: "general" },
    { id: "s-south", name: "South Stand", capacity: 17_068, type: "general" },
    { id: "s-east", name: "East Stand", capacity: 12_500, type: "premium" },
    { id: "s-west", name: "West Stand", capacity: 12_500, type: "vip" },
    { id: "s-acc", name: "Access Zone", capacity: 1_138, type: "accessible" },
    { id: "s-stand", name: "Standing Terrace", capacity: 8_000, type: "standing" },
  ],
  amenities: ["Medical Centre", "Security HQ", "Media Centre", "VIP Lounge", "Food Court"],
  contactInfo: {
    phone: "+44 161 000 1234",
    email: "ops@northgatearena.co.uk",
    emergencyPhone: "+44 161 000 9999",
  },
  createdAt: new Date("2024-01-15"),
  updatedAt: new Date("2025-07-18"),
};

// ─── Crowd Status ─────────────────────────────────────────────────────────────

export interface SectionCrowdStatus {
  sectionId: string;
  sectionName: string;
  capacity: number;
  current: number;
  status: "normal" | "busy" | "full" | "critical";
}

export const MOCK_CROWD_STATUS: SectionCrowdStatus[] = [
  {
    sectionId: "s-north",
    sectionName: "North Stand",
    capacity: 17_068,
    current: 16_100,
    status: "full",
  },
  {
    sectionId: "s-south",
    sectionName: "South Stand",
    capacity: 17_068,
    current: 14_300,
    status: "busy",
  },
  {
    sectionId: "s-east",
    sectionName: "East Stand",
    capacity: 12_500,
    current: 9_800,
    status: "normal",
  },
  {
    sectionId: "s-west",
    sectionName: "West Stand",
    capacity: 12_500,
    current: 12_500,
    status: "critical",
  },
  {
    sectionId: "s-acc",
    sectionName: "Access Zone",
    capacity: 1_138,
    current: 412,
    status: "normal",
  },
  {
    sectionId: "s-stand",
    sectionName: "Standing Terrace",
    capacity: 8_000,
    current: 7_800,
    status: "full",
  },
];

// ─── Gates ────────────────────────────────────────────────────────────────────

export interface GateStatus {
  id: string;
  name: string;
  status: "open" | "closed" | "restricted";
  throughput: number; // people per minute
  queueLength: "none" | "short" | "medium" | "long";
}

export const MOCK_GATES: GateStatus[] = [
  {
    id: "gate-a",
    name: "Gate A — Main Entrance",
    status: "open",
    throughput: 320,
    queueLength: "long",
  },
  {
    id: "gate-b",
    name: "Gate B — North Wing",
    status: "open",
    throughput: 280,
    queueLength: "medium",
  },
  {
    id: "gate-c",
    name: "Gate C — South Wing",
    status: "open",
    throughput: 190,
    queueLength: "short",
  },
  {
    id: "gate-d",
    name: "Gate D — VIP Access",
    status: "restricted",
    throughput: 60,
    queueLength: "none",
  },
  {
    id: "gate-e",
    name: "Gate E — Staff Entry",
    status: "open",
    throughput: 45,
    queueLength: "none",
  },
  {
    id: "gate-f",
    name: "Gate F — East Exit",
    status: "closed",
    throughput: 0,
    queueLength: "none",
  },
];

// ─── Weather ──────────────────────────────────────────────────────────────────

export interface WeatherData {
  condition: "clear" | "cloudy" | "rain" | "storm" | "fog" | "snow";
  temperatureCelsius: number;
  feelsLikeCelsius: number;
  humidity: number;
  windSpeedKph: number;
  windDirection: string;
  visibility: "excellent" | "good" | "moderate" | "poor";
  uvIndex: number;
  operationalRisk: "low" | "moderate" | "high";
  updatedAt: Date;
}

export const MOCK_WEATHER: WeatherData = {
  condition: "cloudy",
  temperatureCelsius: 14,
  feelsLikeCelsius: 11,
  humidity: 72,
  windSpeedKph: 23,
  windDirection: "NW",
  visibility: "good",
  uvIndex: 2,
  operationalRisk: "low",
  updatedAt: new Date(),
};

// ─── Match ────────────────────────────────────────────────────────────────────

export const MOCK_MATCH: Match = {
  id: "match-2025-07-18-001",
  stadiumId: "stadium-wembley-01",
  title: "Northgate Derby — Semi Final",
  homeTeam: "City FC",
  awayTeam: "United AFC",
  sport: "Football",
  scheduledAt: new Date("2025-07-18T19:45:00"),
  expectedAttendance: 65_800,
  status: "live",
  createdAt: new Date("2025-07-01"),
  updatedAt: new Date("2025-07-18"),
};

// ─── Incidents ────────────────────────────────────────────────────────────────

export const MOCK_INCIDENTS: Incident[] = [
  {
    id: "inc-001",
    stadiumId: "stadium-wembley-01",
    matchId: "match-2025-07-18-001",
    title: "Medical Emergency — Spectator collapse",
    description: "Spectator reported unresponsive in Block N12. Medical team dispatched.",
    category: "medical",
    severity: "high",
    status: "in_progress",
    location: { section: "North Stand", description: "Block N12, Row 22", coordinates: null },
    reportedBy: "operator-jones",
    assignedTo: "medic-team-alpha",
    attachments: [],
    notes: ["Medic team arrived at 14:02. CPR in progress."],
    aiAnalysis: null,
    resolvedAt: null,
    createdAt: new Date(Date.now() - 12 * 60_000),
    updatedAt: new Date(Date.now() - 8 * 60_000),
  },
  {
    id: "inc-002",
    stadiumId: "stadium-wembley-01",
    matchId: "match-2025-07-18-001",
    title: "Crowd surge detected — West Stand",
    description: "Density sensors flagging dangerously high crowd pressure near Gate W3.",
    category: "crowd",
    severity: "critical",
    status: "open",
    location: { section: "West Stand", description: "Near Gate W3 entry", coordinates: null },
    reportedBy: "system",
    assignedTo: null,
    attachments: [],
    notes: [],
    aiAnalysis: null,
    resolvedAt: null,
    createdAt: new Date(Date.now() - 4 * 60_000),
    updatedAt: new Date(Date.now() - 4 * 60_000),
  },
  {
    id: "inc-003",
    stadiumId: "stadium-wembley-01",
    matchId: "match-2025-07-18-001",
    title: "Pitch invasion attempt",
    description: "Two supporters attempted to breach the pitch perimeter at South end.",
    category: "security",
    severity: "medium",
    status: "resolved",
    location: {
      section: "South Stand",
      description: "Pitch perimeter, south goal end",
      coordinates: null,
    },
    reportedBy: "security-cam-07",
    assignedTo: "security-team-bravo",
    attachments: ["https://storage.example.com/cam-07-snap.jpg"],
    notes: ["Individuals apprehended and escorted out."],
    aiAnalysis: null,
    resolvedAt: new Date(Date.now() - 25 * 60_000),
    createdAt: new Date(Date.now() - 32 * 60_000),
    updatedAt: new Date(Date.now() - 25 * 60_000),
  },
  {
    id: "inc-004",
    stadiumId: "stadium-wembley-01",
    matchId: "match-2025-07-18-001",
    title: "Food stall fire — Concourse Level 2",
    description:
      "Small fire reported at food stall F-14. Fire suppression activated automatically.",
    category: "infrastructure",
    severity: "high",
    status: "resolved",
    location: {
      section: "East Stand",
      description: "Concourse Level 2, Stall F-14",
      coordinates: null,
    },
    reportedBy: "fire-sensor-e2-14",
    assignedTo: "fire-team-charlie",
    attachments: [],
    notes: ["Fire contained to stall F-14. Smoke cleared. Safe to resume."],
    aiAnalysis: null,
    resolvedAt: new Date(Date.now() - 55 * 60_000),
    createdAt: new Date(Date.now() - 68 * 60_000),
    updatedAt: new Date(Date.now() - 55 * 60_000),
  },
];

// ─── Alerts ───────────────────────────────────────────────────────────────────

export const MOCK_ALERTS: Alert[] = [
  {
    id: "alert-001",
    stadiumId: "stadium-wembley-01",
    matchId: "match-2025-07-18-001",
    type: "security",
    title: "West Stand at critical capacity",
    message: "West Stand has reached 100% capacity. Gate closures may be necessary.",
    severity: "critical",
    isRead: false,
    createdBy: "system",
    createdAt: new Date(Date.now() - 3 * 60_000),
  },
  {
    id: "alert-002",
    stadiumId: "stadium-wembley-01",
    matchId: "match-2025-07-18-001",
    type: "medical",
    title: "Medical team requested — North Stand",
    message: "Paramedic team Alpha dispatched to Block N12.",
    severity: "high",
    isRead: true,
    createdBy: "user",
    createdAt: new Date(Date.now() - 12 * 60_000),
  },
  {
    id: "alert-003",
    stadiumId: "stadium-wembley-01",
    matchId: "match-2025-07-18-001",
    type: "operational",
    title: "Gate A throughput reduced",
    message: "Turnstile 3 at Gate A has malfunctioned. Throughput reduced by 30%.",
    severity: "medium",
    isRead: false,
    createdBy: "system",
    createdAt: new Date(Date.now() - 18 * 60_000),
  },
  {
    id: "alert-004",
    stadiumId: "stadium-wembley-01",
    matchId: "match-2025-07-18-001",
    type: "weather",
    title: "Wind advisory — Roof structures",
    message: "Wind gusts of 38 km/h forecast. Structural team notified for precautionary checks.",
    severity: "low",
    isRead: true,
    createdBy: "system",
    createdAt: new Date(Date.now() - 45 * 60_000),
  },
];

// ─── Operations Timeline ──────────────────────────────────────────────────────

export interface TimelineEvent {
  id: string;
  timestamp: Date;
  category: "incident" | "alert" | "operational" | "system";
  severity: "low" | "medium" | "high" | "critical" | "info";
  title: string;
  detail: string;
  actor: string;
}

export const MOCK_TIMELINE: TimelineEvent[] = [
  {
    id: "tl-001",
    timestamp: new Date(Date.now() - 3 * 60_000),
    category: "alert",
    severity: "critical",
    title: "West Stand capacity critical",
    detail: "Automated sensor triggered capacity alert at 100%.",
    actor: "System",
  },
  {
    id: "tl-002",
    timestamp: new Date(Date.now() - 4 * 60_000),
    category: "incident",
    severity: "critical",
    title: "Crowd surge — West Stand opened",
    detail: "Incident #INC-002 created. No responder assigned yet.",
    actor: "System",
  },
  {
    id: "tl-003",
    timestamp: new Date(Date.now() - 8 * 60_000),
    category: "incident",
    severity: "high",
    title: "Medical team dispatched",
    detail: "Medic Alpha en route to Block N12 for INC-001.",
    actor: "Operator Jones",
  },
  {
    id: "tl-004",
    timestamp: new Date(Date.now() - 12 * 60_000),
    category: "incident",
    severity: "high",
    title: "Medical emergency reported",
    detail: "Spectator collapse in North Stand Block N12.",
    actor: "Operator Jones",
  },
  {
    id: "tl-005",
    timestamp: new Date(Date.now() - 18 * 60_000),
    category: "alert",
    severity: "medium",
    title: "Gate A turnstile fault",
    detail: "Turnstile 3 fault detected. Maintenance notified.",
    actor: "System",
  },
  {
    id: "tl-006",
    timestamp: new Date(Date.now() - 25 * 60_000),
    category: "incident",
    severity: "medium",
    title: "Pitch invasion resolved",
    detail: "Security Team Bravo resolved INC-003. Two persons detained.",
    actor: "Security Bravo",
  },
  {
    id: "tl-007",
    timestamp: new Date(Date.now() - 45 * 60_000),
    category: "system",
    severity: "info",
    title: "Match kick-off confirmed",
    detail: "Match started 3 minutes late. All gates now closed to new entries.",
    actor: "System",
  },
  {
    id: "tl-008",
    timestamp: new Date(Date.now() - 55 * 60_000),
    category: "incident",
    severity: "high",
    title: "Concourse fire — suppressed",
    detail: "Fire suppression activated at Stall F-14. Incident INC-004 resolved.",
    actor: "Fire Team Charlie",
  },
  {
    id: "tl-009",
    timestamp: new Date(Date.now() - 90 * 60_000),
    category: "operational",
    severity: "info",
    title: "Gates opened",
    detail: "All public gates opened. Entry phase commenced.",
    actor: "System",
  },
];
