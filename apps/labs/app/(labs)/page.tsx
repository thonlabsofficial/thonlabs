import { Metadata } from 'next';
import PageWrapper from './_components/page-wrapper';

export const metadata: Metadata = {
  title: 'Dashboard',
};

export default function Home() {
  return (
    <PageWrapper>
      <div className="px-3 py-2">Dashboard - Home</div>
    </PageWrapper>
  );
}
