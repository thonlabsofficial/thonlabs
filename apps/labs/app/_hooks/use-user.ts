import { envHeaders, envURL, labsEnvAPI } from '@helpers/api';
import { useToast } from '@repo/ui/hooks/use-toast';
import { APIErrors } from '@helpers/api/api-errors';
import {
  NewUserFormData,
  UpdateUserGeneralDataFormData,
  UpdateUserStatusFormData,
} from '@/_validators/users-validators';
import { User } from '@/_interfaces/user';
import qs from 'qs';
import useUserSession from '@/_hooks/use-user-session';
import { useSWRConfig } from 'swr';

export default function useUser() {
  const { environment } = useUserSession();
  const { toast } = useToast();
  const { mutate } = useSWRConfig();

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

      mutate(envURL('/users', environment.id as string));
      if (payload.organizationId) {
        mutate(
          envURL(
            `/organizations/${payload.organizationId}`,
            environment.id as string,
          ),
        );
      }

      return user;
    } catch (error: any) {
      console.error('useUser.createUser', error);
      toast({
        title: 'Creating Error',
        description: error?.response?.data?.message || APIErrors.GenericForm,
        variant: 'destructive',
      });
      throw error;
    }
  }

  async function updateGeneralData(
    userId: string,
    payload: UpdateUserGeneralDataFormData,
  ) {
    try {
      const { data } = await labsEnvAPI.patch<User>(
        `/users/${userId}/general-data`,
        payload,
        envHeaders(environment.id),
      );

      toast({
        title: 'Changes Saved',
        description: `${data.fullName} has been updated successfully`,
      });

      mutate(envURL('/users', environment.id as string));

      return data;
    } catch (error: any) {
      console.error('useUser.updateGeneralData', error);
      toast({
        title: 'Updating Error',
        description: error?.response?.data?.message || APIErrors.GenericForm,
        variant: 'destructive',
      });
      throw error;
    }
  }

  async function updateStatus(
    userId: string,
    payload: UpdateUserStatusFormData,
  ) {
    try {
      const { data } = await labsEnvAPI.patch<User>(
        `/users/${userId}/status`,
        payload,
        envHeaders(environment.id),
      );

      toast({
        title: 'Status Updated',
        description: `${data.fullName} has been ${payload.active ? 'activated' : 'deactivated'} successfully`,
      });

      mutate(envURL('/users', environment.id as string));

      return data;
    } catch (error: any) {
      console.error('useUser.updateStatus', error);
      toast({
        title: 'Updating Status Error',
        description: error?.response?.data?.message || APIErrors.Generic,
        variant: 'destructive',
      });
    }
  }

  async function exclude(userId: string) {
    try {
      const { data } = await labsEnvAPI.delete<User>(
        `/users/${userId}`,
        envHeaders(environment.id),
      );

      toast({
        title: 'User Deleted',
        description: `${data.fullName} has been deleted successfully`,
      });

      mutate(envURL('/users', environment.id as string));

      return data;
    } catch (error: any) {
      console.error('useUser.exclude', error);
      toast({
        title: 'Delete User Error',
        description: error?.response?.data?.message || APIErrors.Generic,
        variant: 'destructive',
      });
    }
  }

  async function resendInvitation(userId: string) {
    try {
      const { data } = await labsEnvAPI.post(
        `/users/${userId}/resend-invitation`,
        {},
        envHeaders(environment.id),
      );

      toast({
        title: 'Invitation Sent',
        description: `The ${data.fullName} invitation has been resent successfully`,
      });
    } catch (error: any) {
      console.error('useUser.resendInvitation', error);
      toast({
        title: 'Resend Invitation Error',
        description: error?.response?.data?.message || APIErrors.Generic,
        variant: 'destructive',
      });
    }
  }

  return {
    createUser,
    updateGeneralData,
    updateStatus,
    exclude,
    resendInvitation,
  };
}
