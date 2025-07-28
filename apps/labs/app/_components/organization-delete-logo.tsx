'use client';

import { DropdownMenuItem } from '@repo/ui/dropdown';
import { ImageMinus } from 'lucide-react';
import useOrganization from '@/_hooks/use-organization';

export default function OrganizationDeleteLogo({
  organizationId,
}: {
  organizationId: string;
}) {
  const { deleteOrganizationLogo } = useOrganization();

  return (
    <DropdownMenuItem
      onSelect={async () => {
        await deleteOrganizationLogo(organizationId);
      }}
    >
      <ImageMinus className='mr-2 h-4 w-4' />
      <span>Delete Logo</span>
    </DropdownMenuItem>
  );
}
