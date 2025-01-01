import SignUpForm from './components/sign-up-form';
import LandingGrid from './components/landing-grid';
import AuthHeader from './components/auth-header';

export default function SignUp() {
  return (
    <div className="flex md:items-center justify-center">
      <LandingGrid />
      <div className="mt-16 sm:pt-0 md:mt-40 px-3 w-full sm:max-w-[400px] relative">
        <AuthHeader
          title="Create an account"
          description="signUp"
          className="mb-14"
        />
        <SignUpForm />
      </div>
    </div>
  );
}
