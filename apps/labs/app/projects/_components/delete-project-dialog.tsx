'use client';

import { Button } from '@repo/ui/button';
import { Input, InputWrapper } from '@repo/ui/input';
import React, { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import {
  DeleteProjectFormSchema,
  DeleteProjectFormData,
} from '@/_validators/projects-validators';
import { zodResolver } from '@hookform/resolvers/zod';
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
import useProject from '@/_hooks/use-project';
import { Project } from '@/_interfaces/project';
import { useRouter } from 'next/navigation';

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
          <DialogDescription className="space-y-2">
            <p>
              Deleting a project will permanently erase all environments, users,
              and stored data.
            </p>
            <p className="text-text">
              <strong>
                This action is irreversible. Please be absolutely certain before
                proceeding.
              </strong>
            </p>
          </DialogDescription>
        </DialogHeader>
        <div className="grid w-full items-center gap-3">
          <InputWrapper>
            <Input
              id="appName"
              label={
                <>
                  To confirm, type <strong>"Delete {project.appName}"</strong>{' '}
                  in the field below
                </>
              }
              size="md"
              error={form.formState.errors.appName?.message}
              {...form.register('appName')}
            />
          </InputWrapper>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="ghost" disabled={isDeleting}>
              Back
            </Button>
          </DialogClose>
          <Button
            type="button"
            variant={'destructive'}
            loading={isDeleting}
            disabled={appName !== `Delete ${project.appName}`}
            onClick={handleDelete}
          >
            {isDeleting ? 'Deleting...' : 'Confirm deletion'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
