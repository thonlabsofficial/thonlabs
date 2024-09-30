'use client';

import * as sonner from 'sonner';

const variantMapper: Record<
  'default' | 'destructive' | 'info' | 'success',
  {
    type: 'message' | 'error' | 'info' | 'success';
  }
> = {
  default: {
    type: 'message',
  },
  destructive: {
    type: 'error',
  },
  info: {
    type: 'info',
  },
  success: {
    type: 'success',
  },
};

function useToast() {
  function toast({
    title,
    description,
    variant = 'default',
    duration = 2000,
  }: {
    title?: string;
    description: string;
    variant?: 'default' | 'destructive' | 'info' | 'success';
    duration?: number;
  }) {
    const { type } = variantMapper[variant];

    return sonner.toast[type](title, {
      description,
      position: 'bottom-right',
      closeButton: true,
      richColors: true,
      duration,
    });
  }

  return {
    toast,
  };
}

export { useToast };
