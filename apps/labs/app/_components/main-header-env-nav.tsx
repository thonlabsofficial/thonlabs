'use client';

import React from 'react';
import { buttonVariants } from '@repo/ui/button';
import useUserSession from '@/_hooks/use-user-session';
import BreadcrumbSlashDivider from '@/_components/breadcrumb-slash-divider';
import { usePathname } from 'next/navigation';
import { ScrollArea } from '@repo/ui/scroll-area';
import { useProjects } from '@/_hooks/use-projects';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@repo/ui/dropdown';
import { ChevronsUpDown, Grid2X2, Plus, Settings } from 'lucide-react';
import { Skeleton } from '@repo/ui/skeleton';
import Link from 'next/link';
import { useToast } from '@repo/ui/hooks/use-toast';
import ProjectSettingsDrawer from '@/projects/_components/project-settings-drawer';
import NewProjectDialog from '@/projects/_components/new-project-dialog';
import NewEnvironmentDialog from '@/projects/_components/new-environment-dialog';

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
        className: `
        max-w-[9.375rem] truncate group flex justify-between items-center gap-1 
        !text-zinc-900 dark:!text-zinc-50 cursor-pointer pr-1`,
      })}
      {...props}
    >
      {label}
      <ChevronsUpDown
        className={`w-3.5 h-3.5 -mt-0.5
          text-foreground/60 group-hover:text-zinc-900 dark:group-hover:text-zinc-50
          transition-default`}
      />
    </button>
  ) : (
    <div className="w-20">
      <Skeleton className="w-full h-4" />
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
    (project) => project.id === environment?.project?.id,
  )?.environments;
  const restPathname = pathname.split('/').slice(2).join('/');
  const isLoading = isLoadingProjects || isLoadingUserSession;

  return (
    <>
      <div className="flex items-center ml-1">
        <BreadcrumbSlashDivider />
        <span className="flex items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <ProjectEnvButton
                label={environment?.project?.appName}
                loading={isLoading}
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64" align="start">
              <DropdownMenuGroup>
                <DropdownMenuItem
                  onSelect={() => {
                    setDialogOpen('project-settings');
                  }}
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Project Settings
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Other Projects</DropdownMenuLabel>
              <DropdownMenuGroup>
                <ScrollArea className="max-h-[6.125rem]">
                  {!isLoading ? (
                    projects
                      .filter(
                        (project) => project.id !== environment?.project?.id,
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
                          <DropdownMenuItem>{project.appName}</DropdownMenuItem>
                        </Link>
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
                <DropdownMenuItem
                  onSelect={() => {
                    setDialogOpen('new-project');
                  }}
                >
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
              <ProjectEnvButton label={environment?.name} loading={isLoading} />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64" align="start">
              <DropdownMenuLabel>
                {environment?.project?.appName} Environments
              </DropdownMenuLabel>
              <DropdownMenuGroup>
                <ScrollArea className="max-h-[6.125rem]">
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
                <DropdownMenuItem
                  onSelect={() => {
                    setDialogOpen('new-environment');
                  }}
                >
                  <Plus className="mr-2 h-4 w-4" />
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
