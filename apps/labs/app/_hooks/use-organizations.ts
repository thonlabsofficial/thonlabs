import { envFetcher, envURL } from '@helpers/api';
import useSWR from 'swr';
import React from 'react';
import { useParams } from 'next/navigation';
import { Organization } from '@/_interfaces/organization';

interface UseOrganizationsParams {
  executeQuery?: boolean;
}

const DEFAULT_PARAMS: UseOrganizationsParams = {
  executeQuery: true,
};

interface OrganizationsResponse {
  items: Organization[];
}

export function useOrganizations(params: UseOrganizationsParams = {}) {
  const { executeQuery } = { ...DEFAULT_PARAMS, ...params };
  const { environmentId } = useParams();
  const { data, error, isLoading } = useSWR<OrganizationsResponse>(
    executeQuery ? envURL('/organizations', environmentId as string) : null,
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
