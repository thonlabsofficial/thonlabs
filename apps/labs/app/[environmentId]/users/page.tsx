import { Metadata } from 'next';
import PageWrapper from '@/_components/page-wrapper';
import PageHeader from '@/_components/page-header';
import { PlusIcon, SquareUser } from 'lucide-react';
import NewUserDialog from '@/_components/new-user-dialog';
import UsersDataTable from '@/_components/users-data-table';
import { ButtonIcon } from '@repo/ui/button-icon';

export const metadata: Metadata = {
  title: 'Users',
};

export default async function Users() {
  return (
    <>
      <PageHeader
        title="Users"
        description="The list of all users in this environment"
        icon={SquareUser}
      />
      <PageWrapper>
        <UsersDataTable
          actions={
            <NewUserDialog
              trigger={
                <ButtonIcon variant="outline" icon={PlusIcon} size="sm" />
              }
            />
          }
        />
      </PageWrapper>
    </>
  );
}
