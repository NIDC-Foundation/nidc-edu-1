// middleware.ts  — place this in the ROOT of your project
// ============================================================
// OKIA.COM — Role-Based Routing Middleware
// Stack: Next.js App Router + Supabase Auth + Arcjet
// ============================================================

import { createServerClient } from "@supabase/ssr";
import arcjet, { shield, slidingWindow } from "@arcjet/next";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// ============================================================
// ARCJET — Rate limiting & bot protection
// ============================================================
const aj = arcjet({
  key: process.env.ARCJET_KEY!,
  rules: [
    // Block bots on sensitive routes
    shield({ mode: "LIVE" }),
    // 20 requests per minute per IP
    slidingWindow({ mode: "LIVE", interval: "1m", max: 20 }),
  ],
});

// ============================================================
// ROUTE DEFINITIONS
// ============================================================

// Routes that require authentication
const PROTECTED_ROUTES = ["/student", "/donor", "/university", "/admin"];

// Routes only accessible when NOT logged in
const AUTH_ROUTES = ["/login", "/register"];

// Routes that are rate-limited by Arcjet
const RATE_LIMITED_ROUTES = [
  "/login",
  "/register",
  "/apply",
  "/donate",
  "/api/",
];

// Where each role lands after login
const ROLE_REDIRECTS: Record<string, string> = {
  student: "/student/dashboard",
  donor: "/donor/dashboard",
  university: "/university/dashboard",
  admin: "/admin/dashboard",
};

// ============================================================
// MIDDLEWARE
// ============================================================

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  let response = NextResponse.next({
    request: { headers: request.headers },
  });

  // ----------------------------------------------------------
  // 1. ARCJET — Apply rate limiting to sensitive routes
  // ----------------------------------------------------------
  const isRateLimited = RATE_LIMITED_ROUTES.some((route) =>
    pathname.startsWith(route)
  );

  if (isRateLimited) {
    const decision = await aj.protect(request);

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        return NextResponse.json(
          { error: "Too many requests. Please slow down." },
          { status: 429 }
        );
      }
      if (decision.reason.isBot()) {
        return NextResponse.json(
          { error: "Bot activity detected." },
          { status: 403 }
        );
      }
      return NextResponse.json({ error: "Forbidden." }, { status: 403 });
    }
  }

  // ----------------------------------------------------------
  // 2. SUPABASE — Refresh session
  // ----------------------------------------------------------
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // ----------------------------------------------------------
  // 3. AUTH ROUTES — Redirect logged-in users away from login/register
  // ----------------------------------------------------------
  const isAuthRoute = AUTH_ROUTES.some((route) => pathname.startsWith(route));

  if (isAuthRoute && user) {
    // Fetch role from profiles table
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    const redirectTo = profile?.role
      ? ROLE_REDIRECTS[profile.role]
      : "/student/dashboard";

    return NextResponse.redirect(new URL(redirectTo, request.url));
  }

  // ----------------------------------------------------------
  // 4. PROTECTED ROUTES — Redirect unauthenticated users to login
  // ----------------------------------------------------------
  const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
    pathname.startsWith(route)
  );

  if (isProtectedRoute && !user) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirectTo", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // ----------------------------------------------------------
  // 5. ROLE ENFORCEMENT — Prevent users accessing wrong dashboards
  // ----------------------------------------------------------
  if (isProtectedRoute && user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    const role = profile?.role;

    // Map route prefixes to required roles
    const roleGuards: Record<string, string> = {
      "/admin": "admin",
      "/university": "university",
      "/donor": "donor",
      "/student": "student",
    };

    for (const [routePrefix, requiredRole] of Object.entries(roleGuards)) {
      if (pathname.startsWith(routePrefix) && role !== requiredRole) {
        // Redirect to their correct dashboard
        const correctDashboard = role ? ROLE_REDIRECTS[role] : "/login";
        return NextResponse.redirect(new URL(correctDashboard, request.url));
      }
    }
  }

  return response;
}

// ============================================================
// MATCHER — Which routes this middleware runs on
// ============================================================
export const config = {
  matcher: [
    /*
     * Run on all routes EXCEPT:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico
     * - public files (images, fonts, etc.)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
