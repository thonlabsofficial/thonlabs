import Session from '@/app/auth/_services/auth-services';
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
        return Response.json(null, { status: 403 });
      }

      // TODO: when create lib, make sure to call the prod domain
      const token = cookies().get('tl_session');
      cookies().delete('tl_session');

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_TL_API}/auth/refresh`,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token?.value}`,
            'Content-Type': 'application/json',
            'tl-env-id': process.env.NEXT_PUBLIC_TL_ENV_ID,
          } as HeadersInit & { 'tl-env-id': string },
          body: JSON.stringify({
            token: refreshToken.value,
          }),
        }
      );
      const data = await response.json();

      if (data.error) {
        return Response.json(data.error, { status: data.statusCode });
      }

      Session.create(data.data);

      return Response.json(data, { status: 200 });

    case 'logout':
      Session.logout();
      return Response.json('', { status: 200 });
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
      Session.logout();
      return redirect('/auth/login');
  }

  return Response.json(null, { status: 404 });
};
