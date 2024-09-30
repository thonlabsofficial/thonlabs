import React from 'react';
import { cn } from '@repo/ui/core/utils';
import { Typo } from '@repo/ui/typo';
import { Clipboard } from '@repo/ui/clipboard';
import { format } from 'date-fns/format';
import { Copy, Check } from 'lucide-react';

interface Props extends React.HTMLAttributes<HTMLElement> {
  label: React.ReactNode;
  value: React.ReactNode | Date;
  withCopy?: boolean;
  date?: boolean;
}

export default function BoxKeyValue({
  label,
  value,
  withCopy,
  className,
  date,
  ...props
}: Props) {
  return (
    <div className={cn('flex flex-col gap-0.5', className)} {...props}>
      <Typo variant={'muted'} className="font-semibold">
        {label}
      </Typo>
      <Typo variant={'sm'} className="flex items-center gap-1">
        {date && value
          ? format(new Date(value as string), 'MM/dd/yyyy hh:mm aa')
          : value
            ? (value as React.ReactNode)
            : '-'}
        {withCopy && (
          <Clipboard
            size="xs"
            variant="outline"
            value={value?.toString() as string}
            labels={[Copy, Check]}
            iconLabels
          />
        )}
      </Typo>
    </div>
  );
}
