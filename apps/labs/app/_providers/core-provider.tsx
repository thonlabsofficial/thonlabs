'use client';

import React from 'react';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@repo/ui/toaster';
import { SWRConfig } from 'swr';
import { labsAPI } from '../../helpers/api';
import SessionProvider from '@/auth/_providers/session-provider';

const fetcher = (url: string) => labsAPI.get(url).then((res) => res.data);

export default function CoreProvider({
  children,
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <SWRConfig
      value={{
        fetcher,
      }}
    >
      <SessionProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </SessionProvider>
    </SWRConfig>
  );
}
