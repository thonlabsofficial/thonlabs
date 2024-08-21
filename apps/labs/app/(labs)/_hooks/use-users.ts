import useUserSession from '@labs/_hooks/use-user-session';
import { User } from '@labs/_interfaces/user';
import { envFetcher, envURL } from '@helpers/api';
import useSWR from 'swr';

interface UsersResponse {
  items: User[];
}

export function useUsers() {
  const { environment } = useUserSession();
  const { data, error, isLoading } = useSWR<UsersResponse>(
    envURL('/users', environment.id),
    envFetcher(environment.id),
  );

  return {
    users: data?.items || [],
    usersError: error,
    isLoadingUsers: isLoading,
  };
}
