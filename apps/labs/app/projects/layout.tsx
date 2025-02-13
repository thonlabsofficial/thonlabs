import { Metadata } from 'next';
import { getAuthSession } from '@/_services/server-auth-session-service';
import MainHeader from '@/_components/main-header';
import { Toaster } from '@repo/ui/toaster';

export const metadata: Metadata = {
  robots: {
    follow: false,
    index: false,
  },
};

export default async function ProjectsNestedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getAuthSession();

  return (
    <>
      <MainHeader session={session} withNav={false} logoReduced />
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
