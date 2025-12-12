import { Metadata } from 'next';
import PageWrapper from '@/_components/page-wrapper';
import PageHeader from '@/_components/page-header';
import React from 'react';
import { Building, PlusIcon } from 'lucide-react';
import OrganizationsDataTable from '@/_components/organizations-data-table';
import NewOrganizationDrawer from '@/_components/new-organization-drawer';
import { ButtonIcon } from '@repo/ui/button-icon';

export const metadata: Metadata = {
  title: 'Organizations',
};

export default async function Organizations() {
  return (
    <>
      <PageHeader
        title="Organizations"
        description="The list of all organizations in this environment"
        icon={Building}
      />
      <PageWrapper>
        <OrganizationsDataTable
          actions={
            <NewOrganizationDrawer
              trigger={<ButtonIcon variant="outline" icon={PlusIcon} />}
            />
          }
        />
      </PageWrapper>
    </>
  );
}
