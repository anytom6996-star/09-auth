import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { checkSession } from '@/lib/api/serverApi';

const privateRoutes = ['/profile', '/notes'];
const publicRoutes = ['/sign-in', '/sign-up'];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isPrivateRoute = privateRoutes.some(route =>
    pathname.startsWith(route),
  );

  const isPublicRoute = publicRoutes.some(route =>
    pathname.startsWith(route),
  );

  if (!isPrivateRoute && !isPublicRoute) {
    return NextResponse.next();
  }

  const accessToken = request.cookies.get('accessToken')?.value;
  const refreshToken = request.cookies.get('refreshToken')?.value;

  let isAuthenticated = false;
  let sessionResponse = null;

  if (accessToken || refreshToken) {
    try {
      sessionResponse = await checkSession();
      isAuthenticated = sessionResponse.status === 200;
    } catch {
      isAuthenticated = false;
    }
  }

  if (isPrivateRoute && !isAuthenticated) {
    const url = request.nextUrl.clone();
    url.pathname = '/sign-in';

    return NextResponse.redirect(url);
  }

  if (isPublicRoute && isAuthenticated) {
    const url = request.nextUrl.clone();
    url.pathname = '/profile';

    return NextResponse.redirect(url);
  }

  const response = NextResponse.next();

  const setCookie = sessionResponse?.headers['set-cookie'];

  if (setCookie) {
    setCookie.forEach(cookie => {
      const [nameValue, ...attributes] = cookie.split('; ');
      const [name, ...valueParts] = nameValue.split('=');

      response.cookies.set({
        name,
        value: valueParts.join('='),
        ...Object.fromEntries(
          attributes.map(attribute => {
            const [key, ...value] = attribute.split('=');

            return [
              key.toLowerCase(),
              value.length ? value.join('=') : true,
            ];
          }),
        ),
      });
    });
  }

  return response;
}

export const config = {
  matcher: ['/profile/:path*', '/notes/:path*', '/sign-in', '/sign-up'],
};