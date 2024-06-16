import { Metadata } from 'next';
import ProjectsList from '@labs/projects/_components/projects-list';
import { Typo } from '@repo/ui/typo';
import { Button } from '@repo/ui/button';
import dynamic from 'next/dynamic';

const NewProjectDialog = dynamic(
  () => import('@labs/projects/_components/new-project-dialog'),
  { ssr: false },
);

export const metadata: Metadata = {
  title: 'My Projects',
};

export default function Home() {
  return (
    <div className="container p-4">
      <header className="flex items-center justify-between mb-6">
        <Typo variant={'h2'}>My Projects</Typo>
        <NewProjectDialog
          trigger={
            <Button variant={'secondary'} size={'small'}>
              New Project
            </Button>
          }
        />
      </header>
      <ProjectsList />
    </div>
  );
}
