'use client';

import { Button } from '@repo/ui/button';
import { Input, InputWrapper } from '@repo/ui/input';
import { useForm } from 'react-hook-form';
import {
  ResetPasswordFormSchema,
  ResetPasswordFormData,
} from '../validators/auth-validators';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { ReloadIcon } from '@radix-ui/react-icons';
import { useToast } from '@repo/ui/hooks/use-toast';
import Log from '../../../shared/utils/log';
import { resetPassword } from '../actions/auth-actions';
import { useSearchParams } from 'next/navigation';
import { delay } from '../../../shared/utils/helpers';

export default function ResetPasswordForm() {
  const [loading, setLoading] = React.useState(false);
  const { toast } = useToast();

  const form = useForm<ResetPasswordFormData>({
    resolver: zodResolver(ResetPasswordFormSchema),
  });

  const searchParams = useSearchParams();
  const previewMode = searchParams.get('previewMode') === 'true';

  async function onSubmit(data: ResetPasswordFormData) {
    try {
      setLoading(true);

      if (previewMode) {
        await delay(1000);
        setLoading(false);
        return;
      }

      await resetPassword(data);

      toast({
        title: 'Reset password email sent',
        description:
          'Check the link in your email inbox to proceed with resetting your password.',
      });

      form.reset();
    } catch (e: any) {
      toast({
        title: 'Error resetting password',
        description:
          'An error occurred when starting the reset password flow, please try again.',
        variant: 'destructive',
      });
      Log.error({
        action: 'resetPassword',
        message: e.message || e.statusText,
        statusCode: e.status,
      });
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
            size="lg"
            label="Email"
            error={form.formState.errors.email?.message}
            {...form.register('email')}
          />
        </InputWrapper>
      </div>

      <Button className="w-full mt-4" loading={loading}>
        {loading ? 'Sending...' : 'Send Reset Link'}
      </Button>
    </form>
  );
}
