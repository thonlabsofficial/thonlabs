'use client';

import * as SelectPrimitive from '@radix-ui/react-select';
import { cva, type VariantProps } from 'class-variance-authority';
import { Check, ChevronDown, ChevronUp, X } from 'lucide-react';
import * as React from 'react';
import { cn } from '../core/utils';
import { Label } from './label';
import { Skeleton } from './skeleton';
import { Typo } from './typo';

const InputSelect = SelectPrimitive.Root;

const InputSelectGroup = SelectPrimitive.Group;

const InputSelectValue = SelectPrimitive.Value;

const inputSelectTriggerVariants = cva(
  `flex w-full items-center justify-between
    text-zinc-900 dark:text-zinc-50 
    rounded-md border border-solid bg-transparent hover:bg-input-hover
    transition duration-200 ease-in-out
    placeholder:text-zinc-300 dark:placeholder:text-zinc-600 
    focus:outline-none disabled:cursor-not-allowed 
    disabled:opacity-50 [&>span]:line-clamp-1`,
  {
    variants: {
      state: {
        default: `border-zinc-200 dark:border-zinc-600 
                  hover:border-zinc-400 dark:hover:border-zinc-500
                  focus:border-zinc-700 dark:focus:border-zinc-300`,
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
  }
);

const loadingSizeMapper = {
  sm: '2.25rem',
  md: '3rem',
  lg: '3.5rem',
};

export interface InputSelectProps
  extends VariantProps<typeof inputSelectTriggerVariants>,
    React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> {
  label?: React.ReactNode;
  error?: React.ReactNode;
  loading?: boolean;
  onClear?: () => void;
}

const InputSelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  InputSelectProps
>(
  (
    {
      className,
      children,
      state,
      size,
      label,
      loading,
      error,
      onClear,
      ...props
    },
    ref
  ) => (
    <>
      {label &&
        (!loading ? (
          <Label htmlFor={props.id}>{label}</Label>
        ) : (
          <Skeleton width={'7.5rem'} height={'0.875rem'} />
        ))}
      {!loading ? (
        <SelectPrimitive.Trigger
          ref={ref}
          className={inputSelectTriggerVariants({
            state: error ? 'error' : state,
            size,
            className,
          })}
          {...props}
        >
          {children}
          <div className='flex items-center gap-2'>
            {props.value && onClear && (
              <X
                className='h-4 w-4 cursor-pointer opacity-50'
                onClick={onClear}
                data-state='closed'
              />
            )}
            <SelectPrimitive.Icon asChild>
              <ChevronDown className='h-4 w-4 opacity-50' />
            </SelectPrimitive.Icon>
          </div>
        </SelectPrimitive.Trigger>
      ) : (
        <Skeleton
          width={'100%'}
          height={loadingSizeMapper[size || 'md']}
          className='!rounded-md'
        />
      )}
      {error && (
        <Typo variant={'sm'} state={'error'}>
          {error}
        </Typo>
      )}
    </>
  )
);
InputSelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const InputSelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn(
      'flex cursor-default items-center justify-center py-1',
      className
    )}
    {...props}
  >
    <ChevronUp className='h-4 w-4' />
  </SelectPrimitive.ScrollUpButton>
));
InputSelectScrollUpButton.displayName =
  SelectPrimitive.ScrollUpButton.displayName;

const InputSelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn(
      'flex cursor-default items-center justify-center py-1',
      className
    )}
    {...props}
  >
    <ChevronDown className='h-4 w-4' />
  </SelectPrimitive.ScrollDownButton>
));
InputSelectScrollDownButton.displayName =
  SelectPrimitive.ScrollDownButton.displayName;

const InputSelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = 'popper', ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-[60] max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=closed]:animate-out data-[state=open]:animate-in',
        position === 'popper' &&
          'data-[side=left]:-translate-x-1 data-[side=top]:-translate-y-1 data-[side=right]:translate-x-1 data-[side=bottom]:translate-y-1',
        className
      )}
      position={position}
      {...props}
    >
      <InputSelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          'p-1',
          position === 'popper' &&
            'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]'
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <InputSelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
InputSelectContent.displayName = SelectPrimitive.Content.displayName;

const InputSelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn('py-1.5 pr-2 pl-8 font-semibold text-sm', className)}
    {...props}
  />
));
InputSelectLabel.displayName = SelectPrimitive.Label.displayName;

const InputSelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      `relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 pr-2 pl-8 text-sm outline-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50`,
      className
    )}
    {...props}
  >
    <span className='absolute left-2 flex h-3.5 w-3.5 items-center justify-center'>
      <SelectPrimitive.ItemIndicator>
        <Check className='h-4 w-4' />
      </SelectPrimitive.ItemIndicator>
    </span>

    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
InputSelectItem.displayName = SelectPrimitive.Item.displayName;

const InputSelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn('-mx-1 my-1 h-px bg-muted', className)}
    {...props}
  />
));
InputSelectSeparator.displayName = SelectPrimitive.Separator.displayName;

export {
  InputSelect,
  InputSelectGroup,
  InputSelectValue,
  InputSelectTrigger,
  InputSelectContent,
  InputSelectLabel,
  InputSelectItem,
  InputSelectSeparator,
  InputSelectScrollUpButton,
  InputSelectScrollDownButton,
};
