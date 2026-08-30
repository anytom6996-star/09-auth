import { NextRequest, NextResponse } from 'next/server';

export function proxy(request: NextRequest) {
  const token = request.cookies.get('auth-token')?.value;

  const pathname = request.nextUrl.pathname;

  const protectedRoutes = ['/profile'];

  const isProtectedRoute = protectedRoutes.some(route =>
    pathname.startsWith(route),
  );

  if (isProtectedRoute && !token) {
    return NextResponse.redirect(
      new URL('/login', request.url),
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/profile/:path*'],
};