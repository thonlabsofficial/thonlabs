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
  return <main>{children}</main>;
}
