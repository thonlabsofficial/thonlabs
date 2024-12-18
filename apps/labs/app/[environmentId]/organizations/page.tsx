import { Metadata } from 'next';
import PageWrapper from '@/_components/page-wrapper';
import PageHeader from '@/_components/page-header';
import React from 'react';
import { Building } from 'lucide-react';
import OrganizationsDataTable from '@/_components/organizations-data-table';
import { fetchOrganizations } from '@/_services/organization-service';

export const metadata: Metadata = {
  title: 'Organizations',
};

interface Props {
  params: { environmentId: string };
}

export default async function Organizations({ params }: Props) {
  const { items: organizations } = await fetchOrganizations(
    params.environmentId,
  );

  return (
    <>
      <PageHeader title="Organizations" icon={Building} />
      <PageWrapper withContainer={false} className="pt-4 grid gap-12">
        <OrganizationsDataTable organizations={organizations} />
      </PageWrapper>
    </>
  );
}
