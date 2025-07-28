import { envFetcher, envURL } from '@helpers/api';
import { useParams } from 'next/navigation';
import useSWR from 'swr';
import type {
  EmailProvider,
  EmailProviderTypes,
} from '@/_interfaces/email-provider';

type EmailProvidersResponse = Record<EmailProviderTypes, EmailProvider>;

export function useEmailProviders() {
  const { environmentId } = useParams();
  const { data, error, isLoading } = useSWR<EmailProvidersResponse>(
    envURL('/email-providers', environmentId as string),
    envFetcher(environmentId as string)
  );

  return {
    emailProviders: data,
    emailProvidersError: error,
    isLoadingEmailProviders: isLoading,
  };
}
