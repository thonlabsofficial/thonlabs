'use client';

import React from 'react';
import { SWRConfig } from 'swr';
import { ThonLabsPreviewProvider } from '../../shared/providers/thonlabs-preview-provider';

export function ThonLabsInternalProvider({
  children,
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <ThonLabsPreviewProvider>
      <SWRConfig>{children}</SWRConfig>
    </ThonLabsPreviewProvider>
  );
}
