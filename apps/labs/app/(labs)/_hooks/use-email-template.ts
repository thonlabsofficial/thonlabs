import { envHeaders, envURL, labsEnvAPI } from '@helpers/api';
import { useToast } from '@repo/ui/hooks/use-toast';
import { APIErrors } from '@helpers/api/api-errors';
import useOptimisticUpdate from '@labs/_hooks/use-optmistic-update';
import useUserSession from '@labs/_hooks/use-user-session';
import { UpdateEmailTemplatePayload } from '@labs/_validators/emails-validators';
import { EmailTemplate } from '@labs/_interfaces/email-template';
import useSWR from 'swr';

interface Params {
  templateId?: string;
}

export default function useEmailTemplate(params: Params = {}) {
  const {
    data: emailTemplate,
    isLoading: isLoadingEmailTemplate,
    isValidating: isValidatingEmailTemplate,
    error: emailTemplateError,
  } = useSWR<EmailTemplate>(
    () => params.templateId && `/email-templates/${params.templateId}`,
  );
  const { environment } = useUserSession();
  const { toast } = useToast();
  const { makeMutations } = useOptimisticUpdate();

  async function updateEmailTemplate(
    templateId: string,
    payload: UpdateEmailTemplatePayload,
  ) {
    try {
      const { data } = await labsEnvAPI.patch<EmailTemplate>(
        `/email-templates/${templateId}`,
        payload,
        envHeaders(environment.id),
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
          cacheKey: envURL(`/email-templates`, environment.id),
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
    }
  }

  return {
    emailTemplate,
    isLoadingEmailTemplate,
    isValidatingEmailTemplate,
    emailTemplateError,
    updateEmailTemplate,
  };
}
