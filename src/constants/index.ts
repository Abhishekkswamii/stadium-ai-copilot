/**
 * Application-wide constants for Stadium AI Copilot.
 * Import these instead of using raw strings anywhere in the codebase.
 */

// ─── App Metadata ─────────────────────────────────────────────────────────────

export const APP_NAME = "Stadium AI Copilot" as const;
export const APP_DESCRIPTION = "AI-powered operations management for stadium events" as const;
export const APP_VERSION = "0.1.0" as const;

// ─── Routes ───────────────────────────────────────────────────────────────────

export const ROUTES = {
  // Public
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",

  // Dashboard
  DASHBOARD: "/dashboard",
  DASHBOARD_OVERVIEW: "/dashboard/overview",
  SIMULATOR: "/dashboard/simulator",

  // Stadium Operations
  INCIDENTS: "/dashboard/incidents",
  INCIDENT: (id: string) => `/dashboard/incidents/${id}` as const,
  ALERTS: "/dashboard/alerts",
  MATCHES: "/dashboard/matches",
  MATCH: (id: string) => `/dashboard/matches/${id}` as const,

  // Stadium Management
  STADIUMS: "/dashboard/stadiums",
  STADIUM: (id: string) => `/dashboard/stadiums/${id}` as const,

  // Settings
  SETTINGS: "/dashboard/settings",
  PROFILE: "/dashboard/settings/profile",

  // API
  API: {
    HEALTH: "/api/health",
    AUTH_SESSION: "/api/auth/session",
  },
} as const;

// ─── Firestore Collections ────────────────────────────────────────────────────

export const COLLECTIONS = {
  USERS: "users",
  STADIUMS: "stadiums",
  INCIDENTS: "incidents",
  ALERTS: "alerts",
  MATCHES: "matches",
} as const;

export type CollectionName = (typeof COLLECTIONS)[keyof typeof COLLECTIONS];

// ─── User Roles ───────────────────────────────────────────────────────────────

export const USER_ROLES = {
  ADMIN: "admin",
  MANAGER: "manager",
  OPERATOR: "operator",
  VIEWER: "viewer",
} as const;

export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];

// ─── Incident Severity ────────────────────────────────────────────────────────

export const INCIDENT_SEVERITY = {
  LOW: "low",
  MEDIUM: "medium",
  HIGH: "high",
  CRITICAL: "critical",
} as const;

export type IncidentSeverity = (typeof INCIDENT_SEVERITY)[keyof typeof INCIDENT_SEVERITY];

// ─── Incident Category ────────────────────────────────────────────────────────

export const INCIDENT_CATEGORY = {
  CROWD: "crowd",
  MEDICAL: "medical",
  SECURITY: "security",
  INFRASTRUCTURE: "infrastructure",
  TRANSPORTATION: "transportation",
  ACCESSIBILITY: "accessibility",
  FOOD: "food",
  WEATHER: "weather",
} as const;

export type IncidentCategory = (typeof INCIDENT_CATEGORY)[keyof typeof INCIDENT_CATEGORY];

// ─── Incident Status ──────────────────────────────────────────────────────────

export const INCIDENT_STATUS = {
  OPEN: "open",
  IN_PROGRESS: "in_progress",
  RESOLVED: "resolved",
  CLOSED: "closed",
} as const;

export type IncidentStatus = (typeof INCIDENT_STATUS)[keyof typeof INCIDENT_STATUS];

// ─── Alert Types ──────────────────────────────────────────────────────────────

export const ALERT_TYPE = {
  SAFETY: "safety",
  SECURITY: "security",
  MEDICAL: "medical",
  OPERATIONAL: "operational",
  WEATHER: "weather",
} as const;

export type AlertType = (typeof ALERT_TYPE)[keyof typeof ALERT_TYPE];

// ─── AI Models ────────────────────────────────────────────────────────────────

export const AI_MODELS = {
  /** Fast, cost-efficient — default for most operations */
  FLASH: "gemini-2.0-flash",
  /** More capable — for complex reasoning tasks */
  PRO: "gemini-2.5-pro",
} as const;

export type AIModel = (typeof AI_MODELS)[keyof typeof AI_MODELS];

// ─── Pagination ───────────────────────────────────────────────────────────────

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
} as const;

// ─── Session ──────────────────────────────────────────────────────────────────

export const SESSION_COOKIE_NAME = "__session" as const;
export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 14; // 14 days
