'use client';

import React from 'react';
import ClientSessionService from '../../auth/_services/client-session-service';
import { useRouter } from 'next/navigation';

// TODO: move to other place when having the @thonlabs/nextjs ready
export enum APIResponseCodes {
  GenericError = 0,
  Success = 20000,
  Unauthorized = 40001,
  SessionExpired = 40002,
}

export const apiResponseMessages = {
  [APIResponseCodes.GenericError]: 'Internal server error',
  [APIResponseCodes.Success]: 'Request executed with success',
  [APIResponseCodes.Unauthorized]: 'Unauthorized access',
  [APIResponseCodes.SessionExpired]: 'Your session has expired',
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
