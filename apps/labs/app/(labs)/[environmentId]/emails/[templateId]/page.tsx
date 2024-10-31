import { Metadata } from 'next';
import PageWrapper from '@labs/_components/page-wrapper';
import PageHeader from '@labs/_components/page-header';
import { LuMail } from 'react-icons/lu';
import EditEmailTemplate from '@labs/[environmentId]/emails/_components/edit-email-template';

export const metadata: Metadata = {
  title: 'Email Detail',
};

export default function EmailDetail({
  params: { templateId },
}: {
  params: { templateId: string };
}) {
  return (
    <>
      <PageHeader title="Email Detail" icon={LuMail} withContainer={false} />
      <PageWrapper withContainer={false}>
        <EditEmailTemplate templateId={templateId} />
      </PageWrapper>
    </>
  );
}
