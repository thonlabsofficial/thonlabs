'use client';

import React from 'react';
import { Button, buttonVariants } from '@repo/ui/button';
import JoinWaitlistDialog from './join-waitlist-dialog';
import { useHotkeys } from 'react-hotkeys-hook';

export default function JoinWaitlistButton() {
  const [isOpen, setIsOpen] = React.useState(false);

  useHotkeys(
    'w',
    () => setIsOpen(true),
    {
      keyup: true,
    },
    [isOpen],
  );

  return (
    <>
      <Button
        className="group hidden lg:flex"
        variant={'linkGhost'}
        size={'sm'}
        onClick={() => setIsOpen(true)}
      >
        Press{' '}
        <div className={buttonVariants({ variant: 'outline', size: 'xs' })}>
          W
        </div>{' '}
        to join waitlist
      </Button>
      <Button
        className="group flex lg:hidden"
        size={'lg'}
        onClick={() => setIsOpen(true)}
      >
        Join Waitlist
      </Button>
      <JoinWaitlistDialog open={isOpen} onOpenChange={setIsOpen} />
    </>
  );
}
