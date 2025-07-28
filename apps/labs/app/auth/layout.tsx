import type { Metadata } from 'next';

export const metadata: Metadata = {
  robots: {
    follow: false,
    index: false,
  },
};

export default function AuthNestedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
