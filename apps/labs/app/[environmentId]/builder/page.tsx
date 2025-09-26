import React from 'react';
import { Metadata } from 'next';
import PageWrapper from '@/_components/page-wrapper';
import PageHeader from '@/_components/page-header';
import { ShieldEllipsis } from 'lucide-react';
import BuilderAuthSettings from '@/_components/builder-auth-settings';
import { getEnvironmentById } from '@/_services/environment-service';
import BuilderPreview from '@/_components/builder-preview';
import SectionHeader from '@/_components/section-header';
import { ThonLabsPreviewProvider } from '@thonlabs/nextjs';

export const metadata: Metadata = {
  title: 'Auth Builder',
};

type Params = Promise<{ environmentId: string }>;

export default async function Builder({ params }: { params: Params }) {
  const { environmentId } = await params;
  const environment = await getEnvironmentById(environmentId);

  return (
    <>
      <PageHeader
        title="Builder"
        description="Customize the authentication experience for your users"
        icon={ShieldEllipsis}
      />
      <PageWrapper className="pt-4 grid gap-10" withContainer={false}>
        <ThonLabsPreviewProvider>
          <div className="grid grid-cols-[42rem_1fr] gap-2">
            <section>
              <SectionHeader title="Settings" />
              <BuilderAuthSettings environment={environment} />
            </section>
            <section>
              <BuilderPreview environment={environment} />
            </section>
          </div>
        </ThonLabsPreviewProvider>
      </PageWrapper>
    </>
  );
}
