'use client';

import React from 'react';
import Cookies from 'js-cookie';
import ClientSessionService from '../services/client-session-service';
import { EnvironmentData } from '../../shared/interfaces/environment-data';
import { User } from '../interfaces/user';
import useSWR from 'swr';
import { fetcher, intFetcher } from '../../shared/utils/api';
import { usePathname } from 'next/navigation';
import { publicRoutes } from '../../shared/utils/constants';

/*
  This is a session provider to spread the data to frontend,
  the component goal is to make possible access data as user logged in
  and the environment data.

  This provider is rendered inside the wrapper and is connected to the hooks, so
  the customers don't need to implement this in their app.
*/

export interface ThonLabsSessionContextProps {
  user: User | null;
  environmentData: EnvironmentData | null;
}

export const ThonLabsSessionContext =
  React.createContext<ThonLabsSessionContextProps>({
    user: {} as User,
    environmentData: {} as EnvironmentData,
  });

export interface ThonLabsSessionProviderProps
  extends React.HTMLAttributes<HTMLElement> {
  environmentData: EnvironmentData;
  environmentId: string;
  publicKey: string;
}

export function ThonLabsSessionProvider({
  environmentData,
  children,
  environmentId,
  publicKey,
}: ThonLabsSessionProviderProps) {
  const pathname = usePathname();
  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route),
  );

  /*
    This is a check to keep the session alive by
    triggering the validateSession inside middleware
    but only if the route is not public
  */
  useSWR<EnvironmentData>(
    () => !isPublicRoute && `/api/auth/alive`,
    intFetcher,
  );

  const token = Cookies.get('tl_session');
  // TODO: replaces by a "session" API call
  const user = React.useMemo(() => ClientSessionService.getSession(), [token]);
  const { data: clientEnvironmentData } = useSWR<EnvironmentData>(
    `/environments/${environmentId}/data`,
    fetcher({
      environmentId,
      publicKey,
    }),
  );
  const memoClientEnvironmentData = React.useMemo(
    () => clientEnvironmentData || environmentData,
    [environmentId, publicKey, clientEnvironmentData],
  );

  return (
    <ThonLabsSessionContext.Provider
      value={{
        environmentData: memoClientEnvironmentData || environmentData,
        user,
      }}
    >
      {children}
    </ThonLabsSessionContext.Provider>
  );
}
