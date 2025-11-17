'use client';

import { Metadata } from '@/_interfaces/metadata';
import { DataTable, DataTableHeaderCell, ColumnDef } from '@repo/ui/data-table';
import { Clipboard } from '@repo/ui/clipboard';
import { format } from 'date-fns';
import { Badge } from '@repo/ui/badge';
import { Typo } from '@repo/ui/typo';
import { ButtonIcon } from '@repo/ui/button-icon';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@repo/ui/dropdown';
import React from 'react';
import MetadataUpdateDrawer from './metadata-update-drawer';
import useMetadata from '@/_hooks/use-metadata';
import { AlertDialog } from '@repo/ui/alert-dialog';
import { Copy, Check, FileEdit, MoreHorizontal, Delete } from 'lucide-react';

const getTypeColor = (type: string) => {
  switch (type) {
    case 'String':
      return 'default';
    case 'Number':
      return 'info';
    case 'Boolean':
      return 'success';
    case 'JSON':
      return 'warning';
    case 'List':
      return 'secondary';
    default:
      return 'default';
  }
};

const columns = ({
  setOpen,
  setMetadata,
}: {
  setOpen: React.Dispatch<React.SetStateAction<string>>;
  setMetadata: React.Dispatch<React.SetStateAction<Metadata | null>>;
}): ColumnDef<Metadata>[] => [
  {
    accessorKey: 'name',
    header: (columnDef) => {
      return (
        <DataTableHeaderCell
          header="Name"
          columnDef={columnDef}
          accessorKey="name"
        />
      );
    },
    cell: ({ getValue, row }) => {
      const { id, key } = row.original;
      const data = getValue() as string;
      return (
        <div className="flex flex-col gap-0.5">
          <Typo className="font-semibold">{data}</Typo>
          <div className="flex gap-0.5">
            <Badge variant={'outline'} size={'xs'} className="cursor-text">
              Key: {key}
            </Badge>
            <Clipboard
              size="xs"
              variant="outline"
              value={key}
              className="opacity-0 group-hover:opacity-100"
              labels={[Copy, Check]}
              iconLabels
              data-dt-bypass-click="true"
            />
          </div>
        </div>
      );
    },
    sortingFn: 'alphanumeric',
  },
  {
    accessorKey: 'type',
    header: 'Type',
    cell: ({ getValue }) => {
      const data = getValue() as string;
      return (
        <Badge
          variant={getTypeColor(data) as any}
          size={'sm'}
          className="cursor-text"
        >
          {data}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'context',
    header: 'Context',
    cell: ({ getValue }) => {
      const data = getValue() as string;
      return (
        <Badge variant={'outline'} size={'sm'} className="cursor-text">
          {data}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'options',
    header: 'Options',
    cell: ({ getValue }) => {
      const data = getValue() as any[];
      return data && data.length > 0 ? (
        <Badge variant={'info'} size={'sm'} className="cursor-text">
          {data.length} option{data.length !== 1 ? 's' : ''}
        </Badge>
      ) : (
        <span className="text-muted-foreground">-</span>
      );
    },
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
      const metadata = row.original;
      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <ButtonIcon
                variant="outline"
                icon={MoreHorizontal}
                size={'sm'}
                data-dt-bypass-click="true"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-56"
              align="end"
              data-dt-bypass-click="true"
            >
              <DropdownMenuGroup>
                <DropdownMenuItem
                  onSelect={() => {
                    setMetadata(metadata);
                    setOpen('edit-metadata-drawer');
                  }}
                >
                  <FileEdit className="mr-2 h-4 w-4" />
                  <span>Edit</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  variant={'destructive'}
                  onSelect={() => {
                    setMetadata(metadata);
                    setOpen('delete-metadata');
                  }}
                >
                  <Delete className="mr-2 h-4 w-4" />
                  <span>Delete</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      );
    },
  },
];

interface Props {
  metadata: Metadata[];
  loading?: boolean;
  actions?: React.ReactNode;
}

export default function MetadataDataTable({
  metadata,
  loading,
  actions,
}: Props) {
  const { deleteMetadata } = useMetadata();
  const [open, setOpen] = React.useState('');
  const [selectedMetadata, setSelectedMetadata] = React.useState<Metadata | null>(
    null,
  );

  return (
    <>
      <DataTable
        loading={loading}
        columns={columns({
          setOpen,
          setMetadata: setSelectedMetadata,
        })}
        data={metadata}
        defaultSorting={[{ id: 'name', desc: false }]}
        searchFields={['id', 'name', 'key']}
        noResultsMessage="No metadata found"
        searchPlaceholder="Search by name or key..."
        actions={actions}
        onRowClick={(_, row) => {
          setSelectedMetadata(row.original);
          setOpen('edit-metadata-drawer');
        }}
      />
      <MetadataUpdateDrawer
        metadata={selectedMetadata as Metadata}
        open={open === 'edit-metadata-drawer'}
        onOpenChange={() => setOpen('')}
      />
      <AlertDialog
        open={open === 'delete-metadata'}
        onOpenChange={() => setOpen('')}
        title="Delete Metadata"
        description={`Are you sure you want to delete ${selectedMetadata?.name}? This action cannot be undone and will remove this metadata field from all ${selectedMetadata?.context.toLowerCase()}s.`}
        idleLabel="Yes, delete"
        actingLabel="Deleting..."
        variant="destructive"
        onClick={async () => {
          if (selectedMetadata) {
            await deleteMetadata(selectedMetadata.id);
            setOpen('');
            setSelectedMetadata(null);
          }
        }}
      />
    </>
  );
}
