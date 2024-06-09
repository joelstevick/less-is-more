import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { parse } from 'cookie';

const authCookieName = `sb-${process.env.NEXT_PUBLIC_PROJECT_ID}-auth-token`;

export function middleware(request: NextRequest) {
  const cookies = request.headers.get('cookie');
  const parsedCookies = cookies ? parse(cookies) : {};

  const accessToken = parsedCookies[authCookieName];
  const refreshToken = parsedCookies[`${authCookieName}-refresh-token`];

  if (accessToken && refreshToken) {
    console.log('User is authenticated');
  } else {
    console.log('User is not authenticated');
  }

  return NextResponse.next();
}

// Specify paths where the middleware should run
export const config = {
  matcher: ['/', '/protected/:path*'], // Add paths you want to protect or log
};
