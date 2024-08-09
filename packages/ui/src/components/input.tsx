import * as React from 'react';

import { cn } from '../core/utils';
import { VariantProps, cva } from 'class-variance-authority';
import { Typo } from './typo';
import { Label } from './label';
import { Skeleton } from './skeleton';
import { Clipboard } from './clipboard';
import { Button } from './button';

const inputVariants = cva(
  `flex text-zinc-900 dark:text-zinc-50 w-full rounded-md border border-solid hover:bg-input-hover shadow-sm 
	 placeholder:text-zinc-300 dark:placeholder:text-zinc-600
	 transition duration-200 ease-in-out
	 file:border-0 bg-transparent file:text-sm file:font-medium outline-none
	 disabled:opacity-50 disabled:pointer-events-none`,
  {
    variants: {
      state: {
        default: `border-zinc-200 dark:border-zinc-600 
                  hover:border-zinc-400 dark:hover:border-zinc-500
                  focus:border-zinc-700 dark:focus:border-zinc-300
                  read-only:bg-accent
                  hover:read-only:border-zinc-200 dark:hover:read-only:border-zinc-600
                  focus:read-only:border-zinc-200 dark:focus:read-only:border-zinc-600`,
        error: 'border-red-500 focus:border-red-500',
      },
      size: {
        sm: 'px-2.5 py-1 text-sm h-9',
        md: 'px-3 py-1.5 text-base h-11',
        lg: 'px-4 py-2 text-base h-14',
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
  withCopy?: boolean;
  withHide?: boolean;
  hidePlaceholder?: string;
}

const loadingSizeMapper = {
  sm: '2.25rem',
  md: '3rem',
  lg: '3.5rem',
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      size,
      label,
      error,
      state,
      loading,
      withCopy,
      withHide,
      hidePlaceholder = '••••••••••••••••••••••••',
      ...props
    },
    ref,
  ) => {
    const [hidden, setHidden] = React.useState(withHide);
    const [buttonTriggered, setButtonTriggered] = React.useState(0);
    const [buttonsWidth, setButtonsWidth] = React.useState(0);
    const buttonsRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
      if (buttonsRef.current) {
        const { width } = buttonsRef.current?.getBoundingClientRect() || {};
        setButtonsWidth((width + 10) / 16 || 0);
      }
    }, [buttonTriggered]);

    return (
      <>
        {label && (
          <>
            {' '}
            {!loading ? (
              <Label htmlFor={props.id} withFocusWithin={!props.readOnly}>
                {label}
              </Label>
            ) : (
              <Skeleton width={'7.5rem'} height={'0.875rem'} />
            )}
          </>
        )}
        {!loading ? (
          <div className="relative">
            <input
              id={props.name}
              type={type}
              className={cn(
                inputVariants({ size, state: error ? 'error' : state }),
                className,
              )}
              style={{ paddingRight: `${buttonsWidth}rem` }}
              ref={ref}
              {...props}
              value={hidden ? hidePlaceholder : props.value}
            />
            {(withCopy || withHide) && (
              <div
                ref={buttonsRef}
                className="inline-flex gap-1 absolute top-1.5 right-1.5 h-[calc(100%-0.75rem)]"
              >
                {withCopy && !hidden && (
                  <Clipboard
                    className="inline-flex"
                    size="xs"
                    variant="secondary"
                    value={props.value?.toString() || ''}
                    onCopied={() => {
                      setButtonTriggered(Math.random());
                    }}
                    onCopyFinished={() => {
                      setButtonTriggered(Math.random());
                    }}
                  />
                )}
                {withHide && (
                  <Button
                    className="inline-flex"
                    size="xs"
                    variant="secondary"
                    type="button"
                    onClick={() => {
                      setHidden(!hidden);
                      setButtonTriggered(Math.random());
                    }}
                  >
                    {hidden ? 'Show' : 'Hide'}
                  </Button>
                )}
              </div>
            )}
          </div>
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
