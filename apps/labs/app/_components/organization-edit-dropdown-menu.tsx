'use client';

import { ButtonIcon } from '@repo/ui/button-icon';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@repo/ui/dropdown';
import { useToast } from '@repo/ui/hooks/use-toast';
import {
  Delete,
  ImageUp,
  MoreHorizontal,
  ToggleLeft,
  ToggleRight,
} from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import React from 'react';
import OrganizationEditLogoDrawer from '@/_components/organization-edit-logo-drawer';
import useOrganization from '@/_hooks/use-organization';
import type { Organization } from '@/_interfaces/organization';
import OrganizationDeleteAlertDialog from './organization-delete-alert-dialog';
import OrganizationDeleteLogo from './organization-delete-logo';

interface Props {
  organization: Organization;
}

export default function OrganizationEditDropdownMenu({ organization }: Props) {
  const [open, setOpen] = React.useState('');
  const router = useRouter();
  const { environmentId } = useParams();
  const { updateOrganizationStatus } = useOrganization();
  const { toast } = useToast();

  return (
    <>
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
              onSelect={async () => {
                toast({ description: 'Updating status...' });
                await updateOrganizationStatus(organization.id, {
                  active: !organization.active,
                });
              }}
            >
              {organization.active ? (
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
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onSelect={() => {
                setOpen('edit-organization-logo-drawer');
              }}
            >
              <ImageUp className='mr-2 h-4 w-4' />
              <span>{organization.logo ? 'Change Logo' : 'Upload Logo'}</span>
            </DropdownMenuItem>
            {organization.logo && (
              <OrganizationDeleteLogo organizationId={organization.id} />
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              variant={'destructive'}
              onSelect={() => {
                setOpen('delete-organization');
              }}
            >
              <Delete className='mr-2 h-4 w-4' />
              <span>Delete</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <OrganizationEditLogoDrawer
        open={open === 'edit-organization-logo-drawer'}
        onOpenChange={() => setOpen('')}
        organization={organization}
      />
      <OrganizationDeleteAlertDialog
        open={open === 'delete-organization'}
        setOpen={setOpen}
        organization={organization}
        onFinish={() => {
          router.push(`/${environmentId}/organizations`);
        }}
      />
    </>
  );
}
