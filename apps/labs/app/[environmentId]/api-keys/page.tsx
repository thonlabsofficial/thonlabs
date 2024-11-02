import { Metadata } from 'next';
import PageWrapper from '@/_components/page-wrapper';
import PageHeader from '@/_components/page-header';
import React from 'react';
import APIKeysSettings from '@/_components/api-key-settings';
import { LockKeyhole } from 'lucide-react';

export const metadata: Metadata = {
  title: 'API Keys',
};

export default async function APIKeys() {
  return (
    <>
      <PageHeader
        title="API Keys"
        description="Connect these keys with our libraries, SDKs, or APIs"
        icon={LockKeyhole}
        withContainer
      />
      <PageWrapper className="pt-4 grid gap-6">
        <APIKeysSettings />
      </PageWrapper>
    </>
  );
}
