import { Metadata } from 'next';
import ProjectsList from '@/projects/_components/projects-list';
import { Typo } from '@repo/ui/typo';
import { Button } from '@repo/ui/button';
import dynamic from 'next/dynamic';
import Container from '@/_components/container';
import { Grid2X2 } from 'lucide-react';

const NewProjectDialog = dynamic(
  () => import('@/projects/_components/new-project-dialog'),
  { ssr: false },
);

export const metadata: Metadata = {
  title: 'Projects',
};

export default function Projects() {
  return (
    <>
      <div className="mb-6 border-b bg-card py-8">
        <Container className="w-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-12 h-12 rounded-md bg-background/60 flex items-center justify-center border border-foreground/[0.05]">
              <Grid2X2 className="w-6 h-6" />
            </div>

            <Typo variant={'h2'}>Projects</Typo>
          </div>
          <NewProjectDialog trigger={<Button>New Project</Button>} />
        </Container>
      </div>
      <Container className="p-4">
        <ProjectsList />
      </Container>
    </>
  );
}
