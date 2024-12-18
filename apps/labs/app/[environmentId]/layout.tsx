import { Metadata } from 'next';
import { getAuthSession } from '@/_services/server-auth-session-service';
import MainAside from '@/_components/main-aside';
import MainHeader from '@/_components/main-header';
import { getAppData } from '@/_services/server-environment-app-data-service';
import { EnvironmentAppDataProvider } from '@/_providers/environment-app-data-provider';

export const metadata: Metadata = {
  robots: {
    follow: false,
    index: false,
  },
};

export default async function LabsNestedLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { environmentId: string };
}>) {
  const session = await getAuthSession();
  const environmentAppData = await getAppData(params.environmentId);

  return (
    <EnvironmentAppDataProvider environmentAppData={environmentAppData}>
      <MainHeader session={session} logoReduced />
      <main className="pt-[3.5625rem]">
        <MainAside />
        <div>
          {children}
          <footer className="mt-12" />
        </div>
      </main>
    </EnvironmentAppDataProvider>
  );
}
