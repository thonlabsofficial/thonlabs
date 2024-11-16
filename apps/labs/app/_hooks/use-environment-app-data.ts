import React from 'react';
import { EnvironmentAppData } from '@/_interfaces/environment-app-data';
import { EnvironmentAppDataContext } from '@/_providers/environment-app-data-provider';

type BuildEnvDataMutationOptions = {
  environmentId: string;
  key: string;
  value: any;
  isSDKData?: boolean;
};

export function buildEnvDataMutation(
  params: BuildEnvDataMutationOptions[],
): any {
  const appMutations = params.map(
    ({ environmentId, key, value, isSDKData }) => ({
      cacheKey: `/api/environments/${environmentId}/data/app`,
      populateCache: (_: any, cache: any) => ({
        ...cache,
        [key]: { ...cache[key], ...value },
      }),
    }),
  );

  const sdkMutations = params
    .filter(({ isSDKData }) => isSDKData)
    .map(({ environmentId, key, value }) => ({
      cacheKey: `/api/environments/${environmentId}/data`,
      populateCache: (_: any, cache: any) => ({
        ...cache,
        [key]: { ...cache[key], ...value },
      }),
    }));

  return [...appMutations, ...sdkMutations];
}

export function useEnvironmentAppData() {
  const { environmentAppData } = React.useContext(EnvironmentAppDataContext);
  return environmentAppData as EnvironmentAppData;
}
