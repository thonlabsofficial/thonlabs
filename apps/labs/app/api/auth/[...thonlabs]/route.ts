import { type NextRequest } from 'next/server';
import { redirect, notFound, RedirectType } from 'next/navigation';
import ServerSessionService from '@/_libs/_nextjs/services/server-session-service';
import { APIResponseCodes } from '@/_libs/_nextjs/utils/errors';

export const POST = async (
  req: NextRequest,
  { params }: { params: { thonlabs: string } },
) => {
  const [action] = params.thonlabs;

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
  let response;
  const [action, param] = params.thonlabs;

  switch (action) {
    case 'magic':
      if (!param) {
        return redirect('/auth/login');
      }

      response = await ServerSessionService.validateMagicToken(param as string);

      return redirect(
        response.statusCode === 200
          ? '/'
          : `/auth/login?reason=${APIResponseCodes.InvalidMagicToken}`,
        RedirectType.replace,
      );

    case 'refresh':
      response = await ServerSessionService.validateRefreshToken();

      if (response.statusCode === 200) {
        const searchParams = req.nextUrl.searchParams;
        const to = searchParams.get('to') || '/';
        return redirect(to, RedirectType.replace);
      }

    // return redirect('/api/auth/logout', RedirectType.replace);
    case 'logout':
      ServerSessionService.logout();
      return redirect('/auth/login');
  }

  return notFound();
};
