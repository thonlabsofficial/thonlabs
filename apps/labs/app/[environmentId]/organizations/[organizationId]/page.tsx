import PageWrapper from '@/_components/page-wrapper';
import { serverEnvHeaders, serverLabsEnvAPI } from '@helpers/api/server';
import PageHeader from '@/_components/page-header';
import { Building, FileEdit } from 'lucide-react';
import { notFound } from 'next/navigation';
import type {
  Organization,
  OrganizationDetail,
} from '@/_interfaces/organization';
import BoxKeyValue from '@/_components/box-key-value';
import { ImagePreview } from '@repo/ui/image-preview';
import { Badge } from '@repo/ui/badge';
import { Typo } from '@repo/ui/typo';
import UsersDataTable from '@/_components/users-data-table';
import { User } from '@/_interfaces/user';
import NewUserDialog from '@/_components/new-user-dialog';
import { Button } from '@repo/ui/button';
import OrganizationEditDrawer from '@/_components/organization-edit-drawer';
import OrganizationEditDropdownMenu from '@/_components/organization-edit-dropdown-menu';

async function getOrganization(environmentId: string, organizationId: string) {
  const { data } = await serverLabsEnvAPI.get<OrganizationDetail>(
    `/organizations/${organizationId}`,
    serverEnvHeaders(environmentId),
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
      <PageWrapper className="pt-4 grid gap-4">
        <div className="flex gap-8">
          <section>
            <ImagePreview
              src={organization?.logo}
              className="min-w-32 w-auto h-24"
            >
              {!organization?.logo && 'No Logo'}
            </ImagePreview>
          </section>
          <section className="flex flex-1 justify-between mt-1">
            <div className="flex flex-col gap-2">
              <div className="flex gap-8">
                <BoxKeyValue label="Name" value={organization?.name} />
                <BoxKeyValue
                  label="OID (Organization ID)"
                  value={
                    <Badge
                      variant={'outline'}
                      size={'xs'}
                      className="cursor-text"
                    >
                      {organization?.id}
                    </Badge>
                  }
                  withCopy
                  copyValue={organization?.id}
                />
                <BoxKeyValue
                  label="Status"
                  value={
                    <Badge
                      variant={organization?.active ? 'success' : 'destructive'}
                      size={'sm'}
                      className="cursor-text"
                    >
                      {organization?.active ? 'Active' : 'Inactive'}
                    </Badge>
                  }
                />
                <BoxKeyValue
                  label="Total Users"
                  value={organization?.users.length}
                />
              </div>
              <div className="flex gap-8">
                <BoxKeyValue
                  label="Domains"
                  value={organization?.domains.map(({ domain }) => (
                    <Badge
                      key={domain}
                      variant={'outline'}
                      size={'sm'}
                      className="cursor-text"
                    >
                      {domain}
                    </Badge>
                  ))}
                />
              </div>
            </div>
            <div>
              <div className="flex gap-1 justify-end">
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
          <Typo as="div" variant={'h4'} className="mb-2">
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
