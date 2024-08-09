import { cn } from '@repo/ui/core/utils';
import { Typo } from '@repo/ui/typo';
import React from 'react';
import { IconType } from 'react-icons';

type Props = {
  title: React.ReactNode;
  icon: IconType;
  description?: React.ReactNode;
};

export default function PageHeader({
  title,
  icon,
  description,
  children,
}: Props & React.HTMLAttributes<HTMLElement>) {
  return (
    <div className="pl-64">
      <header className="border-b bg-card py-6">
        <div className="container w-full flex items-center justify-between px-3">
          <div
            className={cn('flex gap-3', {
              'items-center': !description,
            })}
          >
            <div className="w-10 h-10 rounded-md bg-accent flex items-center justify-center border border-foreground/[0.05]">
              {icon({ className: 'w-4 h-4' })}
            </div>
            <div className="flex flex-col">
              <Typo variant={'h3'}>{title}</Typo>
              {description && <Typo variant={'muted'}>{description}</Typo>}
            </div>
          </div>
          {children}
        </div>
      </header>
    </div>
  );
}
