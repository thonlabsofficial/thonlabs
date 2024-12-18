import { Metadata } from 'next';
import PageWrapper from '@/_components/page-wrapper';
import PageHeader from '@/_components/page-header';
import EmailTemplatesList from '@/_components/email-templates-list';
import { Mail } from 'lucide-react';
import EmailDomainStatusAlert from '@/_components/email-domain-status-alert';
import { fetchEmailTemplates } from '@/_services/email-template-service';

export const metadata: Metadata = {
  title: 'Emails',
};

interface Props {
  params: {
    environmentId: string;
  };
}

export default async function Emails({ params }: Props) {
  const { items: emailTemplates } = await fetchEmailTemplates(
    params.environmentId,
  );

  return (
    <>
      <EmailDomainStatusAlert />

      <PageHeader title="Email Templates" icon={Mail} />

      <PageWrapper withContainer={false} className="grid gap-12">
        <section>
          <EmailTemplatesList emailTemplates={emailTemplates} />
        </section>
      </PageWrapper>
    </>
  );
}
