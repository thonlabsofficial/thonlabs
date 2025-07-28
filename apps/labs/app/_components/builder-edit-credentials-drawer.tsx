'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@repo/ui/button';
import {
  Drawer,
  DrawerContent,
  DrawerContentContainer,
  DrawerFooter,
  DrawerHeader,
  DrawerScrollArea,
  DrawerTitle,
  DrawerTrigger,
} from '@repo/ui/drawer';
import { Input, InputWrapper } from '@repo/ui/input';
import type { SSOSocialProvider } from '@thonlabs/nextjs';
import React, { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { useCredential } from '@/_hooks/use-credential';
import {
  type UpdateProviderCredentialsFormData,
  updateProviderCredentialsFormSchema,
} from '@/_validators/builder-validators';

type Props = {
  trigger?: React.ReactNode;
  environmentId: string;
  provider: SSOSocialProvider;
};

export default function BuilderEditCredentialsDrawer({
  trigger,
  provider,
  environmentId,
  ...props
}: Props & React.ComponentProps<typeof Drawer>) {
  const [open, setOpen] = React.useState(props.open || false);
  const { credential, isLoadingCredential, upsertCredential } = useCredential(
    open ? { environmentId, provider } : undefined
  );
  const form = useForm<UpdateProviderCredentialsFormData>({
    resolver: zodResolver(updateProviderCredentialsFormSchema),
  });
  const [isSaving, startSavingTransition] = useTransition();

  React.useEffect(() => {
    if (props.open || credential) {
      handleInit();
    }
  }, [props.open, credential, handleInit]);

  async function handleSave() {
    if (!(await form.trigger())) {
      return;
    }
    startSavingTransition(async () => {
      try {
        await upsertCredential(environmentId, provider, {
          ...form.getValues(),
          active: true,
        });
        setOpen(false);
        props.onOpenChange?.(false);
      } catch {}
    });
  }

  function handleInit() {
    form.clearErrors();
    form.setValue('clientId', credential?.clientId || '');
    form.setValue('secretKey', credential?.secretKey || '');
    form.setValue('redirectURI', credential?.redirectURI || '');
  }

  return (
    <Drawer open={open} onOpenChange={setOpen} {...props}>
      {trigger && (
        <DrawerTrigger asChild onClick={handleInit}>
          {trigger}
        </DrawerTrigger>
      )}
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className='capitalize'>
            Edit {provider} Credentials
          </DrawerTitle>
        </DrawerHeader>
        <form className='h-full'>
          <DrawerScrollArea>
            <DrawerContentContainer>
              <div className='grid w-full items-center gap-4'>
                <InputWrapper>
                  <Input
                    label='Client ID'
                    maxLength={100}
                    error={form.formState.errors.clientId?.message}
                    loading={isLoadingCredential}
                    {...form.register('clientId')}
                  />
                </InputWrapper>
                <InputWrapper>
                  <Input
                    label='Secret Key'
                    maxLength={100}
                    error={form.formState.errors.secretKey?.message}
                    loading={isLoadingCredential}
                    {...form.register('secretKey')}
                  />
                </InputWrapper>
                <InputWrapper>
                  <Input
                    label='Redirect URI'
                    maxLength={900}
                    error={form.formState.errors.redirectURI?.message}
                    loading={isLoadingCredential}
                    {...form.register('redirectURI')}
                  />
                </InputWrapper>
              </div>
            </DrawerContentContainer>
          </DrawerScrollArea>
          <DrawerFooter>
            <Button
              type='button'
              loading={isSaving}
              className='w-full'
              disabled={!form.formState.isDirty || isSaving}
              onClick={handleSave}
            >
              {isSaving ? 'Saving...' : 'Save Changes'}
            </Button>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  );
}
