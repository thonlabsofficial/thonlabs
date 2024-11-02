'use client';

import { Button } from '@repo/ui/button';
import React, { useTransition } from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@repo/ui/dialog';
import useEnvironment from '@/_hooks/use-environment';
import { Input, InputWrapper } from '@repo/ui/input';

type Props = {
  trigger: React.ReactNode;
  environmentId: string;
  onSecretKeyRegenerated: (newSecretKey: string) => void;
};

export default function RegenerateSecretKeyDialog({
  trigger,
  environmentId,
  onSecretKeyRegenerated,
}: Props & React.HTMLAttributes<HTMLElement>) {
  const [regenerated, setRegenerated] = React.useState(false);
  const [secretKey, setSecretKey] = React.useState('');
  const { regenerateEnvironmentSecretKey } = useEnvironment();
  const [isRegenerating, startRegeneratingTransition] = useTransition();

  async function handleRegenerateSecretKey() {
    try {
      const key = await regenerateEnvironmentSecretKey(environmentId);
      setSecretKey(key);
      setRegenerated(true);
      onSecretKeyRegenerated(key);
    } catch {}
  }

  function handleReset() {
    setRegenerated(false);
  }

  return (
    <Dialog>
      <DialogTrigger asChild onClick={handleReset}>
        {trigger}
      </DialogTrigger>
      <DialogContent>
        {!regenerated ? (
          <>
            <DialogHeader>
              <DialogTitle>Confirm this action</DialogTitle>
              <DialogDescription>
                Regenerating the secret key will invalidate all existing
                integrations. Proceed only if you're ready to update your
                configurations.
              </DialogDescription>
            </DialogHeader>

            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="ghost" disabled={isRegenerating}>
                  Cancel
                </Button>
              </DialogClose>
              <Button
                type="button"
                loading={isRegenerating}
                onClick={() =>
                  startRegeneratingTransition(handleRegenerateSecretKey)
                }
              >
                {isRegenerating
                  ? 'Regenerating...'
                  : 'Generate a new secret key'}
              </Button>
            </DialogFooter>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Secret key regenerated</DialogTitle>
              <DialogDescription>
                Your secret key has been regenerated. Copy the new key below and
                update your project promptly.
              </DialogDescription>
            </DialogHeader>

            <InputWrapper>
              <Input readOnly value={secretKey} withCopy />
            </InputWrapper>

            <DialogFooter>
              <DialogClose asChild>
                <Button type="button">Done</Button>
              </DialogClose>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
