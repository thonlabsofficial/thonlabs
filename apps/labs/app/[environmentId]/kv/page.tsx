import { DatabaseZap } from 'lucide-react';
import type { Metadata } from 'next';
import PageHeader from '@/_components/page-header';
import PageWrapper from '@/_components/page-wrapper';

export const metadata: Metadata = {
  title: 'Key/Value',
};

export default async function KV() {
  return (
    <>
      <PageHeader title='Key/Value' icon={DatabaseZap} />
      <PageWrapper withContainer={false}>KV page</PageWrapper>
    </>
  );
}
