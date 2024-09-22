'use client';

import { useUsers } from '@/(labs)/_hooks/use-users';
import { User } from '@/(labs)/_interfaces/user';
import { DataTable, DataTableHeaderCell, ColumnDef } from '@repo/ui/data-table';
import { Clipboard } from '@repo/ui/clipboard';
import { format } from 'date-fns';
import { Badge } from '@repo/ui/badge';
import { Typo } from '@repo/ui/typo';
import { Avatar, AvatarFallback } from '@repo/ui/avatar';
import Utils from '@repo/utils';
import {
  LuCheck,
  LuCheckCircle,
  LuCopy,
  LuFileEdit,
  LuMails,
  LuMoreHorizontal,
  LuTrash2,
  LuView,
  LuXCircle,
} from 'react-icons/lu';
import { ButtonIcon } from '@repo/ui/button-icon';
import InfoUserDrawer from './info-user-drawer';
import { Button } from '@repo/ui/button';
import NewUserDialog from './new-user-dialog';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@repo/ui/dropdown';
import React from 'react';
import useUserSession from '@/(labs)/_hooks/use-user-session';
import EditUserDrawer from './edit-user-drawer';
import useUser from '@/(labs)/_hooks/use-user';
import { AlertDialog } from '@repo/ui/alert-dialog';
import { useToast } from '@repo/ui/hooks/use-toast';

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
            toast({ title: 'Updating status...' });
            await updateStatus(user.id, { active: !user.active });
          }}
        >
          {user.active ? (
            <>
              <LuXCircle className="mr-2 h-4 w-4" />
              <span>Deactivate</span>
            </>
          ) : (
            <>
              <LuCheckCircle className="mr-2 h-4 w-4" />
              <span>Activate</span>
            </>
          )}
        </DropdownMenuItem>
      );
    case 'resend-invitation':
      return (
        <DropdownMenuItem
          onSelect={async () => {
            toast({ title: 'Resending invitation...' });
            await resendInvitation(user.id);
          }}
        >
          <LuMails className="mr-2 h-4 w-4" />
          <span>Resend invitation</span>
        </DropdownMenuItem>
      );
  }
}

const columns = ({
  setOpen,
  setUser,
  authUser,
}: {
  setOpen: React.Dispatch<React.SetStateAction<string>>;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  authUser: User;
}): ColumnDef<User>[] => [
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
                UID: {id?.substring(0, 4)}...{id?.substring(id.length - 4)}
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
        <Badge
          variant={data ? 'success' : 'destructive'}
          size={'sm'}
          className="cursor-text"
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
          className="cursor-text"
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
    id: 'actions',
    cell: ({ row }) => {
      const user = row.original;
      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <ButtonIcon variant="outline" icon={LuMoreHorizontal} />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <DropdownMenuGroup>
                <DropdownMenuItem
                  onSelect={() => {
                    setUser(user);
                    setOpen('info-user-drawer');
                  }}
                >
                  <LuView className="mr-2 h-4 w-4" />
                  <span>View info</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onSelect={() => {
                    setUser(user);
                    setOpen('edit-user-drawer');
                  }}
                >
                  <LuFileEdit className="mr-2 h-4 w-4" />
                  <span>Edit</span>
                </DropdownMenuItem>
                {user.active && !user.emailConfirmed && (
                  <DropdownMenuItemAction
                    type="resend-invitation"
                    user={user}
                  />
                )}
                {authUser?.id !== user.id && (
                  <DropdownMenuItemAction type="update-status" user={user} />
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
                      <LuTrash2 className="mr-2 h-4 w-4" />
                      <span>Delete</span>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      );
    },
  },
];

export default function UsersList() {
  const { users, isLoadingUsers } = useUsers();
  const { exclude } = useUser();
  const [open, setOpen] = React.useState('');
  const [user, setUser] = React.useState<User | null>(null);
  const { user: authUser } = useUserSession();

  return (
    <>
      <DataTable
        loading={isLoadingUsers}
        columns={columns({
          setOpen,
          setUser,
          authUser: authUser as User,
        })}
        data={users}
        defaultSorting={[{ id: 'fullName', desc: false }]}
        searchFields={['id', 'fullName', 'email']}
        noResultsMessage="No users found"
        searchPlaceholder="Search by name, email or UID..."
        actions={
          <NewUserDialog trigger={<Button size={'sm'}>New User</Button>} />
        }
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
        title="Delete User"
        description={`Are you sure you want to delete ${user?.fullName}? This action cannot be undone.`}
        idleLabel="Yes, delete"
        actingLabel="Deleting..."
        variant="destructive"
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
