import { Button } from '@repo/ui/button';
import { Typo } from '@repo/ui/typo';
import { Grid2X2 } from 'lucide-react';
import type { Metadata } from 'next';
import Container from '@/_components/container';
import NewProjectDialog from '@/projects/_components/new-project-dialog';
import ProjectsList from '@/projects/_components/projects-list';

export const metadata: Metadata = {
  title: 'Projects',
};

export default async function Projects() {
  return (
    <>
      <div className='mb-6 border-b bg-card py-8'>
        <Container className='flex w-full items-center justify-between'>
          <div className='flex items-center gap-2'>
            <div className='flex h-12 w-12 items-center justify-center rounded-md border border-foreground/[0.05] bg-background/60'>
              <Grid2X2 className='h-6 w-6' />
            </div>

            <Typo variant={'h2'}>Projects</Typo>
          </div>
          <NewProjectDialog trigger={<Button>New Project</Button>} />
        </Container>
      </div>
      <Container className='p-4'>
        <ProjectsList />
      </Container>
    </>
  );
}
