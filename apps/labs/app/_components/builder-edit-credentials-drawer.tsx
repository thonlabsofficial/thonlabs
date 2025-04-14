'use client';

import { Button } from '@repo/ui/button';
import { Input, InputWrapper } from '@repo/ui/input';
import React, { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerScrollArea,
  DrawerContentContainer,
} from '@repo/ui/drawer';
import { Typo } from '@repo/ui/typo';
import { SSOSocialProvider } from '@thonlabs/nextjs';
import {
  UpdateProviderCredentialsFormData,
  updateProviderCredentialsFormSchema,
} from '@/_validators/builder-validators';
import { useCredential } from '@/_hooks/use-credential';

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
  const {
    credential,
    isLoadingCredential,
    upsertCredential,
    updateCredentialStatus,
    deleteCredential,
  } = useCredential({
    environmentId,
    provider,
  });
  const form = useForm<UpdateProviderCredentialsFormData>({
    resolver: zodResolver(updateProviderCredentialsFormSchema),
  });
  const [isSaving, startSavingTransition] = useTransition();

  React.useEffect(() => {
    if (props.open) {
      handleReset();
    }
  }, [props.open]);

  async function handleSave() {
    if (!(await form.trigger())) {
      return;
    }
    startSavingTransition(async () => {
      try {
        await upsertCredential(environmentId, provider, form.getValues());
        setOpen(false);
        props.onOpenChange?.(false);
      } catch {}
    });
  }

  function handleReset() {
    form.clearErrors();
    form.setValue('clientId', credential?.clientId || '');
    form.setValue('secretKey', credential?.secretKey || '');
    form.setValue('redirectURI', credential?.redirectURI || '');
  }

  return (
    <Drawer open={open} onOpenChange={setOpen} {...props}>
      {trigger && (
        <DrawerTrigger asChild onClick={handleReset}>
          {trigger}
        </DrawerTrigger>
      )}
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="capitalize">
            Edit {provider} Credentials
          </DrawerTitle>
        </DrawerHeader>
        <form className="h-full">
          <DrawerScrollArea>
            <DrawerContentContainer>
              <div className="grid w-full items-center gap-4">
                <InputWrapper>
                  <Input
                    label="Client ID"
                    maxLength={100}
                    error={form.formState.errors.clientId?.message}
                    loading={isLoadingCredential}
                    {...form.register('clientId')}
                  />
                </InputWrapper>
                <InputWrapper>
                  <Input
                    label="Secret Key"
                    maxLength={100}
                    error={form.formState.errors.secretKey?.message}
                    loading={isLoadingCredential}
                    {...form.register('secretKey')}
                  />
                </InputWrapper>
                <InputWrapper>
                  <Input
                    label="Redirect URI"
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
              type="button"
              loading={isSaving}
              className="w-full"
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
