import * as React from 'react';

import { cn } from '../core/utils';
import { VariantProps, cva } from 'class-variance-authority';
import { Typo } from './typo';
import { Label } from './label';
import { Skeleton } from './skeleton';

const inputRadioOptionsWrapperVariants = cva(
  `flex gap-3 items-center cursor-pointer group
   disabled:opacity-50 disabled:pointer-events-none`,
  {
    variants: {
      state: {
        default: `border-zinc-100 dark:border-zinc-700`,
        error: 'border-red-500 focus:border-red-500',
      },
      size: {
        sm: 'px-2.5 py-1 text-sm h-9',
        md: 'px-3 py-1.5 text-base h-14',
        lg: 'px-4 py-2 text-base h-14',
      },
    },
    defaultVariants: {
      state: 'default',
      size: 'md',
    },
  },
);

const inputRadioOptionVariants = cva(``, {
  variants: {
    state: {
      default: `appearance-none rounded-full ring-2 transition-default
        ring-zinc-200 dark:ring-zinc-600 -translate-y-0.5
        group-hover:ring-zinc-500
        checked:bg-zinc-700 dark:checked:bg-zinc-300 checked:ring-zinc-700 dark:checked:ring-zinc-300`,
      wrapper: ``,
      error: 'border-red-500 focus:border-red-500',
    },
    size: {
      sm: 'w-3 h-3',
      md: 'w-4 h-4',
      lg: 'w-5 h-5',
    },
  },
  defaultVariants: {
    state: 'default',
    size: 'md',
  },
});

const loadingSizeMapper = {
  sm: '2.25rem',
  md: '7.125rem',
  lg: '3.5rem',
};

export interface InputRadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputRadioOptionsWrapperVariants> {
  label?: React.ReactNode;
  error?: React.ReactNode;
  loading?: boolean;
  options: {
    value: React.InputHTMLAttributes<HTMLInputElement>['value'];
    label: React.ReactNode;
    description?: React.ReactNode;
  }[];
}

const InputRadio = React.forwardRef<HTMLInputElement, InputRadioProps>(
  ({ className, label, error, loading, options, size, ...props }, ref) => {
    if (!options) {
      console.error('[Radio Input]: Missing options for radio input');
      return;
    }

    return (
      <div className={cn('flex flex-col space-y-1.5', className)}>
        {label && (
          <>
            {!loading ? (
              <Label withFocusWithin={!props.readOnly}>{label}</Label>
            ) : (
              <Skeleton width={'7.5rem'} height={'0.875rem'} />
            )}
          </>
        )}

        {!loading ? (
          <div className="border rounded-md border-zinc-200 dark:border-zinc-600 overflow-hidden">
            {options.map((option, index) => (
              <Label
                className={inputRadioOptionsWrapperVariants({
                  size,
                  state: error ? 'error' : 'default',
                  className: cn(
                    `
                    text-zinc-600 dark:text-zinc-400
                    group-hover:text-zinc-800 dark:group-hover:text-zinc-200 
                    has-[:checked]:text-zinc-800 dark:has-[:checked]:text-zinc-200 has-[:checked]:bg-accent
                    transition-default
                    `,
                    {
                      'border-t': index > 0,
                    },
                    className,
                  ),
                })}
                withFocusWithin={false}
                key={`input-radio-option-${option.value}-${index}`}
              >
                {!loading ? (
                  <>
                    <span
                      className={inputRadioOptionVariants({
                        state: 'wrapper',
                        size,
                      })}
                    >
                      <input
                        className={inputRadioOptionVariants({
                          size,
                          state: error ? 'error' : 'default',
                        })}
                        type="radio"
                        value={option.value}
                        ref={ref}
                        {...props}
                      />
                    </span>
                    <span className="flex flex-col">
                      <Typo variant={'sm'}>{option.label}</Typo>
                      {option.description && (
                        <Typo variant={'muted'} className="font-normal">
                          {option.description}
                        </Typo>
                      )}
                    </span>
                  </>
                ) : (
                  <Skeleton
                    width={'100%'}
                    height={loadingSizeMapper[size || 'md']}
                    className="!rounded-md"
                  />
                )}
              </Label>
            ))}
          </div>
        ) : (
          <Skeleton width={'100%'} height={loadingSizeMapper[size || 'md']} />
        )}

        {error && (
          <Typo variant={'sm'} state={'error'}>
            {error}
          </Typo>
        )}
      </div>
    );
  },
);

export { InputRadio };
