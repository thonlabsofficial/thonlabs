'use client';

import { SkeletonProvider } from '@repo/ui/skeleton';
import { ThemeProvider } from 'next-themes';
import type React from 'react';
import { SWRConfig } from 'swr';
import { fetcher } from '../../helpers/api';

export default function CoreProvider({
  children,
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <SWRConfig
      value={{
        fetcher,
      }}
    >
      <ThemeProvider
        attribute='class'
        defaultTheme='system'
        enableSystem
        disableTransitionOnChange
      >
        <SkeletonProvider>{children}</SkeletonProvider>
      </ThemeProvider>
    </SWRConfig>
  );
}
