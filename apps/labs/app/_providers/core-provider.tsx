'use client';

import React from 'react';
import { ThemeProvider } from 'next-themes';
import { SWRConfig } from 'swr';
import { fetcher } from '../../helpers/api';
import { SkeletonProvider } from '@repo/ui/skeleton';

export default function CoreProvider({
  children,
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <>
      <SWRConfig
        value={{
          fetcher,
        }}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SkeletonProvider>{children}</SkeletonProvider>
        </ThemeProvider>
      </SWRConfig>
    </>
  );
}
