import * as React from 'react';
import { Typo } from './typo';
import { Switch } from './switch';
import { cn } from '../core/utils';
import { Skeleton } from './skeleton';

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
    return !loading ? (
      <label
        className={cn(
          `
          flex gap-3 items-center rounded-md border p-3
          cursor-pointer select-none
        `,
          className,
        )}
        {...props}
      >
        <Switch
          value={value}
          onCheckedChange={onCheckedChange}
          checked={checked}
        />
        <div className="flex flex-col gap-0.5">
          <Typo variant={'sm'}>{label}</Typo>
          {description && (
            <Typo variant={'muted'} className="font-normal">
              {description}
            </Typo>
          )}
        </div>
      </label>
    ) : (
      <Skeleton className="h-[4.75rem] w-full" />
    );
  },
);

export { InputSwitch };
