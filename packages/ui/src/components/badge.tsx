import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../core/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-md border text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 cursor-default',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-primary/10 border-primary/40 shadow-none',
        defaultNoOpacity:
          'border-transparent bg-primary border-primary text-foreground shadow-none',
        secondary:
          'border-transparent bg-secondary/10 border-secondary/40 shadow-none',
        destructive:
          'border-transparent bg-destructive/10 border-destructive/40 shadow-none',
        success:
          'border-transparent bg-success/10 border-success/40 shadow-none',
        outline: 'text-foreground bg-transparent border-foreground/20',
        warning:
          'border-transparent bg-warning/10 border-warning/40 shadow-none',
        info: 'bg-info/20 dark:bg-info/40 border-info/50 dark:border-info/40',
      },
      size: {
        xs: 'text-[0.6875rem] px-1 py-0',
        sm: 'px-1 py-0.5',
        md: 'px-2 py-0.5',
        lg: 'px-3 py-1 text-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
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
