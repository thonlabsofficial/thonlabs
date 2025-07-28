'use client';

import { AlertDialog } from '@repo/ui/alert-dialog';
import { Avatar, AvatarFallback } from '@repo/ui/avatar';
import { Badge } from '@repo/ui/badge';
import { ButtonIcon } from '@repo/ui/button-icon';
import { Clipboard } from '@repo/ui/clipboard';
import {
  type ColumnDef,
  DataTable,
  DataTableHeaderCell,
} from '@repo/ui/data-table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@repo/ui/dropdown';
import { useToast } from '@repo/ui/hooks/use-toast';
import { Typo } from '@repo/ui/typo';
import Utils from '@repo/utils';
import { format } from 'date-fns';
import {
  Building,
  Check,
  Copy,
  Delete,
  FileEdit,
  FileText,
  Mails,
  MoreHorizontal,
  ToggleLeft,
  ToggleRight,
} from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import useUser from '@/_hooks/use-user';
import useUserSession from '@/_hooks/use-user-session';
import type { Organization } from '@/_interfaces/organization';
import type { User } from '@/_interfaces/user';
import EditUserDrawer from './edit-user-drawer';
import InfoUserDrawer from './info-user-drawer';

function DropdownMenuItemAction({
  type,
  user,
}: {
  type: 'update-status' | 'resend-invitation';
  user: User;
}) {
  const { updateStatus, resendInvitation } = useUser();
  const { toast } = useToast();

  switch (type) {
    case 'update-status':
      return (
        <DropdownMenuItem
          onSelect={async () => {
            toast({ description: 'Updating status...' });
            await updateStatus(user.id, { active: !user.active });
          }}
        >
          {user.active ? (
            <>
              <ToggleLeft className='mr-2 h-4 w-4' />
              <span>Deactivate</span>
            </>
          ) : (
            <>
              <ToggleRight className='mr-2 h-4 w-4' />
              <span>Activate</span>
            </>
          )}
        </DropdownMenuItem>
      );
    case 'resend-invitation':
      return (
        <DropdownMenuItem
          onSelect={async () => {
            toast({
              description: `${user.invitedAt ? 'Resending' : 'Sending'} invitation...`,
            });
            await resendInvitation(user.id);
          }}
        >
          <Mails className='mr-2 h-4 w-4' />
          <span>{user.invitedAt ? 'Resend' : 'Send'} invitation</span>
        </DropdownMenuItem>
      );
  }
}

