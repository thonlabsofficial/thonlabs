import { Metadata } from 'next';
import PageWrapper from '@labs/_components/page-wrapper';
import PageHeader from '@labs/_components/page-header';
import UsersList from '@/(labs)/[environmentId]/users/_components/users-list';
import { LuUser } from 'react-icons/lu';

export const metadata: Metadata = {
  title: 'Users',
};

export default async function Users() {
  return (
    <>
      <PageHeader title="Users" icon={LuUser} />
      <PageWrapper withContainer={false}>
        <UsersList />
      </PageWrapper>
    </>
  );
}
