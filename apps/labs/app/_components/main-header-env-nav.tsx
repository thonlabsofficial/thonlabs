'use client';

import { buttonVariants } from '@repo/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@repo/ui/dropdown';
import { useToast } from '@repo/ui/hooks/use-toast';
import { ScrollArea } from '@repo/ui/scroll-area';
import { Skeleton } from '@repo/ui/skeleton';
import { ChevronsUpDown, Grid2X2, Plus, Settings } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import BreadcrumbSlashDivider from '@/_components/breadcrumb-slash-divider';
import { useProjects } from '@/_hooks/use-projects';
import useUserSession from '@/_hooks/use-user-session';
import NewEnvironmentDialog from '@/projects/_components/new-environment-dialog';
import NewProjectDialog from '@/projects/_components/new-project-dialog';
import ProjectSettingsDrawer from '@/projects/_components/project-settings-drawer';

const ProjectEnvButton = React.forwardRef<
  HTMLButtonElement,
  { label?: string; loading: boolean }
>(({ label, loading, ...props }, ref) => {
  return !loading ? (
    <button
      ref={ref}
      className={buttonVariants({
        variant: 'linkGhost',
        size: 'xs',
        className: `group !text-zinc-900 dark:!text-zinc-50 flex max-w-[9.375rem] cursor-pointer items-center justify-between gap-1 truncate pr-1`,
      })}
      {...props}
    >
      {label}
      <ChevronsUpDown
        className={`-mt-0.5 h-3.5 w-3.5 text-foreground/60 transition-default group-hover:text-zinc-900 dark:group-hover:text-zinc-50`}
      />
    </button>
  ) : (
    <div className='w-20'>
      <Skeleton className='h-4 w-full' />
    </div>
  );
});

export default function MainHeaderEnvNav() {
  const { projects, isLoadingProjects } = useProjects({
    revalidateOnFocus: false,
  });
  const { environment, isLoadingUserSession } = useUserSession();
  const { toast } = useToast();
  const pathname = usePathname();
  const [dialogOpen, setDialogOpen] = React.useState('');

  const projectEnvironments = projects.find(
    (project) => project.id === environment?.project?.id
  )?.environments;
  const restPathname = pathname.split('/').slice(2).join('/');
  const isLoading = isLoadingProjects || isLoadingUserSession;

  const otherProjectsEnvironments = projects
    .filter((project) => project.id !== environment?.project?.id)
    .flatMap((project) => project.environments);

  return (
    <>
      <div className='ml-1 flex items-center'>
        <BreadcrumbSlashDivider />
        <span className='flex items-center'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <ProjectEnvButton
                label={environment?.project?.appName}
                loading={isLoading}
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-64' align='start'>
              <DropdownMenuLabel>Project</DropdownMenuLabel>
              <DropdownMenuGroup>
                <DropdownMenuItem
                  onSelect={() => {
                    setDialogOpen('project-settings');
                  }}
                >
                  <Settings className='mr-2 h-4 w-4' />
                  Settings
                </DropdownMenuItem>
              </DropdownMenuGroup>
              {otherProjectsEnvironments &&
                otherProjectsEnvironments.length > 0 && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuLabel>Other Projects</DropdownMenuLabel>
                    <DropdownMenuGroup>
                      <ScrollArea className='max-h-[6.125rem]'>
                        {!isLoading ? (
                          projects
                            .filter(
                              (project) =>
                                project.environments &&
                                project.id !== environment?.project?.id
                            )
                            .map((project) => (
                              <Link
                                href={`/${project.environments?.[0]?.id}`}
                                key={project.id}
                                onClick={() => {
                                  toast({
                                    title: 'Welcome back!',
                                    description: `You're now in ${project.environments?.[0]?.name} for project ${project.appName}.`,
                                    duration: 2400,
                                  });
                                }}
                              >
                                <DropdownMenuItem>
                                  {project.appName}
                                </DropdownMenuItem>
                              </Link>
                            ))
                        ) : (
                          <div className='flex flex-col gap-1'>
                            <Skeleton className='h-6 w-full' />
                            <Skeleton className='h-6 w-full' />
                            <Skeleton className='h-6 w-full' />
                          </div>
                        )}
                      </ScrollArea>
                    </DropdownMenuGroup>
                  </>
                )}
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem
                  onSelect={() => {
                    setDialogOpen('new-project');
                  }}
                >
                  <Plus className='mr-2 h-4 w-4' />
                  New project
                </DropdownMenuItem>
                <Link href='/projects'>
                  <DropdownMenuItem>
                    <Grid2X2 className='mr-2 h-4 w-4' />
                    See all projects
                  </DropdownMenuItem>
                </Link>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <BreadcrumbSlashDivider />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <ProjectEnvButton label={environment?.name} loading={isLoading} />
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-64' align='start'>
              <DropdownMenuLabel>
                {environment?.project?.appName} Environments
              </DropdownMenuLabel>
              <DropdownMenuGroup>
                <ScrollArea className='max-h-[6.125rem]'>
                  {!isLoading ? (
                    projectEnvironments?.map((env) => (
                      <Link
                        href={`/${env.id}/${restPathname}`}
                        key={env.id}
                        onClick={() => {
                          toast({
                            title: 'Environment changed',
                            description: `You're now in ${env.name}.`,
                            duration: 2400,
                          });
                        }}
                      >
                        <DropdownMenuItem>{env.name}</DropdownMenuItem>
                      </Link>
                    ))
                  ) : (
                    <div className='flex flex-col gap-1'>
                      <Skeleton className='h-6 w-full' />
                      <Skeleton className='h-6 w-full' />
                      <Skeleton className='h-6 w-full' />
                    </div>
                  )}
                </ScrollArea>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem
                  onSelect={() => {
                    setDialogOpen('new-environment');
                  }}
                >
                  <Plus className='mr-2 h-4 w-4' />
                  New Environment
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </span>
      </div>
      <ProjectSettingsDrawer
        project={environment?.project}
        open={dialogOpen === 'project-settings'}
        onOpenChange={() => setDialogOpen('')}
      />
      <NewProjectDialog
        open={dialogOpen === 'new-project'}
        onOpenChange={() => setDialogOpen('')}
      />
      <NewEnvironmentDialog
        project={environment?.project}
        open={dialogOpen === 'new-environment'}
        onOpenChange={() => setDialogOpen('')}
      />
    </>
  );
}
