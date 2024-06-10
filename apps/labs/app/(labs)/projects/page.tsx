import { Metadata } from 'next';
import ProjectsList from '@labs/projects/_components/projects-list';
import { Typo } from '@repo/ui/typo';
import { Button } from '@repo/ui/button';

export const metadata: Metadata = {
  title: 'My Projects',
};

export default function Home() {
  return (
    <div className="p-4">
      <header className="flex items-center justify-between mb-6">
        <Typo variant={'h2'}>My Projects</Typo>
        <Button variant={'secondary'} size={'small'}>
          Create Project
        </Button>
      </header>
      <ProjectsList />
    </div>
  );
}
