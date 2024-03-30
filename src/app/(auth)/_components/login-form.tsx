'use client';

import { Button } from '@/ui/components/ui/button';
import { Input, InputWrapper } from '@/ui/components/ui/input';
import { Label } from '@/ui/components/ui/label';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import {
  LoginFormData,
  LoginFormSchema,
} from '@/app/(auth)/_validators/login-validators';
import { zodResolver } from '@hookform/resolvers/zod';
import { login } from '../_actions/auth-actions';
import React from 'react';
import { Typo } from '@/ui/components/ui/typo';
import { ReloadIcon } from '@radix-ui/react-icons';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const [serverError, setServerError] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(LoginFormSchema),
  });

  async function onSubmit(data: LoginFormData) {
    setServerError('');
    setLoading(true);

    const result = await login(data);

    if (result.error) {
      setServerError(result.error);
      setLoading(false);
      return;
    }

    router.replace('/labs');

    setLoading(false);
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
              className={`text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 
            transition-all duration-200 ease-in-out 
            text-sm font-medium leading-none hover:underline`}
              href="/forgot-password"
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
      {serverError && (
        <Typo
          as="div"
          variant={'small'}
          state={'error'}
          className="text-center mt-4"
        >
          {serverError}
        </Typo>
      )}

      <Button size="lg" className="w-full mt-8" loading={loading}>
        {loading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin -mt-1" />}
        Continue
      </Button>
    </form>
  );
}
