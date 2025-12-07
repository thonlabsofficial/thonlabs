'use client';

import { Button } from '@repo/ui/button';
import { Input, InputWrapper } from '@repo/ui/input';
import React, { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerScrollArea,
  DrawerContentContainer,
  DrawerDescription,
  DrawerClose,
} from '@repo/ui/drawer';
import { Metadata } from '@/_interfaces/metadata';
import { Typo } from '@repo/ui/typo';
import {
  UpdateMetadataFormData,
  UpdateMetadataFormSchema,
} from '@/_validators/metadata-validators';
import MetadataModelListOptionsForm from './metadata-model-list-options-form';
import { Alert, AlertDescription, AlertTitle } from '@repo/ui/alert';
import useMetadataModel from '@/_hooks/use-metadata-model';
import { Badge } from '@repo/ui/badge';

type Props = {
  trigger?: React.ReactNode;
  metadata: Metadata;
};

export default function MetadataModelEditDrawer({
  trigger,
  metadata,
  ...props
}: Props & React.ComponentProps<typeof Drawer>) {
  const form = useForm<UpdateMetadataFormData>({
    resolver: zodResolver(UpdateMetadataFormSchema),
  });
  const [isSaving, startSavingTransition] = useTransition();
  const { updateMetadataModel } = useMetadataModel();
  const formValues = form.getValues();

  React.useEffect(() => {
    if (props.open) {
      handleReset();
    }
  }, [props.open]);

  function onSubmit(payload: UpdateMetadataFormData) {
    startSavingTransition(async () => {
      try {
        const finalPayload = {
          name: payload.name,
          description: payload.description,
          options: metadata.type === 'List' ? payload.options : undefined,
        };

        await updateMetadataModel(metadata.id, finalPayload);
        props.onOpenChange?.(false);
      } catch {}
    });
  }

  function handleReset() {
    form.clearErrors();
    form.setValue('name', metadata.name);
    form.setValue('type', metadata.type);
    form.setValue('description', metadata.description || '');
    form.setValue('options', metadata.options || []);
  }

  return (
    <Drawer {...props}>
      {trigger && (
        <DrawerTrigger asChild onClick={handleReset}>
          {trigger}
        </DrawerTrigger>
      )}
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="flex gap-1.5">
            <div className="flex flex-col justify-center w-[17.625rem]">
              <Typo variant={'muted'}>Edit Metadata Model</Typo>
              <div className="truncate">{formValues?.name || '-'}</div>
            </div>
          </DrawerTitle>
        </DrawerHeader>
        <form className="h-full" onSubmit={form.handleSubmit(onSubmit)}>
          <DrawerScrollArea>
            <DrawerContentContainer>
              <div className="grid w-full items-center gap-4">
                <section>
                  <header className="flex flex-col gap-0.5 mb-2">
                    <Typo variant="lg" className="flex items-center gap-1">
                      Model Info
                    </Typo>
                  </header>
                  <div className="space-x-3">
                    <Typo variant="muted">
                      Context:{' '}
                      <Badge variant="outline" size="lg">
                        {metadata?.context}
                      </Badge>
                    </Typo>
                    <Typo variant="muted">
                      Key:{' '}
                      <Badge variant="outline" size="lg">
                        {metadata?.key}
                      </Badge>
                    </Typo>
                    <Typo variant="muted">
                      Type:{' '}
                      <Badge variant="outline" size="lg">
                        {metadata?.type}
                      </Badge>
                    </Typo>
                  </div>
                </section>
                <section>
                  <header className="flex flex-col gap-0.5 mb-2">
                    <Typo variant="lg" className="flex items-center gap-1">
                      General
                    </Typo>
                  </header>
                  <div className="space-y-3">
                    <InputWrapper>
                      <Input
                        label="Name"
                        error={form.formState.errors.name?.message}
                        maxLength={100}
                        {...form.register('name')}
                      />
                    </InputWrapper>
                    <InputWrapper>
                      <Input
                        label="Description"
                        optional
                        error={
                          form.formState.errors.description?.message as string
                        }
                        maxLength={255}
                        {...form.register('description')}
                      />
                    </InputWrapper>
                  </div>
                </section>
                {metadata?.type === 'List' && (
                  <InputWrapper>
                    <div className="flex items-center justify-between">
                      <Typo variant="baseBold">Options</Typo>
                    </div>
                    <MetadataModelListOptionsForm form={form} />
                    <Alert variant="info" size="sm" className="mt-2">
                      <AlertTitle>Good to Know</AlertTitle>
                      <AlertDescription>
                        Removing an option will not affect existing data stored.
                      </AlertDescription>
                    </Alert>
                  </InputWrapper>
                )}
              </div>
            </DrawerContentContainer>
          </DrawerScrollArea>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button type="button" variant="ghost" disabled={isSaving}>
                Back
              </Button>
            </DrawerClose>
            <Button
              type="submit"
              loading={isSaving}
              disabled={!form.formState.isDirty || isSaving}
            >
              {isSaving ? 'Saving...' : 'Save Changes'}
            </Button>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  );
}
