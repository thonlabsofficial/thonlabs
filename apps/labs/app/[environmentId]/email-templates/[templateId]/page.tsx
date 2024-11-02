import PageWrapper from '@/_components/page-wrapper';
import EditEmailTemplate from '@/_components/edit-email-template';
import { serverEnvHeaders, serverLabsEnvAPI } from '@helpers/api/server';
import { EmailTemplate } from '@/_interfaces/email-template';
import PageHeader from '@/_components/page-header';
import { MailOpen } from 'lucide-react';
import { notFound } from 'next/navigation';

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

interface Props {
  params: { environmentId: string; templateId: string };
}

export async function generateMetadata({
  params: { environmentId, templateId },
}: Props) {
  const emailTemplate = await getEmailTemplate(environmentId, templateId);

  return { title: `${emailTemplate.name} · Email Templates` };
}

export default async function EmailDetail({
  params: { environmentId, templateId },
}: Props) {
  const emailTemplate = await getEmailTemplate(environmentId, templateId);

  return (
    <>
      <PageHeader
        title={emailTemplate.name}
        icon={MailOpen}
        withContainer={false}
      />
      <PageWrapper withContainer={false}>
        <EditEmailTemplate templateId={templateId} />
      </PageWrapper>
    </>
  );
}
