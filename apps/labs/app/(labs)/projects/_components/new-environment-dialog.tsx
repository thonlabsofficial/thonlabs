'use client';

import { Button } from '@repo/ui/button';
import { Input, InputWrapper } from '@repo/ui/input';
import React, { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import {
  NewEnvironmentFormData,
  NewEnvironmentFormSchema,
} from '@labs/projects/_validators/projects-validators';
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
import useUserSession from '@labs/_hooks/use-user-session';
import { useRouter } from 'next/navigation';
import { Project } from '@labs/_interfaces/project';
import useEnvironment from '@labs/projects/_hooks/use-environment';

type Props = {
  trigger: React.ReactNode;
  project: Project;
};

export default function newEnvironmentDialog({
  trigger,
  project,
}: Props & React.HTMLAttributes<HTMLElement>) {
  const form = useForm<NewEnvironmentFormData>({
    resolver: zodResolver(NewEnvironmentFormSchema),
  });
  const { createEnvironment } = useEnvironment();
  const [isCreating, startCreatingTransition] = useTransition();
  const { setEnv } = useUserSession();
  const router = useRouter();

  function onSubmit(payload: NewEnvironmentFormData) {
    startCreatingTransition(async () => {
      const environment = await createEnvironment(project.id, payload);

      if (environment) {
        setEnv({ environment, project });
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
          <DialogTitle>New Environment</DialogTitle>
          <DialogDescription>
            Complete the information below to create a new environment for{' '}
            <strong>{project.appName}</strong> project.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid w-full items-center gap-3">
            <InputWrapper>
              <Input
                id="name"
                placeholder="e.g.: Staging"
                inputSize="lg"
                label="Name"
                maxLength={25}
                error={form.formState.errors.name?.message}
                {...form.register('name')}
              />
            </InputWrapper>
            <InputWrapper>
              <Input
                id="appURL"
                placeholder="e.g.: https://staging.thonlabs.io"
                inputSize="lg"
                label="URL"
                error={form.formState.errors.appURL?.message}
                {...form.register('appURL')}
              />
            </InputWrapper>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="ghost" disabled={isCreating}>
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" loading={isCreating}>
              {isCreating ? 'Creating...' : 'Create Environment'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
