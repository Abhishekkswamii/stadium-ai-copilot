import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

/**
 * Validated environment variables for Stadium AI Copilot.
 * Validated at startup — missing vars throw immediately, not lazily.
 *
 * Client vars: NEXT_PUBLIC_* prefix (bundled to browser)
 * Server vars: no prefix (server-only, never sent to browser)
 */
export const env = createEnv({
  /**
   * Server-side environment variables (never exposed to client).
   */
  server: {
    NODE_ENV: z.enum(["development", "test", "production"]).default("development"),

    // Firebase Admin — one of these must be set in production
    FIREBASE_SERVICE_ACCOUNT_B64: z.string().optional(),
    GOOGLE_APPLICATION_CREDENTIALS: z.string().optional(),

    // Gemini AI (Google AI Studio)
    GEMINI_API_KEY: z.string().min(1),
  },

  /**
   * Client-side environment variables (bundled, visible in browser).
   * Only Firebase Web SDK config goes here — never secrets.
   */
  client: {
    NEXT_PUBLIC_FIREBASE_API_KEY: z.string().min(1),
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: z.string().min(1),
    NEXT_PUBLIC_FIREBASE_PROJECT_ID: z.string().min(1),
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: z.string().min(1),
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: z.string().min(1),
    NEXT_PUBLIC_FIREBASE_APP_ID: z.string().min(1),
    NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID: z.string().optional(),
    NEXT_PUBLIC_APP_URL: z.string().url().default("http://localhost:3000"),
  },

  /**
   * Destructure from process.env — required by t3-env.
   */
  runtimeEnv: {
    NODE_ENV: process.env["NODE_ENV"],
    FIREBASE_SERVICE_ACCOUNT_B64: process.env["FIREBASE_SERVICE_ACCOUNT_B64"],
    GOOGLE_APPLICATION_CREDENTIALS: process.env["GOOGLE_APPLICATION_CREDENTIALS"],
    GEMINI_API_KEY: process.env["GEMINI_API_KEY"],
    NEXT_PUBLIC_FIREBASE_API_KEY: process.env["NEXT_PUBLIC_FIREBASE_API_KEY"],
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: process.env["NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN"],
    NEXT_PUBLIC_FIREBASE_PROJECT_ID: process.env["NEXT_PUBLIC_FIREBASE_PROJECT_ID"],
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: process.env["NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET"],
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID:
      process.env["NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID"],
    NEXT_PUBLIC_FIREBASE_APP_ID: process.env["NEXT_PUBLIC_FIREBASE_APP_ID"],
    NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID: process.env["NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID"],
    NEXT_PUBLIC_APP_URL: process.env["NEXT_PUBLIC_APP_URL"],
  },

  /**
   * Skip validation during build (CI may not have all vars).
   * Set SKIP_ENV_VALIDATION=true in your CI environment.
   */
  skipValidation: !!process.env["SKIP_ENV_VALIDATION"],

  /**
   * Treat empty strings as undefined — prevents silent misconfigurations.
   */
  emptyStringAsUndefined: true,
});
