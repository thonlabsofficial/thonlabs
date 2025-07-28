import { Button } from '@repo/ui/button';
import { Building } from 'lucide-react';
import type { Metadata } from 'next';
import NewOrganizationDrawer from '@/_components/new-organization-drawer';
import OrganizationsDataTable from '@/_components/organizations-data-table';
import PageHeader from '@/_components/page-header';
import PageWrapper from '@/_components/page-wrapper';
import { fetchOrganizations } from '@/_services/organization-service';

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
        title='Organizations'
        icon={Building}
        actions={
          <NewOrganizationDrawer trigger={<Button>New Organization</Button>} />
        }
      />
      <PageWrapper className='grid gap-12 pt-4'>
        <OrganizationsDataTable organizations={organizations} />
      </PageWrapper>
    </>
  );
}
