'use client';

import { Clipboard } from '@repo/ui/clipboard';
import { cn } from '@repo/ui/core/utils';
import { Skeleton } from '@repo/ui/skeleton';
import { Typo } from '@repo/ui/typo';
import { format } from 'date-fns/format';
import { Check, Copy } from 'lucide-react';
import type React from 'react';

interface Props extends React.HTMLAttributes<HTMLElement> {
  label: React.ReactNode;
  value: React.ReactNode | Date;
  withCopy?: boolean;
  date?: boolean;
  loading?: boolean;
}

export default function BoxKeyValue({
  label,
  value,
  withCopy,
  className,
  date,
  loading,
  ...props
}: Props) {
  return (
    <div className={cn('flex flex-col gap-0.5', className)} {...props}>
      <Typo variant={'muted'} className='font-semibold'>
        {label}
      </Typo>
      {loading ? (
        <Skeleton className='h-[1.375rem] w-24' />
      ) : (
        <Typo variant={'sm'} className='flex items-center gap-1'>
          {date && value
            ? format(new Date(value as string), 'MM/dd/yyyy hh:mm aa')
            : value != null || value !== undefined
              ? (value as React.ReactNode)
              : '-'}
          {withCopy && (
            <Clipboard
              size='xs'
              variant='outline'
              value={value?.toString() as string}
              labels={[Copy, Check]}
              iconLabels
            />
          )}
        </Typo>
      )}
    </div>
  );
}
