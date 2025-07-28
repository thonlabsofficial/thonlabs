import { useSession } from '@thonlabs/nextjs';
import { useParams } from 'next/navigation';
import React from 'react';
import { useEnvironments } from '@/_hooks/use-environments';
import type { Environment } from '@/_interfaces/environment';

export default function useUserSession() {
  const session = useSession();
  const { environmentId } = useParams();
  const { environments, isLoadingEnvironments } = useEnvironments();
  const environment = React.useMemo(() => {
    return environments.find((env) => env.id === environmentId);
  }, [environments, environmentId]);

  return {
    user: session.user,
    environmentId: environmentId as string,
    environment: environment as Environment,
    isLoadingUserSession: isLoadingEnvironments,
  };
}
