import { Metadata } from 'next';
import LoginForm from '@/app/(logged)/auth/_components/login-form';
import LandingGrid from '@/ui/components/app/landing-grid';
import AuthHeader from '@/ui/components/app/auth-header';

export const metadata: Metadata = {
  title: 'Login',
};

export default function Login() {
  return (
    <div className="flex md:items-center justify-center">
      <LandingGrid />
      <div className="mt-16 sm:pt-0 md:mt-40 px-3 w-full sm:max-w-[400px]">
        <AuthHeader
          title="Welcome"
          description="Log in to Thon Labs"
          className="mb-14"
        />
        <LoginForm />
      </div>
    </div>
  );
}
