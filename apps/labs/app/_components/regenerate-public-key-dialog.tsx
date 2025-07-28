'use client';

import { Button } from '@repo/ui/button';
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
import { Input, InputWrapper } from '@repo/ui/input';
import React, { useTransition } from 'react';
import useEnvironment from '@/_hooks/use-environment';

type Props = {
  trigger: React.ReactNode;
  environmentId: string;
};

export default function RegeneratePublicKeyDialog({
  trigger,
  environmentId,
}: Props & React.HTMLAttributes<HTMLElement>) {
  const [regenerated, setRegenerated] = React.useState(false);
  const { environment, regenerateEnvironmentPublicKey } = useEnvironment({
    environmentId,
  });
  const [isRegenerating, startRegeneratingTransition] = useTransition();

  async function handleRegeneratePublicKey() {
    try {
      await regenerateEnvironmentPublicKey(environmentId);
      setRegenerated(true);
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
                Regenerating the public key will invalidate all existing
                integrations. Proceed only if you're ready to update your
                configurations.
              </DialogDescription>
            </DialogHeader>

            <DialogFooter>
              <DialogClose asChild>
                <Button type='button' variant='ghost' disabled={isRegenerating}>
                  Cancel
                </Button>
              </DialogClose>
              <Button
                type='button'
                loading={isRegenerating}
                onClick={() =>
                  startRegeneratingTransition(handleRegeneratePublicKey)
                }
              >
                {isRegenerating
                  ? 'Regenerating...'
                  : 'Generate a new public key'}
              </Button>
            </DialogFooter>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Public key regenerated</DialogTitle>
              <DialogDescription>
                Your public key has been regenerated. Copy the new key below and
                update your project promptly.
              </DialogDescription>
            </DialogHeader>

            <InputWrapper>
              <Input readOnly value={environment?.publicKey} withCopy />
            </InputWrapper>

            <DialogFooter>
              <DialogClose asChild>
                <Button type='button'>Done</Button>
              </DialogClose>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
