import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../core/utils';

const buttonLinkVariants = cva(
  `inline-flex transition-default
  disabled:pointer-events-none disabled:opacity-50 select-none`,
  {
    variants: {
      variant: {
        destructive: 'text-destructive',
      },
      size: {
        xs: 'text-xs',
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg',
      },
    },
    defaultVariants: {
      variant: 'destructive',
      size: 'sm',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonLinkVariants> {
  loading?: boolean;
}

const ButtonLink = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, loading, disabled, children, ...props },
    ref,
  ) => {
    return (
      <button
        className={cn(buttonLinkVariants({ variant, size, className }), {
          'pointer-events-none opacity-50': loading || disabled,
        })}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  },
);
ButtonLink.displayName = 'ButtonLink';

export { ButtonLink, buttonLinkVariants };
