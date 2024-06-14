'use client';

import React from 'react';
import useUserSession from '@/(labs)/_hooks/use-user-session';
import { useProjects } from '@/(labs)/projects/_hooks/use-projects';
import { Environment } from '@/(labs)/_interfaces/environment';
import { Project } from '@/(labs)/_interfaces/project';
import { Avatar, AvatarFallback } from '@repo/ui/avatar';
import { Badge } from '@repo/ui/badge';
import { Card, CardContent } from '@repo/ui/card';
import { Typo } from '@repo/ui/typo';
import { useRouter } from 'next/navigation';

export default function ProjectsList() {
  const { isLoadingProjects, projects, projectsError } = useProjects();
  const { setEnv, clearEnv } = useUserSession();
  const router = useRouter();

  React.useEffect(() => {
    clearEnv();
  }, []);

  function handleSetEnvironment(project: Project, environment: Environment) {
    setEnv({ project, environment });
    router.push('/');
  }

  if (isLoadingProjects) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid gap-6">
      {projects.map((project) => (
        <Card key={project.id}>
          <CardContent className="flex flex-col gap-6 pt-6">
            <header className="flex gap-2 items-center">
              <Typo variant={'h4'}>{project.appName}</Typo>
              <Badge variant={'secondary'}>PID - {project.id}</Badge>
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
                    className="!bg-card border-transparent shadow-md hover:!bg-white/[0.04] hover:!border-white/[0.06]"
                    onClick={() => handleSetEnvironment(project, environment)}
                  >
                    <CardContent className="flex flex-col gap-3 p-4">
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
                        <Badge variant={'secondary'} className="cursor-pointer">
                          EID - {environment.id}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
