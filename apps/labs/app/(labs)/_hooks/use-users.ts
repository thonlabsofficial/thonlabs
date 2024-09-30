import useUserSession from '@labs/_hooks/use-user-session';
import { User } from '@labs/_interfaces/user';
import { envFetcher, envURL } from '@helpers/api';
import useSWR from 'swr';
import React from 'react';

interface UsersResponse {
  items: User[];
}

export function useUsers() {
  const { environment } = useUserSession();
  const { data, error, isLoading } = useSWR<UsersResponse>(
    envURL('/users', environment?.id),
    envFetcher(environment?.id),
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
