import { Environment } from '@/(labs)/_interfaces/environment';
import { Project } from '@/(labs)/_interfaces/project';
import useSWR from 'swr';

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
