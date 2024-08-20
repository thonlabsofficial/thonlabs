'use client';

import * as React from 'react';
import * as SwitchPrimitives from '@radix-ui/react-switch';

import { cn } from '../core/utils';

interface SwitchProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>,
    'value'
  > {
  value:
    | React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>['value']
    | boolean;
}

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  SwitchProps
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      `
        peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 
        border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 
        focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background 
        disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-foreground 
        data-[state=unchecked]:bg-foreground/10
      `,
      className,
    )}
    {...(props as React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>)}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        `
          pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 
          transition-transform data-[state=checked]:translate-x-5 
          data-[state=unchecked]:translate-x-0
        `,
      )}
    />
  </SwitchPrimitives.Root>
));
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
