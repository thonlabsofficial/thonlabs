import { Metadata } from 'next';
import PageWrapper from '@/_components/page-wrapper';
import PageHeader from '@/_components/page-header';
import EmailTemplatesList from '@/_components/email-templates-list';
import { Mail } from 'lucide-react';
import EmailDomainStatusAlert from '@/_components/email-domain-status-alert';

export const metadata: Metadata = {
  title: 'Emails',
};

export default function Emails() {
  return (
    <>
      <PageWrapper withContainer={false} className="mt-3">
        <EmailDomainStatusAlert />
      </PageWrapper>
      <PageHeader title="Email Templates" icon={Mail} />
      <PageWrapper withContainer={false} className="grid gap-12">
        <section>
          <EmailTemplatesList />
        </section>
      </PageWrapper>
    </>
  );
}
