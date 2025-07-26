'use client';

import Image from 'next/image';
import logoDark from '@repo/ui/assets/images/thon-labs-logo-dark.svg';
import logoLight from '@repo/ui/assets/images/thon-labs-logo-light.svg';
import logoDarkReduced from '@repo/ui/assets/images/thon-labs-logo-dark-reduced.svg';
import logoLightReduced from '@repo/ui/assets/images/thon-labs-logo-light-reduced.svg';
import React from 'react';
import { cn } from '@repo/ui/core/utils';

type Props = {
  reduced?: boolean;
};

export default function Logo({
  className,
  reduced,
  ...props
}: Props & Omit<React.ComponentProps<typeof Image>, 'alt' | 'src'>) {
  return (
    <div className={cn('w-auto h-[1.125rem] relative', className)}>
      <Image
        {...props}
        src={reduced ? logoLightReduced : logoLight}
        alt="Thon Labs Logo"
        className="block dark:hidden w-auto h-[1.125rem]"
      />
      <Image
        {...props}
        src={reduced ? logoDarkReduced : logoDark}
        alt="Thon Labs Logo"
        className="hidden dark:block w-auto h-[1.125rem]"
      />
    </div>
  );
}
