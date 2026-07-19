import type {
  IncidentSeverity,
  IncidentStatus,
  IncidentCategory,
  AlertType,
  UserRole,
} from "@/constants";

// ─── Auth & User ──────────────────────────────────────────────────────────────

export interface User {
  uid: string;
  email: string;
  displayName: string | null;
  photoURL: string | null;
  role: UserRole;
  stadiumId: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthSession {
  uid: string;
  email: string;
  role: UserRole;
  stadiumId: string | null;
}

// ─── Stadium ──────────────────────────────────────────────────────────────────

export interface AIOperationsBriefing {
  overallStatus: "Normal" | "Elevated" | "High Risk";
  executiveSummary: string;
  topRisks: string[];
  recommendedActions: string[];
  resourceSuggestions: string[];
  operationalScore: number;
  confidence: number;
  generatedAt: Date;
}

export interface AISimulationResult {
  summary: string;
  operationalRisk: "Low" | "Medium" | "High" | "Critical";
  expectedImpacts: string[];
  recommendedActions: string[];
  estimatedRecoveryTime: string;
  confidence: number;
}

export interface Stadium {
  id: string;
  name: string;
  location: StadiumLocation;
  capacity: number;
  sections: StadiumSection[];
  amenities: string[];
  contactInfo: ContactInfo;
  aiBriefing?: AIOperationsBriefing | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface StadiumLocation {
  address: string;
  city: string;
  country: string;
  coordinates: GeoCoordinates;
}

export interface GeoCoordinates {
  latitude: number;
  longitude: number;
}

export interface StadiumSection {
  id: string;
  name: string;
  capacity: number;
  type: "general" | "vip" | "premium" | "standing" | "accessible";
}

export interface ContactInfo {
  phone: string;
  email: string;
  emergencyPhone: string;
}

// ─── Match / Event ────────────────────────────────────────────────────────────

export interface Match {
  id: string;
  stadiumId: string;
  title: string;
  homeTeam: string;
  awayTeam: string | null;
  sport: string;
  scheduledAt: Date;
  expectedAttendance: number;
  status: MatchStatus;
  createdAt: Date;
  updatedAt: Date;
}

export type MatchStatus = "scheduled" | "live" | "completed" | "postponed" | "cancelled";

// ─── Incidents ────────────────────────────────────────────────────────────────

export interface Incident {
  id: string;
  stadiumId: string;
  matchId: string | null;
  title: string;
  description: string;
  category: IncidentCategory;
  severity: IncidentSeverity;
  status: IncidentStatus;
  location: IncidentLocation;
  reportedBy: string;
  assignedTo: string | null;
  attachments: string[]; // URLs or metadata
  notes: string[];
  aiAnalysis: AIAnalysis | null;
  resolvedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface IncidentLocation {
  section: string;
  description: string;
  coordinates: GeoCoordinates | null;
}

// ─── Alerts ───────────────────────────────────────────────────────────────────

export interface Alert {
  id: string;
  stadiumId: string;
  matchId: string | null;
  type: AlertType;
  title: string;
  message: string;
  severity: IncidentSeverity;
  isRead: boolean;
  createdBy: "system" | "user";
  createdAt: Date;
}

// ─── AI ───────────────────────────────────────────────────────────────────────

export interface AIAnalysis {
  summary: string;
  rootCause: string;
  operationalRisk: "Low" | "Medium" | "High" | "Critical";
  confidence: number;
  recommendedActions: string[];
  affectedAreas: string[];
  estimatedImpact: string;
  reasoning: string;
  generatedAt: Date;
  modelUsed: string;
}

export interface AIMessage {
  role: "user" | "model";
  content: string;
  timestamp: Date;
}

// ─── API ──────────────────────────────────────────────────────────────────────

export interface ApiResponse<T> {
  success: true;
  data: T;
}

export interface ApiError {
  success: false;
  error: {
    code: string;
    message: string;
  };
}

export type ApiResult<T> = ApiResponse<T> | ApiError;

// ─── Pagination ───────────────────────────────────────────────────────────────

export interface PaginatedResult<T> {
  items: T[];
  total: number;
  hasMore: boolean;
  cursor: string | null;
}

// ─── Re-exports (convenience) ─────────────────────────────────────────────────

export type { UserRole, IncidentSeverity, IncidentStatus, IncidentCategory, AlertType };
