import { NextRequest, NextResponse } from 'next/server';
import { validateSession, validationRedirect } from '@thonlabs/nextjs/server';
import { forwardSearchParams } from '@thonlabs/nextjs';
import Log from '@repo/utils/log';

export const config = {
  matcher: '/((?!_next/static|_next/image|favicon.ico|favicon.png).*)',
};

export async function middleware(req: NextRequest): Promise<NextResponse> {
  const redirect = await validateSession(req, [
    '/api/environments',
    '/projects',
    '/api/environments',
    '/env-',
    '/api/auth',
    '/builder-preview',
  ]);
  if (redirect) {
    return validationRedirect(redirect);
  }

  if (req.nextUrl.pathname === '/') {
    Log.info('middleware', 'No environment selected, redirecting to /projects');
    return NextResponse.redirect(forwardSearchParams(req, '/projects'));
  }

  return NextResponse.next();
}
