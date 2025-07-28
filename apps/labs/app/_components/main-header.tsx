import { cn } from '@repo/ui/core/utils';
import Link from 'next/link';
import type React from 'react';
import Logo from '@/_components/logo';
import UserAvatar from '@/_components/user-avatar';
import type { UserSession } from '@/_services/server-auth-session-service';
import MainHeaderEnvNav from './main-header-env-nav';
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
        `fixed top-0 left-0 z-50 flex w-full border-collapse items-center justify-between border-b bg-background px-4 py-3`,
        className
      )}
    >
      <div className='flex items-center gap-1'>
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

      <div className='flex items-center gap-2'>
        <UserAvatar session={session} />
      </div>
    </header>
  );
}
