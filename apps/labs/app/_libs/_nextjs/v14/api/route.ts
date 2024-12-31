import { type NextRequest } from 'next/server';
import { redirect, notFound, RedirectType } from 'next/navigation';
import ServerSessionService from '../services/server-session-service';
import { APIResponseCodes } from '../../shared/utils/errors';
import { forwardSearchParams } from '../../shared/utils/helpers';

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
      await ServerSessionService.logout();
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
          ? forwardSearchParams(req, '/').toString()
          : `/auth/login?reason=${APIResponseCodes.InvalidMagicToken}`,
        RedirectType.replace,
      );

    case 'confirm-email':
      response = await ServerSessionService.validateEmailConfirmationToken(
        param as string,
      );

      /*
        If there's a token it means the user is coming from a "invitation" flow,
        the goal is to define password and continue to the app.
      */
      if (response.statusCode === 200 && response.token) {
        const { token, tokenType, email } = response;

        return redirect(
          tokenType === 'ResetPassword'
            ? `/auth/reset-password/${token}?inviteFlow=${Buffer.from(email).toString('base64')}`
            : `/auth/magic/${token}?inviteFlow=true`,
          RedirectType.replace,
        );
      }

      return redirect(
        response.statusCode === 200
          ? `/?info=${ServerSessionService.isValid() ? APIResponseCodes.EmailConfirmation : APIResponseCodes.EmailConfirmationWithoutSession}`
          : `/?reason=${response?.data?.emailResent ? APIResponseCodes.EmailConfirmationResent : APIResponseCodes.EmailConfirmationError}`,
        RedirectType.replace,
      );

    case 'refresh':
      response = await ServerSessionService.validateRefreshToken();

      if (response.statusCode === 200) {
        const searchParams = req.nextUrl.searchParams;
        const to = searchParams.get('dest') || '/';
        return redirect(to, RedirectType.replace);
      }

      return redirect('/api/auth/logout', RedirectType.replace);

    case 'logout':
      ServerSessionService.logout();
      return redirect(forwardSearchParams(req, '/auth/login').toString());

    case 'alive':
      return Response.json('', { status: 200 });
  }

  return notFound();
};
