import { Metadata } from 'next';
import PageWrapper from '../_components/page-wrapper';
import PageHeader from '../_components/page-header';
import { LuLayoutDashboard } from 'react-icons/lu';

export const metadata: Metadata = {
  title: 'Dashboard',
};

export default function Home() {
  return (
    <>
      <PageHeader title="Dashboard" icon={LuLayoutDashboard} />
      <PageWrapper withContainer={false}>Dashboard page</PageWrapper>
    </>
  );
}
