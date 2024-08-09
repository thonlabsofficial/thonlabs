'use client';

import useEnvironment from '@/(labs)/_hooks/use-environment';
import { Environment } from '@/(labs)/_interfaces/environment';
import {
  UpdateEnvironmentAuthSettingsFormData,
  UpdateEnvironmentAuthSettingsFormSchema,
} from '@/(labs)/_validators/environments-validators';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@repo/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@repo/ui/card';
import { Input, InputWrapper } from '@repo/ui/input';
import { InputRadio } from '@repo/ui/input-radio';
import { Typo } from '@repo/ui/typo';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';

type Props = {
  sessionEnvironment: Environment;
};

export default function AuthSettings({ sessionEnvironment }: Props) {
  const form = useForm<UpdateEnvironmentAuthSettingsFormData>({
    resolver: zodResolver(UpdateEnvironmentAuthSettingsFormSchema),
  });
  const { environment, isLoadingEnvironment, updateEnvironmentAuthSettings } =
    useEnvironment(
      {
        environmentID: sessionEnvironment.id,
      },
      {
        onFetchComplete() {
          form.reset({
            authProvider: environment?.authProvider || '',
            tokenExpiration: environment?.tokenExpiration || '',
            refreshTokenExpiration: environment?.refreshTokenExpiration || '',
          });
        },
      },
    );
  const [isSaving, startSavingTransition] = useTransition();

  function onSubmit(payload: UpdateEnvironmentAuthSettingsFormData) {
    startSavingTransition(() => {
      updateEnvironmentAuthSettings(environment!.id, payload).then(() => {
        form.reset({
          authProvider: payload?.authProvider || '',
          tokenExpiration: payload?.tokenExpiration || '',
          refreshTokenExpiration: payload?.refreshTokenExpiration || '',
        });
      });
    });
  }

  return (
    <Card>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-[19rem_1fr] gap-40">
          <CardHeader>Login Type</CardHeader>
          <CardContent className="flex-1 p-6">
            <div className="grid gap-5">
              <InputRadio
                // control={form.control}
                loading={isLoadingEnvironment}
                options={[
                  {
                    value: 'MagicLogin',
                    label: 'Magic Login',
                    description:
                      'This generates a unique link to user authenticate',
                  },
                  {
                    value: 'EmailAndPassword',
                    label: 'Email and Password',
                    description: 'The classic way to authenticate',
                  },
                ]}
                {...form.register('authProvider')}
              />
            </div>
          </CardContent>
        </div>
        <div className="h-px bg-background w-full my-6" />
        <div className="grid grid-cols-[19rem_1fr] gap-40">
          <CardHeader
            description={
              <>
                The time is based on{' '}
                <a
                  href="https://github.com/vercel/ms?tab=readme-ov-file#examples"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Typo variant={'codeLink'}>vercel/ms</Typo>
                </a>{' '}
                convert time formats pattern.
              </>
            }
          >
            Session Tokens Expirations
          </CardHeader>
          <CardContent className="flex-1 p-6">
            <div className="grid gap-5">
              <InputWrapper>
                <Input
                  id="name"
                  placeholder="e.g.: 1d"
                  label="Access Token Expiration"
                  maxLength={25}
                  loading={isLoadingEnvironment}
                  error={form.formState.errors.tokenExpiration?.message}
                  {...form.register('tokenExpiration')}
                />
              </InputWrapper>
              <InputWrapper>
                <Input
                  id="appURL"
                  placeholder="e.g.: 30d"
                  label="Refresh Token Expiration"
                  loading={isLoadingEnvironment}
                  error={form.formState.errors.refreshTokenExpiration?.message}
                  {...form.register('refreshTokenExpiration')}
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
