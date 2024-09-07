'use client';

import React from 'react';
import ClientSessionService from '../services/client-session-service';

/*
  This provider is responsible to validate the session and keep alive in case of
  user configured a refresh token in the ThonLabs environment settings.
*/

export function ThonLabsGeneralProvider({
  children,
}: React.HTMLAttributes<HTMLElement>) {
  React.useEffect(() => {
    async function onFocus() {
      await ClientSessionService.shouldKeepAlive();
    }

    window.addEventListener('focus', onFocus);

    return () => {
      window.removeEventListener('focus', onFocus);
    };
  }, []);

  return children;
}
