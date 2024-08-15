'use client';

import useEnvironment from '@/(labs)/_hooks/use-environment';
import { Environment } from '@/(labs)/_interfaces/environment';
import { Button } from '@repo/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@repo/ui/card';
import { Input, InputWrapper } from '@repo/ui/input';
import RegeneratePublicKeyDialog from './regenerate-public-key-dialog';
import SeparatorLine from '@/(labs)/_components/separator-line';
import React from 'react';
import RegenerateSecretKeyDialog from './regenerate-secret-key-dialog';

type Props = {
  sessionEnvironment: Environment;
};

export default function APIKeysSettings({ sessionEnvironment }: Props) {
  const { environment, isLoadingEnvironment, getEnvironmentSecretKey } =
    useEnvironment({
      environmentID: sessionEnvironment.id,
    });
  const [secretKey, setSecretKey] = React.useState('');

  async function handleHiddenClick() {
    if (secretKey) {
      return;
    }

    const key = await getEnvironmentSecretKey(sessionEnvironment.id);

    setSecretKey(key);
  }

  return (
    <Card>
      <div className="grid grid-cols-[19rem_1fr] gap-40">
        <CardHeader description="The public key allows secure retrieval of data from the client.">
          Public Key
        </CardHeader>
        <CardContent className="flex-1 p-6">
          <div className="grid gap-5">
            <InputWrapper>
              <Input
                readOnly
                loading={isLoadingEnvironment}
                value={environment?.publicKey}
                withCopy
                withHide
              />
            </InputWrapper>
          </div>
        </CardContent>
      </div>
      <SeparatorLine />
      <div className="grid grid-cols-[19rem_1fr] gap-40">
        <CardHeader description="The secret key is used to securely access and manage data on the server. Keep it confidential to protect your application's integrity.">
          Secret Key
        </CardHeader>
        <CardContent className="flex-1 p-6">
          <div className="grid gap-5">
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
          </div>
        </CardContent>
      </div>
      <CardFooter className="flex justify-end gap-2">
        <RegeneratePublicKeyDialog
          environmentID={sessionEnvironment.id}
          trigger={
            <Button type="button" size={'sm'} disabled={isLoadingEnvironment}>
              Regenerate Public Key
            </Button>
          }
        />
        <RegenerateSecretKeyDialog
          environmentID={sessionEnvironment.id}
          trigger={
            <Button type="button" size={'sm'} disabled={isLoadingEnvironment}>
              Regenerate Secret Key
            </Button>
          }
          onSecretKeyRegenerated={(newSecretKey) => setSecretKey(newSecretKey)}
        />
      </CardFooter>
    </Card>
  );
}
