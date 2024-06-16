'use client';

import { Button } from '@repo/ui/button';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@repo/ui/dialog';
import { Input, InputWrapper } from '@repo/ui/input';
import React from 'react';
import { useForm } from 'react-hook-form';
import {
  NewProjectFormData,
  NewProjectFormSchema,
} from '../_validators/projects-validators';
import { zodResolver } from '@hookform/resolvers/zod';

type Props = {
  trigger: React.ReactNode;
};

export default function NewProjectDialog({
  trigger,
  ...props
}: Props & React.HTMLAttributes<HTMLElement>) {
  const form = useForm<NewProjectFormData>({
    resolver: zodResolver(NewProjectFormSchema),
  });

  async function onSubmit(data: NewProjectFormData) {
    console.log(data);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent {...props}>
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
          <DialogFooter className="mt-6">
            <Button type="submit">Create</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
