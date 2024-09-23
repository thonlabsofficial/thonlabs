'use client';

import React from 'react';
import useEnvironment from '@/(labs)/_hooks/use-environment';
import { Environment } from '@/(labs)/_interfaces/environment';
import { Button } from '@repo/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@repo/ui/card';
import { Input, InputWrapper } from '@repo/ui/input';
import { Skeleton } from '@repo/ui/skeleton';
import RegeneratePublicKeyDialog from '@labs/settings/_components/regenerate-public-key-dialog';
import RegenerateSecretKeyDialog from '@labs/settings/_components/regenerate-secret-key-dialog';
import CustomDomainStatusCard from '@labs/settings/_components/custom-domain-status-card';
import CustomDomainActions from '@labs/settings/_components/custom-domain-actions';

type Props = {
  sessionEnvironment: Environment;
};

export default function APIKeysSettings({ sessionEnvironment }: Props) {
  const { environment, isLoadingEnvironment, getEnvironmentSecretKey } =
    useEnvironment({
      environmentID: sessionEnvironment.id,
    });
  const [secretKey, setSecretKey] = React.useState('');
  const authDomain = React.useMemo(() => {
    return `${environment?.id?.split('-')?.reverse()?.[0]}.auth.thonlabs.io`;
  }, [environment]);

  async function handleHiddenClick() {
    if (secretKey) {
      return;
    }

    const key = await getEnvironmentSecretKey(sessionEnvironment.id);

    setSecretKey(key);
  }

  return (
    <>
      <Card>
        <div className="grid grid-cols-[19rem_1fr] gap-40">
          <CardHeader description="Use this domain for all authentication requests, including login, signup, password reset, and email confirmation.">
            Auth Domain
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

            <CustomDomainStatusCard environmentID={sessionEnvironment.id} />
          </CardContent>
        </div>
        <CardFooter className="flex justify-end gap-2">
          <CustomDomainActions environmentID={sessionEnvironment.id} />
        </CardFooter>
      </Card>
      <Card>
        <div className="grid grid-cols-[19rem_1fr] gap-40">
          <CardHeader description="The public key allows secure retrieval of data from the client.">
            Public Key
          </CardHeader>
          <CardContent className="flex-1 p-6">
            <InputWrapper>
              <Input
                readOnly
                loading={isLoadingEnvironment}
                value={environment?.publicKey}
                withCopy
                withHide
              />
            </InputWrapper>
          </CardContent>
        </div>
        <CardFooter className="flex justify-end gap-2">
          {isLoadingEnvironment ? (
            <Skeleton className="!w-44 h-8" />
          ) : (
            <RegeneratePublicKeyDialog
              environmentID={sessionEnvironment.id}
              trigger={
                <Button
                  type="button"
                  size={'sm'}
                  disabled={isLoadingEnvironment}
                >
                  Regenerate Public Key
                </Button>
              }
            />
          )}
        </CardFooter>
      </Card>
      <Card>
        <div className="grid grid-cols-[19rem_1fr] gap-40">
          <CardHeader description="The secret key is used to securely access and manage data on the server. Keep it confidential to protect your application's integrity.">
            Secret Key
          </CardHeader>
          <CardContent className="flex-1 p-6">
            <InputWrapper>
              <Input
                readOnly
                loading={isLoadingEnvironment}
                value={secretKey}
                withCopy
                withHide
                onHiddenClick={handleHiddenClick}
              />
            </InputWrapper>
          </CardContent>
        </div>
        <CardFooter className="flex justify-end gap-2">
          {isLoadingEnvironment ? (
            <Skeleton className="!w-44 h-8" />
          ) : (
            <RegenerateSecretKeyDialog
              environmentID={sessionEnvironment.id}
              trigger={
                <Button
                  type="button"
                  size={'sm'}
                  disabled={isLoadingEnvironment}
                >
                  Regenerate Secret Key
                </Button>
              }
              onSecretKeyRegenerated={(newSecretKey) =>
                setSecretKey(newSecretKey)
              }
            />
          )}
        </CardFooter>
      </Card>
    </>
  );
}
