'use server';

import { serverEnvHeaders, serverLabsEnvAPI } from '@helpers/api/server';
import { notFound } from 'next/navigation';
import type { EmailTemplate } from '@/_interfaces/email-template';

interface FetchEmailTemplatesResponse {
  items: EmailTemplate[];
}

export async function fetchEmailTemplates(environmentId: string) {
  const { data } = await serverLabsEnvAPI.get<FetchEmailTemplatesResponse>(
    `/email-templates`,
    serverEnvHeaders(environmentId)
  );

  if (!data?.items) {
    notFound();
  }

  return data;
}
