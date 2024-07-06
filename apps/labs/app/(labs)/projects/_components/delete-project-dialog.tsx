'use client';

import { Button } from '@repo/ui/button';
import { Input, InputWrapper } from '@repo/ui/input';
import React, { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import {
  DeleteProjectFormSchema,
  DeleteProjectFormData,
} from '../_validators/projects-validators';
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
import useProject from '@/(labs)/projects/_hooks/use-project';
import { Project } from '@/(labs)/_interfaces/project';

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
  const [isDeleting, startDeletingTransition] = useTransition();
  const appName = form.watch('appName');

  function handleDelete() {
    startDeletingTransition(async () => {
      await deleteProject(project.id, project.appName);
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
        <div className="grid w-full items-center gap-3">
          <InputWrapper>
            <Input
              id="appName"
              inputSize="lg"
              label={`To confirm, type "${project.appName}" in the field below`}
              maxLength={30}
              error={form.formState.errors.appName?.message}
              {...form.register('appName')}
            />
          </InputWrapper>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="ghost" disabled={isDeleting}>
              Cancel
            </Button>
          </DialogClose>
          <Button
            type="button"
            variant={'destructive'}
            loading={isDeleting}
            disabled={project.appName !== appName}
            onClick={handleDelete}
          >
            {isDeleting ? 'Deleting...' : 'Delete Project'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
