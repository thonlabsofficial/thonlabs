import { NextRequest, NextResponse } from 'next/server';
import ServerSessionService from './app/auth/_services/server-session-service';
import ServerAuthSessionService from '@/(labs)/_services/server-auth-session-service';

export const config = {
  matcher: '/((?!_next/static|_next/image|favicon.ico|favicon.png).*)',
};

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const publicRoutes = ['/api/auth', '/auth'];
  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route),
  );

  if (!isPublicRoute) {
    const { accessToken, refreshToken, keepAlive } =
      ServerSessionService.getSessionCookies();

    // Validates the access token or access token and refresh token
    // based on keep alive
    if (
      (!keepAlive && !accessToken) ||
      (keepAlive && !accessToken && !refreshToken)
    ) {
      console.log('[MIDDLEWARE] Invalid session');
      return NextResponse.redirect(new URL('/api/auth/logout', req.url));
    }

    const isPageRefresh = req.headers.get('referer') === req.url;

    if (isPageRefresh) {
      // Validates the session status and redirects to regenerate
      // a new token in case of need
      const { status } = await ServerSessionService.shouldKeepAlive();

      if (status === 'invalid_session') {
        console.log('[MIDDLEWARE] Invalid session from keep alive', status);

        return NextResponse.redirect(new URL('/api/auth/logout', req.url));
      } else if (status === 'needs_refresh') {
        console.log('[MIDDLEWARE] Needs refresh from keep alive', status);

        const { pathname } = new URL(req.url);

        return NextResponse.redirect(
          new URL(`/api/auth/refresh?dest=${pathname}`, req.url),
        );
      }
    }

    if (
      !pathname.startsWith('/projects') &&
      !ServerAuthSessionService.getEnv()
    ) {
      console.log(
        '[MIDDLEWARE] No environment selected, redirecting to /projects',
      );
      return NextResponse.redirect(new URL('/projects', req.url));
    }
  }

  return NextResponse.next();
}
