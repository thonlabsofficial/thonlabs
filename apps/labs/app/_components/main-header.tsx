import React from 'react';
import { cn } from '@repo/ui/core/utils';
import Link from 'next/link';
import MainHeaderEnvNav from './main-header-env-nav';
import { UserSession } from '@/_services/server-auth-session-service';
import UserAvatar from '@/_components/user-avatar';
import Logo from '@/_components/logo';
import MainNavHorizontal from './main-nav-horizontal';

type Props = {
  withNav?: boolean;
  logoReduced?: boolean;
  session?: UserSession;
  environmentId?: string;
};

export default function MainHeader({
  withNav = true,
  logoReduced = false,
  session,
  className,
  environmentId,
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
        {environmentId ? (
          <Link href={`/${environmentId}/dashboard`}>
            <Logo reduced={logoReduced} />
          </Link>
        ) : (
          <Logo reduced={logoReduced} />
        )}
        {withNav && <MainHeaderEnvNav />}
      </div>

      {withNav && environmentId && (
        <MainNavHorizontal environmentId={environmentId} />
      )}

      <div className="flex items-center gap-2">
        <UserAvatar session={session} />
      </div>
    </header>
  );
}
