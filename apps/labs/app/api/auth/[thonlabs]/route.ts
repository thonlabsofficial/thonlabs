import ServerSessionService from '@/auth/_services/server-session-service';
import { redirect } from 'next/navigation';

export const POST = async (
  req: Request,
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

  return Response.json(null, { status: 404 });
};

export const GET = async (
  req: Request,
  { params }: { params: { thonlabs: string } },
) => {
  const action = params.thonlabs;

  switch (action) {
    case 'refresh':
      const response = await ServerSessionService.validateRefreshToken();

      if (response.statusCode === 200) {
        return redirect('/');
      }

      return redirect('/api/auth/logout');
    case 'logout':
      ServerSessionService.logout();
      return redirect('/auth/login');
  }

  return Response.json(null, { status: 404 });
};
