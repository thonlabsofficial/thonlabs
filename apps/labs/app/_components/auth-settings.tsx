'use client';

import SeparatorLine from '@/_components/separator-line';
import useEnvironment from '@/_hooks/use-environment';
import {
  UpdateEnvironmentAuthSettingsFormData,
  UpdateEnvironmentAuthSettingsFormSchema,
} from '@/_validators/environments-validators';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@repo/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@repo/ui/card';
import { Input, InputWrapper } from '@repo/ui/input';
import { InputRadio } from '@repo/ui/input-radio';
import { InputSwitch } from '@repo/ui/input-switch';
import { Typo } from '@repo/ui/typo';
import { useParams } from 'next/navigation';
import { useTransition } from 'react';
import { Controller, useForm } from 'react-hook-form';

export default function AuthSettings() {
  const { environmentId } = useParams();
  const form = useForm<UpdateEnvironmentAuthSettingsFormData>({
    resolver: zodResolver(UpdateEnvironmentAuthSettingsFormSchema),
  });
  const { environment, isLoadingEnvironment, updateEnvironmentAuthSettings } =
    useEnvironment(
      {
        environmentId: environmentId as string,
      },
      {
        onFetchComplete() {
          form.reset({
            authProvider: environment?.authProvider || '',
            tokenExpiration: environment?.tokenExpiration || '',
            refreshTokenExpiration: environment?.refreshTokenExpiration || '',
            enableSignUp: environment?.enableSignUp || false,
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
          enableSignUp: payload?.enableSignUp || false,
        });
      });
    });
  }

  return (
    <Card>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-[19rem_1fr] gap-40">
          <CardHeader description="Customize the login page to match your brand and user experience.">
            Login Page
          </CardHeader>
          <CardContent className="flex-1 p-6">
            <div className="grid gap-5">
              <InputWrapper>
                <InputRadio
                  label="Login Type"
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
              </InputWrapper>
              <Controller
                name="enableSignUp"
                control={form.control}
                render={({ field }) => (
                  <InputSwitch
                    label="Enable Sign Up"
                    description="Allow users to sign up to the platform from login page."
                    value={field.value}
                    onCheckedChange={field.onChange}
                    checked={!!field.value}
                    loading={isLoadingEnvironment}
                  />
                )}
              />
            </div>
          </CardContent>
        </div>
        <SeparatorLine />
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
