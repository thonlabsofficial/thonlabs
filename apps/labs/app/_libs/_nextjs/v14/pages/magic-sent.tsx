import LandingGrid from './components/landing-grid';
import AuthHeader from './components/auth-header';
import { CloseThisPageButton } from './components/close-this-page-button';

export default function MagicSent() {
  return (
    <>
      <div className="flex md:items-center justify-center">
        <LandingGrid />
        <div className="mt-16 sm:pt-0 md:mt-40 px-3 w-full sm:max-w-[400px]">
          <AuthHeader
            title="Check your email"
            description="We've sent you a magic link to log in to Thon Labs, you can close this page."
            className="mb-14"
          />
          <CloseThisPageButton />
        </div>
      </div>
    </>
  );
}
