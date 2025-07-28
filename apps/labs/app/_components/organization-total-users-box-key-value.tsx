'use client';

import BoxKeyValue from '@/_components/box-key-value';
import useOrganization from '@/_hooks/use-organization';

interface Props {
  organizationId: string;
}

export default function OrganizationTotalUsersBoxKeyValue({
  organizationId,
}: Props) {
  const { organization, isLoadingOrganization } = useOrganization({
    organizationId,
  });

  return (
    <BoxKeyValue
      label='Total Users'
      loading={isLoadingOrganization}
      value={organization?.users.length}
    />
  );
}
