import PageWrapper from '@/_components/page-wrapper';
import { serverEnvHeaders, serverLabsEnvAPI } from '@helpers/api/server';
import PageHeader from '@/_components/page-header';
import {
  Building,
  Delete,
  FileEdit,
  ImageUp,
  MoreHorizontal,
} from 'lucide-react';
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@repo/ui/dropdown';
import { ButtonIcon } from '@repo/ui/button-icon';
import EditOrganizationDrawer from '@/_components/edit-organization-drawer';
import EditOrganizationLogoDrawer from '@/_components/edit-organization-logo-drawer';
import OrganizationDeleteLogo from '@/_components/organization-delete-logo';

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

interface Props {
  params: { environmentId: string; organizationId: string };
}

export async function generateMetadata({
  params: { environmentId, organizationId },
}: Props) {
  const organization = await getOrganization(environmentId, organizationId);

  return { title: `Organization: ${organization.name} · Organizations` };
}

export default async function OrganizationDetail({
  params: { environmentId, organizationId },
}: Props) {
  const organization = await getOrganization(environmentId, organizationId);

  return (
    <>
      <PageHeader
        title={`Organization: ${organization.name}`}
        icon={Building}
        withContainer={false}
      />
      <PageWrapper withContainer={false} className="pt-4 grid gap-4">
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
                <EditOrganizationDrawer
                  trigger={
                    <Button size={'sm'} variant={'outline'} icon={FileEdit}>
                      Edit
                    </Button>
                  }
                  organization={organization}
                />
                <EditOrganizationLogoDrawer
                  trigger={
                    <Button size={'sm'} variant={'outline'} icon={ImageUp}>
                      {organization?.logo ? 'Change Logo' : 'Upload Logo'}
                    </Button>
                  }
                  organization={organization}
                />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <ButtonIcon
                      variant="outline"
                      icon={MoreHorizontal}
                      size={'sm'}
                      data-dt-bypass-click="true"
                    />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="w-56"
                    align="end"
                    data-dt-bypass-click="true"
                  >
                    <DropdownMenuGroup>
                      {organization.logo && (
                        <>
                          <OrganizationDeleteLogo
                            organizationId={organization.id}
                          />
                          <DropdownMenuSeparator />
                        </>
                      )}
                      <DropdownMenuItem variant={'destructive'}>
                        <Delete className="mr-2 h-4 w-4" />
                        <span>Delete</span>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
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
