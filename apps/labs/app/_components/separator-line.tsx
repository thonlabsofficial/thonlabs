import { cn } from '@repo/ui/core/utils';
import type React from 'react';

export default function SeparatorLine({
  className,
}: React.HTMLAttributes<HTMLElement>) {
  return <div className={cn('my-6 h-px w-full bg-border', className)} />;
}
