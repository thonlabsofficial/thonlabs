'use client';

import * as React from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '../core/utils';
import { Skeleton } from './skeleton';

const labelVariants = cva(
  `text-sm font-medium leading-none 
   peer-disabled:cursor-not-allowed peer-disabled:opacity-70 
   transition-default`,
  {
    variants: {
      state: {
        default: 'text-zinc-500',
      },
    },
    defaultVariants: {
      state: 'default',
    },
  },
);

type Props = {
  withFocusWithin?: boolean;
  loading?: boolean;
};

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  Props &
    React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants>
>(({ className, state, withFocusWithin = true, loading, ...props }, ref) =>
  !loading ? (
    <LabelPrimitive.Root
      ref={ref}
      className={cn(
        labelVariants({ state }),
        {
          'group-focus-within:text-zinc-700 dark:group-focus-within:text-zinc-300':
            withFocusWithin,
        },
        className,
      )}
      {...props}
    />
  ) : (
    <Skeleton width={'7.5rem'} height={'0.875rem'} />
  ),
);
Label.displayName = LabelPrimitive.Root.displayName;

export { Label, labelVariants };
