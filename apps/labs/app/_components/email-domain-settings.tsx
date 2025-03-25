'use client';

import { Card, CardFooter, CardContent, CardHeader } from '@repo/ui/card';
import { Input } from '@repo/ui/input';
import { InputWrapper } from '@repo/ui/input';
import { useParams } from 'next/navigation';
import EmailDomainActions from '@/_components/email-domain-actions';
import EmailDomainStatusCard from '@/_components/email-domain-status-card';
import useEnvironment from '@/_hooks/use-environment';
import useEmailDomain from '@/_hooks/use-email-domain';

export default function EmailDomainSettings() {
  const { environmentId } = useParams();
  const { isLoadingEnvironment } = useEnvironment({
    environmentId: environmentId as string,
  });
  const { emailTemplateDomain } = useEmailDomain();

  return (
    <Card>
      <div className="grid grid-cols-[19rem_1fr] gap-40">
        <CardHeader
          padding
          description="This domain is used to send emails from your environment."
        >
          Email Template Domain
        </CardHeader>
        <CardContent className="flex-1 p-6">
          <InputWrapper>
            <Input
              readOnly
              loading={isLoadingEnvironment}
              value={emailTemplateDomain.domain}
              withCopy
            />
          </InputWrapper>

          <EmailDomainStatusCard environmentId={environmentId as string} />
        </CardContent>
      </div>
      <CardFooter className="flex justify-end gap-2">
        <EmailDomainActions environmentId={environmentId as string} />
      </CardFooter>
    </Card>
  );
}
