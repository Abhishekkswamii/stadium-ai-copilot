import { type NextRequest, NextResponse } from "next/server";
import { APP_NAME, APP_VERSION } from "@/constants";

/**
 * Health check endpoint.
 * Used by load balancers, uptime monitors, and CI smoke tests.
 */
export function GET(_request: NextRequest): NextResponse {
  return NextResponse.json({
    status: "ok",
    app: APP_NAME,
    version: APP_VERSION,
    timestamp: new Date().toISOString(),
    environment: process.env["NODE_ENV"] ?? "unknown",
  });
}
