import { Metadata } from 'next';
import ProjectsList from '@labs/projects/_components/projects-list';
import { Typo } from '@repo/ui/typo';
import { Button } from '@repo/ui/button';
import dynamic from 'next/dynamic';

const NewProjectDialog = dynamic(
  () => import('@/(labs)/projects/_components/new-project-dialog'),
  { ssr: false },
);

export const metadata: Metadata = {
  title: 'Projects',
};

export default function Home() {
  return (
    <>
      <header className="mb-6 border-b bg-card py-8">
        <div className="w-full flex items-center justify-between container">
          <Typo variant={'h2'}>Projects</Typo>
          <NewProjectDialog
            trigger={<Button variant={'opposite'}>New Project</Button>}
          />
        </div>
      </header>
      <div className="container p-4">
        <ProjectsList />
      </div>
    </>
  );
}
