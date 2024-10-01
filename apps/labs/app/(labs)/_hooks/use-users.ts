import { User } from '@labs/_interfaces/user';
import { envFetcher, envURL } from '@helpers/api';
import useSWR from 'swr';
import React from 'react';
import { useParams } from 'next/navigation';

interface UsersResponse {
  items: User[];
}

export function useUsers() {
  const { environmentId } = useParams();
  const { data, error, isLoading } = useSWR<UsersResponse>(
    envURL('/users', environmentId as string),
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
