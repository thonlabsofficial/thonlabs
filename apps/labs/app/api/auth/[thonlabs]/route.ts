import { type NextRequest } from 'next/server';
import { redirect, notFound, RedirectType } from 'next/navigation';
import ServerSessionService from '@/_libs/_nextjs/services/server-session-service';

export const POST = async (
  req: NextRequest,
  { params }: { params: { thonlabs: string } },
) => {
  const action = params.thonlabs;

  switch (action) {
    case 'refresh':
      const response = await ServerSessionService.validateRefreshToken();
      return Response.json(response, { status: response.statusCode });

    case 'logout':
      ServerSessionService.logout();
      return Response.json(null, { status: 200 });
  }

  return notFound();
};

export const GET = async (
  req: NextRequest,
  { params }: { params: { thonlabs: string } },
) => {
  const action = params.thonlabs;

  switch (action) {
    case 'refresh':
      const response = await ServerSessionService.validateRefreshToken();

      if (response.statusCode === 200) {
        const searchParams = req.nextUrl.searchParams;
        const dest = searchParams.get('dest') || '/';
        return redirect(dest, RedirectType.replace);
      }

      return redirect('/api/auth/logout', RedirectType.replace);
    case 'logout':
      ServerSessionService.logout();
      return redirect('/auth/login');
  }

  return notFound();
};
