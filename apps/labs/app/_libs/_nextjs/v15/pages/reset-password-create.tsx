import { Metadata } from 'next';
import LandingGrid from './components/landing-grid';
import AuthHeader from './components/auth-header';
import { notFound } from 'next/navigation';
import CreateNewPasswordForm from './components/create-new-password-form';
import { labsPublicAPI } from '../../shared/utils/api';

export const metadata: Metadata = {
  title: 'Create a new password',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function ResetPasswordCreate({
  token,
  inviteFlowEmail,
}: {
  token: string;
  inviteFlowEmail?: string;
}) {
  // Validates the token
  try {
    await labsPublicAPI(`/auth/reset-password/${token}`);
  } catch (e) {
    notFound();
  }

  return (
    <div className="flex md:items-center justify-center">
      <LandingGrid />
      <div className="mt-16 sm:pt-0 md:mt-40 px-3 w-full sm:max-w-[400px] relative">
        <AuthHeader
          title="Create a New Password"
          description="Please complete the form below to create a new password for your account."
          className="mb-10"
        />
        <CreateNewPasswordForm token={token} email={inviteFlowEmail} />
      </div>
    </div>
  );
}
