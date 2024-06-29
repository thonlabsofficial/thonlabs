'use client';

import React from 'react';
import { BsArrowRightShort, BsGearFill } from 'react-icons/bs';
import useUserSession from '@labs/_hooks/use-user-session';
import { useProjects } from '@labs/projects/_hooks/use-projects';
import { Environment } from '@labs/_interfaces/environment';
import { Project } from '@labs/_interfaces/project';
import { Avatar, AvatarFallback } from '@repo/ui/avatar';
import { Badge } from '@repo/ui/badge';
import { Card, CardContent } from '@repo/ui/card';
import { Typo } from '@repo/ui/typo';
import { useRouter } from 'next/navigation';
import NewEnvironmentDialog from '@labs/projects/_components/new-environment-dialog';
import { useToast } from '@repo/ui/hooks/use-toast';
import { Button } from '@repo/ui/button';

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
    router.push('/');

    toast({
      title: 'Welcome back!',
      description: `You're now in ${environment.name} for project ${project.appName}.`,
      duration: 2800,
    });
  }

  if (isLoadingProjects) {
    // TODO: skeletons and errors
    return <div>Loading...</div>;
  }

  return (
    <div className="grid gap-6">
      {projects.map((project) => (
        <Card key={project.id}>
          <CardContent className="flex flex-col gap-6 pt-6">
            <header className="flex justify-between">
              <div className="flex items-center gap-2">
                <Typo variant={'h4'}>{project.appName}</Typo>
                <div>
                  <Badge variant={'secondary'}>PID - {project.id}</Badge>
                </div>
              </div>
              <div>
                <Button variant={'ghost'} size={'sm'} icon={BsGearFill}>
                  Settings
                </Button>
              </div>
            </header>

            <section>
              <header className="mb-1">
                <Typo variant={'muted'}>
                  Environment{project.environments.length === 1 ? '' : 's'}
                </Typo>
              </header>
              <div className="grid grid-cols-3 gap-3">
                {project.environments.map((environment) => (
                  <Card
                    role="button"
                    key={environment.id}
                    className="group shadow-md hover:!bg-foreground/[0.08] hover:!border-foreground/[0.1]"
                    onClick={() => handleSetEnvironment(project, environment)}
                    variant={'background'}
                  >
                    <CardContent className="flex h-full justify-between gap-4 p-4">
                      <div className="flex flex-col gap-3">
                        <div className="flex gap-2">
                          <Avatar>
                            <AvatarFallback>
                              {environment.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="mt-1">
                            <Typo variant={'large'}>{environment.name}</Typo>
                            <Typo
                              variant={'small'}
                              className="text-zinc-600 dark:text-zinc-400"
                            >
                              {environment.appURL}
                            </Typo>
                          </div>
                        </div>

                        <div>
                          <Badge
                            variant={'secondary'}
                            className="cursor-pointer"
                          >
                            EID - {environment.id}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <BsArrowRightShort
                          className={`
                          w-5 h-5 opacity-0 invisible 
                          group-hover:opacity-100 group-hover:visible 
                          transition-all duration-120 ease-in-out
                        `}
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
                <NewEnvironmentDialog
                  trigger={
                    <Card
                      role="button"
                      variant={'transparent'}
                      border={'dashed'}
                      className="group hover:border-foreground/[0.27] min-h-32"
                    >
                      <CardContent className="flex h-full justify-center items-center gap-4 p-4">
                        <Typo
                          variant={'large'}
                          className="text-foreground/[0.7] group-hover:text-foreground/[0.9] transition-default"
                        >
                          New Environment
                        </Typo>
                      </CardContent>
                    </Card>
                  }
                  project={project}
                />
              </div>
            </section>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
