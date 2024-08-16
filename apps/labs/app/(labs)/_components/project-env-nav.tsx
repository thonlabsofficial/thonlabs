'use client';

import { buttonVariants } from '@repo/ui/button';
import Link from 'next/link';
import useUserSession from '../_hooks/use-user-session';
import { Environment } from '@/(labs)/_interfaces/environment';
import { LuArrowRight } from 'react-icons/lu';

type Props = {
  environment: Environment;
};

export default function ProjectEnvNav({ environment }: Props) {
  const { environment: clientEnvironment } = useUserSession();

  return (
    (clientEnvironment || environment) && (
      <div className="flex w-full items-center gap-1 pr-1.5">
        <Link
          href="/projects"
          className={buttonVariants({
            variant: 'linkGhost',
            size: 'xs',
            className:
              'group w-full flex justify-between gap-1 !text-zinc-900 dark:!text-zinc-50',
          })}
        >
          <span className="flex flex-col items-start gap-1">
            <span className="max-w-[9.375rem] truncate">
              {(clientEnvironment || environment).project.appName}
            </span>
            <span className="max-w-[9.375rem] truncate">
              {(clientEnvironment || environment).name}
            </span>
          </span>
          <LuArrowRight
            className={`
              w-3 h-3 opacity-0 invisible 
              group-hover:opacity-100 group-hover:visible 
              transition-all duration-120 ease-in-out
            `}
          />
        </Link>
      </div>
    )
  );
}
