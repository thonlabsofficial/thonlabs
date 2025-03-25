import { Metadata } from 'next';
import PageWrapper from '@/_components/page-wrapper';
import PageHeader from '@/_components/page-header';
import { LayoutDashboard } from 'lucide-react';
import SectionHeader from '@/_components/section-header';
import EnvironmentSummaryCards from '@/_components/environment-summary-cards';
import ExploreThonLabsCards from '@/_components/explore-thonlabs-cards';

export const metadata: Metadata = {
  title: 'Dashboard',
};

export default async function Home({
  params,
}: {
  params: { environmentId: string };
}) {
  const { environmentId } = await params;

  return (
    <>
      <PageHeader title="Dashboard" icon={LayoutDashboard} />
      <PageWrapper className="space-y-6" withContainer={false}>
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
