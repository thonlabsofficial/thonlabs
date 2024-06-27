'use client';

import { buttonVariants } from '@repo/ui/button';
import Link from 'next/link';
import { GoGrabber } from 'react-icons/go';
import useUserSession from '../_hooks/use-user-session';
import { Environment } from '@/(labs)/_interfaces/environment';
import { usePathname } from 'next/navigation';

type Props = {
  environment: Environment;
};

export default function ProjectEnvNav({ environment }: Props) {
  const { environment: clientEnvironment } = useUserSession();

  return (
    (clientEnvironment || environment) && (
      <div className="flex w-full items-center gap-1">
        <Link
          href="/projects"
          className={buttonVariants({
            variant: 'linkGhost',
            size: 'xs',
            className:
              'w-full flex flex-col !items-start gap-1 !text-zinc-900 dark:!text-zinc-50',
          })}
        >
          <span>{(clientEnvironment || environment).project.appName}</span>
          {/* <span className="-mt-px">
            <GoGrabber className="fill-zinc-900 dark:fill-zinc-50" />
          </span> */}
          <span>{(clientEnvironment || environment).name}</span>
        </Link>
      </div>
    )
  );
}
