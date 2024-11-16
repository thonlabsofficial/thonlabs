import React from 'react';
import { cn } from '@repo/ui/core/utils';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import MainHeaderEnvNav from './main-header-env-nav';
import { UserSession } from '@/_services/server-auth-session-service';
import UserAvatar from '@/_components/user-avatar';
import MainHeaderNav from '@/_components/main-header-nav';

const Logo = dynamic(() => import('./logo'), { ssr: false });

type Props = {
  withNav?: boolean;
  logoReduced?: boolean;
  session?: UserSession;
};

export default function MainHeader({
  withNav = true,
  logoReduced = false,
  session,
  className,
  ...props
}: Props & React.HTMLAttributes<HTMLElement>) {
  return (
    <header
      {...props}
      className={cn(
        `fixed top-0 left-0 px-4 py-3 border-b border-collapse w-full flex items-center 
         justify-between bg-background z-50`,
        className,
      )}
    >
      <div className="flex items-center gap-1">
        <Link href="/projects">
          <Logo reduced={logoReduced} />
        </Link>
        {withNav && <MainHeaderEnvNav />}
      </div>

      {/* <MainHeaderNav /> */}

      <div className="flex items-center gap-2">
        <UserAvatar session={session} />
      </div>
    </header>
  );
}
