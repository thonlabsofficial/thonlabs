'use client';

import { Button } from '@repo/ui/button';
import { Input, InputWrapper } from '@repo/ui/input';
import React from 'react';
import { useForm } from 'react-hook-form';
import {
  NewProjectFormData,
  NewProjectFormSchema,
} from '../_validators/projects-validators';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@repo/ui/drawer';

type Props = {
  trigger: React.ReactNode;
};

export default function NewProjectDrawer({
  trigger,
}: Props & React.HTMLAttributes<HTMLElement>) {
  const form = useForm<NewProjectFormData>({
    resolver: zodResolver(NewProjectFormSchema),
  });

  async function onSubmit(data: NewProjectFormData) {
    console.log(data);
  }

  function handleClose() {
    form.clearErrors();
    form.reset();
  }

  return (
    <Drawer onClose={handleClose}>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>New Project</DrawerTitle>
          <DrawerDescription>
            Once you create a new project, a "Production" environment will be
            automatically created.
          </DrawerDescription>
        </DrawerHeader>
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
          <DrawerFooter>
            <DrawerClose>
              <Button type="button" variant="ghost" className="w-full">
                Cancel
              </Button>
            </DrawerClose>
            <Button type="submit">Create Project</Button>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  );
}
