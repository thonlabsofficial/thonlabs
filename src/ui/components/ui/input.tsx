import * as React from 'react';

import { cn } from '@/ui/utils';
import { VariantProps, cva } from 'class-variance-authority';

const inputVariants = cva(
  `flex w-full rounded-md border border-input border-solid bg-transparent shadow-sm 
	 placeholder:text-muted-foreground 
	 transition-all duration-200 ease-in-out
	 file:border-0 file:bg-transparent file:text-sm file:font-medium 
	 hover:border-input-hover
	 outline-none focus:border-primary
	 disabled:cursor-not-allowed disabled:opacity-50`,
  {
    variants: {
      inputSize: {
        default: 'px-3 py-1 text-sm h-9',
        lg: 'px-4 pb-2 pt-3 text-base h-13',
      },
    },
    defaultVariants: {
      inputSize: 'default',
    },
  }
);

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, inputSize, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(inputVariants({ inputSize }), className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export { Input, inputVariants };
