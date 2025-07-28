import { envFetcher, envHeaders, envURL, labsEnvAPI } from '@helpers/api';
import { APIErrors } from '@helpers/api/api-errors';
import { useToast } from '@repo/ui/hooks/use-toast';
import { useEffect } from 'react';
import useSWR from 'swr';
import useOptimisticUpdate from '@/_hooks/use-optimistic-update';
import useUserSession from '@/_hooks/use-user-session';
import type { EmailTemplate } from '@/_interfaces/email-template';
import { revalidateCache } from '@/_services/server-cache-service';
import type {
  UpdateEmailTemplatePayload,
  UpdateEmailTemplateStatusPayload,
} from '@/_validators/emails-validators';

interface Params {
  templateId?: string;
}

type Options = {
  onFetchComplete?: () => void;
};

export default function useEmailTemplate(
  params: Params = {},
  { onFetchComplete }: Options = {}
) {
  const { environmentId } = useUserSession();
  const {
    data: emailTemplate,
    isLoading: isLoadingEmailTemplate,
    isValidating: isValidatingEmailTemplate,
    error: emailTemplateError,
  } = useSWR<EmailTemplate>(
    () => params.templateId && `/email-templates/${params.templateId}`,
    envFetcher(environmentId)
  );
  const { toast } = useToast();
  const { makeMutations } = useOptimisticUpdate();

  useEffect(() => {
    onFetchComplete?.();
  }, [onFetchComplete]);

  async function updateEmailTemplate(
    templateId: string,
    payload: UpdateEmailTemplatePayload
  ) {
    try {
      const { data } = await labsEnvAPI.patch<EmailTemplate>(
        `/email-templates/${templateId}`,
        payload,
        envHeaders(environmentId)
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
                : item
            ),
          }),
        },
      ]);

      return data;
    } catch (error: any) {
      console.error('useEmailTemplate.updateEmailTemplate', error);
      toast({
        title: 'Updating Error',
        description: error?.response?.data?.message || APIErrors.GenericForm,
        variant: 'destructive',
      });
      throw error;
    }
  }

  async function updateStatus(
    templateId: string,
    payload: UpdateEmailTemplateStatusPayload
  ) {
    try {
      const { data } = await labsEnvAPI.patch<EmailTemplate>(
        `/email-templates/${templateId}/status`,
        payload,
        envHeaders(environmentId)
      );

      toast({
        title: 'Status Updated',
        description: `"${data.name}" email template has been ${payload.enabled ? 'activated' : 'deactivated'}`,
      });

      // TODO: decide what approach to use (CSR or SSR) and apply the correct cache validation
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
                : item
            ),
          }),
        },
      ]);

      await revalidateCache([`/${environmentId}/email-templates`]);

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

  function parseHTMLEmailTemplate(
    content: string,
    bodyStyles: UpdateEmailTemplatePayload['bodyStyles']
  ) {
    const shouldIncludeUnit = ['padding'];
    let bodyInlineStyles = '';

    Object.entries(bodyStyles).forEach(([key, value]) => {
      bodyInlineStyles += `${key.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`)}:${value}${shouldIncludeUnit.includes(key) ? 'px' : ''};`;
    });

    return [
      '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">',
      '<html>',
      '<div style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0"><% if (preview) { %><%= preview %><div style="display:none;opacity:0;overflow:hidden;height:0;width:0;max-height:0;max-width:0;font-size:1px;line-height:1px">‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌<wbr /> ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌<wbr /> ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌<wbr /> ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌<wbr /> ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌<wbr /> ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌<wbr /> ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌<wbr /> ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌<wbr /> ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌<wbr /> ‌ ‌ ‌ ‌ ‌ </div><% } %></div>',
      '<head>',
      '<meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />',
      '</head>',
      `<body style="font-family:sans-serif;margin:0px;${bodyInlineStyles}">`,
      content,
      '</body>',
      '</html>',
    ].join('');
  }

  return {
    emailTemplate,
    isLoadingEmailTemplate,
    isValidatingEmailTemplate,
    emailTemplateError,
    updateEmailTemplate,
    updateStatus,
    parseHTMLEmailTemplate,
  };
}
