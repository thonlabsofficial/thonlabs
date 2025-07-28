import { Alert, AlertDescription } from '@repo/ui/alert';
import { Badge } from '@repo/ui/badge';
import { Card } from '@repo/ui/card';
import { Clipboard } from '@repo/ui/clipboard';
import { cn } from '@repo/ui/core/utils';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@repo/ui/table';
import { Typo } from '@repo/ui/typo';
import Utils from '@repo/utils';
import { Check, Copy, Loader, X } from 'lucide-react';
import React from 'react';
import useEnvironment from '@/_hooks/use-environment';
import { CustomDomainStatus } from '@/_interfaces/environment';

interface Props {
  environmentId: string;
}

export default function CustomDomainStatusCard({ environmentId }: Props) {
  const {
    environment,
    isLoadingEnvironment,
    isValidatingEnvironment,
    reverifyCustomDomain,
  } = useEnvironment({
    environmentId,
  });
  const authDomain = React.useMemo(() => {
    return `${environment?.id?.split('-')?.reverse()?.[0]}.auth.thonlabs.io`;
  }, [environment]);

  React.useEffect(() => {
    if (environment?.customDomain && isCustomDomainVerifying()) {
      reverifyCustomDomain(environmentId);
    }
  }, [
    environment,
    environmentId,
    isCustomDomainVerifying,
    reverifyCustomDomain,
  ]);

  function isCustomDomainVerifying() {
    return (
      environment?.customDomainStatus === CustomDomainStatus.Verifying ||
      environment?.customDomainTXTStatus === CustomDomainStatus.Verifying
    );
  }

  function isCustomDomainVerified() {
    if (isCustomDomainVerifying()) {
      return false;
    }

    return (
      environment?.customDomainStatus === CustomDomainStatus.Verified &&
      environment?.customDomainTXTStatus === CustomDomainStatus.Verified
    );
  }

  function isCustomDomainFailed() {
    if (isCustomDomainVerifying()) {
      return false;
    }

    return (
      environment?.customDomainStatus === CustomDomainStatus.Failed ||
      environment?.customDomainTXTStatus === CustomDomainStatus.Failed
    );
  }

  return (
    !isLoadingEnvironment &&
    environment?.customDomain && (
      <>
        {isCustomDomainVerifying() && (
          <Alert className='mt-3 font-semibold'>
            <AlertDescription>
              While validation is in progress, you can continue integrating with
              the custom authentication domain{' '}
              <span>
                {authDomain}{' '}
                <Clipboard
                  size='xs'
                  variant='outline'
                  value={authDomain}
                  labels={[Copy, Check]}
                  iconLabels
                />
              </span>
              .
            </AlertDescription>
          </Alert>
        )}
        <Card variant={'darker'} className='mt-3 px-4 py-3'>
          <div className='flex items-center gap-3'>
            <div
              className={cn(
                'flex h-8 flex-none basis-8 items-center justify-center rounded-md border ',
                {
                  'border-warning/40 bg-warning/10': isCustomDomainVerifying(),
                  'border-success/40 bg-success/10': isCustomDomainVerified(),
                  'border-destructive/40 bg-destructive/10':
                    isCustomDomainFailed(),
                }
              )}
            >
              {isCustomDomainVerifying() && (
                <Loader className='h-4 w-4 animate-spin' />
              )}
              {isCustomDomainVerified() && <Check className='h-4 w-4' />}
              {isCustomDomainFailed() && <X className='h-4 w-4' />}
            </div>
            <Typo variant={'sm'}>
              {isCustomDomainVerifying() && (
                <>
                  Please navigate to the DNS settings page of your DNS provider
                  and add the following DNS record to the records section.
                  We&apos;ll check the DNS settings every 5 minutes for the next
                  5 hours.
                </>
              )}
              {isCustomDomainVerified() &&
                'Great job! Domain successfully verified. Your environment is now accessible via the custom domain above.'}
              {isCustomDomainFailed() &&
                'We could not verify the DNS completely. Please double-check your DNS provider settings to ensure all records are accurate.'}
            </Typo>
          </div>
          <Table className='mt-3 overflow-hidden rounded'>
            <TableHeader>
              <TableRow header withHover={false}>
                <TableHead className='select-none'>Name</TableHead>
                <TableHead className='select-none'>Type</TableHead>
                <TableHead className='select-none'>Value</TableHead>
                <TableHead className='select-none'>TTL</TableHead>
                <TableHead className='select-none'>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className='group'>
                <TableCell withCopy>
                  {Utils.getSubDomains(environment?.customDomain)}
                </TableCell>
                <TableCell>CNAME</TableCell>
                <TableCell withCopy>{authDomain}</TableCell>
                <TableCell>60</TableCell>
                <TableCell>
                  {environment?.customDomainStatus ===
                    CustomDomainStatus.Verifying && (
                    <Badge variant={'warning'}>Verifying</Badge>
                  )}
                  {environment?.customDomainStatus ===
                    CustomDomainStatus.Verified && (
                    <Badge variant={'success'}>Verified</Badge>
                  )}
                  {environment?.customDomainStatus ===
                    CustomDomainStatus.Failed && (
                    <Badge variant={'destructive'}>Failed</Badge>
                  )}
                </TableCell>
              </TableRow>
              <TableRow className='group'>
                <TableCell withCopy>_tl_verify</TableCell>
                <TableCell>TXT</TableCell>
                <TableCell withCopy>{environment?.customDomainTXT}</TableCell>
                <TableCell>60</TableCell>
                <TableCell>
                  {environment?.customDomainTXTStatus ===
                    CustomDomainStatus.Verifying && (
                    <Badge variant={'warning'}>Verifying</Badge>
                  )}
                  {environment?.customDomainTXTStatus ===
                    CustomDomainStatus.Verified && (
                    <Badge variant={'success'}>Verified</Badge>
                  )}
                  {environment?.customDomainTXTStatus ===
                    CustomDomainStatus.Failed && (
                    <Badge variant={'destructive'}>Failed</Badge>
                  )}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          {isCustomDomainVerifying() && (
            <Alert variant={'info'} className='mt-2 font-semibold' size={'sm'}>
              Keep in mind that DNS propagation can take some time, so please be
              patient as the changes take effect.
            </Alert>
          )}
        </Card>
      </>
    )
  );
}
