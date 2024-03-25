'use client';

import React from 'react';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/ui/components/ui/toaster';

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
