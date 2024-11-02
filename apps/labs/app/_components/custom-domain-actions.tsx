import React from 'react';
import useEnvironment from '@/_hooks/use-environment';
import { AlertDialog } from '@repo/ui/alert-dialog';
import { Button } from '@repo/ui/button';
import { Skeleton } from '@repo/ui/skeleton';
import SetCustomDomainDialog from '@/_components/set-custom-domain-dialog';
import { CustomDomainStatus } from '@/_interfaces/environment';

interface Props {
  environmentId: string;
}

export default function CustomDomainActions({ environmentId }: Props) {
  const {
    environment,
    isLoadingEnvironment,
    deleteCustomDomain,
    verifyCustomDomain,
  } = useEnvironment({
    environmentId,
  });
  const [isDeleting, startDeletingTransition] = React.useTransition();

  if (isLoadingEnvironment) {
    return <Skeleton className="!w-44 h-8" />;
  }

  return (
    <>
      {!environment?.customDomain && (
        <SetCustomDomainDialog
          trigger={
            <Button type="button" size={'sm'} disabled={isLoadingEnvironment}>
              Set Custom Domain
            </Button>
          }
          environment={environment}
        />
      )}
      {environment?.customDomain && (
        <>
          {(environment.customDomainStatus === CustomDomainStatus.Failed ||
            environment.customDomainTXTStatus ===
              CustomDomainStatus.Failed) && (
            <Button
              type="button"
              size={'sm'}
              disabled={isLoadingEnvironment}
              onClick={() => verifyCustomDomain(environmentId)}
            >
              Verify Again
            </Button>
          )}
          <AlertDialog
            trigger={
              <Button type="button" size={'sm'} disabled={isLoadingEnvironment}>
                Delete Custom Domain
              </Button>
            }
            title="Delete Custom Domain"
            description="Your environment will no longer be accessible through this domain and will revert to the default domain provided by ThonLabs. Are you sure you want to remove the custom domain?"
            variant="destructive"
            idleLabel="Yes, delete it"
            actingLabel="Deleting..."
            isActing={isDeleting}
            onClick={async () => {
              startDeletingTransition(async () => {
                await deleteCustomDomain(environmentId);
              });
            }}
          />
        </>
      )}
    </>
  );
}
