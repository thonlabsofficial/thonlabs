import { Metadata } from 'next';
import ProjectsList from '@/projects/_components/projects-list';
import { Typo } from '@repo/ui/typo';
import Container from '@/_components/container';
import { PlusIcon } from 'lucide-react';
import NewProjectDialog from '@/projects/_components/new-project-dialog';
import { ButtonIcon } from '@repo/ui/button-icon';

export const metadata: Metadata = {
  title: 'Projects',
};

export default async function Projects() {
  return (
    <Container className="px-4 pt-6">
      <header className="w-full flex items-center justify-between mb-6">
        <Typo variant={'h4'}>Projects</Typo>
        <NewProjectDialog
          trigger={<ButtonIcon variant="outline" icon={PlusIcon} />}
        />
      </header>
      <ProjectsList />
    </Container>
  );
}