const columns = ({
  setOpen,
  setUser,
  authUser,
  hideFields,
}: {
  setOpen: React.Dispatch<React.SetStateAction<string>>;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  authUser: User;
  hideFields?: string[];
}): ColumnDef<User>[] => [
  {
    accessorKey: 'fullName',
    header: (columnDef) => {
      return (
        <DataTableHeaderCell
          header='Name'
          columnDef={columnDef}
          accessorKey='fullName'
        />
      );
    },
    cell: ({ getValue, row }) => {
      const { id } = row.original;

      const data = getValue() as string;
      return (
        <div className='flex gap-1.5'>
          <Avatar size={'xs'}>
            <AvatarFallback>
              {Utils.getFirstAndLastInitials(data || '')}
            </AvatarFallback>
          </Avatar>
          <div className='mt-px flex flex-col gap-0.5'>
            <Typo className='font-semibold'>{data}</Typo>
            <div className='flex gap-0.5'>
              <Badge variant={'outline'} size={'xs'} className='cursor-text'>
                UID: {id?.substring(0, 4)}...{id?.substring(id.length - 4)}
              </Badge>
              <Clipboard
                size='xs'
                variant='outline'
                value={id}
                className='opacity-0 group-hover:opacity-100'
                labels={[Copy, Check]}
                iconLabels
                data-dt-bypass-click='true'
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
          header='Email'
          columnDef={columnDef}
          accessorKey='email'
        />
      );
    },
    cell: ({ getValue }) => {
      const email = getValue() as string;
      return (
        <div className='flex items-center gap-1'>
          {email}
          <Clipboard
            size='xs'
            variant='outline'
            value={email}
            labels={[Copy, Check]}
            iconLabels
            className='opacity-0 group-hover:opacity-100'
            data-dt-bypass-click='true'
          />
        </div>
      );
    },
    sortingFn: 'alphanumeric',
  },
  ...(hideFields?.includes('organization')
    ? []
    : ([
        {
          accessorKey: 'organization',
          header: 'Organization',
          cell: ({ getValue }) => {
            const data = getValue() as Organization;
            return data?.name || '-';
          },
        },
      ] as ColumnDef<User>[])),
  {
    accessorKey: 'active',
    header: 'Status',
    cell: ({ getValue }) => {
      const data = getValue() as boolean;
      return (
        <Badge
          variant={data ? 'success' : 'destructive'}
          size={'sm'}
          className='cursor-text'
        >
          {data ? 'Active' : 'Inactive'}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'emailConfirmed',
    header: 'Email Confirmed',
    cell: ({ getValue }) => {
      const data = getValue() as boolean;
      return (
        <Badge
          variant={data ? 'success' : 'destructive'}
          size={'sm'}
          className='cursor-text'
        >
          {data ? 'Confirmed' : 'Pending'}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'lastSignIn',
    header: (columnDef) => {
      return (
        <DataTableHeaderCell
          header='Last Sign In'
          columnDef={columnDef}
          accessorKey='lastSignIn'
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
          header='Created At'
          columnDef={columnDef}
          accessorKey='createdAt'
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
      const user = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <ButtonIcon
              variant='outline'
              icon={MoreHorizontal}
              size={'sm'}
              data-dt-bypass-click='true'
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className='w-56'
            align='end'
            data-dt-bypass-click='true'
          >
            <DropdownMenuGroup>
              <DropdownMenuItem
                onSelect={() => {
                  setUser(user);
                  setOpen('info-user-drawer');
                }}
              >
                <FileText className='mr-2 h-4 w-4' />
                <span>View info</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={() => {
                  setUser(user);
                  setOpen('edit-user-drawer');
                }}
              >
                <FileEdit className='mr-2 h-4 w-4' />
                <span>Edit</span>
              </DropdownMenuItem>
              {user.active && !user.emailConfirmed && !user.lastSignIn && (
                <DropdownMenuItemAction type='resend-invitation' user={user} />
              )}
              {authUser?.id !== user.id && (
                <DropdownMenuItemAction type='update-status' user={user} />
              )}
              {!hideFields?.includes('organization') && user.organization && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link
                      href={`/${user.environmentId}/organizations/${user.organization.id}`}
                    >
                      <Building className='mr-2 h-4 w-4' />
                      <span>View organization</span>
                    </Link>
                  </DropdownMenuItem>
                </>
              )}
              {authUser?.id !== user.id && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    variant={'destructive'}
                    onSelect={() => {
                      setUser(user);
                      setOpen('delete-user');
                    }}
                  >
                    <Delete className='mr-2 h-4 w-4' />
                    <span>Delete</span>
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

interface Props {
  users: User[];
  loading?: boolean;
  hideFields?: string[];
  actions?: React.ReactNode;
}

export default function UsersDataTable({
  users,
  loading,
  hideFields,
  actions,
}: Props) {
  const { exclude } = useUser();
  const [open, setOpen] = React.useState('');
  const [user, setUser] = React.useState<User | null>(null);
  const { user: authUser } = useUserSession();

  return (
    <>
      <DataTable
        loading={loading}
        columns={columns({
          setOpen,
          setUser,
          authUser: authUser as User,
          hideFields,
        })}
        data={users}
        defaultSorting={[{ id: 'fullName', desc: false }]}
        searchFields={['id', 'fullName', 'email']}
        noResultsMessage='No users found'
        searchPlaceholder='Search by name, email or UID...'
        actions={actions}
        onRowClick={(_, row) => {
          setUser(row.original);
          setOpen('info-user-drawer');
        }}
      />
      <InfoUserDrawer
        user={user as User}
        open={open === 'info-user-drawer'}
        onOpenChange={() => setOpen('')}
      />
      <EditUserDrawer
        user={user as User}
        open={open === 'edit-user-drawer'}
        onOpenChange={() => setOpen('')}
      />
      <AlertDialog
        open={open === 'delete-user'}
        onOpenChange={() => setOpen('')}
        title='Delete User'
        description={`Are you sure you want to delete ${user?.fullName}? This action cannot be undone.`}
        idleLabel='Yes, delete'
        actingLabel='Deleting...'
        variant='destructive'
        onClick={async () => {
          if (user) {
            await exclude(user.id);
            setOpen('');
            setUser(null);
          }
        }}
      />
    </>
  );
}
