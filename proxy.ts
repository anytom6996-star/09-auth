import { NextRequest, NextResponse } from 'next/server';

import { checkSession } from '@/lib/api/serverApi';

const privateRoutes = ['/profile', '/notes'];
const authRoutes = ['/sign-in', '/sign-up'];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isPrivateRoute = privateRoutes.some(
    route =>
      pathname === route || pathname.startsWith(`${route}/`),
  );

  const isAuthRoute = authRoutes.some(
    route =>
      pathname === route || pathname.startsWith(`${route}/`),
  );

  if (!isPrivateRoute && !isAuthRoute) {
    return NextResponse.next();
  }

  const accessToken = request.cookies.get('accessToken')?.value;
  const refreshToken = request.cookies.get('refreshToken')?.value;

  let isAuthenticated = Boolean(accessToken);

  if (!accessToken && refreshToken) {
    isAuthenticated = await checkSession();
  }

  if (isPrivateRoute && !isAuthenticated) {
    return NextResponse.redirect(
      new URL('/sign-in', request.url),
    );
  }

  if (isAuthRoute && isAuthenticated) {
    return NextResponse.redirect(
      new URL('/profile', request.url),
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/profile/:path*',
    '/notes/:path*',
    '/sign-in',
    '/sign-up',
  ],
};