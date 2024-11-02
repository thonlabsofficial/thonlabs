import { Metadata } from 'next';
import PageWrapper from '@/_components/page-wrapper';
import PageHeader from '@/_components/page-header';
import React from 'react';
import { BookUser } from 'lucide-react';

export const metadata: Metadata = {
  title: 'KYC Builder',
};

export default async function KYCBuilder() {
  return (
    <>
      <PageHeader title="KYC Builder" icon={BookUser} />
      <PageWrapper withContainer={false}>KYC Builder page</PageWrapper>
    </>
  );
}
