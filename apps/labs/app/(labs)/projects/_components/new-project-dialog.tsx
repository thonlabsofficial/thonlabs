'use client';

import { Button } from '@repo/ui/button';
import { Input, InputWrapper } from '@repo/ui/input';
import React, { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import {
  NewProjectFormData,
  NewProjectFormSchema,
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
import useProjectMutation from '@/(labs)/projects/_hooks/use-project-mutation';
import useUserSession from '@/(labs)/_hooks/use-user-session';
import { useRouter } from 'next/navigation';

type Props = {
  trigger: React.ReactNode;
};

export default function NewProjectDialog({
  trigger,
}: Props & React.HTMLAttributes<HTMLElement>) {
  const form = useForm<NewProjectFormData>({
    resolver: zodResolver(NewProjectFormSchema),
  });
  const { createProject } = useProjectMutation();
  const [isCreatingProject, startTransitionCreatingProject] = useTransition();
  const { setEnv } = useUserSession();
  const router = useRouter();

  function onSubmit(payload: NewProjectFormData) {
    startTransitionCreatingProject(async () => {
      const project = await createProject(payload);

      if (project) {
        setEnv({ environment: project.environment, project });
        router.push('/');
      }
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
          <DialogTitle>New Project</DialogTitle>
          <DialogDescription>
            Once you create a new project, a "Production" environment will be
            automatically created.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid w-full items-center gap-3">
            <InputWrapper>
              <Input
                id="appName"
                placeholder="e.g.: Thon Labs"
                inputSize="lg"
                label="Name"
                error={form.formState.errors.appName?.message}
                {...form.register('appName')}
              />
            </InputWrapper>
            <InputWrapper>
              <Input
                id="appURL"
                placeholder="e.g.: https://thonlabs.io"
                inputSize="lg"
                label="URL"
                error={form.formState.errors.appURL?.message}
                {...form.register('appURL')}
              />
            </InputWrapper>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button
                type="button"
                variant="ghost"
                disabled={isCreatingProject}
              >
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" loading={isCreatingProject}>
              {isCreatingProject ? 'Creating...' : 'Create Project'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
