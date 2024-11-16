import React from 'react';
import useEnvironment from '@/_hooks/use-environment';
import { Badge } from '@repo/ui/badge';
import { Card } from '@repo/ui/card';
import { cn } from '@repo/ui/core/utils';
import { Typo, typoVariants } from '@repo/ui/typo';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@repo/ui/table';
import { Alert } from '@repo/ui/alert';
import { Check, Loader, X } from 'lucide-react';
import { EmailDomainStatus } from '@/_interfaces/email-template-domain';
import Link from 'next/link';
import useEmailDomain from '@/_hooks/use-email-domain';

interface Props {
  environmentId: string;
}

export default function EmailDomainStatusCard({ environmentId }: Props) {
  const { isLoadingEnvironment } = useEnvironment({
    environmentId,
  });
  const { emailTemplateDomain } = useEmailDomain();

  function isEmailDomainVerifying() {
    return emailTemplateDomain.status === EmailDomainStatus.Verifying;
  }

  function isEmailDomainVerified() {
    if (isEmailDomainVerifying()) {
      return false;
    }

    return emailTemplateDomain.status === EmailDomainStatus.Verified;
  }

  function isEmailDomainFailed() {
    if (isEmailDomainVerifying()) {
      return false;
    }

    return emailTemplateDomain.status === EmailDomainStatus.Failed;
  }

  return (
    !isLoadingEnvironment && (
      <Card variant={'darker'} className="mt-3 py-3 px-4">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              'flex-none basis-8 h-8 rounded-md flex items-center justify-center border',
              {
                'bg-warning/10 border-warning/40': isEmailDomainVerifying(),
                'bg-success/10 border-success/40': isEmailDomainVerified(),
                'bg-destructive/10 border-destructive/40':
                  isEmailDomainFailed(),
              },
            )}
          >
            {isEmailDomainVerifying() && (
              <Loader className="w-4 h-4 animate-spin" />
            )}
            {isEmailDomainVerified() && <Check className="w-4 h-4" />}
            {isEmailDomainFailed() && <X className="w-4 h-4" />}
          </div>
          <Typo variant={'sm'}>
            {isEmailDomainVerifying() && (
              <>
                Please navigate to the DNS settings page of your DNS provider
                and add the following DNS record to the records section.
                We&apos;ll check the DNS settings every 5 minutes for the next 5
                hours. Meanwhile, you can customize your{' '}
                <Link
                  className={typoVariants({ variant: 'codeLink' })}
                  href={`/${environmentId}/email-templates`}
                >
                  email templates
                </Link>
                .
              </>
            )}
            {isEmailDomainVerified() && (
              <>
                Great job! Domain successfully verified. Your environment is now
                accessible via the custom domain above. Now you can customize
                your{' '}
                <Link
                  className={typoVariants({ variant: 'codeLink' })}
                  href={`/${environmentId}/email-templates`}
                >
                  email templates
                </Link>
                .
              </>
            )}
            {isEmailDomainFailed() && (
              <>
                We could not verify the DNS completely. Please double-check your
                DNS provider settings to ensure all records are accurate.
              </>
            )}
          </Typo>
        </div>
        <Table className="rounded overflow-hidden mt-3">
          <TableHeader>
            <TableRow header withHover={false}>
              <TableHead className="select-none">Name</TableHead>
              <TableHead className="select-none">Type</TableHead>
              <TableHead className="select-none">Value</TableHead>
              <TableHead className="select-none">TTL</TableHead>
              <TableHead className="select-none">Priority</TableHead>
              <TableHead className="select-none">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {emailTemplateDomain.records.map((record) => (
              <TableRow key={`${record.name}-${record.type}`} className="group">
                <TableCell withCopy>{record.name}</TableCell>
                <TableCell className="uppercase">{record.type}</TableCell>
                <TableCell
                  withCopy
                  withCopyValue={record.value}
                  className="max-w-[12rem]"
                >
                  <div className="truncate">{record.value}</div>
                </TableCell>
                <TableCell>{record.ttl}</TableCell>
                <TableCell>{record.priority}</TableCell>
                <TableCell>
                  {record.status === 'pending' && (
                    <Badge variant={'warning'}>Verifying</Badge>
                  )}
                  {record.status === 'verified' && (
                    <Badge variant={'success'}>Verified</Badge>
                  )}
                  {record.status === 'failure' && (
                    <Badge variant={'destructive'}>Failed</Badge>
                  )}
                  {record.status === 'temporary_failure' && (
                    <Badge variant={'destructive'}>Failed</Badge>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {isEmailDomainVerifying() && (
          <Alert variant={'info'} className="mt-2 font-semibold" size={'sm'}>
            Keep in mind that DNS propagation can take some time, so please be
            patient as the changes take effect.
          </Alert>
        )}
      </Card>
    )
  );
}
