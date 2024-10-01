import { error } from 'console';
import React from 'react';
import { Environment } from '../_interfaces/environment';
import { useProjects } from './use-projects';

export function useEnvironments() {
  const { projects, isLoadingProjects } = useProjects();
  const environments = React.useMemo(
    () =>
      projects.reduce<Environment[]>((acc, project) => {
        const environments = project.environments.map((env) => ({
          ...env,
          project,
        }));
        return [...acc, ...environments];
      }, []),
    [projects],
  );

  return {
    environments,
    isLoadingEnvironments: isLoadingProjects,
  };
}
