import { type NextRequest, NextResponse } from 'next/server';
import {
  validateSession,
  redirectToLogin,
  thonLabsConfig,
} from '@thonlabs/nextjs/server';
import { forwardSearchParams } from '@thonlabs/nextjs';
import Log from '@repo/utils/log';
import { fetchProjects } from '@/_services/project-service';

export const config = {
  matcher: '/((?!_next/static|_next/image|favicon.ico|favicon.png).*)',
};

export async function middleware(req: NextRequest) {
  const redirect = await validateSession(req, [
    '/api/environments',
    '/builder-preview',
  ]);
  if (redirect) {
    return redirectToLogin(redirect);
  }

  if (['/', '/projects'].includes(req.nextUrl.pathname)) {
    const projects = await fetchProjects();

    if (projects.length === 0) {
      Log.info('middleware', 'No projects found, redirecting to /onboard');
      return NextResponse.redirect(forwardSearchParams(req, '/onboard'));
    }
  }

  if (req.nextUrl.pathname === '/') {
    Log.info('middleware', 'No environment selected, redirecting to /projects');
    return NextResponse.redirect(forwardSearchParams(req, '/projects'));
  }

  return NextResponse.next(thonLabsConfig(req));
}
