'use client';

import React from 'react';
import { buttonVariants } from '@repo/ui/button';
import { Environment } from '@labs/_interfaces/environment';
import useUserSession from '@labs/_hooks/use-user-session';
import BreadcrumbSlashDivider from '@/_components/breadcrumb-slash-divider';
import { usePathname } from 'next/navigation';
import { LuChevronsUpDown } from 'react-icons/lu';
import { ScrollArea } from '@repo/ui/scroll-area';
import { useProjects } from '@/(labs)/_hooks/use-projects';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@repo/ui/dropdown';
import { Grid2X2, Plus } from 'lucide-react';
import { Skeleton } from '@repo/ui/skeleton';
import Link from 'next/link';

type Props = {
  environment: Environment;
};

const ProjectEnvButton = React.forwardRef<HTMLButtonElement, { label: string }>(
  ({ label, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={buttonVariants({
          variant: 'linkGhost',
          size: 'xs',
          className: `
        max-w-[9.375rem] truncate group flex justify-between items-center gap-1 
        !text-zinc-900 dark:!text-zinc-50 cursor-pointer pr-1`,
        })}
        {...props}
      >
        {label}
        <LuChevronsUpDown
          className={`w-3.5 h-3.5 -mt-0.5
          text-foreground/60 group-hover:text-zinc-900 dark:group-hover:text-zinc-50
          transition-default`}
        />
      </button>
    );
  },
);

export default function MainHeaderEnvNav({ environment }: Props) {
  const { environment: clientEnvironment } = useUserSession();
  const pathname = usePathname();
  const { projects, isLoadingProjects } = useProjects({
    revalidateOnFocus: false,
  });
  const projectEnvironments = projects.find(
    (project) => project.id === (clientEnvironment || environment)?.project?.id,
  )?.environments;

  return (
    !pathname.startsWith('/projects') &&
    (clientEnvironment || environment) && (
      <div className="flex items-center ml-1">
        <BreadcrumbSlashDivider />
        <span className="flex items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <ProjectEnvButton
                label={(clientEnvironment || environment).project.appName}
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64" align="start">
              <DropdownMenuLabel>Projects</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <ScrollArea className="max-h-[6.125rem]">
                  {!isLoadingProjects ? (
                    projects.map((project) => (
                      <DropdownMenuItem key={project.id} onSelect={() => {}}>
                        {project.appName}
                      </DropdownMenuItem>
                    ))
                  ) : (
                    <div className="flex flex-col gap-1">
                      <Skeleton className="h-6 w-full" />
                      <Skeleton className="h-6 w-full" />
                      <Skeleton className="h-6 w-full" />
                    </div>
                  )}
                </ScrollArea>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem onSelect={() => {}}>
                  <Plus className="mr-2 h-4 w-4" />
                  New project
                </DropdownMenuItem>
                <Link href="/projects">
                  <DropdownMenuItem>
                    <Grid2X2 className="mr-2 h-4 w-4" />
                    See all projects
                  </DropdownMenuItem>
                </Link>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <BreadcrumbSlashDivider />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <ProjectEnvButton
                label={(clientEnvironment || environment).name}
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64" align="start">
              <DropdownMenuLabel>Environments</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <ScrollArea className="max-h-[6.125rem]">
                  {!isLoadingProjects ? (
                    projectEnvironments?.map((env) => (
                      <DropdownMenuItem key={env.id} onSelect={() => {}}>
                        {env.name}
                      </DropdownMenuItem>
                    ))
                  ) : (
                    <div className="flex flex-col gap-1">
                      <Skeleton className="h-6 w-full" />
                      <Skeleton className="h-6 w-full" />
                      <Skeleton className="h-6 w-full" />
                    </div>
                  )}
                </ScrollArea>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem onSelect={() => {}}>
                  <Plus className="mr-2 h-4 w-4" />
                  New Environment
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </span>
      </div>
    )
  );
}
