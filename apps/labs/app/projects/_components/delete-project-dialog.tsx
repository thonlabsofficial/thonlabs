'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@repo/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@repo/ui/dialog';
import { Input, InputWrapper } from '@repo/ui/input';
import { useRouter } from 'next/navigation';
import type React from 'react';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import useProject from '@/_hooks/use-project';
import type { Project } from '@/_interfaces/project';
import {
  type DeleteProjectFormData,
  DeleteProjectFormSchema,
} from '@/_validators/projects-validators';

type Props = {
  trigger: React.ReactNode;
  project: Project;
};

export default function DeleteProjectDialog({
  trigger,
  project,
}: Props & React.HTMLAttributes<HTMLElement>) {
  const form = useForm<DeleteProjectFormData>({
    resolver: zodResolver(DeleteProjectFormSchema),
  });
  const { deleteProject } = useProject();
  const router = useRouter();
  const [isDeleting, startDeletingTransition] = useTransition();
  const appName = form.watch('appName');

  function handleDelete() {
    startDeletingTransition(async () => {
      await deleteProject(project.id, project.appName);
      router.replace('/projects');
    });
  }

  function handleReset() {
    form.clearErrors();
    form.reset();
  }

  return (
    <Dialog>
      <DialogTrigger asChild onClick={handleReset}>
        {trigger}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Project</DialogTitle>
          <DialogDescription>
            Deleting a project will permanently erase all environments, users,
            and stored data. <strong>This action is irreversible</strong>.
            Please be absolutely certain before proceeding.
          </DialogDescription>
        </DialogHeader>
        <div className='grid w-full items-center gap-3'>
          <InputWrapper>
            <Input
              id='appName'
              size='lg'
              label={`To confirm, type "${project.appName}" in the field below`}
              maxLength={30}
              error={form.formState.errors.appName?.message}
              {...form.register('appName')}
            />
          </InputWrapper>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type='button' variant='ghost' disabled={isDeleting}>
              Cancel
            </Button>
          </DialogClose>
          <Button
            type='button'
            variant={'destructive'}
            loading={isDeleting}
            disabled={project.appName !== appName}
            onClick={handleDelete}
          >
            {isDeleting ? 'Deleting...' : 'Delete this project'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
