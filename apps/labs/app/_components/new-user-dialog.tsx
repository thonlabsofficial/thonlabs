'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Badge } from '@repo/ui/badge';
import { Button } from '@repo/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@repo/ui/dialog';
import { Input, InputWrapper } from '@repo/ui/input';
import {
  InputSelect,
  InputSelectContent,
  InputSelectItem,
  InputSelectTrigger,
  InputSelectValue,
} from '@repo/ui/input-select';
import { InputSwitch } from '@repo/ui/input-switch';
import Utils from '@repo/utils';
import React, { useTransition } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useEnvironmentAppData } from '@/_hooks/use-environment-app-data';
import { useOrganizations } from '@/_hooks/use-organizations';
import useUser from '@/_hooks/use-user';
import type { Organization } from '@/_interfaces/organization';
import {
  type NewUserFormData,
  NewUserFormSchema,
} from '@/_validators/users-validators';

type Props = {
  trigger: React.ReactNode;
  organization?: Organization;
};

export default function NewUserDialog({
  trigger,
  organization,
}: Props & React.ComponentProps<typeof Dialog>) {
  const [open, setOpen] = React.useState(false);
  const [isCreatingUser, startTransitionCreatingUser] = useTransition();
  const { createUser } = useUser();
  const { organizations } = useOrganizations();
  const envData = useEnvironmentAppData();
  const form = useForm<NewUserFormData>({
    defaultValues: {
      sendInvite: true,
    },
    resolver: zodResolver(
      NewUserFormSchema({
        envData,
        domains: organizations.flatMap(({ domains }) => domains),
      })
    ),
  });

  React.useEffect(() => {
    if (open) {
      handleReset();
    }
  }, [open, handleReset]);

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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild onClick={handleReset}>
        {trigger}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New User</DialogTitle>
          <DialogDescription>
            Complete the information below to create a new user.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='grid w-full items-center gap-4'>
            <InputWrapper>
              <Input
                label='Full Name'
                maxLength={30}
                error={form.formState.errors.fullName?.message}
                {...form.register('fullName')}
              />
            </InputWrapper>
            <InputWrapper>
              <Input
                label='Email'
                error={form.formState.errors.email?.message}
                {...form.register('email')}
              />
            </InputWrapper>
            {organizations.length > 0 &&
              !organization &&
              !envData?.enableSignUpB2BOnly && (
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
                          error={form.formState.errors.organizationId?.message}
                          onClear={() => field.onChange('')}
                          value={field.value}
                        >
                          <InputSelectValue placeholder='Select an option' />
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
            <InputWrapper>
              <Controller
                name='sendInvite'
                control={form.control}
                render={({ field }) => (
                  <InputSwitch
                    label='Send Invite'
                    description={`Send${fullName ? ` ${Utils.getFirstName(fullName).trim()}` : ''} a notification to join the platform and confirm email.`}
                    value={field.value}
                    onCheckedChange={field.onChange}
                    checked={!!field.value}
                  />
                )}
              />
            </InputWrapper>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type='button' variant='ghost' disabled={isCreatingUser}>
                Cancel
              </Button>
            </DialogClose>
            <Button type='submit' loading={isCreatingUser}>
              {isCreatingUser ? 'Creating...' : 'Create User'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
