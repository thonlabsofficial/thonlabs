import React from 'react';
import { EnvironmentAppData } from '@/_interfaces/environment-app-data';
import { EnvironmentAppDataContext } from '@/_providers/environment-app-data-provider';

export function buildEnvDataMutation(
  environmentId: string,
  key: string,
  value: any,
): any {
  return {
    cacheKey: `/api/environments/${environmentId}/data/app`,
    populateCache: (_: any, cache: any) => ({
      ...cache,
      [key]: { ...cache[key], ...value },
    }),
  };
}

export function useEnvironmentAppData() {
  const { environmentAppData } = React.useContext(EnvironmentAppDataContext);
  return environmentAppData as EnvironmentAppData;
}
