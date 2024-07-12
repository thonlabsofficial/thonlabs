import { Metadata } from 'next';
import PageWrapper from '@labs/_components/page-wrapper';
import PageHeader from '@labs/_components/page-header';

export const metadata: Metadata = {
  title: 'Emails',
};

export default function Emails() {
  return (
    <>
      <PageHeader title="Emails" />
      <PageWrapper>Emails page</PageWrapper>
    </>
  );
}
