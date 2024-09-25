import '@repo/ui/core/styles/globals';
import '@repo/ui/core';

import type { Metadata } from 'next';
import { fonts } from '@repo/ui/core/fonts';
import CoreProvider from './_providers/core-provider';
import MainHeader from './_components/main-header';

export const metadata: Metadata = {
  title: {
    template: '%s · ThonLabs',
    default: 'ThonLabs',
  },
  icons: {
    icon: '/favicon.png',
  },
};

function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${fonts.className} bg-background text-text`}>
        <CoreProvider>
          <MainHeader />
          <main className="pt-[3.5625rem]">{children}</main>
        </CoreProvider>
      </body>
    </html>
  );
}

export default RootLayout;
