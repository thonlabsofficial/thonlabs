import '@repo/ui/core/styles/globals';
import '@repo/ui/core';

import { fonts } from '@repo/ui/core/fonts';
import type { Metadata } from 'next';
import Script from 'next/script';
import LogRocket from '@/_components/logrocket';
import MainHeader from './_components/main-header';
import CoreProvider from './_providers/core-provider';

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
    <html lang='en' suppressHydrationWarning>
      <body className={`${fonts.className} bg-background text-text`}>
        <CoreProvider>
          <MainHeader />
          <main className='pt-[3.5625rem]'>{children}</main>
        </CoreProvider>
        {process.env.NODE_ENV === 'production' && (
          <>
            <Script
              defer
              data-domain='thonlabs.io'
              src='https://plausible.io/js/script.outbound-links.js'
            />
            <Script>
              {`window.plausible = window.plausible || function() { (window.plausible.q = window.plausible.q || []).push(arguments) } `}
            </Script>
            <LogRocket />
          </>
        )}
      </body>
    </html>
  );
}

export default RootLayout;
