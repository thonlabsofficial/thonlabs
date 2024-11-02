import { Metadata } from 'next';
import PageWrapper from '@/_components/page-wrapper';
import PageHeader from '@/_components/page-header';
import React from 'react';
import { Globe } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Email Domains',
};

export default async function EmailDomains() {
  return (
    <>
      <PageHeader title="Email Domains" icon={Globe} />
      <PageWrapper withContainer={false}>Email Domains page</PageWrapper>
    </>
  );
}
