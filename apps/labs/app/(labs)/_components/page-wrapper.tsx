import { cn } from '@repo/ui/core/utils';
import React from 'react';

export default function PageWrapper({
  children,
  className,
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <div className="pl-64">
      <div className={cn('px-3 py-2 container', className)}>{children}</div>
    </div>
  );
}
