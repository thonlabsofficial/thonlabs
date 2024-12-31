import React from 'react';
import { ThonLabsSessionContext } from '../core/thonlabs-session-provider';
import ClientSessionService from '../services/client-session-service';

export function useSession() {
  const { user } = React.useContext(ThonLabsSessionContext);
  const [isLoggingOut, setIsLoggingOut] = React.useState(false);

  async function logout() {
    try {
      setIsLoggingOut(true);
      await ClientSessionService.logout();
    } catch (e) {
      console.error('useSession.logout - error on logout:', e);
    } finally {
      setIsLoggingOut(false);
    }
  }

  return {
    user,
    logout,
    isLoggingOut,
  };
}
