'use client';

import Image from 'next/image';
import logoDark from '@/ui/assets/images/thon-labs-logo-dark.svg';
import logoLight from '@/ui/assets/images/thon-labs-logo-light.svg';
import React from 'react';
import { cn } from '@/ui/utils';
import { useTheme } from 'next-themes';

export default function Logo({
  className,
  ...props
}: Omit<React.ComponentProps<typeof Image>, 'alt' | 'src'>) {
  const { theme } = useTheme();

  return (
    <Image
      {...props}
      src={theme !== 'dark' ? logoLight : logoDark}
      alt="Thon Labs Logo"
      className={cn('w-auto h-5', className)}
    />
  );
}
