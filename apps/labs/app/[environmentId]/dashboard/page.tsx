import type { Metadata } from 'next';
import DashboardPageHeader from '@/_components/dashboard-page-header';
import EnvironmentSummaryCards from '@/_components/environment-summary-cards';
import ExploreThonLabsCards from '@/_components/explore-thonlabs-cards';
import Onboard from '@/_components/onboard';
import PageWrapper from '@/_components/page-wrapper';
import SectionHeader from '@/_components/section-header';

export const metadata: Metadata = {
  title: 'Dashboard',
};

type Params = Promise<{ environmentId: string }>;

export default async function Home({ params }: { params: Params }) {
  const { environmentId } = await params;

  return (
    <>
      <DashboardPageHeader />

      <PageWrapper className='space-y-8'>
        <section>
          <Onboard />
        </section>

        <section>
          <SectionHeader title='Summary' />
          <EnvironmentSummaryCards environmentId={environmentId} />
        </section>

        <section>
          <SectionHeader title='Explore ThonLabs' />
          <ExploreThonLabsCards environmentId={environmentId} />
        </section>
      </PageWrapper>
    </>
  );
}
