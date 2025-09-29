import { type NextRequest, NextResponse } from 'next/server';
import {
  validateSession,
  redirectToLogin,
  withThonLabs,
} from '@thonlabs/nextjs/server';
import Log from '@repo/utils/log';
import { ProjectsResponse } from '@/_services/project-service';
import axios from 'axios';

export const config = {
  matcher: '/((?!_next/static|_next/image|favicon.ico|favicon.png).*)',
};

export async function middleware(req: NextRequest) {
  const sessionConfig = await validateSession(req, [
    '/api/environments',
    '/builder-preview',
  ]);
  if (sessionConfig.redirect) {
    return redirectToLogin(req, sessionConfig.redirect);
  }

  if (['/', '/projects'].includes(req.nextUrl.pathname)) {
    const projects = await axios.get<ProjectsResponse>(
      `${process.env.NEXT_PUBLIC_TL_API}/projects`,
      {
        headers: {
          Authorization: `Bearer ${sessionConfig.accessToken}`,
        },
      },
    );

    if (projects.data.items.length === 0) {
      Log.info('middleware', 'No projects found, redirecting to /onboard');
      return NextResponse.redirect(new URL('/onboard/welcome', req.url));
    }
  }

  if (req.nextUrl.pathname === '/') {
    Log.info(
      'middleware',
      'Found projects but no environment selected, redirecting to /projects',
    );
    return NextResponse.redirect(new URL('/projects', req.url));
  }

  return withThonLabs(req, sessionConfig);
}
