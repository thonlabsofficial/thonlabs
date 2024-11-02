import { Metadata } from 'next';
import PageWrapper from '@/_components/page-wrapper';
import PageHeader from '@/_components/page-header';
import React from 'react';
import { Earth } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Translations',
};

export default async function Translations() {
  return (
    <>
      <PageHeader title="Translations" icon={Earth} />
      <PageWrapper withContainer={false}>Translations page</PageWrapper>
    </>
  );
}
