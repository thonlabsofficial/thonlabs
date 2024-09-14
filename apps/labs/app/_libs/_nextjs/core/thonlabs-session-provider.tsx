'use client';

import React from 'react';
import ClientSessionService from '../services/client-session-service';
import { EnvironmentData } from '../interfaces/environment-data';
import { User } from '../interfaces/user';

/*
  This is a session provider to spread the data to frontend,
  the component goal is to make possible access data as user logged in
  and the environment data.

  The user is consumed from cookies after authentication is completed
  and the data is consumed from backend API call.

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
}

export function ThonLabsSessionProvider({
  environmentData,
  children,
}: ThonLabsSessionProviderProps) {
  const user = ClientSessionService.getSession();

  return (
    <ThonLabsSessionContext.Provider value={{ environmentData, user }}>
      {children}
    </ThonLabsSessionContext.Provider>
  );
}
