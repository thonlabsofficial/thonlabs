'use client';

import { Button } from '@/ui/components/ui/button';
import { Input, InputWrapper } from '@/ui/components/ui/input';
import { useForm } from 'react-hook-form';
import {
  ResetPasswordFormSchema,
  ResetPasswordFormData,
} from '@/app/(logged)/auth/_validators/auth-validators';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { ReloadIcon } from '@radix-ui/react-icons';
import { labsPublicAPI } from '@/helpers/api';
import { useToast } from '@/ui/components/ui/use-toast';

export default function ResetPasswordForm() {
  const [loading, setLoading] = React.useState(false);
  const { toast } = useToast();

  const form = useForm<ResetPasswordFormData>({
    resolver: zodResolver(ResetPasswordFormSchema),
  });

  async function onSubmit(data: ResetPasswordFormData) {
    try {
      setLoading(true);

      await labsPublicAPI.post('/auth/reset-password', data);

      toast({
        title: 'Email sent',
        description:
          'Check the link in your email inbox to proceed with resetting your password.',
      });

      form.reset();
    } catch (e) {
      toast({
        title: 'Error sending email',
        description: 'An error ocurred when starting the reset password flow.',
        variant: 'destructive',
      });
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <div className="grid w-full items-center gap-5">
        <InputWrapper>
          <Input
            id="email"
            placeholder="you@example.com"
            inputSize="lg"
            label="Email"
            error={form.formState.errors.email?.message}
            {...form.register('email')}
          />
        </InputWrapper>
      </div>

      <Button size="lg" className="w-full mt-4" loading={loading}>
        {loading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin -mt-1" />}
        Send Reset Link
      </Button>
    </form>
  );
}
