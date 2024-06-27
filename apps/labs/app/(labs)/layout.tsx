import { Metadata } from 'next';
import ThonLabsProvider from './_providers/thon-labs-provider';
import ServerUserSession from '@/(labs)/_services/server-auth-provider';
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
  const session = ServerUserSession.getSession();
  const environment = ServerUserSession.getEnv();

  return (
    <ThonLabsProvider>
      <main>
        <MainAside environment={environment as Environment} session={session} />
        <div>{children}</div>
      </main>
    </ThonLabsProvider>
  );
}
