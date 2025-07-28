import { serverEnvHeaders, serverLabsEnvAPI } from '@helpers/api/server';
import { Badge } from '@repo/ui/badge';
import { Button } from '@repo/ui/button';
import { ImagePreview } from '@repo/ui/image-preview';
import { Typo } from '@repo/ui/typo';
import { Building, FileEdit } from 'lucide-react';
import { notFound } from 'next/navigation';
import BoxKeyValue from '@/_components/box-key-value';
import NewUserDialog from '@/_components/new-user-dialog';
import OrganizationEditDrawer from '@/_components/organization-edit-drawer';
import OrganizationEditDropdownMenu from '@/_components/organization-edit-dropdown-menu';
import PageHeader from '@/_components/page-header';
import PageWrapper from '@/_components/page-wrapper';
import UsersDataTable from '@/_components/users-data-table';
import type {
  Organization,
  OrganizationDetail,
} from '@/_interfaces/organization';
import type { User } from '@/_interfaces/user';

async function getOrganization(environmentId: string, organizationId: string) {
  const { data } = await serverLabsEnvAPI.get<OrganizationDetail>(
    `/organizations/${organizationId}`,
    serverEnvHeaders(environmentId)
  );

  if (!data) {
    notFound();
  }

  return data;
}

type Params = Promise<{ environmentId: string; organizationId: string }>;

export async function generateMetadata({ params }: { params: Params }) {
  const { environmentId, organizationId } = await params;
  const organization = await getOrganization(environmentId, organizationId);

  return { title: `Organization: ${organization.name} · Organizations` };
}

export default async function OrganizationDetail({
  params,
}: {
  params: Params;
}) {
  const { environmentId, organizationId } = await params;
  const organization = await getOrganization(environmentId, organizationId);

  return (
    <>
      <PageHeader
        title={`Organization - ${organization.name}`}
        icon={Building}
      />
      <PageWrapper className='grid gap-4 pt-4'>
        <div className='flex gap-8'>
          <section>
            <ImagePreview
              src={organization?.logo}
              className='h-24 w-auto min-w-32'
            >
              {!organization?.logo && 'No Logo'}
            </ImagePreview>
          </section>
          <section className='mt-1 flex flex-1 justify-between'>
            <div className='flex flex-col gap-2'>
              <div className='flex gap-8'>
                <BoxKeyValue label='Name' value={organization?.name} />
                <BoxKeyValue
                  label='OID (Organization ID)'
                  value={
                    <Badge
                      variant={'outline'}
                      size={'xs'}
                      className='cursor-text'
                    >
                      {organization?.id}
                    </Badge>
                  }
                  withCopy
                />
                <BoxKeyValue
                  label='Status'
                  value={
                    <Badge
                      variant={organization?.active ? 'success' : 'destructive'}
                      size={'sm'}
                      className='cursor-text'
                    >
                      {organization?.active ? 'Active' : 'Inactive'}
                    </Badge>
                  }
                />
                <BoxKeyValue
                  label='Total Users'
                  value={organization?.users.length}
                />
              </div>
              <div className='flex gap-8'>
                <BoxKeyValue
                  label='Domains'
                  value={organization?.domains.map(({ domain }) => (
                    <Badge
                      key={domain}
                      variant={'outline'}
                      size={'sm'}
                      className='cursor-text'
                    >
                      {domain}
                    </Badge>
                  ))}
                />
              </div>
            </div>
            <div>
              <div className='flex justify-end gap-1'>
                <OrganizationEditDrawer
                  trigger={
                    <Button size={'sm'} variant={'outline'} icon={FileEdit}>
                      Edit
                    </Button>
                  }
                  organization={organization}
                />
                <OrganizationEditDropdownMenu organization={organization} />
              </div>
            </div>
          </section>
        </div>
        <div>
          <Typo as='div' variant={'h4'} className='mb-2'>
            Users
          </Typo>
          <UsersDataTable
            users={organization?.users as User[]}
            hideFields={['organization']}
            actions={
              <NewUserDialog
                trigger={
                  <Button size={'sm'} variant={'outline'}>
                    New User
                  </Button>
                }
                organization={organization as Organization}
              />
            }
          />
        </div>
      </PageWrapper>
    </>
  );
}
