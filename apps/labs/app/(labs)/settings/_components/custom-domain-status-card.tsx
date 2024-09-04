import React from 'react';
import useEnvironment from '@labs/_hooks/use-environment';
import { CustomDomainStatus } from '@/(labs)/_interfaces/environment';
import BoxKeyValue from '@/(labs)/_components/box-key-value';
import SeparatorLine from '@/(labs)/_components/separator-line';
import { Badge } from '@repo/ui/badge';
import { Card } from '@repo/ui/card';
import { cn } from '@repo/ui/core/utils';
import { Typo } from '@repo/ui/typo';
import Utils from '@repo/utils';
import { LuCircleDotDashed, LuCheck, LuX } from 'react-icons/lu';

interface Props {
  environmentID: string;
}

export default function CustomDomainStatusCard({ environmentID }: Props) {
  const {
    environment,
    isLoadingEnvironment,
    isValidatingEnvironment,
    reverifyCustomDomain,
  } = useEnvironment({
    environmentID,
  });
  const authDomain = React.useMemo(() => {
    return `${environment?.id.split('-').reverse()[0]}.auth.thonlabs.io`;
  }, [environment]);

  React.useEffect(() => {
    if (environment?.customDomain) {
      reverifyCustomDomain(environmentID);
    }
  }, [environment, isValidatingEnvironment]);

  return (
    !isLoadingEnvironment &&
    environment?.customDomain && (
      <Card variant={'darker'} className="mt-3 py-3 px-4">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              'flex-none basis-8 h-8 rounded-md flex items-center justify-center border ',
              {
                'bg-warning/10 border-warning/40':
                  environment?.customDomainStatus ===
                  CustomDomainStatus.Verifying,
                'bg-success/10 border-success/40':
                  environment?.customDomainStatus ===
                  CustomDomainStatus.Verified,
                'bg-destructive/10 border-destructive/40':
                  environment?.customDomainStatus === CustomDomainStatus.Failed,
              },
            )}
          >
            {environment?.customDomainStatus ===
              CustomDomainStatus.Verifying && (
              <LuCircleDotDashed className="w-4 h-4 animate-spin" />
            )}
            {environment?.customDomainStatus ===
              CustomDomainStatus.Verified && <LuCheck className="w-4 h-4" />}
            {environment?.customDomainStatus === CustomDomainStatus.Failed && (
              <LuX className="w-4 h-4" />
            )}
          </div>
          <Typo variant={'sm'}>
            {environment?.customDomainStatus ===
              CustomDomainStatus.Verifying && (
              <>
                Go to the DNS settings page of your DNS provider and add the
                following DNS record to the records section. We&apos;ll verify
                the DNS every 5 minutes over the next 5 hours.
              </>
            )}
            {environment?.customDomainStatus ===
              CustomDomainStatus.Verified && (
              <>
                Great job! Domain successfully verified. Your environment is now
                accessible via the custom domain above.
              </>
            )}
            {environment?.customDomainStatus === CustomDomainStatus.Failed && (
              <>
                We could not verify the DNS. Please double-check your DNS
                provider settings to ensure all records are accurate.
              </>
            )}
          </Typo>
        </div>
        <SeparatorLine className="!my-2" />
        <div className="flex gap-10">
          <BoxKeyValue
            label="Name"
            value={Utils.getSubDomains(environment?.customDomain)}
            withCopy
          />
          <BoxKeyValue label="Type" value="CNAME" />
          <BoxKeyValue label="Value" value={authDomain} withCopy />
          <BoxKeyValue label="TTL" value="60" />
          <BoxKeyValue
            label="Status"
            value={
              <>
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
              </>
            }
          />
        </div>
      </Card>
    )
  );
}
