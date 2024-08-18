import React from 'react';
import { cn } from '@repo/ui/core/utils';
import { Typo } from '@repo/ui/typo';
import { Clipboard } from '@repo/ui/clipboard';
import { LuCheck, LuCopy } from 'react-icons/lu';
import { format } from 'date-fns/format';

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
      <Typo variant={'muted'}>{label}</Typo>
      <Typo variant={'sm'} className="flex items-center gap-1">
        {date
          ? format(new Date(value as string), 'MM/dd/yyyy hh:mm aa')
          : (value as React.ReactNode)}
        {withCopy && (
          <Clipboard
            size="xs"
            variant="outline"
            value={value?.toString() as string}
            labels={[LuCopy, LuCheck]}
          />
        )}
      </Typo>
    </div>
  );
}
