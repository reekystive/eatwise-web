import { NextRequest, NextResponse } from 'next/server';
import { appConfig } from '@/constants/config';
import { verifyToken } from '@/utils/auth/jwt';
import { Routes } from './types/routes';

const protectedRoutes: Routes[] = ['/profile'];
const publicRoutes: Routes[] = ['/auth/login', '/auth/register'];

export const middleware = (request: NextRequest) => {
  const response = authMiddleware(request);
  return response;
};

export const authMiddleware = (request: NextRequest) => {
  const { pathname } = request.nextUrl;
  const sessionToken = request.cookies.get(appConfig.TOKEN_NAME)?.value;
  let isAuthenticated = false;

  if (sessionToken) {
    const payload = verifyToken(sessionToken);
    isAuthenticated = Boolean(payload);
  }

  if (protectedRoutes.some((route) => pathname.startsWith(route)) && !isAuthenticated) {
    const url = new URL('/auth/login', request.url);
    url.searchParams.set('redirect', pathname);
    return NextResponse.redirect(url);
  }

  if (publicRoutes.some((route) => pathname.startsWith(route)) && isAuthenticated) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: [...protectedRoutes, ...publicRoutes],
};
