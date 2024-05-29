import ServerSessionService from '@/app/(logged)/auth/_services/server-session-service';
import {
  APIErrorCodes,
  apiErrorMessages,
} from '@/app/(logged)/labs/_providers/thon-labs-provider';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
export const POST = async (
  req: Request,
  { params }: { params: { thonlabs: string } }
) => {
  const action = params.thonlabs;

  switch (action) {
    case 'refresh':
      const refreshToken = cookies().get('tl_refresh');

      if (!refreshToken?.value) {
        console.log('Invalid refresh token');

        return Response.json(
          {
            code: APIErrorCodes.Unauthorized,
            error: apiErrorMessages[APIErrorCodes.Unauthorized],
          },
          { status: 401 }
        );
      }

      const response = await fetch(
        // TODO: when create lib, make sure to call the prod domain
        `${process.env.NEXT_PUBLIC_TL_API}/auth/refresh`,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'tl-env-id': process.env.NEXT_PUBLIC_TL_ENV_ID,
          } as HeadersInit & { 'tl-env-id': string },
          body: JSON.stringify({
            token: refreshToken.value,
          }),
        }
      );
      const data = await response.json();

      if (data.statusCode) {
        console.log(data);

        return Response.json(data?.error || data?.message, {
          status: data.statusCode,
        });
      }

      console.log(data);

      ServerSessionService.create(data.data);

      return Response.json(null, { status: 200 });

    case 'logout':
      ServerSessionService.logout();
      return Response.json(null, { status: 200 });
  }

  return Response.json(null, { status: 404 });
};

export const GET = async (
  req: Request,
  { params }: { params: { thonlabs: string } }
) => {
  const action = params.thonlabs;

  switch (action) {
    case 'logout':
      ServerSessionService.logout();
      return redirect('/auth/login');
  }

  return Response.json(null, { status: 404 });
};
