import React from 'react';
import { cn } from '@/ui/utils';
import dynamic from 'next/dynamic';
import Link from 'next/link';

const Logo = dynamic(() => import('../logo'), { ssr: false });

type Props = {
  withNav?: boolean;
};

export default function MainHeader({
  withNav = true,
  className,
  ...props
}: Props & React.HTMLAttributes<HTMLElement>) {
  return (
    <header
      {...props}
      className={cn(
        'px-4 pb-5 pt-7 w-full flex items-center justify-center sm:justify-between',
        className
      )}
    >
      <Link href="/">
        <Logo />
      </Link>

      {withNav && <nav>Future nav</nav>}
    </header>
  );
}
