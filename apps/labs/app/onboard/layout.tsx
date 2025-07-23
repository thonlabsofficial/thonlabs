import { Metadata } from 'next';
import { Toaster } from '@repo/ui/toaster';

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
      <main className="pt-[3.5625rem]">
        <div>
          {children}
          <footer className="mt-12" />
        </div>
      </main>
      <Toaster />
    </>
  );
}
