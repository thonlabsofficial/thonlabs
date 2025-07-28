import { ShieldEllipsis } from 'lucide-react';
import type { Metadata } from 'next';
import BuilderAuthSettings from '@/_components/builder-auth-settings';
import BuilderPreview from '@/_components/builder-preview';
import PageHeader from '@/_components/page-header';
import PageWrapper from '@/_components/page-wrapper';
import SectionHeader from '@/_components/section-header';
import { getEnvironmentById } from '@/_services/environment-service';

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
        title='Builder'
        description='Customize the authentication experience for your users'
        icon={ShieldEllipsis}
      />
      <PageWrapper className='grid gap-10 pt-4' withContainer={false}>
        <div className='grid grid-cols-[42rem_1fr] gap-2'>
          <section>
            <SectionHeader title='Settings' />
            <BuilderAuthSettings environment={environment} />
          </section>
          <section>
            <BuilderPreview />
          </section>
        </div>
      </PageWrapper>
    </>
  );
}
