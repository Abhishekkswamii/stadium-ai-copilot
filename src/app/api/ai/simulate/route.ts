import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { generateJSON } from "@/lib/ai/gemini";

const requestSchema = z.object({
  scenario: z.string(),
  currentContext: z.string(),
});

const responseSchema = z.object({
  summary: z.string(),
  operationalRisk: z.enum(["Low", "Medium", "High", "Critical"]),
  expectedImpacts: z.array(z.string()),
  recommendedActions: z.array(z.string()),
  estimatedRecoveryTime: z.string(),
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
    const prompt = `Simulate the operational impact of a stadium scenario. Return ONLY valid JSON.

SCENARIO: ${d.scenario}

CURRENT STADIUM CONTEXT:
${d.currentContext}

Analyze how this scenario would impact stadium operations and return ONLY this JSON (no markdown):
{
  "summary": "2-3 sentence summary of the simulated scenario impact",
  "operationalRisk": "Low" or "Medium" or "High" or "Critical",
  "expectedImpacts": ["impact 1", "impact 2", "impact 3"],
  "recommendedActions": ["action 1", "action 2", "action 3"],
  "estimatedRecoveryTime": "e.g. 15-30 minutes",
  "confidence": 0.0-1.0
}`;

    const json = await generateJSON(prompt);
    const result = responseSchema.safeParse(JSON.parse(json));

    if (!result.success) {
      return NextResponse.json({ error: "AI response validation failed" }, { status: 500 });
    }

    return NextResponse.json({ success: true, data: result.data });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Simulation failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
