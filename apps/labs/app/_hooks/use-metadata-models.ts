import { Metadata } from '@/_interfaces/metadata';
import { envFetcher, envURL } from '@helpers/api';
import useSWR from 'swr';
import React from 'react';
import { useParams } from 'next/navigation';

interface MetadataModelsResponse {
  items: Metadata[];
}

export function useMetadataModels(context?: 'User' | 'Organization' | 'Environment') {
  const { environmentId } = useParams();
  const url = context
    ? `${envURL('/metadata/models', environmentId as string)}&context=${context}`
    : envURL('/metadata/models', environmentId as string);

  const { data, error, isLoading } = useSWR<MetadataModelsResponse>(
    url,
    envFetcher(environmentId as string),
  );

  const metadataModels = React.useMemo(() => {
    return data?.items || [];
  }, [data]);

  return {
    metadataModels,
    metadataModelsError: error,
    isLoadingMetadataModels: isLoading,
  };
}
