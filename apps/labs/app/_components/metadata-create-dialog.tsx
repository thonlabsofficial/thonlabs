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
import useMetadata from '@/_hooks/use-metadata';
import {
  InputSelect,
  InputSelectContent,
  InputSelectItem,
  InputSelectTrigger,
  InputSelectValue,
} from '@repo/ui/input-select';
import MetadataFormFields from './metadata-form-fields';
import Utils from '@repo/utils';

type Props = {
  trigger: React.ReactNode;
};

export default function MetadataCreateDialog({
  trigger,
  ...props
}: Props & React.ComponentProps<typeof Dialog>) {
  const [open, setOpen] = React.useState(false);
  const [isCreating, startTransitionCreating] = useTransition();
  const { createMetadata } = useMetadata();
  const form = useForm<CreateMetadataFormData>({
    resolver: zodResolver(CreateMetadataFormSchema),
    defaultValues: {
      type: 'String',
      context: 'User',
    },
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
    if (watchName) {
      const normalizedKey = Utils.normalizeString(watchName, '_');
      form.setValue('key', normalizedKey);
    }
  }, [watchName]);

  function onSubmit(payload: CreateMetadataFormData) {
    startTransitionCreating(async () => {
      try {
        // Remove options if type is not List
        const finalPayload = {
          ...payload,
          options: payload.type === 'List' ? payload.options : undefined,
        };

        const metadata = await createMetadata(finalPayload);

        if (metadata) {
          setOpen(false);
        }
      } catch {}
    });
  }

  function handleReset() {
    form.clearErrors();
    form.reset({
      type: 'String',
      context: 'User',
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
            <InputWrapper>
              <Input
                label="Name"
                placeholder="User Department"
                error={form.formState.errors.name?.message}
                {...form.register('name')}
              />
            </InputWrapper>
            <InputWrapper>
              <Input
                label="Key"
                placeholder="user_department"
                error={form.formState.errors.key?.message}
                {...form.register('key')}
              />
            </InputWrapper>
            <div className="grid grid-cols-2 gap-4">
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
                        <InputSelectValue placeholder="Select type" />
                      </InputSelectTrigger>
                      <InputSelectContent>
                        <InputSelectItem value="String">String</InputSelectItem>
                        <InputSelectItem value="Number">Number</InputSelectItem>
                        <InputSelectItem value="Boolean">Boolean</InputSelectItem>
                        <InputSelectItem value="JSON">JSON</InputSelectItem>
                        <InputSelectItem value="List">List</InputSelectItem>
                      </InputSelectContent>
                    </InputSelect>
                  )}
                />
              </InputWrapper>
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
                        <InputSelectValue placeholder="Select context" />
                      </InputSelectTrigger>
                      <InputSelectContent>
                        <InputSelectItem value="User">User</InputSelectItem>
                        <InputSelectItem value="Organization">
                          Organization
                        </InputSelectItem>
                      </InputSelectContent>
                    </InputSelect>
                  )}
                />
              </InputWrapper>
            </div>
            <MetadataFormFields
              control={form.control}
              register={form.register}
              errors={form.formState.errors}
              type={watchType}
              watchName={watchName}
            />
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
