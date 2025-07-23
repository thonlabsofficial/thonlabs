'use client';

import { buttonVariants } from '@repo/ui/button';
import Link from 'next/link';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { cn } from '@repo/ui/core/utils';
import {
  Building,
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
            'bg-accent text-foreground hover:bg-accent': isActive,
          },
          className,
        ),
      })}
      onMouseEnter={() => router.prefetch(href)}
    >
      {<Icon className="w-4 h-4" />} {label}
    </Link>
  );
}

export default function MainAside() {
  const { environmentId } = useParams();

  return (
    <aside className="w-64 fixed top-0 left-0 border-r border-collapse bg-background flex flex-col justify-between p-3 h-[calc(100%-3.5625rem)] mt-[3.5625rem] pb-1.5">
      <nav className="w-full flex flex-col justify-between h-[92vh]">
        <div className="flex flex-col gap-5 w-full">
          <section className="flex flex-col gap-1 w-full">
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
              label="Settings"
              href={`/${environmentId}/settings`}
              icon={Settings}
            />
          </section>
          {/* <section className="flex flex-col gap-1 w-full">
            <Typo variant={'mutedXs'} className="px-2">
              Databases
            </Typo>
            <NavItem
              label="Key/Value"
              href={`/${environmentId}/kv`}
              icon={DatabaseZap}
            />
            <NavItem
              label="Content"
              href={`/${environmentId}/content`}
              icon={Folder}
            />
            <NavItem
              label="Translations"
              href={`/${environmentId}/translations`}
              icon={Earth}
            />
          </section> */}
        </div>
      </nav>
    </aside>
  );
}
