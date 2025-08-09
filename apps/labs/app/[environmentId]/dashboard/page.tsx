import { Metadata } from 'next';
import PageWrapper from '@/_components/page-wrapper';
import SectionHeader from '@/_components/section-header';
import EnvironmentSummaryCards from '@/_components/environment-summary-cards';
import ExploreThonLabsCards from '@/_components/explore-thonlabs-cards';
import DashboardPageHeader from '@/_components/dashboard-page-header';
import Onboard from '@/_components/onboard';
import BillingPricingCards from '@/_components/billing-pricing-cards';

export const metadata: Metadata = {
  title: 'Dashboard',
};

type Params = Promise<{ environmentId: string }>;

export default async function Home({ params }: { params: Params }) {
  const { environmentId } = await params;

  return (
    <>
      <DashboardPageHeader />

      <PageWrapper className="space-y-8">
        {/* <BillingPricingCards environmentId={environmentId} /> */}

        <section>
          <Onboard />
        </section>

        <section>
          <SectionHeader title="Summary" />
          <EnvironmentSummaryCards environmentId={environmentId} />
        </section>

        <section>
          <SectionHeader title="Explore ThonLabs" />
          <ExploreThonLabsCards environmentId={environmentId} />
        </section>
      </PageWrapper>
    </>
  );
}
