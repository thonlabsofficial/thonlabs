import '@repo/ui/core/styles/globals';
import '@repo/ui/core';

import type { Metadata } from 'next';
import { fonts } from '@repo/ui/core/fonts';
import CoreProvider from './_providers/core-provider';
import MainHeader from './_components/main-header';
import MainFooter from './_components/main-footer';
import Script from 'next/script';
import LogRocket from '@/_components/logrocket';

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
    <html lang="en" suppressHydrationWarning>
      <body className={`${fonts.className} bg-background text-text`}>
        <CoreProvider>
          <MainHeader />
          <main>{children}</main>
          <MainFooter />
        </CoreProvider>
      </body>
    </html>
  );
}

export default RootLayout;
