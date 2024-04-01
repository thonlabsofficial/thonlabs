import React from 'react';
import { Typo } from '../../ui/typo';
import { cn } from '@/ui/utils';

type Props = {
  title: React.ReactNode;
  description: React.ReactNode;
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
      <Typo variant={'muted'} className="!text-zinc-400">
        {description}
      </Typo>
    </header>
  );
}
