import { envFetcher, envURL } from '@helpers/api';
import useSWR from 'swr';
import React from 'react';
import { useParams } from 'next/navigation';
import { EmailTemplate } from '../_interfaces/email-template';

interface EmailTemplatesResponse {
  items: EmailTemplate[];
}

export function useEmailTemplates() {
  const { environmentId } = useParams();
  const { data, error, isLoading } = useSWR<EmailTemplatesResponse>(
    envURL('/email-templates', environmentId as string),
    envFetcher(environmentId as string),
  );

  const emailTemplates = React.useMemo(() => {
    return data?.items || [];
  }, [data]);

  return {
    emailTemplates,
    emailTemplatesError: error,
    isLoadingEmailTemplates: isLoading,
  };
}
