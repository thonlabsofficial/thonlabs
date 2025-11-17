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
import useMetadata from '@/_hooks/use-metadata';
import MetadataFormFields from './metadata-form-fields';

type Props = {
  trigger?: React.ReactNode;
  metadata: Metadata;
};

export default function MetadataUpdateDrawer({
  trigger,
  metadata,
  ...props
}: Props & React.ComponentProps<typeof Drawer>) {
  const form = useForm<UpdateMetadataFormData>({
    resolver: zodResolver(UpdateMetadataFormSchema),
  });
  const [isSaving, startSavingTransition] = useTransition();
  const { updateMetadata } = useMetadata();
  const formValues = form.getValues();

  React.useEffect(() => {
    if (props.open) {
      handleReset();
    }
  }, [props.open]);

  function onSubmit(payload: UpdateMetadataFormData) {
    startSavingTransition(async () => {
      try {
        // Remove options if type is not List
        const finalPayload = {
          ...payload,
          options: metadata.type === 'List' ? payload.options : undefined,
        };

        await updateMetadata(metadata.id, finalPayload);
        props.onOpenChange?.(false);
      } catch {}
    });
  }

  function handleReset() {
    form.clearErrors();
    form.setValue('name', metadata.name);
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
              <Typo variant={'muted'}>Edit Metadata</Typo>
              <div className="truncate">{formValues?.name || '-'}</div>
            </div>
          </DrawerTitle>
        </DrawerHeader>
        <form className="h-full" onSubmit={form.handleSubmit(onSubmit)}>
          <DrawerScrollArea>
            <DrawerContentContainer>
              <div className="grid w-full items-center gap-4">
                <InputWrapper>
                  <Input
                    label="Name"
                    error={form.formState.errors.name?.message}
                    {...form.register('name')}
                  />
                </InputWrapper>
                <MetadataFormFields
                  control={form.control}
                  register={form.register}
                  errors={form.formState.errors}
                  type={metadata.type}
                />
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
