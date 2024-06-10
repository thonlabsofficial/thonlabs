'use client';

import { Button } from '@repo/ui/button';
import { Input, InputWrapper } from '@repo/ui/input';
import { useForm } from 'react-hook-form';
import {
  CreateNewPasswordFormSchema,
  CreateNewPasswordFormData,
} from '@/auth/_validators/auth-validators';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { ReloadIcon } from '@radix-ui/react-icons';
import { labsPublicAPI } from '@helpers/api';
import { useToast } from '@repo/ui/hooks/use-toast';
import { useRouter } from 'next/navigation';

type Props = {
  token: string;
};

export default function CreateNewPasswordForm({ token }: Props) {
  const [loading, setLoading] = React.useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<CreateNewPasswordFormData>({
    resolver: zodResolver(CreateNewPasswordFormSchema),
  });

  async function onSubmit(data: CreateNewPasswordFormData) {
    try {
      setLoading(true);

      await labsPublicAPI.patch(`/auth/reset-password/${token}`, data);

      toast({
        title: 'Password created',
        description:
          'Your new password has been securely stored. You can now access your account using it.',
      });

      router.push('/auth/login');
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
            inputSize="lg"
            type="password"
            label="New Password"
            error={form.formState.errors.password?.message}
            {...form.register('password')}
          />
        </InputWrapper>
        <InputWrapper>
          <Input
            placeholder="••••••••••••"
            inputSize="lg"
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
