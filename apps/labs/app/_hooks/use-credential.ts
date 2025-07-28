import { labsEnvAPI } from '@helpers/api';
import { APIErrors } from '@helpers/api/api-errors';
import { useToast } from '@repo/ui/hooks/use-toast';
import type { SSOSocial, SSOSocialProvider } from '@thonlabs/nextjs';
import useSWR from 'swr';
import { buildEnvDataMutation } from '@/_hooks/use-environment-app-data';
import useOptimisticUpdate from '@/_hooks/use-optimistic-update';

interface Params {
  environmentId?: string;
  provider?: SSOSocialProvider;
}

interface CredentialBaseResponse {
  activeSSOProviders: SSOSocialProvider[];
}

export function useCredential(params: Params = {}) {
  const {
    data: credential,
    isLoading: isLoadingCredential,
    isValidating: isValidatingCredential,
    error: credentialError,
  } = useSWR<SSOSocial>(
    () =>
      params.environmentId &&
      params.provider &&
      `/environments/${params.environmentId}/credentials/${params.provider}`,
    {
      revalidateOnFocus: false,
    }
  );
  const { toast } = useToast();
  const { makeMutations } = useOptimisticUpdate();

  async function upsertCredential(
    environmentId: string,
    provider: SSOSocialProvider,
    payload: any
  ) {
    try {
      const { data } = await labsEnvAPI.post<CredentialBaseResponse>(
        `/environments/${environmentId}/credentials/${provider}`,
        payload
      );

      if (data.activeSSOProviders) {
        makeMutations(
          buildEnvDataMutation(environmentId, [
            {
              key: 'activeSSOProviders',
              value: data.activeSSOProviders,
              isSDKData: true,
            },
          ])
        );
      }

      makeMutations([
        {
          cacheKey: `/environments/${environmentId}/credentials/${provider}`,
          populateCache: (_: any, cache: any) => ({
            ...cache,
            ...payload,
          }),
        },
      ]);
    } catch (error: any) {
      console.error('useCredential.upsertCredential', error);
      toast({
        title: `We couldn't save ${provider} credentials`,
        description: error?.response?.data?.message || APIErrors.GenericForm,
        variant: 'destructive',
      });
      throw error;
    }
  }

  async function updateCredentialStatus(
    environmentId: string,
    provider: SSOSocialProvider,
    { active }: { active: boolean }
  ) {
    try {
      const { data } = await labsEnvAPI.patch<CredentialBaseResponse>(
        `/environments/${environmentId}/credentials/${provider}/status`,
        { active }
      );

      toast({
        description: `The ${provider} has been successfully ${active ? 'activated' : 'deactivated'}.`,
      });

      makeMutations(
        buildEnvDataMutation(environmentId, [
          {
            key: 'activeSSOProviders',
            value: data.activeSSOProviders,
            isSDKData: true,
          },
        ])
      );
    } catch (error: any) {
      console.error('useCredential.updateCredentialStatus', error);
      toast({
        title: `We couldn't update the status of ${provider} credential`,
        description: error?.response?.data?.message || APIErrors.GenericForm,
        variant: 'destructive',
      });
      throw error;
    }
  }

  async function deleteCredential(
    environmentId: string,
    provider: SSOSocialProvider
  ) {
    try {
      const { data } = await labsEnvAPI.delete<CredentialBaseResponse>(
        `/environments/${environmentId}/credentials/${provider}`
      );

      toast({
        description: `The ${provider} has been successfully deleted.`,
      });

      makeMutations(
        buildEnvDataMutation(environmentId, [
          {
            key: 'activeSSOProviders',
            value: data.activeSSOProviders,
            isSDKData: true,
          },
        ])
      );
    } catch (error: any) {
      console.error('useCredential.deleteCredential', error);
      toast({
        title: `We couldn't delete ${provider} credential`,
        description: error?.response?.data?.message || APIErrors.GenericForm,
        variant: 'destructive',
      });
      throw error;
    }
  }

  return {
    credential,
    isLoadingCredential,
    isValidatingCredential,
    credentialError,
    upsertCredential,
    updateCredentialStatus,
    deleteCredential,
  };
}
