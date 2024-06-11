import { type NextRequest } from 'next/server'
import { updateSession } from '@/app/utils/supabase/middleware'
import { cookies } from 'next/headers';

const protectedRoutes = ['/', '/history']

export async function middleware(request: NextRequest) {

  const pathName = request.nextUrl.pathname;

  await updateSession(request)

  const cookieStore = cookies();
  const authToken = cookieStore.get(
    `sb-${process.env.NEXT_PUBLIC_PROJECT_ID}-auth-token`,
  );

  const isAuthenticated = !!authToken?.value

  if (!isAuthenticated && protectedRoutes.some(route => route === pathName)) {
    return Response.redirect(new URL('/login', request.url))
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}