import * as React from 'react';

import { cn } from '../core/utils';
import { VariantProps, cva } from 'class-variance-authority';
import { Typo } from './typo';
import { iconVariants } from './icon-square';
import { ArrowRight } from 'lucide-react';

const cardVariants = cva(
  `rounded-lg border text-card-foreground shadow transition-all duration-120 ease-in-out`,
  {
    variants: {
      variant: {
        default: 'bg-card',
        transparent: 'bg-transparent',
        darker: 'bg-background/40',
        link: 'group bg-card hover:bg-muted/40 cursor-pointer',
        black: 'bg-white dark:bg-black',
      },
      border: {
        solid: 'border-solid',
        dashed: 'border-dashed border-foreground/[0.12]',
      },
    },
    defaultVariants: {
      variant: 'default',
      border: 'solid',
    },
  },
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  icon?: any;
  padding?: boolean;
}

const Card = React.forwardRef<
  HTMLDivElement,
  CardProps & React.HTMLAttributes<HTMLDivElement>
>(
  (
    { className, variant, border, icon: Icon, padding, children, ...props },
    ref,
  ) => (
    <div
      ref={ref}
      className={cn(
        cardVariants({ variant, border }),
        {
          'p-5': padding,
        },
        className,
      )}
      {...props}
    >
      {Icon ? (
        <div className="flex gap-3">
          <Icon className={iconVariants({ size: 'md' })} />
          <div className="flex flex-col gap-2">{children}</div>
        </div>
      ) : (
        children
      )}
    </div>
  ),
);
Card.displayName = 'Card';

function CardHeader({
  className,
  padding,
  description,
  children,
  ...props
}: {
  padding?: boolean;
  description?: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'flex flex-col',
        {
          'p-5': padding,
        },
        className,
      )}
      {...props}
    >
      {children}
      {description && <Typo variant={'muted'}>{description}</Typo>}
    </div>
  );
}

const CardTitle = ({
  className,
  ...props
}: React.ComponentProps<typeof Typo>) => (
  <Typo variant={'baseBold'} className={className} {...props} />
);
CardTitle.displayName = 'CardTitle';

const CardArrowRight = ({
  className,
  ...props
}: React.ComponentProps<typeof ArrowRight>) => (
  <ArrowRight
    className={cn(
      'group-hover:translate-x-1 transition-all duration-120 ease-in-out',
      className,
    )}
    {...props}
  />
);
CardArrowRight.displayName = 'CardArrowRight';

const CardDescription = ({
  className,
  ...props
}: React.ComponentProps<typeof Typo>) => (
  <Typo
    as="p"
    variant={'muted'}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
);
CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={className} {...props} />
));
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center py-4 px-6 border-t', className)}
    {...props}
  />
));
CardFooter.displayName = 'CardFooter';

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  CardArrowRight,
  cardVariants,
};
