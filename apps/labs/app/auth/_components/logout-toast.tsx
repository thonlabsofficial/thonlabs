'use client';

import { apiResponseMessages } from '@/_libs/_nextjs/utils/errors';
import { useToast } from '@repo/ui/hooks/use-toast';
import Utils from '@repo/utils';
import { useSearchParams } from 'next/navigation';
import React from 'react';

export default function LogoutToast() {
  const searchParams = useSearchParams();
  const { toast } = useToast();

  React.useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    const reason = params.get('reason');

    if (reason === 'unauthorized') {
      Utils.delay(10).then(() => {
        toast({
          title: 'Logged out',
          description: apiResponseMessages['40002'],
          duration: 2800,
        });
        params.delete('reason');
        window.history.pushState(null, '', `?${params.toString()}`);
      });
    }
  }, []);

  return null;
}
