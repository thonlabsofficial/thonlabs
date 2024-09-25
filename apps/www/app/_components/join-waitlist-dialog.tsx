'use client';

import { Button } from '@repo/ui/button';
import { Input, InputWrapper } from '@repo/ui/input';
import React, { useTransition } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@repo/ui/dialog';
import {
  JoinWaitlistFormData,
  joinWaitlistFormSchema,
} from '@/_validators/general-validators';
import {
  InputSelect,
  InputSelectTrigger,
  InputSelectValue,
  InputSelectContent,
  InputSelectItem,
} from '@repo/ui/input-select';
import { competitorsAuthProvidersMapper } from '@/_constants/competitors-auth-providers';

interface Props extends React.ComponentProps<typeof Dialog> {
  trigger?: React.ReactNode;
}

export default function JoinWaitlistDialog({ trigger, ...props }: Props) {
  const form = useForm<JoinWaitlistFormData>({
    resolver: zodResolver(joinWaitlistFormSchema),
  });
  const [isSaving, startSavingTransition] = useTransition();

  function onSubmit(payload: JoinWaitlistFormData) {
    startSavingTransition(async () => {
      console.log(payload);
    });
  }

  function handleReset() {
    form.clearErrors();
    form.reset();
  }

  React.useEffect(() => {
    if (props.open) {
      handleReset();
    }
  }, [props.open]);

  return (
    <Dialog {...props}>
      {trigger && (
        <DialogTrigger asChild onClick={handleReset}>
          {trigger}
        </DialogTrigger>
      )}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Join Waitlist</DialogTitle>
          <DialogDescription>
            Join our waitlist to get updates and early access to the platform
            when it's ready.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid w-full items-center gap-4">
            <InputWrapper>
              <Input
                id="name"
                label="Name"
                maxLength={25}
                error={form.formState.errors.fullName?.message}
                {...form.register('fullName')}
              />
            </InputWrapper>
            <InputWrapper>
              <Input
                id="email"
                label="Email"
                placeholder="your@email.com"
                error={form.formState.errors.email?.message}
                {...form.register('email')}
              />
            </InputWrapper>
            <InputWrapper className="z-60">
              <Controller
                name="currentProvider"
                control={form.control}
                render={({ field }) => (
                  <InputSelect onValueChange={field.onChange} {...field}>
                    <InputSelectTrigger
                      label="Current authentication provider"
                      error={form.formState.errors.currentProvider?.message}
                    >
                      <InputSelectValue placeholder="Select an option" />
                    </InputSelectTrigger>
                    <InputSelectContent>
                      {Object.entries(competitorsAuthProvidersMapper).map(
                        ([key, value]) => (
                          <InputSelectItem key={key} value={key}>
                            {value.label}
                          </InputSelectItem>
                        ),
                      )}
                    </InputSelectContent>
                  </InputSelect>
                )}
              />
            </InputWrapper>
          </div>
          <DialogFooter>
            <Button type="submit" loading={isSaving}>
              {isSaving ? 'Joining...' : 'Join Waitlist'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
