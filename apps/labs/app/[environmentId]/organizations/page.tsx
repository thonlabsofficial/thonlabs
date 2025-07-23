import { Metadata } from 'next';
import PageWrapper from '@/_components/page-wrapper';
import PageHeader from '@/_components/page-header';
import React from 'react';
import { Building } from 'lucide-react';
import OrganizationsDataTable from '@/_components/organizations-data-table';
import { fetchOrganizations } from '@/_services/organization-service';
import NewOrganizationDrawer from '@/_components/new-organization-drawer';
import { Button } from '@repo/ui/button';

export const metadata: Metadata = {
  title: 'Organizations',
};

type Params = Promise<{ environmentId: string }>;

export default async function Organizations({ params }: { params: Params }) {
  const { environmentId } = await params;
  const { items: organizations } = await fetchOrganizations(environmentId);

  return (
    <>
      <PageHeader
        title="Organizations"
        icon={Building}
        actions={
          <NewOrganizationDrawer trigger={<Button>New Organization</Button>} />
        }
      />
      <PageWrapper className="pt-4 grid gap-12">
        <OrganizationsDataTable organizations={organizations} />
      </PageWrapper>
    </>
  );
}
