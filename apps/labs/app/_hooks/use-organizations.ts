import { envFetcher, envURL } from '@helpers/api';
import useSWR from 'swr';
import React from 'react';
import { useParams } from 'next/navigation';
import { Organization } from '@/_interfaces/organization';

interface OrganizationsResponse {
  items: Organization[];
}

export function useOrganizations() {
  const { environmentId } = useParams();
  const { data, error, isLoading } = useSWR<OrganizationsResponse>(
    envURL('/organizations', environmentId as string),
    envFetcher(environmentId as string),
  );

  const organizations = React.useMemo(() => {
    return data?.items || [];
  }, [data]);

  return {
    organizations,
    organizationsError: error,
    isLoadingOrganizations: isLoading,
  };
}
