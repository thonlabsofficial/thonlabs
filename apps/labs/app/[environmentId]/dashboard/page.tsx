import { Metadata } from 'next';
import PageWrapper from '@/_components/page-wrapper';
import SectionHeader from '@/_components/section-header';
import EnvironmentSummaryCards from '@/_components/environment-summary-cards';
import ExploreThonLabsCards from '@/_components/explore-thonlabs-cards';
import OnboardIntegration, {
  OnboardIntegrationHeader,
  OnboardIntegrationOptions,
} from '@/_components/onboard-integration';
import DashboardPageHeader from '@/_components/dashboard-page-header';
import { OnboardIntegrationProvider } from '@/_providers/onboard-integration-provider';

export const metadata: Metadata = {
  title: 'Dashboard',
};

type Params = Promise<{ environmentId: string }>;

export default async function Home({ params }: { params: Params }) {
  const { environmentId } = await params;

  return (
    <>
      <PageWrapper className="mt-4 mb-6" withContainer={false}>
        <DashboardPageHeader />
      </PageWrapper>
      <PageWrapper className="space-y-8" withContainer={false}>
        <OnboardIntegrationProvider>
          <section className="grid grid-cols-[24rem_1fr] gap-2 mt-3">
            <div className="space-y-2">
              <OnboardIntegrationHeader />
              <OnboardIntegrationOptions />
            </div>
            <OnboardIntegration />
          </section>
        </OnboardIntegrationProvider>

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
