import { type NextRequest, NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebase/admin";
import { SESSION_COOKIE_NAME, SESSION_MAX_AGE_SECONDS } from "@/constants";

/**
 * POST /api/auth/session
 * Creates a Firebase session cookie from an ID token.
 * Called client-side after a successful Firebase Auth sign-in.
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = (await request.json()) as unknown;

    if (
      typeof body !== "object" ||
      body === null ||
      !("idToken" in body) ||
      typeof (body as Record<string, unknown>)["idToken"] !== "string"
    ) {
      return NextResponse.json(
        { success: false, error: { code: "INVALID_REQUEST", message: "idToken is required." } },
        { status: 400 }
      );
    }

    const { idToken } = body as { idToken: string };

    // Create a session cookie that expires in SESSION_MAX_AGE_SECONDS
    const expiresIn = SESSION_MAX_AGE_SECONDS * 1000;
    const sessionCookie = await adminAuth.createSessionCookie(idToken, {
      expiresIn,
    });

    const response = NextResponse.json({ success: true });

    response.cookies.set(SESSION_COOKIE_NAME, sessionCookie, {
      maxAge: SESSION_MAX_AGE_SECONDS,
      httpOnly: true,
      secure: process.env["NODE_ENV"] === "production",
      sameSite: "lax",
      path: "/",
    });

    return response;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to create session.";
    return NextResponse.json(
      { success: false, error: { code: "SESSION_ERROR", message } },
      { status: 401 }
    );
  }
}

/**
 * DELETE /api/auth/session
 * Clears the session cookie (sign out).
 */
export function DELETE(): NextResponse {
  const response = NextResponse.json({ success: true });
  response.cookies.delete(SESSION_COOKIE_NAME);
  return response;
}
