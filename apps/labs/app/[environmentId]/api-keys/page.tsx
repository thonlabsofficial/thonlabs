import { Metadata } from 'next';
import PageWrapper from '@/_components/page-wrapper';
import PageHeader from '@/_components/page-header';
import React from 'react';
import APIKeysSettings from '@/_components/api-key-settings';
import { LockKeyhole } from 'lucide-react';
import CustomDomainSettings from '@/_components/custom-domain-settings';
import EnvironmentIdCard from '@/_components/envionment-id-card';

export const metadata: Metadata = {
  title: 'Integration & Keys',
};

export default async function APIKeys() {
  return (
    <>
      <PageHeader
        title="Integration & Keys"
        description="Connect these keys with our libraries components, SDKs, or APIs"
        icon={LockKeyhole}
        withContainer
      />
      <PageWrapper className="pt-4 grid gap-4">
        <EnvironmentIdCard />
        <CustomDomainSettings />
        <APIKeysSettings />
      </PageWrapper>
    </>
  );
}
