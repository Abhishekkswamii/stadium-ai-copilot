import { type NextRequest, NextResponse } from "next/server";
import { ROUTES, SESSION_COOKIE_NAME } from "@/constants";

/**
 * Next.js Edge Middleware.
 *
 * Runs on every matched request before it reaches the page.
 * Guards protected routes by checking for the presence of the session cookie.
 *
 * Note: Full session verification (verifySessionCookie) happens in the
 * dashboard layout server component using Firebase Admin SDK.
 * Middleware only checks cookie presence for fast edge redirects.
 */
export function middleware(request: NextRequest): NextResponse {
  const { pathname } = request.nextUrl;
  const sessionCookie = request.cookies.get(SESSION_COOKIE_NAME);

  const isAuthRoute = pathname.startsWith("/login") || pathname.startsWith("/register");
  const isPublicRoute = pathname.startsWith("/api/health");

  // Redirect authenticated users away from auth pages
  if (isAuthRoute && sessionCookie) {
    return NextResponse.redirect(new URL(ROUTES.DASHBOARD, request.url));
  }

  // Redirect unauthenticated users to login for protected routes
  if (!isAuthRoute && !isPublicRoute && !sessionCookie) {
    const loginUrl = new URL(ROUTES.LOGIN, request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Add security headers to all responses
  const response = NextResponse.next();
  response.headers.set("X-Robots-Tag", "noindex, nofollow");

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all paths except:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico
     * - Public assets
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
