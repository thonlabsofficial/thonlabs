import '@repo/ui/core/styles/globals';
import '@repo/ui/core';

import type { Metadata } from 'next';
import CoreProvider from './_providers/core-provider';
import { fonts } from '@repo/ui/core/fonts';
import { ThonLabsWrapper } from '@/_libs/_nextjs';

export const metadata: Metadata = {
  title: {
    template: '%s · Thon Labs',
    default: 'Thon Labs',
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
      <body className={`${fonts.className} bg-background`}>
        <ThonLabsWrapper
          environmentId={process.env.NEXT_PUBLIC_TL_ENV_ID as string}
          publicKey={process.env.NEXT_PUBLIC_TL_PK as string}
        >
          <CoreProvider>{children}</CoreProvider>
        </ThonLabsWrapper>
      </body>
    </html>
  );
}

export default RootLayout;
