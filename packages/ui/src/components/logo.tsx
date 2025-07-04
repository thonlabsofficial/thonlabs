'use client';

import Image from 'next/image';
import logoDark from '../assets/images/thon-labs-logo-dark.svg';
import logoLight from '../assets/images/thon-labs-logo-light.svg';
import logoDarkReduced from '../assets/images/thon-labs-logo-dark-reduced.svg';
import logoLightReduced from '../assets/images/thon-labs-logo-light-reduced.svg';
import React from 'react';
import { cn } from '../core/utils';
import { useTheme } from 'next-themes';

type Props = {
  reduced?: boolean;
};

export default function Logo({
  className,
  reduced,
  ...props
}: Props & Omit<React.ComponentProps<typeof Image>, 'alt' | 'src'>) {
  const { resolvedTheme } = useTheme();

  let sourceImg;

  if (resolvedTheme !== 'dark') {
    sourceImg = reduced ? logoLightReduced : logoLight;
  } else {
    sourceImg = reduced ? logoDarkReduced : logoDark;
  }

  return (
    <Image
      {...props}
      src={sourceImg}
      alt="Thon Labs Logo"
      className={cn('w-auto h-[1.125rem]', className)}
    />
  );
}
