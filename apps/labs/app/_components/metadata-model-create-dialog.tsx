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
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@repo/ui/dialog';
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

type Props = {
  trigger: React.ReactNode;
};

export default function MetadataModelCreateDialog({
  trigger,
}: Props & React.ComponentProps<typeof Dialog>) {
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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild onClick={handleReset}>
        {trigger}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>New Metadata</DialogTitle>
          <DialogDescription>
            Complete the information below to create a new metadata field.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)}>
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
                  error={form.formState.errors.key?.message}
                  maxLength={100}
                  {...form.register('key')}
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
                <Controller
                  name="context"
                  control={form.control}
                  render={({ field }) => (
                    <InputSelect onValueChange={field.onChange} {...field}>
                      <InputSelectTrigger
                        label="Context"
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
              <InputWrapper>
                <Controller
                  name="type"
                  control={form.control}
                  render={({ field }) => (
                    <InputSelect onValueChange={field.onChange} {...field}>
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
            </div>
            {watchType === 'List' && (
              <MetadataModelListOptionsForm form={form} />
            )}
          </div>
          <DialogFooter className="mt-6">
            <DialogClose asChild>
              <Button type="button" variant="ghost" disabled={isCreating}>
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" loading={isCreating}>
              {isCreating ? 'Creating...' : 'Create Metadata'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
