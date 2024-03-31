import MainHeader from '@/ui/components/app/main-header';
import { Metadata } from 'next';
import React from 'react';

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
      <MainHeader withNav={false} />
      <main className="pt-5">{children}</main>
    </>
  );
}
