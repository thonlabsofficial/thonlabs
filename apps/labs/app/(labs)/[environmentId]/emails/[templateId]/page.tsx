import { Metadata } from 'next';
import PageWrapper from '@labs/_components/page-wrapper';
import PageHeader from '@labs/_components/page-header';
import { LuMail } from 'react-icons/lu';
import EmailTemplateEditor from './_components/email-template-editor';

export const metadata: Metadata = {
  title: 'Email Template Details',
};

export default function EmailTemplateDetails() {
  return (
    <>
      <PageHeader title="Email Template Details" icon={LuMail} withContainer />
      <PageWrapper className="pt-4">
        {/* <RichTextEditor /> */}
        <EmailTemplateEditor />
      </PageWrapper>
    </>
  );
}
