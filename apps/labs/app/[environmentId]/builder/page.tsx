import React from 'react';
import { Metadata } from 'next';
import PageWrapper from '@/_components/page-wrapper';
import PageHeader from '@/_components/page-header';
import { ShieldEllipsis } from 'lucide-react';
import AuthSettings from '@/_components/auth-settings';
import SectionHeader from '@/_components/section-header';
import { getEnvironmentById } from '@/_services/environment-service';

export const metadata: Metadata = {
  title: 'Auth Builder',
};

type Params = Promise<{ environmentId: string }>;

export default async function AuthBuilder({ params }: { params: Params }) {
  const { environmentId } = await params;
  const environment = await getEnvironmentById(environmentId);

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
          <AuthSettings environment={environment} />
        </section>
      </PageWrapper>
    </>
  );
}
