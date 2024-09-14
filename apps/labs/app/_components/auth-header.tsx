import React from 'react';
import { Typo } from '@repo/ui/typo';
import { cn } from '@repo/ui/core/utils';

type Props = {
  title: React.ReactNode;
  description?: React.ReactNode;
};

export default function AuthHeader({
  title,
  description,
  className,
  ...props
}: Props & React.HTMLAttributes<HTMLElement>) {
  return (
    <header {...props} className={cn('flex flex-col gap-1', className)}>
      <Typo variant={'h2'}>{title}</Typo>
      {description && (
        <Typo variant={'muted'} className="!text-gray-400">
          {description}
        </Typo>
      )}
    </header>
  );
}
