'use client';

import { apiResponseMessages } from '@/_libs/_nextjs/utils/errors';
import { useToast } from '@repo/ui/hooks/use-toast';
import Utils from '@repo/utils';
import { useSearchParams } from 'next/navigation';
import React from 'react';

export default function ToasterObservable() {
  const searchParams = useSearchParams();
  const { toast } = useToast();

  React.useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    const info = params.get(
      'info',
    ) as unknown as keyof typeof apiResponseMessages;
    const reason = params.get(
      'reason',
    ) as unknown as keyof typeof apiResponseMessages;
    const message = apiResponseMessages[reason] || apiResponseMessages[info];

    if (message) {
      Utils.delay(1).then(() => {
        toast({
          title: message,
          duration: 2800,
          variant: reason ? 'destructive' : 'default',
        });
        params.delete('reason');
        params.delete('info');
        window.history.pushState(null, '', `?${params.toString()}`);
      });
    }
  }, []);

  return null;
}
