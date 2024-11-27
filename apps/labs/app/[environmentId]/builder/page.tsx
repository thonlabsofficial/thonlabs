import React from 'react';
import { Metadata } from 'next';
import PageWrapper from '@/_components/page-wrapper';
import PageHeader from '@/_components/page-header';
import { ShieldEllipsis } from 'lucide-react';
import AuthSettings from '@/_components/auth-settings';
import SectionHeader from '@/_components/section-header';

export const metadata: Metadata = {
  title: 'Auth Builder',
};

export default async function AuthBuilder() {
  return (
    <>
      <PageHeader
        title="Auth Builder"
        description="Customize the authentication experience"
        icon={ShieldEllipsis}
        withContainer
      />
      <PageWrapper className="pt-4 grid gap-10">
        <section>Builder TBD</section>

        <section>
          <SectionHeader title="Settings" />
          <AuthSettings />
        </section>
      </PageWrapper>
    </>
  );
}
