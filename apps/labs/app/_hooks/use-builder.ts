import { APIErrors } from '@helpers/api/api-errors';
import { useToast } from '@repo/ui/hooks/use-toast';
import { buildEnvDataMutation } from '@/_hooks/use-environment-app-data';
import type { Environment } from '@/_interfaces/environment';
import { revalidateCache } from '@/_services/server-cache-service';
import type { UpdateEnvironmentAuthSettingsFormData } from '@/_validators/builder-validators';
import { labsAPI } from '../../helpers/api';
import useOptimisticUpdate from './use-optimistic-update';

export default function useBuilder() {
  const { toast } = useToast();
  const { makeMutations } = useOptimisticUpdate();

  async function updateEnvironmentAuthSettings(
    environmentId: string,
    payload: UpdateEnvironmentAuthSettingsFormData
  ) {
    try {
      await labsAPI.patch<Environment>(
        `/environments/${environmentId}/auth-settings`,
        {
          authProvider: payload.authProvider,
          enableSignUp: payload.enableSignUp,
          enableSignUpB2BOnly: payload.enableSignUpB2BOnly,
          styles: payload.styles,
          activeSSOProviders: payload.activeSSOProviders,
          tokenExpiration: `${payload.tokenExpirationValue}${payload.tokenExpirationUnit}`,
          refreshTokenExpiration: `${payload.refreshTokenExpirationValue}${payload.refreshTokenExpirationUnit}`,
        }
      );

      makeMutations(
        buildEnvDataMutation(
          environmentId,
          Object.entries(payload).map(([key, value]) => ({
            key,
            value,
            isSDKData: true,
          }))
        )
      );

      await revalidateCache([`/${environmentId}/builder`]);

      toast({
        title: 'Changes Saved',
        description: 'The auth settings has been successfully updated.',
      });

      return Promise.resolve();
    } catch (error: any) {
      console.error('useEnvironment.updateEnvironmentAuthSettings', error);
      toast({
        title: 'Update Error',
        description: error?.response?.data?.message || APIErrors.GenericForm,
        variant: 'destructive',
      });

      return Promise.reject(error);
    }
  }

  return {
    updateEnvironmentAuthSettings,
  };
}
