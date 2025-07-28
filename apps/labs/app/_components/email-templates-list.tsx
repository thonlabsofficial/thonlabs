'use client';

import { Badge } from '@repo/ui/badge';
import { ButtonIcon } from '@repo/ui/button-icon';
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
  DropdownMenuTrigger,
} from '@repo/ui/dropdown';
import { useToast } from '@repo/ui/hooks/use-toast';
import { format } from 'date-fns';
import { CheckCircle, FileEdit, MoreHorizontal, XCircle } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import EmailTemplatesConstants from '@/_constants/email-templates-constants';
import useEmailTemplate from '@/_hooks/use-email-template';
import useUserSession from '@/_hooks/use-user-session';
import type { EmailTemplate } from '@/_interfaces/email-template';

function DropdownMenuItemAction({
  type,
  emailTemplate,
}: {
  type: 'update-status';
  emailTemplate: EmailTemplate;
}) {
  const { updateStatus } = useEmailTemplate();
  const { toast } = useToast();

  switch (type) {
    case 'update-status':
      return (
        <DropdownMenuItem
          onSelect={async () => {
            toast({ description: 'Updating status...' });
            await updateStatus(emailTemplate.id, {
              enabled: !emailTemplate.enabled,
            });
          }}
        >
          {emailTemplate.enabled ? (
            <>
              <XCircle className='mr-2 h-4 w-4' />
              <span>Deactivate</span>
            </>
          ) : (
            <>
              <CheckCircle className='mr-2 h-4 w-4' />
              <span>Activate</span>
            </>
          )}
        </DropdownMenuItem>
      );
  }
}

const columns: ColumnDef<EmailTemplate>[] = [
  {
    accessorKey: 'name',
    header: (columnDef) => {
      return (
        <DataTableHeaderCell
          header='Name'
          columnDef={columnDef}
          accessorKey='name'
        />
      );
    },
    sortingFn: 'alphanumeric',
  },
  {
    accessorKey: 'enabled',
    header: 'Status',
    cell: ({ getValue }) => {
      const data = getValue() as boolean;
      return (
        <Badge
          variant={data ? 'success' : 'destructive'}
          size={'sm'}
          className='cursor-pointer'
        >
          {data ? 'Active' : 'Inactive'}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'updatedAt',
    header: (columnDef) => {
      return (
        <DataTableHeaderCell
          header='Updated At'
          columnDef={columnDef}
          accessorKey='updatedAt'
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
    id: 'actions',
    cell: ({ row }) => {
      const emailTemplate = row.original;
      return (
        <div className='flex w-full justify-end'>
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
              data-dt-bypass-click='true'
              className='w-56'
              align='end'
            >
              <DropdownMenuGroup>
                <DropdownMenuItem asChild>
                  <Link
                    href={`/${emailTemplate.environmentId}/email-templates/${emailTemplate.id}`}
                  >
                    <FileEdit className='mr-2 h-4 w-4' />
                    <span>Edit</span>
                  </Link>
                </DropdownMenuItem>
                {EmailTemplatesConstants.allowedStatusChange.includes(
                  emailTemplate.type
                ) && (
                  <DropdownMenuItemAction
                    type='update-status'
                    emailTemplate={emailTemplate}
                  />
                )}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];

interface Props {
  emailTemplates: EmailTemplate[];
}

export default function EmailTemplatesList({ emailTemplates }: Props) {
  const { environmentId } = useUserSession();
  const router = useRouter();

  return (
    <DataTable
      columns={columns}
      data={emailTemplates}
      defaultSorting={[{ id: 'name', desc: false }]}
      searchFields={['name']}
      noResultsMessage='No email templates found'
      searchPlaceholder='Search by name...'
      onRowHover={(_, row) => {
        router.prefetch(`/${environmentId}/email-templates/${row.original.id}`);
      }}
      onRowClick={(_, row) => {
        router.push(`/${environmentId}/email-templates/${row.original.id}`);
      }}
    />
  );
}
