import PageWrapper from '@/_components/page-wrapper';
import EditEmailTemplate from '@/_components/edit-email-template';
import { serverEnvHeaders, serverLabsEnvAPI } from '@helpers/api/server';
import { EmailTemplate } from '@/_interfaces/email-template';
import PageHeader from '@/_components/page-header';
import { MailOpen } from 'lucide-react';
import { notFound } from 'next/navigation';
import EditEmailTemplateSettings from '@/_components/edit-email-template-settings';
import EmailDomainStatusAlert from '@/_components/email-domain-status-alert';

type Params = Promise<{ environmentId: string; templateId: string }>;

async function getEmailTemplate(environmentId: string, templateId: string) {
  const { data } = await serverLabsEnvAPI.get<EmailTemplate>(
    `/email-templates/${templateId}`,
    serverEnvHeaders(environmentId),
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
      <EmailDomainStatusAlert />

      <PageHeader
        title={`Email Template: ${emailTemplate.name}`}
        icon={MailOpen}
        withContainer={false}
      />
      <PageWrapper withContainer={false} className="pt-4 grid gap-10">
        <EditEmailTemplate templateId={templateId} />
        <EditEmailTemplateSettings templateId={templateId} />
      </PageWrapper>
    </>
  );
}
