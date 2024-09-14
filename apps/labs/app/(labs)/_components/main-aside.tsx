'use client';

import { Environment } from '@/(labs)/_interfaces/environment';
import { buttonVariants } from '@repo/ui/button';
import Link from 'next/link';
import useUserSession from '@labs/_hooks/use-user-session';
import { usePathname } from 'next/navigation';
import Utils from '@repo/utils';
import { Avatar, AvatarFallback } from '@repo/ui/avatar';
import { UserSession } from '../_services/server-auth-session-service';
import { Typo } from '@repo/ui/typo';
import { IconType } from 'react-icons';
import { cn } from '@repo/ui/core/utils';
import { LuLayoutDashboard, LuMail, LuSettings, LuUser } from 'react-icons/lu';

type Props = {
  environment: Environment;
  session: UserSession;
};

function NavItem({
  icon,
  label,
  className,
  ...props
}: { icon: IconType; label: string } & React.ComponentProps<typeof Link>) {
  const pathname = usePathname();
  const href = props.href.toString();

  return (
    <Link
      aria-label={label}
      {...props}
      className={buttonVariants({
        variant: 'linkGhost',
        size: 'sm',
        className: cn(
          'flex items-center gap-2.5 w-full !justify-start !p-2 !font-normal',
          {
            '!text-zinc-900 dark:!text-zinc-50 bg-accent pointer-events-none':
              href !== '/' ? href === pathname : href.startsWith(pathname),
          },
          className,
        ),
      })}
    >
      {icon({ className: 'w-4 h-4' })} {label}
    </Link>
  );
}

export default function MainAside({ environment, session }: Props) {
  const { environment: clientEnvironment } = useUserSession();
  const pathname = usePathname();

  return (
    !pathname.startsWith('/projects') &&
    (clientEnvironment || environment) && (
      <aside className="w-64 fixed top-0 left-0 border-r border-collapse bg-background flex flex-col justify-between px-1.5 py-2 h-[calc(100%-3.5625rem)] mt-[3.5625rem] pb-1.5">
        <nav className="w-full flex flex-col justify-between h-[92vh]">
          <div className="flex flex-col gap-1 w-full">
            <NavItem label="Dashboard" href="/" icon={LuLayoutDashboard} />
            <NavItem label="Users" href="/users" icon={LuUser} />
            <NavItem label="Emails" href="/emails" icon={LuMail} />
            <NavItem label="Settings" href="/settings" icon={LuSettings} />
          </div>
        </nav>
      </aside>
    )
  );
}
