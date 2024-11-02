import { Metadata } from 'next';
import PageWrapper from '@/_components/page-wrapper';
import PageHeader from '@/_components/page-header';
import React from 'react';
import { Flag } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Feature Flags',
};

export default async function FeatureFlags() {
  return (
    <>
      <PageHeader title="Feature Flags" icon={Flag} />
      <PageWrapper withContainer={false}>Feature Flags page</PageWrapper>
    </>
  );
}
