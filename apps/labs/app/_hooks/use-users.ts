import { User } from '@/_interfaces/user';
import { envFetcher, envURL } from '@helpers/api';
import useSWR from 'swr';
import React from 'react';
import { useParams } from 'next/navigation';

interface UsersResponse {
  items: User[];
}

interface UseUsersParams {
  executeQuery?: boolean;
}

const DEFAULT_PARAMS: UseUsersParams = {
  executeQuery: true,
};

export function useUsers(params: UseUsersParams = {}) {
  const { executeQuery } = { ...DEFAULT_PARAMS, ...params };
  const { environmentId } = useParams();
  const { data, error, isLoading } = useSWR<UsersResponse>(
    executeQuery ? envURL('/users', environmentId as string) : null,
    envFetcher(environmentId as string),
  );

  const users = React.useMemo(() => {
    return data?.items || [];
  }, [data]);

  return {
    users,
    usersError: error,
    isLoadingUsers: isLoading,
  };
}
