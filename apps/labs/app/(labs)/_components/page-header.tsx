import { Typo } from '@repo/ui/typo';
import React from 'react';
import { IconType } from 'react-icons';

type Props = {
  title: React.ReactNode;
  icon: IconType;
};

export default function PageHeader({
  title,
  icon,
  children,
}: Props & React.HTMLAttributes<HTMLElement>) {
  return (
    <div className="pl-64">
      <header className="border-b bg-card py-6">
        <div className="container w-full flex items-center justify-between px-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-md bg-accent flex items-center justify-center border border-foreground/[0.05]">
              {icon({ className: 'w-4 h-4' })}
            </div>
            <Typo variant={'h3'}>{title}</Typo>
          </div>
          {children}
        </div>
      </header>
    </div>
  );
}
