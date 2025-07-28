'use client';

import { AlertDialog } from '@repo/ui/alert-dialog';
import useOrganization from '@/_hooks/use-organization';
import type { Organization } from '@/_interfaces/organization';

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<string>>;
  organization: Organization;
  onFinish?: () => void;
}

export default function OrganizationDeleteAlertDialog({
  open,
  setOpen,
  organization,
  onFinish,
}: Props) {
  const { deleteOrganization } = useOrganization();

  return (
    <AlertDialog
      open={open}
      onOpenChange={() => setOpen('')}
      title='Delete Organization'
      description={`Are you sure you want to delete ${organization?.name}? This action cannot be undone.`}
      idleLabel='Yes, delete'
      actingLabel='Deleting...'
      variant='destructive'
      onClick={async () => {
        try {
          await deleteOrganization(organization.id);
          setOpen('');
          onFinish?.();
        } catch {}
      }}
    />
  );
}
