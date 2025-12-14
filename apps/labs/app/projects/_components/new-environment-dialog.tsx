'use client';

import { Button } from '@repo/ui/button';
import { Input, InputWrapper } from '@repo/ui/input';
import React, { useTransition } from 'react';
import { Controller, useForm } from 'react-hook-form';
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
import { useEnvironments } from '@/_hooks/use-environments';
import {
  InputSelect,
  InputSelectContent,
  InputSelectItem,
  InputSelectTrigger,
  InputSelectValue,
} from '@repo/ui/input-select';
import { InputSwitch } from '@repo/ui/input-switch';

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
    defaultValues: {
      copyOptions: {
        authBuilderOptions: true,
        emailTemplates: true,
        metadataModels: true,
        credentials: true,
      },
    },
  });
  const { createEnvironment } = useEnvironment();
  const { environments } = useEnvironments();
  const [isCreating, startCreatingTransition] = useTransition();
  const router = useRouter();

  // Filter environments to only show environments from the same project
  const projectEnvironments = React.useMemo(
    () => environments.filter((env) => env.project.id === project.id),
    [environments, project.id],
  );

  const copyFromEnvId = form.watch('copyFromEnvId');

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
            <InputWrapper>
              <Controller
                name="copyFromEnvId"
                control={form.control}
                render={({ field }) => (
                  <InputSelect
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <InputSelectTrigger
                      label="Copy from (optional)"
                      onClear={() => field.onChange(undefined)}
                    >
                      <InputSelectValue placeholder="Select an environment to copy from" />
                    </InputSelectTrigger>
                    <InputSelectContent>
                      {projectEnvironments.map((env) => (
                        <InputSelectItem key={env.id} value={env.id}>
                          {env.name}
                        </InputSelectItem>
                      ))}
                    </InputSelectContent>
                  </InputSelect>
                )}
              />
            </InputWrapper>
            {copyFromEnvId && (
              <div className="grid w-full items-center gap-3 border rounded-md p-4 bg-muted/30">
                <p className="text-sm font-medium">Copy Options</p>
                <Controller
                  name="copyOptions.authBuilderOptions"
                  control={form.control}
                  render={({ field }) => (
                    <InputSwitch
                      label="Auth Builder Options"
                      description="Copy authentication configuration and settings"
                      checked={field.value}
                      value={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
                <Controller
                  name="copyOptions.emailTemplates"
                  control={form.control}
                  render={({ field }) => (
                    <InputSwitch
                      label="Email Templates"
                      description="Copy all email templates"
                      checked={field.value}
                      value={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
                <Controller
                  name="copyOptions.metadataModels"
                  control={form.control}
                  render={({ field }) => (
                    <InputSwitch
                      label="Metadata Models"
                      description="Copy metadata model definitions"
                      checked={field.value}
                      value={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
                <Controller
                  name="copyOptions.credentials"
                  control={form.control}
                  render={({ field }) => (
                    <InputSwitch
                      label="Credentials"
                      description="Copy API credentials and keys"
                      checked={field.value}
                      value={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
              </div>
            )}
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
