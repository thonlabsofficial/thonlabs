import { envFetcher, envURL } from '@helpers/api';
import { useParams } from 'next/navigation';
import React from 'react';
import useSWR from 'swr';
import type { User } from '@/_interfaces/user';

interface UsersResponse {
  items: User[];
}

export function useUsers() {
  const { environmentId } = useParams();
  const { data, error, isLoading } = useSWR<UsersResponse>(
    envURL('/users', environmentId as string),
    envFetcher(environmentId as string)
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
