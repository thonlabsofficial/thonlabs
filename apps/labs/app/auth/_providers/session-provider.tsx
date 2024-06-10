import React from 'react';
import { User } from '@/auth/_interfaces/user';
import ClientSessionService from '../_services/client-session-service';

export interface SessionProviderProps {
  user: User | null;
}

export const SessionContext = React.createContext<SessionProviderProps>({
  user: {
    id: '',
    email: '',
    fullName: '',
  },
});

export default function SessionProvider({
  children,
}: React.HTMLAttributes<HTMLElement>) {
  const user = ClientSessionService.getSession();

  return (
    <SessionContext.Provider value={{ user }}>
      {children}
    </SessionContext.Provider>
  );
}
