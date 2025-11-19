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
} from '@repo/ui/drawer';
import { Metadata } from '@/_interfaces/metadata';
import { Typo } from '@repo/ui/typo';
import {
  UpdateMetadataFormData,
  UpdateMetadataFormSchema,
} from '@/_validators/metadata-validators';
import useMetadata from '@/_hooks/use-metadata-model';
import MetadataModelListOptionsForm from './metadata-model-list-options-form';
import { Alert, AlertDescription, AlertTitle } from '@repo/ui/alert';
import useMetadataModel from '@/_hooks/use-metadata-model';

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
                <div className="grid grid-cols-2 gap-4">
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
                      label="Key"
                      value={metadata?.key}
                      readOnly
                      withCopy
                    />
                  </InputWrapper>
                </div>
                <InputWrapper>
                  <Input
                    label="Description"
                    error={form.formState.errors.description?.message as string}
                    maxLength={255}
                    {...form.register('description')}
                  />
                </InputWrapper>
                <div className="grid grid-cols-2 gap-4">
                  <InputWrapper>
                    <Input label="Type" value={metadata?.type} readOnly />
                  </InputWrapper>
                  <InputWrapper>
                    <Input label="Context" value={metadata?.context} readOnly />
                  </InputWrapper>
                </div>
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
            <Button
              type="submit"
              loading={isSaving}
              className="w-full"
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
