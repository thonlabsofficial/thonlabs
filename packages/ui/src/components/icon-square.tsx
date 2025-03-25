import { cva, VariantProps } from 'class-variance-authority';
import { cn } from '../core/utils';

const iconSquareVariants = cva(
  'rounded-md bg-accent/50 flex-none flex items-center justify-center',
  {
    variants: {
      variant: {
        default: 'bg-foreground/[0.08]',
      },
      size: {
        sm: 'basis-6 w-6 h-6',
        md: 'basis-9 w-9 h-9',
        lg: 'basis-10 w-10 h-10',
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'default',
    },
  },
);

const iconVariants = cva('', {
  variants: {
    size: {
      sm: 'flex-none basis-4 w-4 h-4',
      md: 'flex-none basis-6 w-6 h-6',
      lg: 'flex-none basis-8 w-8 h-8',
      xl: 'flex-none basis-10 w-10 h-10',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export interface IconSquareProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'size'>,
    VariantProps<typeof iconSquareVariants> {
  icon: any;
  bordered?: boolean;
}

const IconSquare = ({
  icon: Icon,
  size,
  variant,
  bordered,
  className,
  ...props
}: IconSquareProps) => {
  return (
    <div
      className={iconSquareVariants({
        size,
        variant,
        className: cn(
          {
            'border border-foreground/[0.05]': bordered,
          },
          className,
        ),
      })}
      {...props}
    >
      <Icon className={iconVariants({ size })} />
    </div>
  );
};

export { IconSquare, iconVariants };
