'use client';

import { Button } from '@repo/ui/button';
import { Input, InputWrapper } from '@repo/ui/input';
import React, { useTransition } from 'react';
import { Controller, useForm } from 'react-hook-form';
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
  DrawerClose,
} from '@repo/ui/drawer';
import { User } from '@/_interfaces/user';
import { Typo } from '@repo/ui/typo';
import {
  UpdateUserGeneralDataFormSchema,
  UpdateUserGeneralDataFormData,
} from '@/_validators/users-validators';
import useUser from '@/_hooks/use-user';
import {
  InputSelectContent,
  InputSelectItem,
  InputSelectTrigger,
  InputSelectValue,
} from '@repo/ui/input-select';
import { useEnvironmentAppData } from '@/_hooks/use-environment-app-data';
import { InputSelect } from '@repo/ui/input-select';
import { Badge } from '@repo/ui/badge';
import { useOrganizations } from '@/_hooks/use-organizations';
import { useMetadataModels } from '@/_hooks/use-metadata-models';
import MetadataValueForm from './metadata-value-form';

type Props = {
  trigger?: React.ReactNode;
  user: User;
};

export default function EditUserDrawer({
  trigger,
  user,
  ...props
}: Props & React.ComponentProps<typeof Drawer>) {
  const { metadataModels } = useMetadataModels('User');
  const form = useForm<UpdateUserGeneralDataFormData>({
    resolver: zodResolver(UpdateUserGeneralDataFormSchema(metadataModels)),
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
  }, [props.open]);

  function onSubmit(payload: UpdateUserGeneralDataFormData) {
    startSavingTransition(async () => {
      try {
        await updateGeneralData(user.id, payload);
        props.onOpenChange?.(false);
      } catch {}
    });
  }

  function handleReset() {
    form.reset();
    form.clearErrors();
    form.setValue('fullName', user.fullName);
    form.setValue('organizationId', user.organization?.id || '');

    // Reset metadata values if they exist
    if (user.metadata) {
      Object.keys(user.metadata).forEach((key) => {
        let value = user.metadata![key];
        if (value !== null && typeof value === 'object') {
          value = JSON.stringify(value);
        }
        form.setValue(`metadata.${key}` as any, value);
      });
    }
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
              <div className="grid w-full items-center gap-6">
                <section>
                  <header className="flex flex-col gap-0.5 mb-2">
                    <Typo variant="lg" className="flex items-center gap-1">
                      General
                    </Typo>
                  </header>
                  <div className="space-y-3">
                    <InputWrapper>
                      <Input
                        label="Full Name"
                        error={form.formState.errors.fullName?.message}
                        {...form.register('fullName')}
                      />
                    </InputWrapper>

                    <InputWrapper>
                      <Input
                        label="Email"
                        value={user?.email}
                        readOnly
                        withCopy
                      />
                    </InputWrapper>
                    {organizations.length > 0 &&
                      !envData?.enableSignUpB2BOnly && (
                        <InputWrapper className="z-60">
                          <Controller
                            name="organizationId"
                            control={form.control}
                            render={({ field }) => (
                              <InputSelect
                                onValueChange={field.onChange}
                                {...field}
                              >
                                <InputSelectTrigger
                                  label={
                                    <>
                                      User's organization{' '}
                                      <Badge
                                        variant="info"
                                        size={'sm'}
                                        className="!text-text"
                                      >
                                        Optional
                                      </Badge>
                                    </>
                                  }
                                  error={
                                    form.formState.errors.organizationId
                                      ?.message
                                  }
                                  onClear={() => {
                                    field.onChange('');
                                  }}
                                  value={field.value}
                                  loading={isLoadingOrganizations}
                                >
                                  <InputSelectValue placeholder="Select an option" />
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
                                        <Badge
                                          variant="destructive"
                                          size={'xs'}
                                        >
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
                </section>
                <section>
                  <header className="flex flex-col gap-0.5 mb-2">
                    <Typo variant="lg" className="flex items-center gap-1">
                      Metadata
                    </Typo>
                  </header>
                  <MetadataValueForm
                    form={form}
                    metadataModels={metadataModels}
                    context="users"
                  />
                </section>
              </div>
            </DrawerContentContainer>
          </DrawerScrollArea>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button
                type="button"
                variant="ghost"
                size="md"
                disabled={isSaving}
              >
                Back
              </Button>
            </DrawerClose>
            <Button
              type="submit"
              size="md"
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
