import { BlocksIcon } from 'lucide-react';
import type { Metadata } from 'next';
import Onboard from '@/_components/onboard';
import PageHeader from '@/_components/page-header';
import PageWrapper from '@/_components/page-wrapper';

export const metadata: Metadata = {
  title: 'Integrate your app',
};

export default async function IntegrationGuidePage() {
  return (
    <>
      <PageHeader
        title='Onboard'
        description='Follow the quick steps below to integrate ThonLabs into your app'
        icon={BlocksIcon}
      />

      <PageWrapper className='space-y-8'>
        <Onboard forceNotInitialized />
      </PageWrapper>
    </>
  );
}
