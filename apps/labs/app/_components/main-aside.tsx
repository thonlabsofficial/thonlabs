'use client';

import { buttonVariants } from '@repo/ui/button';
import Link from 'next/link';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { cn } from '@repo/ui/core/utils';
import {
  Building,
  Database,
  LayoutDashboard,
  Mail,
  Settings,
  ShieldEllipsis,
  SquareUser,
} from 'lucide-react';

function NavItem({
  icon: Icon,
  label,
  className,
  ...props
}: { icon: any; label: string } & React.ComponentProps<typeof Link>) {
  const pathname = usePathname();
  const router = useRouter();
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
          'flex items-center gap-2.5 w-full !justify-start !p-2 !font-normal hover:bg-accent/50',
          {
            'bg-accent/60 text-foreground hover:bg-accent border border-accent':
              isActive,
          },
          className,
        ),
      })}
      onMouseEnter={() => router.prefetch(href)}
    >
      <Icon className="flex-none basis-5 size-5" />
      <span className="opacity-0 group-hover:opacity-100 group-hover:visible transition-all duration-150 w-0 group-hover:w-auto overflow-hidden whitespace-nowrap">
        {label}
      </span>
    </Link>
  );
}

export default function MainAside() {
  const { environmentId } = useParams();

  return (
    <aside
      className={`group w-[3.8125rem] hover:w-64 fixed top-0 left-0 border-r border-collapse 
      bg-background flex flex-col justify-between p-3 h-[calc(100%-3.5625rem)] 
      mt-[3.5625rem] pb-1.5 transition-all duration-150 z-30`}
    >
      <nav className="w-full flex flex-col justify-between h-[92vh]">
        <div className="flex flex-col gap-5 w-full">
          <section className="flex flex-col gap-2.5 w-full mt-1">
            <NavItem
              label="Dashboard"
              href={`/${environmentId}/dashboard`}
              icon={LayoutDashboard}
            />
            <NavItem
              label="Auth Builder"
              href={`/${environmentId}/builder`}
              icon={ShieldEllipsis}
            />
            <NavItem
              label="Users"
              href={`/${environmentId}/users`}
              icon={SquareUser}
            />
            <NavItem
              label="Organizations"
              href={`/${environmentId}/organizations`}
              icon={Building}
            />
            <NavItem
              label="Email Templates"
              href={`/${environmentId}/email-templates`}
              icon={Mail}
            />
            <NavItem
              label="Metadata Models"
              href={`/${environmentId}/metadata/models`}
              icon={Database}
            />
            <NavItem
              label="Settings"
              href={`/${environmentId}/settings`}
              icon={Settings}
            />
          </section>
        </div>
      </nav>
    </aside>
  );
}
