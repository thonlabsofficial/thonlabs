import * as React from 'react';

import { cn } from '../core/utils';
import { VariantProps, cva } from 'class-variance-authority';
import { Typo } from './typo';
import { Label } from './label';
import { Skeleton } from './skeleton';

const inputVariants = cva(
  `flex text-zinc-900 dark:text-zinc-50 w-full rounded-md border border-solid hover:bg-input-hover shadow-sm 
	 placeholder:text-zinc-300 dark:placeholder:text-zinc-600
	 transition-all duration-200 ease-in-out
	 file:border-0 bg-transparent file:text-sm file:font-medium outline-none
	 disabled:opacity-50 disabled:pointer-events-none`,
  {
    variants: {
      state: {
        default: `border-zinc-200 dark:border-zinc-600 
                  hover:border-zinc-400 dark:hover:border-zinc-500
                  focus:border-zinc-700 dark:focus:border-zinc-300
                  read-only:bg-foreground/[0.05] 
                  hover:read-only:border-zinc-200 dark:hover:read-only:border-zinc-600
                  focus:read-only:border-zinc-200 dark:focus:read-only:border-zinc-600`,
        error: 'border-red-500 focus:border-red-500',
      },
      size: {
        md: 'px-3 py-1 text-sm h-9',
        lg: 'px-4 pb-2 pt-3 text-base h-14',
      },
    },
    defaultVariants: {
      state: 'default',
      size: 'md',
    },
  },
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  label?: React.ReactNode;
  error?: React.ReactNode;
  loading?: boolean;
}

const loadingSizeMapper = {
  md: '2.25rem',
  lg: '3.5rem',
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, size, label, error, state, loading, ...props }, ref) => {
    return (
      <>
        {label && !loading ? (
          <Label htmlFor={props.id} withFocusWithin={!props.readOnly}>
            {label}
          </Label>
        ) : (
          <Skeleton width={'7.5rem'} height={'0.875rem'} />
        )}
        {!loading ? (
          <input
            id={props.name}
            type={type}
            className={cn(
              inputVariants({ size, state: error ? 'error' : state }),
              className,
            )}
            ref={ref}
            {...props}
          />
        ) : (
          <Skeleton
            width={'100%'}
            height={loadingSizeMapper[size || 'md']}
            className="!rounded-md"
          />
        )}
        {error && (
          <Typo variant={'sm'} state={'error'}>
            {error}
          </Typo>
        )}
      </>
    );
  },
);
Input.displayName = 'Input';

function InputWrapper({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <div
      {...props}
      className={cn('flex flex-col space-y-1.5 group', className)}
    >
      {children}
    </div>
  );
}

export { Input, InputWrapper, inputVariants };
