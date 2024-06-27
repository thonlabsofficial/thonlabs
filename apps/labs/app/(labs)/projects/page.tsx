import { Metadata } from 'next';
import ProjectsList from '@labs/projects/_components/projects-list';
import { Typo } from '@repo/ui/typo';
import { Button } from '@repo/ui/button';
import dynamic from 'next/dynamic';
import Utils from '@helpers/utils';
import { Avatar, AvatarFallback } from '@repo/ui/avatar';
import ServerUserSession from '../_services/server-auth-provider';

const NewProjectDialog = dynamic(
  () => import('@/(labs)/projects/_components/new-project-dialog'),
  { ssr: false },
);
const Logo = dynamic(() => import('@/_components/logo'), { ssr: false });

export const metadata: Metadata = {
  title: 'Projects',
};

export default function Home() {
  const session = ServerUserSession.getSession();

  return (
    <>
      <header className="w-full flex py-2 bg-background/[0.8] backdrop-blur-sm z-10 border-b border-collapse">
        <div className="container flex justify-between items-center gap-3">
          <Logo reduced className="h-5" />

          <Avatar size="small" className="cursor-default select-none">
            <AvatarFallback>
              {Utils.getFirstAndLastInitials(session.user.fullName)}
            </AvatarFallback>
          </Avatar>
        </div>
      </header>
      <div className="mb-6 border-b bg-card py-8">
        <div className="w-full flex items-center justify-between container">
          <Typo variant={'h2'}>Projects</Typo>
          <NewProjectDialog
            trigger={<Button variant={'default'}>New Project</Button>}
          />
        </div>
      </div>
      <div className="container p-4">
        <ProjectsList />
      </div>
    </>
  );
}
