import { cn } from '@repo/ui/core/utils';
import { Typo } from '@repo/ui/typo';
import React from 'react';
import { IconType } from 'react-icons';
import Container from './container';

type Props = {
  title: React.ReactNode;
  icon: IconType;
  description?: React.ReactNode;
  withContainer?: boolean;
};

export default function PageHeader({
  title,
  icon,
  description,
  withContainer,
  children,
}: Props & React.HTMLAttributes<HTMLElement>) {
  const body = React.useMemo(
    () => (
      <div
        className={cn('w-full flex items-center justify-between', {
          'px-3': !withContainer,
        })}
      >
        <div
          className={cn('flex gap-2', {
            'items-center': !description,
          })}
        >
          <div className="w-8 h-8 rounded-md bg-card flex items-center justify-center border border-foreground/[0.05]">
            {icon({ className: 'w-4 h-4' })}
          </div>
          <div className="flex flex-col">
            <Typo variant={'h4'}>{title}</Typo>
            {description && <Typo variant={'muted'}>{description}</Typo>}
          </div>
        </div>
        {children}
      </div>
    ),
    [withContainer],
  );

  return (
    <div className="pl-64">
      <header className="bg-background py-3 mt-2">
        {withContainer ? <Container>{body}</Container> : body}
      </header>
    </div>
  );
}
