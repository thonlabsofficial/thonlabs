'use client';

import { buttonVariants } from '@repo/ui/button';
import { cn } from '@repo/ui/core/utils';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

function NavItem({
  label,
  className,
  ...props
}: { label: string } & React.ComponentProps<typeof Link>) {
  const pathname = usePathname();
  const router = useRouter();
  const href = props.href?.toString() ?? '';

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
          '!justify-start !px-2 !py-1 !font-normal flex w-full items-center gap-1 hover:bg-accent/50',
          {
            'bg-accent text-foreground hover:bg-accent': isActive,
          },
          className
        ),
      })}
      onMouseEnter={() => router.prefetch(href)}
    >
      {label}
    </Link>
  );
}

interface MainNavHorizontalProps {
  environmentId: string;
}

export default function MainNavHorizontal({
  environmentId,
}: MainNavHorizontalProps) {
  return (
    <nav className='-ml-[9vw] flex gap-1'>
      <NavItem label='Dashboard' href={`/${environmentId}/dashboard`} />
      <NavItem label='Builder' href={`/${environmentId}/builder`} />
      <NavItem label='Users' href={`/${environmentId}/users`} />
      <NavItem label='Organizations' href={`/${environmentId}/organizations`} />
      <NavItem
        label='Email Templates'
        href={`/${environmentId}/email-templates`}
      />
      <NavItem label='Settings' href={`/${environmentId}/settings`} />
    </nav>
  );
}
