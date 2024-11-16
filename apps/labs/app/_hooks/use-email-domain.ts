import {
  buildEnvDataMutation,
  useEnvironmentAppData,
} from '@/_hooks/use-environment-app-data';
import { EmailTemplateDomain } from '@/_interfaces/email-template-domain';
import { envHeaders, labsEnvAPI } from '@helpers/api';
import { useToast } from '@repo/ui/hooks/use-toast';
import useOptimisticUpdate from '@/_hooks/use-optimistic-update';
import { APIErrors } from '@helpers/api/api-errors';

export default function useEmailDomain() {
  const { emailTemplateDomain } = useEnvironmentAppData();
  const { toast } = useToast();
  const { makeMutations } = useOptimisticUpdate();

  async function changeEmailDomain(environmentId: string, domain: string) {
    try {
      const { data } = await labsEnvAPI.post<EmailTemplateDomain>(
        `/emails/domains`,
        { domain },
        envHeaders(environmentId),
      );

      toast({
        title: 'Changes Saved',
        description: 'Email domain has been updated successfully',
      });

      makeMutations([
        buildEnvDataMutation(environmentId, 'emailTemplateDomain', data),
      ]);

      return data;
    } catch (error: any) {
      console.error('useEmailDomain.changeEmailDomain', error);
      toast({
        title: 'Error',
        description: error?.response?.data?.message || APIErrors.Generic,
        variant: 'destructive',
      });
      throw error;
    }
  }

  async function verifyEmailDomain(environmentId: string) {
    try {
      const { data } = await labsEnvAPI.post<EmailTemplateDomain>(
        `/emails/domains/verify`,
        envHeaders(environmentId),
      );

      toast({
        description: 'Verification started...',
      });

      makeMutations([
        buildEnvDataMutation(environmentId, 'emailTemplateDomain', data),
      ]);

      return data;
    } catch (error: any) {
      console.error('useEmailDomain.verifyEmailDomain', error);
      toast({
        title: 'Verification Error',
        description: error?.response?.data?.message || APIErrors.Generic,
        variant: 'destructive',
      });
    }
  }

  return {
    emailTemplateDomain,
    changeEmailDomain,
    verifyEmailDomain,
  };
}
