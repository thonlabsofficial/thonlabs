'use client';

import { Button } from '@repo/ui/button';
import { Input, InputWrapper } from '@repo/ui/input';
import React, { useTransition } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  CreateMetadataFormData,
  CreateMetadataFormSchema,
} from '@/_validators/metadata-validators';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerContentContainer,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerScrollArea,
  DrawerTitle,
  DrawerTrigger,
} from '@repo/ui/drawer';
import useMetadataModel from '@/_hooks/use-metadata-model';
import {
  InputSelect,
  InputSelectContent,
  InputSelectItem,
  InputSelectTrigger,
  InputSelectValue,
} from '@repo/ui/input-select';
import MetadataModelListOptionsForm from './metadata-model-list-options-form';
import Utils from '@repo/utils';
import {
  METADATA_CONTEXT_OPTIONS,
  METADATA_TYPE_OPTIONS,
} from '@/_constants/metadata-constants';
import { Typo } from '@repo/ui/typo';

type Props = {
  trigger: React.ReactNode;
};

export default function MetadataModelCreateDrawer({
  trigger,
}: Props & React.ComponentProps<typeof Drawer>) {
  const [open, setOpen] = React.useState(false);
  const [isCreating, startTransitionCreating] = useTransition();
  const { createMetadataModel } = useMetadataModel();
  const form = useForm<CreateMetadataFormData>({
    resolver: zodResolver(CreateMetadataFormSchema),
  });

  const watchType = form.watch('type');
  const watchName = form.watch('name');

  React.useEffect(() => {
    if (open) {
      handleReset();
    }
  }, [open]);

  // Auto-generate key from name
  React.useEffect(() => {
    if (watchName !== null && watchName !== undefined) {
      const normalizedKey = Utils.toCamelCase(watchName);
      form.setValue('key', normalizedKey, { shouldValidate: true });
    }
  }, [watchName]);

  function onSubmit(payload: CreateMetadataFormData) {
    startTransitionCreating(async () => {
      try {
        const finalPayload = {
          ...payload,
          options: payload.type === 'List' ? payload.options : undefined,
        };

        const metadata = await createMetadataModel(finalPayload);

        if (metadata) {
          setOpen(false);
        }
      } catch {}
    });
  }

  function handleReset() {
    form.clearErrors();
    form.reset({
      options: [],
    });
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild onClick={handleReset}>
        {trigger}
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Create Metadata Model</DrawerTitle>
          <DrawerDescription>
            Choose the context and fill the fields below to create a new
            metadata model.
          </DrawerDescription>
        </DrawerHeader>
        <form className="h-full" onSubmit={form.handleSubmit(onSubmit)}>
          <DrawerScrollArea>
            <DrawerContentContainer>
              <div className="grid w-full items-center gap-6">
                <section>
                  <header className="flex flex-col gap-0.5 mb-2">
                    <Typo variant="lg" className="flex items-center gap-1">
                      Context
                    </Typo>
                    <Typo variant="muted">
                      The context is where the metadata will be applied. For
                      example, if you want to apply the metadata to a user like
                      a "userType", you would select "User".
                    </Typo>
                  </header>
                  <div className="space-y-3">
                    <InputWrapper>
                      <Controller
                        name="context"
                        control={form.control}
                        render={({ field }) => (
                          <InputSelect
                            onValueChange={field.onChange}
                            {...field}
                          >
                            <InputSelectTrigger
                              error={form.formState.errors.context?.message}
                            >
                              <InputSelectValue placeholder="Select a context" />
                            </InputSelectTrigger>
                            <InputSelectContent>
                              {METADATA_CONTEXT_OPTIONS.map((option) => (
                                <InputSelectItem
                                  key={option.value}
                                  value={option.value}
                                >
                                  {option.label}
                                </InputSelectItem>
                              ))}
                            </InputSelectContent>
                          </InputSelect>
                        )}
                      />
                    </InputWrapper>
                  </div>
                </section>

                <>
                  <section>
                    <header className="flex flex-col gap-0.5 mb-2">
                      <Typo variant="lg" className="flex items-center gap-1">
                        General
                      </Typo>
                    </header>
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-2">
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
                            error={form.formState.errors.key?.message}
                            maxLength={100}
                            {...form.register('key')}
                          />
                        </InputWrapper>
                      </div>
                      <InputWrapper>
                        <Input
                          label="Description"
                          error={
                            form.formState.errors.description?.message as string
                          }
                          maxLength={255}
                          optional
                          {...form.register('description')}
                        />
                      </InputWrapper>
                      <InputWrapper>
                        <Controller
                          name="type"
                          control={form.control}
                          render={({ field }) => (
                            <InputSelect
                              onValueChange={field.onChange}
                              {...field}
                            >
                              <InputSelectTrigger
                                label="Type"
                                error={form.formState.errors.type?.message}
                              >
                                <InputSelectValue placeholder="Select a type" />
                              </InputSelectTrigger>
                              <InputSelectContent>
                                {METADATA_TYPE_OPTIONS.map((option) => (
                                  <InputSelectItem
                                    key={option.value}
                                    value={option.value}
                                  >
                                    {option.label}
                                  </InputSelectItem>
                                ))}
                              </InputSelectContent>
                            </InputSelect>
                          )}
                        />
                      </InputWrapper>
                      {watchType === 'List' && (
                        <InputWrapper>
                          <Typo variant="baseBold">Options</Typo>
                          <MetadataModelListOptionsForm form={form} />
                        </InputWrapper>
                      )}
                    </div>
                  </section>
                </>
              </div>
            </DrawerContentContainer>
          </DrawerScrollArea>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button
                type="button"
                variant="ghost"
                size="md"
                disabled={isCreating}
              >
                Back
              </Button>
            </DrawerClose>
            <Button type="submit" size="md" loading={isCreating}>
              {isCreating ? 'Creating...' : 'Create Metadata Model'}
            </Button>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  );
}
