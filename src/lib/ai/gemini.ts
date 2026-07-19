import "server-only";
import { GoogleGenAI } from "@google/genai";
import { env } from "@/env";

/**
 * Gemini AI client — server-only.
 * Uses Google AI Studio API key (GEMINI_API_KEY).
 */
export const gemini = new GoogleGenAI({ apiKey: env.GEMINI_API_KEY });

export const GEMINI_MODEL = "gemini-2.5-flash-lite-preview-06-17";

/**
 * Generate content and extract clean JSON from the response.
 * Strips markdown code fences if present.
 */
export async function generateJSON(prompt: string): Promise<string> {
  const response = await gemini.models.generateContent({
    model: GEMINI_MODEL,
    contents: [{ role: "user", parts: [{ text: prompt }] }],
    config: { temperature: 0.2, maxOutputTokens: 1024 },
  });

  const raw = response.text ?? "";
  return raw
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```\s*$/i, "")
    .trim();
}
