'use client';

import { buttonVariants } from '@repo/ui/button';
import { cn } from '@repo/ui/core/utils';
import {
  DatabaseZap,
  Folder,
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
          'flex items-center gap-2.5 w-full !justify-start !p-2 hover:bg-accent/50',
          {
            'bg-accent text-foreground hover:bg-accent': isActive,
          },
          className,
        ),
      })}
    >
      {<Icon className="w-4 h-4" />} {label}
    </Link>
  );
}

export default function MainHeaderEnvNav() {
  const { environmentId } = useParams();

  return (
    <nav className="flex items-center gap-2">
      <NavItem
        icon={LayoutDashboard}
        label="Dashboard"
        href={`/${environmentId}/dashboard`}
      />
      <NavItem
        icon={SquareUser}
        label="Users"
        href={`/${environmentId}/users`}
      />
      <NavItem
        icon={DatabaseZap}
        label="Storage"
        href={`/${environmentId}/kv`}
      />
      <NavItem
        icon={Settings}
        label="Settings"
        href={`/${environmentId}/settings`}
      />
    </nav>
  );
}
