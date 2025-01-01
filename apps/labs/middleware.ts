import { NextRequest, NextResponse } from 'next/server';
import {
  validateSession,
  isAuthRoute,
  shouldBypassRoute,
} from '@/_libs/_nextjs/server';
import { forwardSearchParams } from '@/_libs/_nextjs';
import Log from '@repo/utils/log';

export const config = {
  matcher: '/((?!_next/static|_next/image|favicon.ico|favicon.png).*)',
};

export async function middleware(req: NextRequest) {
  const shouldRedirectToLogin = await validateSession(req, [
    '/api/environments',
  ]);
  if (shouldRedirectToLogin) {
    return shouldRedirectToLogin;
  }

  if (
    shouldBypassRoute(req, [
      '/projects',
      '/api/environments',
      '/env-',
      '/api/auth',
      '/builder-preview',
    ])
  ) {
    return NextResponse.next();
  }

  if (!isAuthRoute(req)) {
    Log.info('middleware', 'No environment selected, redirecting to /projects');
    return NextResponse.redirect(forwardSearchParams(req, '/projects'));
  }

  return NextResponse.next();
}
