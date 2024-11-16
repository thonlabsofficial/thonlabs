import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '../core/utils';

const alertVariants = cva(
  `
    relative w-full rounded-lg border flex gap-2
    text-gray-900 dark:text-white [&>svg]:text-gray-900 dark:[&>svg]:text-white
  `,
  {
    variants: {
      variant: {
        default:
          'bg-accent/70 dark:bg-accent/60 border-gray-400 dark:border-accent',
        info: `bg-info/20 dark:bg-info/40 border-info/50 dark:border-info/40`,
        destructive:
          'bg-destructive/10 dark:bg-destructive/20 border-destructive/50 dark:border-destructive/20',
        warning:
          'bg-warning/10 dark:bg-warning/20 border-warning/50 dark:border-warning/20',
        success:
          'bg-success/10 dark:bg-success/20 border-success/50 dark:border-success/20',
      },
      size: {
        sm: 'text-xs p-2',
        md: 'text-sm px-4 py-3',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  },
);

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> &
    VariantProps<typeof alertVariants> & { icon?: any }
>(({ className, variant, size, icon: Icon, children, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(alertVariants({ variant, size }), className)}
    {...props}
  >
    {Icon && <Icon className="w-4 h-4 -mt-px" />}
    <div className="flex flex-col gap-0.5">{children}</div>
  </div>
));
Alert.displayName = 'Alert';

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn('font-semibold leading-none tracking-tight', className)}
    {...props}
  />
));
AlertTitle.displayName = 'AlertTitle';

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('text-sm [&_p]:leading-relaxed', className)}
    {...props}
  />
));
AlertDescription.displayName = 'AlertDescription';

export { Alert, AlertTitle, AlertDescription };
