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
import { BlocksIcon } from '@repo/ui/animated-icons';
import { OnboardIntegrationProvider } from '@/_providers/onboard-integration-provider';

export const metadata: Metadata = {
  title: 'Dashboard',
};

type Params = Promise<{ environmentId: string }>;

export default async function Home({ params }: { params: Params }) {
  const { environmentId } = await params;

  return (
    <>
      <PageWrapper className="mt-4 mb-9" withContainer={false}>
        <DashboardPageHeader />
      </PageWrapper>
      <PageWrapper className="space-y-8" withContainer={false}>
        <section className="grid grid-cols-[24rem_1fr] gap-2">
          <OnboardIntegrationProvider>
            <div className="space-y-2">
              <SectionHeader
                title={
                  <div className="flex items-center gap-0.5">
                    <div>Integrate in Minutes - It's like lego</div>
                    <BlocksIcon className="-mt-1" />
                  </div>
                }
                description="Select your Next.js version below, and follow simple quick steps to add authentication to your application."
              />

              <OnboardIntegrationOptions />
            </div>
            <OnboardIntegration />
          </OnboardIntegrationProvider>
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
