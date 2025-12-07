'use client';

import { Button } from '@repo/ui/button';
import { Input, InputWrapper } from '@repo/ui/input';
import React, { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import {
  UpdateProjectGeneralInfoFormSchema,
  UpdateProjectGeneralInfoFormData,
} from '@/_validators/projects-validators';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerScrollArea,
  DrawerContentContainer,
  DrawerClose,
} from '@repo/ui/drawer';
import { Project } from '@/_interfaces/project';
import useProject from '@/_hooks/use-project';
import DeleteProjectDialog from './delete-project-dialog';
import { Card, CardContent, CardHeader } from '@repo/ui/card';
import { Typo } from '@repo/ui/typo';

type Props = {
  trigger?: React.ReactNode;
  project: Project;
};

export default function ProjectSettingsDrawer({
  trigger,
  project,
  ...props
}: Props & React.ComponentProps<typeof Drawer>) {
  const form = useForm<UpdateProjectGeneralInfoFormData>({
    resolver: zodResolver(UpdateProjectGeneralInfoFormSchema),
  });
  const [isSaving, startSavingTransition] = useTransition();
  const { updateGeneralInfo } = useProject();

  function onSubmit(payload: UpdateProjectGeneralInfoFormData) {
    startSavingTransition(async () => {
      await updateGeneralInfo(project.id, payload);
      props.onOpenChange?.(false);
    });
  }

  function handleReset() {
    form.clearErrors();
    form.setValue('appName', project.appName);
  }

  React.useEffect(() => {
    if (props.open) {
      handleReset();
    }
  }, [props.open]);

  return (
    <Drawer {...props}>
      {trigger && (
        <DrawerTrigger asChild onClick={handleReset}>
          {trigger}
        </DrawerTrigger>
      )}
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Project Settings</DrawerTitle>
          <DrawerDescription>
            Update the name of <strong>{project?.appName}</strong> project.
          </DrawerDescription>
        </DrawerHeader>
        <form className="h-full" onSubmit={form.handleSubmit(onSubmit)}>
          <DrawerScrollArea>
            <DrawerContentContainer>
              <div className="grid w-full items-center gap-6">
                <section>
                  <header className="flex flex-col gap-0.5 mb-2">
                    <Typo variant="lg">General</Typo>
                  </header>
                  <div className="space-y-3">
                    <InputWrapper>
                      <Input
                        id="appName"
                        label="PID (Project ID)"
                        value={project?.id}
                        readOnly
                        withCopy
                      />
                    </InputWrapper>
                    <InputWrapper>
                      <Input
                        id="appName"
                        label="Project Name"
                        maxLength={25}
                        error={form.formState.errors.appName?.message}
                        {...form.register('appName')}
                      />
                    </InputWrapper>
                  </div>
                </section>

                <section>
                  <header className="flex flex-col gap-0.5 mb-2">
                    <Typo variant="lg">Danger zone</Typo>
                  </header>
                  <Card className="border-destructive/60 bg-destructive/10">
                    <div className="grid grid-cols-[22rem_1fr] gap-24">
                      <CardHeader
                        padding
                        description="Deleting a project is permanent and cannot be undone."
                      >
                        Delete Project
                      </CardHeader>
                      <CardContent className="flex justify-end items-center p-6">
                        <DeleteProjectDialog
                          trigger={
                            <Button variant="destructive">Delete</Button>
                          }
                          project={project}
                        />
                      </CardContent>
                    </div>
                  </Card>
                </section>
              </div>
            </DrawerContentContainer>
          </DrawerScrollArea>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="ghost">Cancel</Button>
            </DrawerClose>
            <Button type="submit" loading={isSaving}>
              {isSaving ? 'Saving...' : 'Save Changes'}
            </Button>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  );
}
