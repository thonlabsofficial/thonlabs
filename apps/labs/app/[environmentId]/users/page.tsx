import { Metadata } from 'next';
import PageWrapper from '@/_components/page-wrapper';
import PageHeader from '@/_components/page-header';
import { SquareUser } from 'lucide-react';
import NewUserDialog from '@/_components/new-user-dialog';
import UsersDataTable from '@/_components/users-data-table';
import { fetchUsers } from '@/_services/user-service';
import { Button } from '@repo/ui/button';

export const metadata: Metadata = {
  title: 'Users',
};

export default async function Users({
  params,
}: {
  params: Promise<{ environmentId: string }>;
}) {
  const { environmentId } = await params;
  const { items: users } = await fetchUsers(environmentId);

  return (
    <>
      <PageHeader
        title="Users"
        icon={SquareUser}
        actions={<NewUserDialog trigger={<Button>New User</Button>} />}
      />
      <PageWrapper>
        <UsersDataTable users={users} />
      </PageWrapper>
    </>
  );
}
