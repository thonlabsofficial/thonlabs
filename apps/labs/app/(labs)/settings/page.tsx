import { Metadata } from 'next';
import PageWrapper from '@labs/_components/page-wrapper';
import PageHeader from '../_components/page-header';
import ServerAuthSessionService from '../_services/server-auth-session-service';
import { Environment } from '../_interfaces/environment';
import GeneralSettings from './_components/general-settings';
import AuthSettings from './_components/auth-settings';
import { Typo } from '@repo/ui/typo';
import React from 'react';
import { BsGear } from 'react-icons/bs';
import DangerZone from './_components/danger-zone';

export const metadata: Metadata = {
  title: 'Settings',
};

function SectionHeader({
  title,
  description,
}: {
  title: React.ReactNode;
  description?: React.ReactNode;
}) {
  return (
    <header className="flex flex-col gap-1 mb-4">
      <Typo variant="h4">{title}</Typo>
      {description && <Typo variant="muted">{description}</Typo>}
    </header>
  );
}

export default function Settings() {
  const sessionEnvironment = ServerAuthSessionService.getEnv();

  return (
    <>
      <PageHeader title="Settings" icon={BsGear} />
      <PageWrapper className="pt-4 grid gap-12">
        <section>
          <SectionHeader
            title="General Settings"
            description="Configure the general settings of the environment"
          />
          <GeneralSettings
            sessionEnvironment={sessionEnvironment as Environment}
          />
        </section>

        <section>
          <SectionHeader
            title="Authentication Settings"
            description="Configure authentication type and tokens expirations"
          />
          <AuthSettings
            sessionEnvironment={sessionEnvironment as Environment}
          />
        </section>

        <section>
          <SectionHeader title="Danger Zone" />
          <DangerZone sessionEnvironment={sessionEnvironment as Environment} />
        </section>
      </PageWrapper>
    </>
  );
}
