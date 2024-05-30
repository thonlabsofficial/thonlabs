'use client';

import React from 'react';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@repo/ui/toaster';

export default function CoreProvider({
  children,
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
      <Toaster />
    </ThemeProvider>
  );
}
