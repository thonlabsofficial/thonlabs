'use client';

import React from 'react';
import { cn } from '@repo/ui/core/utils';
import { Typo } from '@repo/ui/typo';
import { Clipboard } from '@repo/ui/clipboard';
import { format } from 'date-fns/format';
import { Copy, Check } from 'lucide-react';
import { Skeleton } from '@repo/ui/skeleton';

interface Props extends React.HTMLAttributes<HTMLElement> {
  label: React.ReactNode;
  value: React.ReactNode | Date;
  withCopy?: boolean;
  copyValue?: string;
  date?: boolean;
  loading?: boolean;
}

export default function BoxKeyValue({
  label,
  value,
  withCopy,
  copyValue,
  className,
  date,
  loading,
  ...props
}: Props) {
  return (
    <div className={cn('flex flex-col gap-0.5 group', className)} {...props}>
      <Typo variant={'muted'} className="font-semibold">
        {label}
      </Typo>
      {loading ? (
        <Skeleton className="h-[1.375rem] w-24" />
      ) : (
        <Typo variant={'sm'} className="flex items-center gap-1">
          {date && value
            ? format(new Date(value as string), 'MM/dd/yyyy hh:mm aa')
            : value != null || value != undefined
              ? (value as React.ReactNode)
              : '-'}
          {withCopy && (
            <Clipboard
              size="xs"
              variant="outline"
              value={copyValue || (value?.toString() as string)}
              labels={[Copy, Check]}
              iconLabels
              className="invisible group-hover:visible opacity-0 group-hover:opacity-100"
            />
          )}
        </Typo>
      )}
    </div>
  );
}
