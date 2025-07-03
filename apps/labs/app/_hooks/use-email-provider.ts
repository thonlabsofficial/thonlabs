import { envFetcher, envHeaders, envURL, labsEnvAPI } from '@helpers/api';
import { APIErrors } from '@helpers/api/api-errors';
import { useToast } from '@repo/ui/hooks/use-toast';
import { SSOSocial, SSOSocialProvider } from '@thonlabs/nextjs';
import { useParams } from 'next/navigation';
import useSWR from 'swr';
import useOptimisticUpdate from '@/_hooks/use-optimistic-update';
import { buildEnvDataMutation } from '@/_hooks/use-environment-app-data';
import {
  EmailProvider,
  EmailProviderTypes,
} from '@/_interfaces/email-provider';
import { EmailTemplate } from '@/_interfaces/email-template';

interface Params {
  provider?: EmailProviderTypes;
}

export function useEmailProvider(params: Params = {}) {
  const { environmentId } = useParams();
  const {
    data: emailProvider,
    isLoading: isLoadingEmailProvider,
    error: emailProviderError,
  } = useSWR<EmailProvider>(
    params.provider &&
      envURL(`/email-providers/${params.provider}`, environmentId as string),
    envFetcher(environmentId as string),
    {
      revalidateOnFocus: false,
    },
  );
  const { toast } = useToast();
  const { makeMutations } = useOptimisticUpdate();

  async function updateEmailProvider(
    provider: EmailProviderTypes,
    payload: any,
  ) {
    try {
      await labsEnvAPI.patch(
        `/email-providers/${provider}`,
        payload,
        envHeaders(environmentId as string),
      );

      toast({
        description: `The ${provider} provider has been successfully saved.`,
      });

      makeMutations([
        {
          cacheKey: envURL(
            `/email-providers/${provider}`,
            environmentId as string,
          ),
          populateCache: (_: any, cache: any) => ({ ...cache, ...payload }),
        },
        {
          cacheKey: envURL(`/email-providers`, environmentId as string),
          populateCache: (_, cache) => ({
            ...cache,
            [provider]: { active: payload.active },
          }),
        },
      ]);
    } catch (error: any) {
      console.error('useEmailProvider.upsertCredential', error);
      toast({
        title: `We couldn't save ${provider} credentials`,
        description: error?.response?.data?.message || APIErrors.GenericForm,
        variant: 'destructive',
      });
      throw error;
    }
  }

  return {
    emailProvider,
    isLoadingEmailProvider,
    emailProviderError,
    updateEmailProvider,
  };
}
