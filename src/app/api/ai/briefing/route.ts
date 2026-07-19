import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { generateJSON } from "@/lib/ai/gemini";

const requestSchema = z.object({
  activeIncidents: z.string(),
  crowdDensity: z.string(),
  gateStatus: z.string(),
  weather: z.string(),
  matchStatus: z.string(),
  unresolvedAlerts: z.string(),
});

const responseSchema = z.object({
  overallStatus: z.enum(["Normal", "Elevated", "High Risk"]),
  executiveSummary: z.string(),
  topRisks: z.array(z.string()),
  recommendedActions: z.array(z.string()),
  resourceSuggestions: z.array(z.string()),
  operationalScore: z.number().min(0).max(100),
  confidence: z.number().min(0).max(1),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as unknown;
    const parsed = requestSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const d = parsed.data;
    const prompt = `Generate an AI Stadium Operations Briefing. Return ONLY valid JSON.

LIVE OPERATIONAL CONTEXT:
Active Incidents: ${d.activeIncidents}
Crowd Density: ${d.crowdDensity}
Gate Status: ${d.gateStatus}
Weather: ${d.weather}
Match Status: ${d.matchStatus}
Unresolved Alerts: ${d.unresolvedAlerts}

Return ONLY this JSON (no markdown):
{
  "overallStatus": "Normal" or "Elevated" or "High Risk",
  "executiveSummary": "2-3 sentence high-level summary of current stadium operations",
  "topRisks": ["risk 1", "risk 2", "risk 3"],
  "recommendedActions": ["action 1", "action 2", "action 3"],
  "resourceSuggestions": ["suggestion 1", "suggestion 2"],
  "operationalScore": 0-100 (100 = perfect operations),
  "confidence": 0.0-1.0
}`;

    const json = await generateJSON(prompt);
    const result = responseSchema.safeParse(JSON.parse(json));

    if (!result.success) {
      return NextResponse.json({ error: "AI response validation failed" }, { status: 500 });
    }

    return NextResponse.json({ success: true, data: result.data });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Briefing generation failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
