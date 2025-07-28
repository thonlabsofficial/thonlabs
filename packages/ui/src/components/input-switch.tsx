import * as React from 'react';
import { cn } from '../core/utils';
import { Spinner } from './spinner';
import { Switch } from './switch';
import { Typo } from './typo';

export interface InputSwitchProps extends React.HTMLAttributes<HTMLElement> {
  label: React.ReactNode;
  value: React.ComponentProps<typeof Switch>['value'];
  onCheckedChange: React.ComponentProps<typeof Switch>['onCheckedChange'];
  checked?: React.ComponentProps<typeof Switch>['checked'];
  description?: React.ReactNode;
  error?: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
}

const InputSwitch = React.forwardRef<HTMLInputElement, InputSwitchProps>(
  (
    {
      className,
      label,
      description,
      error,
      loading,
      value,
      onCheckedChange,
      checked,
      disabled,
      ...props
    },
    _
  ) => {
    return (
      <label
        className={cn(
          `flex cursor-pointer select-none items-center gap-3 rounded-md py-1 `,
          {
            'pointer-events-none opacity-50': disabled,
          },
          className
        )}
        {...props}
      >
        <div className='flex w-11 justify-center'>
          {!loading ? (
            <Switch
              value={value}
              onCheckedChange={onCheckedChange}
              checked={checked}
            />
          ) : (
            <Spinner className='h-6 w-6' />
          )}
        </div>
        <div className='flex flex-col gap-0.5'>
          <Typo variant={'sm'}>{label}</Typo>
          {description && (
            <Typo variant={'muted'} className='font-normal'>
              {description}
            </Typo>
          )}
        </div>
      </label>
    );
  }
);

export { InputSwitch };
