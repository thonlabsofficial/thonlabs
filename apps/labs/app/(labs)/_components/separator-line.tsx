import { cn } from '@repo/ui/core/utils';
import React from 'react';

export default function SeparatorLine({
  className,
}: React.HTMLAttributes<HTMLElement>) {
  return <div className={cn('h-px bg-border w-full my-6', className)} />;
}
