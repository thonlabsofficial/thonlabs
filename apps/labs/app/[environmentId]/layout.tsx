import { Metadata } from 'next';
import ServerAuthSessionService from '@/_services/server-auth-session-service';
import MainAside from '@/_components/main-aside';
import MainHeader from '@/_components/main-header';

export const metadata: Metadata = {
  robots: {
    follow: false,
    index: false,
  },
};

export default async function LabsNestedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = ServerAuthSessionService.getSession();

  return (
    <>
      <MainHeader session={session} logoReduced />
      <main className="pt-[3.5625rem]">
        <MainAside />
        <div>
          {children}
          <footer className="mt-12" />
        </div>
      </main>
    </>
  );
}
