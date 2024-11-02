import { Metadata } from 'next';
import PageWrapper from '@/_components/page-wrapper';
import PageHeader from '@/_components/page-header';
import React from 'react';
import { Building } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Organizations',
};

export default async function Organizations() {
  return (
    <>
      <PageHeader title="Organizations" icon={Building} />
      <PageWrapper withContainer={false}>Organizations page</PageWrapper>
    </>
  );
}
