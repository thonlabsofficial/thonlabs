'use client';

import { Button } from '@repo/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@repo/ui/card';
import { Input, InputWrapper } from '@repo/ui/input';
import { Skeleton } from '@repo/ui/skeleton';
import { useParams } from 'next/navigation';
import React from 'react';
import RegeneratePublicKeyDialog from '@/_components/regenerate-public-key-dialog';
import RegenerateSecretKeyDialog from '@/_components/regenerate-secret-key-dialog';
import useEnvironment from '@/_hooks/use-environment';

export default function APIKeysSettings() {
  const { environmentId } = useParams();
  const { environment, isLoadingEnvironment, getEnvironmentSecretKey } =
    useEnvironment({
      environmentId: environmentId as string,
    });
  const [secretKey, setSecretKey] = React.useState('');

  async function handleHiddenClick() {
    if (secretKey) {
      return;
    }

    const key = await getEnvironmentSecretKey(environmentId as string);

    setSecretKey(key);
  }

  return (
    <>
      <Card>
        <div className='grid grid-cols-[19rem_1fr] gap-40'>
          <CardHeader
            padding
            description='The public key allows secure retrieval of data from the client.'
          >
            Public Key
          </CardHeader>
          <CardContent className='flex-1 p-6'>
            <InputWrapper>
              <Input
                readOnly
                loading={isLoadingEnvironment}
                value={environment?.publicKey}
                withCopy
              />
            </InputWrapper>
          </CardContent>
        </div>
        <CardFooter className='flex justify-end gap-2'>
          {isLoadingEnvironment ? (
            <Skeleton className='!w-44 h-8' />
          ) : (
            <RegeneratePublicKeyDialog
              environmentId={environmentId as string}
              trigger={
                <Button
                  type='button'
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
        <div className='grid grid-cols-[19rem_1fr] gap-40'>
          <CardHeader
            padding
            description="The secret key is used to securely access and manage data on the server. Keep it confidential to protect your application's integrity."
          >
            Secret Key
          </CardHeader>
          <CardContent className='flex-1 p-6'>
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
        <CardFooter className='flex justify-end gap-2'>
          {isLoadingEnvironment ? (
            <Skeleton className='!w-44 h-8' />
          ) : (
            <RegenerateSecretKeyDialog
              environmentId={environmentId as string}
              trigger={
                <Button
                  type='button'
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
