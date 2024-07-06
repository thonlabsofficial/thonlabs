import * as React from 'react';

import { cn } from '../core/utils';
import { VariantProps, cva } from 'class-variance-authority';
import { Typo } from './typo';
import { Label } from './label';

const inputVariants = cva(
  `flex text-zinc-900 dark:text-zinc-50 w-full rounded-md border border-solid hover:bg-input-hover shadow-sm 
	 placeholder:text-zinc-300 dark:placeholder:text-zinc-600
	 transition-all duration-200 ease-in-out
	 file:border-0 bg-transparent file:text-sm file:font-medium outline-none
	 disabled:cursor-not-allowed disabled:opacity-50`,
  {
    variants: {
      state: {
        default: `border-zinc-200 dark:border-zinc-600 
                  hover:border-zinc-400 dark:hover:border-zinc-500
                  focus:border-zinc-700 dark:focus:border-zinc-300`,
        error: 'border-red-500 focus:border-red-500',
      },
      inputSize: {
        default: 'px-3 py-1 text-sm h-9',
        lg: 'px-4 pb-2 pt-3 text-base h-13',
      },
    },
    defaultVariants: {
      state: 'default',
      inputSize: 'default',
    },
  },
);

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  label?: React.ReactNode;
  error?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, inputSize, label, error, state, ...props }, ref) => {
    return (
      <>
        {label && <Label htmlFor={props.id}>{label}</Label>}
        <input
          id={props.name}
          type={type}
          className={cn(
            inputVariants({ inputSize, state: error ? 'error' : state }),
            className,
          )}
          ref={ref}
          {...props}
        />
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
