import React from 'react';
import { EnvironmentAppData } from '@/_interfaces/environment-app-data';
import { EnvironmentAppDataContext } from '@/_providers/environment-app-data-provider';

type BuildEnvDataMutationOptions = {
  key: string;
  value: any;
  isSDKData?: boolean;
};

export function buildEnvDataMutation(
  environmentId: string,
  items: BuildEnvDataMutationOptions[],
): any {
  const appMutations: any = {};
  const sdkMutations: any = {};

  items.forEach(({ key, value }) => {
    appMutations[key] = value;
  });

  items
    .filter(({ isSDKData }) => isSDKData)
    .forEach(({ key, value }) => {
      sdkMutations[key] = value;
    });

  const mutations = [
    {
      cacheKey: `/api/environments/${environmentId}/data/app`,
      populateCache: (_: any, cache: any) => ({
        ...cache,
        ...appMutations,
      }),
    },
    {
      cacheKey: `/environments/${environmentId}/data`,
      populateCache: (_: any, cache: any) => ({
        ...cache,
        ...sdkMutations,
      }),
    },
  ];

  return mutations;
}

export function useEnvironmentAppData() {
  const { environmentAppData } = React.useContext(EnvironmentAppDataContext);
  return environmentAppData as EnvironmentAppData;
}
