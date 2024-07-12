import { Metadata } from 'next';
import PageWrapper from '@labs/_components/page-wrapper';
import PageHeader from '@labs/_components/page-header';

export const metadata: Metadata = {
  title: 'Users',
};

export default function Users() {
  return (
    <>
      <PageHeader title="Users" />
      <PageWrapper>Users page</PageWrapper>
    </>
  );
}
