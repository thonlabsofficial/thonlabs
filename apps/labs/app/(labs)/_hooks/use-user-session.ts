import React from 'react';
import { useParams } from 'next/navigation';
import { useSession } from '@/_libs/_nextjs';
import { useEnvironments } from '@/(labs)/_hooks/use-environments';
import { Environment } from '@labs/_interfaces/environment';

export default function useUserSession() {
  const session = useSession();
  const { environmentId } = useParams();
  const { environments, isLoadingEnvironments } = useEnvironments();
  const environment = React.useMemo(() => {
    return environments.find((env) => env.id === environmentId);
  }, [environments, environmentId]);

  return {
    user: session.user,
    environment: environment as Environment,
    isLoadingUserSession: isLoadingEnvironments,
  };
}
