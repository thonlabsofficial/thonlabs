import { Metadata } from 'next';
import { getAuthSession } from '@/_services/server-auth-session-service';
import MainAside from '@/_components/main-aside';
import MainHeader from '@/_components/main-header';
import { getAppData } from '@/_services/server-environment-app-data-service';
import { EnvironmentAppDataProvider } from '@/_providers/environment-app-data-provider';
import { notFound } from 'next/navigation';
import { Toaster } from '@repo/ui/toaster';

export const metadata: Metadata = {
  robots: {
    follow: false,
    index: false,
  },
};

type Params = Promise<{ environmentId: string }>;

export default async function LabsNestedLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Params;
}>) {
  const { environmentId } = await params;
  const [session, environmentAppData] = await Promise.all([
    getAuthSession(),
    getAppData(environmentId),
  ]);

  if (!environmentAppData) {
    notFound();
  }

  return (
    <EnvironmentAppDataProvider environmentAppData={environmentAppData}>
      <MainHeader environmentId={environmentId} session={session} logoReduced />
      <main className="pt-[3.5625rem]">
        {/* <MainAside /> */}
        <div>
          {children}
          <footer className="mt-12" />
        </div>
      </main>
      <Toaster />
    </EnvironmentAppDataProvider>
  );
}
