import { Metadata } from 'next';
import PageWrapper from '@/_components/page-wrapper';
import PageHeader from '@/_components/page-header';
import React from 'react';
import { Building } from 'lucide-react';
import SectionHeader from '@/_components/section-header';
import OrganizationsList from '@/_components/organizations-list';

export const metadata: Metadata = {
  title: 'Organizations',
};

export default async function Organizations() {
  return (
    <>
      <PageHeader title="Organizations" icon={Building} />
      <PageWrapper withContainer={false} className="pt-4 grid gap-12">
        <OrganizationsList />
      </PageWrapper>
    </>
  );
}
