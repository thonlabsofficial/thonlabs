import { Metadata } from 'next';
import PageWrapper from '@labs/_components/page-wrapper';
import PageHeader from '../_components/page-header';
import ServerUserSession from '../_services/server-auth-provider';
import { Environment } from '../_interfaces/environment';
import GeneralSettings from './_components/general-settings';

export const metadata: Metadata = {
  title: 'Settings',
};

export default function Settings() {
  const sessionEnvironment = ServerUserSession.getEnv();

  return (
    <>
      <PageHeader title="Settings" />
      <PageWrapper className="pt-4">
        <GeneralSettings
          sessionEnvironment={sessionEnvironment as Environment}
        />
      </PageWrapper>
    </>
  );
}
