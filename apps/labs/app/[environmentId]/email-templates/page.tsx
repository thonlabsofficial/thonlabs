import { Metadata } from 'next';
import PageWrapper from '@/_components/page-wrapper';
import PageHeader from '@/_components/page-header';
import EmailTemplatesList from '@/_components/email-templates-list';
import { Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Email Templates',
};

export default function Emails() {
  return (
    <>
      <PageHeader title="Email Templates" icon={Mail} />
      <PageWrapper withContainer={false}>
        <EmailTemplatesList />
      </PageWrapper>
    </>
  );
}
