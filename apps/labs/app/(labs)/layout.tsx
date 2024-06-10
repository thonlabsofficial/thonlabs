import { Metadata } from 'next';
import ThonLabsProvider from './_providers/thon-labs-provider';
import dynamic from 'next/dynamic';
import { buttonVariants } from '@repo/ui/button';
import { Avatar, AvatarFallback } from '@repo/ui/avatar';
import Link from 'next/link';
import { GoGrabber } from 'react-icons/go';
import {
  BsPersonSquare,
  BsClipboardData,
  BsEnvelopePaper,
  BsShield,
  BsGear,
} from 'react-icons/bs';
import { Badge } from '@repo/ui/badge';
import ServerAuthProvider from '@/auth/_services/server-auth-provider';
import Utils from '@helpers/utils';

const Logo = dynamic(() => import('@/_components/logo'), { ssr: false });

export const metadata: Metadata = {
  robots: {
    follow: false,
    index: false,
  },
};

export default async function LabsNestedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = ServerAuthProvider.getSession();

  return (
    <ThonLabsProvider>
      <header className="fixed top-0 left-0 w-full flex justify-between items-center px-4 py-2.5 bg-background/[0.8] backdrop-blur-sm z-10 border-b border-collapse">
        <div className="flex items-center gap-3">
          <Logo reduced className="h-5 -mt-0.5" />

          <nav className="flex items-center gap-1">
            <Link
              href="/projects"
              className={buttonVariants({
                variant: 'linkGhost',
                size: 'small',
                className:
                  'flex items-center gap-1 !text-zinc-900 dark:!text-zinc-50',
              })}
            >
              <span>Thon Labs</span>
            </Link>
            <span className="-mt-px">
              <GoGrabber className="fill-zinc-900 dark:fill-zinc-50" />
            </span>
            <Link
              href="/:envId/environments"
              className={buttonVariants({
                variant: 'linkGhost',
                size: 'small',
                className:
                  'flex items-center gap-1 !text-zinc-900 dark:!text-zinc-50',
              })}
            >
              <span>Production</span>
            </Link>
          </nav>
        </div>

        <div className="flex gap-3 items-center">
          <Badge className="cursor-default select-none">Authentication</Badge>
          <Avatar size="small" className="cursor-default select-none">
            <AvatarFallback>
              {Utils.getFirstAndLastInitials(session.user.fullName)}
            </AvatarFallback>
          </Avatar>
        </div>
      </header>
      <main className="pl-52 gap-8 mt-13.25">
        <aside>
          <nav className="w-52 flex flex-col justify-between px-1.5 py-2 h-[94vh] pb-1.5 fixed top-13.25 left-0 border-r border-collapse">
            <div className="flex flex-col gap-2 w-full">
              <Link
                href="/:envId"
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
                href="/:envId/auth/users"
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
                href="/:envId/auth/emails"
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
                href="/:envId/auth/security"
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
                href="/:envId/settings"
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
        </aside>
        <div>{children}</div>
      </main>
    </ThonLabsProvider>
  );
}
