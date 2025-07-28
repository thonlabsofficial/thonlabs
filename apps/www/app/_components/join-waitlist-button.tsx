'use client';

import { Button, buttonVariants } from '@repo/ui/button';
import React from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import JoinWaitlistDialog from './join-waitlist-dialog';

export default function JoinWaitlistButton() {
  const [isOpen, setIsOpen] = React.useState(false);

  useHotkeys(
    'w',
    () => setIsOpen(true),
    {
      keyup: true,
    },
    [isOpen]
  );

  return (
    <>
      <Button
        className='group hidden lg:flex'
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
        className='group flex lg:hidden'
        size={'lg'}
        onClick={() => setIsOpen(true)}
      >
        Join Waitlist
      </Button>
      <JoinWaitlistDialog open={isOpen} onOpenChange={setIsOpen} />
    </>
  );
}
