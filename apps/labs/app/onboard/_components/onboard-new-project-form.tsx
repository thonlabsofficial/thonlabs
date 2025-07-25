'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import {
  NewProjectFormData,
  NewProjectFormSchema,
} from '@/_validators/projects-validators';
import { zodResolver } from '@hookform/resolvers/zod';
import useProject from '@/_hooks/use-project';
import { useRouter } from 'next/navigation';
import { Input, InputWrapper } from '@repo/ui/input';
import { Button } from '@repo/ui/button';

export default function OnboardNewProjectForm() {
  const form = useForm<NewProjectFormData>({
    resolver: zodResolver(NewProjectFormSchema),
  });
  const { createProject } = useProject();
  const [isCreatingProject, startTransitionCreatingProject] =
    React.useTransition();
  const router = useRouter();

  function onSubmit(payload: NewProjectFormData) {
    startTransitionCreatingProject(async () => {
      const project = await createProject(payload, false);

      if (project) {
        router.push('/onboard/finish');
      }
    });
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <div className="grid w-full items-center gap-4">
        <InputWrapper>
          <Input
            id="appName"
            placeholder="e.g.: Acme Inc."
            label="Name"
            maxLength={30}
            error={form.formState.errors.appName?.message}
            {...form.register('appName')}
          />
        </InputWrapper>
        <InputWrapper>
          <Input
            id="appURL"
            placeholder="e.g.: http://localhost:3000"
            label="URL"
            error={form.formState.errors.appURL?.message}
            {...form.register('appURL')}
          />
        </InputWrapper>
      </div>
      <Button type="submit" loading={isCreatingProject} className="w-full mt-6">
        {isCreatingProject ? 'Creating...' : 'Create Project'}
      </Button>
    </form>
  );
}
