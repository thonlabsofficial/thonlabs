'use client';

import useEnvironment from '@/_hooks/use-environment';
import {
  UpdateEnvironmentGeneralSettingsFormData,
  UpdateEnvironmentGeneralSettingsFormSchema,
} from '@/_validators/environments-validators';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@repo/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@repo/ui/card';
import { Input, InputWrapper } from '@repo/ui/input';
import { useParams } from 'next/navigation';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';

export default function EnvironmentGeneralSettings() {
  const form = useForm<UpdateEnvironmentGeneralSettingsFormData>({
    resolver: zodResolver(UpdateEnvironmentGeneralSettingsFormSchema),
  });
  const { environmentId } = useParams();
  const {
    environment,
    isLoadingEnvironment,
    updateEnvironmentGeneralSettings,
  } = useEnvironment(
    {
      environmentId: environmentId as string,
    },
    {
      onFetchComplete() {
        form.reset({
          name: environment?.name || '',
          appURL: environment?.appURL || '',
        });
      },
    },
  );
  const [isSaving, startSavingTransition] = useTransition();

  function onSubmit(payload: UpdateEnvironmentGeneralSettingsFormData) {
    startSavingTransition(() => {
      updateEnvironmentGeneralSettings(environment!.id, payload).then(() => {
        form.reset({
          name: payload?.name || '',
          appURL: payload?.appURL || '',
        });
      });
    });
  }

  return (
    <Card>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-[19rem_1fr] gap-40">
          <CardHeader>General Settings</CardHeader>
          <CardContent className="flex-1 p-6">
            <div className="grid gap-5">
              <InputWrapper>
                <Input
                  id="name"
                  placeholder="id..."
                  label="Environment ID"
                  readOnly
                  loading={isLoadingEnvironment}
                  value={environment?.id}
                  withCopy
                />
              </InputWrapper>
              <InputWrapper>
                <Input
                  id="name"
                  placeholder="e.g.: Staging"
                  label="Name"
                  maxLength={25}
                  loading={isLoadingEnvironment}
                  error={form.formState.errors.name?.message}
                  {...form.register('name')}
                />
              </InputWrapper>
              <InputWrapper>
                <Input
                  id="appURL"
                  placeholder="e.g.: https://staging.thonlabs.io"
                  label="Application URL"
                  loading={isLoadingEnvironment}
                  error={form.formState.errors.appURL?.message}
                  {...form.register('appURL')}
                />
              </InputWrapper>
            </div>
          </CardContent>
        </div>
        <CardFooter className="flex gap-2 justify-end">
          <Button
            type="button"
            size={'sm'}
            variant={'ghost'}
            disabled={!form.formState.isDirty || isSaving}
            onClick={() => form.reset()}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            size={'sm'}
            disabled={!form.formState.isDirty || isSaving}
          >
            {isSaving ? 'Saving...' : 'Save'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
