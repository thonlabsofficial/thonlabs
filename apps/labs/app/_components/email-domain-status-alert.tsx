'use client';

import React from 'react';
import useEnvironment from '@/_hooks/use-environment';
import { typoVariants } from '@repo/ui/typo';
import { Alert, AlertDescription, AlertTitle } from '@repo/ui/alert';
import { EmailDomainStatus } from '@/_interfaces/email-template-domain';
import Link from 'next/link';
import useEmailDomain from '@/_hooks/use-email-domain';
import { useParams } from 'next/navigation';
import { Globe } from 'lucide-react';
import PageWrapper from '@/_components/page-wrapper';

export default function EmailDomainStatusAlert() {
  const { environmentId } = useParams();
  const { isLoadingEnvironment } = useEnvironment({
    environmentId: environmentId as string,
  });
  const { emailTemplateDomain } = useEmailDomain();

  function isEmailDomainVerifying() {
    return emailTemplateDomain?.status === EmailDomainStatus.Verifying;
  }

  function isEmailDomainFailed() {
    if (isEmailDomainVerifying()) {
      return false;
    }

    return emailTemplateDomain?.status === EmailDomainStatus.Failed;
  }

  return (
    !isLoadingEnvironment && (
      <>
        {isEmailDomainVerifying() && (
          <PageWrapper withContainer={false} className="mt-2 pb-0">
            <Alert icon={Globe} variant={'info'}>
              <AlertTitle>Email Domain Status</AlertTitle>
              <AlertDescription>
                We're currently verifying your email domain. For more details
                see{' '}
                <Link
                  className={typoVariants({ variant: 'codeLink' })}
                  href={`/${environmentId}/domains`}
                >
                  domains page
                </Link>
                .
              </AlertDescription>
            </Alert>
          </PageWrapper>
        )}
        {isEmailDomainFailed() && (
          <PageWrapper withContainer={false} className="mt-2 pb-0">
            <Alert icon={Globe} variant={'destructive'}>
              <AlertTitle>Email Domain Status</AlertTitle>
              <AlertDescription>
                We could not verify the email domain. For more details and
                instructions see{' '}
                <Link
                  className={typoVariants({ variant: 'codeLink' })}
                  href={`/${environmentId}/domains`}
                >
                  domains page
                </Link>
                .
              </AlertDescription>
            </Alert>
          </PageWrapper>
        )}
      </>
    )
  );
}
