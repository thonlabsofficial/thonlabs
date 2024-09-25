import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '../core/utils';

const alertVariants = cva(
  `
    relative w-full rounded-lg border  
    text-gray-900 dark:text-white [&>svg]:text-gray-900 dark:[&>svg]:text-white
    [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 
    [&>svg~*]:pl-7
  `,
  {
    variants: {
      variant: {
        default:
          'bg-accent/70 dark:bg-accent/60 border-gray-400 dark:border-accent',
        info: `bg-sky-100/70 dark:bg-sky-900/60 border-sky-300 dark:border-sky-900`,
        destructive:
          'bg-destructive/10 dark:bg-destructive/20 border-destructive/50 dark:border-destructive',
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
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, size, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(alertVariants({ variant, size }), className)}
    {...props}
  />
));
Alert.displayName = 'Alert';

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn('mb-1 font-semibold leading-none tracking-tight', className)}
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
