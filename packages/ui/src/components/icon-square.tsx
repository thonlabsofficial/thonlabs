import { cva, VariantProps } from 'class-variance-authority';

const iconSquareVariants = cva(
  'rounded-md bg-accent/50 flex items-center justify-center',
  {
    variants: {
      variant: {
        bordered: 'border border-foreground/[0.05]',
      },
      size: {
        sm: 'w-6 h-6',
        md: 'w-8 h-8',
        lg: 'w-10 h-10',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
);

const iconVariants = cva('', {
  variants: {
    size: {
      sm: 'w-4 h-4',
      md: 'w-6 h-6',
      lg: 'w-8 h-8',
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
}

const IconSquare = ({ icon: Icon, size }: IconSquareProps) => {
  return (
    <div className={iconSquareVariants({ size })}>
      <Icon className={iconVariants({ size })} />
    </div>
  );
};

export { IconSquare };
