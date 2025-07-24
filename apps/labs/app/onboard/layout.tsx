import { Metadata } from 'next';
import { Toaster } from '@repo/ui/toaster';
import LandingGrid from '@/_components/landing-grid';

export const metadata: Metadata = {
  robots: {
    follow: false,
    index: false,
  },
};

export default async function OnboardNestedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <LandingGrid />
      <main>{children}</main>
      <Toaster />
    </>
  );
}
