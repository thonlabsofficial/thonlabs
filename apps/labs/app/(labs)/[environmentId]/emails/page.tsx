import { Metadata } from 'next';
import PageWrapper from '@labs/_components/page-wrapper';
import PageHeader from '@labs/_components/page-header';
import { LuMail } from 'react-icons/lu';
import EmailTemplatesList from '@labs/[environmentId]/emails/_components/email-templates-list';

export const metadata: Metadata = {
  title: 'Emails',
};

export default function Emails() {
  return (
    <>
      <PageHeader title="Emails" icon={LuMail} />
      <PageWrapper withContainer={false}>
        <EmailTemplatesList />
      </PageWrapper>
    </>
  );
}
