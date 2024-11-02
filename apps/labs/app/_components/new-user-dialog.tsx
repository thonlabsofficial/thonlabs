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
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@repo/ui/dialog';
import { InputSwitch } from '@repo/ui/input-switch';
import useUser from '@/_hooks/use-user';
import Utils from '@repo/utils';

type Props = {
  trigger: React.ReactNode;
};

export default function NewUserDialog({
  trigger,
}: Props & React.ComponentProps<typeof Dialog>) {
  const [open, setOpen] = React.useState(false);
  const form = useForm<NewUserFormData>({
    defaultValues: {
      sendInvite: true,
    },
    resolver: zodResolver(NewUserFormSchema),
  });
  const fullName = form.watch('fullName');
  const [isCreatingUser, startTransitionCreatingUser] = useTransition();
  const { createUser } = useUser();

  function onSubmit(payload: NewUserFormData) {
    startTransitionCreatingUser(async () => {
      const user = await createUser(payload);

      if (user) {
        setOpen(false);
      }
    });
  }

  function handleReset() {
    form.clearErrors();
    form.reset();
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
          <div className="grid w-full items-center gap-4">
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
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="ghost" disabled={isCreatingUser}>
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" loading={isCreatingUser}>
              {isCreatingUser ? 'Creating...' : 'Create User'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
