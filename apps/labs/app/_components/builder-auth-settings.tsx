'use client';

import React from 'react';
import SeparatorLine from '@/_components/separator-line';
import {
  UpdateEnvironmentAuthSettingsFormData,
  UpdateEnvironmentAuthSettingsFormSchema,
} from '@/_validators/builder-validators';
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
import {
  EnvironmentData,
  SSOSocialProvider,
  usePreviewMode,
} from '@thonlabs/nextjs';
import {
  InputSelect,
  InputSelectContent,
  InputSelectItem,
  InputSelectTrigger,
  InputSelectValue,
} from '@repo/ui/input-select';
import { InputColorPicker } from '@repo/ui/input-color-picker';
import { Label } from '@repo/ui/label';
import BuilderEditCredentialsDrawer from '@/_components/builder-edit-credentials-drawer';
import useBuilder from '@/_hooks/use-builder';

const ssoProvidersMapper = {
  [SSOSocialProvider.GOOGLE]: {
    label: 'Enable Google login',
  },
};

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

  const [refreshTokenExpirationValue, refreshTokenExpirationUnit] =
    React.useMemo(() => {
      if (!environment.refreshTokenExpiration) {
        /*
        If not exists, do not fallback, it should be an error
        and for sure there is some bug in our backend
      */
        return [];
      }

      const match =
        environment.refreshTokenExpiration.match(/^(\d+)([a-z]+)$/i);

      return match?.[1] && match?.[2]
        ? [
            Number(match[1]),
            match[2] as UpdateEnvironmentAuthSettingsFormData['refreshTokenExpirationUnit'],
          ]
        : [];
    }, [environment.refreshTokenExpiration]);

  const form = useForm<UpdateEnvironmentAuthSettingsFormData>({
    resolver: zodResolver(UpdateEnvironmentAuthSettingsFormSchema),
    defaultValues: {
      authProvider: environment.authProvider || '',
      tokenExpirationValue,
      tokenExpirationUnit,
      refreshTokenExpirationValue,
      refreshTokenExpirationUnit,
      enableSignUp: environment.enableSignUp || false,
      enableSignUpB2BOnly: environment.enableSignUpB2BOnly || false,
      styles: {
        primaryColor: environment.styles?.primaryColor || '',
      },
      activeSSOProviders: environment.activeSSOProviders || [],
    },
  });
  const formData = useWatch({ control: form.control });
  const { updateEnvironmentAuthSettings } = useBuilder();
  const [isSaving, startSavingTransition] = useTransition();
  const { setPreviewEnvironmentData } = usePreviewMode();

  React.useEffect(() => {
    setPreviewEnvironmentData(formData as EnvironmentData);
  }, [formData, setPreviewEnvironmentData]);

  React.useEffect(() => {
    form.setValue('activeSSOProviders', environment.activeSSOProviders || []);
  }, [environment.activeSSOProviders]);

  function isSSOProviderActive(provider: SSOSocialProvider) {
    return form.getValues('activeSSOProviders')?.includes(provider);
  }

  function handleSSOProviderCheckedChange(
    provider: SSOSocialProvider,
    checked: boolean,
  ) {
    const activeSSOProviders = form.getValues('activeSSOProviders') || [];
    let newActiveSSOProviders = [...activeSSOProviders];

    if (checked) {
      newActiveSSOProviders = [...activeSSOProviders, provider];
    } else {
      newActiveSSOProviders = activeSSOProviders.filter((p) => p !== provider);
    }

    form.setValue('activeSSOProviders', newActiveSSOProviders, {
      shouldDirty: true,
    });
  }

  function onSubmit(payload: UpdateEnvironmentAuthSettingsFormData) {
    startSavingTransition(() => {
      updateEnvironmentAuthSettings(environment!.id, payload).then(() => {
        form.reset({
          authProvider: payload?.authProvider || '',
          tokenExpirationValue: payload?.tokenExpirationValue || 0,
          tokenExpirationUnit: payload?.tokenExpirationUnit || '',
          refreshTokenExpirationValue:
            payload?.refreshTokenExpirationValue || 0,
          refreshTokenExpirationUnit: payload?.refreshTokenExpirationUnit || '',
          enableSignUp: payload?.enableSignUp || false,
          enableSignUpB2BOnly: payload?.enableSignUpB2BOnly || false,
          styles: {
            primaryColor: payload?.styles?.primaryColor || '',
          },
          activeSSOProviders: payload?.activeSSOProviders || [],
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
            description="Customize the auth pages to match your brand and user experience."
          >
            Style
          </CardHeader>
          <CardContent className="flex-1 p-6">
            <div className="grid gap-5">
              <InputWrapper>
                <Controller
                  name="styles.primaryColor"
                  control={form.control}
                  render={({ field, formState }) => (
                    <InputColorPicker
                      label="Primary Color"
                      setValue={form.setValue}
                      name={field.name}
                      value={field.value}
                      onInputChange={field.onChange}
                      error={formState.errors.styles?.primaryColor?.message}
                    />
                  )}
                />
              </InputWrapper>
            </div>
          </CardContent>
        </div>
        <SeparatorLine className="my-0" />
        <div className="grid grid-cols-[15rem_1fr] gap-3">
          <CardHeader
            padding
            description="Choose the authentication type to use."
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

              <InputWrapper>
                <Label>Social Login Providers</Label>
                {Object.values(SSOSocialProvider).map((provider) => (
                  <div className="flex flex-col gap-1" key={provider}>
                    <div className="flex items-center justify-between">
                      <InputSwitch
                        key={provider}
                        label={ssoProvidersMapper[provider].label}
                        value={isSSOProviderActive(provider)}
                        onCheckedChange={(checked) =>
                          handleSSOProviderCheckedChange(provider, checked)
                        }
                        checked={isSSOProviderActive(provider)}
                      />
                      {isSSOProviderActive(provider) && (
                        <BuilderEditCredentialsDrawer
                          environmentId={environment.id}
                          provider={provider}
                          trigger={
                            <Button variant={'ghost'} size={'xs'} type="button">
                              Edit Credentials
                            </Button>
                          }
                        />
                      )}
                    </div>
                  </div>
                ))}
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
                      label="Enable sign ups"
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
                <Label>Refresh Token Expiration</Label>
                <div className="grid grid-cols-[6rem_1fr] gap-1">
                  <Input
                    maxLength={2}
                    {...form.register('refreshTokenExpirationValue', {
                      valueAsNumber: true,
                    })}
                  />
                  <Controller
                    name="refreshTokenExpirationUnit"
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
                {form.formState.errors.refreshTokenExpirationValue && (
                  <Typo variant={'sm'} state={'error'} className="text-sm">
                    {form.formState.errors.refreshTokenExpirationValue?.message}
                  </Typo>
                )}
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
