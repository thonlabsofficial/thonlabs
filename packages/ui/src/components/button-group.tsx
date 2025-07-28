import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '../core/utils';
import type { ButtonIconProps } from './button-icon';

const buttonIconGroupVariants = cva(
  'inline-flex gap-1 h-8 items-center justify-center rounded-md bg-muted p-0.5 text-muted-foreground'
);

interface ButtonGroupProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof buttonIconGroupVariants> {
  children: React.ReactElement<ButtonIconProps>[];
}

export const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        className={cn(buttonIconGroupVariants(), className)}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    );
  }
);

ButtonGroup.displayName = 'ButtonGroup';

export const ButtonGroupItem = React.forwardRef<
  HTMLButtonElement,
  React.HTMLAttributes<HTMLButtonElement> & {
    active?: boolean;
    disabled?: boolean;
  }
>(({ className, children, active, disabled, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        `inline-flex h-7 items-center justify-center whitespace-nowrap rounded-sm px-2 py-1 font-medium text-sm ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none`,
        {
          'pointer-events-none bg-card text-foreground shadow-sm': active,
          'text-foreground/50 hover:text-foreground/70': !active,
          'pointer-events-none': disabled,
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
});
