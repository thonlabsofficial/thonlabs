import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../core/utils';
import { ButtonIconProps } from './button-icon';

const buttonIconGroupVariants = cva('inline-flex rounded-md shadow-sm', {
  variants: {
    variant: {
      default: 'bg-background',
      outline: 'border border-input',
      ghost: 'bg-transparent',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

interface ButtonGroupProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof buttonIconGroupVariants> {
  children: React.ReactElement<ButtonIconProps>[];
  activeIndex?: number;
  onActiveChange?: (index: number) => void;
}

export const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  (
    { className, variant, children, activeIndex, onActiveChange, ...props },
    ref,
  ) => {
    const [internalActiveIndex, setInternalActiveIndex] = React.useState(
      activeIndex || -1,
    );

    React.useEffect(() => {
      if (activeIndex !== undefined) {
        setInternalActiveIndex(activeIndex);
      }
    }, [activeIndex]);

    const handleClick = (index: number) => {
      setInternalActiveIndex(index);
      onActiveChange?.(index);
    };

    return (
      <div
        className={cn(buttonIconGroupVariants({ variant }), className)}
        ref={ref}
        {...props}
      >
        {React.Children.map(children, (child, index) => {
          if (React.isValidElement<ButtonIconProps>(child)) {
            return React.cloneElement(child, {
              active: index === internalActiveIndex,
              ...child.props,
              variant: variant === 'outline' ? 'outline' : child.props.variant,
              className: cn(
                child.props.className,
                index === 0 && 'rounded-l-md rounded-r-none',
                index === children.length - 1 && 'rounded-r-md rounded-l-none',
                index > 0 && index < children.length - 1 && 'rounded-none',
                variant === 'outline' && index > 0 && '-ml-px',
              ),
              onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
                child.props.onClick?.(e);
                handleClick(index);
              },
            });
          }
          return child;
        })}
      </div>
    );
  },
);

ButtonGroup.displayName = 'ButtonGroup';
