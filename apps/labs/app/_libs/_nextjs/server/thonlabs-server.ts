import { NextRequest, NextResponse } from 'next/server';
import ServerSessionService from '../services/server-session-service';

export function isAuthRoute(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const publicRoutes = [
    '/api/auth/logout',
    '/api/auth/refresh',
    '/api/auth/magic',
    '/auth/login',
    '/auth/sign-up',
    '/auth/magic',
    '/auth/reset-password',
  ];
  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route),
  );

  return isPublicRoute;
}

export function bypassRoutes(req: NextRequest, routes: string[]) {
  const pathname = req.nextUrl.pathname;
  const shouldBypass = routes.some((route) => pathname.startsWith(route));

  return shouldBypass;
}

export async function validateSession(req: NextRequest) {
  const isPublicRoute = isAuthRoute(req);

  if (!isPublicRoute) {
    console.log(`Accessing route ${req.nextUrl.pathname}`);
    const { accessToken, refreshToken, keepAlive } =
      ServerSessionService.getSessionCookies();

    // Validates the access token or access token and refresh token
    // based on keep alive
    if (
      (!keepAlive && !accessToken) ||
      (keepAlive && !accessToken && !refreshToken)
    ) {
      console.log('ThonLabs Validate Session: Invalid session');
      return NextResponse.redirect(new URL('/api/auth/logout', req.url));
    }

    const isPageRefresh = req.headers.get('referer') === req.url;

    if (isPageRefresh) {
      // Validates the session status and redirects to regenerate
      // a new token in case of need
      const { status } = await ServerSessionService.shouldKeepAlive();

      if (status === 'invalid_session') {
        console.log(
          'ThonLabs Validate Session: Invalid session from keep alive',
          status,
        );

        return NextResponse.redirect(new URL('/api/auth/logout', req.url));
      } else if (status === 'needs_refresh') {
        console.log(
          'ThonLabs Validate Session: Needs refresh from keep alive',
          status,
        );

        const { pathname } = new URL(req.url);

        return NextResponse.redirect(
          new URL(`/api/auth/refresh?dest=${pathname}`, req.url),
        );
      }
    }
  }
}

export function getSession() {
  return ServerSessionService.getSession();
}
