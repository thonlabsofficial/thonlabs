'use client';

import { Button } from '@repo/ui/button';
import { Input, InputWrapper } from '@repo/ui/input';
import React, { useTransition } from 'react';
import { useForm } from 'react-hook-form';
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
import { EnvironmentDetail } from '@/_interfaces/environment';
import { SetCustomDomainFormData } from '@/_validators/environments-validators';
import useEmailDomain from '@/_hooks/use-email-domain';
import {
  ChangeEmailDomainFormData,
  changeEmailDomainFormSchema,
} from '@/_validators/emails-validators';

type Props = {
  trigger: React.ReactNode;
  environment: EnvironmentDetail;
};

export default function EmailDomainChangeDialog({
  trigger,
  environment,
}: Props & React.ComponentProps<typeof Dialog>) {
  const form = useForm<ChangeEmailDomainFormData>({
    resolver: zodResolver(changeEmailDomainFormSchema),
  });
  const [isSaving, startSavingTransition] = useTransition();
  const { changeEmailDomain } = useEmailDomain();
  const [isOpen, setIsOpen] = React.useState(false);

  function onSubmit(payload: ChangeEmailDomainFormData) {
    startSavingTransition(async () => {
      try {
        await changeEmailDomain(environment.id, payload.domain);
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
          <DialogTitle>Email Domain</DialogTitle>
          <DialogDescription>
            Defining a email domain makes possible to send the template emails
            from that domain.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid w-full items-center gap-3">
            <InputWrapper>
              <Input
                label="Enter you email domain"
                placeholder="e.g.: email.thonlabs.io"
                error={form.formState.errors.domain?.message}
                {...form.register('domain')}
              />
            </InputWrapper>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="ghost" disabled={isSaving}>
                Cancel
              </Button>
            </DialogClose>
            <Button loading={isSaving}>
              {isSaving ? 'Changing...' : 'Change Email Domain'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
