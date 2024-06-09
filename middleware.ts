import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { parse } from "cookie";

const authCookieName = `sb-${process.env.NEXT_PUBLIC_PROJECT_ID}-auth-token`;

const protectedRoutes = ["/history"];

export function middleware(request: NextRequest) {
  console.log("XXX");

  const cookies = request.headers.get("cookie");

  if (!cookies) {
    console.log('No cookies found');
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const parsedCookies = parse(cookies);
    const accessToken = parsedCookies[authCookieName];

    if (!accessToken) {
      for (const path of protectedRoutes) {
        if (request.nextUrl.pathname.startsWith(path)) {
          return NextResponse.redirect(new URL(path, request.url));
        }
      }
      return NextResponse.redirect(new URL("/login", request.url));
    } else {
      console.log('User is authenticated');
      return NextResponse.next();
    }
  } catch (error) {
    console.error('Failed to parse cookies:', error);
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

// Specify paths where the middleware should run
export const config = {
  matcher: ["/", "/protected/:path*"], // Add paths you want to protect or log
};
