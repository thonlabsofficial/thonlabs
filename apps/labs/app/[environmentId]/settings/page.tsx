import { Metadata } from 'next';
import PageWrapper from '@/_components/page-wrapper';
import PageHeader from '@/_components/page-header';
import EnvironmentGeneralSettings from '@/_components/environment-general-settings';
import React from 'react';
import EnvironmentDangerZone from '@/_components/environment-danger-zone';
import SectionHeader from '@/_components/section-header';
import { SettingsIcon } from 'lucide-react';
import CustomDomainSettings from '@/_components/custom-domain-settings';
import EmailDomainSettings from '@/_components/email-domain-settings';

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
          <CustomDomainSettings />
        </section>

        <section>
          <EmailDomainSettings />
        </section>

        <section>
          <SectionHeader title="Danger Zone" />
          <EnvironmentDangerZone />
        </section>
      </PageWrapper>
    </>
  );
}
