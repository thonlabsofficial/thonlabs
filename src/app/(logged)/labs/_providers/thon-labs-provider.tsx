'use client';

import React from 'react';
import ClientSession from '../../auth/_services/client-session-service';

export default function ThonlabsProvider({
  children,
}: React.HTMLAttributes<HTMLElement>) {
  React.useEffect(() => {
    ClientSession.shouldKeepAlive();
  }, []);

  return children;
}
