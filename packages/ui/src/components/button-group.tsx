import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../core/utils';
import { ButtonIconProps } from './button-icon';

const buttonIconGroupVariants = cva(
  'flex gap-1 h-8 items-center justify-center rounded-md bg-muted p-0.5 text-muted-foreground',
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
  },
);

ButtonGroup.displayName = 'ButtonGroup';

export const ButtonGroupItem = React.forwardRef<
  HTMLButtonElement,
  React.HTMLAttributes<HTMLButtonElement> & {
    active?: boolean;
  }
>(({ className, children, active, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        `inline-flex items-center justify-center whitespace-nowrap rounded-sm px-2 py-1 text-sm 
          font-medium ring-offset-background transition-all focus-visible:outline-none 
          focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 
          disabled:pointer-events-none disabled:opacity-50`,
        {
          'bg-card text-foreground shadow-sm pointer-events-none': active,
          'text-foreground/50 hover:text-foreground/70': !active,
        },
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
});
