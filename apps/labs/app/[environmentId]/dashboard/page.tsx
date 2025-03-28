import { Metadata } from 'next';
import PageWrapper from '@/_components/page-wrapper';
import PageHeader from '@/_components/page-header';
import { LayoutDashboard } from 'lucide-react';
import SectionHeader from '@/_components/section-header';
import EnvironmentSummaryCards from '@/_components/environment-summary-cards';
import ExploreThonLabsCards from '@/_components/explore-thonlabs-cards';
import OnboardIntegration, {
  OnboardIntegrationOptions,
} from '@/_components/onboard-integration';
import DashboardPageHeader from '@/_components/dashboard-page-header';

export const metadata: Metadata = {
  title: 'Dashboard',
};

type Params = Promise<{ environmentId: string }>;

export default async function Home({ params }: { params: Params }) {
  const { environmentId } = await params;

  return (
    <>
      {/* <PageHeader title="Dashboard" icon={LayoutDashboard} /> */}
      <PageWrapper className="mt-4 mb-9" withContainer={false}>
        <DashboardPageHeader />
      </PageWrapper>
      <PageWrapper className="space-y-8" withContainer={false}>
        <section className="grid grid-cols-[30rem_1fr] gap-2">
          <div className="space-y-2">
            <SectionHeader
              title="Integrate in Minutes - It's like lego"
              description="Select your Next.js version below, and follow simple quick steps to add authentication to your application."
            />
            <OnboardIntegrationOptions />
          </div>
          <OnboardIntegration />
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
