'use client';

import { ColumnDef } from '@tanstack/react-table';
import { useUsers } from '@labs/users/_hooks/use-users';
import { User } from '@/(labs)/_interfaces/user';
import { DataTable } from './data-table';

const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'fullName',
    header: 'Name',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'active',
    header: 'Status',
  },
  {
    accessorKey: 'lastSignIn',
    header: 'Last Sign In',
    cell: ({ getValue }) => {
      const lastSignIn = getValue();
      console.log(lastSignIn);
    },
  },
  {
    accessorKey: 'createdAt',
    header: 'Created At',
  },
  {
    accessorKey: 'updatedAt',
    header: 'Updated At',
  },
];

export default function UsersList() {
  const { users, isLoadingUsers } = useUsers();

  return (
    <>
      {isLoadingUsers ? (
        'Loading...'
      ) : (
        <DataTable
          columns={columns}
          data={users}
          noResultsMessage="No users found"
        />
      )}
    </>
  );
}
