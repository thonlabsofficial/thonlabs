import { NextRequest, NextResponse } from 'next/server';
import ServerAuthSessionService from '@/(labs)/_services/server-auth-session-service';
import { validateSession, isAuthRoute } from '@/_libs/_nextjs/server';
import { forwardSearchParams } from '@/_libs/_nextjs/utils/helpers';

export const config = {
  matcher: '/((?!_next/static|_next/image|favicon.ico|favicon.png).*)',
};

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  const shouldRedirectToLogin = await validateSession(req);
  if (shouldRedirectToLogin) {
    return shouldRedirectToLogin;
  }

  if (
    !isAuthRoute(req) &&
    !pathname.startsWith('/projects') &&
    !pathname.startsWith('/env-')
  ) {
    console.log(
      '[MIDDLEWARE] No environment selected, redirecting to /projects',
    );
    return NextResponse.redirect(forwardSearchParams(req, '/projects'));
  }

  return NextResponse.next();
}
