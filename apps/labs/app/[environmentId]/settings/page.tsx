import { Metadata } from 'next';
import PageWrapper from '@/_components/page-wrapper';
import PageHeader from '@/_components/page-header';
import EnvironmentGeneralSettings from '@/_components/environment-general-settings';
import React from 'react';
import EnvironmentDangerZone from '@/_components/environment-danger-zone';
import SectionHeader from '@/_components/section-header';
import { SettingsIcon } from 'lucide-react';
import EnvironmentIdCard from '@/_components/envionment-id-card';
import CustomDomainSettings from '@/_components/custom-domain-settings';
import AllowedOriginsSettings from '@/_components/allowed-origins-settings';
import APIKeysSettings from '@/_components/api-key-settings';

export const metadata: Metadata = {
  title: 'Settings',
};

export default async function Settings() {
  return (
    <>
      <PageHeader title="Settings" icon={SettingsIcon} withContainer />
      <PageWrapper className="pt-4 grid gap-12">
        <section>
          <EnvironmentGeneralSettings />
        </section>

        <section>
          <SectionHeader
            title="Integration Domain"
            description="Use this domain to connect your application to ThonLabs"
          />
          <CustomDomainSettings />
        </section>

        <section>
          <SectionHeader
            title="Allowed Origins"
            description="List of origins permited for access"
          />
          <AllowedOriginsSettings />
        </section>

        <section>
          <SectionHeader
            title="API Keys"
            description="Connect these keys with our libraries components, SDKs, or APIs"
          />
          <div className="grid gap-4">
            <APIKeysSettings />
          </div>
        </section>

        <section>
          <SectionHeader title="Danger Zone" />
          <EnvironmentDangerZone />
        </section>
      </PageWrapper>
    </>
  );
}
