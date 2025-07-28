import { Mail } from 'lucide-react';
import type { Metadata } from 'next';
import EmailProvidersList from '@/_components/email-providers-list';
import EmailTemplatesList from '@/_components/email-templates-list';
import PageHeader from '@/_components/page-header';
import PageWrapper from '@/_components/page-wrapper';
import SectionHeader from '@/_components/section-header';
import { fetchEmailTemplates } from '@/_services/email-template-service';

export const metadata: Metadata = {
  title: 'Emails',
};

type Params = Promise<{ environmentId: string }>;

export default async function Emails({ params }: { params: Params }) {
  const { environmentId } = await params;
  const { items: emailTemplates } = await fetchEmailTemplates(environmentId);

  return (
    <>
      <PageHeader title='Email Templates' icon={Mail} />

      <PageWrapper className='grid gap-12'>
        <section>
          <EmailTemplatesList emailTemplates={emailTemplates} />
        </section>

        <section>
          <SectionHeader
            title='Integrations'
            description='Connect your email provider to send emails'
          />
          <EmailProvidersList />
        </section>
      </PageWrapper>
    </>
  );
}
