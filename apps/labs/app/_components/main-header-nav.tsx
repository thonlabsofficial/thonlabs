'use client';

import { buttonVariants } from '@repo/ui/button';
import { cn } from '@repo/ui/core/utils';
import {
  DatabaseZap,
  LayoutDashboard,
  Settings,
  SquareUser,
} from 'lucide-react';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';

function NavItem({
  icon: Icon,
  label,
  className,
  ...props
}: { icon: any; label: string } & React.ComponentProps<typeof Link>) {
  const pathname = usePathname();
  const href = props.href.toString();

  const splitHref = href.split('/');
  const pathnameSplit = pathname.split('/');
  const isActive = splitHref?.[2] === pathnameSplit?.[2];

  return (
    <Link
      aria-label={label}
      {...props}
      className={buttonVariants({
        variant: 'linkGhost',
        size: 'sm',
        className: cn(
          '!justify-start !p-2 flex w-full items-center gap-2.5 hover:bg-accent/50',
          {
            'bg-accent text-foreground hover:bg-accent': isActive,
          },
          className
        ),
      })}
    >
      {<Icon className='h-4 w-4' />} {label}
    </Link>
  );
}

export default function MainHeaderEnvNav() {
  const { environmentId } = useParams();

  return (
    <nav className='flex items-center gap-2'>
      <NavItem
        icon={LayoutDashboard}
        label='Dashboard'
        href={`/${environmentId}/dashboard`}
      />
      <NavItem
        icon={SquareUser}
        label='Users'
        href={`/${environmentId}/users`}
      />
      <NavItem
        icon={DatabaseZap}
        label='Storage'
        href={`/${environmentId}/kv`}
      />
      <NavItem
        icon={Settings}
        label='Settings'
        href={`/${environmentId}/settings`}
      />
    </nav>
  );
}
