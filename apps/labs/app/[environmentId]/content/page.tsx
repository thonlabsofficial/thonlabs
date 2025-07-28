import { Files } from 'lucide-react';
import type { Metadata } from 'next';
import PageHeader from '@/_components/page-header';
import PageWrapper from '@/_components/page-wrapper';

export const metadata: Metadata = {
  title: 'Content',
};

export default async function Content() {
  return (
    <>
      <PageHeader title='Content' icon={Files} />
      <PageWrapper withContainer={false}>Content page</PageWrapper>
    </>
  );
}
