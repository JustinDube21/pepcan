import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const protectedRoutes = ["/account"];
const authRoutes = ["/account/login", "/account/register"];

function isProtectedAccountRoute(pathname: string) {
  return protectedRoutes.some((route) => pathname === route || pathname.startsWith(`${route}/`));
}

function isAuthRoute(pathname: string) {
  return authRoutes.some((route) => pathname === route || pathname.startsWith(`${route}/`));
}

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return response;
  }

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) => {
          response.cookies.set(name, value, options);
        });
      },
    },
  });

  const { data, error } = await supabase.auth.getClaims();
  const isAuthenticated = Boolean(data?.claims && !error);

  const { pathname } = request.nextUrl;

  if (isProtectedAccountRoute(pathname) && !isAuthRoute(pathname) && !isAuthenticated) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/account/login";
    redirectUrl.searchParams.set("redirectedFrom", pathname);
    return NextResponse.redirect(redirectUrl);
  }

  if (isAuthRoute(pathname) && isAuthenticated) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/account";
    redirectUrl.search = "";
    return NextResponse.redirect(redirectUrl);
  }

  return response;
}
