'use client';

import { ColumnDef, DataTable, DataTableHeaderCell } from '@repo/ui/data-table';
import { Button } from '@repo/ui/button';
import React from 'react';
import NewOrganizationDrawer from '@/_components/new-organization-drawer';
import { Organization, OrganizationDetail } from '@/_interfaces/organization';
import { Typo } from '@repo/ui/typo';
import { Badge } from '@repo/ui/badge';
import { Clipboard } from '@repo/ui/clipboard';
import {
  Copy,
  Check,
  MoreHorizontal,
  Delete,
  FileEdit,
  FileText,
  ImageUp,
  ImageMinus,
} from 'lucide-react';
import { format } from 'date-fns';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@repo/ui/dropdown';
import { ButtonIcon } from '@repo/ui/button-icon';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import EditOrganizationDrawer from '@/_components/edit-organization-drawer';
import EditOrganizationLogoDrawer from '@/_components/edit-organization-logo-drawer';
import useOrganization from '@/_hooks/use-organization';

const columns = ({
  setOpen,
  setOrganization,
  organizationHook: { deleteOrganizationLogo },
}: {
  setOpen: React.Dispatch<React.SetStateAction<string>>;
  setOrganization: React.Dispatch<React.SetStateAction<Organization | null>>;
  organizationHook: ReturnType<typeof useOrganization>;
}): ColumnDef<Organization>[] => [
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
      const { id } = row.original;

      const data = getValue() as string;
      return (
        <div className="flex flex-col gap-0.5 mt-px">
          <Typo className="font-semibold">{data}</Typo>
          <div className="flex gap-0.5">
            <Badge variant={'outline'} size={'xs'} className="cursor-pointer">
              OID: {id?.substring(0, 4)}...{id?.substring(id.length - 4)}
            </Badge>
            <Clipboard
              size="xs"
              variant="outline"
              value={id}
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
    accessorKey: 'domains',
    header: 'Domains',
    cell: ({ getValue }) => {
      const limit = 1;
      const data = getValue() as Organization['domains'];
      const rest = data.length - limit;

      return data.length > 0 ? (
        <div className="flex gap-0.5">
          {data.slice(0, limit).map((domain) => (
            <Badge
              key={domain.domain}
              variant={'outline'}
              size={'xs'}
              className="cursor-pointer"
            >
              {domain.domain}
            </Badge>
          ))}
          {rest > 0 && (
            <Badge variant={'outline'} size={'xs'} className="cursor-pointer">
              +{rest}
            </Badge>
          )}
        </div>
      ) : (
        <Badge variant={'outline'} size={'xs'} className="cursor-pointer">
          No domains registered
        </Badge>
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
      const organization = row.original;

      return (
        <div className="flex w-full justify-end">
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
                <DropdownMenuItem asChild>
                  <Link
                    href={`/${organization.environmentId}/organizations/${organization.id}`}
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    <span>View info</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onSelect={() => {
                    setOrganization(organization);
                    setOpen('edit-organization-drawer');
                  }}
                >
                  <FileEdit className="mr-2 h-4 w-4" />
                  <span>Edit</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onSelect={() => {
                    setOrganization(organization);
                    setOpen('edit-organization-logo-drawer');
                  }}
                >
                  <ImageUp className="mr-2 h-4 w-4" />
                  <span>
                    {organization.logo ? 'Change Logo' : 'Upload Logo'}
                  </span>
                </DropdownMenuItem>
                {organization.logo && (
                  <DropdownMenuItem
                    onSelect={async () => {
                      await deleteOrganizationLogo(organization.id);
                    }}
                  >
                    <ImageMinus className="mr-2 h-4 w-4" />
                    <span>Delete Logo</span>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem variant={'destructive'}>
                  <Delete className="mr-2 h-4 w-4" />
                  <span>Delete</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];

interface Props {
  organizations: OrganizationDetail[];
}

export default function OrganizationsDataTable({ organizations }: Props) {
  const [open, setOpen] = React.useState<string>('');
  const [organization, setOrganization] = React.useState<Organization | null>(
    null,
  );
  const router = useRouter();
  const { environmentId } = useParams();
  const organizationHook = useOrganization();

  return (
    <>
      <DataTable
        columns={columns({
          setOpen,
          setOrganization,
          organizationHook,
        })}
        data={organizations}
        defaultSorting={[{ id: 'name', desc: false }]}
        searchFields={['id', 'name']}
        noResultsMessage="No organizations found"
        searchPlaceholder="Search by name..."
        actions={
          <NewOrganizationDrawer
            trigger={
              <Button size={'sm'} variant={'outline'}>
                New Organization
              </Button>
            }
          />
        }
        onRowClick={(_, row) => {
          router.push(`/${environmentId}/organizations/${row.original.id}`);
        }}
        onRowHover={(_, row) => {
          router.prefetch(`/${environmentId}/organizations/${row.original.id}`);
        }}
      />

      <EditOrganizationDrawer
        organization={organization as Organization}
        open={open === 'edit-organization-drawer'}
        onOpenChange={() => setOpen('')}
      />
      <EditOrganizationLogoDrawer
        organization={organization as Organization}
        open={open === 'edit-organization-logo-drawer'}
        onOpenChange={() => setOpen('')}
      />
    </>
  );
}
