import { Metadata } from 'next';
import PageWrapper from '@labs/_components/page-wrapper';
import PageHeader from '../_components/page-header';
import ServerAuthSessionService from '../_services/server-auth-session-service';
import { Environment } from '../_interfaces/environment';
import GeneralSettings from './_components/general-settings';
import AuthSettings from './_components/auth-settings';
import React from 'react';
import { BsGear } from 'react-icons/bs';
import DangerZone from './_components/danger-zone';
import SectionHeader from '@/(labs)/_components/section-header';
import APIKeysSettings from './_components/api-key-settings';

export const metadata: Metadata = {
  title: 'Settings',
};

export default function Settings() {
  const sessionEnvironment = ServerAuthSessionService.getEnv();

  return (
    <>
      <PageHeader title="Settings" icon={BsGear} withContainer />
      <PageWrapper className="pt-4 grid gap-12">
        <section>
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
          <SectionHeader title="API Keys" />

          <div className="grid gap-1.5">
            <APIKeysSettings
              sessionEnvironment={sessionEnvironment as Environment}
            />
          </div>
        </section>

        <section>
          <SectionHeader title="Danger Zone" />
          <DangerZone sessionEnvironment={sessionEnvironment as Environment} />
        </section>
      </PageWrapper>
    </>
  );
}
