'use client';

import { Button } from '@repo/ui/button';
import { Input, InputWrapper } from '@repo/ui/input';
import React, { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import {
  NewEnvironmentFormData,
  NewEnvironmentFormSchema,
} from '@/_validators/environments-validators';
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
import { useRouter } from 'next/navigation';
import { Project } from '@/_interfaces/project';
import useEnvironment from '@/_hooks/use-environment';

type Props = {
  trigger?: React.ReactNode;
  project: Project;
};

export default function NewEnvironmentDialog({
  trigger,
  project,
  ...props
}: Props & React.ComponentProps<typeof Dialog>) {
  const form = useForm<NewEnvironmentFormData>({
    resolver: zodResolver(NewEnvironmentFormSchema),
  });
  const { createEnvironment } = useEnvironment();
  const [isCreating, startCreatingTransition] = useTransition();
  const router = useRouter();

  function onSubmit(payload: NewEnvironmentFormData) {
    startCreatingTransition(async () => {
      const environment = await createEnvironment(project.id, payload);

      if (environment) {
        router.push(`/${environment.id}`);
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
          <DialogTitle>New Environment</DialogTitle>
          <DialogDescription>
            Complete the information below to create a new environment for{' '}
            <strong>{project?.appName}</strong> project.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid w-full items-center gap-4">
            <InputWrapper>
              <Input
                id="name"
                placeholder="e.g.: Staging"
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
                label="URL"
                error={form.formState.errors.appURL?.message}
                {...form.register('appURL')}
              />
            </InputWrapper>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="ghost" disabled={isCreating}>
                Back
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
