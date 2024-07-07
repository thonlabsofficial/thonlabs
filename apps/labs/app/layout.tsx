import '@repo/ui/core/styles/globals';
import '@repo/ui/core';

import type { Metadata } from 'next';
import CoreProvider from './_providers/core-provider';
import { fonts } from '@repo/ui/core/fonts';

export const metadata: Metadata = {
  title: {
    template: '%s · Thon Labs',
    default: 'Thon Labs',
  },
  icons: {
    icon: '/favicon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${fonts.className} bg-background`}>
        <CoreProvider>{children}</CoreProvider>
      </body>
    </html>
  );
}
