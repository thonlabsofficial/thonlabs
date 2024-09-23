import { cn } from '@repo/ui/core/utils';
import React from 'react';

type Props = {
  withGutter?: boolean;
};

export default function Container({
  children,
  className,
  withGutter = true,
  ...props
}: Props & React.HTMLAttributes<HTMLElement>) {
  return (
    <div
      {...props}
      className={cn(
        'container mx-auto 2xl:max-w-[75rem]',
        {
          'px-3': withGutter,
        },
        className,
      )}
    >
      {children}
    </div>
  );
}
