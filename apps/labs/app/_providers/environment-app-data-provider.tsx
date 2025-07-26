'use client';

import React from 'react';
import useSWR from 'swr';
import { EnvironmentAppData } from '@/_interfaces/environment-app-data';
import { useParams, useSearchParams } from 'next/navigation';
import { intFetcher } from '@helpers/api';

export interface EnvironmentAppDataContextProps {
  environmentAppData: EnvironmentAppData | null;
}

export const EnvironmentAppDataContext =
  React.createContext<EnvironmentAppDataContextProps>({
    environmentAppData: {} as EnvironmentAppData,
  });

export interface EnvironmentAppDataProviderProps
  extends React.HTMLAttributes<HTMLElement> {
  environmentAppData: EnvironmentAppData | null;
}

export function EnvironmentAppDataProvider({
  environmentAppData,
  children,
}: EnvironmentAppDataProviderProps) {
  const { environmentId: environmentIdFromParams } = useParams();
  const searchParams = useSearchParams();
  const environmentId =
    environmentIdFromParams || searchParams.get('environmentId');

  const { data: appData } = useSWR<EnvironmentAppData>(
    `/api/environments/${environmentId}/data/app`,
    intFetcher,
  );

  const memoAppData = React.useMemo(
    () => appData || environmentAppData,
    [environmentId, appData],
  );

  return (
    <EnvironmentAppDataContext.Provider
      value={{
        environmentAppData: memoAppData || environmentAppData,
      }}
    >
      {children}
    </EnvironmentAppDataContext.Provider>
  );
}
