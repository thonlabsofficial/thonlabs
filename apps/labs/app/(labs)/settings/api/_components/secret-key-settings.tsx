'use client';

import React from 'react';
import useEnvironment from '@/(labs)/_hooks/use-environment';
import { Environment } from '@/(labs)/_interfaces/environment';
import { Button } from '@repo/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@repo/ui/card';
import { Input, InputWrapper } from '@repo/ui/input';
import RegenerateSecretKeyDialog from './regenerate-secret-key-dialog';

type Props = {
  sessionEnvironment: Environment;
};

export default function SecretKeySettings({ sessionEnvironment }: Props) {
  const [secretKey, setSecretKey] = React.useState('');
  const { isLoadingEnvironment, getEnvironmentSecretKey } = useEnvironment({
    environmentID: sessionEnvironment.id,
  });

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
      <CardFooter className="flex justify-end">
        <RegenerateSecretKeyDialog
          environmentID={sessionEnvironment.id}
          trigger={
            <Button type="button" size={'sm'} disabled={isLoadingEnvironment}>
              Regenerate
            </Button>
          }
          onSecretKeyRegenerated={(newSecretKey) => setSecretKey(newSecretKey)}
        />
      </CardFooter>
    </Card>
  );
}
