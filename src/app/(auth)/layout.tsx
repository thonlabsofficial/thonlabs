import { Metadata } from 'next';
import Image from 'next/image';
import React from 'react';
import logoDark from '@/ui/assets/images/thon-labs-logo-dark.svg';

export const metadata: Metadata = {
  robots: {
    follow: false,
    index: false,
  },
};

export default function AuthNestedLayout({
  children,
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <>
      <header className="px-3 sm:px-4 h-12 w-full flex items-center">
        <Image src={logoDark} alt="Thon Labs Logo" className="w-auto h-5" />
      </header>
      <main className="pt-5">{children}</main>
    </>
  );
}
