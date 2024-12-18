import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../core/utils';

const buttonVariants = cva(
  `inline-flex items-center justify-center whitespace-nowrap rounded-md font-semibold 
  transition-default focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring 
  disabled:pointer-events-none disabled:opacity-50 select-none`,
  {
    variants: {
      variant: {
        primary:
          'bg-primary text-primary-foreground shadow hover:bg-primary/90',
        opposite: 'bg-foreground text-secondary shadow hover:bg-foreground/90',
        destructive:
          'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
        outline: `border text-foreground bg-transparent border-foreground/20 
           hover:bg-card hover:text-accent-foreground group-hover:bg-card group-hover:text-accent-foreground`,
        secondary:
          'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
        ghost: 'text-text hover:bg-foreground/10 hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
        linkGhost:
          'text-accent-foreground/70 hover:bg-accent hover:text-foreground',
        success: 'bg-success shadow-sm hover:bg-success/90',
        info: 'bg-info shadow-sm hover:bg-info/90',
      },
      size: {
        xs: 'py-1 px-2 text-xs gap-1',
        sm: 'py-1.5 px-2 text-sm gap-1',
        md: 'px-3 py-2 text-base gap-1.5',
        lg: 'py-4 px-6 text-lg gap-2',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
);

const buttonIconVariants = cva('', {
  variants: {
    iconSize: {
      xs: 'w-3 h-3',
      sm: 'w-3.5 h-3.5',
      md: 'w-4 h-4',
      lg: 'w-5 h-5',
    },
  },
});

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
  icon?: any;
  active?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      loading,
      disabled,
      children,
      icon: Icon,
      active,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }), {
          'pointer-events-none opacity-50': loading || disabled,
          'bg-foreground/10': active,
        })}
        ref={ref}
        {...props}
      >
        {Icon && (
          <Icon className={cn(buttonIconVariants({ iconSize: size }))} />
        )}
        {children}
      </button>
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants, buttonIconVariants };
