import { envHeaders, envURL, labsEnvAPI } from '@helpers/api';
import { useToast } from '@repo/ui/hooks/use-toast';
import { APIErrors } from '@helpers/api/api-errors';
import { NewUserFormData } from '@labs/_validators/users-validators';
import useOptimisticUpdate from '@labs/_hooks/use-optmistic-update';
import { User } from '@labs/_interfaces/user';
import qs from 'qs';
import useUserSession from '@labs/_hooks/use-user-session';

export default function useUser() {
  const { environment } = useUserSession();
  const { toast } = useToast();
  const { makeMutations } = useOptimisticUpdate();

  async function createUser({ sendInvite, ...payload }: NewUserFormData) {
    try {
      const { data: user } = await labsEnvAPI.post<User>(
        `/users?${qs.stringify({ sendInvite })}`,
        payload,
        envHeaders(environment.id),
      );

      toast({
        title: `User Created${sendInvite ? ' & Invited' : ''}`,
        description: `${user.fullName} has been created successfully${sendInvite ? ' and an invite has been sent' : ''}`,
      });

      makeMutations([
        {
          cacheKey: envURL(`/users`, environment.id),
          populateCache: (_, data) => ({
            ...data,
            items: [...data.items, user],
          }),
        },
      ]);

      return user;
    } catch (error: any) {
      console.error('useUser.createUser', error);
      toast({
        title: 'Creating Error',
        description: error?.response?.data?.message || APIErrors.Generic,
        variant: 'destructive',
      });
    }
  }

  return {
    createUser,
  };
}
