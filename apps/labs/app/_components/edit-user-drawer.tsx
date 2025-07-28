'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Badge } from '@repo/ui/badge';
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
import {
  InputSelect,
  InputSelectContent,
  InputSelectItem,
  InputSelectTrigger,
  InputSelectValue,
} from '@repo/ui/input-select';
import { Typo } from '@repo/ui/typo';
import React, { useTransition } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useEnvironmentAppData } from '@/_hooks/use-environment-app-data';
import { useOrganizations } from '@/_hooks/use-organizations';
import useUser from '@/_hooks/use-user';
import type { User } from '@/_interfaces/user';
import {
  type UpdateUserGeneralDataFormData,
  UpdateUserGeneralDataFormSchema,
} from '@/_validators/users-validators';

type Props = {
  trigger?: React.ReactNode;
  user: User;
};

export default function EditUserDrawer({
  trigger,
  user,
  ...props
}: Props & React.ComponentProps<typeof Drawer>) {
  const form = useForm<UpdateUserGeneralDataFormData>({
    resolver: zodResolver(UpdateUserGeneralDataFormSchema),
  });
  const [isSaving, startSavingTransition] = useTransition();
  const { updateGeneralData } = useUser();
  const formValues = form.getValues();
  const envData = useEnvironmentAppData();
  const { organizations, isLoadingOrganizations } = useOrganizations();

  React.useEffect(() => {
    if (props.open) {
      handleReset();
    }
  }, [props.open, handleReset]);

  function onSubmit(payload: UpdateUserGeneralDataFormData) {
    startSavingTransition(async () => {
      try {
        await updateGeneralData(user.id, payload);
        props.onOpenChange?.(false);
      } catch {}
    });
  }

  function handleReset() {
    form.clearErrors();
    form.setValue('fullName', user.fullName);
    form.setValue('organizationId', user.organization?.id || '');
  }

  return (
    <Drawer {...props}>
      {trigger && (
        <DrawerTrigger asChild onClick={handleReset}>
          {trigger}
        </DrawerTrigger>
      )}
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className='flex gap-1.5'>
            <div className='flex w-[17.625rem] flex-col justify-center'>
              <Typo variant={'muted'}>Edit User</Typo>
              <div className='truncate'>{formValues?.fullName || '-'}</div>
            </div>
          </DrawerTitle>
        </DrawerHeader>
        <form className='h-full' onSubmit={form.handleSubmit(onSubmit)}>
          <DrawerScrollArea>
            <DrawerContentContainer>
              <div className='grid w-full items-center gap-4'>
                <InputWrapper>
                  <Input
                    label='Full Name'
                    error={form.formState.errors.fullName?.message}
                    {...form.register('fullName')}
                  />
                </InputWrapper>
                {!envData?.enableSignUpB2BOnly && (
                  <InputWrapper className='z-60'>
                    <Controller
                      name='organizationId'
                      control={form.control}
                      render={({ field }) => (
                        <InputSelect onValueChange={field.onChange} {...field}>
                          <InputSelectTrigger
                            label={
                              <>
                                Organization{' '}
                                <Badge
                                  variant='info'
                                  size={'sm'}
                                  className='!text-text'
                                >
                                  Optional
                                </Badge>
                              </>
                            }
                            error={
                              form.formState.errors.organizationId?.message
                            }
                            onClear={() => field.onChange('')}
                            value={field.value}
                            loading={isLoadingOrganizations}
                          >
                            <InputSelectValue placeholder='Select an option' />
                          </InputSelectTrigger>
                          <InputSelectContent>
                            {organizations.map(({ id, name, active }) => (
                              <InputSelectItem
                                key={id}
                                value={id}
                                disabled={!active}
                              >
                                {name}{' '}
                                {!active && (
                                  <Badge variant='destructive' size={'xs'}>
                                    Inactive
                                  </Badge>
                                )}
                              </InputSelectItem>
                            ))}
                          </InputSelectContent>
                        </InputSelect>
                      )}
                    />
                  </InputWrapper>
                )}
              </div>
            </DrawerContentContainer>
          </DrawerScrollArea>
          <DrawerFooter>
            <Button
              type='submit'
              loading={isSaving}
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
