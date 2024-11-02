import React from 'react';
import useEnvironment from '@/_hooks/use-environment';
import { CustomDomainStatus } from '@/_interfaces/environment';
import { Badge } from '@repo/ui/badge';
import { Card } from '@repo/ui/card';
import { cn } from '@repo/ui/core/utils';
import { Typo } from '@repo/ui/typo';
import Utils from '@repo/utils';
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
  }, [environment, isValidatingEnvironment]);

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
      <Card variant={'darker'} className="mt-3 py-3 px-4">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              'flex-none basis-8 h-8 rounded-md flex items-center justify-center border ',
              {
                'bg-warning/10 border-warning/40': isCustomDomainVerifying(),
                'bg-success/10 border-success/40': isCustomDomainVerified(),
                'bg-destructive/10 border-destructive/40':
                  isCustomDomainFailed(),
              },
            )}
          >
            {isCustomDomainVerifying() && (
              <Loader className="w-4 h-4 animate-spin" />
            )}
            {isCustomDomainVerified() && <Check className="w-4 h-4" />}
            {isCustomDomainFailed() && <X className="w-4 h-4" />}
          </div>
          <Typo variant={'sm'}>
            {isCustomDomainVerifying() && (
              <>
                Please navigate to the DNS settings page of your DNS provider
                and add the following DNS record to the records section.
                We&apos;ll check the DNS settings every 5 minutes for the next 5
                hours.
              </>
            )}
            {isCustomDomainVerified() && (
              <>
                Great job! Domain successfully verified. Your environment is now
                accessible via the custom domain above.
              </>
            )}
            {isCustomDomainFailed() && (
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
              <TableHead className="select-none">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="group">
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
            <TableRow className="group">
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
          <Alert variant={'info'} className="mt-2 font-semibold" size={'sm'}>
            Keep in mind that DNS propagation can take some time, so please be
            patient as the changes take effect.
          </Alert>
        )}
      </Card>
    )
  );
}
