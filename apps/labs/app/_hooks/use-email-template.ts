import { envHeaders, envURL, labsEnvAPI } from '@helpers/api';
import { useToast } from '@repo/ui/hooks/use-toast';
import { APIErrors } from '@helpers/api/api-errors';
import useOptimisticUpdate from '@/_hooks/use-optimistic-update';
import useUserSession from '@/_hooks/use-user-session';
import {
  UpdateEmailTemplatePayload,
  UpdateEmailTemplateStatusPayload,
} from '@/_validators/emails-validators';
import { EmailTemplate } from '@/_interfaces/email-template';
import useSWR from 'swr';
import { envFetcher } from '@helpers/api';
import { useEffect } from 'react';

interface Params {
  templateId?: string;
}

type Options = {
  onFetchComplete?: () => void;
};

export default function useEmailTemplate(
  params: Params = {},
  { onFetchComplete }: Options = {},
) {
  const { environmentId } = useUserSession();
  const {
    data: emailTemplate,
    isLoading: isLoadingEmailTemplate,
    isValidating: isValidatingEmailTemplate,
    error: emailTemplateError,
  } = useSWR<EmailTemplate>(
    () => params.templateId && `/email-templates/${params.templateId}`,
    envFetcher(environmentId),
  );
  const { toast } = useToast();
  const { makeMutations } = useOptimisticUpdate();

  useEffect(() => {
    onFetchComplete && onFetchComplete();
  }, [emailTemplate]);

  async function updateEmailTemplate(
    templateId: string,
    payload: UpdateEmailTemplatePayload,
  ) {
    try {
      const { data } = await labsEnvAPI.patch<EmailTemplate>(
        `/email-templates/${templateId}`,
        payload,
        envHeaders(environmentId),
      );

      toast({
        title: 'Changes Saved',
        description: `${data.name} has been updated successfully`,
      });

      makeMutations([
        {
          cacheKey: `/email-templates/${templateId}`,
          populateCache: (_, cache) => ({
            ...cache,
            ...data,
          }),
        },
        {
          cacheKey: envURL(`/email-templates`, environmentId),
          populateCache: (_, cache) => ({
            ...cache,
            items: cache.items.map((item: EmailTemplate) =>
              item.id === templateId
                ? { ...item, updatedAt: data.updatedAt }
                : item,
            ),
          }),
        },
      ]);

      return data;
    } catch (error: any) {
      console.error('useEmailTemplate.updateEmailTemplate', error);
      toast({
        title: 'Updating Error',
        description: error?.response?.data?.message || APIErrors.Generic,
        variant: 'destructive',
      });
      throw error;
    }
  }

  async function updateStatus(
    templateId: string,
    payload: UpdateEmailTemplateStatusPayload,
  ) {
    try {
      const { data } = await labsEnvAPI.patch<EmailTemplate>(
        `/email-templates/${templateId}/status`,
        payload,
        envHeaders(environmentId),
      );

      toast({
        title: 'Status Updated',
        description: `"${data.name}" email template has been ${payload.enabled ? 'activated' : 'deactivated'}`,
      });

      makeMutations([
        {
          cacheKey: `/email-templates/${templateId}`,
          populateCache: (_, cache) => ({
            ...cache,
            ...data,
          }),
        },
        {
          cacheKey: envURL(`/email-templates`, environmentId),
          populateCache: (_, cache) => ({
            ...cache,
            items: cache.items.map((item: EmailTemplate) =>
              item.id === templateId
                ? { ...item, enabled: payload.enabled }
                : item,
            ),
          }),
        },
      ]);

      return data;
    } catch (error: any) {
      console.error('useEmailTemplate.updateStatus', error);
      toast({
        title: 'Updating Status Error',
        description: error?.response?.data?.message || APIErrors.Generic,
        variant: 'destructive',
      });
    }
  }

  return {
    emailTemplate,
    isLoadingEmailTemplate,
    isValidatingEmailTemplate,
    emailTemplateError,
    updateEmailTemplate,
    updateStatus,
  };
}
