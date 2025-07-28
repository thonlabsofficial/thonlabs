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
import { InputSwitch } from '@repo/ui/input-switch';
import React, { useTransition } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useEmailProvider } from '@/_hooks/use-email-provider';
import type { EmailProviderTypes } from '@/_interfaces/email-provider';
import {
  type UpdateEmailProviderCredentialPayload,
  updateEmailProviderCredentialValidator,
} from '@/_validators/email-providers-validators';

type Props = {
  trigger?: React.ReactNode;
  provider: EmailProviderTypes;
};

export default function BuilderEditCredentialsDrawer({
  trigger,
  provider,
  ...props
}: Props & React.ComponentProps<typeof Drawer>) {
  const [open, setOpen] = React.useState(props.open || false);
  const { emailProvider, isLoadingEmailProvider, updateEmailProvider } =
    useEmailProvider(open ? { provider } : undefined);
  const form = useForm<UpdateEmailProviderCredentialPayload>({
    resolver: zodResolver(updateEmailProviderCredentialValidator),
  });
  const [isSaving, startSavingTransition] = useTransition();

  React.useEffect(() => {
    if (props.open || emailProvider) {
      handleInit();
    }
  }, [props.open, emailProvider, handleInit]);

  async function handleSave(payload: UpdateEmailProviderCredentialPayload) {
    startSavingTransition(async () => {
      await updateEmailProvider(provider, payload);
      setOpen(false);
      props.onOpenChange?.(false);
    });
  }

  function handleInit() {
    form.clearErrors();
    form.setValue('domain', emailProvider?.domain || '');
    form.setValue('secretKey', emailProvider?.secretKey || '');
    form.setValue('active', emailProvider?.active || false);
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
        <form className='h-full' onSubmit={form.handleSubmit(handleSave)}>
          <DrawerScrollArea>
            <DrawerContentContainer>
              <div className='grid w-full items-center gap-4'>
                <InputWrapper>
                  <Input
                    label='Domain'
                    maxLength={255}
                    error={form.formState.errors.domain?.message}
                    loading={isLoadingEmailProvider}
                    {...form.register('domain')}
                  />
                </InputWrapper>
                <InputWrapper>
                  <Input
                    label='Secret Key'
                    maxLength={255}
                    error={form.formState.errors.secretKey?.message}
                    loading={isLoadingEmailProvider}
                    {...form.register('secretKey')}
                  />
                </InputWrapper>
                <InputWrapper>
                  <Controller
                    name='active'
                    control={form.control}
                    render={({ field }) => (
                      <InputSwitch
                        label='Set as active provider'
                        description='When set to true, all other providers will be marked as inactive.'
                        value={field.value}
                        checked={!!field.value}
                        onCheckedChange={field.onChange}
                        loading={isLoadingEmailProvider}
                      />
                    )}
                  />
                </InputWrapper>
              </div>
            </DrawerContentContainer>
          </DrawerScrollArea>
          <DrawerFooter>
            <Button
              type='submit'
              loading={isSaving}
              skeleton={isLoadingEmailProvider}
              className='w-full'
              disabled={!form.formState.isDirty || isSaving}
            >
              {isSaving ? 'Saving...' : 'Save Changes'}
            </Button>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  );
}
