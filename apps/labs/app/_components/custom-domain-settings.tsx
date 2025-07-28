'use client';

import { Card, CardContent, CardFooter, CardHeader } from '@repo/ui/card';
import { Input, InputWrapper } from '@repo/ui/input';
import { useParams } from 'next/navigation';
import { useMemo } from 'react';
import CustomDomainActions from '@/_components/custom-domain-actions';
import CustomDomainStatusCard from '@/_components/custom-domain-status-card';
import useEnvironment from '@/_hooks/use-environment';

export default function CustomDomainSettings() {
  const { environmentId } = useParams();
  const { environment, isLoadingEnvironment } = useEnvironment({
    environmentId: environmentId as string,
  });
  const authDomain = useMemo(() => {
    return `${environment?.id?.split('-')?.reverse()?.[0]}.auth.thonlabs.io`;
  }, [environment]);

  return (
    <Card>
      <div className='grid grid-cols-[19rem_1fr] gap-40'>
        <CardHeader
          padding
          description='Used in authentication flows such as login, signup, password reset, and email confirmation.'
        >
          Domain
        </CardHeader>
        <CardContent className='flex-1 p-6'>
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
      <CardFooter className='flex justify-end gap-2'>
        <CustomDomainActions environmentId={environmentId as string} />
      </CardFooter>
    </Card>
  );
}
