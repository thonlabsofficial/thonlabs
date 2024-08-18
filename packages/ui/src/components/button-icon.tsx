import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../core/utils';
import { IconType } from 'react-icons';
import { Skeleton } from './skeleton';

const buttonIconVariants = cva(
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
        outline:
          'border border-input text-foreground bg-transparent border-foreground/20 hover:bg-card',
        secondary:
          'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
        ghost: 'text-text hover:bg-foreground/10 hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
        linkGhost:
          'text-zinc-500 hover:bg-accent hover:text-accent-foreground hover:text-zinc-600 dark:hover:text-zinc-300',
        success: 'bg-success shadow-sm hover:bg-success/90',
        info: 'bg-info shadow-sm hover:bg-info/90',
      },
      size: {
        xs: 'p-1',
        sm: 'p-1.5',
        md: 'p-2',
        lg: 'p-4',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
);

const iconVariants = cva('', {
  variants: {
    iconSize: {
      xs: 'w-3 h-3',
      sm: 'w-3.5 h-3.5',
      md: 'w-4 h-4',
      lg: 'w-5 h-5',
    },
  },
});

export interface ButtonIconProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonIconVariants> {
  icon: IconType;
  loading?: boolean;
}

const ButtonIcon = React.forwardRef<HTMLButtonElement, ButtonIconProps>(
  (
    { className, variant, size, loading, disabled, children, icon, ...props },
    ref,
  ) => {
    return loading ? (
      <Skeleton className={buttonIconVariants({ size })} />
    ) : (
      <button
        className={cn(buttonIconVariants({ variant, size, className }), {
          'pointer-events-none opacity-50': loading || disabled,
        })}
        ref={ref}
        {...props}
      >
        {icon({ className: cn(iconVariants({ iconSize: size })) })}
      </button>
    );
  },
);
ButtonIcon.displayName = 'ButtonIcon';

export { ButtonIcon, buttonIconVariants };
