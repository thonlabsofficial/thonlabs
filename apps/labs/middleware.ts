import { NextRequest, NextResponse } from 'next/server';
import ServerSessionService from './app/auth/_services/server-session-service';

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
      ServerSessionService.getSession();

    // Validates the access token or access token and refresh token
    // based on keep alive
    if (
      (!keepAlive && !accessToken) ||
      (keepAlive === 'true' && !accessToken && !refreshToken)
    ) {
      return NextResponse.redirect(new URL('/api/auth/logout', req.url));
    }

    // Validates the session status and redirects to regenerate
    // a new token in case of need
    const { status } = await ServerSessionService.shouldKeepAlive();

    if (status === 'invalid_session') {
      return NextResponse.redirect(new URL('/api/auth/logout', req.url));
    } else if (status === 'needs_refresh') {
      return NextResponse.redirect(new URL('/api/auth/refresh', req.url));
    }
  }

  return NextResponse.next();
}
