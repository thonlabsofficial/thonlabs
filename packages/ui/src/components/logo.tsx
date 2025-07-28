'use client';

import Image from 'next/image';
import { useTheme } from 'next-themes';
import type React from 'react';
import logoDark from '../assets/images/thon-labs-logo-dark.svg';
import logoDarkReduced from '../assets/images/thon-labs-logo-dark-reduced.svg';
import logoLight from '../assets/images/thon-labs-logo-light.svg';
import logoLightReduced from '../assets/images/thon-labs-logo-light-reduced.svg';
import { cn } from '../core/utils';

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
      alt='Thon Labs Logo'
      className={cn('h-[1.125rem] w-auto', className)}
    />
  );
}
