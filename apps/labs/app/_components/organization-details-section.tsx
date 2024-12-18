'use client';

import { ImagePreview } from '@repo/ui/image-preview';
import useOrganization from '@/_hooks/use-organization';
import { Typo } from '@repo/ui/typo';
import BoxKeyValue from './box-key-value';
import { Badge } from '@repo/ui/badge';

interface Props {
  organizationId: string;
}

export default function OrganizationDetailsSection({ organizationId }: Props) {
  const { organization, isLoadingOrganization } = useOrganization({
    organizationId,
  });

  return (
    <div className="flex gap-8">
      <div>
        <ImagePreview
          imageSRC={`${process.env.NEXT_PUBLIC_TL_EXT_FILES}/organizations/${organization?.id}/images/${organization?.logo}`}
          className="min-w-32 w-auto h-24"
        >
          {isLoadingOrganization ? (
            <Typo variant={'lg'}>Loading...</Typo>
          ) : (
            <>
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
            </>
          )}
        </ImagePreview>
      </div>
      <div className="flex gap-8 mt-3">
        <BoxKeyValue
          label="Name"
          value={organization?.name}
          loading={isLoadingOrganization}
        />
        <BoxKeyValue
          label="OID (Organization ID)"
          value={
            <Badge variant={'outline'} size={'xs'} className="cursor-text">
              {organization?.id}
            </Badge>
          }
          loading={isLoadingOrganization}
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
          loading={isLoadingOrganization}
        />
        <BoxKeyValue
          label="Total Users"
          loading={isLoadingOrganization}
          value={organization?.users.length}
        />
      </div>
    </div>
  );
}
