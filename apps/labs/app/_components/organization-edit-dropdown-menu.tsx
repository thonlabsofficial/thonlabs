'use client';

import React from 'react';
import { MoreHorizontal, Delete } from 'lucide-react';
import { ButtonIcon } from '@repo/ui/button-icon';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@repo/ui/dropdown';
import OrganizationDeleteLogo from './organization-delete-logo';
import { Organization } from '@/_interfaces/organization';
import { AlertDialog } from '@repo/ui/alert-dialog';
import useOrganization from '@/_hooks/use-organization';
import OrganizationDeleteAlertDialog from './organization-delete-alert-dialog';
import { useParams, useRouter } from 'next/navigation';

interface Props {
  organization: Organization;
}

export default function OrganizationEditDropdownMenu({ organization }: Props) {
  const [open, setOpen] = React.useState('');
  const router = useRouter();
  const { environmentId } = useParams();

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
            {organization.logo && (
              <>
                <OrganizationDeleteLogo organizationId={organization.id} />
                <DropdownMenuSeparator />
              </>
            )}
            <DropdownMenuItem
              variant={'destructive'}
              onSelect={() => {
                setOpen('delete-organization');
              }}
            >
              <Delete className="mr-2 h-4 w-4" />
              <span>Delete</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

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
