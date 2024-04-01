'use client';

import { Button } from '@/ui/components/ui/button';
import { Input, InputWrapper } from '@/ui/components/ui/input';
import { Label } from '@/ui/components/ui/label';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import {
  LoginFormData,
  LoginFormSchema,
} from '@/app/(logged)/auth/_validators/auth-validators';
import { zodResolver } from '@hookform/resolvers/zod';
import { login } from '../_actions/auth-actions';
import React from 'react';
import { ReloadIcon } from '@radix-ui/react-icons';
import { useRouter } from 'next/navigation';
import { useToast } from '@/ui/components/ui/use-toast';

export default function LoginForm() {
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(LoginFormSchema),
  });

  async function onSubmit(data: LoginFormData) {
    try {
      setLoading(true);

      const result = await login(data);

      if (result.statusCode) {
        toast({
          title: 'Log in error',
          description: result.message || 'Invalid credentials',
          variant: 'destructive',
        });
      } else {
        router.replace('/labs');
      }
    } catch (e) {
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

        <InputWrapper>
          <div className="flex justify-between">
            <Label htmlFor="password">Password</Label>
            <Link
              className={`text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-50 
            transition-all duration-200 ease-in-out 
            text-sm font-medium leading-none underline-offset-4 hover:underline`}
              href="/auth/reset-password"
              tabIndex={-1}
            >
              Forgot your password?
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            placeholder="••••••••••••"
            inputSize="lg"
            error={form.formState.errors.password?.message}
            {...form.register('password')}
          />
        </InputWrapper>
      </div>

      <Button size="lg" className="w-full mt-8" loading={loading}>
        {loading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin -mt-1" />}
        Continue
      </Button>
    </form>
  );
}
