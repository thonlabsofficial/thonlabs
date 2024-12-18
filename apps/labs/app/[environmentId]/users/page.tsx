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

interface Props {
  params: { environmentId: string };
}

export default async function Users({ params }: Props) {
  const { items: users } = await fetchUsers(params.environmentId);

  return (
    <>
      <PageHeader title="Users" icon={SquareUser} />
      <PageWrapper withContainer={false}>
        <UsersDataTable
          users={users}
          actions={
            <NewUserDialog
              trigger={
                <Button size={'sm'} variant={'outline'}>
                  New User
                </Button>
              }
            />
          }
        />
      </PageWrapper>
    </>
  );
}
