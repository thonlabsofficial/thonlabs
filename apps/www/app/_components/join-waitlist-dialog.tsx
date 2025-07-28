'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@repo/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@repo/ui/dialog';
import { useToast } from '@repo/ui/hooks/use-toast';
import { Input, InputWrapper } from '@repo/ui/input';
import {
  InputSelect,
  InputSelectContent,
  InputSelectItem,
  InputSelectTrigger,
  InputSelectValue,
} from '@repo/ui/input-select';
import { Typo } from '@repo/ui/typo';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import React, { useTransition } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { joinWaitlistAction } from '@/_actions/join-waitlist-action';
import { competitorsAuthProvidersMapper } from '@/_constants/competitors-auth-providers';
import {
  type JoinWaitlistFormData,
  joinWaitlistFormSchema,
} from '@/_validators/general-validators';

interface Props extends React.ComponentProps<typeof Dialog> {
  trigger?: React.ReactNode;
}

export default function JoinWaitlistDialog({ trigger, ...props }: Props) {
  const form = useForm<JoinWaitlistFormData>({
    resolver: zodResolver(joinWaitlistFormSchema),
  });
  const [isSaving, startSavingTransition] = useTransition();
  const [done, setDone] = React.useState(false);
  const { toast } = useToast();

  function onSubmit(payload: JoinWaitlistFormData) {
    startSavingTransition(async () => {
      const result = await joinWaitlistAction(payload);

      if (result?.statusCode) {
        toast({
          title: 'Something happened',
          description:
            result?.message || result?.error || 'Invalid credentials',
          variant: 'destructive',
        });
      } else {
        setDone(true);
      }
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
  }, [props.open, handleReset]);

  return (
    <Dialog {...props}>
      {trigger && (
        <DialogTrigger asChild onClick={handleReset}>
          {trigger}
        </DialogTrigger>
      )}
      <DialogContent>
        {!done ? (
          <>
            <DialogHeader>
              <DialogTitle>Join Waitlist</DialogTitle>
              <DialogDescription>
                Join our waitlist for updates and early access to the platform
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className='grid w-full items-center gap-4'>
                <InputWrapper>
                  <Input
                    id='name'
                    label='Name'
                    maxLength={25}
                    error={form.formState.errors.fullName?.message}
                    {...form.register('fullName')}
                  />
                </InputWrapper>
                <InputWrapper>
                  <Input
                    id='email'
                    label='Email'
                    placeholder='your@email.com'
                    error={form.formState.errors.email?.message}
                    {...form.register('email')}
                  />
                </InputWrapper>
                <InputWrapper className='z-60'>
                  <Controller
                    name='currentProvider'
                    control={form.control}
                    render={({ field }) => (
                      <InputSelect onValueChange={field.onChange} {...field}>
                        <InputSelectTrigger
                          label='Current authentication provider'
                          error={form.formState.errors.currentProvider?.message}
                        >
                          <InputSelectValue placeholder='Select an option' />
                        </InputSelectTrigger>
                        <InputSelectContent>
                          {Object.entries(competitorsAuthProvidersMapper).map(
                            ([key, value]) => (
                              <InputSelectItem key={key} value={key}>
                                {value.label}
                              </InputSelectItem>
                            )
                          )}
                        </InputSelectContent>
                      </InputSelect>
                    )}
                  />
                </InputWrapper>
              </div>
              <DialogFooter>
                <Button type='submit' loading={isSaving}>
                  {isSaving ? 'Joining...' : 'Join Waitlist'}
                </Button>
              </DialogFooter>
            </form>
          </>
        ) : (
          <motion.div
            className='mb-3 flex h-full flex-col items-center justify-center'
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className='mt-6 mb-4 flex h-12 w-12 items-center justify-center rounded-md border border-success bg-success/50'>
              <Check className='h-8 w-8' />
            </div>
            <Typo variant={'h3'}>You're in!</Typo>
            <Typo variant={'lead'} className='text-center'>
              Thank you for joining our waitlist.
              <br />
              Stay tuned for the latest updates
            </Typo>

            <Button
              variant={'secondary'}
              onClick={() => props.onOpenChange?.(false)}
              className='mt-6'
            >
              Close
            </Button>
          </motion.div>
        )}
      </DialogContent>
    </Dialog>
  );
}
