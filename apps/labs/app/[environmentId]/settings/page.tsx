import { SettingsIcon } from 'lucide-react';
import type { Metadata } from 'next';
import APIKeysSettings from '@/_components/api-key-settings';
import CustomDomainSettings from '@/_components/custom-domain-settings';
import EnvironmentDangerZone from '@/_components/environment-danger-zone';
import EnvironmentGeneralSettings from '@/_components/environment-general-settings';
import PageHeader from '@/_components/page-header';
import PageWrapper from '@/_components/page-wrapper';
import SectionHeader from '@/_components/section-header';

export const metadata: Metadata = {
  title: 'Settings',
};

export default async function Settings() {
  return (
    <>
      <PageHeader title='Settings' icon={SettingsIcon} withContainer />
      <PageWrapper className='grid gap-12 pt-4'>
        <section>
          <EnvironmentGeneralSettings />
        </section>

        <section>
          <SectionHeader
            title='Integration Domain'
            description='Use this domain to connect your application to ThonLabs'
          />
          <CustomDomainSettings />
        </section>

        <section>
          <SectionHeader
            title='API Keys'
            description='Connect these keys with our libraries components, SDKs, or APIs'
          />
          <div className='grid gap-4'>
            <APIKeysSettings />
          </div>
        </section>

        <section>
          <SectionHeader title='Danger Zone' />
          <EnvironmentDangerZone />
        </section>
      </PageWrapper>
    </>
  );
}
