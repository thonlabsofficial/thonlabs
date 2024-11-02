import { Metadata } from 'next';
import PageWrapper from '@/_components/page-wrapper';
import PageHeader from '@/_components/page-header';
import UsersList from '@/_components/users-list';
import { SquareUser } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Users',
};

export default async function Users() {
  return (
    <>
      <PageHeader title="Users" icon={SquareUser} />
      <PageWrapper withContainer={false}>
        <UsersList />
      </PageWrapper>
    </>
  );
}
