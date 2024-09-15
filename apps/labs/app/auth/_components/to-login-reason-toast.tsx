'use client';

import { apiResponseMessages } from '@/_libs/_nextjs/utils/errors';
import { useToast } from '@repo/ui/hooks/use-toast';
import Utils from '@repo/utils';
import { useSearchParams } from 'next/navigation';
import React from 'react';

export default function ToLoginReasonToast() {
  const searchParams = useSearchParams();
  const { toast } = useToast();

  React.useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    const reason = params.get(
      'reason',
    ) as unknown as keyof typeof apiResponseMessages;

    if (reason) {
      Utils.delay(1).then(() => {
        toast({
          title: apiResponseMessages[reason],
          duration: 2800,
          variant: 'destructive',
        });
        params.delete('reason');
        window.history.pushState(null, '', `?${params.toString()}`);
      });
    }
  }, []);

  return null;
}
