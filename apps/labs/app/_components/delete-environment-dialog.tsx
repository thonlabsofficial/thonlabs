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
import { useRouter } from 'next/navigation';
import type React from 'react';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import useEnvironment from '@/_hooks/use-environment';
import type { EnvironmentDetail } from '@/_interfaces/environment';
import {
  type DeleteEnvironmentFormData,
  DeleteEnvironmentFormSchema,
} from '@/_validators/environments-validators';

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
        <div className='grid w-full items-center gap-3'>
          <InputWrapper>
            <Input
              id='name'
              size='lg'
              label={`To confirm, type "${environment?.name}" in the field below`}
              maxLength={30}
              error={form.formState.errors.name?.message}
              {...form.register('name')}
            />
          </InputWrapper>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type='button' variant='ghost' disabled={isDeleting}>
              Cancel
            </Button>
          </DialogClose>
          <Button
            type='button'
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
