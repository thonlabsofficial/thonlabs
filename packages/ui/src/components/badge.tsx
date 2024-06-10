import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../core/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-md border text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 cursor-default',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-primary text-primary-foreground shadow',
        secondary: 'border-transparent bg-secondary text-secondary-foreground',
        destructive:
          'border-transparent bg-destructive text-destructive-foreground shadow',
        outline: 'text-foreground',
      },
      size: {
        small: 'px-1 py-0.5',
        medium: 'px-2.5 py-0.5',
        large: 'px-3 py-1',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'medium',
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <div
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
