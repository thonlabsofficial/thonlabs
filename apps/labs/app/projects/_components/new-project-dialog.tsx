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
import {
  type NewProjectFormData,
  NewProjectFormSchema,
} from '@/_validators/projects-validators';

type Props = {
  trigger?: React.ReactNode;
};

export default function NewProjectDialog({
  trigger,
  ...props
}: Props & React.ComponentProps<typeof Dialog>) {
  const form = useForm<NewProjectFormData>({
    resolver: zodResolver(NewProjectFormSchema),
  });
  const { createProject } = useProject();
  const [isCreatingProject, startTransitionCreatingProject] = useTransition();
  const router = useRouter();

  function onSubmit(payload: NewProjectFormData) {
    startTransitionCreatingProject(async () => {
      const project = await createProject(payload);

      if (project) {
        router.push(`/${project.environment.id}`);
      }
    });
  }

  function handleReset() {
    form.clearErrors();
    form.reset();
  }

  return (
    <Dialog {...props}>
      {trigger && (
        <DialogTrigger asChild onClick={handleReset}>
          {trigger}
        </DialogTrigger>
      )}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Project</DialogTitle>
          <DialogDescription>
            Once you create a new project, a <strong>"Development"</strong>{' '}
            environment will be automatically set up.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='grid w-full items-center gap-4'>
            <InputWrapper>
              <Input
                id='appName'
                placeholder='e.g.: Acme Inc.'
                label='Name'
                maxLength={30}
                error={form.formState.errors.appName?.message}
                {...form.register('appName')}
              />
            </InputWrapper>
            <InputWrapper>
              <Input
                id='appURL'
                placeholder='e.g.: https://thonlabs.io or http://localhost:3000'
                label='URL'
                error={form.formState.errors.appURL?.message}
                {...form.register('appURL')}
              />
            </InputWrapper>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button
                type='button'
                variant='ghost'
                disabled={isCreatingProject}
              >
                Cancel
              </Button>
            </DialogClose>
            <Button type='submit' loading={isCreatingProject}>
              {isCreatingProject ? 'Creating...' : 'Create Project'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
