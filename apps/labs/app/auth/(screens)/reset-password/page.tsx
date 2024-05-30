import { Typo } from '@repo/ui/typo';
import { Metadata } from 'next';
import LandingGrid from '@/_components/landing-grid';
import ResetPasswordForm from '@/auth/_components/reset-password-form';
import Link from 'next/link';
import AuthHeader from '@/_components/auth-header';

export const metadata: Metadata = {
  title: 'Forgot your password? Reset!',
  robots: {
    index: false,
    follow: false,
  },
};

export default function ResetPassword() {
  return (
    <div className="flex md:items-center justify-center">
      <LandingGrid />
      <div className="mt-16 sm:pt-0 md:mt-40 px-3 w-full sm:max-w-[400px]">
        <AuthHeader
          title="Reset Your Password"
          description="Please provide your email address, and we'll send you a secure
            link to reset your password."
          className="mb-10"
        />
        <ResetPasswordForm />
        <footer className="text-center mt-4">
          <Typo variant={'muted'} className="!text-gray-400">
            Remember your password?{' '}
            <Link
              href="/auth/login"
              className="text-gray-900 dark:text-gray-50 underline-offset-4 hover:underline"
            >
              Log in
            </Link>
            .
          </Typo>
        </footer>
      </div>
    </div>
  );
}
