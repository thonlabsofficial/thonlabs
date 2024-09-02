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
import { EnvironmentDetail } from '@/(labs)/_interfaces/environment';
import {
  DeleteEnvironmentFormData,
  DeleteEnvironmentFormSchema,
} from '@/(labs)/_validators/environments-validators';
import useEnvironment from '@/(labs)/_hooks/use-environment';
import { useRouter } from 'next/navigation';

type Props = {
  trigger: React.ReactNode;
  environment: EnvironmentDetail;
};

export default function DeleteEnvironmentDialog({
  trigger,
  environment,
}: Props & React.HTMLAttributes<HTMLElement>) {
  const form = useForm<DeleteEnvironmentFormData>({
    resolver: zodResolver(DeleteEnvironmentFormSchema),
  });
  const [isDeleting, startDeletingTransition] = useTransition();
  const name = form.watch('name');
  const { deleteEnvironment } = useEnvironment();
  const router = useRouter();

  function handleDelete() {
    startDeletingTransition(async () => {
      try {
        await deleteEnvironment(environment);
        router.push('/projects');
      } catch {}
    });
  }

  function handleReset() {
    form.clearErrors();
    form.reset();
  }

  return (
    <Dialog>
      <DialogTrigger asChild onClick={handleReset}>
        {trigger}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Environment</DialogTitle>
          <DialogDescription>
            Deleting this environment will permanently erase all users, and
            stored data. <strong>This action is irreversible</strong>. Please be
            absolutely certain before proceeding.
          </DialogDescription>
        </DialogHeader>
        <div className="grid w-full items-center gap-3">
          <InputWrapper>
            <Input
              id="name"
              size="lg"
              label={`To confirm, type "${environment?.name}" in the field below`}
              maxLength={30}
              error={form.formState.errors.name?.message}
              {...form.register('name')}
            />
          </InputWrapper>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="ghost" disabled={isDeleting}>
              Cancel
            </Button>
          </DialogClose>
          <Button
            type="button"
            variant={'destructive'}
            loading={isDeleting}
            disabled={environment?.name !== name}
            onClick={handleDelete}
          >
            {isDeleting ? 'Deleting...' : 'Delete this environment'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
