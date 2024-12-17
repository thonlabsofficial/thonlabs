'use client';

import React from 'react';
import UsersDataTable from './users-datatable';
import useOrganization from '@/_hooks/use-organization';
import { useParams } from 'next/navigation';
import { User } from '@/_interfaces/user';

export default function OrganizationUsersList() {
  const { organizationId } = useParams();
  const { organization, isLoadingOrganization } = useOrganization({
    organizationId: organizationId as string,
  });

  return (
    <UsersDataTable
      users={organization?.users as User[]}
      loading={isLoadingOrganization}
      hideFields={['organization']}
    />
  );
}
