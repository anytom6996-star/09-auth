import { NextResponse, type NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { parseSetCookie } from 'cookie';

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

  const cookieStore = await cookies();

  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;

  let isAuthenticated = false;
  let sessionResponse = null;

  // Якщо accessToken є — сесія вважається валідною.
  if (accessToken) {
    isAuthenticated = true;
  }
  // Якщо accessToken немає, але є refreshToken —
  // пробуємо оновити сесію.
  else if (refreshToken) {
    try {
      sessionResponse = await checkSession();
      isAuthenticated = sessionResponse.status === 200;
    } catch {
      isAuthenticated = false;
    }
  }

  // Створюємо response до редіректів,
  // щоб мати можливість встановити оновлені cookies.
  const response = NextResponse.next();

  // Якщо checkSession повернув нові cookies,
  // переносимо їх у response.
  const setCookie = sessionResponse?.headers['set-cookie'];

  if (setCookie) {
    const cookieArray = Array.isArray(setCookie)
      ? setCookie
      : [setCookie];

    cookieArray.forEach(cookieString => {
      const parsed = parseSetCookie(cookieString);

      if (!parsed || !parsed.value) {
        return;
      }

      const { name, value, ...options } = parsed;

      response.cookies.set({
        name,
        value,
        ...options,
      });
    });
  }

  // Приватний маршрут без авторизації → sign-in
  if (isPrivateRoute && !isAuthenticated) {
    return NextResponse.redirect(
      new URL('/sign-in', request.url),
    );
  }

  // Авторизований користувач не може зайти на sign-in/sign-up
  if (isPublicRoute && isAuthenticated) {
    return NextResponse.redirect(
      new URL('/', request.url),
    );
  }

  return response;
}

export const config = {
  matcher: [
    '/profile/:path*',
    '/notes/:path*',
    '/sign-in',
    '/sign-up',
  ],
};