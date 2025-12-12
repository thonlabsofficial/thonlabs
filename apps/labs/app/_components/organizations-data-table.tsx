'use client';

import { ColumnDef, DataTable, DataTableHeaderCell } from '@repo/ui/data-table';
import React from 'react';
import { Organization } from '@/_interfaces/organization';
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
  ToggleLeft,
  ToggleRight,
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
import OrganizationEditDrawer from '@/_components/organization-edit-drawer';
import OrganizationEditLogoDrawer from '@/_components/organization-edit-logo-drawer';
import useOrganization from '@/_hooks/use-organization';
import { ImagePreview } from '@repo/ui/image-preview';
import OrganizationDeleteAlertDialog from '@/_components/organization-delete-alert-dialog';
import { useToast } from '@repo/ui/hooks/use-toast';
import { useOrganizations } from '@/_hooks/use-organizations';
import OrganizationInfoDrawer from '@/_components/organization-info-drawer';
import { AlertDialog } from '@repo/ui/alert-dialog';

const columns = ({
  setOpen,
  setOrganization,
  organizationHook: { updateOrganizationStatus },
  toast,
}: {
  setOpen: React.Dispatch<React.SetStateAction<string>>;
  setOrganization: React.Dispatch<React.SetStateAction<Organization | null>>;
  organizationHook: ReturnType<typeof useOrganization>;
  toast: ReturnType<typeof useToast>['toast'];
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
      const { id, logo } = row.original;

      const data = getValue() as string;
      return (
        <div className="flex gap-1">
          <ImagePreview src={logo} className="min-w-24 w-auto h-14">
            {!logo && 'No Logo'}
          </ImagePreview>
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
                  onSelect={async () => {
                    toast({ description: 'Updating status...' });
                    await updateOrganizationStatus(organization.id, {
                      active: !organization.active,
                    });
                  }}
                >
                  {organization.active ? (
                    <>
                      <ToggleLeft className="mr-2 h-4 w-4" />
                      <span>Deactivate</span>
                    </>
                  ) : (
                    <>
                      <ToggleRight className="mr-2 h-4 w-4" />
                      <span>Activate</span>
                    </>
                  )}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
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
                      setOrganization(organization);
                      setOpen('delete-organization-logo');
                    }}
                  >
                    <ImageMinus className="mr-2 h-4 w-4" />
                    <span>Delete Logo</span>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  variant={'destructive'}
                  onSelect={() => {
                    setOrganization(organization);
                    setOpen('delete-organization');
                  }}
                >
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
  actions?: React.ReactNode;
}

export default function OrganizationsDataTable({ actions }: Props) {
  const { organizations: organizationsData, isLoadingOrganizations } =
    useOrganizations();
  const [open, setOpen] = React.useState<string>('');
  const [organization, setOrganization] = React.useState<Organization | null>(
    null,
  );
  const router = useRouter();
  const organizationHook = useOrganization();
  const { toast } = useToast();

  /*
    This memo is necessary to ensure any changes happened
    on user data e.g.: from "edit user" will be reflected
    on the "view user" dialog and others.
  */
  const selectedOrganization = React.useMemo(() => {
    if (!organization) {
      return null;
    }

    return (
      organizationsData.find((o) => o.id === organization.id) || organization
    );
  }, [organization, organizationsData]);

  return (
    <>
      <DataTable
        actions={actions}
        columns={columns({
          setOpen,
          setOrganization,
          organizationHook,
          toast,
        })}
        data={organizationsData}
        loading={isLoadingOrganizations}
        defaultSorting={[{ id: 'name', desc: false }]}
        searchFields={['id', 'name']}
        noResultsMessage="No organizations found"
        searchPlaceholder="Search by name..."
        onRowClick={(_, row) => {
          setOrganization(row.original);
          setOpen('info-organization-drawer');
        }}
      />

      <OrganizationInfoDrawer
        organization={selectedOrganization as Organization}
        open={open === 'info-organization-drawer'}
        onOpenChange={() => setOpen('')}
      />
      <OrganizationEditDrawer
        organization={selectedOrganization as Organization}
        open={open === 'edit-organization-drawer'}
        onOpenChange={() => setOpen('')}
      />
      <OrganizationEditLogoDrawer
        organization={selectedOrganization as Organization}
        open={open === 'edit-organization-logo-drawer'}
        onOpenChange={() => setOpen('')}
      />
      <OrganizationDeleteAlertDialog
        open={open === 'delete-organization'}
        setOpen={setOpen}
        organization={selectedOrganization as Organization}
      />
      <AlertDialog
        open={open === 'delete-organization-logo'}
        title="Delete Logo"
        description="Are you sure you want to delete the logo? No worries, you can always upload a new one later."
        idleLabel="Yes, delete"
        actingLabel="Deleting..."
        variant="destructive"
        onClick={async () => {
          if (selectedOrganization) {
            await organizationHook.deleteOrganizationLogo(
              selectedOrganization.id,
            );
            setOpen('');
            setOrganization(null);
          }
        }}
        isActing={organizationHook.handlingOrganization === 'deleting-logo'}
      />
    </>
  );
}
