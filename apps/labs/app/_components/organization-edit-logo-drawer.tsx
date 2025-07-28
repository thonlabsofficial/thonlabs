'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Alert, AlertDescription } from '@repo/ui/alert';
import { Button } from '@repo/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerContentContainer,
  DrawerFooter,
  DrawerHeader,
  DrawerScrollArea,
  DrawerTitle,
  DrawerTrigger,
} from '@repo/ui/drawer';
import { ImagePreview } from '@repo/ui/image-preview';
import { InputWrapper } from '@repo/ui/input';
import { InputSingleFile } from '@repo/ui/input-single-file';
import { Typo } from '@repo/ui/typo';
import React, { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import useOrganization from '@/_hooks/use-organization';
import type { Organization } from '@/_interfaces/organization';
import {
  type UpdateLogoOrganizationFormData,
  updateLogoOrganizationFormSchema,
} from '@/_validators/organizations-validators';

type Props = {
  trigger?: React.ReactNode;
  organization: Organization;
};

export default function OrganizationEditLogoDrawer({
  trigger,
  organization,
  ...props
}: Props & React.ComponentProps<typeof Drawer>) {
  const [open, setOpen] = React.useState(props.open || false);
  const form = useForm<UpdateLogoOrganizationFormData>({
    resolver: zodResolver(updateLogoOrganizationFormSchema),
  });
  const [isSaving, startTransitionSaving] = useTransition();
  const { updateOrganizationLogo } = useOrganization();
  const logo = form.watch('logo');
  const logoPreview = logo?.[0] ? URL.createObjectURL(logo[0]) : '';

  React.useEffect(() => {
    if (props.open) {
      handleReset();
    }
  }, [props.open, handleReset]);

  function onSubmit(payload: UpdateLogoOrganizationFormData) {
    startTransitionSaving(async () => {
      try {
        await updateOrganizationLogo(organization.id, payload);
        setOpen(false);
        props.onOpenChange?.(false);
      } catch {}
    });
  }

  function handleReset() {
    form.clearErrors();
    form.reset({
      logo: undefined,
    });
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
          <DrawerTitle>Change Organization Logo</DrawerTitle>
        </DrawerHeader>
        <form className='h-full' onSubmit={form.handleSubmit(onSubmit)}>
          <DrawerScrollArea>
            <DrawerContentContainer>
              <div className='grid w-full items-center gap-4'>
                <section>
                  <header className='mb-2 flex flex-col gap-0.5'>
                    <Typo variant='lg' className='flex items-center gap-1'>
                      Logo
                    </Typo>
                    <Typo variant='muted'>
                      Used in email templates and consumed from our APIs.
                      Recommended size is 1024px of width.
                    </Typo>
                    {!logo && (
                      <Alert variant='info' size={'sm'} className='mt-2'>
                        <AlertDescription>
                          Max size: 50MB - Allowed files: PNG, JPG, JPEG, WEBP
                          or SVG
                        </AlertDescription>
                      </Alert>
                    )}
                  </header>

                  <InputWrapper>
                    <InputSingleFile
                      form={form}
                      allowedExtensions={['png', 'jpg', 'jpeg', 'webp', 'svg']}
                      maxFileSizeInMB={50}
                      replaceBy={<ImagePreview src={logoPreview} />}
                      {...form.register('logo')}
                    />
                  </InputWrapper>
                </section>
              </div>
            </DrawerContentContainer>
          </DrawerScrollArea>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button type='button' variant='ghost' disabled={isSaving}>
                Cancel
              </Button>
            </DrawerClose>
            <Button
              type='submit'
              loading={isSaving}
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
