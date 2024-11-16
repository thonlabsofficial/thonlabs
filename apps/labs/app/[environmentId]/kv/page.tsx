import { Metadata } from 'next';
import PageWrapper from '@/_components/page-wrapper';
import PageHeader from '@/_components/page-header';
import React from 'react';
import { DatabaseZap } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Key/Value',
};

export default async function KV() {
  return (
    <>
      <PageHeader title="Key/Value" icon={DatabaseZap} />
      <PageWrapper withContainer={false}>KV page</PageWrapper>
    </>
  );
}
