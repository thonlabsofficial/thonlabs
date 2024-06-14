import { Metadata } from 'next';
import ThonLabsProvider from './_providers/thon-labs-provider';
import dynamic from 'next/dynamic';
import { Avatar, AvatarFallback } from '@repo/ui/avatar';
import { Badge } from '@repo/ui/badge';
import ServerUserSession from '@/(labs)/_services/server-auth-provider';
import Utils from '@helpers/utils';
import ProjectEnvNav from '@labs/_components/project-env-nav';
import { Environment } from '@/(labs)/_interfaces/environment';
import MainNav from './_components/main-nav';

const Logo = dynamic(() => import('@/_components/logo'), { ssr: false });

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
      <header className="fixed top-0 left-0 w-full flex justify-between items-center px-4 py-2.5 bg-background/[0.8] backdrop-blur-sm z-10 border-b border-collapse">
        <div className="flex items-center gap-3">
          <Logo reduced className="h-5 -mt-0.5" />
          <ProjectEnvNav environment={environment as Environment} />
        </div>

        <div className="flex gap-3 items-center">
          <Avatar size="small" className="cursor-default select-none">
            <AvatarFallback>
              {Utils.getFirstAndLastInitials(session.user.fullName)}
            </AvatarFallback>
          </Avatar>
        </div>
      </header>
      <main className="mt-13.25">
        <aside>
          <MainNav environment={environment as Environment} />
        </aside>
        <div>{children}</div>
      </main>
    </ThonLabsProvider>
  );
}
