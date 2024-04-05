'use client';

import React from 'react';
import ClientSessionService from '../../auth/_services/client-session-service';
import { useRouter } from 'next/navigation';

// TODO: move to other place when having the @thonlabs/nextjs ready
export const apiErrorMessages = {
  '0': 'Internal server error',
  '40001': 'Unauthorized access',
  '40002': 'Your session has expired',
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
