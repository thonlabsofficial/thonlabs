import { Metadata } from 'next';
import ServerAuthSessionService from '@/(labs)/_services/server-auth-session-service';
import { Environment } from '@/(labs)/_interfaces/environment';
import MainAside from './_components/main-aside';

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
  const environment = ServerAuthSessionService.getEnv();

  return (
    <main>
      <MainAside environment={environment as Environment} session={session} />
      <div>
        {children}
        <footer className="mt-12" />
      </div>
    </main>
  );
}
