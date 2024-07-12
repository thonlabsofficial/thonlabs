import { Metadata } from 'next';
import PageWrapper from './_components/page-wrapper';
import { Typo } from '@repo/ui/typo';
import PageHeader from './_components/page-header';

export const metadata: Metadata = {
  title: 'Dashboard',
};

export default function Home() {
  return (
    <>
      <PageHeader title="Dashboard" />
      <PageWrapper>Dashboard page</PageWrapper>
    </>
  );
}
