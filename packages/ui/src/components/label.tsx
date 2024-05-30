'use client';

import * as React from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '../core/utils';

const labelVariants = cva(
  `text-sm font-medium leading-none 
   peer-disabled:cursor-not-allowed peer-disabled:opacity-70 
   transition-all duration-200 ease-in-out`,
  {
    variants: {
      state: {
        default:
          'text-gray-500 group-focus-within:text-gray-700 dark:group-focus-within:text-gray-300',
      },
    },
    defaultVariants: {
      state: 'default',
    },
  },
);

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants>
>(({ className, state, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants({ state }), className)}
    {...props}
  />
));
Label.displayName = LabelPrimitive.Root.displayName;

export { Label, labelVariants };
