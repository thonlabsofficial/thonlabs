import { NextRequest, NextResponse } from 'next/server';
import ServerSessionService from '../services/server-session-service';
import { forwardSearchParams, getURLFromHost } from '../utils/helpers';

export function isAuthRoute(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const publicRoutes = [
    '/api/auth/logout',
    '/api/auth/refresh',
    '/api/auth/magic',
    '/api/auth/confirm-email',
    '/auth/login',
    '/auth/sign-up',
    '/auth/magic',
    '/auth/reset-password',
    '/auth/logout',
    '/auth/confirm-email',
  ];
  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route),
  );

  return isPublicRoute;
}

export function shouldBypassRoute(req: NextRequest, routes: string[]) {
  const pathname = req.nextUrl.pathname;
  const shouldBypass = routes.some((route) => pathname.startsWith(route));

  return shouldBypass;
}

export async function validateSession(
  req: NextRequest,
  bypassRoutes: string[] = [],
) {
  if (shouldBypassRoute(req, bypassRoutes)) {
    return NextResponse.next();
  }

  const isPublicRoute = isAuthRoute(req);

  if (!isPublicRoute) {
    const { accessToken, refreshToken, keepAlive } =
      ServerSessionService.getSessionCookies();

    // Validates the access token or access token and refresh token
    // based on keep alive
    if (
      (!keepAlive && !accessToken) ||
      (keepAlive && !accessToken && !refreshToken)
    ) {
      console.log('ThonLabs Validate Session: Invalid session');
      return NextResponse.redirect(
        forwardSearchParams(req, '/api/auth/logout'),
      );
    }

    const isPageRefresh =
      req.headers.get('referer') === getURLFromHost(req, false).toString();

    if (isPageRefresh) {
      // Validates the session status and redirects to regenerate
      // a new token in case of need
      const { status } = await ServerSessionService.shouldKeepAlive();

      if (status === 'invalid_session') {
        console.log(
          'ThonLabs Validate Session: Invalid session from keep alive',
          status,
        );

        return NextResponse.redirect(
          forwardSearchParams(req, '/api/auth/logout'),
        );
      } else if (status === 'needs_refresh') {
        console.log(
          'ThonLabs Validate Session: Needs refresh from keep alive',
          status,
        );

        const url = getURLFromHost(req);

        return NextResponse.redirect(
          new URL(`/api/auth/refresh?dest=${url.pathname}`, url.toString()),
        );
      }
    }
  }
}

export function getSession() {
  return ServerSessionService.getSession();
}

export function getTokens() {
  return ServerSessionService.getSessionCookies();
}
