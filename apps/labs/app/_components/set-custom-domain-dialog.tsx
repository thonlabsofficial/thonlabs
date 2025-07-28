'use client';

import { zodResolver } from '@hookform/resolvers/zod';
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
import React, { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import useEnvironment from '@/_hooks/use-environment';
import type { EnvironmentDetail } from '@/_interfaces/environment';
import {
  type SetCustomDomainFormData,
  SetCustomDomainFormSchema,
} from '@/_validators/environments-validators';

type Props = {
  trigger: React.ReactNode;
  environment: EnvironmentDetail;
};

export default function SetCustomDomainDialog({
  trigger,
  environment,
}: Props & React.ComponentProps<typeof Dialog>) {
  const form = useForm<SetCustomDomainFormData>({
    resolver: zodResolver(SetCustomDomainFormSchema),
  });
  const [isSaving, startSavingTransition] = useTransition();
  const { setCustomDomain } = useEnvironment();
  const [isOpen, setIsOpen] = React.useState(false);

  function onSubmit(payload: SetCustomDomainFormData) {
    startSavingTransition(async () => {
      try {
        await setCustomDomain(environment.id, payload.customDomain);
        setIsOpen(false);
      } catch {}
    });
  }

  function handleReset() {
    form.clearErrors();
    form.reset();
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild onClick={handleReset}>
        {trigger}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Custom Domain</DialogTitle>
          <DialogDescription>
            Defining a custom domain makes your app accessible through that
            domain instead of the ThonLabs domain provided.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='grid w-full items-center gap-3'>
            <InputWrapper>
              <Input
                label='Enter you custom domain'
                placeholder='e.g.: auth.thonlabs.io'
                error={form.formState.errors.customDomain?.message}
                {...form.register('customDomain')}
              />
            </InputWrapper>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type='button' variant='ghost' disabled={isSaving}>
                Cancel
              </Button>
            </DialogClose>
            <Button loading={isSaving}>
              {isSaving ? 'Setting...' : 'Set Custom Domain'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
