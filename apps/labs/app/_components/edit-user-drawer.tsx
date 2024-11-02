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
import { User } from '@/_interfaces/user';
import { Typo } from '@repo/ui/typo';
import {
  UpdateUserGeneralDataFormSchema,
  UpdateUserGeneralDataFormData,
} from '@/_validators/users-validators';
import useUser from '@/_hooks/use-user';

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

  React.useEffect(() => {
    if (props.open) {
      handleReset();
    }
  }, [props.open]);

  function onSubmit(payload: UpdateUserGeneralDataFormData) {
    startSavingTransition(async () => {
      await updateGeneralData(user.id, payload);
      props.onOpenChange?.(false);
    });
  }

  function handleReset() {
    form.clearErrors();
    form.setValue('fullName', user.fullName);
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
          <DrawerTitle className="flex gap-1.5">
            <div className="flex flex-col justify-center w-[17.625rem]">
              <Typo variant={'muted'}>Edit User</Typo>
              <div className="truncate">{formValues?.fullName || '-'}</div>
            </div>
          </DrawerTitle>
        </DrawerHeader>
        <form className="h-full" onSubmit={form.handleSubmit(onSubmit)}>
          <DrawerScrollArea>
            <DrawerContentContainer>
              <div className="grid w-full items-center gap-4">
                <InputWrapper>
                  <Input
                    label="Full Name"
                    error={form.formState.errors.fullName?.message}
                    {...form.register('fullName')}
                  />
                </InputWrapper>
              </div>
            </DrawerContentContainer>
          </DrawerScrollArea>
          <DrawerFooter>
            <Button type="submit" loading={isSaving} className="w-full">
              {isSaving ? 'Saving...' : 'Save Changes'}
            </Button>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  );
}
