'use client';

import { Card, CardFooter, CardContent, CardHeader } from '@repo/ui/card';
import { Input } from '@repo/ui/input';
import { InputWrapper } from '@repo/ui/input';
import CustomDomainStatusCard from '@/_components/custom-domain-status-card';
import CustomDomainActions from '@/_components/custom-domain-actions';
import useEnvironment from '@/_hooks/use-environment';
import { useMemo } from 'react';
import { useParams } from 'next/navigation';

export default function CustomDomainWrapper() {
  const { environmentId } = useParams();
  const { environment, isLoadingEnvironment } = useEnvironment({
    environmentId: environmentId as string,
  });
  const authDomain = useMemo(() => {
    return `${environment?.id?.split('-')?.reverse()?.[0]}.auth.thonlabs.io`;
  }, [environment]);

  return (
    <Card>
      <div className="grid grid-cols-[19rem_1fr] gap-40">
        <CardHeader description="Use this domain for all authentication requests, including login, signup, password reset, and email confirmation.">
          Domain
        </CardHeader>
        <CardContent className="flex-1 p-6">
          <InputWrapper>
            <Input
              readOnly
              loading={isLoadingEnvironment}
              value={environment?.customDomain || authDomain}
              withCopy
            />
          </InputWrapper>

          <CustomDomainStatusCard environmentId={environmentId as string} />
        </CardContent>
      </div>
      <CardFooter className="flex justify-end gap-2">
        <CustomDomainActions environmentId={environmentId as string} />
      </CardFooter>
    </Card>
  );
}
