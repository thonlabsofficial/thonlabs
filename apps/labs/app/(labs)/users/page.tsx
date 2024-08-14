import { Metadata } from 'next';
import PageWrapper from '@labs/_components/page-wrapper';
import PageHeader from '@labs/_components/page-header';
import { BsPersonFill } from 'react-icons/bs';
import UsersList from '@labs/users/_components/users-list';

export const metadata: Metadata = {
  title: 'Users',
};

export default function Users() {
  return (
    <>
      <PageHeader title="Users" icon={BsPersonFill} />
      <PageWrapper>
        <UsersList />
      </PageWrapper>
    </>
  );
}
