import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return NextResponse.next({ request });
  }

  let supabaseResponse = NextResponse.next({ request });

  const { pathname } = request.nextUrl;
  const isProtectedRoute =
    pathname.startsWith("/onboarding") ||
    pathname.startsWith("/complete") ||
    pathname.startsWith("/portal") ||
    pathname.startsWith("/resume") ||
    pathname.startsWith("/agency");

  if (!isProtectedRoute) {
    return NextResponse.next({ request });
  }

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() { return request.cookies.getAll(); },
        setAll(cookiesToSet: { name: string; value: string; options?: Record<string, unknown> }[]) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Use getSession() instead of getUser() — reads JWT from cookie locally,
  // no network round-trip to Supabase, so it never triggers a middleware timeout.
  // (getUser() hits the Supabase auth server on every request and causes
  //  504 MIDDLEWARE_INVOCATION_TIMEOUT on Vercel Edge.)
  let session = null;
  try {
    const { data } = await supabase.auth.getSession();
    session = data?.session ?? null;
  } catch (error) {
    console.error("Middleware auth failed:", error);
  }

  if (isProtectedRoute && !session) {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }
  // Agency email check is enforced in src/app/agency/layout.tsx (server component)
  // — not here, because Edge middleware cannot reliably read non-NEXT_PUBLIC_ env vars.

  return supabaseResponse;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
