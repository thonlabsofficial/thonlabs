'use client';

import React from 'react';
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
import { useTransition } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import EnableSignUpB2BOnlySwitch from '@/_components/enable-signup-b2b-only-switch';
import { EnvironmentDetail } from '@/_interfaces/environment';
import { EnvironmentData, usePreviewMode } from '@thonlabs/nextjs';
import { Label } from '@repo/ui/label';
import {
  InputSelect,
  InputSelectContent,
  InputSelectItem,
  InputSelectTrigger,
  InputSelectValue,
} from '@repo/ui/input-select';

interface Props {
  environment: EnvironmentDetail;
}

export default function BuilderAuthSettings({ environment }: Props) {
  const [tokenExpirationValue, tokenExpirationUnit] = React.useMemo(() => {
    if (!environment.tokenExpiration) {
      /*
        If not exists, do not fallback, it should be an error
        and for sure there is some bug in our backend
      */
      return [];
    }

    const match = environment.tokenExpiration.match(/^(\d+)([a-z]+)$/i);

    return match?.[1] && match?.[2]
      ? [
          Number(match[1]),
          match[2] as UpdateEnvironmentAuthSettingsFormData['tokenExpirationUnit'],
        ]
      : [];
  }, [environment.tokenExpiration]);

  const form = useForm<UpdateEnvironmentAuthSettingsFormData>({
    resolver: zodResolver(UpdateEnvironmentAuthSettingsFormSchema),
    defaultValues: {
      authProvider: environment.authProvider || '',
      tokenExpirationValue,
      tokenExpirationUnit,
      refreshTokenExpiration: environment.refreshTokenExpiration || '',
      enableSignUp: environment.enableSignUp || false,
      enableSignUpB2BOnly: environment.enableSignUpB2BOnly || false,
    },
  });
  const formData = useWatch({ control: form.control });
  const { updateEnvironmentAuthSettings } = useEnvironment();
  const [isSaving, startSavingTransition] = useTransition();
  const { setPreviewEnvironmentData } = usePreviewMode();

  React.useEffect(() => {
    setPreviewEnvironmentData(formData as EnvironmentData);
  }, [formData, setPreviewEnvironmentData]);

  function onSubmit(payload: UpdateEnvironmentAuthSettingsFormData) {
    startSavingTransition(() => {
      updateEnvironmentAuthSettings(environment!.id, payload).then(() => {
        form.reset({
          authProvider: payload?.authProvider || '',
          tokenExpirationValue: payload?.tokenExpirationValue || 0,
          tokenExpirationUnit: payload?.tokenExpirationUnit || '',
          refreshTokenExpiration: payload?.refreshTokenExpiration || '',
          enableSignUp: payload?.enableSignUp || false,
          enableSignUpB2BOnly: payload?.enableSignUpB2BOnly || false,
        });
      });
    });
  }

  return (
    <Card>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-[15rem_1fr] gap-3">
          <CardHeader
            padding
            description="Customize the login page to match your brand and user experience."
          >
            Login Page
          </CardHeader>
          <CardContent className="flex-1 p-6">
            <div className="grid gap-5">
              <InputWrapper>
                <InputRadio
                  label="Login Type"
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
            </div>
          </CardContent>
        </div>
        <SeparatorLine className="my-0" />
        <div className="grid grid-cols-[15rem_1fr] gap-3">
          <CardHeader
            padding
            description="Control who can access your app. Choose between open access or limit it to specific organization domains."
          >
            User Creation
          </CardHeader>
          <CardContent className="flex-1 p-6">
            <div className="grid gap-5">
              <InputWrapper>
                <Controller
                  name="enableSignUp"
                  control={form.control}
                  render={({ field }) => (
                    <InputSwitch
                      label="Enable Sign Up"
                      description="Allow users to sign up to the platform from login page. When disabled only invitations will be allowed."
                      value={field.value}
                      onCheckedChange={field.onChange}
                      checked={!!field.value}
                    />
                  )}
                />
              </InputWrapper>
              <InputWrapper>
                <EnableSignUpB2BOnlySwitch form={form} />
              </InputWrapper>
            </div>
          </CardContent>
        </div>
        <SeparatorLine className="my-0" />
        <div className="grid grid-cols-[15rem_1fr] gap-3">
          <CardHeader
            padding
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
                <Label>Access Token Expiration</Label>
                <div className="grid grid-cols-[6rem_1fr] gap-1">
                  <Input
                    maxLength={2}
                    {...form.register('tokenExpirationValue', {
                      valueAsNumber: true,
                    })}
                  />
                  <Controller
                    name="tokenExpirationUnit"
                    control={form.control}
                    render={({ field }) => (
                      <InputSelect onValueChange={field.onChange} {...field}>
                        <InputSelectTrigger value={field.value}>
                          <InputSelectValue placeholder="Select an option" />
                        </InputSelectTrigger>
                        <InputSelectContent>
                          <InputSelectItem value="m">minutes</InputSelectItem>
                          <InputSelectItem value="d">days</InputSelectItem>
                        </InputSelectContent>
                      </InputSelect>
                    )}
                  />
                </div>
                {form.formState.errors.tokenExpirationValue && (
                  <Typo variant={'sm'} state={'error'} className="text-sm">
                    {form.formState.errors.tokenExpirationValue?.message}
                  </Typo>
                )}
              </InputWrapper>
              <InputWrapper>
                <Input
                  id="appURL"
                  placeholder="e.g.: 30d"
                  label="Refresh Token Expiration"
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
