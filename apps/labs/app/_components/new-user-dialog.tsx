'use client';

import { Button } from '@repo/ui/button';
import { Input, InputWrapper } from '@repo/ui/input';
import React, { useTransition } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  NewUserFormData,
  NewUserFormSchema,
} from '@/_validators/users-validators';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerContentContainer,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerScrollArea,
  DrawerTitle,
  DrawerTrigger,
} from '@repo/ui/drawer';
import { InputSwitch } from '@repo/ui/input-switch';
import useUser from '@/_hooks/use-user';
import Utils from '@repo/utils';
import { useOrganizations } from '@/_hooks/use-organizations';
import { useEnvironmentAppData } from '@/_hooks/use-environment-app-data';
import {
  InputSelect,
  InputSelectContent,
  InputSelectItem,
  InputSelectTrigger,
  InputSelectValue,
} from '@repo/ui/input-select';
import { Badge } from '@repo/ui/badge';
import { Organization } from '@/_interfaces/organization';
import { Typo } from '@repo/ui/typo';
import { useMetadataModels } from '@/_hooks/use-metadata-models';
import MetadataValueForm from './metadata-value-form';

type Props = {
  trigger: React.ReactNode;
  organization?: Organization;
};

export default function NewUserDrawer({
  trigger,
  organization,
}: Props & React.ComponentProps<typeof Drawer>) {
  const [open, setOpen] = React.useState(false);
  const [isCreatingUser, startTransitionCreatingUser] = useTransition();
  const { createUser } = useUser();
  const { organizations } = useOrganizations();
  const envData = useEnvironmentAppData();
  const { metadataModels } = useMetadataModels('User');
  const form = useForm<NewUserFormData>({
    defaultValues: {
      sendInvite: true,
    },
    resolver: zodResolver(
      NewUserFormSchema({
        envData,
        domains: organizations.map(({ domains }) => domains).flat(),
        metadataModels,
      }),
    ),
  });

  React.useEffect(() => {
    if (open) {
      handleReset();
    }
  }, [open]);

  const fullName = form.watch('fullName');

  function onSubmit(payload: NewUserFormData) {
    startTransitionCreatingUser(async () => {
      try {
        const user = await createUser(payload);

        if (user) {
          setOpen(false);
        }
      } catch {}
    });
  }

  function handleReset() {
    form.clearErrors();
    form.reset();

    if (organization) {
      form.setValue('organizationId', organization.id);
    }
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild onClick={handleReset}>
        {trigger}
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Create User</DrawerTitle>
          <DrawerDescription>
            Complete the information below to create a new user.
          </DrawerDescription>
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
                        maxLength={30}
                        error={form.formState.errors.fullName?.message}
                        {...form.register('fullName')}
                      />
                    </InputWrapper>
                    <InputWrapper>
                      <Input
                        label="Email"
                        error={form.formState.errors.email?.message}
                        {...form.register('email')}
                      />
                    </InputWrapper>
                    {organizations.length > 0 &&
                      !organization &&
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
                                  onClear={() => field.onChange('')}
                                  value={field.value}
                                >
                                  <InputSelectValue />
                                </InputSelectTrigger>
                                <InputSelectContent>
                                  {organizations.map(({ id, name }) => (
                                    <InputSelectItem key={id} value={id}>
                                      {name}
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
                <section>
                  <header className="flex flex-col gap-0.5 mb-2">
                    <Typo variant="lg" className="flex items-center gap-1">
                      Advanced
                    </Typo>
                  </header>
                  <div className="space-y-3">
                    <InputWrapper>
                      <Controller
                        name="sendInvite"
                        control={form.control}
                        render={({ field }) => (
                          <InputSwitch
                            label="Send Invite"
                            description={`Send${fullName ? ` ${Utils.getFirstName(fullName).trim()}` : ''} a notification to join the platform and confirm email.`}
                            value={field.value}
                            onCheckedChange={field.onChange}
                            checked={!!field.value}
                          />
                        )}
                      />
                    </InputWrapper>
                  </div>
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
                disabled={isCreatingUser}
              >
                Back
              </Button>
            </DrawerClose>
            <Button type="submit" size="md" loading={isCreatingUser}>
              {isCreatingUser ? 'Creating...' : 'Create User'}
            </Button>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  );
}
