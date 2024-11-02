import { Metadata } from 'next';
import PageWrapper from '@/_components/page-wrapper';
import PageHeader from '@/_components/page-header';
import { LayoutDashboard } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Dashboard',
};

export default function Home() {
  return (
    <>
      <PageHeader title="Dashboard" icon={LayoutDashboard} />
      <PageWrapper withContainer={false}>Dashboard page</PageWrapper>
    </>
  );
}
