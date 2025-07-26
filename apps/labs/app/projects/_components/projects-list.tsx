'use client';

import React from 'react';
import { useProjects } from '@/_hooks/use-projects';
import { Environment } from '@/_interfaces/environment';
import { Project } from '@/_interfaces/project';
import { Avatar, AvatarFallback } from '@repo/ui/avatar';
import { Card, CardContent } from '@repo/ui/card';
import { Typo } from '@repo/ui/typo';
import NewEnvironmentDialog from '@/projects/_components/new-environment-dialog';
import { Button } from '@repo/ui/button';
import ProjectSettingsDrawer from './project-settings-drawer';
import { Skeleton } from '@repo/ui/skeleton';
import { cn } from '@repo/ui/core/utils';
import { ArrowRight, Settings } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@repo/ui/hooks/use-toast';

function ProjectSection({
  project,
  loading,
}: {
  project: Project & { environments: Environment[] };
  loading?: boolean;
}) {
  const { toast } = useToast();

  return (
    <Card key={project.id} padding>
      <CardContent className="flex flex-col gap-6">
        <header className="flex justify-between">
          <div className="flex items-center gap-2">
            {!loading ? (
              <Typo variant={'h4'}>{project.appName}</Typo>
            ) : (
              <Skeleton width={'5.75rem'} height={'1.75rem'} />
            )}
          </div>
          <div>
            {!loading ? (
              <ProjectSettingsDrawer
                trigger={
                  <Button variant={'ghost'} size={'sm'} icon={Settings}>
                    Settings
                  </Button>
                }
                project={project}
              />
            ) : (
              <Skeleton width={'5.75rem'} height={'1.75rem'} />
            )}
          </div>
        </header>

        <section>
          <header className="mb-1">
            {!loading ? (
              <Typo variant={'muted'}>Environments</Typo>
            ) : (
              <Skeleton width={'6rem'} height={'1.125rem'} />
            )}
          </header>
          <div className="grid grid-cols-3 gap-3">
            {project.environments.map((environment, index) => (
              <Link
                href={`/${environment.id}/dashboard`}
                key={`${index}_${environment.id}`}
                onClick={() => {
                  toast({
                    title: 'Welcome back!',
                    description: `You're now in ${environment.name} for project ${project.appName}.`,
                    duration: 2400,
                  });
                }}
              >
                <Card
                  aria-disabled
                  className={cn(
                    'group border-foreground/[0.2] hover:!bg-foreground/[0.08] hover:!border-foreground/[0.1]',
                    {
                      'pointer-events-none': loading,
                    },
                  )}
                  variant={'transparent'}
                >
                  <CardContent className="flex h-full justify-between gap-4 p-4">
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-2">
                        {!loading ? (
                          <Avatar>
                            <AvatarFallback>
                              {environment.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                        ) : (
                          <Skeleton
                            borderRadius={'100%'}
                            width={'2.5rem'}
                            height={'2.5rem'}
                          />
                        )}
                        <div className="flex flex-col mt-1">
                          {!loading ? (
                            <Typo variant={'lg'}>{environment.name}</Typo>
                          ) : (
                            <Skeleton width={'6.25rem'} height={'1.75rem'} />
                          )}
                          {!loading ? (
                            <Typo
                              variant={'sm'}
                              className="text-zinc-600 dark:text-zinc-400"
                            >
                              {environment.appURL}
                            </Typo>
                          ) : (
                            <Skeleton
                              width={'10rem'}
                              height={'1.125rem'}
                              className="mt-1"
                            />
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      {!loading && (
                        <ArrowRight
                          className={`
                  w-5 h-5 opacity-0 invisible 
                  group-hover:opacity-100 group-hover:visible 
                  transition-all duration-120 ease-in-out
                `}
                        />
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
            {!loading && (
              <NewEnvironmentDialog
                trigger={
                  <Card
                    role="button"
                    variant={'transparent'}
                    border={'dashed'}
                    className="group border-foreground/[0.2] hover:border-foreground/[0.3] min-h-[5.25rem]"
                  >
                    <CardContent className="flex h-full justify-center items-center gap-4 p-4">
                      <Typo
                        variant={'lg'}
                        className="text-foreground/[0.7] group-hover:text-foreground/[0.9] transition-default"
                      >
                        New Environment
                      </Typo>
                    </CardContent>
                  </Card>
                }
                project={project}
              />
            )}
          </div>
        </section>
      </CardContent>
    </Card>
  );
}

export default function ProjectsList() {
  const { isLoadingProjects, projects } = useProjects();

  return (
    <div className="grid gap-6">
      {isLoadingProjects && (
        <>
          <ProjectSection
            loading
            project={
              {
                environments: [
                  {} as Environment,
                  {} as Environment,
                  {} as Environment,
                  {} as Environment,
                  {} as Environment,
                  {} as Environment,
                ],
              } as Project & { environments: Environment[] }
            }
          />
        </>
      )}

      {!isLoadingProjects &&
        projects.map((project) => (
          <ProjectSection key={project.id} project={project} />
        ))}

      {!isLoadingProjects && projects.length === 0 && (
        <div className="flex flex-col items-center justify-center h-full">
          <Typo variant="muted">No projects found</Typo>
        </div>
      )}
    </div>
  );
}
