import { Typo } from '@repo/ui/typo';
import React from 'react';

type Props = {
  title: React.ReactNode;
};

export default function PageHeader({
  title,
  children,
}: Props & React.HTMLAttributes<HTMLElement>) {
  return (
    <div className="pl-64">
      <header className="border-b bg-card py-6">
        <div className="container w-full flex items-center justify-between px-3">
          <Typo variant={'h3'}>{title}</Typo>
          {children}
        </div>
      </header>
    </div>
  );
}
