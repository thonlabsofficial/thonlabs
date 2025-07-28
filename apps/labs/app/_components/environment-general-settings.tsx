'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@repo/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@repo/ui/card';
import { ImagePreview } from '@repo/ui/image-preview';
import { Input, InputWrapper } from '@repo/ui/input';
import { InputSingleFile } from '@repo/ui/input-single-file';
import { Label } from '@repo/ui/label';
import { Typo } from '@repo/ui/typo';
import { useParams } from 'next/navigation';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import useEnvironment from '@/_hooks/use-environment';
import { useEnvironmentAppData } from '@/_hooks/use-environment-app-data';
import {
  type UpdateEnvironmentGeneralSettingsFormData,
  UpdateEnvironmentGeneralSettingsFormSchema,
} from '@/_validators/environments-validators';

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
          logo: undefined,
        });
      },
    }
  );
  const { environmentLogo } = useEnvironmentAppData();
  const [isSaving, startSavingTransition] = useTransition();
  const [showLogoInput, setShowLogoInput] = useState(false);

  const logo = form.watch('logo');
  const logoPreview = logo?.[0] ? URL.createObjectURL(logo[0]) : '';

  function onSubmit(payload: UpdateEnvironmentGeneralSettingsFormData) {
    startSavingTransition(async () => {
      await updateEnvironmentGeneralSettings(environment?.id, payload).then(
        () => {
          form.reset({
            name: payload?.name || '',
            appURL: payload?.appURL || '',
            logo: undefined,
          });
          setShowLogoInput(false);
        }
      );
    });
  }

  return (
    <Card>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className='grid grid-cols-[19rem_1fr] gap-40'>
          <CardHeader padding>General Settings</CardHeader>
          <CardContent className='flex-1 p-6'>
            <div className='grid gap-5'>
              <InputWrapper>
                <Input
                  id='name'
                  placeholder='id...'
                  label='Environment ID'
                  readOnly
                  loading={isLoadingEnvironment}
                  value={environment?.id}
                  withCopy
                />
              </InputWrapper>
              <InputWrapper>
                <Input
                  id='name'
                  placeholder='e.g.: Staging'
                  label='Name'
                  maxLength={25}
                  loading={isLoadingEnvironment}
                  error={form.formState.errors.name?.message}
                  {...form.register('name')}
                />
              </InputWrapper>

              <InputWrapper>
                <Input
                  id='appURL'
                  placeholder='e.g.: https://staging.thonlabs.io'
                  label='Application URL'
                  loading={isLoadingEnvironment}
                  error={form.formState.errors.appURL?.message}
                  {...form.register('appURL')}
                />
              </InputWrapper>

              <div>
                <header className='flex justify-between'>
                  <Label>Your company logo</Label>
                  <Typo
                    variant={'sm'}
                    onClick={() => {
                      setShowLogoInput(!showLogoInput);
                      form.setValue('logo', undefined);
                    }}
                    className='cursor-pointer text-muted-foreground hover:underline'
                  >
                    {showLogoInput ? 'Cancel' : 'Change logo'}
                  </Typo>
                </header>
                {!environmentLogo || showLogoInput ? (
                  <InputSingleFile
                    form={form}
                    allowedExtensions={['png', 'jpg', 'jpeg', 'webp', 'svg']}
                    maxFileSizeInMB={50}
                    replaceBy={<ImagePreview src={logoPreview} />}
                    {...form.register('logo')}
                  />
                ) : (
                  <ImagePreview
                    src={`${process.env.NEXT_PUBLIC_TL_EXT_FILES}/environments/${environmentId}/images/${environmentLogo}`}
                    className='max-h-40'
                  />
                )}
              </div>
            </div>
          </CardContent>
        </div>
        <CardFooter className='flex justify-end gap-2'>
          <Button
            type='button'
            size={'sm'}
            variant={'ghost'}
            disabled={!form.formState.isDirty || isSaving}
            onClick={() => form.reset()}
          >
            Cancel
          </Button>
          <Button
            type='submit'
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
