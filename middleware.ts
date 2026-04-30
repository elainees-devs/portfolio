import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

/**
 * Routes that should NOT require authentication
 */
const PUBLIC_ROUTES = [
  "/",
  "/projects",
  "/experience",
  "/login",
];

/**
 * API routes that must always be accessible (Auth.js handles them)
 */
const AUTH_ROUTES = ["/api/auth"];

/**
 * Middleware runs on every request
 */
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Allow Auth.js endpoints to work normally
  if (AUTH_ROUTES.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // Allow public routes
  if (PUBLIC_ROUTES.includes(pathname)) {
    return NextResponse.next();
  }

  // Protect admin routes
  const isAdminRoute = pathname.startsWith("/admin");

  if (isAdminRoute) {
    const token = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });

    // If no session → redirect to login
    if (!token) {
      const loginUrl = new URL("/login", req.url);
      loginUrl.searchParams.set("callbackUrl", pathname);

      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

/**
 * Matcher config: only run middleware on relevant routes
 */
export const config = {
  matcher: [
    "/admin/:path*",
    "/login",
  ],
};