'use client';

import { Alert, AlertDescription, AlertTitle } from '@repo/ui/alert';
import { Badge } from '@repo/ui/badge';
import { Button } from '@repo/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui/card';
import { IconSquare } from '@repo/ui/icon-square';
import { Skeleton } from '@repo/ui/skeleton';
import emailTemplatesConstants from '@/_constants/email-templates-constants';
import { useEmailProviders } from '@/_hooks/use-email-providers';
import { EmailProviderTypes } from '@/_interfaces/email-provider';
import BuilderEditCredentialsDrawer from './email-providers-credentials-drawer';

export default function EmailProvidersList() {
  const { emailProviders, isLoadingEmailProviders } = useEmailProviders();
  const isAnyProviderActive =
    emailProviders &&
    Object.values(emailProviders).some((provider) => provider?.active);

  return (
    <>
      {!isLoadingEmailProviders && !isAnyProviderActive && (
        <Alert variant='warning' className='mb-4'>
          <AlertTitle>No active email provider</AlertTitle>
          <AlertDescription>
            Emails will be sent using ThonLabs default testing domain
            (email.thonlabs.dev) until you configure and activate your own
            provider.
          </AlertDescription>
        </Alert>
      )}
      <div className='flex gap-3'>
        {Object.values(EmailProviderTypes).map((provider) => {
          const { name, icon, soon } =
            emailTemplatesConstants.emailProviders[provider];
          const emailProvider = emailProviders?.[provider];

          return (
            <Card padding key={provider} className='min-w-72'>
              <CardHeader className='!flex-row flex items-center justify-between gap-3'>
                <div className='flex items-center gap-2'>
                  {!isLoadingEmailProviders ? (
                    <>
                      <IconSquare icon={icon} />
                      <CardTitle>{name}</CardTitle>
                    </>
                  ) : (
                    <>
                      <Skeleton className='!w-10 h-10' />
                      <Skeleton className='!w-24 h-6' />
                    </>
                  )}
                </div>
                {!isLoadingEmailProviders && (
                  <div className='flex items-center gap-2'>
                    {emailProvider?.active && (
                      <Badge variant='success' size='sm'>
                        Active
                      </Badge>
                    )}
                    {soon && (
                      <Badge variant='outline' size='sm'>
                        Soon
                      </Badge>
                    )}
                  </div>
                )}
              </CardHeader>
              <CardContent className='mt-4 flex flex-col gap-2'>
                {!soon ? (
                  <BuilderEditCredentialsDrawer
                    provider={provider}
                    trigger={
                      <Button
                        variant='secondary'
                        skeleton={isLoadingEmailProviders}
                      >
                        Configure
                      </Button>
                    }
                  />
                ) : (
                  <Button
                    variant='secondary'
                    disabled
                    skeleton={isLoadingEmailProviders}
                  >
                    Configure
                  </Button>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </>
  );
}
