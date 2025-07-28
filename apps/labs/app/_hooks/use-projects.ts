import useSWR from 'swr';
import type { Environment } from '@/_interfaces/environment';
import type { Project } from '@/_interfaces/project';

interface ProjectsResponse {
  items: (Project & {
    environments: Environment[];
  })[];
}

interface UseProjectsOptions {
  revalidateOnFocus?: boolean;
}

const defaultOptions: UseProjectsOptions = {
  revalidateOnFocus: true,
};

export function useProjects(options: UseProjectsOptions = {}) {
  const { revalidateOnFocus } = { ...defaultOptions, ...options };
  const { data, error, isLoading } = useSWR<ProjectsResponse>('/projects', {
    revalidateOnFocus,
  });

  return {
    projects: data?.items || [],
    projectsError: error,
    isLoadingProjects: isLoading,
  };
}
