'use client';

import React from 'react';
import ClientSessionService from '../../auth/_services/client-session-service';
import { useRouter } from 'next/navigation';

// TODO: move to other place when having the @thonlabs/nextjs ready
export enum APIErrorCodes {
  GenericError = 0,
  Unauthorized = 40001,
  SessionExpired = 40002,
}

export const apiErrorMessages = {
  [APIErrorCodes.GenericError]: 'Internal server error',
  [APIErrorCodes.Unauthorized]: 'Unauthorized access',
  [APIErrorCodes.SessionExpired]: 'Your session has expired',
};

export default function ThonLabsProvider({
  children,
}: React.HTMLAttributes<HTMLElement>) {
  const router = useRouter();

  React.useEffect(() => {
    ClientSessionService.shouldKeepAlive(router);
  }, []);

  return children;
}
