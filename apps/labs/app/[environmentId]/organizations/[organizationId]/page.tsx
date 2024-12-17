import PageWrapper from '@/_components/page-wrapper';
import { serverEnvHeaders, serverLabsEnvAPI } from '@helpers/api/server';
import PageHeader from '@/_components/page-header';
import { Building } from 'lucide-react';
import { notFound } from 'next/navigation';
import type { OrganizationDetail } from '@/_interfaces/organization';
import BoxKeyValue from '@/_components/box-key-value';
import { ImagePreview } from '@repo/ui/image-preview';
import { Badge } from '@repo/ui/badge';
import { Typo } from '@repo/ui/typo';
import OrganizationUsersList from '@/_components/organization-users-list';

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
          <div>
            <ImagePreview
              imageSRC={`${process.env.NEXT_PUBLIC_TL_EXT_FILES}/organizations/${organization?.id}/images/${organization?.logo}`}
              className="min-w-32 w-auto h-24"
            >
              {organization?.logo ? (
                <img
                  src={`${process.env.NEXT_PUBLIC_TL_EXT_FILES}/organizations/${organization?.id}/images/${organization?.logo}`}
                  alt="Logo"
                  className="h-full object-contain"
                  crossOrigin="anonymous"
                />
              ) : (
                <Typo variant={'lg'}>No Logo</Typo>
              )}
            </ImagePreview>
          </div>
          <div className="flex gap-8">
            <BoxKeyValue label="Name" value={organization?.name} />
            <BoxKeyValue
              label="OID (Organization ID)"
              value={
                <Badge variant={'outline'} size={'xs'} className="cursor-text">
                  {organization?.id}
                </Badge>
              }
              withCopy
            />
            {/* <BoxKeyValue
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
              /> */}
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
          <Typo variant={'muted'} className="font-semibold">
            Users
          </Typo>
          <OrganizationUsersList />
        </div>
      </PageWrapper>
    </>
  );
}
