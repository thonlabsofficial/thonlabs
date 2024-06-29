import { Metadata } from 'next';
import LandingGrid from '@/_components/landing-grid';
import AuthHeader from '@/_components/auth-header';
import { labsPublicAPI } from '../../../../../helpers/api';
import { notFound } from 'next/navigation';
import CreateNewPasswordForm from '../../../_components/create-new-password-form';

export const metadata: Metadata = {
  title: 'Create a new password',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function CreateNewPassword({
  params,
}: {
  params: { token: string };
}) {
  // Validates the token
  try {
    await labsPublicAPI.get(`/auth/reset-password/${params.token}`);
  } catch (e) {
    notFound();
  }

  return (
    <div className="flex md:items-center justify-center">
      <LandingGrid />
      <div className="mt-16 sm:pt-0 md:mt-40 px-3 w-full sm:max-w-[400px]">
        <AuthHeader
          title="Create a New Password"
          description="Please complete the form below to create a new password for your account."
          className="mb-10"
        />
        <CreateNewPasswordForm token={params.token} />
      </div>
    </div>
  );
}
