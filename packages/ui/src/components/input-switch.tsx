import * as React from 'react';
import { Typo } from './typo';
import { Switch } from './switch';
import { cn } from '../core/utils';

export interface InputSwitchProps extends React.HTMLAttributes<HTMLElement> {
  label: React.ReactNode;
  value: React.ComponentProps<typeof Switch>['value'];
  onCheckedChange: React.ComponentProps<typeof Switch>['onCheckedChange'];
  checked?: React.ComponentProps<typeof Switch>['checked'];
  description?: React.ReactNode;
  error?: React.ReactNode;
  loading?: boolean;
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
      ...props
    },
    _,
  ) => {
    return (
      <label
        className={cn(
          `
          flex gap-3 items-center justify-between rounded-lg border p-4
          cursor-pointer select-none
          border-zinc-200 dark:border-zinc-600 
          hover:border-zinc-400 dark:hover:border-zinc-500
        `,
          className,
        )}
        {...props}
      >
        <div className="flex flex-col gap-0.5">
          <Typo variant={'sm'}>{label}</Typo>
          {description && (
            <Typo variant={'muted'} className="font-normal">
              {description}
            </Typo>
          )}
        </div>
        <Switch
          value={value}
          onCheckedChange={onCheckedChange}
          checked={checked}
        />
      </label>
    );
  },
);

export { InputSwitch };
