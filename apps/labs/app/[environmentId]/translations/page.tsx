import { Earth } from 'lucide-react';
import type { Metadata } from 'next';
import PageHeader from '@/_components/page-header';
import PageWrapper from '@/_components/page-wrapper';

export const metadata: Metadata = {
  title: 'Translations',
};

export default async function Translations() {
  return (
    <>
      <PageHeader title='Translations' icon={Earth} />
      <PageWrapper withContainer={false}>Translations page</PageWrapper>
    </>
  );
}
