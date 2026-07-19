import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { generateJSON } from "@/lib/ai/gemini";

const requestSchema = z.object({
  incidentTitle: z.string(),
  description: z.string(),
  category: z.string(),
  severity: z.string(),
  location: z.string(),
  nearbyIncidents: z.string().optional(),
  crowdDensity: z.string().optional(),
  gateStatus: z.string().optional(),
  weather: z.string().optional(),
  matchStatus: z.string().optional(),
});

const responseSchema = z.object({
  summary: z.string(),
  rootCause: z.string(),
  operationalRisk: z.enum(["Low", "Medium", "High", "Critical"]),
  confidence: z.number().min(0).max(1),
  recommendedActions: z.array(z.string()),
  affectedAreas: z.array(z.string()),
  estimatedImpact: z.string(),
  reasoning: z.string(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as unknown;
    const parsed = requestSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const d = parsed.data;
    const prompt = `Analyze this stadium incident and return ONLY valid JSON.

INCIDENT:
Title: ${d.incidentTitle}
Description: ${d.description}
Category: ${d.category}
Severity: ${d.severity}
Location: ${d.location}

OPERATIONAL CONTEXT:
Nearby Active Incidents: ${d.nearbyIncidents ?? "None"}
Crowd Density: ${d.crowdDensity ?? "Unknown"}
Gate Status: ${d.gateStatus ?? "Unknown"}
Weather: ${d.weather ?? "Unknown"}
Match Status: ${d.matchStatus ?? "Unknown"}

Return ONLY this JSON (no markdown):
{
  "summary": "concise 1-2 sentence incident summary",
  "rootCause": "estimated root cause",
  "operationalRisk": "Low" or "Medium" or "High" or "Critical",
  "confidence": 0.0 to 1.0,
  "recommendedActions": ["action 1", "action 2", "action 3"],
  "affectedAreas": ["area 1", "area 2"],
  "estimatedImpact": "description of operational impact",
  "reasoning": "explanation of analysis"
}`;

    const json = await generateJSON(prompt);
    const result = responseSchema.safeParse(JSON.parse(json));

    if (!result.success) {
      return NextResponse.json({ error: "AI response validation failed" }, { status: 500 });
    }

    return NextResponse.json({ success: true, data: result.data });
  } catch (err) {
    const message = err instanceof Error ? err.message : "AI analysis failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
