import { Metadata } from 'next';
import PageWrapper from '@labs/_components/page-wrapper';
import PageHeader from '@labs/_components/page-header';
import ServerUserSession from '@labs/_services/server-auth-provider';
import { Environment } from '@labs/_interfaces/environment';
import { Typo } from '@repo/ui/typo';
import React from 'react';
import { BsLockFill } from 'react-icons/bs';
import PublicKeySettings from './_components/public-key-settings';
import SecretKeySettings from './_components/secret-key-settings';

export const metadata: Metadata = {
  title: 'API Settings',
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
  const sessionEnvironment = ServerUserSession.getEnv();

  return (
    <>
      <PageHeader
        title="API Settings"
        description="Your data and integrations are safeguarded by middleware that requires keys for every request."
        icon={BsLockFill}
      />
      <PageWrapper className="pt-4 grid gap-12">
        <section>
          <SectionHeader title="API Keys" />

          <div className="grid gap-1.5">
            <PublicKeySettings
              sessionEnvironment={sessionEnvironment as Environment}
            />
            <SecretKeySettings
              sessionEnvironment={sessionEnvironment as Environment}
            />
          </div>
        </section>
      </PageWrapper>
    </>
  );
}
