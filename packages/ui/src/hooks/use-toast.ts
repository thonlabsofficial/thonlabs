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
    position = 'top-right',
  }: {
    title?: string;
    description: string;
    variant?: 'default' | 'destructive' | 'info' | 'success';
    duration?: number;
    position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  }) {
    sonner.toast.dismiss();

    const { type } = variantMapper[variant];

    return sonner.toast[type](title, {
      description,
      closeButton: true,
      richColors: true,
      position,
      duration,
    });
  }

  return {
    toast,
    toastDismiss: sonner.toast.dismiss,
  };
}

export { useToast };
