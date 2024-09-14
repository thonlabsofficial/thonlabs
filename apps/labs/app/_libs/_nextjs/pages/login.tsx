import LoginForm from '@/auth/_components/login-form';
import LandingGrid from '@/_components/landing-grid';
import AuthHeader from '@/_components/auth-header';
import ToLoginReasonToast from '@/auth/_components/to-login-reason-toast';

export default function Login() {
  return (
    <>
      <ToLoginReasonToast />
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
    </>
  );
}
