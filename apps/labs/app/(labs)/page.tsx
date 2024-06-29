import { Metadata } from 'next';
import PageWrapper from './_components/page-wrapper';

export const metadata: Metadata = {
  title: 'Dashboard',
};

export default function Home() {
  return <PageWrapper>Dashboard - Home</PageWrapper>;
}
