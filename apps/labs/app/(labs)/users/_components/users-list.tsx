'use client';

import { useUsers } from '@labs/users/_hooks/use-users';
import { User } from '@/(labs)/_interfaces/user';
import { DataTable, DataTableHeaderCell, ColumnDef } from '@repo/ui/data-table';
import { Clipboard } from '@repo/ui/clipboard';
import { format } from 'date-fns';
import { Badge } from '@repo/ui/badge';
import { Typo } from '@repo/ui/typo';
import { Avatar, AvatarFallback } from '@repo/ui/avatar';
import Utils from '@repo/utils';
import { LuCheck, LuCopy, LuMoreHorizontal } from 'react-icons/lu';
import { ButtonIcon } from '@repo/ui/button-icon';

const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'fullName',
    header: (columnDef) => {
      return (
        <DataTableHeaderCell
          header="Name"
          columnDef={columnDef}
          accessorKey="fullName"
        />
      );
    },
    cell: ({ getValue, row }) => {
      const { id } = row.original;

      const data = getValue() as string;
      return (
        <div className="flex gap-1.5">
          <Avatar size={'xs'}>
            <AvatarFallback>
              {Utils.getFirstAndLastInitials(data || '')}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-0.5 mt-px">
            <Typo className="font-semibold">{data}</Typo>
            <div className="flex gap-0.5">
              <Badge variant={'outline'} size={'xs'} className="cursor-text">
                UID: {id.substring(0, 4)}...{id.substring(id.length - 4)}
              </Badge>
              <Clipboard
                size="xs"
                variant="outline"
                value={id}
                labels={[LuCopy, LuCheck]}
                className="opacity-0 group-hover:opacity-100"
              />
            </div>
          </div>
        </div>
      );
    },
    sortingFn: 'alphanumeric',
  },
  {
    accessorKey: 'email',
    header: (columnDef) => {
      return (
        <DataTableHeaderCell
          header="Email"
          columnDef={columnDef}
          accessorKey="email"
        />
      );
    },
    cell: ({ getValue }) => {
      const email = getValue() as string;
      return (
        <div className="flex items-center gap-1">
          {email}
          <Clipboard
            size="xs"
            variant="outline"
            value={email}
            labels={[LuCopy, LuCheck]}
            className="opacity-0 group-hover:opacity-100"
          />
        </div>
      );
    },
    sortingFn: 'alphanumeric',
  },
  {
    accessorKey: 'active',
    header: 'Status',
    cell: ({ getValue }) => {
      const data = getValue() as boolean;
      return (
        <Badge variant={'outline'} size={'sm'} className="cursor-text">
          {data ? 'Active' : 'Inactive'}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'lastSignIn',
    header: (columnDef) => {
      return (
        <DataTableHeaderCell
          header="Last Sign In"
          columnDef={columnDef}
          accessorKey="lastSignIn"
        />
      );
    },
    cell: ({ getValue }) => {
      const data = getValue() as string;
      return data ? format(new Date(data), 'MM/dd/yyyy hh:mm aa') : '-';
    },
    sortingFn: 'datetime',
  },
  {
    accessorKey: 'createdAt',
    header: (columnDef) => {
      return (
        <DataTableHeaderCell
          header="Created At"
          columnDef={columnDef}
          accessorKey="createdAt"
        />
      );
    },
    cell: ({ getValue }) => {
      const data = getValue() as string;
      return format(new Date(data), 'MM/dd/yyyy hh:mm aa');
    },
    sortingFn: 'datetime',
  },
  {
    accessorKey: 'updatedAt',
    header: (columnDef) => {
      return (
        <DataTableHeaderCell
          header="Updated At"
          columnDef={columnDef}
          accessorKey="updatedAt"
        />
      );
    },
    cell: ({ getValue }) => {
      const data = getValue() as string;
      return format(new Date(data), 'MM/dd/yyyy hh:mm aa');
    },
    sortingFn: 'datetime',
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return <ButtonIcon variant="outline" icon={LuMoreHorizontal} />;
    },
  },
];

export default function UsersList() {
  const { users, isLoadingUsers } = useUsers();

  return (
    <DataTable
      loading={isLoadingUsers}
      columns={columns}
      data={users}
      defaultSorting={[{ id: 'fullName', desc: false }]}
      searchFields={['id', 'fullName', 'email']}
      noResultsMessage="No users found"
      searchPlaceholder="Search by name, email or UID..."
    />
  );
}
