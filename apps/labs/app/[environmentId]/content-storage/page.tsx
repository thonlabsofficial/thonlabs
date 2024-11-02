import { Metadata } from 'next';
import PageWrapper from '@/_components/page-wrapper';
import PageHeader from '@/_components/page-header';
import React from 'react';
import { Files } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Content Storage',
};

export default async function ContentStorage() {
  return (
    <>
      <PageHeader title="Content Storage" icon={Files} />
      <PageWrapper withContainer={false}>Content Storage page</PageWrapper>
    </>
  );
}
