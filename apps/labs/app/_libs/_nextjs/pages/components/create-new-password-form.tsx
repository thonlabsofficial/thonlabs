'use client';

import { Button } from '@repo/ui/button';
import { Input, InputWrapper } from '@repo/ui/input';
import { useForm } from 'react-hook-form';
import {
  CreateNewPasswordFormSchema,
  CreateNewPasswordFormData,
} from '@/_libs/_nextjs/pages/validators/auth-validators';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { ReloadIcon } from '@radix-ui/react-icons';
import { useToast } from '@repo/ui/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { createNewPassword, login } from '../actions/auth-actions';

type Props = {
  token: string;
  email?: string;
};

export default function CreateNewPasswordForm({ token, email }: Props) {
  const [loading, setLoading] = React.useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<CreateNewPasswordFormData>({
    resolver: zodResolver(CreateNewPasswordFormSchema),
  });

  async function onSubmit(data: CreateNewPasswordFormData) {
    try {
      setLoading(true);

      await createNewPassword(token, data);

      let goTo = '/auth/login';

      /*
        If there is an email here it means the user is coming
        from a "invitation" flow, the goal is to define password
        and continue to the app.
      */
      if (email) {
        await login({
          email,
          password: data.password,
        });
        goTo = '/';
      }

      toast({
        title: email ? 'Welcome' : 'Password created',
        description: `Your new password has been securely stored. You can now access your account using it.`,
      });

      router.push(goTo);
    } catch (e) {
      toast({
        title: 'Error',
        description:
          'An error occurred while creating a new password. Please try again.',
        variant: 'destructive',
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
            placeholder="••••••••••••"
            size="lg"
            type="password"
            label="New Password"
            error={form.formState.errors.password?.message}
            {...form.register('password')}
          />
        </InputWrapper>
        <InputWrapper>
          <Input
            placeholder="••••••••••••"
            size="lg"
            type="password"
            label="Confirm New Password"
            error={form.formState.errors.confirm?.message}
            {...form.register('confirm')}
          />
        </InputWrapper>
      </div>

      <Button className="w-full mt-8" loading={loading}>
        {loading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin -mt-1" />}
        Create
      </Button>
    </form>
  );
}
