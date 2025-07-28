'use client';

import logoDark from '@repo/ui/assets/images/thon-labs-logo-dark.svg';
import logoDarkReduced from '@repo/ui/assets/images/thon-labs-logo-dark-reduced.svg';
import logoLight from '@repo/ui/assets/images/thon-labs-logo-light.svg';
import logoLightReduced from '@repo/ui/assets/images/thon-labs-logo-light-reduced.svg';
import { cn } from '@repo/ui/core/utils';
import Image from 'next/image';
import type React from 'react';

type Props = {
  reduced?: boolean;
};

export default function Logo({
  className,
  reduced,
  ...props
}: Props & Omit<React.ComponentProps<typeof Image>, 'alt' | 'src'>) {
  return (
    <div className={cn('relative h-[1.125rem] w-auto', className)}>
      <Image
        {...props}
        src={reduced ? logoLightReduced : logoLight}
        alt='Thon Labs Logo'
        className='block h-[1.125rem] w-auto dark:hidden'
      />
      <Image
        {...props}
        src={reduced ? logoDarkReduced : logoDark}
        alt='Thon Labs Logo'
        className='hidden h-[1.125rem] w-auto dark:block'
      />
    </div>
  );
}
