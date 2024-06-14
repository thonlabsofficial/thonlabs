'use client';

import { Environment } from '@/(labs)/_interfaces/environment';
import { buttonVariants } from '@repo/ui/button';
import Link from 'next/link';
import {
  BsClipboardData,
  BsPersonSquare,
  BsEnvelopePaper,
  BsShield,
  BsGear,
} from 'react-icons/bs';
import useUserSession from '@labs/_hooks/use-user-session';
import { usePathname } from 'next/navigation';

type Props = {
  environment: Environment;
};

export default function MainNav({ environment }: Props) {
  const { environment: clientEnvironment } = useUserSession();
  const pathname = usePathname();

  return (
    !pathname.startsWith('/projects') &&
    (clientEnvironment || environment) && (
      <nav className="w-52 flex flex-col justify-between px-1.5 py-2 h-[94vh] pb-1.5 fixed top-13.25 left-0 border-r border-collapse">
        <div className="flex flex-col gap-2 w-full">
          <Link
            href="/"
            className={buttonVariants({
              variant: 'linkGhost',
              size: 'small',
              className:
                'flex items-center gap-2.5 w-full !justify-start !px-2.5 !py-2.5 !text-zinc-900 dark:!text-zinc-50 bg-accent',
            })}
          >
            <BsClipboardData className="w-5 h-5" /> Home
          </Link>

          <Link
            href="/shield/users"
            className={buttonVariants({
              variant: 'linkGhost',
              size: 'small',
              className:
                'flex items-center gap-2.5 w-full !justify-start font-normal !px-2.5 !py-2.5 hover:bg-accent/[0.3]',
            })}
          >
            <BsPersonSquare className="w-5 h-5" /> Users
          </Link>
          <Link
            href="/shield/emails"
            className={buttonVariants({
              variant: 'linkGhost',
              size: 'small',
              className:
                'flex items-center gap-2.5 w-full !justify-start font-normal !px-2.5 !py-2.5 hover:bg-accent/[0.3]',
            })}
          >
            <BsEnvelopePaper className="w-5 h-5" /> Emails
          </Link>
          <Link
            href="/shield/security"
            className={buttonVariants({
              variant: 'linkGhost',
              size: 'small',
              className:
                'flex items-center gap-2.5 w-full !justify-start font-normal !px-2.5 !py-2.5 hover:bg-accent/[0.3]',
            })}
          >
            <BsShield className="w-5 h-5" /> Security
          </Link>
        </div>

        <div className="flex flex-col gap-2 w-full">
          <Link
            href="/settings"
            className={buttonVariants({
              variant: 'linkGhost',
              size: 'small',
              className:
                'flex items-center gap-2.5 w-full !justify-start font-normal !px-2.5 !py-2.5 hover:bg-accent/[0.3]',
            })}
          >
            <BsGear className="w-5 h-5" /> Environment Settings
          </Link>
        </div>
      </nav>
    )
  );
}
