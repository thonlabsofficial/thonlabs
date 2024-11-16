import React from 'react';
import useEnvironment from '@/_hooks/use-environment';
import { Button } from '@repo/ui/button';
import { Skeleton } from '@repo/ui/skeleton';
import { EmailDomainStatus } from '@/_interfaces/email-template-domain';
import useEmailDomain from '@/_hooks/use-email-domain';
import EmailDomainChangeDialog from '@/_components/email-domain-change-dialog';

interface Props {
  environmentId: string;
}

export default function EmailDomainActions({ environmentId }: Props) {
  const { environment, isLoadingEnvironment } = useEnvironment({
    environmentId,
  });
  const { emailTemplateDomain } = useEmailDomain();

  if (isLoadingEnvironment) {
    return <Skeleton className="!w-44 h-8" />;
  }

  return (
    <>
      {emailTemplateDomain.status !== EmailDomainStatus.Verifying && (
        <Button type="button" size={'sm'} disabled={isLoadingEnvironment}>
          Verify Again
        </Button>
      )}
      <EmailDomainChangeDialog
        trigger={
          <Button type="button" size={'sm'} disabled={isLoadingEnvironment}>
            Change Email Domain
          </Button>
        }
        environment={environment}
      />
    </>
  );
}
