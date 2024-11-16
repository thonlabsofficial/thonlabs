import { Metadata } from 'next';
import PageWrapper from '@/_components/page-wrapper';
import PageHeader from '@/_components/page-header';
import React from 'react';
import { Files } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Content',
};

export default async function Content() {
  return (
    <>
      <PageHeader title="Content" icon={Files} />
      <PageWrapper withContainer={false}>Content page</PageWrapper>
    </>
  );
}
