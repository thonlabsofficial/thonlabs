import { serverEnvHeaders, serverLabsEnvAPI } from '@helpers/api/server';
import { MailOpen } from 'lucide-react';
import { notFound } from 'next/navigation';
import EditEmailTemplate from '@/_components/edit-email-template';
import EditEmailTemplateSettings from '@/_components/edit-email-template-settings';
import PageHeader from '@/_components/page-header';
import PageWrapper from '@/_components/page-wrapper';
import type { EmailTemplate } from '@/_interfaces/email-template';

type Params = Promise<{ environmentId: string; templateId: string }>;

async function getEmailTemplate(environmentId: string, templateId: string) {
  const { data } = await serverLabsEnvAPI.get<EmailTemplate>(
    `/email-templates/${templateId}`,
    serverEnvHeaders(environmentId)
  );

  if (!data) {
    notFound();
  }

  return data;
}

export async function generateMetadata({ params }: { params: Params }) {
  const { environmentId, templateId } = await params;
  const emailTemplate = await getEmailTemplate(environmentId, templateId);

  return { title: `Email Template: ${emailTemplate.name} · Emails` };
}

export default async function EmailDetail({ params }: { params: Params }) {
  const { environmentId, templateId } = await params;
  const emailTemplate = await getEmailTemplate(environmentId, templateId);

  return (
    <>
      <PageHeader
        title={`Email Template: ${emailTemplate.name}`}
        icon={MailOpen}
        withContainer={false}
      />
      <PageWrapper withContainer={false} className='grid gap-10 pt-4'>
        <EditEmailTemplate templateId={templateId} />
        <EditEmailTemplateSettings templateId={templateId} />
      </PageWrapper>
    </>
  );
}
