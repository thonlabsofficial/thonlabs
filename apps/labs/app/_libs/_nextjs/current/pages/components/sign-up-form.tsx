'use client';

import React from 'react';
import { Button } from '@repo/ui/button';
import { Input, InputWrapper } from '@repo/ui/input';
import { Label } from '@repo/ui/label';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import {
  SignUpFormData,
  SignUpFormSchema,
} from '../validators/auth-validators';
import { zodResolver } from '@hookform/resolvers/zod';
import { signUp } from '../actions/auth-actions';
import { useRouter } from 'next/navigation';
import { useToast } from '@repo/ui/hooks/use-toast';
import { AuthProviders, useEnvironmentData } from '@/_libs/_nextjs';
import { Typo } from '@repo/ui/typo';

export default function SignUpForm() {
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const { authProvider, enableSignUp } = useEnvironmentData();

  const form = useForm<SignUpFormData>({
    resolver: zodResolver(
      SignUpFormSchema(authProvider === AuthProviders.MagicLogin),
    ),
  });

  async function onSubmit(data: SignUpFormData) {
    try {
      setLoading(true);

      const result = await signUp(data);

      console.log(result);

      if (!result || result?.statusCode) {
        toast({
          title: 'Sign up error',
          description: result?.message || result?.error || 'An error occurred',
          variant: 'destructive',
        });
        setLoading(false);
      } else {
        router.replace(result.emailSent ? '/auth/magic' : '/');
      }
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  }

  return (
    <>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid w-full items-center gap-5">
          <InputWrapper>
            <Input
              id="fullName"
              placeholder="e.g.: John Doe"
              size="lg"
              label="Full Name"
              error={form.formState.errors.fullName?.message}
              {...form.register('fullName')}
            />
          </InputWrapper>

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

          {authProvider === AuthProviders.EmailAndPassword && (
            <InputWrapper>
              <div className="flex justify-between">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••••••"
                size="lg"
                error={form.formState.errors.password?.message}
                {...form.register('password')}
              />
            </InputWrapper>
          )}
        </div>

        <Button className="w-full mt-8" loading={loading}>
          {loading ? 'Creating your account...' : 'Continue'}
        </Button>
      </form>
      {enableSignUp && (
        <div className="flex justify-center mt-4">
          <Typo variant="sm" className="text-muted-foreground">
            Already have an account?{' '}
            <Link
              href="/auth/login"
              className="text-foreground hover:underline"
            >
              Log in
            </Link>
          </Typo>
        </div>
      )}
    </>
  );
}
