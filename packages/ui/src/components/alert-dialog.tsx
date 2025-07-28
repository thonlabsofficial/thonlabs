'use client';

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
import React from 'react';

type Props = {
  title: React.ReactNode;
  idleLabel?: React.ReactNode;
  actingLabel?: React.ReactNode;
  variant?: React.ComponentProps<typeof Button>['variant'];
  onClick?: React.ComponentProps<typeof Button>['onClick'];
  description?: React.ReactNode;
  isActing?: boolean;
  trigger?: React.ReactNode;
};

function AlertDialog({
  title,
  description,
  trigger,
  idleLabel,
  variant = 'primary',
  actingLabel,
  children,
  onClick,
  ...props
}: Props & React.ComponentProps<typeof Dialog>) {
  const [open, setOpen] = React.useState(props.open || false);
  const [isActing, setIsActing] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen} {...props}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        {children && <div className='mt-2'>{children}</div>}
        <DialogFooter>
          <DialogClose asChild>
            <Button
              type='button'
              variant={idleLabel ? 'ghost' : 'primary'}
              disabled={isActing}
            >
              {idleLabel ? 'Cancel' : 'Close'}
            </Button>
          </DialogClose>
          {idleLabel && (
            <Button
              type='button'
              variant={variant}
              loading={isActing}
              onClick={async (e) => {
                try {
                  setIsActing(true);
                  await onClick?.(e);
                } finally {
                  setIsActing(false);
                }
              }}
            >
              {isActing ? actingLabel : idleLabel}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export { AlertDialog };
