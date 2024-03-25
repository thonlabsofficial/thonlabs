'use client';

import * as React from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/ui/utils';

const labelVariants = cva(
  `text-zinc-500 text-sm font-medium leading-none 
   peer-disabled:cursor-not-allowed peer-disabled:opacity-70 
   group-focus-within:text-zinc-700 dark:group-focus-within:text-zinc-300 
   transition-all duration-200 ease-in-out`
);

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants(), className)}
    {...props}
  />
));
Label.displayName = LabelPrimitive.Root.displayName;

export { Label, labelVariants };
