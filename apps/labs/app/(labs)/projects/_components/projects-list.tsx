'use client';

import React from 'react';
import { BsArrowRightShort, BsGearFill } from 'react-icons/bs';
import useUserSession from '@labs/_hooks/use-user-session';
import { useProjects } from '@labs/_hooks/use-projects';
import { Environment } from '@labs/_interfaces/environment';
import { Project } from '@labs/_interfaces/project';
import { Avatar, AvatarFallback } from '@repo/ui/avatar';
import { Card, CardContent } from '@repo/ui/card';
import { Typo } from '@repo/ui/typo';
import { useRouter } from 'next/navigation';
import NewEnvironmentDialog from '@labs/projects/_components/new-environment-dialog';
import { useToast } from '@repo/ui/hooks/use-toast';
import { Button } from '@repo/ui/button';
import ProjectSettingsDrawer from './project-settings-drawer';
import { Skeleton } from '@repo/ui/skeleton';
import { cn } from '@repo/ui/core/utils';

function ProjectSection({
  project,
  loading,
  handleSetEnvironment,
}: {
  project: Project & { environments: Environment[] };
  loading?: boolean;
  handleSetEnvironment: (project: Project, environment: Environment) => void;
}) {
  return (
    <Card key={project.id}>
      <CardContent className="flex flex-col gap-6 pt-6">
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
                  <Button variant={'ghost'} size={'sm'} icon={BsGearFill}>
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
              <Typo variant={'muted'}>
                Environment{project.environments.length === 1 ? '' : 's'}
              </Typo>
            ) : (
              <Skeleton width={'6rem'} height={'1.125rem'} />
            )}
          </header>
          <div className="grid grid-cols-3 gap-3">
            {project.environments.map((environment, index) => (
              <Card
                role="button"
                key={`${index}_${environment.id}`}
                className={cn(
                  'group shadow-md hover:!bg-foreground/[0.08] hover:!border-foreground/[0.1]',
                  {
                    'pointer-events-none': loading,
                  },
                )}
                onClick={() => {
                  if (!loading) handleSetEnvironment(project, environment);
                }}
                variant={'background'}
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
                      <BsArrowRightShort
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
            ))}
            {!loading && (
              <NewEnvironmentDialog
                trigger={
                  <Card
                    role="button"
                    variant={'transparent'}
                    border={'dashed'}
                    className="group hover:border-foreground/[0.27] min-h-[5.25rem]"
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
  const { setEnv, clearEnv } = useUserSession();
  const router = useRouter();
  const { toast } = useToast();

  React.useEffect(() => {
    clearEnv();
  }, []);

  function handleSetEnvironment(project: Project, environment: Environment) {
    setEnv({ project, environment });
    router.replace('/');
    router.refresh();

    toast({
      title: 'Welcome back!',
      description: `You're now in ${environment.name} for project ${project.appName}.`,
      duration: 2000,
    });
  }

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
            handleSetEnvironment={handleSetEnvironment}
          />
        </>
      )}

      {!isLoadingProjects &&
        projects.map((project) => (
          <ProjectSection
            key={project.id}
            project={project}
            handleSetEnvironment={handleSetEnvironment}
          />
        ))}
    </div>
  );
}
