import React from 'react';
import { useParams } from 'next/navigation';
import { useSession } from '@thonlabs/nextjs';
import { useEnvironments } from '@/_hooks/use-environments';
import { Environment } from '@/_interfaces/environment';
import { User } from '@/_interfaces/user';

export default function useUserSession() {
  const session = useSession();
  const { environmentId } = useParams();
  const { environments, isLoadingEnvironments } = useEnvironments();
  const environment = React.useMemo(() => {
    return environments.find((env) => env.id === environmentId);
  }, [environments, environmentId]);

  return {
    user: session.user as unknown as User,
    environmentId: environmentId as string,
    environment: environment as Environment,
    isLoadingUserSession: isLoadingEnvironments || session.isLoadingSession,
  };
}
