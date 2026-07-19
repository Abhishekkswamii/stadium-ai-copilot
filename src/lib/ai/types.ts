import "server-only";

import { z } from "zod";
import { AI_MODELS } from "@/constants";

/**
 * TypeScript types specific to the AI layer.
 * Zod schemas for validating every AI JSON response.
 */

// ─── AI Model Config ───────────────────────────────────────────────────────────

export const AI_TEMPERATURE = {
  DETERMINISTIC: 0.1,
  STRUCTURED: 0.2,
  BALANCED: 0.4,
  CREATIVE: 0.7,
} as const;

export type AITemperature = (typeof AI_TEMPERATURE)[keyof typeof AI_TEMPERATURE];

// ─── Incident Analysis Response Schema ────────────────────────────────────────

export const incidentAnalysisSchema = z.object({
  summary: z.string().min(1).max(500),
  riskLevel: z.enum(["low", "medium", "high", "critical"]),
  recommendedActions: z.array(z.string().min(1).max(300)).min(1).max(10),
  estimatedResolutionTime: z.string().nullable(),
  confidence: z.number().min(0).max(1),
  escalationRequired: z.boolean(),
});

export type IncidentAnalysisResponse = z.infer<typeof incidentAnalysisSchema>;

// ─── Alert Summary Response Schema ────────────────────────────────────────────

export const alertSummarySchema = z.object({
  briefing: z.string().min(1).max(800),
  priorityAlerts: z.array(z.string()).min(1).max(5),
  recommendedFocus: z.string().min(1).max(300),
});

export type AlertSummaryResponse = z.infer<typeof alertSummarySchema>;

// ─── Match Briefing Response Schema ───────────────────────────────────────────

export const matchBriefingSchema = z.object({
  operationalStatus: z.enum(["green", "amber", "red"]),
  briefing: z.string().min(1).max(1000),
  keyRisks: z.array(z.string()).min(1).max(5),
  staffingRecommendations: z.array(z.string()).min(1).max(5),
  crowdManagementNotes: z.string().min(1).max(500),
});

export type MatchBriefingResponse = z.infer<typeof matchBriefingSchema>;

// ─── Validation Helper ────────────────────────────────────────────────────────

import { AIError } from "@/lib/utils/errors";

/**
 * Validates AI JSON output against a Zod schema.
 * Throws AIError if validation fails — prevents bad AI data from entering the system.
 */
export function validateAIResponse<T>(
  schema: z.ZodType<T>,
  data: unknown,
  context = "AI response"
): T {
  const result = schema.safeParse(data);
  if (!result.success) {
    const issues = result.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join(", ");
    throw new AIError(`Invalid ${context}: ${issues}`, "AI_VALIDATION_ERROR");
  }
  return result.data;
}

// ─── Re-exports ───────────────────────────────────────────────────────────────

export { AI_MODELS };
